import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/AboutUs.css';
import '../Styles/fade.css';

const AboutUs = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100); // Add slight delay for the fade-in
        return () => clearTimeout(timer); // Cleanup on unmount
    }, []);

    return (
        <div className={`aboutus-container my-5 fade-in ${isVisible ? 'visible' : ''}`}>
            <div className="aboutus-row row justify-content-center">
                <div className="aboutus-col col-md-8 text-center">
                    <h1 className="aboutus-title mb-4">About Us</h1>
                    <div className="aboutus-section">
                        <p className="aboutus-text-lead">
                            Our <span className="aboutus-strong">Voice Enabled Home Automation</span> solution harnesses 
                            the MERN stack and Edge Impulse's voice training technology to transform your living space 
                            into an intelligent, responsive environment. With simple voice commands, you can effortlessly 
                            control lighting, temperature, security systems, and appliances, making your home smarter, more convenient, 
                            and perfectly tailored to your lifestyle. Experience the future of home management where technology 
                            understands and anticipates your needs, simplifying daily tasks with just the sound of your voice.
                        </p>
                    </div>
                </div>
            </div>
            <div className="aboutus-row row mt-5">
                <div className="aboutus-col col-md-6">
                    <div className="aboutus-section">
                        <h2 className="aboutus-subtitle">Our Mission</h2>
                        <p className="aboutus-text">
                            Our mission is to create value for our clients by delivering
                            top-notch services and fostering long-term relationships built on
                            trust and success.
                        </p>
                    </div>
                </div>
                <div className="aboutus-col col-md-6">
                    <div className="aboutus-section">
                        <h2 className="aboutus-subtitle">Our Team</h2>
                        <p className="aboutus-text">
                            <span className="aboutus-strong">Team 168</span> brings together a dynamic group of passionate 
                            technology enthusiasts dedicated to revolutionizing home automation. 
                            Our team comprises <span className="aboutus-strong">Varun Reddy, Prubhu, Vishal, Hrithik, Varun Sai, Nikhilesh,</span> 
                            and <span className="aboutus-strong">Mahesh</span>, each contributing unique skills and perspectives to create
                            an innovative voice-controlled smart home solution. United by our shared
                            vision of making technology more accessible and intuitive, we have collaborated 
                            seamlessly to develop a cutting-edge application that transforms how people 
                            interact with their living spaces.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;


