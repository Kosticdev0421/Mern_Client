import { faClock, faCode, faComment, faThumbsUp, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import "./Question.css";

const Question = ({ question }) => {
    const askedToday = new Date(question.askedAt).getTime() > new Date().getTime() - 86400000;
    return (
        <div className="question">
            <h3>{question.questionTitle || question.questionText}</h3>
            <div className="question-info">
                <p>
                    <FontAwesomeIcon icon={faUser} /> {question.askedBy.userName || "Unknown"}
                </p>
                <p>
                    <FontAwesomeIcon icon={faCode} /> {question.questionLanguage || "Unknown"}
                </p>
                <small>
                    <FontAwesomeIcon icon={faClock} />{" "}
                    {question.askedAt
                        ? askedToday
                            ? "Today"
                            : new Date(question.askedAt).toLocaleDateString()
                        : "Unknown"}
                </small>
            </div>
            <Reactions />
            <Link to={`/questions/${question._id}`}>
                <button>See answers</button>
            </Link>
        </div>
    );

    function Reactions(){
        const reactionsStyle = {
            display: 'flex',
        }
        const reactionStyle = {
            display: "flex",
            flexDirection: "column",
            margin: "10px 5px 0",
        };

        return (
            <div style={reactionsStyle}>
                {/* <FontAwesomeIcon icon={faStar} /> */}
                <span style={reactionStyle}>
                    <FontAwesomeIcon icon={faThumbsUp} /> {question.thumbsUpCount}
                </span>
                <span style={reactionStyle}>
                    <FontAwesomeIcon icon={faComment} /> {question.answerCount}
                </span>
            </div>
        );
    }
};

export default Question;
