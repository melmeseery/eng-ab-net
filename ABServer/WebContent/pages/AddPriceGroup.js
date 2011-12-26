/*
 * Ext JS Library 2.1
 * Copyright(c) 2006-2008, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */


Ext.apply(Ext.form.VTypes, {
  daterange: function(val, field) {
    var date = field.parseDate(val);
    
    // We need to force the picker to update values to recaluate the disabled dates display
     if(!date){
            return;
        }
        if (field.startDateField && (!this.dateRangeMax || (date.getTime() != this.dateRangeMax.getTime()))) {
            var start = Ext.getCmp(field.startDateField);
            start.maxValue = date;
           // start.validate();
            this.dateRangeMax = date;
        } 
        if (field.endDateField && (!this.dateRangeMin || (date.getTime() != this.dateRangeMin.getTime()))) {
            var end = Ext.getCmp(field.endDateField);
            end.minValue = date;
            //end.validate();
            this.dateRangeMin = date;
        }
		
    /* Always return true since we're only using this vtype
     * to set the min/max allowed values (these are tested
     * for after the vtype test)
     */
    return true;
  }
});





Ext.onReady(function(){

  	
	Ext.QuickTips.init();
    // turn on validation errors beside the field globally
    Ext.form.Field.prototype.msgTarget = 'side';

    var bd = Ext.getBody();
    
    /////////////////////////////////////////////////////////////////////
    var valid = 1;
     
  /*  dataProxy = new Ext.data.HttpProxy({
     	url: '../priceGroupAction.do',
     	method: 'POST', 
        headers:{'request-type':'ajax' }
      });

    */   
    /////////////////////////////////////////////////////////////////////
 
    /*
     * ================  Simple form  =======================
     */
    bd.createChild({tag: 'h2', html: ''});
    
    /*======================== Form Fields=========================*/
    var Currds=[['EGP','EGP'],['USD','USD'],['Euro','Euro']];
    
    var CurrFields = new Ext.form.ComboBox({
                       store: Currds,
                       id: 'currency',
                       allowBlank: false,
					    fieldLabel: 'Currency <html><font color=red> *</font></html>',
					    displayField:'currency',
					    typeAhead: true,
					    editable: false,
					    width:220,
					    triggerAction: 'all',
					    emptyText:'Select Currency ...',
					    selectOnFocus:true
		    });	
    
    var ImcField_Client = new Ext.form.NumberField({
      		fieldLabel: 'IMC Funded Rate <html><font color=red> *</font></html>',
      		allowBlank: false,
    		id:'priceGroupHitoryImcClient',
    		width:220,
    	//	maskRe: /([a-zA-Z0-9\s]+)$/
     		});
     var ImcField_Com = new Ext.form.NumberField({
      		fieldLabel: 'IMC Funded Rate <html><font color=red> *</font></html>',
      		allowBlank: false,
    		id:'priceGroupHitoryImcCompany',
    		width:220,
    	//	maskRe: /([a-zA-Z0-9\s]+)$/
     		});		
     var InternationalField = new Ext.form.NumberField({
      		fieldLabel: 'International Rate <html><font color=red> *</font></html>',
      		allowBlank: false,
      		width:220,
    		id:'priceGroupHitoryInternational',
    //		maskRe: /([a-zA-Z0-9\s]+)$/
     		});	
     		
      var PuplicField_Client = new Ext.form.NumberField({
		    id: 'priceGroupHitoryPulicClient',
		    fieldLabel: 'Local Common Rate <html><font color=red> *</font></html>',
		 //   maxLength: 20,
		    width:220,
		//    allowNegative: false,
		    allowBlank: false,
		//    maskRe: /([a-zA-Z0-9\s]+)$/
		      });
	 var PuplicField_Comp = new Ext.form.NumberField({
		    id: 'priceGroupHitoryPulicCompany',
		    fieldLabel: 'Local Common Rate <html><font color=red> *</font></html>',
		 //   maxLength: 20,
		    width:220,
		//    allowNegative: false,
		    allowBlank: false,
		//    maskRe: /([a-zA-Z0-9\s]+)$/
		      });      
	 var ValidFromField = new Ext.form.DateField({
			fieldLabel: 'Valid From <html><font color=red> *</font></html>',
                format: 'd-M-Y',
                minValue: '1960-01-01',
                width:220,
                id:'priceValidFrom',
                vtype: 'daterange',
                allowBlank: false,
            //    disabledDays: [5, 6],
             //   endDateField:'priceValidTo'
            });
    
    var ValidToField = new Ext.form.DateField({
			fieldLabel: 'Valid To',
                format: 'd-M-Y',
                minValue: '1960-01-01',
                width:220,
                id:'priceValidTo',
                vtype: 'daterange',
             //   disabledDays: [5, 6],
                startDateField:'priceValidFrom'
               
            });
//    var ValidField =           	    
    /*=================================================================*/
    var simple = new Ext.FormPanel({
        labelWidth: 150, // label settings here cascade unless overridden
     //   url:'../listCProperties',
        frame:true,
        title: 'Add Group Price',
        bodyStyle:'padding:5px 5px 0',
       // width: 350,
        defaults: {width: 440},
        defaultType: 'textfield',

        items: [   new Ext.form.FieldSet({
               // title: 'Contact Information',
                autoHeight: true,
                defaultType: 'textfield',
               // width:500,
               // border:false,
                items: [ new Ext.form.FieldSet({
                title: '@ Company Premises',
                autoHeight: true,
              //  width:500,
                defaultType: 'textfield',
                items:[ImcField_Com,PuplicField_Comp]}),
                new Ext.form.FieldSet({
                title: '@ Client Premises',
                autoHeight: true,
                defaultType: 'textfield',
                items:[ImcField_Client,PuplicField_Client]}),                	   
					   InternationalField,
					   CurrFields,
					   ValidFromField
        		   ]
        		/*   {xtype:'ux-radiogroup',
						fieldLabel:'Price Group Valid',
						//name:'group1',
						horizontal:true,
						radios:[{
							value:1,
							boxLabel:'Valid',
							listeners:{
								'check':function(r,c){
									valid = (c?1:0);//alert(r.boxLabel+": "+(c?"checked":"unchecked"));
								}
							},
							checked:true
						}, {
							value:0,
							boxLabel:'InValid'
						}]
					}*/
        		})]

       
    });
//  ////console.log("ana henaaaa")  
  
var pan= new Ext.TabPanel({
                    region:'center',
                     height:495, 
                     buttonAlign:'center',
        		
                    /* width:980,*/
        			renderTo: 'binding-example',
                    deferredRender:false,
                    activeTab:0,
                    items:[simple], buttons:[{ 
                text:'Save',
                formBind: true,  
                // Function that fires when user clicks the button 
                handler:function(){ 
                	var vF='3000-01-01';
                //	var vT='3000-01-01';
                	if(ValidFromField.getValue()!='')
                	{
                		vF=ValidFromField.getValue().format('Y-m-d');
                	}
//                	if(ValidToField.getValue()!='')
//                	{
//                		vT=ValidToField.getValue().format('Y-m-d');
//                	}
                    if(ImcField_Com.isValid() && PuplicField_Comp.isValid() &&  PuplicField_Client.isValid()  && ImcField_Client.isValid() && InternationalField.isValid()  && CurrFields.isValid() && ValidFromField.isValid())
                    {
                    simple.getForm().submit( 
                    	      Ext.Ajax.request({   
        						waitMsg: 'Please wait...',
        						url: '../listPriceHistory.do',
								params: {
								  task: "AddPriceGroup",
								  priceGroupHitoryImcClient:        	ImcField_Client.getValue(),
								  priceGroupHitoryImcCompany:        	ImcField_Com.getValue(),
								  priceGroupHitoryInternational:        InternationalField.getValue(),
								  priceGroupHitoryPublicClient:	       	PuplicField_Client.getValue(),
								  priceGroupHitoryPublicCompany:	   	PuplicField_Comp.getValue(),
								  priceGroupValidFrom:           		vF,
								  currency:								CurrFields.getValue()
							//	  priceGroupValidTo:	       			vT
							//	  valid:	       						valid
								},
						        method:'POST', 
						        success: function(response){ ////console.log("success");//alert(valid);
						        		 var redirect = 'priceGroupHistory.jsp'; 
		                        window.location = redirect;
      
						        },
						        failure: function(response){////console.log("faaaaaaaaaail");//alert(ValidFromField.getValue().format('Y-m-d'));
						        	simple.getForm().reset(); 
						       }                      
						      }));
                    }
                    else
                    {
                    	var errorMsg='Your Form is not valid!';
                			Ext.Msg.show({
							         title: 'Error', 
							        msg: errorMsg,
							        minWidth: 200,
							        modal: true,
							        icon: Ext.Msg.ERROR,
							        buttons: Ext.Msg.OK
								 });
                    }
                } 
            },{text:'Cancel',
            	handler:function(){window.location='priceGroupHistory.jsp';}
            	}
           ] });
function stcCallBack1001(record, opts, success) {
//if (success) 
//// do whatever
//alert("the sucess ");
//// alert (" number of records "+ds.getCount() +"  recourd "+ds.getAt(0)) ;
//////console.log("  LOOOOOOOOOOOOOOD ");

};
//loadtest=   ds.load({callback :  stcCallBack1001});
  //  simple.render(document.body);

   
});