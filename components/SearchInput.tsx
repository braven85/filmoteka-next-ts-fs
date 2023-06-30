import React, { useEffect, useMemo } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import searchIcon from '../public/search.svg';
import Image from 'next/image';
import useMoviesList from '@/hooks/useMoviesList';
import usePage from '@/hooks/usePage';
import debounce from 'lodash.debounce';
import useSearchInput from '@/hooks/useSearchInput';
import useTotalPagPages from '@/hooks/useTotalPagPages';
import useTotalResults from '@/hooks/useTotalResults';

interface SearchInputProps {
  id: string;
  register: UseFormRegister<FieldValues>;
}

const SearchInput: React.FC<SearchInputProps> = ({ id, register }) => {
  const { setMoviesList } = useMoviesList();
  const { page, setPage } = usePage();
  const { searchInput, setSearchInput } = useSearchInput();
  const { setTotalPagPages } = useTotalPagPages();
  const { totalResults, setTotalResults } = useTotalResults();

  const setData = (data: any) => {
    setMoviesList(data.results);
    setTotalPagPages(data.total_pages);
    setTotalResults(data.total_results);
  };

  const fetchMovies = async (movieName: string | undefined) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=ee05cb5c4e7bec8bf2cb81503e07020d&query=${movieName}&page=${page}`
      );

      if (!res.ok) {
        throw new Error('Something went wrong!');
      } else {
        return res.json().then(data => setData(data));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (page !== 1) setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  useEffect(() => {
    if (searchInput === '' || searchInput === undefined) {
      return;
    } else {
      fetchMovies(searchInput);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput, page]);

  const handleChange = (e: { target: { value: string } }) => {
    setSearchInput(e.target.value);
  };

  const debouncedResults = useMemo(() => {
    return debounce(handleChange, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='flex flex-col w-[90%] md:w-[60%] gap-y-3'>
      <div className='w-full flex items-center relative'>
        <input
          id={id}
          placeholder='Enter movie name...'
          {...register(id, { onChange: debouncedResults, value: searchInput })}
          className='w-full text-white outline-none border-b-white border-b-[0.5px] bg-transparent text-sm'
        />
        <Image
          src={searchIcon}
          alt='search icon'
          width={12}
          height={12}
          className='absolute right-0'
        />
      </div>
      {totalResults === 0 && (
        <div className='text-red-600 text-center'>No results. Enter the correct movie name</div>
      )}
    </div>
  );
};

export default SearchInput;
