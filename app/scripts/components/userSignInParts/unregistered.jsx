import React from 'react';
import { Link } from 'react-router';

const Unregistered = () => (
  <div className="auth_points">
    <Link to="/login">
      <span className="button login">login</span>
    </Link>
    <Link to="/signup">
      <span className="button signup">signup</span>
    </Link>
  </div>
);

export default Unregistered;
