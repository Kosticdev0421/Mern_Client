import { getQuestionsByTag } from 'api';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Question from "../Questions/Question/Question";

const QuestionsByTag = () => {
    const {tag} = useParams();
    const [questions, setQuestions] = useState([]);
    
    useEffect(() => {
        const get = async () => {
            try {
                const { data } = await getQuestionsByTag(tag);
                setQuestions(data);
            } catch (error) {
                console.log(error);
            }
        };
        get();
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