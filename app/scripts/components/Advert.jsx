import React from 'react';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';


let Advert = ({zipcode}) => {
console.log('hello zipcode: ', zipcode)
  return (
        <div>
          <div className='adverttext'>
            Need help collecting? 
            </div>
            <div>
              <img className='advertimg' src='http://bigboystoysrentals.com/wp-content/uploads/2014/04/u-haul-10foot.jpg' onClick={() => {
              window.open('https://www.google.com/#q=u+haul+near+' + zipcode);
              }}/>
              <img className='advertimg' src='http://bigboystoysrentals.com/wp-content/uploads/2014/04/u-haul-10foot.jpg' onClick={() => {
              window.open('https://www.budgettruck.com/locations/ca/' + zipcode);
              }}/>
            </div>
        </div>
  );
};



export default Advert;

