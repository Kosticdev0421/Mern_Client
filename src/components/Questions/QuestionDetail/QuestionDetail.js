import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import loadingImg from "../../../images/Loading-Infinity.gif";
import { seo } from '../../../utilities/seo';
import Answer from '../../Answer/Answer';
import Code from '../../Common/Code/Code';
import Reactions from '../../Common/Reactions/Reactions';
import './QuestionDetail.css';

const QuestionDetail = () => {
    const {id} = useParams();
    const [question, setQuestion] = useState({});
    const [answers, setAnswers] = useState([]);
    const [response, setResponse] = useState("");
    const [thumbsUpCount, setThumbsUpCount] = useState(0);
    const [thumbsUp, setThumbsUp] = useState(false);
    const [loading, setLoading] = useState(true);


    seo({
        title: question?.questionTitle,
    });


    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/questions/${id}`, {
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
        fetch(`${process.env.REACT_APP_SERVER_URL}/answers?question=${id}`, {
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
        <div>
            {question && (
                <div className="question-detail">
                    <div className="question-detail-info">
                        <h3>{question.questionTitle || ""}</h3>
                        <p>{question.questionText}</p>
                        <i>
                            On{" "}
                            {question.questionLanguage ||
                                question.tags?.map((tag) => (
                                    <a className="tag" href={`/tags/${tag}`} alt="" >{tag}</a>
                                ))}
                        </i>
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
        const [code, setCode] = useState("");
        const [answerHeight, setAnswerHeight] = useState("100px");

        return (
            <form className="login-form" onSubmit={addAnswer}>
                <textarea
                    className="user-input"
                    style={{ height: answerHeight }}
                    placeholder="আপনার চমৎকার উত্তরটি এখানে লিখুন"
                    required
                    value={answerText}
                    onChange={handleQuestionInput}
                ></textarea>
                <Code code={[code, setCode]} editable={true} />

                <button className="btn-brand">উত্তরটি যোগ করুন</button>
            </form>
        );

            function addAnswer(e) {
                e.preventDefault();
                console.log(answerText);
                const answer = {
                    questionId: question._id,
                    answerText,
                    code,
                    answeredAt: new Date().getTime(),
                };
                fetch(`${process.env.REACT_APP_SERVER_URL}/writeAnswer`, {
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

            function handleQuestionInput(e) {
                const height = Math.floor(e.target.scrollHeight / 10) * 10 - 20; //-20 for padding
                setAnswerHeight(height + "px");
                setAnswerText(e.target.value);
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
    //         fetch('${process.env.REACT_APP_SERVER_URL}/updateReaction', {
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