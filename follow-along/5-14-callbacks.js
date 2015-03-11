 //      ___          ___                                              ___          ___          ___         ___
 //     /  /\        /  /\                                _____       /  /\        /  /\        /__/|       /  /\
 //    /  /:/       /  /::\                              /  /::\     /  /::\      /  /:/       |  |:|      /  /:/_
 //   /  /:/       /  /:/\:\  ___     ___  ___     ___  /  /:/\:\   /  /:/\:\    /  /:/        |  |:|     /  /:/ /\
 //  /  /:/  ___  /  /:/~/::\/__/\   /  /\/__/\   /  /\/  /:/~/::\ /  /:/~/::\  /  /:/  ___  __|  |:|    /  /:/ /::\
 // /__/:/  /  /\/__/:/ /:/\:\  \:\ /  /:/\  \:\ /  /:/__/:/ /:/\:/__/:/ /:/\:\/__/:/  /  /\/__/\_|:|___/__/:/ /:/\:\
 // \  \:\ /  /:/\  \:\/:/__\/\  \:\  /:/  \  \:\  /:/\  \:\/:/~/:|  \:\/:/__\/\  \:\ /  /:/\  \:\/:::::|  \:\/:/~/:/
 //  \  \:\  /:/  \  \::/      \  \:\/:/    \  \:\/:/  \  \::/ /:/ \  \::/      \  \:\  /:/  \  \::/~~~~ \  \::/ /:/
 //   \  \:\/:/    \  \:\       \  \::/      \  \::/    \  \:\/:/   \  \:\       \  \:\/:/    \  \:\      \__\/ /:/
 //    \  \::/      \  \:\       \__\/        \__\/      \  \::/     \  \:\       \  \::/      \  \:\       /__/:/
 //     \__\/        \__\/                                \__\/       \__\/        \__\/        \__\/       \__\/


// callbacks aren't magic, but they're a pretty easy way to do async programming
// lets write a quick and easy callback function

// the function we will use as the callback
function howLongWasIt( timeElapsed ) {
	'use strict';
	console.log( 'wait callback: ', `${timeElapsed}ms` ); // template strings are an es6 feature
	return timeElapsed + 'ms';
}

// a function, takes a function as a parameter
// ie, all you need for callbacks
function wait( numberOfSeconds, callbackFn ) {
	setTimeout(function() {
		return callbackFn( numberOfSeconds );
	}, numberOfSeconds );
}
// kick off
wait( 1000, howLongWasIt );


// another example
// if you've ever used any library ever
// you are familiar with this
var arr = [ 10, 10, 10, 10, 10 ];
function add( arrToAdd, callbackFn ) {
	var sum = 0;

	arrToAdd.forEach(function( num ) {
		sum = sum + num;
	})

	return callbackFn( sum );
}

// functions can be anonymous, you see
add( arr, function( data ) {
	console.log( 'add callback: ', data );
});


// while we're at it, why don't we just make our own forEach function?
// we'll do this again, the right way, in the prototype examples
// this is just to illustrate callbacks
function superForEach( arr, fn ) {
	var i = 0,
		len = arr.length;

	for ( i; i < len; i++ ) {
		fn( arr[i], i, arr ); // we pass the value, iteration, and original array in
	}
}
superForEach( arr, function( val, i, orig ) {
	console.log( 'val: ', val, ' i: ', i );
});




// promises in es6 will probably replace the callback pattern for most cases
// especially when async is involved
// a promise would look something like this:
// var promise = $.getJSON('http://www.internet.com/myJSONFile.json');

// promise.then(function( data ) {
// 	// do something with our async data
// }).catch( err ) {
// 	// something went wrong
// };

// // or like this in es6
// function timeout( duration = 0 ) {
// 	return new Promise(( resolve, reject ) => {
// 		setTimeout( resolve, duration );
// 	});
// }
// var p = timeout( 1000 ).then(() => {
// 	// do something here after 1000 ms
// 	return timeout( 2000 );
// }).then(() => {
// 	// do something here after 2000 more ms
// 	// lets intentionally throw an err
// 	throw new Error('we got a problem');
// }).catch(err => {
// 	// now we've landed here, where we can handle the error
// 	console.error( 'looks we have a problem with our timeout: ', err )
// });
