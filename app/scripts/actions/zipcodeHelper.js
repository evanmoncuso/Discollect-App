zipcodeArrayBuilder = (zipcode) => {
  const api = 'ZuYPOXpKUE8RDdLyX8t3MuU3bDjg70N6uMWjKl4E0dwDqicoqFrdamhl0AC7Bqe6';

  const request = 'https://www.zipcodeapi.com/rest/' + api + '/radius.json/' + zipcode + '/50/miles';
    fetch(request)
    .then((response) => response.json())
    .then((zipcodes) => {
      console.log(zipcodes);
      // also get this into the state
    })
    .catch((err) => {
      if (err) {
        console.log(err);
      }
    });
  };
