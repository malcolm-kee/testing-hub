var request = require('request');
var apiOptions = {
	server: "http://localhost:5000"
};
if (process.env.NODE_ENV === 'production') {
	apiOptions.server = 'https://vast-journey-10806.herokuapp.com';
}

var filterListByCategories = function(list, category) {
	return list.filter(function(value) {
		return value.categories.includes(category);
	});
};

var renderHomePage = function(req, res, responseBody) {
	var popular_features_list = filterListByCategories(responseBody, "popular"),
		preprod_features_list = filterListByCategories(responseBody, "preprod"),
		staging_features_list = filterListByCategories(responseBody, "staging");

	res.render('index', 
		{
			title: 'Brotherhood of DSO',
			popular_offerings: popular_features_list,
			preprod_offerings: preprod_features_list,
			staging_offerings: staging_features_list
		}
	);
};

var renderAdminPage = function(req, res, responseBody) {
	res.render('admin',
	{
		title: 'Administration',
		offerings: responseBody
	});
};

/* Get home page */
module.exports.index = function(req, res) {
	var path = '/api/feature',
		requestOptions = {
			url: apiOptions.server + path,
			method: "GET",
			json: {}
		};
	request(
		requestOptions,
		function(err, response, body) {
			if (err) {
				console.log(err);
				return;
			}
			renderHomePage(req, res, body);
		});
};

module.exports.admin = function(req, res) {
	var path = '/api/feature',
		requestOptions = {
			url: apiOptions.server + path,
			method: "GET",
			json: {}
		};
	request(
		requestOptions,
		function(err, response, body) {
			if (err) {
				console.log(err);
				return;
			}
			renderAdminPage(req, res, body);
		});	
};