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
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/search', {
          params: {
            query,
            topic,
            minPrice,
            maxPrice,
            sort,
            page
          }
        });
        setResults(response.data.courses);
        setTotalPages(response.data.pages);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [query, topic, minPrice, maxPrice, sort, page]);

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
        <div className="pagination">
          <button disabled={page <= 1} onClick={() => setPage(page - 1)}>Previous</button>
          <span>Page {page} of {totalPages}</span>
          <button disabled={page >= totalPages} onClick={() => setPage(page + 1)}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default Search;
