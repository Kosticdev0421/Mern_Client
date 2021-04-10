import { useEffect, useState } from 'react';
import Question from '../Question//Question';
const TopQuestions = () => {
    const [topQuestions, setTopQuestions] = useState([]);
    const titles = ["Top Liked:", "Trending:"];
    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/questions/top`)
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