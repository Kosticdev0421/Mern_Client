import React, { useState } from 'react';
import { useHistory } from 'react-router';
import Code from '../Code/Code';
import './AskQuestion.css';

const AskQuestion = () => {
    const [code, setCode] = useState("");
    const [questionHeight, setQuestionHeight] = useState("100px");
    const [questionTitle, setQuestionTitle] = useState('');
    const [questionText, setQuestionText] = useState('');
    const [questionLanguage, setQuestionLanguage] = useState('');
    const history = useHistory();
    return (
        <div>
            <small>জ্ঞান অর্জনে কোন কার্পণ্য নেই</small>
            <form className="login-form" onSubmit={handleQuestionQuery}>
                <input
                    placeholder="প্রশ্নটিকে এক লাইনে উপস্থাপন করুন"
                    required
                    value={questionTitle}
                    onChange={(e) => setQuestionTitle(e.target.value)}
                />
                <textarea
                    className="question-input"
                    style={{height: questionHeight}}
                    placeholder="আপনার অসাধারণ প্রশ্নটি এখানে লিখুন"
                    required
                    value={questionText}
                    onChange={handleQuestionInput}
                    // onKeyDown={handleKeyDown}
                ></textarea>
                <Code code={[code, setCode]} editable={true} />
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
        const question = {
            questionTitle,
            questionText,
            code,
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


    function handleQuestionInput(e){
        const height = Math.floor(e.target.scrollHeight/10)*10-20;//-20 for padding
        setQuestionHeight(height+"px");
        console.log(height);
        setQuestionText(e.target.value);
    }


    function handleKeyDown(e){
        if(e.key === "{"){
            setTimeout(() => {
                setQuestionText(questionText+"{\n    \n}");
                e.target.selectionStart = e.target.selectionEnd = e.target.value.length-2;
            }, 0);
        }
        if(e.key === "("){
            setTimeout(() => {
                setQuestionText(questionText+"()");
                e.target.selectionStart = e.target.selectionEnd = e.target.value.length-1;
            }, 0);
        }
    }

};

export default AskQuestion;