import { SignIn } from '@clerk/clerk-react';
import React from 'react';

const SigninPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-2xl border border-gray-200 mx-auto">
        <SignIn />
      </div>
    </div>
  );
};

export default SigninPage;
