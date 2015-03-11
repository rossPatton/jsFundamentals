//         _             _             _            _          _
//        / /\         /\ \           /\ \         /\ \       /\ \
//       / /  \       /  \ \         /  \ \       /  \ \     /  \ \
//      / / /\ \__   / /\ \ \       / /\ \ \     / /\ \ \   / /\ \ \
//     / / /\ \___\ / / /\ \ \     / / /\ \ \   / / /\ \_\ / / /\ \_\
//     \ \ \ \/___// / /  \ \_\   / / /  \ \_\ / / /_/ / // /_/_ \/_/
//      \ \ \     / / /    \/_/  / / /   / / // / /__\/ // /____/\
//  _    \ \ \   / / /          / / /   / / // / /_____// /\____\/
// /_/\__/ / /  / / /________  / / /___/ / // / /      / / /______
// \ \/___/ /  / / /_________\/ / /____\/ // / /      / / /_______\
//  \_____\/   \/____________/\/_________/ \/_/       \/__________/


// in the browser, window is the global scope
// on the server, via node, global is the global scope
// this is the absolute worst way to declare a variable
// coffeescript, typescript, etc, wont even let you compile a file if you do this
// declaring a var without a var name sets it to the global scope by default
// this is bad, you could overwrite something important globally
worstVar = 1; // global scope if not use strict, undefined if use strict
console.log( 'worstVar global object: ', global.worstVar ); // 5

// even if you put it inside a function
(function() {
	worstVar = 10;
}());
console.log( 'worstVar changed inside function: ', global.worstVar ); // 10


// this var still pollutes the global scope, but at least it's not on the global object
// still, this var will be accessible globally and can be changed on a whim, and you'd never know
var globalVar = 2;
console.log( '\nglobal object global var: ', global.globalVar ); // undefined
console.log( 'globalVar: ', globalVar ); // 5

(function() {
	console.log( 'inside function global var: ', globalVar );
	globalVar = 10; // whoops, i just overwrote it
	console.log( 'globalVar changed inside function: ', globalVar );
}());


// now we're doing things better
// by scoping our vars to the function they're used, we don't pollute the global scope
// other js files and functions outside this scope can't get at this var
// also, garbage collection will kick in when/if it goes out of scope, saving us a bit of memory
(function() {
	var myLocallyScopedVar = 3;
	console.log( '\nmyLocallyScopedVar in scope: ', myLocallyScopedVar );
}());
// console.log( 'myLocallyScopedVar out of scope: ', myLocallyScopedVar ); // undefined
// this will create a new globally scoped var, instead of overwriting the one in our function
// myLocallyScopeVar = 'newValueThatBreaksEverything';


// so, what is var hoisting then?
// the following two completely arbitrary functions are equivalent:
function testVarHoistOne( anything ) {
	if ( anything ) {
		// i am not block scoped, i am function scoped
		var myLocallyScopedVar = anything;
		return myLocallyScopedVar;
	}
};
console.log( testVarHoistOne('\nTest Hoist One') );


// but this one is what the compiler actually sees:
// to reduce potential confusion, and mitigate potential edge case-y errors
// you should always write in this style
function testVarHoistTwo( anything ) {
	var myLocallyScopedVar;

	if ( anything ) {
		myLocallyScopedVar = anything;
		return myLocallyScopedVar;
	}
};
console.log( testVarHoistTwo('Test Hoist Two') );


// what about function hoisting?
// functions get hoisted too, in the same way
function testFunctionHoist() {
	console.log( '\nTest function hoist');

	// foo(); // @TODO uncomment me to test

	bar();

	// function expression assigned to local variable 'foo'
	// functions created this way, DO get hoisted, but only the initialization (ie, no function value assigned)
	var foo = function() {
		console.log( 'foo: i wont run' );
	}
	// function declaration, given the name 'bar'
	// function created this way, called declarations, are always pulled to the top of the scope
	// just like vars, but in this case the whole function comes along for the ride
	function bar() {
		console.log( 'bar: i will run' );
	}
}
testFunctionHoist(); // TypeError "foo is not a function"


// the below is what the compiler sees
function testFunctionHoistTwo() {
	var foo;

	function bar() {
		console.log( 'bar: i will run' );
	}

	// foo(); // foo has no value yet @TODO uncomment me to test
	bar(); // i exist!
	foo = function () {
		console.log( 'foo: i wont run' );
	}
}
testFunctionHoistTwo(); // TypeError "foo is not a function"


// for funsies, some es6 examples
// es6 introduces lexical scoping to javascript
// this takes the form of two new keywords, let and const
// a completely arbitrary example below
(function() {
	'use strict';
	// a const (constant) is a block scoped var that cannot be changed once given a value
	// test will equal true, forever and ever, amen
	const test = true;
	if ( test ) {
		// let is what you'll use instead of var in the future
		// let is just a lexically scoped var
		let isES6 = '\ntotes es6';
		// var isES6 = '\ntotes es6';
		console.log( isES6 ); // totes es6
	}
	// console.log( isES6 ); // undefined if let, defined if var
}());


// another example
(function() {
	'use strict';
	// a const (constant) is a block scoped var that cannot be changed once given a value
	// test will equal true, forever and ever, amen
	const test = true;
	console.log( test );
	test = false; // wtf m8 'TypeError: Assignment to constant variable.'
}());
