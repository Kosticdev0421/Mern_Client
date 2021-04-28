import React, { useEffect, useState } from 'react';
import loadingImg from "../../images/Loading-Infinity.gif";
import Question from '../Question/Question';
import './AllQuestions.css';
import Filters from './Filters/Filters';
const AllQuestions = () => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/questions`)
            .then((res) => res.json())
            .then((data) => {
                setQuestions(data);
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
        <div className="all-questions-container">
            <Filters getQuestions={[questions, setQuestions]} />
            <small>Number of questions loaded: {questions.length}</small>
            <div className="all-questions">
                {questions &&
                    questions.map((question) => (
                        <Question question={question} key={question._id} />
                    ))}
            </div>
        </div>
    );
};

export default AllQuestions;