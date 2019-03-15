import React, {Component} from "react";
import { Form, FormGroup, Label, Input, FormText, Alert,Row,Col} from 'reactstrap';
import "./Profile.scss";
import { Button } from "reactstrap";
import { Link } from "react-router-dom"
import API from "../../utils/API";
import Timer from "../../components/Timer";

class Profile extends Component {
    state = {
        loggedIn: false,
        user: null,
        loading: true
    }

    componentDidMount() {

        this.loading();

        API.isLoggedIn().then(user => {
            if (user.data.loggedIn) {
                this.setState({
                    loggedIn: true,
                    user: user.data.user
                });
            }
        }).catch(err => {
            console.log(err);
        });

        console.log(this.props)
    }

    loading() {
        setTimeout(()=> {
            this.setState({
                loading: false
            })
        }, 1000)  
    }

    render() {
        return (
            <div className="profilePage">
                {this.state.loggedIn ? (
                    <div className="profileBox">
                        <h1 id="userTitle">Welcome {this.state.user.username}</h1>
                        <div>
                        <Row>
    <Col sm><Form>
                <FormGroup>
                    <Label for="locname">Location Name</Label>
                    <Input type="text" name="locname" id="locname" placeholder="Location Name" value={this.props.locname} onChange={this.props.handleInputChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="poc">Person of Contact</Label>
                    <Input type="text" name="poc" id="poc" placeholder="Person of Contact" value={this.props.poc} onChange={this.props.handleInputChange}  />
                </FormGroup>
                <FormGroup>
                    <Label for="foodinfo">Food Information</Label>
                    <Input type="text" name="foodinfo" id="foodinfo" placeholder="Food Information" value={this.props.foodinfo} onChange={this.props.handleInputChange}  />
                </FormGroup>
                <FormGroup>
                    <Label for="meals">Meals</Label>
                    <Input type="text" name="meals" id="meals" placeholder="Number of meals" value={this.props.meals} onChange={this.props.handleInputChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="pickup">Pick Up</Label>
                    <Input type="text" name="pickup" id="pickup" placeholder="Pick Up Instructions" value={this.props.pickup} onChange={this.props.handleInputChange}  />
                </FormGroup>

            </Form></Col>
    <Col sm>
    <Label for="claim it">Claim it!</Label>
    </Col>
    <Col sm>    
    <Label for="claimed">Already claimed</Label>
    </Col>
  </Row>
        <Timer/>    
        </div>
                    </div>
                    
                ) : 
                


                (
                    <div className="noUser">
                        {!this.state.loading ? (
                            <>
                                <h1>please log in</h1>
                                <Link className="loginLink" to="/login"><Button className="loginBtn" color="info" block>Login</Button></Link>
                            </>
                        ) : (
                            <img id="loadingIcon" src="./assets/images/loading.gif" alt="loading"/>
                        )}
                    </div> 
                )}
            </div>


        )


    }
}



    // //  render() 
    //      return (
        // <div>
        //     <Form>
        //         <FormGroup>
        //             <Label for="locname">Location Name</Label>
        //             <Input type="text" name="locname" id="locname" placeholder="Location Name" value={this.props.locname} onChange={this.props.handleInputChange} />
        //         </FormGroup>
        //         <FormGroup>
        //             <Label for="poc">Person of Contact</Label>
        //             <Input type="text" name="poc" id="poc" placeholder="Person of Contact" value={this.props.poc} onChange={this.props.handleInputChange}  />
        //         </FormGroup>
        //         <FormGroup>
        //             <Label for="foodinfo">Food Information</Label>
        //             <Input type="text" name="foodinfo" id="foodinfo" placeholder="Food Information" value={this.props.foodinfo} onChange={this.props.handleInputChange}  />
        //         </FormGroup>
        //         <FormGroup>
        //             <Label for="meals">Meals</Label>
        //             <Input type="text" name="meals" id="meals" placeholder="Number of meals" value={this.props.meals} onChange={this.props.handleInputChange} />
        //         </FormGroup>
        //         <FormGroup>
        //             <Label for="pickup">Pick Up</Label>
        //             <Input type="text" name="pickup" id="pickup" placeholder="Pick Up Instructions" value={this.props.pickup} onChange={this.props.handleInputChange}  />
        //         </FormGroup>
            

        //     </Form>
        // </div>
    //     //  );
         
        

export default Profile;