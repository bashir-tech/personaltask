import React from 'react';

function AboutMe() {
    return (

        <div className='mains'>

            <span>
                Follow me On Social Media
            </span>
            <div className="main">
                <div className="up">
                    <a href="https://www.instagram.com/bash_isse/" className="card1">

                        <ion-icon name="logo-instagram"></ion-icon>
                    </a>
                    <a href="https://twitter.com/isse_egaal" className="card2">
                        <ion-icon name="logo-twitter"></ion-icon>
                    </a>
                </div>
                <div className="down">
                    <a href='https://github.com/bashir-tech' className="card3">
                        <ion-icon name="logo-github"></ion-icon>
                    </a>
                    <a href='https://www.linkedin.com/in/bashir-ali-isse-28a734176/' className="card4">

                        <ion-icon name="logo-linkedin"></ion-icon>
                    </a>
                </div>
            </div>

        </div>
    );
}

export default AboutMe;
