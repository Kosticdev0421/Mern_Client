import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Question from "../Questions/Question/Question";

const QuestionsByTag = () => {
    const {tag} = useParams();
    const [questions, setQuestions] = useState([]);
    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/questionsByTag/${tag}`)
        .then(res => res.json())
        .then(data => {
            setQuestions(data);
        })
    }, []);
    return (
        <div className="home">
            <h3>Found {questions.length} questions on {tag}</h3>
            {
                questions && questions.map(question => {
                    return <Question question={question} />
                })
            }
        </div>
    );
};

export default QuestionsByTag;