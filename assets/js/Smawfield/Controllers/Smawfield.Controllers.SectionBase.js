Smawfield.Controllers = Smawfield.Controllers || {};

Smawfield.Controllers.SectionBase = function (rootNode, sectionName) {
    this.rootNode = rootNode;
    this.sectionName = sectionName;
    this.view = new Smawfield.Views.Section(this, this.rootNode);
    this.getData();
    this.view.events.bind()
};

Smawfield.Controllers.SectionBase.prototype.renderData = function (response) {
    if (response) {
        this.view.render(JSON.parse(response), this.sectionName);
    }
};

Smawfield.Controllers.SectionBase.prototype.getData = function () {
    var request = new Smawfield.Data.Request('get', '/' + this.sectionName, '', $.scope(this, this.renderData));
        
    return request.send();
};
