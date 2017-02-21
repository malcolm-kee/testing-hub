var request = require('request');
var apiOptions = {
	server: "http://localhost:3000"
};
if (process.env.NODE_ENV === 'production') {
	apiOptions.server = 'vast-journey-10806.herokuapp.com';
}

var filterListByCategories = function(list, category) {
	return list.filter(function(value) {
		return value.categories.includes(category);
	});
};

var renderHomepage = function(req, res, responseBody) {
	console.log("=============responseBody================");
	console.log(responseBody);
	console.assert(Array.isArray(responseBody), "responseBody is not an array");
	var popular_features_list = filterListByCategories(responseBody, "popular"),
		preprod_features_list = filterListByCategories(responseBody, "preprod"),
		staging_features_list = filterListByCategories(responseBody, "staging");

	res.render('index', 
		{
			title: 'Brotherhood of DSO',
			upcoming_items: [
				{
					name: 'Links stored and retrieved from DB'
				},
				{
					name: 'Authentication for access with login'
				}
			],
			call_to_action: {
				description: 'Why don\'t you tell me your thought?',
				name: 'Email Me',
				link: 'mailto:malcolm.keeweesiong@gmail.com'
			},
			popular_offerings: popular_features_list,
			preprod_offerings: preprod_features_list,
			staging_offerings: staging_features_list
		}
	);
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
			renderHomepage(req, res, body);
		});
};