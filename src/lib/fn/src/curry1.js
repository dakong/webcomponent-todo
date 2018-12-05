export const curry1 = (a, fn) => {
	return _b => {
  	    fn(a, _b);
    }
}
