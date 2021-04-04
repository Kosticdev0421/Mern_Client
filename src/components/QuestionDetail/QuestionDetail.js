import { faComment, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Answer from '../Answer/Answer';
import './QuestionDetail.css';

const QuestionDetail = () => {
    const {id} = useParams();
    const [question, setQuestion] = useState({});
    const [answers, setAnswers] = useState([]);
    const [response, setResponse] = useState("");
    const [thumbsUpCount, setThumbsUpCount] = useState(0);
        const [thumbsUp, setThumbsUp] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:5000/questions/${id}`, {
            headers: {
                "x-access-token": localStorage.getItem("token"),
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setQuestion(data);
                setThumbsUpCount(data.thumbsUpCount);
                setThumbsUp(data.thumbsUp);
                
            });
        }, []);
    useEffect(() => {
        fetch(`http://localhost:5000/answers?question=${id}`, {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        })
        .then(res => res.json())
        .then(data => {
            setResponse(data.message);
            if(data.success){
                setAnswers(data.answers);
            } 
            
        });
    }, []);

    return (
        <div>
            {question && (
                <div className="question-detail">
                    <h3>{question.questionTitle || ""}</h3>
                    <p>{question.questionText}</p>
                    <p>On {question.questionLanguage}</p>
                    <Reactions />
                    <WriteAnswerForm />
                    {response && <p>{response}</p>}

                    {answers && answers.map((answer) => <Answer answer={answer} />)}

                </div>
            )}
        </div>
    );

    function WriteAnswerForm(){
        const [answerText, setAnswerText] = useState("");
        return (
            <form className="login-form" onSubmit={addAnswer}>
                
                <textarea
                    cols="45"
                    rows="5"
                    placeholder="আপনার চমৎকার উত্তরটি এখানে লিখুন"
                    required
                    value={answerText}
                    onChange={(e) => {
                        setAnswerText(e.target.value);
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
                            window.location.reload();
                        }
                    });
            }

    }

    function Reactions() {
        const reactionsStyle = {
            display: "flex",
            justifyContent: 'center'
        };
        const reactionStyle = {
            display: "flex",
            flexDirection: "column",
            margin: "10px 5px 0",
            cursor: "pointer",
        };

        return (
            <div style={reactionsStyle}>
                {/* <FontAwesomeIcon icon={faStar} /> */}
                <span style={reactionStyle} onClick={handleReaction}>
                    <FontAwesomeIcon icon={faThumbsUp} size="lg" color={thumbsUp ? "teal" : ""} />{" "}
                    {thumbsUpCount}
                </span>
                <span style={reactionStyle}>
                    <FontAwesomeIcon icon={faComment} size="lg" /> {question.answerCount}
                </span>
            </div>
        );
        function handleReaction(){
            setThumbsUp(!thumbsUp);
            const reactionInfo = {
                thumbsUp: !thumbsUp,
                questionId: question._id,
            }
            fetch('http://localhost:5000/updateReaction', {
                method: "POST",
                headers: {
                    'x-access-token': localStorage.getItem('token'),
                    'content-type': 'application/json'
                },
                body: JSON.stringify(reactionInfo)
            })
            setThumbsUpCount(thumbsUp ? thumbsUpCount - 1 : thumbsUpCount + 1);
        }
    }
};

export default QuestionDetail;