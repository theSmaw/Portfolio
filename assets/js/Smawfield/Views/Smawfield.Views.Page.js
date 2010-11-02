Smawfield.Views = Smawfield.Views || {};

Smawfield.Views.Page = function (controller, rootNode) {
    this.controller = controller;
    this.rootNode = rootNode;
    this.setUp();
    this.window = $(window);
    this.width = this.getWidth();
    this.setFontSize();
    this.window.bind('resize', $.scope(this, this.resize));    
};

Smawfield.Views.Page.prototype = new Smawfield.Views.Base();

Smawfield.Views.Page.prototype.getWidth = function () {
    
    return this.window.width();
};

Smawfield.Views.Page.prototype.resize = function () {
    this.width = this.getWidth();
    this.setFontSize();
};

Smawfield.Views.Page.prototype.reveal = function () {
    var page = this.rootNode.find('div.page');
    
    this.rootNode.addClass('loaded');
    page.css({
        'display' : 'block'
    }).animate({
        'opacity' : 1
    }, 750);
};

Smawfield.Views.Page.prototype.setFontSize = function () {
    var fontSize = (parseInt(this.width, 10) / 1600) * 62.5;
    
    fontSize = (fontSize < 50) ? 50 : fontSize;                    
    this.rootNode.css({
        'font-size' : fontSize + '%'
    });
};