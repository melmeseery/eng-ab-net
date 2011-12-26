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
    var dispUpd = function(picker) {
      var ad = picker.activeDate;
      picker.activeDate = null;
      picker.update(ad);
    };
    
    if (field.ValidFromField) {
      var sd = Ext.getCmp(field.ValidFromField);
      sd.maxValue = date;
      if (sd.menu && sd.menu.picker) {
        sd.menu.picker.maxDate = date;
        dispUpd(sd.menu.picker);
      }
    } else if (field.ValidToField) {
      var ed = Ext.getCmp(field.ValidToField);
      ed.minValue = date;
      if (ed.menu && ed.menu.picker) {
        ed.menu.picker.minDate = date;
        dispUpd(ed.menu.picker);
      }
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
    
     dataProxy = new Ext.data.HttpProxy({
     	url: '../listDataShows.do',
     	method: 'POST', 
        headers:{'request-type':'ajax' }
      });
var Datashowsmaintainance  = Ext.data.Record.create([
      {name: 'idDatashowsMaintainance', type: 'int'},
      {name: 'datashowsMaintainanceCost', type: 'string'},
      {name: 'datashowsMaintainanceDate', type: 'string'},
      {name: 'datashowsMaintainanceReason', type: 'string'}
      
     ]);

    var ds = new Ext.data.Store({
       // load using HTTP
      proxy: dataProxy,
       baseParams:{task: "DHistory"},  
      // the return will be XML, so lets set up a reader
      reader: new Ext.data.XmlReader({
        totalRecords: "results", // The element which contains the total dataset size (optional)
   		
   		record: "Datashowsmaintainance",           // The repeated element which contains row information
   		id: "idDatashowsMaintainance"
        },Datashowsmaintainance
        )
      });
  
  var Datashows  = Ext.data.Record.create([
      {name: 'idDatashows', type: 'int'},
      {name: 'datashowInfo', type: 'string'},
      {name: 'datashowName', type: 'string'},
      {name: 'datashowPrice', type: 'string'},
      {name: 'datashowPurchaseDate', type: 'string'},
      {name: 'datashowSalvageDate', type: 'string'},
      {name: 'datashowPurchaseValid', type: 'boolean'}
     ]);
     
    dataProxy = new Ext.data.HttpProxy({
     	url: '../listDataShows.do',
     	method: 'POST', 
        headers:{'request-type':'ajax' }
      });
	var d = new Ext.data.Store({
       // load using HTTP
      proxy: dataProxy,
       baseParams:{task: "datashows"},  
      // the return will be XML, so lets set up a reader
      reader: new Ext.data.XmlReader({
        totalRecords: "results", // The element which contains the total dataset size (optional)
   		
   		record: "Datashows",           // The repeated element which contains row information
   		id: "idDatashows"
        },Datashows
        )
      });
  d.load();

d.on('load', function(){//////console.log(Cds.getAt(0));
//alert(Cds.getAt(0));
var datashowRec = d.getAt(0);
NameField.setValue(datashowRec.get('datashowName'));
PriceField.setValue(datashowRec.get('datashowPrice'));
InfoField.setValue(datashowRec.get('datashowInfo'));
if(datashowRec.get('datashowSalvageDate') != '')
{
	DValidity.setValue('Salvaged');
	SlavageDateField.setValue(datashowRec.get('datashowSalvageDate'));
}
else
{
	DValidity.setValue('Working');
	SlavageDateField.disable();
}
PurchaseDateField.setValue(datashowRec.get('datashowPurchaseDate'));

});
  
    // example of custom renderer function
    function italic(value){
        return '' + value + '';
    }

    // example of custom renderer function
    function change(val){
        if(val > 0){
            return '' + val + '';
        }else if(val < 0){
            return '' + val + '';
        }
        return val;
    }
    // example of custom renderer function
    function pctChange(val){
        if(val > 0){
            return '' + val + '%';
        }else if(val < 0){
            return '' + val + '%';
        }
        return val;
    }

    // the DefaultColumnModel expects this blob to define columns. It can be extended to provide
    // custom or reusable ColumnModels
      var colModel = new Ext.grid.ColumnModel([
        {header: "Cost", width: 150, sortable: true, dataIndex: 'datashowsMaintainanceCost'},
        {header: "Date", width: 150, sortable: true, dataIndex: 'datashowsMaintainanceDate'},
        {header: "Reason", width: 150, sortable: true, dataIndex: 'datashowsMaintainanceReason'}
		
    ]);

 ds.on('add', function(){
	ds.reload();
//myGrid.getView().refresh();
  });
 
    var myGrid = new Ext.grid.GridPanel({
        ds: ds,
        cm: colModel,
        stripeRows: true,
        height:185,
        autoScroll:true,
      //  width:700,
        title:'Datashows Maintainance',
        tbar: [new Ext.Toolbar.Button({
             text: 'Add Datashow Maintainance',
             iconCls:'add',
             handler: displayFormWindow
             }),'-',new Ext.Toolbar.Button({
              text: 'Delete Selection',
              iconCls:'remove',
             handler: confirmDeleteCourses
              })
              ],
        selModel: new Ext.grid.RowSelectionModel({singleSelect:false})
 
    });

 myGrid.on("rowdblclick", function(myGrid) {
		 var sel = myGrid.getSelectionModel().getSelected();
        var selIndex = ds.indexOf(sel);
        var seldata=sel.data;

		displayEFormWindow();
		ECostField.setValue(seldata.datashowsMaintainanceCost);
		EDateField.setValue(seldata.datashowsMaintainanceDate);
		EReasonField.setValue(seldata.datashowsMaintainanceReason);
		
		
});

    /////////////////////////////////////////////////////////////////////
 
  /**---------------------------------------Add form------------------------------------------*/  
     var CostField = new Ext.form.TextField({
		    id: 'datashowsMaintainanceCost',
		    fieldLabel: 'Maintainance Cost <html><font color=red> *</font></html>',
		//    maxLength: 20,
		    width:220,
		    allowBlank: false,
		    maskRe: /([0-9\s]+)$/
		      });
		      
	 var DateField = new Ext.form.DateField({
			fieldLabel: 'Maintainance Date <html><font color=red> *</font></html>',
                format: 'd-M-Y',
                minValue: '1960-01-01',
                width:220,
              //  disabledDays: [5, 6],
                id: 'datashowsMaintainanceDate',
                allowBlank: false,
        		vtype: 'daterange',
        	//	requestDateField: 'requestdt'
            });
    
    var ReasonField = new Ext.form.TextArea({
			fieldLabel: 'Maintainance Reason <html><font color=red> *</font></html>',
                id:'datashowsMaintainanceReason',
            //   maxLength: 20,
		   		 width:220,
		   		 allowBlank: false,
		       maskRe: /([a-zA-Z0-9\s]+)$/
            });
 
 
 
   
  
 
    //////////////************adding form****************/////////////////
  //  var valid='Salary';
 //   var flag=true;
    var fs = new Ext.FormPanel({
        frame: true,
     //   title:'Add Coordinator History',
        //labelAlign: 'right',
        labelWidth: 90,
        width:340,
        waitMsgTarget: true,
        items: [
            new Ext.form.FieldSet({
               // title: 'Contact Information',
                autoHeight: true,
                defaultType: 'textfield',
                items: [ CostField,
					   DateField,
					   ReasonField
		                   ]
            })
        ],
         buttons:[{ 
                text:'Save',
                formBind: true,  
                // Function that fires when user clicks the button 
                handler:AddHistoryForm 
            },{text:'Cancel',
            	handler:function(){AddTAWindow.hide();}
            	}
           ] 
  
    });
  AddTAWindow= new Ext.Window({
      id: 'AddTAWindow',
      title: 'Adding a Datashow Maintainance',
      closable:false,
      width: 400,
      height: 250,
      plain:true,
      layout: 'fit',
      items: fs
    });

 //////////////********display form functions********************/////////////////   
    
   // reset the Form before opening it
  function resetCourseForm(){
    CostField.reset();
    DateField.reset();
    ReasonField.reset();
   
  }
  
  // check if the form is valid
  function isCourseFormValid(){
  return(ReasonField.isValid() && DateField.isValid() && CostField.isValid());
  }
  
  // display or bring forth the form
  function displayFormWindow(){
  if(!AddTAWindow.isVisible()){
    resetCourseForm();
    AddTAWindow.show();
  } else {
    AddTAWindow.toFront();
  }
  
  
  }
    /////////////////adding history function/////////////////////
  function AddHistoryForm(){
  var d='3000-01-01';
  if(DateField.getValue() !='')
  	d=DateField.getValue().format('Y-m-d');
   if(CostField.isValid()  && DateField.isValid() && ReasonField.isValid()){
      Ext.Ajax.request({   
        waitMsg: 'Please wait...',
        url: '../listDataShows.do',
        params: {
          task: "AddHistory",
           datashowsMaintainanceCost:			CostField.getValue() ,
		   datashowsMaintainanceDate:   		d,
		   datashowsMaintainanceReason:	    	ReasonField.getValue()
        },
        method:'POST', 
        success: function(response){        
			if(d=='3000-01-01')
				d='';
			else
				d=DateField.getValue().format('d-M-Y');
			 var record = new Ext.data.Record({
						    	  datashowsMaintainanceCost:			CostField.getValue() ,
								  datashowsMaintainanceDate:   			d,
								  datashowsMaintainanceReason:	    	ReasonField.getValue()
						    });  
						    ds.add(record);  
						    AddTAWindow.hide();  
              
        },
        failure: function(response){
          var result=response.responseText;
          Ext.MessageBox.alert('error',result+'  could not connect to the database. retry later');          
        }                      
      });
    } else {
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
    /////////////////////////////////////////////////////////////////////
    
    /**---------------------------------------Edit form------------------------------------------*/  
     var ECostField = new Ext.form.NumberField({
		    id: 'EdatashowsMaintainanceCost',
		    fieldLabel: 'Maintainance Cost <html><font color=red> *</font></html>',
		//    maxLength: 20,
		    width:220,
		    allowBlank: false,
		//    maskRe: /([a-zA-Z0-9\s]+)$/
		      });
		      
	 var EDateField = new Ext.form.DateField({
			fieldLabel: 'Maintainance Date <html><font color=red> *</font></html>',
                format: 'd-M-Y',
                minValue: '1960-01-01',
                width:220,
             //   disabledDays: [5, 6],
                id: 'EdatashowsMaintainanceDate',
                allowBlank: false,
        		vtype: 'daterange',
        	//	requestDateField: 'requestdt'
            });
    
    var EReasonField = new Ext.form.TextArea({
			fieldLabel: 'Maintainance Reason <html><font color=red> *</font></html>',
                id:'EdatashowsMaintainanceReason',
            //   maxLength: 20,
		   		 width:220,
		   		 allowBlank: false,
		       maskRe: /([a-zA-Z0-9\s]+)$/
            });
 
 
 
   
  
 
    //////////////************adding form****************/////////////////
  //  var valid='Salary';
 //   var flag=true;
    var Efs = new Ext.FormPanel({
        frame: true,
     //   title:'Add Coordinator History',
        //labelAlign: 'right',
        labelWidth: 90,
        width:340,
        waitMsgTarget: true,
        items: [
            new Ext.form.FieldSet({
               // title: 'Contact Information',
                autoHeight: true,
                defaultType: 'textfield',
                items: [ ECostField,
					   EDateField,
					   EReasonField
		                   ]
            })
        ],
         buttons:[{ 
                text:'Save',
                formBind: true,  
                // Function that fires when user clicks the button 
                handler:EditHistoryForm 
            },{text:'Cancel',
            	handler:function(){EditDMWindow.hide();}
            	}
           ] 
  
    });
  EditDMWindow= new Ext.Window({
      id: 'EditDMWindow',
      title: 'Edit Datashow Maintainance',
      closable:false,
      width: 400,
      height: 250,
      plain:true,
      layout: 'fit',
      items: Efs
    });

 //////////////********display form functions********************/////////////////   
    
   // reset the Form before opening it
  function resetForm(){
    ECostField.reset();
    EDateField.reset();
    EReasonField.reset();
   
  }
  
  // check if the form is valid
  function isFormValid(){
  return(EReasonField.isValid() && EDateField.isValid() && ECostField.isValid());
  }
  
  // display or bring forth the form
  function displayEFormWindow(){
  if(!EditDMWindow.isVisible()){
    resetForm();
    EditDMWindow.show();
  } else {
    EditDMWindow.toFront();
  }
  
  
  }
    /////////////////edit history function/////////////////////
  function EditHistoryForm(){
  	var d='3000-01-01';
  var selections = myGrid.selModel.getSelections();
         var selectedCourse = [];
         for(i = 0; i< myGrid.selModel.getCount(); i++){
          selectedCourse.push(selections[i].id);}
          if(EDateField.getValue() != '')
          	d=EDateField.getValue().format('Y-m-d')
   if(ECostField.isValid()  && EDateField.isValid() && EReasonField.isValid()){//alert(d);
      Ext.Ajax.request({   
        waitMsg: 'Please wait...',
        url: '../listDataShows.do',
        params: {
          task: "EditHistory",
           id:selections[0].id,
           datashowsMaintainanceCost:			ECostField.getValue() ,
		   datashowsMaintainanceDate:   		d,
		   datashowsMaintainanceReason:	    	EReasonField.getValue()
        },
        method:'POST', 
        success: function(response){        

			
						    ds.reload();  
						    EditDMWindow.hide();  
              
        },
        failure: function(response){
          var result=response.responseText;
          Ext.MessageBox.alert('error',result+'  could not connect to the database. retry later');          
        }                      
      });
    } else {
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
     
   
    /*
     * ================  Simple form  =======================
     */
    bd.createChild({tag: 'h2', html: ''});
    
    /*======================== Form Fields=========================*/
    
    var NameField = new Ext.form.TextField({
      		fieldLabel: 'Name <html><font color=red> *</font></html>',
      		allowBlank: false,
    		id:'datashowName',
    		width:200,
    		maskRe: /([a-zA-Z0-9\s]+)$/
     		});
     		
     var PriceField = new Ext.form.NumberField({
      		fieldLabel: 'Price <html><font color=red> *</font></html>',
      		allowBlank: false,
    		id:'datashowPrice',
    		width:200,
    //		maskRe: /([a-zA-Z0-9\s]+)$/
     		});	
     		
      var InfoField = new Ext.form.TextArea({
		    id: 'datashowInfo',
		    fieldLabel: 'Information',
	//	    maxLength: 20,
		    width:200,
		//    allowNegative: false,
		  //  allowBlank: false,
		    maskRe: /([a-zA-Z0-9\s]+)$/
		      });
		      
	 var SlavageDateField = new Ext.form.DateField({
			fieldLabel: 'Salvage Date',
                format: 'd-M-Y',
                minValue: '06-01-01',
              //  disabledDays: [5, 6],
                width:200,
                id: 'datashowSalvageDate',
        		vtype: 'daterange',
        	//	disable:true
        	//	requestDateField: 'requestdt'
            });
    
    var PurchaseDateField = new Ext.form.DateField({
			fieldLabel: 'Purchase Date <html><font color=red> *</font></html>',
                format: 'd-M-Y',
                id:'datashowPurchaseDate',
                minValue: '06-01-01',
                allowBlank: false,
                width:200,
                vtype: 'daterange',
             //   disabledDays: [5, 6]
               
            });
           var vDS=[['Working','Working'],['Salvaged','Salvaged']]; 
          var DValidity = new Ext.form.ComboBox({
                       store: vDS,
                    //   id: 'courseType',
					    fieldLabel: 'Datashow Validity',
					  //  displayField:'courseTypeName',
					    typeAhead: true,
					    editable: false,
					    width:200,
					    triggerAction: 'all',
					    emptyText:'Select...',
					    selectOnFocus:true,
					    listeners: {
	     				select: function (combo, record, index) {
	    	
	    				type = this.getValue();
	    				if(type=='Working')
	    				{
	    					SlavageDateField.disable();
	    					SlavageDateField.reset();
	    				}
	    				else if(type=='Salvaged')
	    				{
	    					SlavageDateField.enable();
	    					SalvageDateField.reset();
	    				}
	    				
	    			 }}
					   
		    });       
   // var valid =1;   
            	    
    /*=================================================================*/
    var simple = new Ext.FormPanel({
        labelWidth: 150, // label settings here cascade unless overridden
     //   url:'../listCProperties',
        frame:true,
        title: 'Edit Datashow',
        bodyStyle:'padding:5px 5px 0',
      //  width: 600,
      //  autoScroll:true,
        defaults: {width: 541},
        defaultType: 'textfield',

        items: [ new Ext.form.FieldSet({
             autoHeight: true,
             title:"DataShow Details",
                defaultType: 'textfield',
                items:[
        		   NameField,
        		   PriceField,
        		   PurchaseDateField,
        		   InfoField,
        		   DValidity,
        		   SlavageDateField,
        		   myGrid] })
        		
        		   
        		]

        
    });
//  ////console.log("ana henaaaa")  
  
 var pan= new Ext.TabPanel({
                    region:'center',
                     height:495, 
                           /* width:980,*/
        			renderTo: 'binding-example',
                    deferredRender:false,
                    activeTab:0,
                    buttonAlign:'center',
                    items:[simple],
					buttons:[{ 
                text:'Save',
                formBind: true,  
                // Function that fires when user clicks the button 
                handler:function(){ 
                	var d='3000-01-01';
                	var d2='3000-01-01';
                	if(SlavageDateField.getValue() != '')
                		d=SlavageDateField.getValue().format('Y-m-d');
                		
                	if(PurchaseDateField.getValue() != '')
                		d2=PurchaseDateField.getValue().format('Y-m-d');
                	 if(NameField.isValid() && PriceField.isValid() && PurchaseDateField.isValid())
               		{
                    	simple.getForm().submit( 
                    	      Ext.Ajax.request({   
        						waitMsg: 'Please wait...',
        						url: '../listDataShows.do',
								params: {
								  task: "EditDatashow",
								  datashowName:		        			NameField.getValue() ,
								  datashowPrice:				        PriceField.getValue(),
								  datashowInfo:				       		InfoField.getValue(),
								  valid:								DValidity.getValue(),
								  datashowSalvageDate:           		d,
								  datashowPurchaseDate:	       			d2
							
								},
						        method:'POST', 
						        success: function(response){ ////console.log("success");//alert(valid);
						        		 var redirect = 'datashows.jsp'; 
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
            	handler:function(){window.location='datashows.jsp';}
            	}
           ]});
 /********************************************************************/
 
  ////////////////////delete selection record(s)//////////////////////////////
  var selections = myGrid.selModel.getSelections();
  var selectedCourse = [];
  for(i = 0; i< myGrid.selModel.getCount(); i++){
    selectedCourse.push(selections[i].xml.idDatashowsMaintainance);
  }
 
  
  function confirmDeleteCourses(){
    if(myGrid.selModel.getCount() == 1) // only one president is selected here
    {
      Ext.MessageBox.confirm('Confirmation','Are you sure you want to delete this History?', deleteCourses);
    } else if(myGrid.selModel.getCount() > 1){
      Ext.MessageBox.confirm('Confirmation','Are you sure you want to delete those Histories?', deleteCourses);
    } else {
      Ext.MessageBox.alert('Uh oh...','You can\'t really delete something you haven\'t selected huh?');
    }
  }
  
  function deleteCourses(btn){
    if(btn=='yes'){
         var selections = myGrid.selModel.getSelections();
         var selectedCourse = [];
         for(i = 0; i< myGrid.selModel.getCount(); i++){
          selectedCourse.push(selections[i].id);
        //  alert("ssssssssssssss>>>>>> "+selections[i].id);
         }
         
         Ext.Ajax.request({  
            waitMsg: 'Please Wait',
            url: '../listDataShows.do', 
            params: { 
               task: "DELETE", 
               ids:  selectedCourse
              }, method:'POST',
            success: function(response){
              var result=1;
              switch(result){
              case 1:  // Success : simply reload
                ds.reload();
                break;
              default:
                Ext.MessageBox.alert('Warning','Could not delete the entire selection.');
                break;
              }
            },
            failure: function(response){
              var result=response.responseText;
              Ext.MessageBox.alert('error','could not connect to the database. retry later');      
              }
         });
      }  
  }
  
  
  //////////////////////////FINISH DELETING//////////////////////////////////////////
                    
function stcCallBack1001(record, opts, success) {
//if (success) 
//// do whatever
//alert("the sucess ");
//alert (" number of records "+ds.getCount() +"  recourd "+ds.getAt(0)) ;
////console.log("  LOOOOOOOOOOOOOOD ");

};
loadtest=   ds.load({callback :  stcCallBack1001});
  simple.render(document.body);

   
});