import React, { useState } from 'react';
import { useHistory } from 'react-router';
import loadingImg from "../../images/Loading-Infinity.gif";
import Code from '../Common/Code/Code';
import SelectTags from '../Common/SelectTag/SelectTags';
import './AskQuestion.css';

const AskQuestion = () => {
    const [code, setCode] = useState("");
    const [questionHeight, setQuestionHeight] = useState("100px");
    const [questionTitle, setQuestionTitle] = useState('');
    const [questionText, setQuestionText] = useState('');
    // const [questionLanguage, setQuestionLanguage] = useState('');
    const [tags, setTags] = useState([]);
    const history = useHistory();
    const [loading, setLoading] = useState(false);

    if(loading) return <div className="loading"><img src={loadingImg} alt=""/></div>

    return (
        <div>
            <small className="text-brand">জ্ঞান অর্জনে কোন কার্পণ্য নেই</small>
            <form className="login-form" onSubmit={handleQuestionQuery}>
                <small>ধরুন আপনার বন্ধুকে প্রশ্নটি করছেন</small>
                <input
                    className="question-input"
                    placeholder="প্রশ্নটিকে এক লাইনে উপস্থাপন করুন"
                    required
                    value={questionTitle}
                    onChange={(e) => setQuestionTitle(e.target.value)}
                />
                <small>উত্তরদাতার প্রশ্নটি পুরোপুরি বোঝার জন্য যা যা দরকার তা দিন</small>
                <textarea
                    className="question-input"
                    style={{ height: questionHeight }}
                    placeholder="আপনার অসাধারণ প্রশ্নটি এখানে লিখুন"
                    required
                    value={questionText}
                    onChange={handleQuestionInput}
                    // onKeyDown={handleKeyDown}
                ></textarea>
                <small>কোন কোডিং এর প্রয়োজন আছে কি?</small>
                <Code code={[code, setCode]} editable={true} />
                <small>ট্যাগ যুক্ত করুন</small>
                <SelectTags states={[tags, setTags]} />
                {/* <input
                    className="question-input"
                    placeholder="প্রশ্নটি কোন প্রোগ্রামিং ভাষার?"
                    required
                    value={questionLanguage}
                    onChange={(e) => setQuestionLanguage(e.target.value)}
                /> */}
                <button className="btn-brand">প্রশ্ন করুন</button>
            </form>
        </div>
    );

    function handleQuestionQuery(e){
        e.preventDefault();
        setLoading(true);
        const question = {
            questionTitle,
            questionText,
            code,
            // questionLanguage,
            tags: tags.map(tag => tag.id),
            askedAt: new Date().getTime(),
        }
        fetch(`${process.env.REACT_APP_SERVER_URL}/ask`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "x-access-token": localStorage.getItem("token"),
            },
            body: JSON.stringify(question),
        })
        .then(res => res.json())
        .then(data => {
            setLoading(false);
            if(data.success){
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