import { getTags } from 'api';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './TagsList.css';

const TagsList = () => {
    // const tagsList = ["C", "C++", "Python", "Javascript", "MathLab", "Fortran"];
    const [tagsList, setTagsList] = useState([]);
    useEffect(() => {
        const get = async () => {
            try {
                const { data } = await getTags();
                setTagsList(data);
            } catch (error) {
                console.log(error);
            }
        };
        get();
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