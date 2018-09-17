var scraperIG = require( '../scrapers/scraper_instagram' );

module.exports = function ( kue )
{
	/*
		all queue job types are defined here

		** done callback must be called once the job is finished in order for it to be removed from queue
	*/
	kue.process( 'scrape_IG', function ( job, done ) {
		scraperIG( job.data.username, function ( data ) {
			console.log( Date.now( ), data );
			// don't mark as done until we are finished scraping
			done( );
		});
	});
};