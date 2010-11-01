jQuery.scope = function (scope, f) {
	if ($.isFunction(scope)) {
		f = scope;
		scope = window;
	}
    
	return function scoper() {
		f.apply(scope, arguments);
	};
};