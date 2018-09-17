var app = app || { };

app.init = function ( )
{
	// nothing for now
};

app.submitForm = function ( )
{
	$( '#IG_username' ).blur( )
	var username = $( '#IG_username' ).val( );
	app.getResults( username, function ( data ) {
		app.showResults( app.formatResults( username, data ) );
	});
};

app.formatResults = function ( username, data )
{
	var html = '';
		html +=	'<div class="row text-center">';
		html +=		'<div class="col">';
		html +=			'<h3>';
		html +=				'@' + username + ' profile data';
		html +=			'</h3>';
		html +=		'</div>';
		html +=	'</div>';
		html +=	'<div class="row justify-content-center">';
		html +=		'<div class="col">';
		html +=			app.getTableFromObj( data );
		html +=		'</div>';
		html +=	'</div>';
	return html;
};

app.getTableFromObj = function ( obj )
{
	var keys = _.keys( obj );
	keys = keys.sort( );

	var html =	'';
		html +=	'<table class="table">';
	
	for ( var i = 0; i < keys.length; i++ )
	{
		html +=		'<tr>';
		html +=			'<td>';
		html +=				keys[ i ];
		html +=			'</td>';
		html +=			'<td>';
		if ( keys[ i ] == 'imageUrl' && obj[ keys[ i ] ] ) {
			html +=	'<a href="'+obj[ keys[ i ] ]+'" target="_blank">';
			html +=		'<img src="'+obj[ keys[ i ] ]+'" class="profile-pic">';
			html +=	'</a>';
		} else if ( keys[ i ] == 'website' && obj[ keys[ i ] ] ) {
			html +=	'<a href="'+obj[ keys[ i ] ]+'" target="_blank">'+obj[ keys[ i ] ]+'</a>';
		} else if ( _.isNumber( obj[ keys[ i ] ] ) ) {
			html +=	obj[ keys[ i ] ].toLocaleString( );
		} else {
			html +=	obj[ keys[ i ] ] || '';
		}
		html +=			'</td>';
		html +=		'</tr>';
	}
		html +=	'</table>';

	return html;
};

app.showResults = function ( results )
{
	$( '#results-area' ).html( results );
};

app.getResults = function ( username, cb )
{
	$.ajax({
		url : 'https://unum-code-challenge.herokuapp.com/user_profile/' + username,
		success : function ( data ) {
			cb( data )
		}
	});
};

