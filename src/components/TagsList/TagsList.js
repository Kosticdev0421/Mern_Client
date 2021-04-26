import React from 'react';
import { Link } from 'react-router-dom';
import './TagsList.css';

const TagsList = () => {
    const languages = ["C", "C++", "Python", "Javascript", "MathLab", "Fortran"];
    return (
        <div className="languages-list">
            <Link to="/tags/algorithms" className="language-name featured">
                <li>Algorithms</li>
            </Link>
            {
                languages.map(language => {
                    return (
                        <Link to={`/tags/${language}`} className="language-name">
                            <li>{language}</li>
                        </Link>
                    );
                })
            }
            
        </div>
    );
};

export default TagsList;