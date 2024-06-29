import React from 'react';

const Sort = ({ setSort }) => {
  return (
    <div className="sort-container">
      <h2>Sort</h2>
      <select onChange={(e) => setSort(e.target.value)}>
        <option value="newest">Newest</option>
        <option value="ascending">Price: Low to High</option>
      </select>
    </div>
  );
};

export default Sort;