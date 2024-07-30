import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap";
import "./Nav.css";
const Nav = () => {
  const [fullscreenSupported, setFullscreenSupported] = useState(true);
  const [menu, setMenu] = useState(false);












  const [isFullscreen, setIsFullscreen] = useState(false);
  const handleFullscreen = () => {
    const elem = document.documentElement;
    if (!isFullscreen) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen().then(() => setIsFullscreen(true)).catch((err) => console.log(err));
      } else if (elem.mozRequestFullScreen) { // Firefox
        elem.mozRequestFullScreen().then(() => setIsFullscreen(true)).catch((err) => console.log(err));
      } else if (elem.webkitRequestFullscreen) { // Chrome, Safari and Opera
        elem.webkitRequestFullscreen().then(() => setIsFullscreen(true)).catch((err) => console.log(err));
      } else if (elem.msRequestFullscreen) { // IE/Edge
        elem.msRequestFullscreen().then(() => setIsFullscreen(true)).catch((err) => console.log(err));
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => setIsFullscreen(false)).catch((err) => console.log(err));
      } else if (document.mozCancelFullScreen) { // Firefox
        document.mozCancelFullScreen().then(() => setIsFullscreen(false)).catch((err) => console.log(err));
      } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
        document.webkitExitFullscreen().then(() => setIsFullscreen(false)).catch((err) => console.log(err));
      } else if (document.msExitFullscreen) { // IE/Edge
        document.msExitFullscreen().then(() => setIsFullscreen(false)).catch((err) => console.log(err));
      }
    }
  };


  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <img className="navbar-logo" onClick={handleFullscreen} src="logo.png" alt="" />
          <button
            className="toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            onClick={()=>{
              setMenu(!menu)
            }}
            aria-label="Toggle navigation"
          >
            {
              (menu) ? (
                <svg
                  className="navbar-toggler-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  height="50px"
                  viewBox="0 -960 960 960"
                  width="50px"
                  fill="#f46004"
                >
                  <path d="M120-240v-80h520v80H120Zm664-40L584-480l200-200 56 56-144 144 144 144-56 56ZM120-440v-80h400v80H120Zm0-200v-80h520v80H120Z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="48px"
                  viewBox="0 -960 960 960"
                  width="48px"
                  fill="#f46004"
                >
                  <path d="M120-240v-60h720v60H120Zm0-210v-60h720v60H120Zm0-210v-60h720v60H120Z" />
                </svg>
              )
            }
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

              <li className="nav-item">
                <Link className="home nav-link" to={"/"}>
                  DeCoy
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to={"/jukebox"}>
                  Jukebox
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to={"/archives"}>
                  Archives
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to={"/records"}>
                  Records
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to={"/locale"}>
                  Locale
                </Link>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Discover your music...!!"
                aria-label="Search"
              />
              <button className="btn search-btn" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
