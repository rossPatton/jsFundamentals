//       /\ \         / /\    / /\  /\ \      / /\
//       \_\ \       / / /   / / /  \ \ \    / /  \
//       /\__ \     / /_/   / / /   /\ \_\  / / /\ \__
//      / /_ \ \   / /\ \__/ / /   / /\/_/ / / /\ \___\
//     / / /\ \ \ / /\ \___\/ /   / / /    \ \ \ \/___/
//    / / /  \/_// / /\/___/ /   / / /      \ \ \
//   / / /      / / /   / / /   / / /   _    \ \ \
//  / / /      / / /   / / /___/ / /__ /_/\__/ / /
// /_/ /      / / /   / / //\__\/_/___\\ \/___/ /
// \_\/       \/_/    \/_/ \/_________/ \_____\/



// so what does this mean
// 'this' in js kinda doesnt make much sense
// sometimes it means what you think it means, but usually it won't
// when used inside functions, this depends on several things
// ie, where the function was called, and if strict or not
var foo = function() {
	console.log( this ); // this here is the global object
}
// foo();

// in strict mode it equals undefined
var bar = function() {
	'use strict';
	console.log( this ); // undefined
}
// bar();


// when used inside a method, it refers to the obj, always
// this is like, the only time this makes sense
var objectLit = {
	prop: 'testProp',
	prop2: this,
	method: function() {
		console.log( this );
	}
};
console.log( objectLit.prop2 ); // {}
// objectLit.method(); // { prop: 'testProp', method: [Function] }



// when used in a function, it refers to one of two things
// either undefined (if use strict is on) or window, if not

// however, the following works because we are actually returning an object literal
// which sets this to be the object
// this is the main benefit of a pattern like this:
// it sets scope, creates closure, and sets context
var testThisInClosure = (function() {
	'use strict';
	return {
		prop: 'testThisInClosure',
		get: function() {
			return this.prop;
		}
	};
}());
console.dir( testThisInClosure.get() );


// this doesn't work:
// in this case, this is undefined, so you can't set a property on it
// var testThisInClosureTwo = (function() {
// 	'use strict';
// 	this.prop = 'testThisInClosure';
// 	return {
// 		get: function() {
// 			return this.prop;
// 		}
// 	};
// }());
// console.log( testThisInClosureTwo.get() );


// the following example comes from mdn's article on call, apply, bind
// call, apply, bind are all three different ways of doing effectively doing the same thing
// they all set the context, ie, the alter the value of this

// called directly, this function won't work
// this.a and this.b are referring to the global object
function add( c, d ) {
  return this.a + this.b + c + d;
}

// but if we set the context to o...
// this.a and this.b would return values, and the function works
var o = {
	a: 1,
	b: 3
};


// the following 2 examples do the same thing
// they set the context - this - to be o
// meaning, this would follow object literal rules instead of global rules
// instead of the global rules it would normally follow
// call takes a list of params, the 1st being the context, the rest being anything you want to pass
// apply works the same way, but takes an array or array like object as the 2nd param

// The first parameter is the object to use as
// 'this', subsequent parameters are passed as
// arguments in the function call
console.log( add.call( o, 5, 7 ) ); // 1 + 3 + 5 + 7 = 16

// The first parameter is the object to use as
// 'this', the second is an array whose
// members are used as the arguments in the function call
console.log( add.apply( o, [ 10, 20 ] ) ); // 1 + 3 + 10 + 20 = 34

// bind() is another function for manipulating context
// bind works exactly like call, but returns a new function instead
// so you can do this:
var addO = add.bind( o );
console.log( addO( 10, 10 ) ); // 1 + 3 + 10 + 10 = 24
