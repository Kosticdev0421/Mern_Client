import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import loadingImg from "../../images/Loading-Infinity.gif";
import Answer from '../Answer/Answer';
import Code from '../Code/Code';
import Reactions from '../Reactions/Reactions';
import './QuestionDetail.css';

const QuestionDetail = () => {
    const {id} = useParams();
    const [question, setQuestion] = useState({});
    const [answers, setAnswers] = useState([]);
    const [response, setResponse] = useState("");
    const [thumbsUpCount, setThumbsUpCount] = useState(0);
    const [thumbsUp, setThumbsUp] = useState(false);
    const [loading, setLoading] = useState(true);


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
                setLoading(false);
            } 
            
        });
    }, []);

    if (loading) {
        return (
            <div className="loading">
                <h1>Processing your request...</h1>
                <img src={loadingImg} alt="" />
            </div>
        );
    }

    return (
        <div>
            {question && (
                <div className="question-detail">
                    <div className="question-info">
                        <h3>{question.questionTitle || ""}</h3>
                        <p>{question.questionText}</p>
                        <i>On {question.questionLanguage}</i>
                        {question.code && <Code code={[question.code]} editable={false} />}
                    </div>
                    <Reactions
                        of={question}
                        type="questions"
                        thumbsUps={[thumbsUp, setThumbsUp]}
                        setThumbsUps={[thumbsUpCount, setThumbsUpCount]}
                    />
                    <WriteAnswerForm />
                    <div>
                        {response && <p>{response}</p>}

                        {answers && answers.map((answer) => <Answer answer={answer} />)}
                    </div>
                </div>
            )}
        </div>
    );

    function WriteAnswerForm(){
        const [answerText, setAnswerText] = useState("");
            const [code, setCode] = useState(
                `if(you have any code){
    print("write it here!");
}`
            );
        return (
            <form className="login-form" onSubmit={addAnswer} style={{margin: 0, maxWidth: "650px"}}>
                
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
                <Code code={[code, setCode]} editable={true}/>
                
                <button>উত্তরটি যোগ করুন</button>
            </form>
        );

            function addAnswer(e) {
                e.preventDefault();
                console.log(answerText);
                const answer = {
                    questionId: question._id,
                    answerText,
                    code,
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

    // function Reactions() {
    //     const reactionsStyle = {
    //         display: "flex",
    //         justifyContent: 'center'
    //     };
    //     const reactionStyle = {
    //         display: "flex",
    //         flexDirection: "column",
    //         margin: "10px 5px 0",
    //         cursor: "pointer",
    //     };

    //     return (
    //         <div style={reactionsStyle}>
    //             {/* <FontAwesomeIcon icon={faStar} /> */}
    //             <span style={reactionStyle} onClick={handleReaction}>
    //                 <FontAwesomeIcon icon={faThumbsUp} size="lg" color={thumbsUp ? "teal" : ""} />{" "}
    //                 {thumbsUpCount}
    //             </span>
    //             <span style={reactionStyle}>
    //                 <FontAwesomeIcon icon={faComment} size="lg" /> {question.answerCount}
    //             </span>
    //         </div>
    //     );
    //     function handleReaction(){
    //         setThumbsUp(!thumbsUp);
    //         const reactionInfo = {
    //             thumbsUp: !thumbsUp,
    //             questionId: question._id,
    //         }
    //         fetch('http://localhost:5000/updateReaction', {
    //             method: "POST",
    //             headers: {
    //                 'x-access-token': localStorage.getItem('token'),
    //                 'content-type': 'application/json'
    //             },
    //             body: JSON.stringify(reactionInfo)
    //         })
    //         setThumbsUpCount(thumbsUp ? thumbsUpCount - 1 : thumbsUpCount + 1);
    //     }
    // }
};

export default QuestionDetail;