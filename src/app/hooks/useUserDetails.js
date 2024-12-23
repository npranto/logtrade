import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { fetchUserById, saveNewUser } from '@/utils/users';

export const useUserDetails = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useUser() || {};

  useEffect(() => {
    const setupUserDetails = async () => {
      if (!user?.id) {
        setIsLoading(false);
        return;
      }

      try {
        const userId = user.id;
        const [fetchUserByIdError, fetchedUser] = await fetchUserById(userId);

        if (fetchUserByIdError) {
          console.error(fetchUserByIdError);
          throw new Error(
            'Oops! Unable to get user details at the moment. Try refreshing the page OR try again later',
          );
        }
        if (fetchedUser) {
          setUserDetails(fetchedUser);
        } else {
          const newUser = {
            userId,
            fullName: user.fullName || '',
            email: user.emailAddresses?.[0]?.emailAddress || '',
            profilePicture: user.imageUrl || '',
            joinedAt: new Date().toISOString(),
          };

          const [saveNewUserError, newUserId] = await saveNewUser(newUser);

          if (saveNewUserError || !newUserId) {
            console.error(saveNewUserError);
            throw new Error(
              'Oops! Unable to save new user details at the moment. Try refreshing the page OR try again later',
            );
          }
          const [fetchNewUserError, fetchedNewUser] = await fetchUserById(userId);

          if (fetchNewUserError) {
            console.error(fetchNewUserError);
            throw new Error(
              'Oops! Unable to get user details at the moment. Try refreshing the page OR try again later',
            );
          }
          setUserDetails(fetchedNewUser);
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    setupUserDetails();
  }, [user]);

  return {
    userDetails,
    isLoading,
    error,
  };
};
