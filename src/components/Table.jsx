import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import '../styles/Table.css';

export default function Table() {
  const { nameFilter } = useContext(AppContext);

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Rotation Period (Hours)</th>
          <th>Orbital Period (Days)</th>
          <th>Diameter (Km)</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Surface Water (%)</th>
          <th>Population</th>
          <th>Films</th>
          <th>Created</th>
          <th>Edited</th>
          <th>URL</th>
        </tr>
      </thead>
      <tbody>
        { nameFilter.map((obj) => (
          <tr key={ obj.name }>
            <td>{ obj.name }</td>
            <td>{ obj.rotation_period }</td>
            <td>{ obj.orbital_period }</td>
            <td>{ Number(obj.diameter).toLocaleString('en-US') }</td>
            <td>{ obj.climate }</td>
            <td>{ obj.gravity }</td>
            <td>{ obj.terrain }</td>
            <td>{ obj.surface_water }</td>
            <td>{ Number(obj.population).toLocaleString('en-US') }</td>
            <td>{ obj.films }</td>
            <td>{ obj.created }</td>
            <td>{ obj.edited }</td>
            <td>{ obj.url }</td>
          </tr>
        )) }
      </tbody>
    </table>
  );
}
