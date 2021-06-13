import { useEffect, useState } from 'react';
import loadingImg from "../../../images/Loading-Infinity.gif";
import Question from '../../Questions/Question/Question';
import './TopQuestions.css';

const TopQuestions = () => {
    const [topQuestions, setTopQuestions] = useState([]);
    const titles = ["Top Liked:", "Trending:"];
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/questions/top`)
        .then(res => res.json())
        .then(data => {
            setLoading(false);
            setTopQuestions(data);
            console.log(data)
        })
        .catch(err => console.log(err));
    }, []);

    // if (loading) {
    //     return (
    //         <div className="loading">
    //             <p>Loading top questions...</p>
    //         </div>
    //     );
    // }

    return !loading ? (
        <div className="top-questions">
            {topQuestions &&
                topQuestions.map((question, i) => {
                    return (
                        <div key={question._id}>
                            <h3>{titles[i]}</h3>
                            <Question question={question} />
                        </div>
                    );
                })}
        </div>
    ) : (
        <div className="loading">
            <p>Loading something awesome...</p>
            <img src={loadingImg} alt=""/>
        </div>
    );
};

export default TopQuestions;