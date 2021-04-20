import React from 'react';
import './Home.css';
import Search from "./Search/Search";
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