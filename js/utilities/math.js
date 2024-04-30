function getRndInteger(min, max) {
	// this solution has a perfectly even distribution and is INCLUSIVE
	// (can return max as often as any other number in the range). 
	// read more:
	// https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
	min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}