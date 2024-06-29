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
            {/*<select onChange={(e) => setTopic(e.target.value)}>*/}
            {/*    <option disabled={true} value="">All Topics</option>*/}
            {/*    <option value="T12345">React</option>*/}
            {/*    <option value="T67890">Html</option>*/}
            {/*    <option value="T11223">Css</option>*/}
            {/*    <option value="T44556">Javascript</option>*/}
            {/*    <option value="T77889">Node</option>*/}
            {/*    <option value="T77889">Express</option>*/}
            {/*    <option value="T77889">Mongodb</option>*/}
            {/*    <option value="T77889">Sql</option>*/}
            {/*    <option value="T77889">Bootstrap</option>*/}
            {/*</select>*/}
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