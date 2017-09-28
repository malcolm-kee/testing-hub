const request = require('request');

const apiOptions = {
  server: 'http://localhost:5000'
};
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = 'https://vast-journey-10806.herokuapp.com';
}

const filterListByCategories = (list, category) => list.filter(value => value.categories.includes(category));

const renderHomePage = (req, res, responseBody) => {
  res.render('index', {
    title: 'Brotherhood of DSO',
    popular_offerings: filterListByCategories(responseBody, 'popular'),
    preprod_offerings: filterListByCategories(responseBody, 'preprod'),
    staging_offerings: filterListByCategories(responseBody, 'staging')
  });
};

const renderAdminPage = (req, res, responseBody) => {
  res.render('admin', {
    title: 'Administration',
    offerings: responseBody
  });
};

/* Get home page */
module.exports.index = (req, res) => {
  const path = '/api/feature';
  const requestOptions = {
    url: apiOptions.server + path,
    method: 'GET',
    json: {}
  };

  request(requestOptions, (err, response, body) => {
    if (err) {
      return;
    }
    renderHomePage(req, res, body);
  });
};

module.exports.admin = (req, res) => {
  const path = '/api/feature';
  const requestOptions = {
    url: apiOptions.server + path,
    method: 'GET',
    json: {}
  };

  request(requestOptions, (err, response, body) => {
    if (err) {
      return;
    }
    renderAdminPage(req, res, body);
  });
};
