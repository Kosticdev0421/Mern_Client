import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from 'react';
import Question from '../Question/Question';
import './Home.css';

const Home = () => {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/questions')
        .then(res => res.json())
        .then(data => setQuestions(data));
    }, []);
    return (
        <div className="home">
            <h1>
                {"<Latest />"} 
                <br/>
                <FontAwesomeIcon icon={faQuestionCircle} />
            </h1>
            {questions &&
                questions.map((question) => <Question question={question} key={question._id} />)}
        </div>
    );
};


export default Home;