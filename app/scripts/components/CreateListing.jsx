import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from './NavBar';
// import { Link } from 'react-router';

class CreateListing extends React.Component {
  constructor (props) {
    super(props);
  }
  postListing (event) {
    event.preventDefault();
    let loginData = {
      title: ReactDOM.findDOMNode(this.refs.title).value,
      location: ReactDOM.findDOMNode(this.refs.location).value,
      zipcode: ReactDOM.findDOMNode(this.refs.zipcode).value,
      description: ReactDOM.findDOMNode(this.refs.body).value,
      email: ReactDOM.findDOMNode(this.refs.email).value,
      username: 'anonymous'//this.props.username
    }
    console.log(loginData);
    // this.props.route.socket.emit('user-login', loginData);
  }
  render() {
    return(
      <div>
        <NavBar />
        <div>
          <h1>Create a Listing</h1>
          <form>
            <fieldset>
              <legend>New Listing</legend>
              Listing Title:<br/>
              <input ref="title" type="text" /><br/>
              Location:<br/>
              <input ref="location" type="text" /><br/>
              Zip Code:<br/>
              <input ref="zipcode" type="text" /><br/><br/>
              Listing Body:
              <textarea ref="description"></textarea><br/><br/>
              <legend>Contact Info</legend>
              Email Address:
              <input ref="email" type="email"/>
              <input onClick={(event) => this.postListing(event)} type="submit" value="Submit" />
            </fieldset>
          </form>
        </div>
      </div>
    );
  }
}

export default CreateListing;
