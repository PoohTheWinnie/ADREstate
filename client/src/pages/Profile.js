import React, { Component, Fragment } from 'react';
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

import NavBar from '../components/NavBar.js';
import Footer from '../components/Footer.js';

class Profile extends Component{
    constructor(props) {
        super(props);
        this.state = {
            education: "",
            skills: "",
            newSkill: "",
            projects: "",
            loggedIn: false,
        }   
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        //Hard Coded Information
        const education = [
            {school: "Bronx High School of Science", major: "Math and Computer Science Track", gpa: 4.0, timePeriod: "September 2016 - June 2020", notableCourses: "AP Computer Science, AP Calculus BC, AP Microeconomics"},
            {school: "University of California, Berkeley", major: "Computer Science + Statistics", gpa: 3.914, timePeriod: "September 2020 - May 2024", notableCourses: "CS 61A, CS 61B, XStat 2, English R1B"},
        ]

        const skills = [
            "R",
            "Python",
            "Microsoft Word, Excel, Powerpoint",
            "SQL",
            "Java",
            "HTML/CSS",
            "Javascript",
        ];
        const projects = [
            {title: "Automating International Classification of Disease (ICD) Coding", description: "Handle big datasets; Create helpful infographics; Use statistical algorithms to determine conclusions", timePeriod: "September 2016 - June 2020", position: "Data Scientist"},
            {title: "Data scientist", description: "Handle big datasets; Create helpful infographics; Use statistical algorithms to determine conclusions", timePeriod: "September 2016 - June 2020", position: "Data Scientist"},
            {title: "Data scientist", description: "Handle big datasets; Create helpful infographics; Use statistical algorithms to determine conclusions", timePeriod: "September 2016 - June 2020", position: "Data Scientist"},
            {title: "Data scientist", description: "Handle big datasets; Create helpful infographics; Use statistical algorithms to determine conclusions", timePeriod: "September 2016 - June 2020", position: "Data Scientist"},
            {title: "Data scientist", description: "Handle big datasets; Create helpful infographics; Use statistical algorithms to determine conclusions", timePeriod: "September 2016 - June 2020", position: "Data Scientist"},
        ];

        this.setState({
            education: education,
            skills: skills,
            projects: projects,
        });
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    onChangeSkill(e){
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit(event){
        event.preventDefault();
        let skills = this.state.skills;
        if(this.state.newSkill !== ""){
            skills.push(this.state.newSkill);
        }
        this.setState({
            skills: skills,
            newSkill: "",
        });
    }

    render(){
        let education = [];
        for(let i = 0; i < this.state.education.length; i++){
            education.push(
                <Card className="school">
                    <CardBody>    
                        <CardTitle tag = "h4">{this.state.education[i].school}</CardTitle>
                        <CardSubtitle>{this.state.education[i].timePeriod}</CardSubtitle>
                        <CardText>Major: {this.state.education[i].major}</CardText>
                        <CardText>GPA: {this.state.education[i].gpa}</CardText>
                        <CardText>Notable Courses: {this.state.education[i].notableCourses}</CardText>
                    </CardBody>
                </Card>
            );
        }
        let skills = [];
        const maxSkillsLength = 4;
        let numRows = Math.floor(this.state.skills.length/maxSkillsLength) + 1;
        for(let i = 0; i < numRows; i++){
            let row = [];
            for(let j = 0; j < maxSkillsLength; j++){
                if(i * maxSkillsLength + j === this.state.skills.length && this.state.loggedIn){
                    row.push(
                        <Col md="3">
                            <Card className = "skill">
                                <CardBody>
                                    <FormGroup>
                                        <Input type="text" name="newSkill" value={this.state.newSkill} onChange={this.onChange} placeholder="New Skill" />
                                        <Col className="registerSubmit">
                                            <Input className="registerSubmit mt-4" type="submit" value="Add" onClick={this.handleSubmit}></Input>
                                        </Col>
                                    </FormGroup>
                                </CardBody>
                            </Card>
                        </Col>
                    );
                    break;
                }else{
                    row.push(
                        <Col md="3">
                            <Card body outline color="white" className = "skill">
                                <CardBody>{this.state.skills[i * maxSkillsLength + j]}</CardBody>
                            </Card>
                        </Col>
                    );
                }
            }
            skills.push(
                <Fragment>
                    <Row>
                        {row}
                    </Row>
                    <br/>
                </Fragment>
            )
        }

        let projects = [];
        for(let i = 0; i < this.state.projects.length; i++){
            projects.push(
                <Row>
                    <Card style={{ borderRadius: 20 }} className = "projectCard">
                        <CardBody>
                            <CardTitle tag="h4"><strong>{this.state.projects[i].title}</strong></CardTitle>
                            <br/>
                            <CardSubtitle tag="h6">{this.state.projects[i].timePeriod}</CardSubtitle>
                            <br/>
                            <CardText>{this.state.projects[i].description}</CardText>
                        </CardBody>
                    </Card>
                </Row>
            )
        }

        return(
            <div className = "about">
                <NavBar auth = {true}/>
                <Container>
                    <h4 className = "aboutHeader">Education</h4>
                    <Row className = "education">
                        {education}
                    </Row>
                    <h4 className = "aboutHeader">Skills</h4>
                    <div className = "skills">
                        {skills}
                    </div>
                    <h4 className = "aboutHeader">Projects</h4>
                    <div className = "projects">
                        {projects}
                    </div>
                </Container>
                <Footer/>
            </div>
        );
    }
}

export default Profile;
