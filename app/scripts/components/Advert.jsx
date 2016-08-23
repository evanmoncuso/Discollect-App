import React from 'react';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';


let Advert = ({zip}) => {
  var page = 'https://www.google.com/#q=u+haul+near+' + this.props.zip;
  console.log('page: ',page)
  return (
        <div className='advert'>
          <div className='adverttext'>
            Need help collecting? 
            </div>
            <div onClick={() => {
                window.open(page);
              }}>
              <img className='advertimg' src='http://bigboystoysrentals.com/wp-content/uploads/2014/04/u-haul-10foot.jpg' />
            </div>
        </div>
  );
};


const mapStateToProps = (state) => {
 return  {
    zip: state.users.zip,
  }
}


export default connect(mapStateToProps, null)(Advert);

