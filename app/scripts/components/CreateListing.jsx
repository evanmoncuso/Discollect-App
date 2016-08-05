import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from './NavBar.jsx';

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
      description: ReactDOM.findDOMNode(this.refs.description).value,
      category: ReactDOM.findDOMNode(this.refs.categories).value,
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
        <div className="main_container">
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
              Categories:<br/>
              <select ref="categories" >
                <option value="all-categories">All Categories</option>
                <option value="appliances">Appliances</option>
                <option value="mobile-apps">Apps &amp; Games</option>
                <option value="arts-crafts">Arts, Crafts &amp; Sewing</option>
                <option value="automotive">Automotive</option>
                <option value="baby-products">Baby</option>
                <option value="beauty">Beauty &amp; Personal Care</option>
                <option value="books">Books</option>
                <option value="popular">CDs &amp; Vinyl</option>
                <option value="mobile">Cell Phones &amp; Accessories</option>
                <option value="fashion">Clothing, Shoes &amp; Jewelry</option>
                <option value="fashion-womens">&nbsp;&nbsp;&nbsp;Women</option>
                <option value="fashion-mens">&nbsp;&nbsp;&nbsp;Men</option>
                <option value="fashion-girls">&nbsp;&nbsp;&nbsp;Girls</option>
                <option value="fashion-boys">&nbsp;&nbsp;&nbsp;Boys</option>
                <option value="fashion-baby">&nbsp;&nbsp;&nbsp;Baby</option>
                <option value="collectibles">Collectibles &amp; Fine Art</option>
                <option value="computers">Computers</option>
                <option value="digital-music">Digital Music</option>
                <option value="electronics">Electronics</option>
                <option value="grocery">Grocery &amp; Gourmet Food</option>
                <option value="handmade">Handmade</option>
                <option value="hpc">Health, Household &amp; Baby Care</option>
                <option value="local-services">Home &amp; Business Services</option>
                <option value="garden">Home &amp; Kitchen</option>
                <option value="industrial">Industrial &amp; Scientific</option>
                <option value="digital-text">Kindle Store</option>
                <option value="fashion-luggage">Luggage &amp; Travel Gear</option>
                <option value="luxury-beauty">Luxury Beauty</option>
                <option value="magazines">Magazine Subscriptions</option>
                <option value="movies-tv">Movies &amp; TV</option>
                <option value="musical-instruments">Musical Instruments</option>
                <option value="office-products">Office Products</option>
                <option value="lawngarden">Patio, Lawn &amp; Garden</option>
                <option value="pets">Pet Supplies</option>
                <option value="pantry">Prime Pantry</option>
                <option value="software">Software</option>
                <option value="sporting">Sports &amp; Outdoors</option>
                <option value="tools">Tools &amp; Home Improvement</option>
                <option value="toys-and-games">Toys &amp; Games</option>
                <option value="videogames">Video Games</option>
              </select><br/>
              Description:<br/>
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


