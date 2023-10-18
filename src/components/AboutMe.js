import React from 'react';

function AboutMe() {
    return (

        <div className='mains'>

            <span>
                Follow me On Social Media
            </span>
            <div className="main">
                <div className="up">
                    <button href="https://www.instagram.com/bash_isse/" className="card1">

                        <ion-icon href="https://www.instagram.com/bash_isse/" name="logo-instagram"></ion-icon>
                    </button>
                    <button className="card2">
                        <ion-icon name="logo-twitter"></ion-icon>
                    </button>
                </div>
                <div className="down">
                    <button className="card3">
                        <ion-icon name="logo-github"></ion-icon>
                    </button>
                    <button className="card4">
                        <ion-icon name="logo-linkedin"></ion-icon>
                    </button>
                </div>
            </div>

        </div>
    );
}

export default AboutMe;
