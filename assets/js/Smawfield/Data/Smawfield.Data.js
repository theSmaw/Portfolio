Smawfield.Data = {
    
    getMetaFromClassName : function (metaName, className) {
        var meta,
            metaRegExp,
            returnVal = "";
        
        if (className) {
            metaRegExp = new RegExp('meta.*?[\\(#]' + metaName + '=([^#]*)[#\\)]');
            meta = metaRegExp.exec(className);
            if (meta && meta.length >= 1) {
                returnVal = meta[1];
            }
        }
        
        return returnVal;
    }
};