import React from 'react';

const Advert = ({ zipcode }) => (
  <div className='advertWrap'>
    <div className="advertContainer">
      <img
        className="advertimg" src="./truck1.jpg"
        alt="advertisement"
        onClick={() => {
          window.open("https://www.google.com/#q=u+haul+near+" + zipcode);
        }}
      />
      <img
        className="advertimg" src="./truck2.jpg"
        alt="advertisement"
        onClick={() => {
        window.open("https://www.budgettruck.com/locations/ca/" + zipcode);
        }}
      />
    </div>
  </div>
);

Advert.propTypes = {
  zipcode: React.PropTypes.number,
};

export default Advert;
