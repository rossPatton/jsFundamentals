//           _             _            _            _            _              _          _            _
//         /\ \           /\ \         /\ \         /\ \        /\ \            /\ \       /\ \         /\ \     _
//        /  \ \         /  \ \       /  \ \       /  \ \      /  \ \           \ \ \     /  \ \       /  \ \   /\_\
//       / /\ \ \       / /\ \ \     / /\ \ \     / /\ \ \    / /\ \ \          /\ \_\   / /\ \ \     / /\ \ \_/ / /
//      / / /\ \ \     / / /\ \ \   / / /\ \_\   / / /\ \_\  / / /\ \ \        / /\/_/  / / /\ \ \   / / /\ \___/ /
//     / / /  \ \_\   / / /  \ \_\ / /_/_ \/_/  / / /_/ / / / / /  \ \_\      / / /    / / /  \ \_\ / / /  \/____/
//    / / /    \/_/  / / /   / / // /____/\    / / /__\/ / / / /    \/_/     / / /    / / /   / / // / /    / / /
//   / / /          / / /   / / // /\____\/   / / /_____/ / / /             / / /    / / /   / / // / /    / / /
//  / / /________  / / /___/ / // / /______  / / /\ \ \  / / /________  ___/ / /__  / / /___/ / // / /    / / /
// / / /_________\/ / /____\/ // / /_______\/ / /  \ \ \/ / /_________\/\__\/_/___\/ / /____\/ // / /    / / /
// \/____________/\/_________/ \/__________/\/_/    \_\/\/____________/\/_________/\/_________/ \/_/     \/_/


// in js you can do this, and it is valid
var count;
console.log( typeof count ); // undefined

count = 0;
console.log( typeof count ); // number

count = count.toString()
console.log( typeof count ); // string


// but where does the .toString() come from if numbers are primitives?
// js automatically does coercion in this case, under the hood
// we can expose by doing the following:
String.prototype.returnMe = function() {
	return this; // how this works is covered in the context.js file
}

// create a test string
var a = 'myString';

// call our new function
var b = a.returnMe();


// all primitives then have an associated object
// that object has a prototype with all the appropriate methods
// js will coerce a primitive to an object as needed
console.log( typeof a ); // 'string' (still a primitive)
console.log( typeof b ); // 'object'


// what this looks like with flow, or type annotations
// this is a union type btw, it says this value might hold 2 types
var count: number | string = 0; // 0 or '0' is valid here, undefined not allowed

// the below is effectively how js handles types by default
var count: any = 0;

// str can only be a string, if changed it will error
var str: string = 'some text';

// test is a function that lacks a return statement
var test: Function = function(): void {
	// no return statement
}

// test is a function that returns a string (and will error if it returns anything else)
var test: Function = function(): string {
	return str;
}

// although type coercion is a 'feature' of javascript, i doubt you really use it very often (manually, anyway)
// and if you do use it, it's probably more in the sense of union types, rather than the any type
// many languages disallow it, for good reason, as it's a common source of errors
// you should strive to avoid coercion as much as possible
