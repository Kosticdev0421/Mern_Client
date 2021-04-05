import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Answer from '../../Answer/Answer';

const UserAnswers = ({userInfo}) => {
    const {answers} = userInfo;
    return (
        <div className="home">
            <h3>
                <FontAwesomeIcon icon={faQuoteLeft} />
            </h3>
            {answers && answers.map((answer) => <Answer answer={answer} key={answer._id} />)}
        </div>
    );
};


export default UserAnswers;