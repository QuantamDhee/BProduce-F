import React from "react";
import { connect } from "react-redux";

const Profile = ({ user }) => {
  return (
    <div className="profile">
      <div style={{marginRight: "100px"}}>
        <h4>User Name:  {user.username}</h4>
      </div>
      <div>
        <h4>My reviews:</h4>
        <ul>
          { 
            user.reviews.map((review) => <li key={review.id}>{review.text}</li>)
          }
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Profile);
