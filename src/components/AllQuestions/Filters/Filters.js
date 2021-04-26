import React, { useRef, useState } from 'react';
import SelectTag from '../../Common/SelectTag/SelectTag';
import './Filters.css';

const Filters = ({getQuestions}) => {
    const [questions, setQuestions] = getQuestions;
    const sortByRef = useRef();
    const [tag, setTag] = useState([]);

    return (
        <div className="filters">
            <p>Sort by: </p>
            <select ref={sortByRef}>
                <option value="latest">Latest Questions</option>
                <option value="like">Top Liked</option>
            </select>
            <p>Topic</p>
            <SelectTag setTag={setTag} />
            <button className="submit-btn" onClick={handleFilter}>
                Filter
            </button>
        </div>
    );

    function handleFilter(){
        const sortBy = sortByRef.current.value;
        const url = `${process.env.REACT_APP_SERVER_URL}/questions?sortBy=${sortBy}&tag=${tag}`;
        console.log(url)
        fetch(url)
        .then((res) => res.json())
        .then((data) => {
                setQuestions(data);
                console.log(data)
            });
        }
    };

export default Filters;