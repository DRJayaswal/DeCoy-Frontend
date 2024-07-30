import React from 'react';
import "./Error.css"
import { useLocation} from 'react-router-dom';
const Error = () => {
    return (
        <>
            <div className="error-container">
                <span>Can't get the page you are looking for..!!</span>
                {console.error(`Can't get ${useLocation().pathname.replace("/","")} route, Error status : ${404}`)}
            </div>
        </>
    );
  };

export default Error;
