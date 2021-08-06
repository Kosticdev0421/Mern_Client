import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { deleteQuestion } from 'api';
import React from 'react';
import { Link } from 'react-router-dom';
import Question from '../../Questions/Question/Question';

const UserQuestions = ({userInfo}) => {
    const {questions} = userInfo;

    return (
        <div className="home">
            <h3>
                <FontAwesomeIcon icon={faQuestionCircle} />
                {" "}Your Questions
            </h3>
            {questions &&
                questions.map((question) => {
                    return (
                        <div className="question">
                            <Question question={question} key={question._id} />
                            <div>
                                <Link to={`/dashboard/edit/${question._id}`}>
                                    <button className="btn-brand">Update</button>
                                </Link>
                                <button className="btn-brand" onClick={() => handleDelete(question._id)}>Delete</button>
                            </div>
                        </div>
                    );
                })}
        </div>
    );
    
    async function handleDelete(id){
        const confirm = window.confirm("Are you sure to delete? It can't be undone!");
        if(confirm){
            const { data } = await deleteQuestion(id);
            if(!data.success){
                alert(data.message);
                return;
            }
            alert(data.message + " page will reload now");
            setTimeout(() => {
                window.location.reload();
            }, 500);

        }
    }
};

export default UserQuestions;