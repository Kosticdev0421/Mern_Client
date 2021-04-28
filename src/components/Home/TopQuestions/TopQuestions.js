import { useEffect, useState } from 'react';
import loadingImg from "../../../images/Loading-Infinity.gif";
import Question from '../../Question/Question';
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
                
                <img src={loadingImg} alt="" />
            </div>
        );
    }

    return (
        <div className="top-questions">
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