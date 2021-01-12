import React, { Component } from 'react';
import {
    Col,
    Button,
} from 'reactstrap';
import ReactCardFlip from 'react-card-flip';

import Login from "./Login";
import Signup from "./SignUp";

class LoginModal extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isFlipped: false,
            boolLogin: false,
        }
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e) {
        e.preventDefault();
        this.setState(prevState => ({ 
            isFlipped: !prevState.isFlipped 
        }));
    }
    render(){
        return(
            <div>
                <Col md="12" className="Modal">
                    <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="horizontal">
                        <div className="FrontSide">
                            <Login/>
                            <p>New User?<Button color="link" onClick={this.handleClick} className="SignUpButton">Sign Up</Button></p>
                        </div>
                        <div className="BackSide">
                            <Signup/>
                            <Button outline color="secondary" onClick={this.handleClick} className="Back">Back</Button>
                        </div>
                    </ReactCardFlip>
                </Col>
            </div>
        );
    }
}

export default LoginModal;
