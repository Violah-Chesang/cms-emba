import React from 'react';
import './home.css';
import worship from '../../../images/church-worship.mp4';

function Home() {
  return (
    <>
      <div className="cover">  {/* otherwise known as hero */}
        <video autoPlay loop muted playsInline className="back-video" >
            <source src={worship} type="video/mp4" />
        </video>
        {/* <img src={image} /> */}
        
        <div className="container">
          {/* Content */}
            <div className="content">
                <h1>Welcome to Embakasi Methodist Church</h1>
                <p>Where everybody is somebody, and Jesus is Lord.</p>
            </div>
        </div>
      </div>
    </>
  )
}

export default Home