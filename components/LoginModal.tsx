'use client';

import { signIn } from 'next-auth/react';
import useLoginModal from '@/hooks/useLoginModal';
import React from 'react';
import { IoMdClose } from 'react-icons/io';
import { FcGoogle } from 'react-icons/fc';
import useIsLoggedIn from '@/hooks/useIsLoggedIn';

const LoginModal = () => {
  const loginModal = useLoginModal();
  const { setIsLoggedIn } = useIsLoggedIn();

  const handleLogin = () => {
    signIn('google');
    setIsLoggedIn();
  };

  return (
    <>
      {loginModal.isOpen && (
        <div
          className='justify-center items-center flex overflow-x-hidden overflow-y-auto
                  fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70'
        >
          <div className='relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto'>
            {/* CONTENT */}

            <div
              className='h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg
                            relative flex flex-col w-full bg-white outline-none focus:outline-none'
            >
              {/* HEADER */}
              <div className='flex items-center p-6 rounded-t justify-center relative border-b-[1px]'>
                <div className='text-lg font-semibold'>Welcome to Filmoteka</div>
                <button
                  onClick={loginModal.onClose}
                  className='p-1 border-0 hover:opacity-70 transition absolute right-4'
                >
                  <IoMdClose size={18} />
                </button>
              </div>
              {/* BODY */}
              <div className='relative p-2 flex justify-center'>
                Login or Sign up with your Google account
              </div>
              {/* FOOTER */}
              <div className='flex flex-col gap-2 py-4 px-6'>
                <div className='flex flex-row justify-center items-center gap-4 w-full'>
                  <button
                    onClick={handleLogin}
                    className='relative rounded-lg hover:opacity-80 transition w-full bg-white border-black text-black py-3 text-md font-semibold border-2'
                  >
                    <FcGoogle size={24} className='absolute left-4' />
                    Continue with Google
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginModal;
