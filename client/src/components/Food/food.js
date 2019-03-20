import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import "./Food.scss";
import { Button } from "reactstrap";
import { Link } from "react-router-dom"
import API from "../../utils/API";
import Timer from "../../components/Timer";
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, ListItem
} from 'reactstrap';
class Food extends Component {
    state = {
        loggedIn: false,
        user: null,
        loading: true,
        foods: [],
        locname: "",
        poc: "",
        pocphone: "",
        foodinfo: "",
        meals: "",
        pickup: "",
        claimit: false
    }
    componentDidMount() {
        this.loading();
        this.loadFoods();
        // this.loadClaimIt();
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
        setTimeout(() => {
            this.setState({
                loading: false
            })
        }, 1000)
    }
    loadFoods = () => {
        API.getFoods()
            .then(res =>
                this.setState({ foods: res.data, locname: "", poc: "", pocphone: "", foodinfo: "", meals: "", pickup: "", })
            )
            .catch(err => console.log(err));
    };
    // loadClaimIt = () => {
    //     API.claimIt()
    //         .then(res =>
    //             this.setState({ claimit: true })
    //         )
    //         .catch(err => console.log(err));
    // };
    foodUpload = () => {
        API.foodUpload()
            .then(res => this.setState({ meals: res.data }))
            .catch(err => console.log(err));
    };
    handleInput = (event) => {
        var name = event.target.name
        var value = event.target.value
        if (name === "locname") {
            this.setState({ locname: value })
        } else if (name === "poc") {
            this.setState({ poc: value })
        } else if (name === "pocphone") {
            this.setState({ pocphone: value })
        } else if (name === "foodinfo") {
            this.setState({ foodinfo: value })
        } else if (name === "meals") {
            this.setState({ meals: value })
        } else if (name === "pickup") {
            this.setState({ pickup: value })
        }
    }
    handleUpload = (event) => {
        event.preventDefault()
        if (this.state.locname && this.state.poc && this.state.pocphone && this.state.foodinfo && this.state.meals && this.state.pickup) {
            API.saveFood({
                locname: this.state.locname,
                poc: this.state.poc,
                pocphone: this.state.pocphone,
                foodinfo: this.state.foodinfo,
                meals: this.state.meals,
                pickup: this.state.pickup,
            })
                .then(res => this.loadFoods())
                .catch(err => console.log(err));
            window.location.reload();
        }
    }
    // handleClaimIt = (event) => {
    //     event.preventDefault()
    //     console.log("handleClaimIt")
    //     if (this.state.locname && this.state.poc && this.state.pocphone && this.state.foodinfo && this.state.meals && this.state.pickup) {
    //         console.log("in the if")
    //         API.claimIt({
                
    //             claimit: this.state.claimit
    //         })
    //             .then(res => this.loadFoods())
    //             .catch(err => console.log(err));
    //         window.location.reload();
    //     }
    // }
    render() {
        return (
            <div className="profilePage">
                {this.state.loggedIn ? (
                    <div className="profileBox">
                        <h4 id="userTitle">Welcome {this.state.user.username}</h4>
                        <div>
                            <Row>
                                <Col lg>
                                <h4>Food Upload</h4>
                                <Form>
                                    <FormGroup>
                                        <Label for="locname">Location Name</Label>
                                        <Input onChange={event => this.handleInput(event)} type="text" name="locname" id="locname" placeholder="Location Name" width="100" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="poc">Point of Contact</Label>
                                        <Input type="text" name="poc" id="poc" placeholder="Person of Contact" onChange={event => this.handleInput(event)} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="pocphone">Contact's Phone</Label>
                                        <Input type="text" name="pocphone" id="pocphone" placeholder="Phone Number" onChange={event => this.handleInput(event)} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="foodinfo">Food Information</Label>
                                        <Input type="text" name="foodinfo" id="foodinfo" placeholder="Food Information" onChange={event => this.handleInput(event)} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="meals">Meals</Label>
                                        <Input type="text" name="meals" id="meals" placeholder="Number of meals" onChange={event => this.handleInput(event)} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="pickup">Pick Up</Label>
                                        <Input type="text" name="pickup" id="pickup" placeholder="Pick Up Instructions" onChange={event => this.handleInput(event)} />
                                    </FormGroup>
                                    <Button
                                        className="loginBtn" disabled={!(this.state.locname && this.state.poc && this.state.pocphone && this.state.foodinfo && this.state.meals && this.state.pickup)}
                                        onClick={(event) => this.handleUpload(event)} color="success" block>Food Upload</Button>
                                </Form>
                                </Col>
                                <Col lg>
                                    <div>
                                        <h4>Claim It</h4>
                                        {this.state.foods.length ? (
                                            <div>
                                            <Card>
                                                <CardBody>
                                                    {this.state.foods.map(food => {
                                                        return (
                                                            <CardText key={food._id}>
                                                                <strong>
                                                                    <Timer />
                                                                    <br></br>
                                                                    Point of Contact: {food.poc}<br></br> Phone#: {food.pocphone}<br></br>Food Info: {food.foodinfo}<br></br>Location: {food.locname}
                                                                </strong>
                                                                <Button 
                                                                    onClick={(event) => this.handleUpload(event)} color="success" block>Claim It!</Button>
                                                            </CardText>
                                                        );
                                                    })}
                                                </CardBody>
                                            </Card>
                                            </div>
                                        ) : (
                                                <h3>No Results to Display</h3>
                                            )}
                                    </div>
                                </Col>
                                <Col>
                                <h4>Already Claimed</h4>
                                </Col>
                            </Row>
                        </div>
                    </div>
                ) :
                    (
                        <div className="noUser">
                            {!this.state.loading ? (
                                <>
                                    <h4>please log in</h4>
                                    <Link className="loginLink" to="/login"><Button className="loginBtn" color=".bg-success" block>Login</Button></Link>
                                </>
                            ) : (
                                    <img id="loadingIcon" src="./assets/images/loading.gif" alt="loading" />
                                )}
                        </div>
                    )}
            </div>
        )
    }
}
export default Food;