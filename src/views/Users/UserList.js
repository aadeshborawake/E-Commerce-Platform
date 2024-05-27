import React, { useState, useEffect } from 'react';
import Layout from '../Dashboard/index.js';
import './UserList.css';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://dummyjson.com/users')
      .then(response => response.json())
      .then(data => {
        console.log(data); 
        setUsers(data.users);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <Layout>
      <div className="user-list-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>UserName</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Date of Birth</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.firstName} {user.lastName}</td>
                <td>{user.email}</td>
                <td className="phone">{user.phone}</td>
                <td>{formatDate(user.birthDate)}</td>
                <td>{user.address.address}</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

// Function to format the date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

export default UserList;
