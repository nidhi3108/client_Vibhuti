import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './Filter';
import Sort from './Sort';
import CourseCard from './CourseCard';

const Search = () => {
  const [query, setQuery] = useState('');
  const [topic, setTopic] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sort, setSort] = useState('newest');
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/search', {
          params: {
            query,
            topic,
            minPrice,
            maxPrice,
            sort
          }
        });
        console.log(response.data)
        setResults(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [query, topic, minPrice, maxPrice, sort]);

  return (
    <div className="search-container">
      <div className="left-side">
        <Filter
          setQuery={setQuery}
          setTopic={setTopic}
          setMinPrice={setMinPrice}
          setMaxPrice={setMaxPrice}
        />
      </div>
      <div className="right-side">
        <Sort setSort={setSort} />
        <div className="results">
          {results.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;