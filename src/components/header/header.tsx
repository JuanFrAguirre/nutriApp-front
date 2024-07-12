'use client';
import localFont from 'next/font/local';
import Image from 'next/image';
import Logo from '@nutriApp/img/nutriApp.jpeg';
import Link from 'next/link';
import { Input } from '@nutriApp/components/input/input';
import { useProducts } from '@nutriApp/services/useProducts';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';

export const frankfurter = localFont({
  src: [
    {
      path: '../../fonts/FranxurterMedium.ttf',
      style: 'normal',
      weight: '400',
    },
    {
      path: '../../fonts/FranxurterFat.ttf',
      style: 'bold',
      weight: '700',
    },
  ],
});

export const Header = () => {
  const { filterProducts, setFiltering } = useProducts();
  const [filterKeywords, setFilterKeywords] = useState('');

  const onFilterChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFilterKeywords(e.target.value);
  }, []);

  useEffect(() => {
    if (!!filterKeywords.length) {
      filterProducts(filterKeywords);
    }
    if (!filterKeywords.length) {
      setFiltering(false);
    }
  }, [filterKeywords, setFiltering, filterProducts]);

  return (
    <header
      className={`bg-white py-4 px-3 border-b-2 border-stone-200 fixed top-0 left-0 right-0 z-[600]`}
    >
      <div className="flex justify-between items-center max-w-[1400px] mx-auto">
        <Link href={'/'} className="flex items-center gap-1">
          <Image
            src={Logo}
            alt="NutriApp logo"
            width={200}
            height={200}
            className="w-8 h-8"
          />
          <h1
            className={`font-bold ${frankfurter.className} tracking-wide text-2xl text-brandGreen font-frankfurter`}
          >
            NUTRI APP
          </h1>
        </Link>
        <div>
          <Input
            id="searchbar"
            name="searchbar"
            type="text"
            className="w-full"
            logo
            inputClassName="w-40"
            onChange={onFilterChange}
          />
        </div>
      </div>
    </header>
  );
};
