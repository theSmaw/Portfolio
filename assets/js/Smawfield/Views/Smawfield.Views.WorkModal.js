Smawfield.Views = Smawfield.Views || {};

Smawfield.Views.WorkModal = function (controller, rootNode) {
    this.controller = controller;
    this.rootNode = rootNode;
    this.setUp();
};

Smawfield.Views.WorkModal.prototype = new Smawfield.Views.ModalBase();

Smawfield.Views.WorkModal.prototype.launch = function (el, originalTarget) {
    var contents = el.clone(),
        heading = contents.find('h3'),
        image = contents.find('img');
    
    heading.html(heading.find('a').text());
    heading.after('<button class="close">Close</button>');
    image.attr('src', Smawfield.Data.getMetaFromClassName('large', image.attr('class')));
    contents.append(image);
    this.rootNode.html(contents.html());
    this.show();
};