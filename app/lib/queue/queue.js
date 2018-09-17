if ( process.env.REDIS_URL )
{
	// production environment
	var kue = require( 'kue' ).createQueue({
		redis: process.env.REDIS_URL
	});
} else {
	// for local testing
	var kue = require( 'kue' ).createQueue( );
}

var jobs = require( './jobs' )( kue );


module.exports = function ( data, job_type, delay )
{
	/*
		create an item to place in the queue
		
		data: JSON of data for the job (passed in as job.data in /lib/queue/jobs.js )
		job_type: refers to a type of job defined in /lib/queue/jobs.js
		delay: milliseconds to wait before executing the job
	*/
	kue.create( job_type, data )
	.removeOnComplete( true )
	.delay( delay )
	.save( );
};