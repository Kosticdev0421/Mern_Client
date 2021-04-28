import React from 'react';
import Footer from '../Common/Footer/Footer';
import Features from './Features/Features';
import './Home.css';
import Search from "./Search/Search";
import Testimonials from './Testimonials/Testimonials';
import TopQuestions from './TopQuestions/TopQuestions';

const Home = () => {
    
    return (
        <div className="home">
            <Search />
            <TopQuestions />
            <Features />
            <Testimonials />
            <Footer />
        </div>
    );

};


export default Home;