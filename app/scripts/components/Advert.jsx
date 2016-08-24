import React from 'react';

const Advert = ({ zipcode }) => (
  <div>
    <div className="adverttext">
      Need help collecting?
    </div>
    <div>
      <img
        className="advertimg" src="http://bigboystoysrentals.com/wp-content/uploads/2014/04/u-haul-10foot.jpg"
        alt="advertisement"
        onClick={() => {
          window.open("https://www.google.com/#q=u+haul+near+" + zipcode);
        }}
      />
      <img
        className="advertimg" src="http://bigboystoysrentals.com/wp-content/uploads/2014/04/u-haul-10foot.jpg"
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
