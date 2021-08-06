import { useEffect, useState } from 'react';
import { getTopQuestions } from '../../../api';
import loadingImg from "../../../images/Loading-Infinity.gif";
import Question from '../../Questions/Question/Question';
import './TopQuestions.css';

const TopQuestions = () => {
    const [topQuestions, setTopQuestions] = useState([]);
    const titles = ["Top Liked:", "Trending:"];
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const get = async () => {
            try {
                const { data } = await getTopQuestions();
                setTopQuestions(data);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        }
        get();
    }, []);

    if (loading) {
        return (
          <div className="loading">
            <img src={loadingImg} alt="" />
            <p>Loading something awesome...</p>
          </div>
        );
    }

    return (
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
    );
};

export default TopQuestions;