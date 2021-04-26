import { faClock, faCode, faComment, faEye, faThumbsUp, faUser } from "@fortawesome/free-solid-svg-icons";
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
                    <FontAwesomeIcon color="cornflowerblue" icon={faUser} /> {question.askedBy.userName || "Unknown"}
                </p>
                <p>
                    <FontAwesomeIcon color="cornflowerblue" icon={faClock} />{" "}
                    {question.askedAt
                        ? askedToday
                            ? "Today"
                            : new Date(question.askedAt).toLocaleDateString()
                        : "Unknown"}
                </p>
                <p>
                    <FontAwesomeIcon color="cornflowerblue" icon={faCode} />{" "}
                    {question.questionLanguage || (
                        <i>
                            {question.questionLanguage ||
                                question.tags?.map((tag) => (
                                    <a className="tag" href={`/languages/${tag}`} alt="">
                                        {tag}
                                    </a>
                                ))}
                        </i>
                    )}
                </p>
                
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
                {/* <FontAwesomeIcon color="cornflowerblue" icon={faStar} /> */}
                <span style={reactionStyle}>
                    <FontAwesomeIcon color="cornflowerblue" icon={faThumbsUp} /> {question.thumbsUpCount}
                </span>
                <span style={reactionStyle}>
                    <FontAwesomeIcon color="cornflowerblue" icon={faComment} /> {question.answerCount}
                </span>
                <span style={reactionStyle}>
                    <FontAwesomeIcon color="cornflowerblue" icon={faEye} /> {question.viewCount}
                </span>
            </div>
        );
    }
};

export default Question;
