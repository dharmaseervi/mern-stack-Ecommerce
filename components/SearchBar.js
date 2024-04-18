'use client'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react';
import { GlobalContext } from './GlobalContex';

const SearchBar = () => {
  const { setForceUpdate } = useContext(GlobalContext);
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchProduct, setSearchProduct] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleInputBlur = () => {
    setShowResults(false);
  };

  const handleInputFocus = () => {
    setShowResults(true);
  };

  const handleSearchQuery = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      const response = await fetch(`api/search?query=${searchQuery}`);
      const data = await response.json();
      setSearchProduct(data.filterData);
      localStorage.setItem('searchResults', JSON.stringify(data.filterData));
      router.push('/searchbar');
      setForceUpdate(prev => !prev);

    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setLoading(false);
    }
  };
  const handleResultClick = (productName) => {
    router.push(`/searchbar`);
    console.log('hello');
  };


  return (
    <form className="relative flex items-center w-full" onSubmit={handleSearchQuery}>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchQueryChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        className="w-full h-full border-gray-300 text-black rounded-t  focus:outline-none"
        placeholder="Search..."
      />

      <button className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600" type='submit' >
        <span className="sr-only">Search</span>
        <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
      </button>

      {showResults && (
        <div className="absolute top-full left-0 right-0 bg-slate-300  rounded-b-md shadow-lg h-full z-20">
          {loading ? (
            <div className='flex px-2 border-b py-1 justify-between bg-slate-600'>
              <p>Loading...</p>
            </div>
          ) : (

            <ul >
              {searchProduct?.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleResultClick(item.productname)}
                  className='flex px-2 border-b py-1 justify-between bg-slate-600 hover:bg-slate-400'>
                  <div className='flex justify-center items-center'>
                    <h1>{item.productname}</h1>
                  </div>
                  <div className='w-14 h-14'>
                    <img className='w-full h-full object-cover' src={item?.photo?.[0]} alt="" />
                  </div>
                </div>
              ))}
            </ul>
          )}
        </div>
      )}
    </form>
  );
};

export default SearchBar;
