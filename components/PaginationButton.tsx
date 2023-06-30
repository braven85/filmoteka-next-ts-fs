import React from 'react';
import { twMerge } from 'tailwind-merge';

interface PaginationButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const PaginationButton: React.FC<PaginationButtonProps> = ({ children, className, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={twMerge(
        `w-[40px] h-[40px] rounded-md flex justify-center items-center`,
        className
      )}
    >
      {children}
    </button>
  );
};

export default PaginationButton;
