import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import {
    Container,
    Card,
    CardBody,
    CardText,
    CardTitle,
    CardSubtitle,
    Input,
    FormGroup,
    CardGroup,
    Row,
    Col,
} from 'reactstrap';


import { getUser } from "../actions/userActions";

import profile from "../Images/Winston Cai.png";
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

class Profile extends Component{
    constructor(props) {
        super(props);
        this.state = {
            userId: "",
            name: "",
            email: "",
            role: "",
            houses: [],
        }   
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.getUser(id);
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit(event){
        event.preventDefault();
    }

    render(){
        return(
            <div className = "about">
                <NavBar/>
                <Card style={{ borderRadius: 20 }} className = "home-card">
                    <CardGroup>
                        <Card body outline color="white" style={{ borderRadius: 20 }} className = "profile">
                            <Image src= {profile} className = "image" roundedCircle/>
                        </Card>
                        <Card body outline color="white" style={{ borderRadius: 20 }} className = "description">
                            <CardBody>
                                <CardTitle tag="h4">{this.state.introStatement}</CardTitle>
                                <br/>
                                <CardSubtitle tag="h6">{this.state.elevatorPitch}</CardSubtitle>
                                <br/>
                                <CardText><strong>Some fun facts about me:</strong></CardText>
                                <CardText><ul className="funfacts">{items}</ul></CardText>
                            </CardBody>
                        </Card>
                    </CardGroup>
                </Card>
                <Footer/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(mapStateToProps, { getUser })(withRouter(Profile));