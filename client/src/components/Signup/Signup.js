import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, FormText, Alert } from 'reactstrap';
import { Link } from "react-router-dom";
import "./Signup.css"

class Signup extends Component {
    state = {
        validUsername: false,
        validPassword: false,
        confirmPassword: false
    }
    componentDidUpdate() {
        this.validatePassword();
        this.confirmPassword();
        this.validateUsername();
    }
    validateUsername() {
        if (this.props.username.length > 1 && !this.state.validUsername) {
            this.setState({
                validUsername: true
            });
        }
        if (this.props.username.length < 1 && this.state.validUsername) {
            this.setState({
                validUsername: false
            });
        }
    }
    validatePassword() {
        let strongPassword = new RegExp(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/);
        let valid = strongPassword.test(this.props.password);
        if (!this.state.validPassword && valid) {
            this.setState({
                validPassword: true
            });
        }
        if (this.state.validPassword && !valid) {
            this.setState({
                validPassword: false,
            });
        }
    }
    confirmPassword() {
        if (this.props.password === this.props.confirmPassword && !this.state.confirmPassword && this.props.password) {
            this.setState({
                confirmPassword: true
            });
        }
        if (this.props.password !== this.props.confirmPassword && this.state.confirmPassword) {
            this.setState({
                confirmPassword: false
            });
        }
    }
    render() {
        return (
            <div>
                <h2 className="loginTitle title-font">Signup</h2>
                <hr />
                {this.props.message ? (
                    <Alert className="animated fadeIn" color="danger">{this.props.message}</Alert>
                ) : (<></>)}
                <Form>
                    <FormGroup>
                        <Label for="firstname">First Name</Label>
                        <Input type="text" name="firstname" id="firstname" placeholder="First Name" value={this.props.firstname} onChange={this.props.handleInputChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="lastname">Last Name</Label>
                        <Input type="text" name="lastname" id="lastname" placeholder="Last Name" value={this.props.lastname} onChange={this.props.handleInputChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="orgname">Organization</Label>
                        <Input type="text" name="orgname" id="orgname" placeholder="Organization" value={this.props.orgname} onChange={this.props.handleInputChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="orgaddress">Organization Address</Label>
                        <Input type="text" name="orgaddress" id="orgaddress" placeholder="Organization Address" value={this.props.orgaddress} onChange={this.props.handleInputChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Email Address</Label>
                        <Input type="email" name="email" id="email" placeholder="Email Address" value={this.props.email} onChange={this.props.handleInputChange} valid={this.state.email} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="username">Username</Label>
                        <Input type="text" name="username" id="username" placeholder="username" value={this.props.username} onChange={this.props.handleInputChange} valid={this.state.validUsername} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input type="password" name="password" id="password" placeholder="password" value={this.props.password} onChange={this.props.handleInputChange} valid={this.state.validPassword} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="confirmPassword">Confirm Password</Label>
                        <Input type="password" name="confirmPassword" id="confirmPassword" placeholder="confirm password" value={this.props.confirmPassword} onChange={this.props.handleInputChange} valid={this.state.confirmPassword} />
                        <FormText>At least 8 characters, 1 capital & 1 number, no special characters.</FormText>
                    </FormGroup>
                    {/* if all fields are valid, allow the user to submit the form */}
                    {(this.state.validUsername && this.state.validPassword && this.state.confirmPassword) ? (
                        <Button color="success" className="greenbtn" id="loginBtn" onClick={this.props.handleSignup} block>Signup</Button>
                    ) : (
                            <Button color="success" className="greenbtn" id="loginBtn" onClick={this.props.handleSignup} block disabled>Signup</Button>
                        )}
                    <p className="signupLink">
                        <Link to="/login" className="signupLink">already have an account?  Sign in here</Link>
                    </p>
                </Form>
            </div>
        );
    }
}

export default Signup;