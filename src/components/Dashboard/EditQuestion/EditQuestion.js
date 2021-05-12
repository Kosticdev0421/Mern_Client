import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import "../../AskQuestion/AskQuestion.css";
import Code from '../../Common/Code/Code';
import SelectTags from "../../Common/SelectTag/SelectTags";
const EditQuestion = () => {
    const { id } = useParams();
    const [questionTitle, setQuestionTitle] = useState("");
    const [questionText, setQuestionText] = useState("");
    const [questionLanguage, setQuestionLanguage] = useState("");
    const [tags, setTags] = useState([]);
    const history = useHistory();
    const [code, setCode] = useState("");


    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/questions/${id}`, {
            headers: {
                "x-access-token": localStorage.getItem("token"),
            },
        })
            .then((res) => res.json())
            .then((question) => {
                setQuestionTitle(question.questionTitle);
                setQuestionText(question.questionText);
                setQuestionLanguage(question.questionLanguage);
                setCode(question.code);
            });
    }, []);

    const editStyle = {
        width: '100%',
    }

    return (
        <div style={editStyle}>
            <small>জ্ঞান অর্জনে কোন কার্পণ্য নেই</small>
            <form className="login-form" onSubmit={handleQuestionQuery}>
                <input
                    placeholder="প্রশ্নটিকে এক লাইনে উপস্থাপন করুন"
                    required
                    value={questionTitle}
                    onChange={(e) => setQuestionTitle(e.target.value)}
                />
                <textarea
                    className="user-input"
                    cols="45"
                    rows="5"
                    placeholder="আপনার অসাধারণ প্রশ্নটি এখানে লিখুন"
                    required
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                ></textarea>
                <Code code={[code, setCode]} editable={true} />
                <SelectTags states={[tags, setTags]} />
                {/* <input
                    placeholder="প্রশ্নটি কোন প্রোগ্রামিং ভাষার?"
                    required
                    value={questionLanguage}
                    onChange={(e) => setQuestionLanguage(e.target.value)}
                /> */}
                <button className="btn-brand">প্রশ্নটি আপডেট করুন</button>
            </form>
        </div>
    );

    function handleQuestionQuery(e) {
        e.preventDefault();
        const question = {
            questionTitle,
            questionText,
            code,
            tags: tags.map((tag) => tag.id),
            // questionLanguage,
            updatedAt: new Date().getTime(),
        };
        fetch(`${process.env.REACT_APP_SERVER_URL}/editQuestion/${id}`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "x-access-token": localStorage.getItem("token"),
            },
            body: JSON.stringify(question),
        })
            .then((res) => res.json())
            .then((serverResponse) => {
                if (serverResponse.success) {
                    setQuestionText("");
                    history.push(`/questions/${id}`);
                } else {
                    alert(serverResponse.message);
                }
            });
    }
};

export default EditQuestion;
