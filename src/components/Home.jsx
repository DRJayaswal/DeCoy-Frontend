import React from 'react'
import "./Home.css"
const Home = () => {
  return (
    <div>
      <div className="landing-page">
        <h1 className="landing-heading">
          <span>Welcome to </span><span>DeCoy aka <span className='accent'> DC </span></span>
        </h1>
        <div className="except-heading">
          <p className='landing-para'>
            Discover and stream millions of songs from your favorite artists, all in one place. Whether you're into pop, rock, jazz, or classical, Musicify has it all. Create your own playlists, follow artists, and stay up-to-date with the latest releases. Enjoy high-quality audio and an ad-free experience with our premium subscription.
          </p>
          <div className="logo-con">
            <img className='landing-logo' src="/landing-logo.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
