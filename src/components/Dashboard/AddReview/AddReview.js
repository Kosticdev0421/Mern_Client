import React, { useContext, useRef } from "react";
import { useHistory } from "react-router";
import { userAuthContext } from "../../../App";

const AddReview = () => {
    const nameRef = useRef();
    const fromRef = useRef();
    const quoteRef = useRef();
    const [currentUser, setCurrentUser] = useContext(userAuthContext);
    const history = useHistory();
    return (
        <div style={{width: "100vw"}}>
            <h2>Review</h2>
            <form onSubmit={handleAddReview} className="login-form">
                <input type="text" placeholder="Your Name" value={currentUser.userName} ref={nameRef} />
                <input type="text" placeholder="University name, Designation" ref={fromRef} />
                <textarea placeholder="Write something nice" ref={quoteRef} />
                <button className="btn btn-brand">Submit</button>
            </form>
        </div>
    );

    function handleAddReview(e) {
        e.preventDefault();
        const reviewInfo = {
            name: nameRef.current.value,
            from: fromRef.current.value,
            quote: quoteRef.current.value,
            img: currentUser.photoURL,
            addedTime: new Date(),
        };
        fetch(`${process.env.REACT_APP_SERVER_URL}/addReview`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "x-access-token": localStorage.getItem("token"),
            },
            body: JSON.stringify(reviewInfo),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    console.log(data);
                    history.push("/#reviews");
                } else {
                    alert("Something went wrong, please try again!");
                }
            });
    }
};

export default AddReview;
