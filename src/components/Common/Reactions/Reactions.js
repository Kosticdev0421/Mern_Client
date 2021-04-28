import { faComment, faEye, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const Reactions = (props) => {
    const of = props.of;
    const [thumbsUp, setThumbsUp] = props.thumbsUps;
    const [thumbsUpCount, setThumbsUpCount] = props.setThumbsUps;
    
           const reactionsStyle = {
            display: "flex",
            justifyContent: 'center',
            textAlign: "center",
        };
        const reactionStyle = {
            display: "flex",
            flexDirection: "column",
            margin: "10px 5px 0",
            cursor: "pointer",
        };

        return (
            <div style={reactionsStyle}>
                {/* <FontAwesomeIcon icon={faStar} /> */}
                <span style={reactionStyle} onClick={handleReaction}>
                    <FontAwesomeIcon
                        icon={faThumbsUp}
                        size="lg"
                        color={thumbsUp ? "#404083" : ""}
                    />{" "}
                    {thumbsUpCount}
                </span>
                <span style={reactionStyle}>
                    <FontAwesomeIcon icon={faComment} size="lg" /> {of.answerCount || 0}
                </span>
                {props.type === "questions" && (
                    <span style={reactionStyle}>
                        <FontAwesomeIcon icon={faEye} size="lg" /> {of.viewCount}
                    </span>
                )}
            </div>
        );
        function handleReaction(){
            setThumbsUp(!thumbsUp);
            const reactionInfo = {
                thumbsUp: !thumbsUp,
                reactionsOf: of._id,
                type: props.type,
            }
            fetch(`${process.env.REACT_APP_SERVER_URL}/updateReaction`, {
                method: "POST",
                headers: {
                    "x-access-token": localStorage.getItem("token"),
                    "content-type": "application/json",
                },
                body: JSON.stringify(reactionInfo),
            });
            setThumbsUpCount(thumbsUp ? thumbsUpCount - 1 : thumbsUpCount + 1);
        }
};

export default Reactions;