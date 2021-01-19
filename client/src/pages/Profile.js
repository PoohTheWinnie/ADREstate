import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { Icon } from '@iconify/react';
import personCircle from '@iconify-icons/bi/person-circle';
import Image from 'react-bootstrap/Image';
import PropTypes from "prop-types";
import axios from "axios";
import {
    Container,
    Card,
    CardBody,
    CardText,
    CardTitle,
    CardSubtitle,
    Button,
    Input,
    CardGroup,
} from 'reactstrap';

import { getUser, updateUser } from "../actions/userActions";
import { getHousesInd } from "../actions/houseActions";
import { getImage } from "../actions/imageActions";
import NavBar from '../components/navBar';
import Footer from '../components/footer';
import ChatApp from "../components/chatApp";

class Profile extends Component{
    static propTypes = {
        user: PropTypes.object.isRequired
    }
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            role: "",
            bio: "",
            houses: [],
            uploadImage: null,
            image: false,
            editMode: false,
        }   
        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.saveEdit = this.saveEdit.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
    }
    componentDidMount() {
        const userId = this.props.user.user.id;
        const type = this.props.user.user.userType;
        console.log(type);
        console.log(userId);
        this.props.getUser(userId)
            .then(res => {
                if(!res){
                    throw new Error("Server Error");
                }
                this.setState({
                    name: res.name,
                    email: res.email,
                    role: res.userType,
                    bio: res.bio,
                })
            })
        this.props.getHousesInd({userId, type})
            .then(houses => {
                if(!houses){
                    throw new Error("Server Error");
                }
                this.setState({
                    ...this.state,
                    houses
                })
            })
        this.props.getImage(userId)
            .then(res => {
                if(!res){
                    console.log("no image yet");
                }
                this.setState({
                    // image: URL.createObjectURL(`../${res.image}`)
                    image: res.image
                })
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
        const newUser = {
            id: this.props.user.user.id,
            name: this.state.name,
            role: this.state.role,
            bio: this.state.bio,
        }
        const userId = this.props.user.user.id;
        console.log(userId);
        this.props.updateUser(newUser);
        e.preventDefault();
    }
    uploadImage(e) {
        let imageFormObj = new FormData();
        console.log("e target files");
        console.log(e.target.files);
        imageFormObj.append("type", "Profile");
        imageFormObj.append("userId", this.props.user.user.id);
        imageFormObj.append("imageData", e.target.files[0]);
    
        // stores a readable instance of 
        // the image being uploaded using multer
        this.setState({
          uploadImage: URL.createObjectURL(e.target.files[0])
        });
    
        axios.post("/api/image/", imageFormObj)
            .then((data) => {
                if (data.data.success) {
                    console.log("Image has been successfully uploaded using multer");
                    this.setState({
                        image: this.state.uploadImage,
                    });
                }
            })
            .catch((err) => {
                console.log("Error while uploading image using multer");
                console.log(err);
                this.setState({
                    uploadImage: null
                });
            });
    }
    render(){   
        console.log(this.state.image);
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
                                        {this.state.image != null ? (
                                            <div>
                                                <Image src={require("../uploads/1610571317705Winston Cai.png")} className="image" roundedCircle/>
                                                <Input type="file" id="image" name="image" value="" onChange={this.uploadImage} required/>
                                            </div>
                                        ) : (
                                            <div>
                                                <Icon icon={personCircle} className="icon"/>
                                                <Input type="file" id="image" name="image" value="" onChange={this.uploadImage} required/>
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
                    <profileImageModal/>
                    <ChatApp/>
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
    error: state.error,
    user: state.auth.user
});

export default connect(mapStateToProps, { getUser, updateUser, getHousesInd, getImage })(withRouter(Profile));