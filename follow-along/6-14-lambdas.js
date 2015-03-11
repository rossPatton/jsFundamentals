//                  ___          ___                                  ___          ___
//                  /\  \        /\  \        _____       _____       /\  \        /\__\
//                 /::\  \      |::\  \      /::\  \     /::\  \     /::\  \      /:/ _/_
//                /:/\:\  \     |:|:\  \    /:/\:\  \   /:/\:\  \   /:/\:\  \    /:/ /\  \
//  ___     ___  /:/ /::\  \  __|:|\:\  \  /:/ /::\__\ /:/  \:\__\ /:/ /::\  \  /:/ /::\  \
// /\  \   /\__\/:/_/:/\:\__\/::::|_\:\__\/:/_/:/\:|__/:/__/ \:|__/:/_/:/\:\__\/:/_/:/\:\__\
// \:\  \ /:/  /\:\/:/  \/__/\:\~~\  \/__/\:\/:/ /:/  |:\  \ /:/  |:\/:/  \/__/\:\/:/ /:/  /
//  \:\  /:/  /  \::/__/      \:\  \       \::/_/:/  / \:\  /:/  / \::/__/      \::/ /:/  /
//   \:\/:/  /    \:\  \       \:\  \       \:\/:/  /   \:\/:/  /   \:\  \       \/_/:/  /
//    \::/  /      \:\__\       \:\__\       \::/  /     \::/  /     \:\__\        /:/  /
//     \/__/        \/__/        \/__/        \/__/       \/__/       \/__/        \/__/


// lambdas are simple
// this is what people mean when they talk about lambdas in JS:

// lets make a function
function lambdaExample() {
	var someValue = 'someValue';
	return someValue;
}

// now lets use it as a value
var testLambda = lambdaExample(); // someValue

// you can also do this:
if ( lambdaExample() ) {
	// will run
}

// believe it or not plenty of languages don't support this
// the return statement is what we use to determine the value
// by default functions return undefined
