var cors = require( 'cors' );
var queue = require( '../lib/queue/queue' );
var scraperIG = require( '../lib/scrapers/scraper_instagram' );

module.exports = function ( app )
{
	/*
		/user_profile/:username

		get the instagram profile for a user by username
	*/
	app.get( '/user_profile/:username', cors( ), function ( req, res ) {
		scraperIG( req.params.username, function ( data ) {
			res.status( 200 ).send( data );
		});
	});

	/*
		/user_profile_continue/:username

		continuously get the instagram profile for a user by username.  get a maximum of 10 times, with 2 mins between each.
	*/
	app.get( '/user_profile_continue/:username', cors( ), function ( req, res ) {
		// put 10 IG scraping jobs in the queue
		for ( var i = 0; i < 10; i++ )
		{
			// queue it to run every 2 minutes
			queue( { username : req.params.username }, 'scrape_IG', i * 1000 * 60 * 2 );
		}
		res.status( 200 ).send( 'success' );
	});
};