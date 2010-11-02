Smawfield.Controllers = Smawfield.Controllers || {};

Smawfield.Controllers.Work = function () {
    this.rootNode = $('#work');
    this.events = new Smawfield.Controls.Events();
    this.view = new Smawfield.Views.Work(this, this.rootNode);
    this.modalView = new Smawfield.Views.WorkModal(this, $('#workModal'));
    
    this.launchModal = function (el) {
        this.modalView.launch(el);  
    };
};