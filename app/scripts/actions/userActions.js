import fetch from 'isomorphic-fetch'

const userActions = {
  sendUserToServer: (username, password, email, zip) => {
    let url = 'http://localhost:3000/api/signup'
    let data = JSON.stringify({
      username: username,
      password: password,
      email: email,
      zipcode: zip,
    });
    fetch(url, {
    	method: 'POST',
    	body: data,
      headers: new Headers({
		      'Content-Type': 'application/json'
	       })
    })
    .then((res) => {
      console.log('the response from fetch', res)
    })
    .catch((err) => {
      if(err) {
        console.log(err);
      }
    })
  },
  checkUserLogin: (username, password) => {
    return (dispatch) => {
      let data = JSON.stringify({username: username, password: password});
      let url = 'http://localhost:3000/api/login';
      fetch(url, {
      	method: 'POST',
      	body: data,
        headers: new Headers({
  		      'Content-Type': 'application/json'
  	       })
      })
      .then((res) => res.json())
      .then((jsonRes) => {
        dispatch(optomisticCheckUser(jsonRes.valid, jsonRes.username));
      })
      .catch((err) => {
        if(err) {
          console.log(err);
        }
      })
    }
  }
};

const optomisticCheckUser = (valid, username) => {
  return {
    type: 'LOGIN_VALID',
    valid: valid,
    username: username
  }
}

module.exports = userActions;
