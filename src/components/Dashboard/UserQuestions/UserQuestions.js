import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import Question from '../../Questions/Question/Question';

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
                        <div className="question">
                            <Question question={question} key={question._id} />
                            <div>
                                <Link to={`/dashboard/edit/${question._id}`}>
                                    <button className="btn-brand">কিছু পরিবর্তন করুন</button>
                                </Link>
                                <button className="btn-brand" onClick={() => deleteQuestion(question._id)}>মুছে ফেলুন</button>
                            </div>
                        </div>
                    );
                })}
        </div>
    );
    function deleteQuestion(id){
        const confirm = window.confirm("সত্যিই মুছে(ডিলিট) ফেলতে চাচ্ছেন?\nএকবার মুছলে পুনরায় ফিরে পাওয়া যাবে না!");
        if(confirm){
            fetch(`${process.env.REACT_APP_SERVER_URL}/question/${id}`, {
                method: 'DELETE',
                headers: {
                    'x-access-token': localStorage.getItem('token')
                },
            })
            .then(res => res.json())
            .then(serverResponse => {
                if(serverResponse.success){
                    alert(serverResponse.message + " page will reload now");
                    setTimeout(() => {
                        window.location.reload();
                    }, 500);
                } else {
                    alert(serverResponse.message);
                }
            })
        }
    }
};

export default UserQuestions;