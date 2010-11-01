Smawfield.Data.Request = function (method, url, data, callback, extraData) {
    this.method = method;
    this.url = url;
    this.id = new Date().getTime();
    if (typeof data === 'function') {
        this.data = '';
        this.callback = data;
    } else {
        this.data = data;
        this.callback = callback;
    }
    this.extraData = extraData;
};

Smawfield.Data.Request.prototype.send = function (data) {
    var returnVal = false;
    
    data = data || this.data;
    if (this.method in $) {
        $.ajax({
            data: data,
            error: $.scope(this, this.errorHandler),
            success: $.scope(this, this.callbackWrapper),
            type: this.method,
            url: this.url
        });
        returnVal = true;
    }
    
    return returnVal;
};

Smawfield.Data.Request.prototype.callbackWrapper = function (responseData) {
    this.callback(responseData, this);
};

Smawfield.Data.Request.prototype.errorHandler = function (request) {
    /*alert('thiere has been an error');
    
    var paths = Smawfield.Config.Paths.HTTPErrors;
    if (paths.followOnError === true) {
        location.href = paths[request.status] || paths["other"];
    }*/
};