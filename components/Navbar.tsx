'use client';

import Image from 'next/image';
import React from 'react';
import movieIcon from '../public/film.svg';
import SearchInput from './SearchInput';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Button from './Button';
import useWatched from './../hooks/useWatched';
import useQueued from '@/hooks/useQueued';
import useLoginModal from '@/hooks/useLoginModal';
import { SafeUser } from '@/types';
import { signOut } from 'next-auth/react';
import useIsLoggedIn from '@/hooks/useIsLoggedIn';
import useWatchedAndQueued from '@/hooks/useWatchedAndQueued';
import useSearchInput from '@/hooks/useSearchInput';
import usePage from '@/hooks/usePage';

interface NavbarProps {
  currentUser?: SafeUser | null | undefined;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  const pathname = usePathname();
  const { watchedAndQueued, setWatchedAndQueued, setNotWatchedAndQueued } = useWatchedAndQueued();
  const { watched, setWatched, setNotWatched } = useWatched();
  const { queued, setQueued, setNotQueued } = useQueued();
  const loginModal = useLoginModal();
  const { setIsNotLoggedIn } = useIsLoggedIn();
  const { resetSearchInput } = useSearchInput();
  const { setPage } = usePage();

  const handleAllOnClick = () => {
    if (watched) {
      setNotWatched();
    }

    if (queued) {
      setNotQueued();
    }

    setWatchedAndQueued();
  };

  const handleWatchedOnClick = () => {
    if (watchedAndQueued) {
      setNotWatchedAndQueued();
    }

    if (queued) {
      setNotQueued();
    }

    setWatched();
  };

  const handleQueuedOnClick = () => {
    if (watchedAndQueued) {
      setNotWatchedAndQueued();
    }

    if (watched) {
      setNotWatched();
    }

    setQueued();
  };

  const handleLogout = () => {
    signOut();
    setIsNotLoggedIn();
  };

  const handleLogoOnClick = () => {
    resetSearchInput();
    setPage(1);
  };

  return (
    <nav
      className={`flex flex-col w-full h-[230px] px-5 bg-cover ${
        pathname === '/' ? 'bg-main-page' : 'bg-library-page'
      }`}
    >
      <div className='flex justify-between items-center pt-12 text-white'>
        <Link
          href='/'
          onClick={handleLogoOnClick}
          className='flex justify-center items-center gap-x-2'
        >
          <Image
            src={movieIcon}
            alt='movie icon'
            width={24}
            height={24}
            className='cursor-pointer'
          />
          <div className='hidden md:flex text-3xl font-medium'>Filmoteka</div>
        </Link>
        <div className='flex flex-wrap justify-evenly items-center gap-x-7 gap-y-4 text-xs font-medium uppercase'>
          <Link
            href='/'
            className={
              pathname === '/'
                ? 'decoration-link-underline decoration-[3px] underline underline-offset-4'
                : 'hover:decoration-link-underline hover:decoration-[3px] hover:underline hover:underline-offset-4'
            }
          >
            Home
          </Link>
          <Link
            href='/library'
            className={
              pathname === '/library'
                ? 'decoration-link-underline decoration-[3px] underline underline-offset-4'
                : 'hover:decoration-link-underline hover:decoration-[3px] hover:underline hover:underline-offset-4'
            }
          >
            My library
          </Link>
          {currentUser ? (
            <div
              onClick={handleLogout}
              className='hover:decoration-link-underline hover:decoration-[3px] hover:underline hover:underline-offset-4 cursor-pointer'
            >
              Logout
            </div>
          ) : (
            <div
              onClick={loginModal.onOpen}
              className='hover:decoration-link-underline hover:decoration-[3px] hover:underline hover:underline-offset-4 cursor-pointer'
            >
              Login/Sign up
            </div>
          )}
        </div>
      </div>
      {pathname === '/' && (
        <form
          className='flex w-full pt-16 justify-center'
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <SearchInput />
        </form>
      )}
      {pathname === '/library' && currentUser && (
        <div className='mt-12 flex w-full justify-evenly gap-x-2'>
          <Button
            onClick={handleAllOnClick}
            className={`text-white border-white px-5 md:px-10 py-3 md:py-5 hover:shadow-lg hover:shadow-active-button-bg
            ${watchedAndQueued ? 'bg-active-button-bg' : ''}
            ${watchedAndQueued ? 'border-active-button-bg' : ''}
            ${watchedAndQueued ? 'shadow-lg' : ''}
            ${watchedAndQueued ? 'shadow-active-button-bg' : ''}
            `}
          >
            all
          </Button>
          <Button
            onClick={handleWatchedOnClick}
            className={`text-white border-white px-5 md:px-10 py-3 md:py-5 hover:shadow-lg hover:shadow-active-button-bg
            ${watched ? 'bg-active-button-bg' : ''}
            ${watched ? 'border-active-button-bg' : ''}
            ${watched ? 'shadow-lg' : ''}
            ${watched ? 'shadow-active-button-bg' : ''}
            `}
          >
            watched
          </Button>
          <Button
            onClick={handleQueuedOnClick}
            className={`text-white border-white px-5 md:px-10 py-3 md:py-5 hover:shadow-lg hover:shadow-active-button-bg
            ${queued ? 'bg-active-button-bg' : ''}
            ${queued ? 'border-active-button-bg' : ''}
            ${queued ? 'shadow-lg' : ''}
            ${queued ? 'shadow-active-button-bg' : ''}
            `}
          >
            queued
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
