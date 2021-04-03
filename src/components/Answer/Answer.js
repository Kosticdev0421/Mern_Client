import { faClock, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './Answer.css';

const Answer = ({answer}) => {
    const {answerText, answeredAt, answeredBy} = answer;
    const answeredToday = new Date(answeredAt).getTime() > new Date().getTime() - 86400000;

    return (
        <div className="answer">
            <p>{answerText}</p>
            <span>
                <FontAwesomeIcon icon={faClock} />{" "}
                {answeredToday ? "today" : new Date(answeredAt).toLocaleDateString()}{" "}
                <FontAwesomeIcon icon={faUser} /> {answeredBy.userName}
            </span>
        </div>
    );
};

export default Answer;