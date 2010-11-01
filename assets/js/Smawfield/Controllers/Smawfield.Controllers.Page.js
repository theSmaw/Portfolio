Smawfield.Controllers = Smawfield.Controllers || {};

Smawfield.Controllers.Page = function () {
    var bindSystemEvents,
        rootNode = $('body'),
        view = new Smawfield.Views.Page(this, rootNode);
        
    this.loadFonts = function () {
        try {
            Typekit.load({
                active : function () {
                    view.reveal();
                }
            });
        } catch (e) {
            view.reveal();
        }   
    };
    
    this.loadFonts();
};