var port = process.env.PORT || 8000;

var express = require( 'express' );
var app = express( );
require( './app/routes' )( app, { } );

if ( process.env.REDIS_URL )
{
	// production environment
	var redis = require( 'redis' ).createClient( process.env.REDIS_URL );
} else {
	// for local testing
	var redis = require( "redis" ).createClient( );
}

redis.on( 'connect', function ( ) {
	console.log( 'Redis client connected' );
});

redis.on( 'error', function ( err ) {
	console.error( 'Redis error ' + err );
});

app.listen( port, function ( ) {
	console.log( 'Listening on port ' + port );
});