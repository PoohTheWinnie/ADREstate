import React, { Component } from 'react';
import {
    Col,
    Row,
} from 'reactstrap';
import Image from 'react-bootstrap/Image';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Fade } from "react-slideshow-image";
import { Icon } from '@iconify/react';
import lawIcon from '@iconify-icons/whh/law';
import mapIcon from '@iconify-icons/carbon/map';
import connectIcon from '@iconify-icons/carbon/connect';
import 'react-slideshow-image/dist/styles.css';

import NewYork from "../images/New York.png";
import Boston from "../images/Boston.png";
import LosAngeles from "../images/Los Angeles.png";
import London from "../images/London.png";
import MapSmall from "../images/MapSmall.png";
import NavBar from '../components/navBar';
import Footer from '../components/footer';
import LoginModal from "../components/loginModal";


class Home extends Component{
    static propTypes = {
        auth: PropTypes.object.isRequired
    }
    render(){
        const isAuthenticated = this.props.auth.isAuthenticated;
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
                        <Row>
                            <Col md="4">
                                <div class="mx-auto mb-5 mb-lg-0 mb-lg-3">
                                    <div class="d-flex"><i class="m-auto"><Icon icon={lawIcon} className="FeatureIcon"/></i></div>
                                    <h3>Easily Challenge Your Appraisal</h3>
                                    <p class="lead mb-0">Request for a redo and get a second opinion on your home!</p>
                                </div>
                            </Col>
                            <Col md="4">
                                <div class="mx-auto mb-5 mb-lg-0 mb-lg-3">
                                    <div class="d-flex"><i class="m-auto"><Icon icon={mapIcon} className="FeatureIcon"/></i></div>
                                    <h3>Look At Other Homes in the Area</h3>
                                    <p class="lead mb-0">Check and compare the value of other homes with our user friendly interface</p>
                                </div>
                            </Col>
                            <Col md="4">
                                <div class="mx-auto mb-5 mb-lg-0 mb-lg-3">
                                    <div class="d-flex"><i class="m-auto"><Icon icon={connectIcon} className="FeatureIcon"/></i></div>
                                    <h3>Connect With Your Appraiser</h3>
                                    <p class="lead mb-0">Anonymity will be preserved until your appraiser gives a decision.  Only then will the two parties will be able to communicate.</p>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        );
        const authLinks = (
            <div className="slide-container">
                <Fade>
                    <div className="each-fade">
                        <Image className="Image" src={NewYork} />
                    </div>
                    <div className="each-fade">
                        <Image className="Image" src={Boston} />
                    </div>
                    <div className="each-fade">
                        <Image className="Image" src={LosAngeles} />
                    </div>
                    <div className="each-fade">
                        <Image className="Image" src={London} />
                    </div>
                </Fade>
            </div>
        );
        const guestLinks = (
            <div>
                <div className="SectionSignLog">
                    <div className="SignLog">
                        <Row>
                            <Image className="ImageSign" src= {MapSmall} roundedCircle/>
                            <Col md="4" className="Modal">
                                <LoginModal/>
                            </Col>
                            
                        </Row>
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
