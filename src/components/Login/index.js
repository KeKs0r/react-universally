import React from 'react';

function Login({children}) {
  return (
    <article>
      <p>
        This is my Main Login Route I will render children below
      </p>

      <p>
        {children}
      </p>
    </article>
  );
}

export default Login;
