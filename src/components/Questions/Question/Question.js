import { faClock, faCode, faComment, faEye, faThumbsUp, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import { displayTime } from "../../utilities/Time";
import "./Question.css";

const Question = ({ question }) => {
    return (
        <div className="question">
            <h3 className="highlighted-text">{question.questionTitle || question.questionText}</h3>
            <div className="question-info">
                <p>
                    <FontAwesomeIcon color="#404083" icon={faUser} className="icons" />
                    {question.askedBy.userName || "Unknown"}
                </p>
                <p>
                    <FontAwesomeIcon color="#404083" icon={faClock} className="icons" />
                    {displayTime(question.askedAt)}
                </p>
                <p>
                    <FontAwesomeIcon color="#404083" icon={faCode} className="icons" />
                    {
                        <i>
                            {question.tags?.map((tag) => (
                                <a className="tag" href={`/languages/${tag}`} key={tag} alt="">
                                    {tag}
                                </a>
                            )) || question.questionLanguage}
                        </i>
                    }
                </p>
            </div>
            <Reactions />
            <Link to={`/questions/${question._id}`}>
                <button className="btn-brand">See answers</button>
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
                {/* <FontAwesomeIcon color="#404083" icon={faStar} /> */}
                <span style={reactionStyle}>
                    <FontAwesomeIcon color="#404083" icon={faThumbsUp} /> {question.thumbsUpCount}
                </span>
                <span style={reactionStyle}>
                    <FontAwesomeIcon color="#404083" icon={faComment} /> {question.answerCount}
                </span>
                <span style={reactionStyle}>
                    <FontAwesomeIcon color="#404083" icon={faEye} /> {question.viewCount}
                </span>
            </div>
        );
    }
};

export default Question;
