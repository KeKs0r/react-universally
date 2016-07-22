import React from 'react';
import BrandingLogo from '../../images/branding_lt.png';


export default function HomeLayout({main, left, children, location}) {
  let path = location.pathname;
  let loginMsg = '';

  const mainOut = (main) ? main : children;

  switch (path) {
    case "/login":
      loginMsg = "Welcome to vAtomic. Please login or sign up.";
      break;
    case "/login/your-info":
      loginMsg = "Message Two";
      break;
    case "/login/phone-number":
      loginMsg = "Message Three";
      break;
    default:
      loginMsg = "Message Default";
  };

  if(left){
    loginMsg = left
  }

  return (
    <div className="modal">
        <div className="login-frame">
          <div className="login-guide">
              <img src={BrandingLogo}/>
              <h1>{loginMsg}</h1>
          </div>
          <div className="login-card">
            {mainOut}
          </div>
        </div>
    </div>
  );
}
