import { faComment, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const Reactions = (props) => {
    const of = props.of;
    const [thumbsUp, setThumbsUp] = props.thumbsUps;
    const [thumbsUpCount, setThumbsUpCount] = props.setThumbsUps;
    
           const reactionsStyle = {
            display: "flex",
            justifyContent: 'center'
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
                    <FontAwesomeIcon icon={faThumbsUp} size="lg" color={thumbsUp ? "teal" : ""} />{" "}
                    {thumbsUpCount}
                </span>
                <span style={reactionStyle}>
                    <FontAwesomeIcon icon={faComment} size="lg" /> {of.answerCount || 0}
                </span>
            </div>
        );
        function handleReaction(){
            setThumbsUp(!thumbsUp);
            const reactionInfo = {
                thumbsUp: !thumbsUp,
                reactionsOf: of._id,
                type: props.type,
            }
            fetch('http://localhost:5000/updateReaction', {
                method: "POST",
                headers: {
                    'x-access-token': localStorage.getItem('token'),
                    'content-type': 'application/json'
                },
                body: JSON.stringify(reactionInfo)
            })
            setThumbsUpCount(thumbsUp ? thumbsUpCount - 1 : thumbsUpCount + 1);
        }
};

export default Reactions;