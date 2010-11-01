Smawfield.Views = Smawfield.Views || {};

Smawfield.Views.Work = function (controller, rootNode) {
    this.setUp();
    this.controller = controller;
    this.rootNode = rootNode;
    this.createModalContainer();
    this.rootNode.bind('click', $.scope(this, this.launchModal));
}

Smawfield.Views.Work.prototype = new Smawfield.Views.Base();

Smawfield.Views.Work.prototype.createModalContainer = function () {
    $('body').append('<div id="workModal"></div>');
}

Smawfield.Views.Work.prototype.launchModal = function (e) {
    var target = $(e.target).closest('a', this.rootNode);

    if (target.length) {
        this.controller.modalTrigger = target;
        this.controller.launchModal(target.closest('li'));
    }
    e.preventDefault();
}