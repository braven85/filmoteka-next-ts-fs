"use client";

import React, { useEffect, useRef } from "react";
import searchIcon from "../public/search.svg";
import Image from "next/image";
import useMoviesList from "@/hooks/useMoviesList";
import usePage from "@/hooks/usePage";
import useTotalPagPages from "@/hooks/useTotalPagPages";
import useTotalResults from "@/hooks/useTotalResults";
import { useDebouncedCallback } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SearchInput = () => {
  const { setMoviesList } = useMoviesList();
  const { page, setPage } = usePage();
  const { setTotalPagPages } = useTotalPagPages();
  const { totalResults, setTotalResults } = useTotalResults();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const inputValue = useRef<any>(null);

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
        throw new Error("Something went wrong!");
      } else {
        return res.json().then((data) => setData(data));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTrendingMovies = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=ee05cb5c4e7bec8bf2cb81503e07020d&page=${page}`
      );

      if (!res.ok) {
        throw new Error("Something went wrong!");
      } else {
        return res.json().then((data) => setData(data));
      }
    } catch (error) {
      return console.error(error);
    }
  };

  useEffect(() => {
    if (page !== 1) setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams?.get("query")]);

  const handleMoviesFetch = useDebouncedCallback(() => {
    if (searchParams?.get("query") !== null) {
      fetchMovies(searchParams?.get("query")!);
    }
  }, 500);

  useEffect(() => {
    if (searchParams?.get("query") === null) {
      inputValue.current.value = "";
      fetchTrendingMovies();
    }

    handleMoviesFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  useEffect(() => {
    if (searchParams?.get("query") !== null) {
      fetchMovies(searchParams?.get("query")!);
    }

    if (searchParams?.get("query") === null) {
      fetchTrendingMovies();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleSearch = (input: string) => {
    const params = new URLSearchParams(searchParams!);

    if (input) {
      params.set("query", input);
    } else {
      params.delete("query");
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-col w-[90%] md:w-[60%] gap-y-3">
      <div className="w-full flex items-center relative">
        <input
          type="text"
          placeholder="Enter movie name..."
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={searchParams?.get("query") as string}
          ref={inputValue}
          className="w-full text-white outline-none border-b-white border-b-[0.5px] bg-transparent text-sm"
        />
        <Image src={searchIcon} alt="search icon" width={12} height={12} className="absolute right-0" />
      </div>
      {totalResults === 0 && <div className="text-red-600 text-center">No results. Enter the correct movie name</div>}
    </div>
  );
};

export default SearchInput;
