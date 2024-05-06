'use client';

import { ClipLoader } from 'react-spinners';

const Loader = () => {
  return (
    <div className='h-[70vh] flex flex-col justify-center items-center'>
      <ClipLoader color='#FF6B08' size={100} />
    </div>
  );
};

export default Loader;
