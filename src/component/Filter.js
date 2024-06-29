import React, {useEffect, useState} from 'react';
import axios from "axios";

const Filter = ({setQuery, setTopic, setMinPrice, setMaxPrice}) => {
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const response = await axios.get('http://localhost:8080/topics');
                setTopics(response.data);
            } catch (error) {
                console.error('Error fetching topics:', error);
            }
        };

        fetchTopics();
    }, []);
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
                {topics.map((topic) => (
                    <option key={topic._id} value={topic._id}>
                        {topic.name}
                    </option>
                ))}
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