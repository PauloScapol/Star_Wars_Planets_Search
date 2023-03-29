import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import AppContext from './AppContext';

export default function AppProvider({ children }) {
  const [fetchPlanets, setFetchPlanets] = useState([]);
  const [nameFilter, setNameFilter] = useState([]);
  const [filterSearch, setFilterSearch] = useState('');

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
    const filteredArray = fetchPlanets.filter((obj) => obj.name.toLowerCase()
      .includes(filterSearch.toLowerCase()));

    setNameFilter(filteredArray);
  }, [nameFilter, fetchPlanets, filterSearch]); // https://github.com/facebook/react/issues/14920

  return (
    <AppContext.Provider
      value={ {
        fetchPlanets,
        setFetchPlanets,
        filterSearch,
        setFilterSearch,
        nameFilter } }
    >
      { children }
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.shape().isRequired,
};
