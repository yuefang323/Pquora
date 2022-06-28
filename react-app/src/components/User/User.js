import React, { useState, useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';

import NavBar from '../NavBar';

function User() {
  const [user, setUser] = useState({});
  const { userId }  = useParams();

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  if (!user) return <Redirect to="/" />;

  return (
    <div className="home-page-wrapper">
    <NavBar />
    <ul className="questions-list-content">
      <li>
        <strong>User Id</strong> {userId}
      </li>
      <li>
        <strong>Username</strong> {user.username}
      </li>
      <li>
        <strong>Email</strong> {user.email}
      </li>
    </ul>
    </div>
  );
}
export default User;
