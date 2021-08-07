import { addReview } from "api";
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
            <form onSubmit={handleAddReview}>
                <input className="user-input" type="text" placeholder="Your Name" value={currentUser.userName} ref={nameRef} />
                <input className="user-input" type="text" placeholder="University name, Designation" ref={fromRef} />
                <textarea className="user-input" placeholder="Write something nice" ref={quoteRef} />
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
        const get = async () => {
            try {
                const { data } = await addReview(reviewInfo);
                if (data) {
                    history.push("/#reviews");
                } else {
                    alert("Something went wrong, please try again!");
                }
            } catch (error) {
                console.log(error);
            }
        };
        get();
        
    }
};

export default AddReview;
