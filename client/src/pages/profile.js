import React, { Component } from 'react';
import { connect } from "react-redux";
import { Icon } from '@iconify/react';
import personCircle from '@iconify-icons/bi/person-circle';
import emailSolid from '@iconify-icons/clarity/email-solid';
import addressBook from '@iconify-icons/el/address-book';
import briefcaseIcon from '@iconify-icons/entypo/briefcase';
import bedIcon from '@iconify-icons/fa-solid/bed';
import bathroomIcon from '@iconify-icons/cil/bathroom';
import rulerIcon from '@iconify-icons/raphael/ruler';
import Image from 'react-bootstrap/Image';
import Talk from "talkjs";
import PropTypes from "prop-types";
import {
    Col,
    Row,
    Card,
    CardBody,
    CardGroup,
    CardText,
    CardTitle,
    CardSubtitle,
    Form,
    FormGroup,
    Modal,
    Button,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
} from 'reactstrap';

import { getUser, updateUser } from "../actions/userActions";
import { getHousesInd, updateHouse } from "../actions/houseActions";
import { uploadImage, getImage } from "../actions/imageActions";
import { clearErrors } from "../actions/errorActions";
import NavBar from '../components/navBar';
import Footer from '../components/footer';

class Profile extends Component{
    static propTypes = {
        auth: PropTypes.object.isRequired,
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
            image: null,
            editMode: false,
            modalOpen: false,
        }   
        this.fetchData = this.fetchData.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.saveEdit = this.saveEdit.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
        this.chatWith = this.chatWith.bind(this);
        this.challenge = this.challenge.bind(this);
        this.toggle = this.toggle.bind(this);
        this.openModal = this.openModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    async fetchData(){
        const userId = this.props.user.user.id;
        await this.props.getImage({ userId, type: "Profile", address: "" })
            .then(res => {
                if(!res){
                    console.log("no image yet");
                }else{
                    console.log(res);
                    let tmp = res.image.split("/");
                    this.setState({
                        image: tmp[tmp.length - 1]
                    })
                }
            })
    }
    async componentDidMount() {
        const userId = this.props.user.user.id;
        const type = this.props.user.user.userType;
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
        this.props.getImage({ userId, type: "Profile", address: "" })
            .then(res => {
                if(!res){
                    console.log("no image yet");
                }else{
                    console.log(res);
                    let tmp = res.image.split("/");
                    this.setState({
                        image: tmp[tmp.length - 1]
                    })
                }
            })
    }
    onChange(e){
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    onClick(e){
        e.preventDefault();
        this.setState({
            editMode: !this.state.editMode
        });
    }
    toggle(){
        this.props.clearErrors();
        const initialState = {
            modalOpen: false,
        };
        this.setState(initialState);
    }
    openModal(e){
        this.setState({ modalOpen: true });
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
        this.props.updateUser(newUser);
        e.preventDefault();
    }
    uploadImage(e) {
        e.preventDefault();
        for(let i = 0; i < e.target.files.length; i++){
            let imageFormObj = new FormData();
            imageFormObj.append("type", "Profile");
            imageFormObj.append("userId", this.props.user.user.id);
            imageFormObj.append("imageData", e.target.files[0]);

            this.props.uploadImage(imageFormObj);
        }
        // this.fetchData();   
    }
    handleSubmit(e){
        e.preventDefault();
        this.toggle();
        this.fetchData();
    }
    chatWith(e, house){
        e.preventDefault();
        let typeCurrent;
        let typeOther;
        if (this.props.user.user.userType === "Appraiser"){
            typeCurrent = "Appraiser";
            typeOther = "Home_Owner";
        }else{
            typeCurrent = "Home_Owner";
            typeOther = "Appraiser";
        }

        const currentUser = {
            id: this.props.user.user.id,
            name: this.props.user.user.name,
            role: typeCurrent
        };
        let otherUser;
        if (this.props.user.user.userType === "Appraiser"){
            otherUser = {
                id: house.postedBy,
                name: house.postedName,
                role: typeOther
            }
        }else{
            otherUser = {
                id: house.reviewedBy,
                name: house.reviewedName,
                role: typeOther
            }
        }
        console.log(currentUser);
        console.log(otherUser);
        Talk.ready
        .then(() => {
            const me = new Talk.User(otherUser);
            const other = new Talk.User(currentUser)

            if (!window.talkSession) {
                window.talkSession = new Talk.Session({
                    appId: "tjfIxoPw",
                    me: me
                });
            } 

            const conversationId = Talk.oneOnOneId(me, other);
            const conversation = window.talkSession.getOrCreateConversation(conversationId);
            
            conversation.setParticipant(me);
            conversation.setParticipant(other);

            this.chatbox = window.talkSession.createChatbox(conversation);
            this.chatbox.mount(this.container);
        })            
        .catch(e => console.error(e));
    }
    challenge(e, house){
        e.preventDefault();
        const updHouse = {
            status: false,
            reviewedBy: "",
            reviewedName: "",
            address: house.address,
            value: 0,
            reasoning: "",
        }
        this.props.updateHouse(updHouse);
        this.fetchData();
    }
    render(){   
        let editModeF = (
            <Card style={{ borderRadius: 15, backgroundColor: '#faf9f7', borderColor: "#faf9f7" }} className = "description">
                <CardBody>
                    <CardTitle tag="h4"><strong>Personal Information</strong></CardTitle>
                    <br/>
                    <CardSubtitle tag="h6"><Icon icon={emailSolid} className="pr-2" style={{ color: "#0967c2", fontSize: "30px" }}/>{this.state.email}</CardSubtitle>
                    <br/>
                    <CardSubtitle tag="h6"><Icon icon={briefcaseIcon} className="pr-2" style={{ color: "#0967c2",fontSize: "30px" }}/>{this.state.role}</CardSubtitle>
                    <br/>
                    <CardText><Icon icon={addressBook} className="pr-2" style={{ color: "#0967c2", fontSize: "30px" }}/>{this.state.bio}</CardText>
                </CardBody>
                <Button className="buttonEdit" onClick={this.onClick} block>Edit</Button>
            </Card>
        )
        let editModeT = (
            <Card style={{ borderRadius: 15, backgroundColor: '#faf9f7' }} className = "description">
                <CardBody>
                    <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>Email</InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" name="email" id="email" placeholder={this.state.email} onChange={this.onChange}/>
                    </InputGroup>
                    <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>Role</InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" name="role" id="role" placeholder={this.state.role} onChange={this.onChange}/>
                    </InputGroup>
                    <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                        <InputGroupText>Bio</InputGroupText>
                        </InputGroupAddon>
                        <Input className="h-100" type="textarea" name="description" id="description" placeholder={this.state.bio} onChange={this.onChange}/>
                    </InputGroup>
                    <Row>
                        <Col className="pl-3 pr-2 mb-0">
                            <Button onClick={this.onClick} block>Cancel</Button>
                        </Col>
                        <Col className="pr-3 pl-2 mb-0">
                            <Button onClick={this.saveEdit} block>Save</Button>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        )
        return(
            <div>
                <div style={{backgroundColor: "#f1ece6"}} className="pb-4">
                    <NavBar/>
                    <div style={{ width: "50%", margin: "auto" }} className="mt-4">
                        <Card style={{ borderRadius: 15, backgroundColor: '#faf9f7' }} className = "profileCard mb-4">
                            <CardGroup>
                                <Card style={{ borderRadius: 15, backgroundColor: '#faf9f7', borderColor: "#faf9f7" }} className = "profile">
                                    {this.state.image != null ? (
                                        <div className="d-flex my-3">
                                            <i className="m-auto text-center">
                                                <Image src= {require(`/Users/winston/Documents/Programming/WebDevelopment/ADREstate/uploads/${this.state.image}`)} className="profilePicture" alt="Fail" onClick={this.openModal} roundedCircle/>
                                                <br/>
                                                <h3><strong>{this.state.name}</strong></h3>
                                            </i>
                                        </div>
                                    ) : (
                                        <div className="d-flex my-3">
                                            <i className="m-auto text-center">
                                                <Icon icon={personCircle} style={{ fontSize: "300px" }} onClick={this.openModal} />
                                                <br/>
                                                <h3><strong>{this.state.name}</strong></h3>
                                            </i>
                                        </div>
                                    )}
                                </Card>
                            </CardGroup>
                        </Card>
                        <br/>
                        <Row className="mb-2 mx-0">
                            <Col md="5" className="m-0">
                                {this.state.editMode ? editModeT : editModeF}
                            </Col>
                            <Col md="7">
                                <Card style={{ borderRadius: 15, backgroundColor: '#faf9f7' }} className = "mb-4 pt-2">
                                    <CardBody>
                                        <CardTitle tag="h4"><strong>Houses: {this.state.houses.length}</strong></CardTitle>
                                    </CardBody>
                                </Card>
                                {this.state.houses.map((house, idx) =>
                                    <Card style={{ borderRadius: 15, backgroundColor: '#faf9f7' }} className = "mb-4">
                                        <CardBody>
                                            <CardTitle tag="h4"><strong>{house.address}</strong></CardTitle>
                                            { house.status ? (
                                                <CardSubtitle className="subtitleHouse">
                                                    <span className="postedDate">Posted on: {house.date}</span>
                                                    <br/>
                                                </CardSubtitle>    
                                            ) : (
                                                <CardSubtitle className="subtitleHouse">
                                                    Has yet to be evaluated by an appraiser
                                                    <span className="postedDate">Posted on: {house.date}</span>
                                                    <br/>
                                                </CardSubtitle>
                                            )}
                                            <br/>
                                            <Row>
                                                <Col className="ml-auto text-center"><i className="m-auto"><Icon icon={bedIcon} style={{ color: "#0967c2" }} className="houseIcon"/></i>
                                                    <p>Bed: {house.bedrooms}</p>
                                                </Col>
                                                <Col className="mr-auto text-center"><i className="m-auto"><Icon icon={bathroomIcon} style={{ color: "#0967c2" }} className="houseIcon"/></i>
                                                    <p>Bath: {house.bathrooms}</p>
                                                </Col>
                                                <Col  className="ml-auto text-center"><i className="m-auto"><Icon icon={rulerIcon} style={{ color: "#0967c2" }} className="houseIcon"/></i>
                                                    <p>Square Feet: {house.squareFeet}</p>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col className="text-center">
                                                    <hr style={{"width": "20%", borderTop: "1px solid #D91E28"}} className="my-4"/>
                                                    <p className="mx-2">{house.description}</p>
                                                </Col>
                                            </Row>
                                            {this.props.user.user.userType === "Appraiser" ? (
                                                <Row>
                                                    <Col className="text-center">
                                                        <hr style={{"width": "80%", borderTop: "1px solid #D91E28"}} className="my-4"/>
                                                        <p>"{house.valueReasoning}"</p>
                                                        <p> - {house.reviewedName}</p>
                                                        <Button className="mt-3 px-4" value={house} onClick={(e) => this.chatWith(e, house)} block>Message Home Owner</Button>
                                                    </Col>
                                                </Row>
                                            ) : (
                                                [(house.status ? (
                                                    <Row>
                                                        <Col className="text-center">
                                                            <hr style={{"width": "80%", borderTop: "1px solid #D91E28"}} className="my-4"/>
                                                            <h6><strong>Value: ${house.value}</strong></h6>
                                                            <p>"{house.valueReasoning}"</p>
                                                            <p> - {house.reviewedName}</p>
                                                            
                                                            <Row>
                                                                <Col className="pl-3 pr-2 mb-0">
                                                                    <Button value={house} onClick={(e) => this.challenge(e, house)} block>Challenge</Button>
                                                                </Col>
                                                                <Col className="pr-3 pl-2 mb-0">
                                                                    <Button value={house} onClick={(e) => this.chatWith(e, house)} block>Message Appraiser</Button>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                ) : (null))]
                                            )}
                                            
                                        </CardBody>
                                    </Card>
                                )}
                            </Col>
                        </Row>
                    </div>
                </div>
                <Modal className="registerModal" isOpen={this.state.modalOpen} toggle={this.toggle}>
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <div className="my-4 text-center">
                                <h4>Upload Profile Picture</h4>
                            </div>
                            <hr/>
                            <InputGroup className="mb-4">
                                <Input className="ml-7" type="file" multiple="multiple" id="image" name="image" value="" onChange={this.uploadImage} required/>
                            </InputGroup>
                            <Row>
                                    <Col className="pl-3 pr-2 mb-0">
                                        <Button onClick={this.toggle} block>Cancel</Button>
                                    </Col>
                                    <Col className="pr-3 pl-2 mb-0">
                                        <Button onClick={this.handleSubmit} block>Submit</Button>
                                    </Col>
                                </Row>
                        </FormGroup>
                    </Form>
                </Modal>
                <div className="chatbox-container" ref={c => this.container = c}>
                    <div id="talkjs-container" style={{height: "300px"}}><i></i></div>
                </div>
                <Footer/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
    user: state.auth.user
});

export default connect(mapStateToProps, { getUser, updateUser, getHousesInd, updateHouse, uploadImage, getImage, clearErrors })(Profile);