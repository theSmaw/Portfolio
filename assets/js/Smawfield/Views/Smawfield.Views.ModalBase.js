Smawfield.Views.ModalBase = function () {};

Smawfield.Views.ModalBase.prototype = new Smawfield.Views.Base;

Smawfield.Views.ModalBase.prototype.setUp = function () {
    Smawfield.Views.Base.prototype.setUp.call(this);
    this.overlay = this.overlay || this.createOverlay();
    this.hide();
    this.rootNode.css({
        'display' : 'block'
    });
    $(window).bind('resize', $.scope(this, this.sizeAndPosition));
    
    this.rootNode.bind('click', $.scope(this, this.close_click));
    this.showSpinner = this.rootNode.hasClass("spinner");
    if (this.spinner == null && this.showSpinner) {
        this.prepareSpinner();
    }
};

Smawfield.Views.ModalBase.prototype.createOverlay = function () {
    var overlay = $('<div id="modalOverlay"></div>');
    
    $('body').append(overlay);
    
    return overlay;
};

Smawfield.Views.ModalBase.prototype.show = function () {
    if (this.showSpinner && this.spinner != null && this.spinnerInjected !== true) {
        this.rootNode.find(".body p").append(this.spinner);
        this.spinnerInjected = true;
    }
    this.overlay.show();
    this.visible = true;
    $("body").append(this.rootNode);
    this.sizeAndPosition();
};

Smawfield.Views.ModalBase.prototype.delayedShow = function() {
    this.overlay.show();
    this.showDelay = setTimeout($.scope(this, this.show), 350);
};

Smawfield.Views.ModalBase.prototype.sizeAndPosition = function () {
    if (this.visible === false) return;
    var top = Math.floor($(window).height()/2) - Math.floor(this.rootNode.height()/2),
        left = Math.floor($(window).width()/2) - Math.floor(this.rootNode.width()/2);

    this.overlay.css( {
        width: $(window).width(),
        height: $(document).height(),
        display: "block"
    } );
    this.rootNode.css( {
        top: top,
        left: left
    } );
};

Smawfield.Views.ModalBase.prototype.hide = function() {
    clearTimeout(this.showDelay);
    this.overlay.hide();
    this.rootNode.detach();
    this.visible = false;
};

Smawfield.Views.ModalBase.prototype.close_click = function(e) {
    var target = $(e.target);
    
    if (target.hasClass('close')) {
        this.hide();
        this.events.trigger('close');
        this.controller.modalTrigger.focus();
        e.preventDefault();
    }
};

Smawfield.Views.ModalBase.prototype.prepareSpinner = function() {
    var spinnerURL = $("#spinnerURL");
    if (spinnerURL.length > 0) {
        Smawfield.Views.ModalBase.prototype.spinner = spinnerURL.text();
        spinnerURL.remove();
        setTimeout( function loadSpinner() {
            Smawfield.Views.ModalBase.prototype.spinner = $("<img class=\"spinner\" src=\"" + Smawfield.Views.ModalBase.prototype.spinner + "\" alt=\"\" />");
        }, 250 );
    }
};