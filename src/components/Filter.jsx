import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

export default function Filters() {
  const { filterSearch, setFilterSearch } = useContext(AppContext);

  function handleFilterSearch(e) {
    setFilterSearch(e.target.value);
  }

  return (
    <input
      data-testid="name-filter"
      type="text"
      value={ filterSearch }
      onChange={ handleFilterSearch }
    />
  );
}
