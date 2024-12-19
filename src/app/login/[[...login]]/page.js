import { SignIn } from '@clerk/nextjs';

const LoginPage = () => {
  return (
    <main
      className="flex items-center justify-center min-h-screen"
      style={{
        background: 'var(--background)',
        color: 'var(--foreground)',
      }}
    >
      <div
        className="min-h-[415px] p-8 rounded-lg"
        style={{
          background: 'var(--background)',
          color: 'var(--foreground)',
        }}
      >
        <h1
          className="text-3xl sm:text-4xl font-extrabold text-center mb-12"
          style={{
            color: 'var(--foreground)',
          }}
        >
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
