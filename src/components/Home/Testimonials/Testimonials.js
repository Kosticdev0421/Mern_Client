import { getReviews } from 'api';
import React, { useEffect, useState } from 'react';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './Testimonials.css';


const Testimonials = () => {
    const [testimonials, setTestimonials] = useState([]);

    useEffect(() => {
        const get = async () => {
            try {
                const { data } = await getReviews();
                setTestimonials(data);
            } catch (error) {
                console.log(error);
            }
        };
        get();

    }, []);
    
   
    return (
        <section id="reviews">
            <h1 className="text-brand text-center mb-5">What Our Students Say</h1>
            <Carousel
                showArrows={true}
                infiniteLoop={true}
                showThumbs={false}
                autoPlay={true}
                interval={3000}
                stopOnHover={true}
                swipeable={true}
            >
                {testimonials && testimonials.map((testimonial) => (
                    <div key={testimonial._id}>
                        <img
                            src={
                                testimonial.img || "https://www.w3schools.com/howto/img_avatar.png"
                            }
                            alt=""
                        />
                        <div className="myCarousel shadow-sm">
                            <h3>{testimonial.name}</h3>
                            <h4>{testimonial.from}</h4>
                            <p className="text-brand">{testimonial.quote}</p>
                        </div>
                    </div>
                ))}
            </Carousel>
        </section>
    );
};

export default Testimonials;