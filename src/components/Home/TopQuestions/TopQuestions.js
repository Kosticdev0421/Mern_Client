import { useEffect, useState } from 'react';
import Question from '../../Questions/Question/Question';
import './TopQuestions.css';

const TopQuestions = () => {
    const [topQuestions, setTopQuestions] = useState([]);
    const titles = ["Top Liked:", "Trending:"];
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/questions/top`)
        .then(res => res.json())
        .then(data => {
            setTopQuestions(data);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return (
            <div className="loading">
                <p>Loading top questions...</p>
            </div>
        );
    }

    return (
        <div className="top-questions">
            {topQuestions && topQuestions.map((question, i) => {
                return (
                    <div key={question._id}>
                        <h3>{titles[i]}</h3>
                        <Question question={question} />
                    </div>
                );
            })}
        </div>
    );
};

export default TopQuestions;