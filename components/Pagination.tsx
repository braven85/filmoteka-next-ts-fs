import usePage from '@/hooks/usePage';
import PaginationButton from './PaginationButton';
import arrow from '../public/arrow.svg';
import Image from 'next/image';
import useTotalPagPages from '@/hooks/useTotalPagPages';

const Pagination = () => {
  const { page, setPage } = usePage();
  const { totalPagPages } = useTotalPagPages();

  const handlePrevPage = () => {
    if (page <= 1) return;
    setPage(page - 1);
  };

  const handlePrevPageArrow = () => {
    if (page <= 1) return;
    setPage(page - 1);
    window.scrollTo(0, 0);
  };

  const handleNextPage = () => {
    if (totalPagPages) {
      if (page >= totalPagPages) return;
    }
    setPage(page + 1);
  };

  const handleNextPageArrow = () => {
    if (totalPagPages) {
      if (page >= totalPagPages) return;
    }
    setPage(page + 1);
    window.scrollTo(0, 0);
  };

  const handlePrevPageMinusOne = () => {
    if (page <= 2) return;
    setPage(page - 2);
  };

  const handleNextPagePlusOne = () => {
    if (totalPagPages) {
      if (page + 1 >= totalPagPages) return;
    }
    setPage(page + 2);
  };

  return (
    <div className='my-4 flex gap-x-[2px]'>
      <PaginationButton
        id='prev-page-btn'
        label={`Go back to page number ${page - 1}`}
        onClick={handlePrevPageArrow}
        className='bg-gray-100 hover:bg-gray-300'
      >
        <Image src={arrow} alt='arrow' width={16} height={16} />
      </PaginationButton>
      <PaginationButton
        id='two-prev-pages-btn'
        label={`Go back two pages to page number ${page - 2}`}
        className='hover:bg-gray-100'
        onClick={handlePrevPageMinusOne}
      >
        {page > 2 ? page - 2 : ''}
      </PaginationButton>
      <PaginationButton
        id='one-prev-page-btn'
        label={`Go back to page number ${page - 1}`}
        className='hover:bg-gray-100'
        onClick={handlePrevPage}
      >
        {page > 1 ? page - 1 : ''}
      </PaginationButton>
      <PaginationButton
        id='curr-page-btn'
        label={`Current page is page number ${page}`}
        className='bg-active-pagination-bg text-white'
      >
        {page}
      </PaginationButton>
      <PaginationButton
        id='one-next-page-btn'
        label={`Go to the next page number ${page + 1}`}
        className='hover:bg-gray-100'
        onClick={handleNextPage}
      >
        {page < totalPagPages! ? page + 1 : ''}
      </PaginationButton>
      <PaginationButton
        id='two-next-pages-btn'
        label={`Go forward to page number ${page + 2}`}
        className='hover:bg-gray-100'
        onClick={handleNextPagePlusOne}
      >
        {page + 1 < totalPagPages! ? page + 2 : ''}
      </PaginationButton>
      <PaginationButton
        id='next-page-btn'
        label={`Go to the next page number ${page + 1}`}
        onClick={handleNextPageArrow}
        className='bg-gray-100 hover:bg-gray-300'
      >
        <Image src={arrow} alt='arrow' width={16} height={16} className='rotate-180' />
      </PaginationButton>
    </div>
  );
};

export default Pagination;
