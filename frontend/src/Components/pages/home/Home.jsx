import React from 'react';
import './home.css';
import worship from '../../../images/church-worship.mp4';
import logo from '../../../../src/images/mck-logo.png';

function Home() {
  return (
    <>
      <div className="home-cover">  {/* otherwise known as hero */}
        <video autoPlay loop muted playsInline className="back-video" >
            <source src={worship} type="video/mp4" />
        </video>
        {/* <img src={image} /> */}
        
        <div className="cms-container">
          {/* Content */}
            <div className="cms-content">
            <img src={logo} alt='logo' />
                <h1>Welcome to MCK Embakasi Church</h1>
                <p>Where everybody is somebody, and Jesus Christ is Lord.</p>
            </div>
        </div>
      </div>
    </>
  )
}

export default Home