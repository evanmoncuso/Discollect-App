zipcodeArrayBuilder = (zipcode) => {
  const api = 'ZuYPOXpKUE8RDdLyX8t3MuU3bDjg70N6uMWjKl4E0dwDqicoqFrdamhl0AC7Bqe6';

  const request = 'https://www.zipcodeapi.com/rest/' + api + '/radius.json/' + zipcode + '/50/miles';
    fetch(request)
    .then((response) => {
      if (response.status >= 400) {
        throw new Error('Bad zipcodes response');
      }
      return response.json();
    })
    .then(function(zipcodes) {
      this.setState({
        zipcodeArray: zipcodes
      })
      })
  };
