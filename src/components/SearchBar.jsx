import React from 'react';

const SearchBar = ({ setArtist }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    setArtist(e.target[0].value);
  };

  return (
    <form
      className="w-1/2 mx-auto h-10 flex items-center justify-center"
      onSubmit={(e) => handleSubmit(e)}
    >
      <label className="sr-only" htmlFor="searchbar">
        Serach by artist
      </label>
      <input
        className="w-full h-full rounded-l-md text-center border-none placeholder:text-center focus:outline-1 focus:outline-purple-500 focus:ring-0 "
        name="searchbar"
        placeholder="Search by artist"
        type="text"
      />
      <button
        className="w-1/3 h-full bg-gray-800 text-white rounded-r-md"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export default SearchBar;