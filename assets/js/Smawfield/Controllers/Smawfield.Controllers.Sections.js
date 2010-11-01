Smawfield.Controllers = Smawfield.Controllers || {};

Smawfield.Controllers.Sections = function (rootNode) {
    var i,
        section,
        sectionClass,
        sectionName;
    
    this.sections = $('.section');

    for (i = this.sections.length - 1; i >= 0; i--) {
        section = this.sections.eq(i);
        sectionClass = section.attr('class');
        sectionName = Smawfield.Data.getMetaFromClassName('name', sectionClass);
        Smawfield.Controllers.Sections[sectionName] = new Smawfield.Controllers.SectionBase(section, sectionName);
    }
};
