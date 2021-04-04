import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from 'react';
import loadingImg from '../../images/Loading-Infinity.gif';
import Question from '../Question/Question';
import './Home.css';

const Home = () => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5000/questions')
        .then(res => res.json())
        .then(data => {
            setQuestions(data);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return (
            <div className="loading">
                <h1>Processing your request...</h1>
                <img src={loadingImg} alt=""/>
            </div>
        );
    }
    return (
        <div className="home">
            <h3>
                {"<Latest />"} 
                <br/>
                <FontAwesomeIcon icon={faQuestionCircle} />
            </h3>
            {questions &&
                questions.map((question) => <Question question={question} key={question._id} />)}
        </div>
    );
};


export default Home;