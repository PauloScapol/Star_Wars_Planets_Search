import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import '../styles/Filter.css';

export default function Filters() {
  const {
    filterSearch, setFilterSearch,
    columnFilter, setColumnFilter,
    comparison, setComparison,
    valueFilter, setValueFilter,
    newFilteredArray, setNewFilteredArray,
    optionsColumn, fetchPlanets,
    filteredOptionsArray, setFilteredOptionsArray,
    setFilteredStatus, setNameFilter,
  } = useContext(AppContext);

  function handleClick() {
    setFilteredStatus(true);

    setNewFilteredArray((prevList) => [...prevList, {
      column: columnFilter,
      operator: comparison,
      number: valueFilter,
    }]);

    setFilteredOptionsArray((prevList) => [...prevList, columnFilter]);
  }

  // Deleta só 1 filtro
  function handleDelete(e) {
    setNameFilter(fetchPlanets);

    setNewFilteredArray(newFilteredArray
      .filter((obj) => obj.column !== e.target.value));

    const updatedOptions = filteredOptionsArray
      .filter((options) => options !== e.target.value);

    setFilteredOptionsArray(updatedOptions);
  }

  // Reseta os filtros
  function handleReset() {
    setNewFilteredArray([]);
    setFilteredOptionsArray([]);
    setColumnFilter('population');
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
        { filteredOptionsArray.length > 0 ? optionsColumn
          .map((opt) => (!filteredOptionsArray.includes(opt) && (
            <option key={ opt } value={ opt }>
              {opt}
            </option>)))
          : optionsColumn.map((option) => (
            <option
              key={ option }
              value={ option }
            >
              {option}
            </option>))}
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

      <button
        data-testid="button-remove-filters"
        type="button"
        onClick={ handleReset }
      >
        Remover todas filtragens
      </button>

      {newFilteredArray.length > 0 && newFilteredArray
        .map((filter) => (
          <li data-testid="filter" key={ filter.column }>
            {`${filter.column} ${filter.operator} ${filter.number}`}

            <button
              type="button"
              value={ filter.column }
              onClick={ handleDelete }
            >
              X
            </button>
          </li>
        ))}
    </>
  );
}
