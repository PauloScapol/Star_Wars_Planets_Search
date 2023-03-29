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
  const [buttonClick, setButtonClick] = useState(false);

  useEffect(() => {
    const requestAPI = async () => {
      const response = await fetch('https://swapi.dev/api/planets');
      const { results } = await response.json();
      const noResidents = results.map((obj) => {
        delete obj.residents; // https://www.scaler.com/topics/remove-a-property-from-javascript-object/
        return obj;
      });

      setFetchPlanets(noResidents);
    };

    requestAPI();
  }, []);

  useEffect(() => {
    const filteredArray = fetchPlanets.filter((obj) => {
      const filterName = obj.name.toLowerCase()
        .includes(filterSearch.toLowerCase());

      let filterColumn = true;

      if (buttonClick) {
        if (comparison === 'maior que') {
          filterColumn = parseFloat(obj[columnFilter]) > parseFloat(valueFilter);
        } else if (comparison === 'menor que') {
          filterColumn = parseFloat(obj[columnFilter]) < parseFloat(valueFilter);
        } else if (comparison === 'igual a') {
          filterColumn = obj[columnFilter] === valueFilter;
        }
      }
      return filterName && filterColumn;
    });
    setNameFilter(filteredArray);
  }, [filterSearch, buttonClick, fetchPlanets, comparison, columnFilter, valueFilter]);

  return (
    <AppContext.Provider
      value={ {
        fetchPlanets,
        setFetchPlanets,
        filterSearch,
        setFilterSearch,
        nameFilter,
        setComparison,
        setColumnFilter,
        valueFilter,
        setValueFilter,
        buttonClick,
        setButtonClick } }
    >
      { children }
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.shape).isRequired,
};
