import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Question from "../Question//Question";

const QuestionsByLanguage = () => {
    const {language} = useParams();
    const [questions, setQuestions] = useState([]);
    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/questionsByLanguage/${language}`)
        .then(res => res.json())
        .then(data => {
            setQuestions(data);
        })
    }, []);
    return (
        <div className="home">
            <h3>Found {questions.length} questions on {language}</h3>
            {
                questions && questions.map(question => {
                    return <Question question={question} />
                })
            }
        </div>
    );
};

export default QuestionsByLanguage;