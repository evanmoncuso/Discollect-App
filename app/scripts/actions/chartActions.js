import fetch from 'isomorphic-fetch';
import { browserHistory } from 'react-router';

// const baseUrl = 'http://ec2-54-186-167-115.us-west-2.compute.amazonaws.com';
const baseUrl = 'http://discollect-dev-portal.herokuapp.com';

const optimisticSetChart = ({ data, labels, label }) => (
  {
    type: 'GET_CHART',
    data,
    labels,
    label,
  }
);


const chartActions = {
  getChartData: (criteria) => (
    // So we'll be sending it to the url for the service + /api + 
    ///APIKEY +/category + ? + cat=CAT1NAME& + CAT2NAME& + etc + past=TIMEFRAME
    (dispatch) => {
    console.log('into chartActions', criteria);
    let cat1 = criteria.cat1;
    let cat2 = criteria.cat2;
    let cat3 = criteria.cat3;
    let cat4 = criteria.cat4;
    let cat5 = criteria.cat5;
    let cat6 = criteria.cat6;
    let timeFrame = criteria.dateRange;
      const url = baseUrl + '/api/discollect/category?cat=' + cat1 + '&cat=' + cat2 + '&cat=' + cat3 + '&cat=' + cat4 + '&cat=' + cat5 + '&cat=' + cat6+ '&past=' + timeFrame;
      console.log('===========>',url)
      fetch(url, {
        credentials: 'same-origin',
      })
      .then((res) => res.json())
      .then((response) => {
        console.log('------------setting chart with: ', response)
        dispatch(optimisticSetChart(response));
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
    }),
}


export default chartActions;