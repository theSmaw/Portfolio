Smawfield.Controls = Smawfield.Controls || {};

Smawfield.Controls.Events = function () {
    this.eventsHandlers = {};
};

Smawfield.Controls.Events.prototype.bind = function (event, handler) {
    var e,
        i;
    
    if (!this.eventsHandlers[event]) {
        this.eventsHandlers[event] = [];
    }
    if (typeof event === "object") {
        for (e in event) {
            if (event.hasOwnProperty(e)) {
                this.bind(e, event[e]);
            }
        }
    } else if (/,/.test(event)) {
        event = event.split(/,/);
        for (i = event.length - 1; i >= 0; i -= 1) {
            this.bind(jQuery.trim(event[i]), handler);
        }
    } else {
        for (i = this.eventsHandlers[event].length - 1; i >= 0; i -= 1) {
            if (this.eventsHandlers[event][i] === handler) {
                
                return;
            }
        }
        this.eventsHandlers[event].push(handler);
    }
};

Smawfield.Controls.Events.prototype.unbind = function (event, handler) {
    var e,
        i;
        
    if (typeof event === "object") {
        for (e in event) {
            if (event.hasOwnProperty(e)) {
                this.unbind(e, event[e]);
            }
        }
    } else if (/,/.test(event)) {
        event = event.split(/,/);
        for (i = event.length - 1; i >= 0; i -= 1) {
            this.unbind(jQuery.trim(event[i]), handler);
        }
    } else if (!this.eventsHandlers[event]) {
        
        return;
    } else {
        for (i = this.eventsHandlers[event].length - 1; i >= 0; i -= 1) {
            if (this.eventsHandlers[event][i] === handler) {
                this.eventsHandlers[event].splice(i, 1);
                
                break;
            }
        }
    }
};

Smawfield.Controls.Events.prototype.trigger = function (eventName) {
    var handlers,
        args,
        i,
        j;
    
    if (!this.eventsHandlers[eventName]) {
        
        return;
    }
    handlers = this.eventsHandlers[eventName];
    args = jQuery.makeArray(arguments);
    i = 0;
    j = handlers.length;
    args = args.slice(1, args.length);
    for (i; i < j; i += 1) {
        handlers[i].apply(this, args);
    }
};