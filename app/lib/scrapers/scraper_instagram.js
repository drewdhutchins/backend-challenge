var request = require( 'request' );
var _ = require( 'lodash' );

module.exports = function ( username, cb )
{
	var url = 'https://www.instagram.com/' + username;

	var cleanFail = function ( )
	{
		// our clean fail function
		return cb( { error : 'unable to get profile' } );
	};

	// making the request to instagram
	request( url, function ( err, res, body ) {
		var regex = /<script type="text\/javascript">window._sharedData =(.*);<\/script>/;
		var result = body.match( regex );

		if ( result && _.isArray( result ) && result.length )
		{
			var parsed = null;
			try {
				parsed = JSON.parse( result[ 1 ] );
			} catch ( err ) {
				console.error( 'unable to parse JSON' );
				return cleanFail( );
			}

			if (
				parsed &&
				parsed.entry_data &&
				parsed.entry_data.ProfilePage &&
				_.isArray( parsed.entry_data.ProfilePage ) &&
				parsed.entry_data.ProfilePage[ 0 ] &&
				parsed.entry_data.ProfilePage[ 0 ].graphql &&
				parsed.entry_data.ProfilePage[ 0 ].graphql.user
			)
			{
				// build the profileData from the parsed JSON
				var profileData = {
					"username": username,
					"fullName": _.get( parsed.entry_data.ProfilePage[ 0 ].graphql.user, 'full_name' ),
					"imageUrl": _.get( parsed.entry_data.ProfilePage[ 0 ].graphql.user, 'profile_pic_url_hd' ),
					"followers": _.get( parsed.entry_data.ProfilePage[ 0 ].graphql.user.edge_followed_by, 'count' ),
					"following": _.get( parsed.entry_data.ProfilePage[ 0 ].graphql.user.edge_follow, 'count' ),
					"posts" : _.get( parsed.entry_data.ProfilePage[ 0 ].graphql.user.edge_owner_to_timeline_media, 'count' ),
					"bio" : _.get( parsed.entry_data.ProfilePage[ 0 ].graphql.user, 'biography' ),
					"website" : _.get( parsed.entry_data.ProfilePage[ 0 ].graphql.user, 'external_url' ),
					"private_account" : _.get( parsed.entry_data.ProfilePage[ 0 ].graphql.user, 'is_private' )
				};

				cb( profileData );
			} else {
				// we are missing the profile data, so we wil fail
				return cleanFail( );
			}
		} else {
			// we did not get a proper result from instagram, so we will fail
			return cleanFail( );
		}
	});
};