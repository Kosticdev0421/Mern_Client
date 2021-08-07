import React from 'react';
import Features from './Features/Features';
import Header from './Header/Header';
import './Home.css';
import Search from "./Search/Search";
import Testimonials from './Testimonials/Testimonials';
import TopQuestions from './TopQuestions/TopQuestions';

const Home = () => {
    
    return (
        <div className="home">
            <Search />
            <Header />
            <TopQuestions />
            <Features />
            <Testimonials />
        </div>
    );

};


export default Home;