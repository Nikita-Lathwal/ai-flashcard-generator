import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("userInfo"));

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        <h1>👤 My Profile</h1>

        <div className="profile-info">
          <p>
            <strong>Name:</strong> {user?.name}
          </p>

          <p>
            <strong>Email:</strong> {user?.email}
          </p>
        </div>

        <div className="profile-buttons">
          <Link to="/dashboard">
            <button>Dashboard</button>
          </Link>

          <button
            className="logout-btn"
            onClick={logoutHandler}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;