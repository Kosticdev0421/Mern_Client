import React, { useState } from 'react';
import { useHistory } from 'react-router';

const AskQuestion = () => {
    const [questionText, setQuestionText] = useState('');
    const [questionLanguage, setQuestionLanguage] = useState('');
    const history = useHistory();
    return (
        <div>
            <h1>Ask here...</h1>
            <form className="login-form" onSubmit={handleQuestionQuery}>
                <textarea
                    cols="45"
                    rows="5"
                    placeholder="আপনার অসাধারণ প্রশ্নটি এখানে লিখুন"
                    required
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                ></textarea>
                <input
                    placeholder="প্রশ্নটি কোন প্রোগ্রামিং ভাষার?"
                    required
                    value={questionLanguage}
                    onChange={(e) => setQuestionLanguage(e.target.value)}
                />
                <button>প্রশ্ন করুন</button>
            </form>
        </div>
    );

    function handleQuestionQuery(e){
        e.preventDefault();
        console.log(questionText);
        const question = {
            questionText,
            questionLanguage,
            askedAt: new Date(),
        }
        fetch("http://localhost:5000/ask", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "x-access-token": localStorage.getItem("token"),
            },
            body: JSON.stringify(question),
        })
        .then(res => res.json())
        .then(data => {
            if(data){
                setQuestionText("");
                history.push('/');
            }
            else{
                alert('Something went wrong, please try again!')
            }
        })    
    }
};

export default AskQuestion;