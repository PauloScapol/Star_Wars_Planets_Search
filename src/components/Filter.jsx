import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
// import useInput from '../hooks/useInput';

export default function Filters() {
  // const filterSearch = useInput('');
  // const comparison = useInput('');
  // const columnFilter = useInput('');
  // const valueFilter = useInput('');
  const {
    filterSearch, setFilterSearch,
    columnFilter, setColumnFilter,
    comparison, setComparison,
    valueFilter, setValueFilter,
    buttonClick, setButtonClick,
    newFilteredArray, setNewFilteredArray,
    setFilteredStatus,
  } = useContext(AppContext);

  function handleClick() {
    setButtonClick(!buttonClick);
    setFilteredStatus(true);

    setNewFilteredArray((prevList) => [...prevList, {
      column: columnFilter,
      operator: comparison,
      number: valueFilter,
    }]);

    setButtonClick(false);
  }

  return (
    <>
      <input
        data-testid="name-filter"
        type="text"
        value={ filterSearch }
        onChange={ (e) => setFilterSearch(e.target.value) }
      />

      <select
        data-testid="column-filter"
        onChange={ (e) => setColumnFilter(e.target.value) }
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>

      <select
        data-testid="comparison-filter"
        onChange={ (e) => setComparison(e.target.value) }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>

      <input
        data-testid="value-filter"
        type="number"
        value={ valueFilter }
        onChange={ (e) => setValueFilter(e.target.value) }
      />

      <button
        data-testid="button-filter"
        type="submit"
        onClick={ handleClick }
      >
        FILTRAR
      </button>

      {newFilteredArray.length > 0 && newFilteredArray
        .map((filter) => (
          <li key={ filter.number }>
            {`${filter.column} ${filter.operator} ${filter.number}`}
          </li>
        ))}
    </>
  );
}
