//           _             _             _            _        _                  _           _
//         /\ \           _\ \          /\ \         / /\     /\_\               /\ \        /\ \
//        /  \ \         /\__ \        /  \ \       / /  \   / / /         _    /  \ \      /  \ \
//       / /\ \ \       / /_ \_\      / /\ \ \     / / /\ \__\ \ \__      /\_\ / /\ \ \    / /\ \ \
//      / / /\ \ \     / / /\/_/     / / /\ \ \   / / /\ \___\\ \___\    / / // / /\ \_\  / / /\ \_\
//     / / /  \ \_\   / / /         / / /  \ \_\  \ \ \ \/___/ \__  /   / / // / /_/ / / / /_/_ \/_/
//    / / /    \/_/  / / /         / / /   / / /   \ \ \       / / /   / / // / /__\/ / / /____/\
//   / / /          / / / ____    / / /   / / /_    \ \ \     / / /   / / // / /_____/ / /\____\/
//  / / /________  / /_/_/ ___/\ / / /___/ / //_/\__/ / /    / / /___/ / // / /\ \ \  / / /______
// / / /_________\/_______/\__\// / /____\/ / \ \/___/ /    / / /____\/ // / /  \ \ \/ / /_______\
// \/____________/\_______\/    \/_________/   \_____\/     \/_________/ \/_/    \_\/\/__________/


// global scope up here (window, or the wrapper iife in this case of our setup)


// this is an iife, it immediately invokes itself
// immediately invoked function expression, to be technical
// often used to create scope on a file by file basis in js
// or on a site basis, in our case
// the following is the basic module pattern
var Module = (function() {
	// this variable is function scope'd to Module
	var _privateVariable = 5;

	// everything that is returned, becomes 'public'
	// we are basically returning an object here
	// this object has key:value pairs (duh)
	// the key is our function name
	// the value is the function itself
	// not magic
	return {
		publicFunction: function( num ) {
			return _privateVariable + num;
		}
	}
}());
// the result is the object we return, privateVariable is nowhere to be seen
console.log( 'module.publicFunction: ', Module.publicFunction( 5 ), '\n' ); // 10
console.dir( Module );


// a variant on the module pattern that we use
// the revealing module pattern is an attempt to
// make it easier to create private and privileged functions and variables
var RevealingModule = (function() {
	// this variable is function scope'd to Module
	var _privateVariable = 5;


	// because js has no formal way of declaring private
	// i use the function declaration syntax to mark functions that are only used internally
	// function declarations are defined at parse time and should go at the top
	// of their scope just like variables, to prevent errors
	function privateFunction( num ) {
		return _privateVariable + num;
	}


	// because js has no formal way of declaring public
	// i use the var syntax to mark functions that will be returned
	// the var syntax is a function expression and is defined at run time
	var publicFunction = function( num ) {
		return privateFunction( num );
	}

	// everything that is returned, becomes 'public'
	// we are basically returning an object here
	// this object has key:value pairs (duh)
	// the key is our function name
	// the value is the function itself
	// not magic
	// you can see that this is just a slightly different way of doing what we did above
	return {
		public: publicFunction
	}
}());
console.log( 'RevealingModule.innerFunction: ', RevealingModule.public( 5 ), '\n' ); // 10
console.dir( RevealingModule );


// an example of a revealing module that extends another revealing module
var ExtendedRevealingModule = (function( RevealingModule ) {

	RevealingModule.newFunction = function() {
		console.log( 'new function added to the old, only accessible within this scope' );
	};

	return RevealingModule.newFunction;

}( RevealingModule || {} ));
console.log( 'extended module: ' );
console.log( RevealingModule, '\n' );


// a cache function
// we should use something like this for our selectors, btw
var cache = (function() {
	var collection = {};

	// this is scoped to the cache function
	function getFromCache( thingToGet, key ) {
		// if not in cache, cache it
		if ( typeof collection[ thingToGet ] === 'undefined' ) {
			if ( key ) {
				collection[ key ] = thingToGet;
			}
			else {
				collection[ thingToGet ] = thingToGet;
			}
		}

		// return it
		return collection[ thingToGet ];
	}

	// this should look familiar
	// by returning it here, we expose it to the global scope
	// or, whatever scope the cache function is in anyway
	return {
		get: getFromCache,
		hash: collection
	};
}());
cache.get(5, 'key1');
cache.get(10);
cache.get(15, 'key3');
console.log( '\n', cache.get('key3') );
console.log( 'cache', cache.hash );


// this is called currying
function addTwo( a ) {
	return function(b) {
		return a + b;
	}
}
console.log( '\naddTwo', addTwo(5)(5) ); // 10;


// more curry
function addThree( a ) {
	return function( b ) {
		return function( c ) {
			return a + b + c;
		}
	}
}
console.log( 'addThree', addThree(5)(5)(5) ); // 15;
