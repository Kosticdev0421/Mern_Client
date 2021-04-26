import React from 'react';
import './SelectTag.css';

const SelectTag = ({setTag}) => {
    const languages = ["C", "C++", "Python", "Javascript", "MathLab", "Fortran"];

    return (
        <div>
            <select onChange={handleChange} className="select-tag">
                <option value="All">All</option>
                {languages.map((language) => {
                    return <option value={language}>{language}</option>;
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