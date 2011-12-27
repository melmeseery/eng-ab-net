/**
 * @author ramki_r
 */
Ext.ux.ThemeChanger = Ext.extend(Ext.form.ComboBox, {
    extThemes:  [
        ['Aero', 'xtheme-none.css'],
    ],
    
    defaultTheme: 0,
    typeAhead: true,
    triggerAction: 'all',
    mode: 'local',
    editable: false,
    cssId: Ext.id(),    
    
    loadCssFile: function(filename, theCssId){
        if (theCssId)
            var elem = document.getElementById(theCssId);
        if (elem && elem!=null){
            elem.setAttribute("href", filename);
        } else {
            elem=document.createElement("link");
            elem.setAttribute("rel", "stylesheet");
            elem.setAttribute("type", "text/css");
            elem.setAttribute("href", filename);
            if (theCssId)
                elem.setAttribute("id", theCssId);
            document.getElementsByTagName("head")[0].appendChild(elem);
        }
    },

    changeTheme: function ( obj, rec, themeChoice){
        this.defaultTheme = themeChoice;
        this.loadCssFile(rec.get(this.valueField),this.cssId);
    },

    loadPreThemes: function() {
        if (this.preThemes) {
            if (this.preThemes instanceof Array) {
                for(var i = 0, len = this.preThemes.length; i < len; i++){
                    this.loadCssFile(this.preThemes[i]);
                }
            } else {
                this.loadCssFile(this.preThemes);
            }
        }
    },
    
    loadPostThemes: function() {
        if (this.postThemes) {
            if (this.postThemes instanceof Array) {
                for(var i = 0, len = this.postThemes.length; i < len; i++){
                    this.loadCssFile(this.postThemes[i]);
                }
            } else {
                this.loadCssFile(this.postThemes);
            }
        }
    },

    initComponent: function() {
        Ext.ux.ThemeChanger.superclass.initComponent.call(this);
        if (!this.store) {
            this.store = new Ext.data.SimpleStore({
                fields: ['displayname', 'cssFile'],
                data: this.extThemes
            });
        }
        if (!this.displayField)
            this.displayField = 'displayname';
        if (!this.valueField) 
            this.valueField = 'cssFile';
        if (!this.value)
            this.value = this.store.getAt(this.defaultTheme).get(this.valueField);
        
        this.on('select',this.changeTheme);
        
        this.loadPreThemes();
        this.changeTheme(this, this.store.getAt(this.defaultTheme),this.defaultTheme);
        this.loadPostThemes();
    }

});