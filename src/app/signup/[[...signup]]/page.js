import { SignUp } from '@clerk/nextjs';

const SignupPage = () => {
  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="p-8 rounded-lg">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-12">LogTrade</h1>
        <div className="min-h-[645px]">
          <SignUp
            path="/signup"
            routing="path"
            signInUrl="/login"
            forceRedirectUrl="/dashboard"
            appearance={{
              layout: {
                socialButtonsVariant: 'iconButton',
              },
            }}
          />
        </div>
      </div>
    </main>
  );
};

export default SignupPage;
