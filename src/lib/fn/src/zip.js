export const zip = (a, b) => {
	const lenA = a.length;
	const lenB = b.length;
	let idx = 0;
	let rslt = [];

	while(idx < lenA || idx < lenB) {
		let zipped = [null, null];
		if (idx < lenA) {
			zipped[0] = a[idx];
		}
		if (idx < lenB) {
			zipped[1] = b[idx];
		}
		rslt[idx] = zipped;
		idx++;
	}
	return rslt;
}