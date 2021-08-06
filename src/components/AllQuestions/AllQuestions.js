import { getQuestions } from 'api';
import React, { useEffect, useState } from 'react';
import loadingImg from "../../images/Loading-Infinity.gif";
import Question from '../Questions/Question/Question';
import './AllQuestions.css';
import Filters from './Filters/Filters';
const AllQuestions = () => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const get = async () => {
            try {
                const { data } = await getQuestions();
                setQuestions(data);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        get();
    }, []);

    if (loading) {
        return (
            <div className="loading">
                <p>Loading something awesome...</p>
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