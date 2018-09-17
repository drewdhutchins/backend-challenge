var scrapeRoutes = require( './scrape_routes' );

module.exports = function ( app ) {
	/*
		include all of our route files here

		always pass app as a parameter to the routes
	*/
	scrapeRoutes( app );
};