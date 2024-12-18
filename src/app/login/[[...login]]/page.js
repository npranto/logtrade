import { SignIn } from '@clerk/nextjs';

const LoginPage = () => {
  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="min-h-[415px] p-8 rounded-lg">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 text-center mb-12">
          LogTrade
        </h1>

        <div className="min-h-[485px]">
          <SignIn
            path="/login"
            routing="path"
            signUpUrl="/signup"
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

export default LoginPage;
