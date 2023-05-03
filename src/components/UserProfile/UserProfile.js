
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./UserProfile.css";

const UserProfile = () => {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("test name");
  const [lastName, setLastName] = useState("last name");
  const [email, setEmail] = useState("email");
  const [phone, setPhone] = useState("phone");

  const handleEditProfile = () => {
    setEditing(true);
  };

  const handleSaveProfile = () => {
    setEditing(false);
    // Save changes to backend or state management system
  };

  return (
    <div className="user-profile">
      <div className="sidebar">
        <Link to="/user-profile/mybookings" className="sidebar-link">
          My Bookings
        </Link>
        <Link to="/user-profile/otherprofileinfo" className="sidebar-link">
          Other Profile Info
        </Link>
        <Link to="/user-profile/test" className="sidebar-link">
          Test
        </Link>
      </div>
      <div className="profile-info">
        <h2 className="username">{name} 's Profile</h2>
        <div className="field">
          <label className="label-name" htmlFor="name">
            Name:
          </label>
          {editing ? (
            <input
              type="text"
              className="input-name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          ) : (
            <span className="span-name">{name}</span>
          )}
        </div>
        <div className="field">
          <label className="label-lname" htmlFor="last-name">
            Last Name:
          </label>
          {editing ? (
            <input
              className="input-lname"
              type="text"
              id="last-name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          ) : (
            <span className="span-lname">{lastName}</span>
          )}
        </div>
        <div className="field">
          <label className="label-email" htmlFor="email">
            Email:
          </label>
          {editing ? (
            <input
              type="email"
              className="input-email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          ) : (
            <span className="span-email">{email}</span>
          )}
        </div>
        <div className="field">
          <label className="label-phone" htmlFor="phone">
            Phone:
          </label>
          {editing ? (
            <input
              className="input-phone"
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          ) : (
            <span className="span-phone">{phone}</span>
          )}
        </div>
        {editing ? (
          <button className="save-button" onClick={handleSaveProfile}>
            Save Profile
          </button>
        ) : (
          <button className="edit-button" onClick={handleEditProfile}>
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
