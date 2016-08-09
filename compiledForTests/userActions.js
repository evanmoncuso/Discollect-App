'use strict';

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var optimisticCheckUser = function optimisticCheckUser(_ref) {
  var zipcode = _ref.zipcode;
  var username = _ref.username;
  var id = _ref.id;
  return {
    type: 'LOGIN_VALID',
    zipcode: zipcode,
    username: username,
    id: id
  };
};

var userActions = {
  createUser: function createUser(username, password, email, zip) {
    return function (dispatch) {
      var url = 'http://localhost:3000/api/signup';
      var data = JSON.stringify({
        username: username,
        password: password,
        email: email,
        zipcode: zip
      });
      (0, _isomorphicFetch2.default)(url, {
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function (res) {
        return res.json();
      }).then(function (res) {
        console.log('createUserLogin: ', res);
        dispatch(optimisticCheckUser(res));
      }).catch(function (err) {
        if (err) {
          console.log(err);
        }
      });
    };
  },
  checkUserLogin: function checkUserLogin(username, password) {
    return function (dispatch) {
      var data = JSON.stringify({ username: username, password: password });
      var url = 'http://localhost:3000/api/login';
      (0, _isomorphicFetch2.default)(url, {
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function (res) {
        return res.json();
      }).then(function (response) {
        console.log('checkuserlogin:: ', response);
        dispatch(optimisticCheckUser(response));
      }).catch(function (err) {
        if (err) {
          console.log(err);
        }
      });
    };
  },
  logoutUserServer: function logoutUserServer() {
    var url = 'http://localhost:3000/api/logout';
    (0, _isomorphicFetch2.default)(url).then(function (response) {
      console.log('on Logout', response);
    }).catch(function (err) {
      if (err) {
        console.log(err);
      }
    });
  },
  logoutUserClient: function logoutUserClient() {
    return {
      type: 'LOGOUT_USER'
    };
  }
};

module.exports = userActions;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2FwcC9zY3JpcHRzL2FjdGlvbnMvdXNlckFjdGlvbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7O0FBRUEsSUFBTSxzQkFBc0IsU0FBdEIsbUJBQXNCO0FBQUEsTUFBRyxPQUFILFFBQUcsT0FBSDtBQUFBLE1BQVksUUFBWixRQUFZLFFBQVo7QUFBQSxNQUFzQixFQUF0QixRQUFzQixFQUF0QjtBQUFBLFNBQzFCO0FBQ0UsVUFBTSxhQURSO0FBRUUsb0JBRkY7QUFHRSxzQkFIRjtBQUlFO0FBSkYsR0FEMEI7QUFBQSxDQUE1Qjs7QUFTQSxJQUFNLGNBQWM7QUFDbEIsY0FBWSxvQkFBQyxRQUFELEVBQVcsUUFBWCxFQUFxQixLQUFyQixFQUE0QixHQUE1QjtBQUFBLFdBQ1YsVUFBQyxRQUFELEVBQWM7QUFDWixVQUFNLE1BQU0sa0NBQVo7QUFDQSxVQUFNLE9BQU8sS0FBSyxTQUFMLENBQWU7QUFDMUIsMEJBRDBCO0FBRTFCLDBCQUYwQjtBQUcxQixvQkFIMEI7QUFJMUIsaUJBQVM7QUFKaUIsT0FBZixDQUFiO0FBTUEscUNBQU0sR0FBTixFQUFXO0FBQ1QsZ0JBQVEsTUFEQztBQUVULGNBQU0sSUFGRztBQUdULGlCQUFTO0FBQ1AsMEJBQWdCO0FBRFQ7QUFIQSxPQUFYLEVBT0MsSUFQRCxDQU9NLFVBQUMsR0FBRDtBQUFBLGVBQVMsSUFBSSxJQUFKLEVBQVQ7QUFBQSxPQVBOLEVBUUMsSUFSRCxDQVFNLFVBQUMsR0FBRCxFQUFTO0FBQ2IsZ0JBQVEsR0FBUixDQUFZLG1CQUFaLEVBQWlDLEdBQWpDO0FBQ0EsaUJBQVMsb0JBQW9CLEdBQXBCLENBQVQ7QUFDRCxPQVhELEVBWUMsS0FaRCxDQVlPLFVBQUMsR0FBRCxFQUFTO0FBQ2QsWUFBSSxHQUFKLEVBQVM7QUFDUCxrQkFBUSxHQUFSLENBQVksR0FBWjtBQUNEO0FBQ0YsT0FoQkQ7QUFpQkQsS0ExQlM7QUFBQSxHQURNO0FBNkJsQixrQkFBZ0Isd0JBQUMsUUFBRCxFQUFXLFFBQVg7QUFBQSxXQUNkLFVBQUMsUUFBRCxFQUFjO0FBQ1osVUFBTSxPQUFPLEtBQUssU0FBTCxDQUFlLEVBQUUsa0JBQUYsRUFBWSxrQkFBWixFQUFmLENBQWI7QUFDQSxVQUFNLE1BQU0saUNBQVo7QUFDQSxxQ0FBTSxHQUFOLEVBQVc7QUFDVCxnQkFBUSxNQURDO0FBRVQsY0FBTSxJQUZHO0FBR1QsaUJBQVM7QUFDUCwwQkFBZ0I7QUFEVDtBQUhBLE9BQVgsRUFPQyxJQVBELENBT00sVUFBQyxHQUFEO0FBQUEsZUFBUyxJQUFJLElBQUosRUFBVDtBQUFBLE9BUE4sRUFRQyxJQVJELENBUU0sVUFBQyxRQUFELEVBQWM7QUFDbEIsZ0JBQVEsR0FBUixDQUFZLG1CQUFaLEVBQWlDLFFBQWpDO0FBQ0EsaUJBQVMsb0JBQW9CLFFBQXBCLENBQVQ7QUFDRCxPQVhELEVBWUMsS0FaRCxDQVlPLFVBQUMsR0FBRCxFQUFTO0FBQ2QsWUFBSSxHQUFKLEVBQVM7QUFDUCxrQkFBUSxHQUFSLENBQVksR0FBWjtBQUNEO0FBQ0YsT0FoQkQ7QUFpQkQsS0FyQmE7QUFBQSxHQTdCRTtBQW9EbEIsb0JBQWtCLDRCQUFNO0FBQ3RCLFFBQU0sTUFBTSxrQ0FBWjtBQUNBLG1DQUFNLEdBQU4sRUFDQyxJQURELENBQ00sVUFBQyxRQUFELEVBQWM7QUFDbEIsY0FBUSxHQUFSLENBQVksV0FBWixFQUF5QixRQUF6QjtBQUNELEtBSEQsRUFJQyxLQUpELENBSU8sVUFBQyxHQUFELEVBQVM7QUFDZCxVQUFJLEdBQUosRUFBUztBQUNQLGdCQUFRLEdBQVIsQ0FBWSxHQUFaO0FBQ0Q7QUFDRixLQVJEO0FBU0QsR0EvRGlCO0FBZ0VsQixvQkFBa0I7QUFBQSxXQUNoQjtBQUNFLFlBQU07QUFEUixLQURnQjtBQUFBO0FBaEVBLENBQXBCOztBQXdFQSxPQUFPLE9BQVAsR0FBaUIsV0FBakIiLCJmaWxlIjoidXNlckFjdGlvbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZmV0Y2ggZnJvbSAnaXNvbW9ycGhpYy1mZXRjaCc7XG5cbmNvbnN0IG9wdGltaXN0aWNDaGVja1VzZXIgPSAoeyB6aXBjb2RlLCB1c2VybmFtZSwgaWQgfSkgPT4gKFxuICB7XG4gICAgdHlwZTogJ0xPR0lOX1ZBTElEJyxcbiAgICB6aXBjb2RlLFxuICAgIHVzZXJuYW1lLFxuICAgIGlkLFxuICB9XG4pO1xuXG5jb25zdCB1c2VyQWN0aW9ucyA9IHtcbiAgY3JlYXRlVXNlcjogKHVzZXJuYW1lLCBwYXNzd29yZCwgZW1haWwsIHppcCkgPT4gKFxuICAgIChkaXNwYXRjaCkgPT4ge1xuICAgICAgY29uc3QgdXJsID0gJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9hcGkvc2lnbnVwJztcbiAgICAgIGNvbnN0IGRhdGEgPSBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIHVzZXJuYW1lLFxuICAgICAgICBwYXNzd29yZCxcbiAgICAgICAgZW1haWwsXG4gICAgICAgIHppcGNvZGU6IHppcCxcbiAgICAgIH0pO1xuICAgICAgZmV0Y2godXJsLCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBib2R5OiBkYXRhLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgfSxcbiAgICAgIH0pXG4gICAgICAudGhlbigocmVzKSA9PiByZXMuanNvbigpKVxuICAgICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnY3JlYXRlVXNlckxvZ2luOiAnLCByZXMpO1xuICAgICAgICBkaXNwYXRjaChvcHRpbWlzdGljQ2hlY2tVc2VyKHJlcykpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICksXG4gIGNoZWNrVXNlckxvZ2luOiAodXNlcm5hbWUsIHBhc3N3b3JkKSA9PiAoXG4gICAgKGRpc3BhdGNoKSA9PiB7XG4gICAgICBjb25zdCBkYXRhID0gSlNPTi5zdHJpbmdpZnkoeyB1c2VybmFtZSwgcGFzc3dvcmQgfSk7XG4gICAgICBjb25zdCB1cmwgPSAnaHR0cDovL2xvY2FsaG9zdDozMDAwL2FwaS9sb2dpbic7XG4gICAgICBmZXRjaCh1cmwsIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGJvZHk6IGRhdGEsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICB9LFxuICAgICAgfSlcbiAgICAgIC50aGVuKChyZXMpID0+IHJlcy5qc29uKCkpXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ2NoZWNrdXNlcmxvZ2luOjogJywgcmVzcG9uc2UpO1xuICAgICAgICBkaXNwYXRjaChvcHRpbWlzdGljQ2hlY2tVc2VyKHJlc3BvbnNlKSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgKSxcbiAgbG9nb3V0VXNlclNlcnZlcjogKCkgPT4ge1xuICAgIGNvbnN0IHVybCA9ICdodHRwOi8vbG9jYWxob3N0OjMwMDAvYXBpL2xvZ291dCc7XG4gICAgZmV0Y2godXJsKVxuICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ29uIExvZ291dCcsIHJlc3BvbnNlKTtcbiAgICB9KVxuICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICB9XG4gICAgfSk7XG4gIH0sXG4gIGxvZ291dFVzZXJDbGllbnQ6ICgpID0+IChcbiAgICB7XG4gICAgICB0eXBlOiAnTE9HT1VUX1VTRVInLFxuICAgIH1cbiAgKVxufTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IHVzZXJBY3Rpb25zO1xuIl19