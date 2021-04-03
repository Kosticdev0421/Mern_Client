import { faClock, faCode, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import "./Question.css";

const Question = ({ question }) => {
    const askedToday = new Date(question.askedAt).getTime() > new Date().getTime() - 86400000;
    return (
        <div className="question">
            <h3>{question.questionText}</h3>
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
            <Link to={`/questions/${question._id}`}>
                <button>See answers</button>
            </Link>
        </div>
    );
};

export default Question;
