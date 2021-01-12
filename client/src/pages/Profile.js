import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { Icon, InlineIcon } from '@iconify/react';
import personCircle from '@iconify-icons/bi/person-circle';
import Image from 'react-bootstrap/Image';
import {
    Container,
    Card,
    CardBody,
    CardText,
    CardTitle,
    CardSubtitle,
    Button,
    Input,
    FormGroup,
    CardGroup,
    Row,
    Col,
} from 'reactstrap';

import profile from "../Images/Winston Cai.png"
import { getUser } from "../actions/userActions";
import NavBar from '../components/navBar';
import Footer from '../components/footer';

class Profile extends Component{
    constructor(props) {
        super(props);
        this.state = {
            userId: "",
            name: "",
            email: "",
            role: "",
            bio: "",
            houses: [],
            editMode: false,
            hasImage: null,
        }   
        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.saveEdit = this.saveEdit.bind(this);
        this.uploadPhoto = this.uploadPhoto.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        // const id = this.props.match.params.id;
        // this.props.getUser(id)
        //     .then(res => {
        //         if(!res){
        //             throw new Error("Server Error");
        //         }
        //         this.setState({
        //             name: res.name,
        //             email: res.email,
        //             role: res.userType,
        //         })
        //     })
        this.setState({
            name: "Winston Cai",
            email: "winston.x.cai@gmail.com",
            role: "Home Seller",
            bio: "I am fascinated by the applications of technology to improve the quailty of our lives and expand our scientific boundaries.  I enjoy applying my programming skills to complete impactful projects!  Besides coding, I also like pondering metaphysical topics, traveling the world, and cooking.",
            houses: [{
                date: "01/12/15",
                address: "1755 York Ave, New York, New York, 10128",
                status: true,
                value: 500000,
                description: "Absolutely stunning home"
            }],
            hasImage: true,
        })
    }

    onChange(e){
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    onClick(e){
        this.setState({
            editMode: true
        });
    }
    saveEdit(e){
        this.setState({
            editMode: false
        });

    }
    uploadPhoto(e){

    }
    handleSubmit(event){
        event.preventDefault();
    }

    render(){   
        let editModeF = (
            <Card style={{ borderRadius: 15, backgroundColor: '#faf9f7', borderColor: "#faf9f7" }} className = "description">
                <CardBody>
                    <CardTitle tag="h4"><strong>{this.state.name}</strong></CardTitle>
                    <br/>
                    <CardSubtitle tag="h6">{this.state.role}</CardSubtitle>
                    <br/>
                    <CardText>{this.state.bio}</CardText>
                </CardBody>
                <Button className="buttonEdit" onClick={this.onClick} block>Edit</Button>
            </Card>
        )
        let editModeT = (
            <Card style={{ borderRadius: 15, backgroundColor: '#faf9f7', borderColor: "#faf9f7" }} className = "description">
                <CardBody>
                    <CardTitle tag="h4"><strong>Name</strong></CardTitle>
                    <Input type="text" name="name" value={this.state.name} onChange={this.onChange} placeholder={this.state.name}/>
                    <br/>
                    <CardSubtitle tag="h6">Role</CardSubtitle>
                    <Input type="text" name="role" value={this.state.role} onChange={this.onChange} placeholder={this.state.role}/>
                    <br/>
                    <CardText>Personal Bio</CardText>
                    <Input type="text" name="bio" value={this.state.bio} onChange={this.onChange} placeholder={this.state.bio}/>
                </CardBody>
                <Button className="saveEdit" onClick={this.saveEdit} block>Save</Button>
            </Card>
        )
        return(
            <div className = "about">
                <div className="content">
                    <NavBar/>
                    <div className="profileContent">
                        <br/>
                        <Container>
                            <Card style={{ borderRadius: 15, backgroundColor: '#faf9f7' }} className = "profileCard">
                                <CardGroup>
                                    <Card style={{ borderRadius: 15, backgroundColor: '#faf9f7', borderColor: "#faf9f7" }} className = "profile">
                                        {this.state.hasImage ? (
                                            <div>
                                                <Image src= {profile} className = "image" roundedCircle/>
                                                <Button className="changePhoto" onClick={this.uploadPhoto} block>Change Photo</Button>
                                            </div>
                                        ) : (
                                            <div>
                                                <Icon icon={personCircle} className="icon"/>
                                                <Button className="uploadPhoto" onClick={this.uploadPhoto} block>Upload Photo</Button>
                                            </div>
                                        )}
                                    </Card>
                                    {this.state.editMode ? editModeT : editModeF }
                                </CardGroup>
                            </Card>
                            <br/>
                            <h4 className = "houseHeader">Houses</h4>
                            {this.state.houses.map((house, idx) =>
                                <Card style={{ borderRadius: 15, backgroundColor: '#faf9f7', borderColor: '#0967c2' }} className = "houseCard">
                                    <CardBody>
                                        <CardTitle tag="h4"><strong>{house.address}</strong></CardTitle>
                                        { house.status ? (
                                            <CardSubtitle className="subtitleHouse">
                                                Value: ${house.value}
                                                <span className="postedDate">Posted on: {house.date}</span>
                                            </CardSubtitle>    
                                        ) : (
                                            <CardSubtitle className="subtitleHouse">
                                                This home has yet to be evaluated by an appraiser
                                                <span className="postedDate">Posted on: {house.date}</span>
                                            </CardSubtitle>
                                        )}
                                        <br/>
                                        <CardText>{house.description}</CardText>
                                    </CardBody>
                                </Card>
                            )}
                        </Container>
                        <br/>
                    </div>
                </div>
                <div className="footer">
                    <Footer/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(mapStateToProps, { getUser })(withRouter(Profile));