import React, { Component } from "react";
import Login from "../../components/Login";
import Signup from "../../components/Signup";
import Food from "../../components/Food";
import API from "../../utils/API";
// import "./Auth.scss";

class Profile extends Component {

  
    state = {
        locname: "",
        poc: "",
        pocphone: "",
        foodinfo: "",
        meals: "",
        pickup: ""
      }
  

  handleInputChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
  };

  handleFoodUpload = event => {
    event.preventDefault();
    if (this.state.username && this.state.password) {
      API.foodUpload({
        locname: this.state.locname,
        poc: this.state.poc,
        pocphone: this.state.pocphone,
        foodinfo: this.state.foodinfo,
        meals: this.state.meals,
        pickup: this.state.pickup,
      }).then(user => {
        if (user.data.loggedIn) {
          this.setState({
            loggedIn: true,
            user: user.data.user
          });
          console.log("log in successful");
          window.location.href = '/food';
        } else {
          console.log("something went wrong :(")
          console.log(user.data);
          this.setState({
            message: user.data
          })
        }
      });
    }
  }

  render() {
    return (
      <div className="profilePage">
        {(this.props.action === "login") ? (
          <Login
            username={this.state.username}
            password={this.state.password}
            handleLogin={this.handleLogin}
            handleInputChange={this.handleInputChange}
            message={this.state.message}
          />
        ) : (
            <Food
              locname={this.state.locname}
              poc={this.state.poc}
              pocphone={this.state.pocphone}
              foodinfo={this.state.foodinfo}
              meals={this.state.meals}
              pickup={this.state.pickup}
              handleInputChange={this.handleInputChange}
              message={this.state.message}
            />
          )}
      </div>
    )
  }
}

export default Profile;