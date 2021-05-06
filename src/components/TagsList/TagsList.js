import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './TagsList.css';

const TagsList = () => {
    // const tagsList = ["C", "C++", "Python", "Javascript", "MathLab", "Fortran"];
    const [tagsList, setTagsList] = useState([]);
    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/tags`)
            .then((res) => res.json())
            .then((data) => {
                setTagsList(data);
            });
    }, []);
    return (
        <div className="languages-list">
            <Link to="/tags/algorithms" className="language-name featured">
                <li>Algorithms</li>
            </Link>
            {
                tagsList?.map(tag => {
                    return (
                        <Link to={`/tags/${tag}`} className="language-name" key={tag}>
                            <li>{tag}</li>
                        </Link>
                    );
                })
            }
            
        </div>
    );
};

export default TagsList;