import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import Question from '../../Question/Question';

const UserQuestions = ({userInfo}) => {
    const {questions} = userInfo;

    return (
        <div className="home">
            <h3>
                <FontAwesomeIcon icon={faQuestionCircle} />
            </h3>
            {questions &&
                questions.map((question) => {
                    return (
                        <div>
                            <Question question={question} key={question._id} />
                            <Link to={`/dashboard/edit/${question._id}`}>
                                <button>কিছু পরিবর্তন করুন</button>
                            </Link>
                        </div>
                    );
                })}
        </div>
    );
};

export default UserQuestions;