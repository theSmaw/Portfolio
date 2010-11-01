Smawfield.Views = {};

Smawfield.Views.Base = function () {};

Smawfield.Views.Base.prototype.setUp = function () {
    if (!this.events) {
        this.events = new Smawfield.Controls.Events();
        if (this.init) {
            this.init.apply(this, arguments);
        }
    }
};

Smawfield.Views.Base.prototype.getController = function () {
    if (this.controller) {
        
        return this.controller;
    } else if (this.parentView) {
        
        return this.parentView.getController();
    } else {
        
        return {};
    }
};