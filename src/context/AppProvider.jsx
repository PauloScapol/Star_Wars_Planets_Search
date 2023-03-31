import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import AppContext from './AppContext';

export default function AppProvider({ children }) {
  const [fetchPlanets, setFetchPlanets] = useState([]);
  const [nameFilter, setNameFilter] = useState([]);
  const [filterSearch, setFilterSearch] = useState('');
  const [columnFilter, setColumnFilter] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [valueFilter, setValueFilter] = useState('0');
  const [filteredStatus, setFilteredStatus] = useState(false);
  const [newFilteredArray, setNewFilteredArray] = useState([]);
  const [filteredOptionsArray, setFilteredOptionsArray] = useState([]);
  const [optionsColumn, setOptionsColumn] = useState(['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water']);

  useEffect(() => {
    const requestAPI = async () => {
      const response = await fetch('https://swapi.dev/api/planets');
      const { results } = await response.json();
      const noResidents = results.map((obj) => {
        delete obj.residents; // https://www.scaler.com/topics/remove-a-property-from-javascript-object/
        return obj;
      });

      setFetchPlanets(noResidents);
      setNameFilter(noResidents);
    };

    requestAPI();
  }, []);

  useEffect(() => {
    const filteredArray = nameFilter.filter((obj) => {
      const filterName = obj.name.toLowerCase()
        .includes(filterSearch.toLowerCase());

      let filterColumn = true;

      if (filteredStatus) {
        newFilteredArray.map(({ column, operator, number }) => {
          if (operator === 'maior que') {
            filterColumn = parseFloat(obj[column]) > parseFloat(number);
          } else if (operator === 'menor que') {
            filterColumn = parseFloat(obj[column]) < parseFloat(number);
          } else if (operator === 'igual a') {
            filterColumn = obj[column] === number;
          }
          return filterColumn;
        });
      }

      return filterName && filterColumn;
    });

    if (newFilteredArray.length === 0) {
      setNameFilter(fetchPlanets.filter((obj) => obj.name.toLowerCase()
        .includes(filterSearch.toLowerCase())));
    } else {
      setNameFilter(filteredArray);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterSearch, filteredStatus, newFilteredArray]);

  useEffect(() => {
    if (filteredOptionsArray.length > 0) {
      const optionsArray = optionsColumn
        .filter((opt) => (!filteredOptionsArray.includes(opt) && opt));
      setColumnFilter(optionsArray[0]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredOptionsArray, newFilteredArray]);

  return (
    <AppContext.Provider
      value={ {
        filterSearch,
        setFilterSearch,
        valueFilter,
        setValueFilter,
        comparison,
        setComparison,
        columnFilter,
        setColumnFilter,
        newFilteredArray,
        setNewFilteredArray,
        optionsColumn,
        setOptionsColumn,
        filteredOptionsArray,
        setFilteredOptionsArray,
        nameFilter,
        setNameFilter,
        fetchPlanets,
        setFilteredStatus,
      } }
    >
      { children }
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.shape).isRequired,
};
