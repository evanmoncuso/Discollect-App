const userActions = {
  sendUserToServer: (username, password, email, zip) => {
    let url = 'http://localhost:3000/api/signup'
    let data = JSON.stringify({
      username: username,
      password: password,
      email: email,
      zip: zip,
    });
    console.log(data);
    fetch(url, {
    	method: 'post',
    	body: data,
    })
    .then((res) => {console.log('the response from fetch', res)})
    .catch((err) => {
      if(err) {
        console.log(err);
      }
    })
  }
}

module.exports = userActions;
