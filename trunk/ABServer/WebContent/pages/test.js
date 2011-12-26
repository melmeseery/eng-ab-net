Ext.onReady(function(){

    Ext.QuickTips.init();
    Ext.form.Field.prototype.msgTarget = 'side';
    
    /*
     * Ext.ux.Multiselect Example Code
     */
    var msForm = new Ext.form.FormPanel({
        title: 'MultiSelect Test',
        width:700,
        bodyStyle: 'padding:10px;',
        renderTo: 'multiselect',
        items:[{
            xtype:"multiselect",
            fieldLabel:"Multiselect<br />(Required)",
            name:"multiselect",
            dataFields:["code", "desc"], 
            valueField:"code",
            displayField:"desc",
            width:250,
            height:200,
            allowBlank:false,
            data:[[123,"One Hundred Twenty Three"],
                ["1", "One"], ["2", "Two"], ["3", "Three"], ["4", "Four"], ["5", "Five"],
                ["6", "Six"], ["7", "Seven"], ["8", "Eight"], ["9", "Nine"]],
            tbar:[{
                text:"clear",
                handler:function(){
	                msForm.getForm().findField("multiselect").reset();
	            }
            }]
        }],
        tbar:[{
            text: 'Options',
            menu: [{
	            text:"Set Value (2,3)",
	            handler: function(){
	                msForm.getForm().findField("multiselect").setValue("2,3");
	            }
	        },{
	            text:"Toggle Enabled",
	            handler: function(){
	                var m=msForm.getForm().findField("multiselect");
	                if (!m.disabled)m.disable();
	                else m.enable();
	            }
            }]
        }],
        
        buttons: [{
            text: 'Save',
            handler: function(){
                if(msForm.getForm().isValid()){
	                Ext.Msg.alert('Submitted Values', 'The following will be sent to the server: <br />'+ 
	                    msForm.getForm().getValues(true));
                }
            }
        }]
    });
    
