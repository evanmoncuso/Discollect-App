const searchFilter = (data, kw, zip, cat) => {
	let output = data;
	if (kw) {
		let kwMatch = new RegExp(kw);
		output = output.filter((item) => {
			return item.title.toLowerCase().match(kwMatch);
		});
	}

	// if (zip) {
	// 	let zipMatch = new RegExp('^' + zip);
	// 	output = output.filter((item) => {
	// 		return String(item.zip).match(zipMatch);
	// 	});
	// }

	// if(cat) {
	// 	let catMatch = new RegExp(kw);
	// 	output = output.filter((item) => {
	// 		return item.cat === cat;
	// 	});
	// }

	return output;
}

module.exports = searchFilter;
