import React from 'react';
import orangeHeart from '../public/orange_heart.svg';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className='flex flex-col justify-center items-center w-full h-[100px] text-sm text-footer-text bg-gray-100'>
      <div>© 2023 | All Rights Reserved | </div>
      <div className='flex'>
        Developed with &nbsp; <Image src={orangeHeart} alt='orange heart' width={14} height={14} />{' '}
        &nbsp; by Radek
      </div>
    </footer>
  );
};

export default Footer;
