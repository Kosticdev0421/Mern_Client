import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteAnswer } from "api";
import React, { useState } from "react";
import Answer from "../../Answer/Answer";
import EditAnswer from "../EditAnswer/EditAnswer";

const UserAnswers = ({ userInfo }) => {
    const { answers } = userInfo;
    return (
        <div className="home">
            <h3>
                <FontAwesomeIcon icon={faQuoteLeft} />
                {" "}Your Answers
            </h3>
            {answers &&
                answers.map((answer) => {
                    return (
                        <div className="answer">
                            <Answer answer={answer} key={answer._id} />
                            <Buttons answer={answer} />
                            
                        </div>
                    );
                })}
        </div>
    );

    function Buttons({answer}) {
        const [showEdit, setShowEdit] = useState(false);

        return (
            <div>
                <button className="btn-brand" onClick={() => setShowEdit(!showEdit)}>Update</button>
                <button className="btn-brand" onClick={() => handleDelete(answer._id)}>Delete</button>
                {showEdit && <EditAnswer answer={answer} />}
            </div>
        );
    }
    async function handleDelete(id) {
        const confirm = window.confirm(
            "Are you sure to delete? It can't be undone!"
        );
        if (confirm) {
          
            try {
                const { data } = await deleteAnswer(id);
                if (data.success) {
                    alert(data.message + " page will reload now");
                    setTimeout(() => {
                        window.location.reload();
                    }, 500);
                } else {
                    alert(data.message);
                }
                
            } catch (error) {
                console.log(error);
            }

        }
    }
};

export default UserAnswers;
