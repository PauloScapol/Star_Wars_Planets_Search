import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import AppContext from './AppContext';

export default function AppProvider({ children }) {
  const [fetchPlanets, setFetchPlanets] = useState([]);

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

  return (
    <AppContext.Provider value={ { fetchPlanets, setFetchPlanets } }>
      { children }
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.shape().isRequired,
};
