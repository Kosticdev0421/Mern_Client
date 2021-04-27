import React, { useEffect, useState } from 'react';
import './SelectTag.css';

const SelectTag = ({setTag}) => {
    // const tagsList = ["C", "C++", "Python", "Javascript", "MathLab", "Fortran"];
    const [tagsList, setTagsList] = useState([]);
    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/tags`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setTagsList(data);
        });
    }, []);
    return (
        <div>
            <select onChange={handleChange} className="select-tag">
                <option value="All">All</option>
                {tagsList && tagsList.map((tag) => {
                    return <option key={tag} value={tag}>{tag}</option>;
                })}
            </select>
        </div>
    );
    function handleChange(e){
        const options = [...e.target.selectedOptions].map((option) => option.value);
        console.log(options)
        setTag(options);
    }
};

export default SelectTag;