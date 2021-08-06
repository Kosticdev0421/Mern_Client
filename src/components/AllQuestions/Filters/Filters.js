import { getFilteredQuestions } from 'api';
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
            <button className="btn-brand" onClick={handleFilter}>
                Filter
            </button>
        </div>
    );

    async function handleFilter(){
        const sortBy = sortByRef.current.value;
        const encodedTag = encodeURIComponent(tag);
        
        try {
            const { data } = await getFilteredQuestions(sortBy, encodedTag);
            setQuestions(data);
        } catch (error) {
            console.log(error);
        }
        }
        
    };

export default Filters;