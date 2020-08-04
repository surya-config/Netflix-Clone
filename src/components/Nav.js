import React, { useState, useEffect } from "react";
import "../css/Nav.css";

function Nav() {
  const [show, handleShow] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);
  return (
    <div className={`nav ${show && "nav-black"}`}>
      <img
        className="logo"
        src="http://www.pngmart.com/files/10/Netflix-Logo-PNG-Image.png"
        alt="Netflix "
      />
      <img
        className="avatar"
        src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/366be133850498.56ba69ac36858.png"
        alt="Netflix "
      />
    </div>
  );
}

export default Nav;
