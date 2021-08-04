import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
                <button className="btn-brand" onClick={() => deleteAnswer(answer._id)}>Delete</button>
                {showEdit && <EditAnswer answer={answer} />}
            </div>
        );
    }
    function deleteAnswer(id) {
        const confirm = window.confirm(
            "Are you sure to delete? It can't be undone!"
        );
        if (confirm) {
            fetch(`${process.env.REACT_APP_SERVER_URL}/answer/${id}`, {
                method: "DELETE",
                headers: {
                    "x-access-token": localStorage.getItem("token"),
                },
            })
                .then((res) => res.json())
                .then((serverResponse) => {
                    if (serverResponse.success) {
                        alert(serverResponse.message + " page will reload now");
                        setTimeout(() => {
                            window.location.reload();
                        }, 500);
                    } else {
                        alert(serverResponse.message);
                    }
                });
        }
    }
};

export default UserAnswers;
