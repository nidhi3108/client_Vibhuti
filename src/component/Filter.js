import React from 'react';

const Filter = ({ setQuery, setTopic, setMinPrice, setMaxPrice }) => {
  return (
    <div className="filter-container">
      <h2>Filter</h2>
      <input
        type="text"
        placeholder="Search for courses..."
        onChange={(e) => setQuery(e.target.value)}
      />
      <select onChange={(e) => setTopic(e.target.value)}>
        <option value="">All Topics</option>
        <option value="T12345">React</option>
        <option value="T67890">Html</option>
        <option value="T11223">Css</option>
        <option value="T44556">Javascript</option>
        <option value="T77889">Node</option>
        <option value="T77889">Express</option>
        <option value="T77889">Mongodb</option>
        <option value="T77889">Sql</option>
        <option value="T77889">Bootstrap</option>
      </select>
      <input
        type="number"
        placeholder="Min Price"
        onChange={(e) => setMinPrice(e.target.value)}
      />
      <input
        type="number"
        placeholder="Max Price"
        onChange={(e) => setMaxPrice(e.target.value)}
      />
    </div>
  );
};

export default Filter;