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
    
    
	var Expensescategories  = Ext.data.Record.create([
      {name: 'categoryName', type: 'string'},
      {name: 'categoryType', type: 'string'},
      {name: 'idExpensesCategories', type: 'int'},
      {name: 'categoryParentName', type: 'string'},
      {name: 'categoryParentId', type: 'int'}
     ]);
     
    dataProxy = new Ext.data.HttpProxy({
     	url: '../listExpCategories.do',
     	method: 'POST', 
        headers:{'request-type':'ajax' }
      });

    var ds = new Ext.data.Store({
       // load using HTTP
      proxy: dataProxy,
      baseParams:{task: "listC"},   
      // the return will be XML, so lets set up a reader
      reader: new Ext.data.XmlReader({
        totalRecords: "results", // The element which contains the total dataset size (optional)
   		record: "Expensescategories",           // The repeated element which contains row information
   		id: "idExpensesCategories"
        },Expensescategories
        )
      });
  
 ds.load();
 var categoryParentId;
//alert("???????");
ds.on('load', function(){//alert("ay 7agaaaaaa");
//alert(ds.getAt(0));
var catRec = ds.getAt(0);
CatNameField.setValue(catRec.get('categoryName'));
CTypeField.setValue(catRec.get('categoryType'));
if(catRec.get('categoryParentName')!='')
{
	CategoriesField.setValue(catRec.get('categoryParentName'));
	categoryParentId=catRec.get('categoryParentId');
}
else
{
	CategoriesField.reset();
	CategoriesField.disable();
}
});
  
  
var Expensesitem  = Ext.data.Record.create([
      {name: 'idExpensesItem', type: 'int'},
      {name: 'expenseItemCost', type: 'int'},
      {name: 'expenseItemName', type: 'string'},
      {name: 'expenseItemType', type: 'string'},
      {name: 'expenseItemValidFrom', type: 'string'},
      {name: 'expenseItemValidTo', type: 'string'},
      {name: 'expenseItemValid', type: 'boolean'},
      {name: 'expenseItemCurrentStock', type: 'string'}
      
     ]);
 dataProxy = new Ext.data.HttpProxy({
     	url: '../listExpCategories.do',
     	method: 'POST', 
        headers:{'request-type':'ajax' }
      });
    var Eds = new Ext.data.Store({
       // load using HTTP
      proxy: dataProxy,
       baseParams:{task: "listEI"},  
      // the return will be XML, so lets set up a reader
      reader: new Ext.data.XmlReader({
        totalRecords: "results", // The element which contains the total dataset size (optional)
   		
   		record: "Expensesitem",           // The repeated element which contains row information
   		id: "idExpensesItem"
        },Expensesitem
        )
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
        {header: "Name", width: 100, sortable: true, dataIndex: 'expenseItemName'},
        {header: "Type", width: 100, sortable: true, dataIndex: 'expenseItemType'},
    //    {header: "Cost", width: 100, sortable: true, dataIndex: 'expenseItemCost'},
     //   {header: "CurrentStock", width: 120, sortable: true, dataIndex: 'expenseItemCurrentStock'},
        {header: "Valid From", width: 120, sortable: true, dataIndex: 'expenseItemValidFrom'},
        {header: "Valid To", width: 120, sortable: true, dataIndex: 'expenseItemValidTo'},
       
		
    ]);

 Eds.on('add', function(){
	Eds.reload();
//myGrid.getView().refresh();
  });
// Eds.load();
    var myGrid = new Ext.grid.GridPanel({
        ds: Eds,
        cm: colModel,
        stripeRows: true,
        autoScroll:true,
        height:300,
        width:700,
        autoScroll:true,
        title:'Expenses Items',
        tbar: [new Ext.Toolbar.Button({
             text: 'Add Item',
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

		displayEditWindow();
		INameField.setValue(seldata.expenseItemName);
		ITypeField.setValue(seldata.expenseItemType);
//		ICostField.setValue(seldata.expenseItemCost);
//		if(seldata.expenseItemType=='Per Day' || seldata.expenseItemType=='Per Night')
//			IStockField.disable();
//		else
//			IStockField.setValue(seldata.expenseItemCurrentStock);
		IValidFromField.setValue(seldata.expenseItemValidFrom);
		IValidToField.setValue(seldata.expenseItemValidTo);
		
});
    /////////////////////////////////////////////////////////////////////
     var Itemsds=[['0','Per Person'],['1','Per Unit'],['2','Per Day'],['3','Per Night']];
    var ItemsDS = new Ext.data.SimpleStore({
        fields: ['id','name'],
        data: Itemsds
    }); 
    
     var NameField = new Ext.form.TextField({
      		fieldLabel: 'Name <html><font color=red> *</font></html>',
      		allowBlank: false,
    		id:'expenseItemName',
    		width:200,
    		maskRe: /([a-zA-Z0-9\s]+)$/
     		});
     		
     var TypeField = new Ext.form.ComboBox({
      	//	id: 'menuItemTypePer',
		    fieldLabel: 'Type <html><font color=red> *</font></html>',
		    store: ItemsDS,
			displayField:'name',
			valueField:'name',
			typeAhead: true,
			allowBlank: false,
			editable: false,
			width:220,
			mode: 'local',
			triggerAction: 'all',
			emptyText:'Select a Type...',
			selectOnFocus:true,
			   listeners: {
	     				select: function (combo, record, index) {
	    	
	    				type = this.getValue();
//	    				if(type=='Per Day')
//	    				{
//	    					StockField.disable();
//	    					StockField.reset();
//	    				}
//	    				else if(type=='Per Night')
//	    				{
//	    					StockField.disable();
//	    					StockField.reset();
//	    				}
//	    				else 
//	    					StockField.enable();
	    			
	    			 }}
     		});	
     		
      var CostField = new Ext.form.TextField({
		    id: 'expenseItemCost',
		    fieldLabel: 'Cost',
		//    maxLength: 20,
		    width:200,
		//    allowNegative: false,
		    allowBlank: false,
		    maskRe: /([0-9\s]+)$/
		      });
	 var StockField = new Ext.form.TextField({
		    id: 'expenseItemCurrentStock',
		    fieldLabel: 'Current Stock',
	//	    maxLength: 20,
		    width:200,
		//    allowNegative: false,
		    allowBlank: false,
		    maskRe: /([0-9\s]+)$/
		      });
		      	      
	 var ValidFromField = new Ext.form.DateField({
			fieldLabel: 'Valid From <html><font color=red> *</font></html>',
                format: 'd-M-Y',
                minValue: '1960-01-01',
                width:200,
              //  disabledDays: [5, 6],
                id: 'expenseItemValidFrom',
        		vtype: 'daterange',
        		allowBlank: false,
		    
        		endDateField: 'expenseItemValidTo'
            });
    
    
    var ValidToField = new Ext.form.DateField({
			fieldLabel: 'Valid To',
                format: 'd-M-Y',
                minValue: '1960-01-01',
                width:200,
                id:'expenseItemValidTo',
                vtype: 'daterange',
              //  disabledDays: [5, 6],
                startDateField:'expenseItemValidFrom'
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
                items: [ NameField,
					   TypeField,
					//   CostField,
					//   StockField,
					   ValidFromField,
					 //  ValidToField
					   
		                   ]
            })
        ],
         buttons:[{ 
                text:'Save',
                formBind: true,  
                // Function that fires when user clicks the button 
                handler:AddTAForm
            },{text:'Cancel',
            	handler:function(){AddTAWindow.hide();}
            	}
           ] 
  
    });
  AddTAWindow= new Ext.Window({
      id: 'AddTAWindow',
      title: 'Adding an Expenses Item',
      closable:false,
      width: 400,
      height: 210,
      plain:true,
      layout: 'fit',
      items: fs
    });

 //////////////********display form functions********************/////////////////   
    
   // reset the Form before opening it
  function resetCourseForm(){
    NameField.reset();
    TypeField.reset();
 //   CostField.reset();
//   	StockField.reset();
    ValidFromField.reset();
   // ValidToField.reset();
    StockField.enable();
  }
  
  // check if the form is valid
  function isCourseFormValid(){
  return(NameField.isValid() && TypeField.isValid() && ValidFromField.isValid());
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

 function AddTAForm(){
  
   if(NameField.isValid() && TypeField.isValid() && ValidFromField.isValid()){//var x=StockField.getValue();
//   if(TypeField.getValue()=='Per Day' || TypeField.getValue()=='Per Night')
//   {
//   		x=0;
//   }
      Ext.Ajax.request({   
        waitMsg: 'Please wait...',
        url: '../listExpCategories.do',
        params: {
          task: "AddExItem",
							//	  expenseItemCost:		        		CostField.getValue() ,
								  expenseItemName:				        NameField.getValue(),
								  expenseItemType:				       	TypeField.getValue(),
							//	  expenseItemCurrentStock:				x,
								  expenseItemValidFrom:           		ValidFromField.getValue().format('Y-m-d'),
								 // expenseItemValidTo:	       			ValidToField.getValue().format('Y-m-d')
							  },
        method:'POST', 
        success: function(response){        

			 var record = new Ext.data.Record({
						    	//   expenseItemCost:		        		CostField.getValue() ,
								  expenseItemName:				        NameField.getValue(),
								  expenseItemType:				       	TypeField.getValue(),
								//  expenseItemCurrentStock:				x,
								  expenseItemValidFrom:           		ValidFromField.getValue().format('d-M-Y'),
								  //expenseItemValidTo:	       			ValidToField.getValue().format('d-M-Y'),
								  //expenseItemValid:						true
							  
						    });  
						    Eds.add(record);  
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
    
    ////////////////////////////////edit form/////////////////////////////////////
  
     var INameField = new Ext.form.TextField({
      		fieldLabel: 'Name <html><font color=red> *</font></html>',
      		allowBlank: false,
    //		id:'expenseItemName',
    		width:200,
    		maskRe: /([a-zA-Z0-9\s]+)$/
     		});
     		
    var ITypeField = new Ext.form.ComboBox({
      	//	id: 'menuItemTypePer',
		    fieldLabel: 'Type <html><font color=red> *</font></html>',
		    store: ItemsDS,
			displayField:'name',
			valueField:'name',
			typeAhead: true,
			editable: false,
			allowBlank: false,
			width:220,
			mode: 'local',
			triggerAction: 'all',
			emptyText:'Select a Type...',
			selectOnFocus:true,
			   listeners: {
	     				select: function (combo, record, index) {
	    	
	    				type = this.getValue();
//	    				if(type=='Per Day')
//	    				{
//	    					IStockField.disable();
//	    					IStockField.reset();
//	    				}
//	    				else if(type=='Per Night')
//	    				{
//	    					IStockField.disable();
//	    					IStockField.reset();
//	    				}
//	    				else 
//	    					IStockField.enable();
	    					
	    			 }}
     		});	
     		
      var ICostField = new Ext.form.TextField({
		//    id: 'expenseItemCost',
		    fieldLabel: 'Cost <html><font color=red> *</font></html>',
		//    maxLength: 20,
		    width:200,
		//    allowNegative: false,
		    allowBlank: false,
		    maskRe: /([0-9\s]+)$/
		      });
	 var IStockField = new Ext.form.TextField({
		//    id: 'expenseItemCurrentStock',
		    fieldLabel: 'Current Stock',
	//	    maxLength: 20,
		    width:200,
		//    allowNegative: false,
		    allowBlank: false,
		    maskRe: /([0-9\s]+)$/
		      });
		      	      
	 var IValidFromField = new Ext.form.DateField({
			fieldLabel: 'Valid From <html><font color=red> *</font></html>',
                format: 'd-M-Y',
                minValue: '1960-01-01',
                width:220,
                allowBlank: false,
              //  disabledDays: [5, 6],
                id: 'IexpenseItemValidFrom',
        		vtype: 'daterange',
        		endDateField: 'IexpenseItemValidTo'
            });
    
    
    var IValidToField = new Ext.form.DateField({
			fieldLabel: 'Valid To',
                format: 'd-M-Y',
                minValue: '1960-01-01',
                width:220,
                id:'IexpenseItemValidTo',
                vtype: 'daterange',
               // disabledDays: [5, 6],
                startDateField:'IexpenseItemValidFrom'
            });
 
 

    //////////////************adding form****************/////////////////
    var valid=1;
 //   var flag=true;
    var Ifs = new Ext.FormPanel({
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
                items: [ INameField,
					   ITypeField,
					//   ICostField,
					 //  IStockField,
					   IValidFromField,
					   IValidToField
		                   ]
            })
        ],
         buttons:[{ 
                text:'Save',
                formBind: true,  
                // Function that fires when user clicks the button 
                handler:EditItemForm
            },{text:'Cancel',
            	handler:function(){EditItemWindow.hide();}
            	}
           ] 
  
    });
  EditItemWindow= new Ext.Window({
      id: 'EditItemWindow',
      title: 'Edit Expenses Item',
      closable:false,
      width: 400,
      height: 230,
      plain:true,
      layout: 'fit',
      items: Ifs
    });

 //////////////********display form functions********************/////////////////   
    
   // reset the Form before opening it
  function resetItemForm(){
    INameField.reset();
    ITypeField.reset();
  //  ICostField.reset();
  // 	IStockField.reset();
    IValidFromField.reset();
 //   IValidToField.reset();
  }
  
  // check if the form is valid
  function isEditFormValid(){
  return(INameField.isValid() && ITypeField.isValid() && IValidFromField.isValid());
  }
  
  // display or bring forth the form
  function displayEditWindow(){
  if(!EditItemWindow.isVisible()){
    resetItemForm();
    EditItemWindow.show();
  } else {
    EditItemWindow.toFront();
  }
  
  
  }

 function EditItemForm(){
  var x=IStockField.getValue();
  var d='3000-01-01';
  var d1='3000-01-01';
//   if(ITypeField.getValue()=='Per Day' || ITypeField.getValue()=='Per Night')
//   {
//   		x=0;
//   }
   if(INameField.isValid() && ITypeField.isValid() && IValidFromField.isValid()){
   var selections = myGrid.selModel.getSelections();
         var selectedCourse = [];
         for(i = 0; i< myGrid.selModel.getCount(); i++){
          selectedCourse.push(selections[i].id);}
         if(IValidFromField.getValue()!='')
         	d=IValidFromField.getValue().format('Y-m-d');
         if(IValidToField.getValue()!='')
         	d1=IValidToField.getValue().format('Y-m-d');	
    //     alert(selections[0].id)
      Ext.Ajax.request({   
        waitMsg: 'Please wait...',
        url: '../listExpCategories.do',
        params: {
          task: "EditExItem",
          id:selections[0].id,
		//  expenseItemCost:		        		ICostField.getValue() ,
		  expenseItemName:				        INameField.getValue(),
		  expenseItemType:				       	ITypeField.getValue(),
	//	  expenseItemCurrentStock:				x,
		  expenseItemValidFrom:           		d,
		  expenseItemValidTo:	       			d1
	//	  expenseItemValid:						valid
				},
        method:'POST', 
        success: function(response){        

						    Eds.reload();  
						    EditItemWindow.hide();  
              
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
    
    //////////////////////////////////////////////////////////////////////////////
    
       bd.createChild({tag: 'h2', html: ''});
    
    /*======================== Form Fields=========================*/
    var valid =1;  
 	var CatNameField;
 	var Typeds=[['Parent','Parent'],['Sub Category','Sub Category']];
  dataProxy = new Ext.data.HttpProxy({
     	url: '../listExpCategories.do',
     	method: 'POST', 
        headers:{'request-type':'ajax' }
      });

    var Catds = new Ext.data.GroupingStore({
       // load using HTTP
      proxy: dataProxy,
    //  groupField:'categoryParentName',
      baseParams:{task: "listPar"},   
      // the return will be XML, so lets set up a reader
      reader: new Ext.data.XmlReader({
        totalRecords: "results", // The element which contains the total dataset size (optional)
   		record: "Expensescategories",           // The repeated element which contains row information
   		id: "idExpensesCategories"
        },Expensescategories
        )
      });
  CatNameField = new Ext.form.TextField({
    id: 'categoryName',
    fieldLabel: 'Category Name <html><font color=red> *</font></html>',
 //   maxLength: 20,
    width:200,
    allowBlank: false,
   // anchor : '95%',
    maskRe: /([a-zA-Z0-9\s]+)$/
      });
      
  var CTypeField = new Ext.form.ComboBox({
                       store: Typeds,
                       id: 'categoryType',
					    fieldLabel: 'Category Type <html><font color=red> *</font></html>',
					    displayField:'categoryType',
					    typeAhead: true,
					    editable: false,
					    allowBlank: false,
					    width:200,
					    triggerAction: 'all',
					    allowBlank: false,
					    emptyText:'Select a Type...',
					    selectOnFocus:true,
					    listeners: {
	     				select: function (combo, record, index) {
	    	
	    				type = this.getValue();
	    				if(type=='Parent')
	    				{
	    					CategoriesField.reset();
	    					CategoriesField.disable();
	    				}
	    					
	    				else if(type=='Sub Category')
	    					CategoriesField.enable();
	    				
	    			 }}
					   
		    });	
		    Catds.load();   
  	var CategoriesField = new Ext.form.ComboBox({
                       store: Catds,
                    //   id: 'categoryName',
					    fieldLabel: 'Parent Name <html><font color=red> *</font></html>',
					    displayField:'categoryName',
					    valueField:'idExpensesCategories',
					    typeAhead: true,
					    editable: false,
					    allowBlank: false,
					    width:200,
					    triggerAction: 'all',
					    emptyText:'Select Category...',
					    selectOnFocus:true,
					    listeners: {
						     select: function (combo, record, index) {
						    	
						    	categoryParentId = this.getValue();
						     }}
					   
		    });	    
  
   
    /*
     * ================  Simple form  =======================
     */
 
  
          	    
    /*=================================================================*/
    var simple = new Ext.FormPanel({
        labelWidth: 150, // label settings here cascade unless overridden
     //   url:'../listCProperties',
        frame:true,
        title: 'Edit Expenses Category',
        bodyStyle:'padding:5px 5px 0',
   //     width: 1000,
        defaults: {width: 700},
        defaultType: 'textfield',
		//height:500,
        items: [new Ext.form.FieldSet({
             autoHeight: true,
             title:"Category Details",
                defaultType: 'textfield',
                items:[
        		   CatNameField,
        		   CTypeField,
        		   CategoriesField,
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
                handler:function(){ //alert(categoryParentId)
                if( CatNameField.isValid() && CTypeField.isValid() && CategoriesField.isValid())
                {
                  simple.getForm().submit( 
                    	      Ext.Ajax.request({   
        						waitMsg: 'Please wait...',
        						url: '../listExpCategories.do',
								params: {
								  task: "EditCat",
								  categoryName:		  CatNameField.getValue(), 
								  categoryType:		 CTypeField.getValue(),
          						  categoryParentId:  categoryParentId	 
								},
						        method:'POST', 
						        success: function(response){ ////console.log("success");//alert(valid);
						        		 var redirect = 'expensesCategory.jsp'; 
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
            	handler:function(){window.location='expensesCategory.jsp';}
            	}
           ]});
           
/********************************************************************/
 
  ////////////////////delete selection record(s)//////////////////////////////
  var selections = myGrid.selModel.getSelections();
  var selectedCourse = [];
  for(i = 0; i< myGrid.selModel.getCount(); i++){
    selectedCourse.push(selections[i].xml.idExpensesItem);
  }
 
  
  function confirmDeleteCourses(){
    if(myGrid.selModel.getCount() == 1) // only one president is selected here
    {
      Ext.MessageBox.confirm('Confirmation','Do you not like that Item at all?', deleteCourses);
    } else if(myGrid.selModel.getCount() > 1){
      Ext.MessageBox.confirm('Confirmation','Are you sure you want to delete those Items?', deleteCourses);
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
       //  alert(Tname);
         Ext.Ajax.request({  
            waitMsg: 'Please Wait',
            url: '../listExpCategories.do', 
            params: { 
               task: "DELETE", 
            //   Tname:Tname, 
               ids:  selectedCourse
              }, method:'POST',
            success: function(response){
              var result=1;
              switch(result){
              case 1:  // Success : simply reload
                Eds.reload();
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

 loadtest=   Eds.load({callback :  stcCallBack1001});
//loadtest1=   Eds.load({callback :  stcCallBack1001});
  simple.render(document.body);  
});