import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
// import useInput from '../hooks/useInput';

export default function Filters() {
  const {
    filterSearch, setFilterSearch,
    setComparison,
    setColumnFilter,
    valueFilter, setValueFilter,
    buttonClick, setButtonClick,
  } = useContext(AppContext);

  // const filterSearch = useInput('');
  // const comparison = useInput('');
  // const columnFilter = useInput('');
  // const valueFilter = useInput('');

  function handleFilterSearch(e) {
    setFilterSearch(e.target.value);
  }

  function handleComparison(e) {
    setComparison(e.target.value);
  }

  function handleColumnFilter(e) {
    setColumnFilter(e.target.value);
  }

  function handleValueFilter(e) {
    setValueFilter(e.target.value);
  }

  function handleClick() {
    setButtonClick(!buttonClick);
  }

  return (
    <>
      <input
        data-testid="name-filter"
        type="text"
        value={ filterSearch }
        onChange={ handleFilterSearch }
      />

      <select data-testid="column-filter" onChange={ handleColumnFilter }>
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>

      <select data-testid="comparison-filter" onChange={ handleComparison }>
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>

      <input
        data-testid="value-filter"
        type="number"
        value={ valueFilter }
        onChange={ handleValueFilter }
      />

      <button data-testid="button-filter" type="submit" onClick={ handleClick }>
        FILTRAR
      </button>
    </>
  );
}
