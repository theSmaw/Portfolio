Smawfield.Views = Smawfield.Views || {};

Smawfield.Views.Section = function (controller, rootNode) {
    this.setUp();
    this.controller = controller;
    this.rootNode = rootNode;
};

Smawfield.Views.Section.prototype = new Smawfield.Views.Base();

Smawfield.Views.Section.prototype.createHeading = function (heading) {
    this.rootNode.prepend('<h2>' + heading + '</h2>');
};

Smawfield.Views.Section.prototype.createList = function (items) {
    var i,
        length = items.length,
        list = $('<ul></ul>');
    
    for (i = 0; i < length; i += 1) {
        list.append('<li>' + items[i] + '</li>');
    }
    this.rootNode.append(list);
};

Smawfield.Views.Section.prototype.render = function (data, heading) {
    if (data.items.length) {
        this.createHeading(heading);
        this.createList(data.items);
        this.rootNode.animate({
            opacity: 1
        }, 750);
    }
};