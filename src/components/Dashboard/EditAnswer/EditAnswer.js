import React, { useState } from "react";
import Code from "../../Common/Code/Code";

const EditAnswer = ({answer}) => {
    const [answerText, setAnswerText] = useState(answer.answerText);
    const [code, setCode] = useState(answer.code);
    const id = answer._id;
    return (
        <form className="login-form" onSubmit={addAnswer} style={{ margin: "0 auto", maxWidth: "650px" }}>
            <textarea
                cols="45"
                rows="5"
                placeholder="আপনার চমৎকার উত্তরটি এখানে লিখুন"
                required
                value={answerText}
                onChange={(e) => {
                    setAnswerText(e.target.value);
                }}
            ></textarea>
            <Code code={[code, setCode]} editable={true} />

            <button className="btn-brand">উত্তরটি যোগ করুন</button>
        </form>
    );

    function addAnswer(e) {
    console.log(id);

        e.preventDefault();
        console.log(answerText);
        const answer = {
            answerText,
            code,
            updatedAt: new Date().getTime(),
        };
        fetch(`${process.env.REACT_APP_SERVER_URL}/editAnswer/${id}`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "x-access-token": localStorage.getItem("token"),
            },
            body: JSON.stringify(answer),
        })
            .then((res) => res.json())
            .then((serverResponse) => {
                // setResponse(serverResponse.message);
                if (serverResponse.success) {
                    setAnswerText("");
                    window.location.reload();
                }
            });
    }


};

export default EditAnswer;
