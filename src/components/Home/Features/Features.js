import { faChartBar, faCheck, faCode, faCommentDots, faFilter, faTerminal, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from 'react';
import './Features.css';

const Features = () => {
    const featuresData = [
        {
            icon: faCode,
            title: "যেকোন প্রোগ্রামিং ভাষা",
            description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laborum, hic.",
        },
        {
            icon: faCommentDots,
            title: "দ্রুত উত্তর",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, nam.",
        },
        {
            icon: faUserEdit,
            title: "ইডিট বা ডিলিট",
            description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos, hic!",
        },
        {
            icon: faTerminal,
            title: "কোড প্লেগ্রাউন্ড",
            description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos, hic!",
        },
        {
            icon: faCheck,
            title: "সেরা প্রশ্ন",
            description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos, hic!",
        },
        {
            icon: faFilter,
            title: "প্রশ্ন বাছাই",
            description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos, hic!",
        },
        {
            icon: faChartBar,
            title: "নিজস্ব ড্যাসবোর্ড",
            description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos, hic!",
        },
        
    ]

    return (
        <div id="features">
            <h2 className="text-brand">Why Learn Here?</h2>
            <div className="features-container">
                {featuresData.map((feature) => {
                    return (
                        <div className="feature" key={feature.title}>
                            <div className="feature-icon">
                                <FontAwesomeIcon icon={feature.icon} />
                            </div>
                            <h3 className="highlighted-text">{feature.title}</h3>
                            <p>{feature.description}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Features;