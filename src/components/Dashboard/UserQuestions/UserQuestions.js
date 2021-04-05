import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Question from '../../Question/Question';

const UserQuestions = ({userInfo}) => {
    const {questions} = userInfo;

    return (
        <div className="home">
            <h3>
                <FontAwesomeIcon icon={faQuestionCircle} />
            </h3>
            {questions &&
                questions.map((question) => <Question question={question} key={question._id} />)}
        </div>
    );
};

export default UserQuestions;