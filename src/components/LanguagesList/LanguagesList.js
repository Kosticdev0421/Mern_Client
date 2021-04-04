import React from 'react';
import { Link } from 'react-router-dom';
import './LanguagesList.css';

const LanguagesList = () => {
    const languages = ["C", "C++", "Python", "Javascript", "MathLab", "Fortran"];
    return (
        <div className="languages-list">
            <Link to="/languages/algorithms" className="language-name featured">
                <li>Algorithms</li>
            </Link>
            {
                languages.map(language => {
                    return (
                        <Link to={`/languages/${language}`} className="language-name">
                            <li>{language}</li>
                        </Link>
                    );
                })
            }
            
        </div>
    );
};

export default LanguagesList;