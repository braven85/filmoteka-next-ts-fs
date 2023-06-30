import React from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, className, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={twMerge(
        `uppercase rounded-md text-xs lg:text-base font-medium px-1 py-2 border-[1px] border-black
                                hover:text-white hover:bg-active-button-bg hover:border-active-button-bg`,
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
