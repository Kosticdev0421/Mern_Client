import React, { useEffect, useState } from 'react';
import Question from '../Question/Question';

const TopQuestions = () => {
    const [topQuestions, setTopQuestions] = useState([]);
    const titles = ["Top Liked:", "Trending:"];
    useEffect(() => {
        fetch(`http://localhost:5000/questions/top`)
        .then(res => res.json())
        .then(data => {
            setTopQuestions(data);
            console.log(data);
        })
    }, [])
    return (
        <div>
            {topQuestions && topQuestions.map((question, i) => {
                return (
                    <div>
                        <h3>{titles[i]}</h3>
                        <Question question={question} />
                    </div>
                );
            })}
        </div>
    );
};

export default TopQuestions;