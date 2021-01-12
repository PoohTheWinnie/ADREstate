import React, { Component } from 'react';
import {
  TileLayer,
  Map,
  Marker, 
  Popup
} from "react-leaflet";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert,
    FormFeedback, //added
    FormText,
    Progress,
    CardText // added
} from 'reactstrap';
import { connect } from 'react-redux';
import axios from "axios";

import { Icon } from "../components/markerIcon";
import NavBar from '../components/navBar';
import Footer from '../components/footer';
import { registerHouse, getHouses } from '../actions/houseActions';
import { clearErrors } from "../actions/errorActions";
import "leaflet/dist/leaflet.css";

class MyMap extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: [],
            addMarker: {},
            strAdd: "",
            displayAdd: "",
            date: "",
            pictureLink: "",
            description: "",
            modalOpen: false,
            getMoreInfo: false,
        };
        this.toggle = this.toggle.bind(this);
        this.addMarker = this.addMarker.bind(this);
        this.getAddress = this.getAddress.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    componentDidMount(){
        this.props.getHouses()
            .then(data => {
                this.setState({
                    ...this.state,
                    data
                });
            })
    }
    toggle(){
        this.props.clearErrors();
        this.setState({
            modalOpen: !this.state.modalOpen
        });
        const initialState = {
            addMarker: {},
            strAdd: "",
            displayAdd: "",
            date: "",
            pictureLink: "",
            description: "",
        };
        this.setState(initialState);
    }
    addMarker(e){
        const { lat, lng } = e.latlng;
        this.getAddress(lat, lng);
        this.setState({
            addMarker: { lat, lng },
            modalOpen: true,
        });
        console.log(this.state.addMarker);
    }
    async getAddress(lat, lng){
        var link = 'https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=' + lat + '&lon=' + lng;
        const openstreet = await axios.get(link);
        const data = openstreet.data;
        var address = [data.address.house_number, data.address.road, data.address.county, data.address.state, data.address.postcode, data.address.country];
        var displayAddr = (
            <div>
                <div>{address[0] + " " + address[1]}</div>
                <div>{address[2] + ", " + address[3] + ", " + address[4]}</div>
                <div>{address[5]}</div>
            </div>
        );
        var strAdd = address[0] + " " + address[1] + " " + address[2] + ", " + address[3] + ", " + address[4] + ", " + address[5];
        this.setState({
            strAdd: strAdd,
            displayAdd: displayAddr,
        });
    }
    getMoreInfo(){
        this.setState({
            getMoreInfo: true,
        });
    }
    onChange(e){
        this.setState({ [e.target.name]: e.target.value })
    }
    handleSubmit(e){
        e.preventDefault();
        const { lat, lng } = this.state.addMarker;
        const strAdd = this.state.strAdd;
        const pictureLink = this.state.pictureLink;
        const description = this.state.description;
        this.props.registerHouse({strAdd, lat, lng, pictureLink, description});

        var dateObj = new Date();
        var month = dateObj.getUTCMonth() + 1; 
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();
        var newdate = year + "/" + month + "/" + day;
        let data = this.state.data;
        const house = {
            address: strAdd,
            latitude: lat,
            longitude: lng,
            pictureLink: pictureLink,
            description: description,
            date: newdate,
        }
        data.push(house);
        this.setState({
            data: data,
            modalOpen: false,
        });
    }
    render(){
        const fullMapStyle = {
            height: "78vh",
            width: "100%",
        }
        const halfMapStyle = {
            height: "78vh",
            width: "50%",
        }
        return(
            <div>
                <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
   integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
   crossOrigin=""/>
                <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
            integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
            crossOrigin=""></script>
                <NavBar/>
                <Map className="Map" center={{ lat: 40.7 , lng: -74 }} zoom={15} onClick={this.addMarker}>
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {this.state.data.map((house, idx) => 
                        <Marker key={`marker-${idx}`} position={{ lat: house.latitude, lng: house.longitude }} icon={ Icon }>
                            <Popup>
                                <span>{house.address}</span>
                                <span>{house.description}</span>
                                <Button onClick={this.getMoreInfo}>Get More Info</Button>
                            </Popup>
                        </Marker>
                    )}
                </Map>
                <Modal isOpen={this.state.modalOpen} toggle={this.toggle}>
                    <ModalHeader toggle ={this.toggle}>Add House</ModalHeader>
                        <ModalBody>
                            <Form onSubmit={this.handleSubmit}>
                                <FormGroup>
                                    <Label>Address</Label>
                                    <br/>
                                    {this.state.displayAdd}
                                    <Label for="pictureLink">Pictures</Label>
                                        <Input type="text" name="pictureLink" id="pictureLink" placeholder="Link for Pictures" className="mb-3"onChange={this.onChange}/>
                                    <Label for="description">Description</Label>
                                        <Input type="text" name="description" id="description" placeholder="Description" className="mb-3"onChange={this.onChange}/>
                                    <div class="signupSubmit">
                                        <Button>
                                            Register House
                                        </Button>
                                    </div>
                                </FormGroup>
                            </Form>
                    </ModalBody>
                </Modal>
                <Footer/>
            </div>
        )
    }
}


const mapStateToProps =  state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(mapStateToProps, { registerHouse, getHouses, clearErrors })(MyMap);