'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var optimisticSetItems = function optimisticSetItems(items) {
  return {
    type: 'GET_INITIAL_ITEMS',
    items: items };
};

var itemActions = {
  getLatestListings: function getLatestListings() {
    return function (dispatch) {
      var url = 'http://localhost:3000/api/getAllListings';
      (0, _isomorphicFetch2.default)(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function (res) {
        return res.json();
      }).then(function (response) {
        console.log(response);
        dispatch(optimisticSetItems(response));
      }).catch(function (err) {
        if (err) {
          console.log(err);
        }
      });
    };
  },
  postNewListing: function postNewListing(listingData) {
    return function (dispatch) {
      var url = 'http://localhost:3000/api/createNewListing';
      (0, _isomorphicFetch2.default)(url, {
        method: 'POST',
        body: JSON.stringify(listingData),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function (res) {
        dispatch(itemActions.getLatestListings());
        console.log(res, dispatch);
        _reactRouter.browserHistory.push('/');
      }).catch(function (err) {
        console.log(err);
      });
    };
  },
  searchItem: function searchItem(query) {
    return {
      type: 'SUBMIT_SEARCH',
      keywords: query.keywords,
      zip: query.zip,
      category: query.category

    };
  },
  getUsersListings: function getUsersListings(userID) {
    return (
      // get listings associated with user at userID
      function (dispatch) {
        var url = 'http://localhost:3000/api/getAllListings';
        (0, _isomorphicFetch2.default)(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(function (res) {
          return res.json();
        }).then(function (response) {
          var listingsData = response.filter(function (listing) {
            return listing.giverId === userID;
          });
          dispatch({
            type: 'GET_USERS_LISTINGS',
            userListings: listingsData
          });
        }).catch(function (err) {
          if (err) {
            console.log(err);
          }
        });
      }
    );
  }
};

exports.default = itemActions;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2FwcC9zY3JpcHRzL2FjdGlvbnMvaXRlbUFjdGlvbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUdBLElBQU0scUJBQXFCLFNBQXJCLGtCQUFxQixDQUFDLEtBQUQ7QUFBQSxTQUN6QjtBQUNFLFVBQU0sbUJBRFI7QUFFRSxnQkFGRixFQUR5QjtBQUFBLENBQTNCOztBQU9BLElBQU0sY0FBYztBQUNsQixxQkFBbUI7QUFBQSxXQUNqQixVQUFDLFFBQUQsRUFBYztBQUNaLFVBQU0sTUFBTSwwQ0FBWjtBQUNBLHFDQUFNLEdBQU4sRUFBVztBQUNULGdCQUFRLEtBREM7QUFFVCxpQkFBUztBQUNQLDBCQUFnQjtBQURUO0FBRkEsT0FBWCxFQU1DLElBTkQsQ0FNTSxVQUFDLEdBQUQ7QUFBQSxlQUFTLElBQUksSUFBSixFQUFUO0FBQUEsT0FOTixFQU9DLElBUEQsQ0FPTSxVQUFDLFFBQUQsRUFBYztBQUNsQixnQkFBUSxHQUFSLENBQVksUUFBWjtBQUNBLGlCQUFTLG1CQUFtQixRQUFuQixDQUFUO0FBQ0QsT0FWRCxFQVdDLEtBWEQsQ0FXTyxVQUFDLEdBQUQsRUFBUztBQUNkLFlBQUksR0FBSixFQUFTO0FBQ1Asa0JBQVEsR0FBUixDQUFZLEdBQVo7QUFDRDtBQUNGLE9BZkQ7QUFnQkQsS0FuQmdCO0FBQUEsR0FERDtBQXNCbEIsa0JBQWdCLHdCQUFDLFdBQUQ7QUFBQSxXQUNkLFVBQUMsUUFBRCxFQUFjO0FBQ1osVUFBTSxNQUFNLDRDQUFaO0FBQ0EscUNBQU0sR0FBTixFQUFXO0FBQ1QsZ0JBQVEsTUFEQztBQUVULGNBQU0sS0FBSyxTQUFMLENBQWUsV0FBZixDQUZHO0FBR1QsaUJBQVM7QUFDUCwwQkFBZ0I7QUFEVDtBQUhBLE9BQVgsRUFPQyxJQVBELENBT00sZUFBTztBQUNYLGlCQUFTLFlBQVksaUJBQVosRUFBVDtBQUNBLGdCQUFRLEdBQVIsQ0FBWSxHQUFaLEVBQWlCLFFBQWpCO0FBQ0Esb0NBQWUsSUFBZixDQUFvQixHQUFwQjtBQUNELE9BWEQsRUFZQyxLQVpELENBWU8sZUFBTztBQUNaLGdCQUFRLEdBQVIsQ0FBWSxHQUFaO0FBQ0QsT0FkRDtBQWVELEtBbEJhO0FBQUEsR0F0QkU7QUEwQ2xCLGNBQVksb0JBQUMsS0FBRDtBQUFBLFdBQ1Y7QUFDRSxZQUFNLGVBRFI7QUFFRSxnQkFBVSxNQUFNLFFBRmxCO0FBR0UsV0FBSyxNQUFNLEdBSGI7QUFJRSxnQkFBVSxNQUFNOztBQUpsQixLQURVO0FBQUEsR0ExQ007QUFtRGxCLG9CQUFrQiwwQkFBQyxNQUFEO0FBQUE7QUFDaEI7QUFDQSxnQkFBQyxRQUFELEVBQWM7QUFDWixZQUFNLE1BQU0sMENBQVo7QUFDQSx1Q0FBTSxHQUFOLEVBQVc7QUFDVCxrQkFBUSxLQURDO0FBRVQsbUJBQVM7QUFDUCw0QkFBZ0I7QUFEVDtBQUZBLFNBQVgsRUFNQyxJQU5ELENBTU0sVUFBQyxHQUFEO0FBQUEsaUJBQVMsSUFBSSxJQUFKLEVBQVQ7QUFBQSxTQU5OLEVBT0MsSUFQRCxDQU9NLFVBQUMsUUFBRCxFQUFjO0FBQ2xCLGNBQUksZUFBZSxTQUFTLE1BQVQsQ0FBZ0IsVUFBQyxPQUFELEVBQWE7QUFDOUMsbUJBQU8sUUFBUSxPQUFSLEtBQW9CLE1BQTNCO0FBQ0QsV0FGa0IsQ0FBbkI7QUFHQSxtQkFBUztBQUNQLGtCQUFNLG9CQURDO0FBRVAsMEJBQWM7QUFGUCxXQUFUO0FBSUQsU0FmRCxFQWdCQyxLQWhCRCxDQWdCTyxVQUFDLEdBQUQsRUFBUztBQUNkLGNBQUksR0FBSixFQUFTO0FBQ1Asb0JBQVEsR0FBUixDQUFZLEdBQVo7QUFDRDtBQUNGLFNBcEJEO0FBcUJEO0FBekJlO0FBQUE7QUFuREEsQ0FBcEI7O2tCQWdGZSxXIiwiZmlsZSI6Iml0ZW1BY3Rpb25zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZldGNoIGZyb20gJ2lzb21vcnBoaWMtZmV0Y2gnO1xyXG5pbXBvcnQgeyBicm93c2VySGlzdG9yeSB9IGZyb20gJ3JlYWN0LXJvdXRlcic7XHJcblxyXG5cclxuY29uc3Qgb3B0aW1pc3RpY1NldEl0ZW1zID0gKGl0ZW1zKSA9PiAoXHJcbiAge1xyXG4gICAgdHlwZTogJ0dFVF9JTklUSUFMX0lURU1TJyxcclxuICAgIGl0ZW1zLCAvLyBwcm9wZXJ0eSBzaG9ydGhhbmRcclxuICB9XHJcbik7XHJcblxyXG5jb25zdCBpdGVtQWN0aW9ucyA9IHtcclxuICBnZXRMYXRlc3RMaXN0aW5nczogKCkgPT4gKFxyXG4gICAgKGRpc3BhdGNoKSA9PiB7XHJcbiAgICAgIGNvbnN0IHVybCA9ICdodHRwOi8vbG9jYWxob3N0OjMwMDAvYXBpL2dldEFsbExpc3RpbmdzJztcclxuICAgICAgZmV0Y2godXJsLCB7XHJcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pXHJcbiAgICAgIC50aGVuKChyZXMpID0+IHJlcy5qc29uKCkpXHJcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcclxuICAgICAgICBkaXNwYXRjaChvcHRpbWlzdGljU2V0SXRlbXMocmVzcG9uc2UpKTtcclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgICBpZiAoZXJyKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgKSxcclxuICBwb3N0TmV3TGlzdGluZzogKGxpc3RpbmdEYXRhKSA9PiAoXHJcbiAgICAoZGlzcGF0Y2gpID0+IHtcclxuICAgICAgY29uc3QgdXJsID0gJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9hcGkvY3JlYXRlTmV3TGlzdGluZyc7XHJcbiAgICAgIGZldGNoKHVybCwge1xyXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGxpc3RpbmdEYXRhKSxcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pXHJcbiAgICAgIC50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgZGlzcGF0Y2goaXRlbUFjdGlvbnMuZ2V0TGF0ZXN0TGlzdGluZ3MoKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2cocmVzLCBkaXNwYXRjaCk7XHJcbiAgICAgICAgYnJvd3Nlckhpc3RvcnkucHVzaCgnLycpO1xyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goZXJyID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICApLFxyXG4gIHNlYXJjaEl0ZW06IChxdWVyeSkgPT4gKFxyXG4gICAge1xyXG4gICAgICB0eXBlOiAnU1VCTUlUX1NFQVJDSCcsXHJcbiAgICAgIGtleXdvcmRzOiBxdWVyeS5rZXl3b3JkcyxcclxuICAgICAgemlwOiBxdWVyeS56aXAsXHJcbiAgICAgIGNhdGVnb3J5OiBxdWVyeS5jYXRlZ29yeSxcclxuXHJcbiAgICB9XHJcbiAgKSxcclxuICBnZXRVc2Vyc0xpc3RpbmdzOiAodXNlcklEKSA9PiAoXHJcbiAgICAvLyBnZXQgbGlzdGluZ3MgYXNzb2NpYXRlZCB3aXRoIHVzZXIgYXQgdXNlcklEXHJcbiAgICAoZGlzcGF0Y2gpID0+IHtcclxuICAgICAgY29uc3QgdXJsID0gJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9hcGkvZ2V0QWxsTGlzdGluZ3MnO1xyXG4gICAgICBmZXRjaCh1cmwsIHtcclxuICAgICAgICBtZXRob2Q6ICdHRVQnLFxyXG4gICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgfSxcclxuICAgICAgfSlcclxuICAgICAgLnRoZW4oKHJlcykgPT4gcmVzLmpzb24oKSlcclxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgbGV0IGxpc3RpbmdzRGF0YSA9IHJlc3BvbnNlLmZpbHRlcigobGlzdGluZykgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIGxpc3RpbmcuZ2l2ZXJJZCA9PT0gdXNlcklEO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGRpc3BhdGNoKHtcclxuICAgICAgICAgIHR5cGU6ICdHRVRfVVNFUlNfTElTVElOR1MnLFxyXG4gICAgICAgICAgdXNlckxpc3RpbmdzOiBsaXN0aW5nc0RhdGEsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgICAgaWYgKGVycikge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICksXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBpdGVtQWN0aW9ucztcclxuIl19