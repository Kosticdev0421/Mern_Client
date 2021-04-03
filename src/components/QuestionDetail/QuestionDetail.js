import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const QuestionDetail = () => {
    const {id} = useParams();
    const [question, setQuestion] = useState({});
    const [response, setResponse] = useState("");
    useEffect(() => {
        fetch(`http://localhost:5000/questions/${id}`)
        .then(res => res.json())
        .then(data => setQuestion(data));
    }, []);

    return (
        <div>
            {
                question && <div className="question">
                    <p>{question.questionText}</p>
                    <p>On {question.questionLanguage}</p>
                    <WriteAnswerForm />
                </div>
            }
        </div>
    );

    function WriteAnswerForm(){
        const [answerText, setAnswerText] = useState("");
        return (
            <form className="login-form" onSubmit={addAnswer}>
                {
                    response && <p>{response}</p>
                }
                <textarea
                    cols="45"
                    rows="5"
                    placeholder="আপনার চমৎকার উত্তরটি এখানে লিখুন"
                    required
                    value={answerText}
                    onChange={(e) => {
                        setAnswerText(e.target.value);
                        setResponse("");
                    }}
                ></textarea>
                
                <button>উত্তরটি যোগ করুন</button>
            </form>
        );

            function addAnswer(e) {
                e.preventDefault();
                console.log(answerText);
                const answer = {
                    questionId: question._id,
                    answerText,
                    answeredAt: new Date(),
                };
                fetch("http://localhost:5000/writeAnswer", {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                        "x-access-token": localStorage.getItem("token"),
                    },
                    body: JSON.stringify(answer),
                })
                    .then((res) => res.json())
                    .then((serverResponse) => {
                        setResponse(serverResponse.message);
                        if (serverResponse.success) {
                            setAnswerText("");
                        }
                    });
            }

    }
};

export default QuestionDetail;