import React, { useState } from 'react';
import { useHistory } from 'react-router';
import './AskQuestion.css';

const AskQuestion = () => {
    const [questionTitle, setQuestionTitle] = useState('');
    const [questionText, setQuestionText] = useState('');
    const [questionLanguage, setQuestionLanguage] = useState('');
    const [code, setCode] = useState([]);
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
                    cols="45"
                    rows="5"
                    placeholder="আপনার অসাধারণ প্রশ্নটি এখানে লিখুন"
                    required
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                    // onChange={handleCode}
                    onKeyDown={handleKeyDown}
                ></textarea>
                <input
                    placeholder="প্রশ্নটি কোন প্রোগ্রামিং ভাষার?"
                    required
                    value={questionLanguage}
                    onChange={(e) => setQuestionLanguage(e.target.value)}
                />
                <button>প্রশ্ন করুন</button>



                {/* <div className="formatted-code">
                    {code &&
                        code.map((word) => {
                            const keywords = ["if", "for", "function"];
                            if (
                                keywords.indexOf(word.slice(0, -1)) != -1 ||
                                keywords.indexOf(word) != -1
                            ) {
                                return <span className="highlighted">{word + " "}</span>;
                            } else {
                                return word + " ";
                            }
                        })}
                </div> */}
            </form>
        </div>
    );

    function handleQuestionQuery(e){
        e.preventDefault();
        const question = {
            questionTitle,
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


    function handleCode(e){
        let userCode = e.target.value.split(' ');
        const c = /#include<stdio.h>/i;
        if(c.test(userCode)){
            setQuestionLanguage('C/C++');
        }

        const formattedCodeArray = userCode.map(word => {
            return word;
        })

        const formattedCode = formattedCodeArray.join(' ');
        console.log(formattedCode);
        setCode(formattedCodeArray);
        setQuestionText(e.target.value);
    };
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