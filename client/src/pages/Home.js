import React, { Component } from 'react';
import {
    Row,
    Col,
    Button,
    CardText,
} from 'reactstrap';
import Image from 'react-bootstrap/Image';
import ReactCardFlip from 'react-card-flip';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Fade } from "react-slideshow-image";
import { Icon } from '@iconify/react';
import lawIcon from '@iconify-icons/whh/law';
import mapIcon from '@iconify-icons/carbon/map'
import 'react-slideshow-image/dist/styles.css';

import NewYork from "../Images/New York.png";
import Boston from "../Images/Boston.png";
import LosAngeles from "../Images/Los Angeles.png";
import London from "../Images/London.png";
import MapSmall from "../Images/MapSmall.png";
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import LoginModal from "../components/loginModal";


class Home extends Component{
    static propTypes = {
        auth: PropTypes.object.isRequired
    }
    render(){
        const { isAuthenticated, user } = this.props.auth;
        const cities = [
            "New York",
            "Boston",
            "Miami",
            "Los Angeles"
        ];
        const info = (
            <div>
                <div className="SectionCities">
                    <div className="Cities">
                        <h2>Available in major cities</h2>
                        <Col md="4" className="ListCities">
                            {cities.map((city) =>
                                <h4 className="City" color="primary" block><strong>{city}</strong></h4>
                            )}
                        </Col>
                    </div>
                </div>
                <div className="SectionFeatures">
                    <div className="Features">
                        <h2 className="FeaturesLabel">Features</h2>
                        <br/>
                        <div className="ListFeatures">
                            <div className="Item">
                                <Icon icon={lawIcon} className="FeatureIcon"/>
                                <h4 className="UserTypeText">Easily challenge your home appraisal</h4>
                            </div>
                            <div>
                                <Icon icon={mapIcon} className="FeatureIcon"/>
                                <h4 className="UserTypeText">Check and compare the value of other homes</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
        const authLinks = (
            <div className="slide-container">
                <Fade>
                    <div className="each-fade">
                        <img className="Image" src={NewYork} />
                    </div>
                    <div className="each-fade">
                        <img className="Image" src={Boston} />
                    </div>
                    <div className="each-fade">
                        <img className="Image" src={LosAngeles} />
                    </div>
                    <div className="each-fade">
                        <img className="Image" src={London} />
                    </div>
                </Fade>
            </div>
        );
        const guestLinks = (
            <div>
                <div className="SectionSignLog">
                    <div className="SignLog">
                        <div>
                            <Image className="ImageSign" src= {MapSmall} roundedCircle/>
                        </div>
                        <LoginModal/>
                    </div>
                </div>
            </div>
        );

        return(
            <div>
                <NavBar/>
                    { isAuthenticated ? authLinks : guestLinks }
                    {info}
                <Footer/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, null)(Home);
