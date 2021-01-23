import React, { Component} from "react";
import{
    Row,
    Col,
    Input
} from "reactstrap";
import { connect } from 'react-redux';

import { registerProduct } from '../actions/productActions';
import { clearErrors } from "../actions/errorActions";

class ProductRegistration extends Component{
  constructor(props){
    super(props);
    this.state = {
      name: "",
      description: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  handleSubmit(event){
    event.preventDefault();
    const newProduct = {
      name: this.state.name,
      description: this.state.description,
    };
    console.log("Checkpoint Handle Submit");
    var request = this.props.registerProduct(newProduct);
    
    console.log("request", request); 
    
    request.then(res => {
      console.log('registered,', res);
      if (!res) {
        throw new Error("Server Error");
      }
      // const productId = res.product._id;
    }).catch(err => {
      console.log("Error Handle Submit Catch");
      console.log(err);
    }).finally(() => {
      this.setState({
        name: "",
        description: ""
      });
    });
    console.log("End of Handle Submit");
  }
  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }
  render(){
    return(
      <div>
        <Row>
          <Input type="text" name="name" value={this.state.name} onChange={this.onChange} placeholder="Name"/>
        </Row>
        <Row>
          <Input type="text" name="description" value={this.state.description} onChange={this.onChange} placeholder="Description"/>
        </Row>
        <Row className="mt-4">
            <Col md={{size: 6, offset: 3}} className="registerSubmit">
              <Input type="submit" value="Submit" onClick={this.handleSubmit}></Input>
            </Col>
          </Row>
      </div>
    )
  }
}

const mapStateToProps =  state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});
  
export default connect(mapStateToProps, { registerProduct, clearErrors })(ProductRegistration);
  