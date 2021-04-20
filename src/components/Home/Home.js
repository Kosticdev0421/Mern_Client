import React from 'react';
import Search from "../Search/Search";
import './Home.css';
import TopQuestions from './TopQuestions/TopQuestions';

const Home = () => {
    

    
    return (
        <div className="home">
            <Search />
            <TopQuestions />
        </div>
    );

};


export default Home;