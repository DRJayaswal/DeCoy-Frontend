import React from "react";
import "../components/Foot.css";
const Foot = () => {
  return (
    <div className="bottom">
      <div className="footer">
        <div className="footer-logo">
          <img className="ft-logo" src="/logo.png" alt="" />
        </div>

        <div className="helpline-content">Contact Us : ask@decoy.in</div>

        <div className="footer-content">©2021 DeCoy Public Limited - All Rights Reserved - Trademark of DeCoy PBL is DeCoy™
        </div>
      </div>
    </div>
  );
};

export default Foot;
