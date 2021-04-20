import React, { useRef } from 'react';
import './Filters.css';

const Filters = ({getQuestions}) => {
    const [questions, setQuestions] = getQuestions;
    const sortByRef = useRef();
    const languageRef = useRef();
    const languages = ["C", "C++", "Python", "Javascript", "MathLab", "Fortran"];

    return (
        <div className="filters">
            <p>Sort by: </p>
            <select ref={sortByRef}>
                <option value="latest">Latest Questions</option>
                <option value="like">Top Liked</option>
            </select>
            <p>Language</p>
            <select ref={languageRef}>
                <option value="All">All</option>
                {languages.map((language) => {
                    return <option value={language}>{language}</option>;
                })}
            </select>
            <button className="submit-btn" onClick={handleFilter}>
                Filter
            </button>
        </div>
    );

    function handleFilter(){
        const sortBy = sortByRef.current.value;
        const language = languageRef.current.value;
        const url = `${process.env.REACT_APP_SERVER_URL}/questions?sortBy=${sortBy}&language=${language}`;
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