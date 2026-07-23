import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <div className="profile-page">

      <div className="profile-card">

        <h1>👤 My Profile</h1>

        <div className="profile-info">
          <p><strong>Name:</strong> Demo User</p>
          <p><strong>Email:</strong> demo@gmail.com</p>
        </div>

        <div className="profile-buttons">
          <Link to="/dashboard">
            <button>Dashboard</button>
          </Link>

          <button className="logout-btn">
            Logout
          </button>
        </div>

      </div>

    </div>
  );
};

export default Profile;