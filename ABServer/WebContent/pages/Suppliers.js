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

Ext.onReady(function() {

    Ext.form.Field.prototype.msgTarget = 'side';

    var bd = Ext.getBody();

	var Suppliers  = Ext.data.Record.create([
      {name: 'expensesCatName', type: 'string'},
      {name: 'supplierAddress', type: 'string'},
      {name: 'supplierMobile', type: 'string'},
      {name: 'supplierName', type: 'string'},
      {name: 'supplierPhone', type: 'string'},
      {name: 'idSupplier',type:'int'}

     ]);
     
    dataProxy = new Ext.data.HttpProxy({
     	url: '../listSuppliers.do',
     	method: 'POST', 
        headers:{'request-type':'ajax' }
      });

    var ds = new Ext.data.Store({
       // load using HTTP
      proxy: dataProxy,
      baseParams:{task: "list"},  
      // the return will be XML, so lets set up a reader
      reader: new Ext.data.XmlReader({
        totalRecords: "results", // The element which contains the total dataset size (optional)
   		record: "Suppliers",           // The repeated element which contains row information
   		id: "idSupplier"
        },Suppliers
        ),
        sortInfo:{field: "supplierName", direction: "ASC"}
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
        {header: "Supplier Name", width: 120, sortable: true, locked:false, dataIndex: 'supplierName'}, 
        {header: "Supplier Phone", width: 120, sortable: true, dataIndex: 'supplierPhone'},
		{header: "Supplier Fax", width: 120, sortable: true, dataIndex: 'supplierMobile'},
        {header: "Supplier Address", width: 120, sortable: true, dataIndex: 'supplierAddress'}
    ]);

ds.on('add', function(){
	ds.reload();
//myGrid.getView().refresh();
   });
 
    var myGrid = new Ext.grid.GridPanel({
        ds: ds,
        cm: colModel,
        stripeRows: true,
       height:395, 
       autoScroll:true,
                // renderTo: 'binding-example',
         width:550,
        title:'Suppliers',
        tbar: [new Ext.Toolbar.Button({
             text: 'Add Supplier',
             iconCls:'add',
              handler: displayFormWindow
             }),'-',new Ext.Toolbar.Button({
              text: 'Delete Selection',
              iconCls:'remove',
              handler: confirmDeleteCourses
              })],
        selModel: new Ext.grid.RowSelectionModel({singleSelect:false})
 
    });

   myGrid.on("rowdblclick", function(myGrid) {
/*	 var sel = myGrid.getSelectionModel().getSelected();
        var selIndex = ds.indexOf(sel);
        var seldata=sel.data;
        Ext.MessageBox.show({
			title: 'Course Details',
			msg: 'Course Name: '+seldata.courseNameEng+' '+'Training Area: '+seldata.trainingArea+' Trainer Name: '+seldata.trainerName,
			width:185,
			buttons: Ext.MessageBox.OK
});*/var sel = myGrid.getSelectionModel().getSelected();
        var selIndex = ds.indexOf(sel);
        var seldata=sel.data;

		editFormWindow();
		ENameField.setValue(seldata.supplierName);
		EAddressField.setValue(seldata.supplierAddress);
		EPhoneField.setValue(seldata.supplierPhone);
		EMobileField.setValue(seldata.supplierMobile);
		
});

 myGrid.on("rowclick", function(myGrid) {
	     var selections = myGrid.selModel.getSelections();
         var selectedCourse = [];
         x=0;
         for(i = 0; i< myGrid.selModel.getCount(); i++){
          selectedCourse.push(selections[i].id);
        //  alert("ssssssssssssss>>>>>> "+selections[i].id);
         }
		  Ext.Ajax.request({   
        waitMsg: 'Please wait...',
        url: '../listSuppliers.do',
        params: {
          task: "check",
          id:selections[0].id
        },
        method:'POST', 
        success: function(response){        

			 Sds.reload();
        },
        failure: function(response){
          var result=response.responseText;
          Ext.MessageBox.alert('error',result+'  could not connect to the database. retry later');          
        }                      
      });
		
});  


 ////////////////////adding new record//////////////////////////////
  var AddSupplierForm;
  var AddSupplierWindow;
  
  var NameField;
  var PhoneField;
  var MobileField;
  var AddressField;
  
   	NameField = new Ext.form.TextField({
		    id: 'supplierName',
		    fieldLabel: 'Name <html><font color=red> *</font></html>',
		//    maxLength: 20,
		    width:220,
		    allowBlank: false,
		    maskRe: /([a-zA-Z0-9\s]+)$/
		      });
		      
	 AddressField = new Ext.form.TextField({
			id: 'supplierAddress',
		    fieldLabel: 'Address',
		//    maxLength: 20,
		    width:220,
		 //   allowBlank: false,
		//    maskRe: /([a-zA-Z0-9\s]+)$/
            });
    
   	PhoneField = new Ext.form.TextField({
			fieldLabel: 'Phone <html><font color=red> *</font></html>',
      		allowBlank: false,
      		width:220,
    		id:'supplierPhone',
    		maskRe: /([0-9\s]+)$/
            });
   	MobileField = new Ext.form.TextField({
			fieldLabel: 'Fax',
      		//allowBlank: false,
      		width:220,
    		id:'supplierMobile',
    		maskRe: /([0-9\s]+)$/
            });
 
 
   
  
 
    //////////////************adding form****************/////////////////
   // var valid='Salary';
    var flag=true;
    var fs = new Ext.FormPanel({
        frame: true,
     //   title:'Add Coordinator History',
        //labelAlign: 'right',
        labelWidth: 90,
        width:500,
        waitMsgTarget: true,
        items: [
            new Ext.form.FieldSet({
               // title: 'Contact Information',
                autoHeight: true,
                defaultType: 'textfield',
                items: [NameField,
                	   AddressField,
					   PhoneField,
					   MobileField
					   
		                   ]
            })
        ],
         buttons:[{ 
                text:'Save',
                formBind: true,  
                // Function that fires when user clicks the button 
                handler:AddSupplierForm
            },{text:'Cancel',
            	handler:function(){AddSupplierWindow.hide();}
            	}
           ] 
  
    });
  AddSupplierWindow= new Ext.Window({
      id: 'AddSupplierWindow',
      title: 'Add new supplier',
      closable:false,
      width: 400,
      height: 230,
      plain:true,
      layout: 'fit',
      items: fs
    });

 //////////////********display edit form functions********************/////////////////   
    
   // reset the Form before opening it
  function resetCourseForm(){
    NameField.reset();
    AddressField.reset();
    PhoneField.reset();
    MobileField.reset();
  }
  
  // check if the form is valid
  function isCourseFormValid(){
  return(NameField.isValid() && AddressField.isValid() && PhoneField.isValid() && MobileField.isValid());
  }
  
  // display or bring forth the form
  function displayFormWindow(){
  if(!AddSupplierWindow.isVisible()){
    resetCourseForm();
    AddSupplierWindow.show();
  } else {
    AddSupplierWindow.toFront();
  }
  
  
  }
    
    
  /////////////////adding course function/////////////////////
  function AddSupplierForm(){
  
   if(NameField.isValid() && AddressField.isValid() && PhoneField.isValid() && MobileField.isValid()){
      Ext.Ajax.request({   
        waitMsg: 'Please wait...',
        url: '../listSuppliers.do',
        params: {
          task: "AddSupplier",
          supplierMobile:		MobileField.getValue() ,
		  supplierPhone:   		PhoneField.getValue(),
		  supplierName:	    	NameField.getValue(),
		  supplierAddress:      AddressField.getValue()
        },
        method:'POST', 
        success: function(response){        

			 var record = new Ext.data.Record({
						    	  supplierMobile:		MobileField.getValue() ,
								  supplierPhone:   		PhoneField.getValue(),
								  supplierName:	    	NameField.getValue(),
								  supplierAddress:      AddressField.getValue()
						    });  
						    ds.add(record);  
						    AddSupplierWindow.hide();  
              
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
 
  //////////////************editing form****************/////////////////
   // var valid='Salary';
   
  var ENameField;
  var EPhoneField;
  var EMobileField;
  var EAddressField;
  
   	ENameField = new Ext.form.TextField({
	//	    id: 'supplierName',
		    fieldLabel: 'Name <html><font color=red> *</font></html>',
	//	    maxLength: 20,
		    width:220,
		    allowBlank: false,
		    maskRe: /([a-zA-Z0-9\s]+)$/
		      });
		      
	 EAddressField = new Ext.form.TextField({
		//	id: 'supplierAddress',
		    fieldLabel: 'Address',
		//    maxLength: 20,
		    width:220,
		//    allowBlank: false,
		//    maskRe: /([a-zA-Z0-9\s]+)$/
            });
    
   	EPhoneField = new Ext.form.NumberField({
			fieldLabel: 'Phone <html><font color=red> *</font></html>',
      		allowBlank: false,
      		width:220,
    //		id:'supplierPhone',
            });
   	EMobileField = new Ext.form.NumberField({
			fieldLabel: 'Fax',
      	//	allowBlank: false,
      		width:220,
    //		id:'supplierMobile',
            });
 
 
   
    var flag=true;
    var editForm = new Ext.FormPanel({
        frame: true,
     //   title:'Add Coordinator History',
        //labelAlign: 'right',
        labelWidth: 90,
        width:500,
        waitMsgTarget: true,
        items: [
            new Ext.form.FieldSet({
               // title: 'Contact Information',
                autoHeight: true,
                defaultType: 'textfield',
                items: [ENameField,
                	   EAddressField,
					   EPhoneField,
					   EMobileField
					   
		                   ]
            })
        ],
         buttons:[{ 
                text:'Save',
                formBind: true,  
                // Function that fires when user clicks the button 
                handler:EditSupplierForm
            },{text:'Cancel',
            	handler:function(){EditSupplierWindow.hide();}
            	}
           ] 
  
    });
  var EditSupplierWindow= new Ext.Window({
      id: 'EditSupplierWindow',
      title: 'Edit supplier',
      closable:false,
      width: 400,
      height: 230,
      plain:true,
      layout: 'fit',
      items: editForm
    });

 //////////////********display form functions********************/////////////////   
    
   // reset the Form before opening it
  function resetEditCourseForm(){
    ENameField.reset();
    EAddressField.reset();
    EPhoneField.reset();
    EMobileField.reset();
  }
  
  // check if the form is valid
  function isEditFormValid(){
  return(ENameField.isValid() && EAddressField.isValid() && EPhoneField.isValid() && EMobileField.isValid());
  }
  
  // display or bring forth the form
  function editFormWindow(){
  if(!EditSupplierWindow.isVisible()){
    resetEditCourseForm();
    EditSupplierWindow.show();
  } else {
    EditSupplierWindow.toFront();
  }
  
  
  }
    
    
  /////////////////edit supplier function/////////////////////
  function EditSupplierForm(){
  var selections = myGrid.selModel.getSelections();
         var selectedCourse = [];
         for(i = 0; i< myGrid.selModel.getCount(); i++){
          selectedCourse.push(selections[i].id);}
   if(ENameField.isValid() && EAddressField.isValid() && EPhoneField.isValid() && EMobileField.isValid()){
      Ext.Ajax.request({   
        waitMsg: 'Please wait...',
        url: '../listSuppliers.do',
        params: {
          task: "EditSupplier",
          id:selections[0].id,
          supplierMobile:		EMobileField.getValue() ,
		  supplierPhone:   		EPhoneField.getValue(),
		  supplierName:	    	ENameField.getValue(),
		  supplierAddress:      EAddressField.getValue()
        },
        method:'POST', 
        success: function(response){     
							ds.reload();
						    EditSupplierWindow.hide();  
              
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
  ////////////////////////////////////////////////////////////////////  
    /////////////////////FINISH Editing/////////////////////////////
 ////////////////////////////////////////////////////////////////////
 
 /********************************************************************/
 
  ////////////////////delete selection record(s)//////////////////////////////
  var selections = myGrid.selModel.getSelections();
  var selectedCourse = [];
  for(i = 0; i< myGrid.selModel.getCount(); i++){
    selectedCourse.push(selections[i].xml.idSupplier);
  }
 
  
  function confirmDeleteCourses(){
    if(myGrid.selModel.getCount() == 1) // only one president is selected here
    {
      Ext.MessageBox.confirm('Confirmation','Are you sure you want to delete this supplier?', deleteCourses);
    } else if(myGrid.selModel.getCount() > 1){
      Ext.MessageBox.confirm('Confirmation','Are you sure you want to delete those suppliers?', deleteCourses);
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
     //     alert("ssssssssssssss>>>>>> "+selections[i].id);
         }
         
         Ext.Ajax.request({  
            waitMsg: 'Please Wait',
            url: '../listSuppliers.do', 
            params: { 
               task: "DELETESELECTIONS", 
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
 var Supplierexpense  = Ext.data.Record.create([
      {name: 'Supplierid', type: 'int'},
      {name: 'cost', type: 'string'},
      {name: 'stock', type: 'int'},
      {name: 'validTo1', type: 'string'},
      {name: 'validFrom1', type: 'string'},
      {name: 'Currancy', type: 'string'},
      {name: 'categoryName', type: 'string'},
      {name: 'ExpenseItemName', type: 'string'},
      {name: 'idSupplierExpense',type:'int'},
      {name: 'categoryid',type:'int'},
      {name: 'expenseid',type:'int'}

     ]);
     
    dataProxy = new Ext.data.HttpProxy({
     	url: '../listSuppliers.do',
     	method: 'POST', 
        headers:{'request-type':'ajax' }
      });

    var Sds = new Ext.data.Store({
       // load using HTTP
      proxy: dataProxy,
      baseParams:{task: "listSI"},  
      // the return will be XML, so lets set up a reader
      reader: new Ext.data.XmlReader({
        totalRecords: "results", // The element which contains the total dataset size (optional)
   		record: "Supplierexpense",           // The repeated element which contains row information
   		id: "idSupplierExpense"
        },Supplierexpense
        )
      });
  

    // the DefaultColumnModel expects this blob to define columns. It can be extended to provide
    // custom or reusable ColumnModels
      var colModel = new Ext.grid.ColumnModel([
        {header: "Category Name", width: 100, sortable: true, locked:false, dataIndex: 'categoryName'}, 
        {header: "Item Name", width: 100, sortable: true, dataIndex: 'ExpenseItemName'},
		{header: "Stock", width: 72, sortable: true, dataIndex: 'stock'},
        {header: "Cost", width: 72, sortable: true, dataIndex: 'cost'},
        {header: "Valid From", width: 100, sortable: true, dataIndex: 'validFrom1'},
        {header: "Valid To", width: 100, sortable: true, dataIndex: 'validTo1'}
    ]);

Sds.on('add', function(){
	Sds.reload();
////myGrid.getView().refresh();
   });
 var x=1;
    var mySIGrid = new Ext.grid.GridPanel({
        ds: Sds,
        cm: colModel,
        stripeRows: true,
       height:395, 
       autoScroll:true,
                
       // renderTo: 'binding-example',
        width:550,
        title:'Suppliers Items',
        tbar: [new Ext.Toolbar.Button({
             text: 'Add Items',
              iconCls:'add',
             handler: displayItemWindow
                          }),'-',new Ext.Toolbar.Button({
              text: 'Delete Selection',
              iconCls:'remove',
              handler: confirmDeleteCourses1
              })],
        selModel: new Ext.grid.RowSelectionModel({singleSelect:false})
 
    });
 mySIGrid.on("rowdblclick", function(mySIGrid) {
	var sel = mySIGrid.getSelectionModel().getSelected();
        var selIndex = ds.indexOf(sel);
        var seldata=sel.data;
		//alert(seldata.validFrom1);
		catID=seldata.categoryid;
		itemID=seldata.expenseid;
	//	alert(seldata.categoryid);
		displayEditItemWindow();
		ECategoriesField.setValue(seldata.categoryName);
		ECostField.setValue(seldata.cost);
		EValidFromField.setValue(seldata.validFrom1);
		EStockField.setValue(seldata.stock);
		EItemsField.setValue(seldata.ExpenseItemName);
		EValidToField.setValue(seldata.validTo1);
});     

    
  
/////////////////////////////Add Items//////////////////////////////////////////////

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

    var Catds = new Ext.data.Store({
       // load using HTTP
      proxy: dataProxy,
      baseParams:{task: "list"},   
      // the return will be XML, so lets set up a reader        
       reader: new Ext.data.XmlReader({
       
       // totalRecords: "results", // The element which contains the total dataset size (optional)
   		record: "Expensescategories"},           // The repeated element which contains row information
   		[{name: 'categoryName', type: 'string'},{name: 'idExpensesCategories', type: 'int'}]
        
        )
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
    var Itemsds = new Ext.data.Store({
       // load using HTTP
      proxy: dataProxy,
       baseParams:{task: "listItems"},  
      // the return will be XML, so lets set up a reader
         reader: new Ext.data.XmlReader({
       
       // totalRecords: "results", // The element which contains the total dataset size (optional)
   		record: "Expensesitem"},           // The repeated element which contains row information
   		[{name: 'expenseItemName', type: 'string'},{name: 'idExpensesItem', type: 'int'}]
        
        ) 
        
      });
      
   dataProxy = new Ext.data.HttpProxy({
     	url: '../listSuppliers.do',
     	method: 'POST', 
        headers:{'request-type':'ajax' }
      });

    var suppds = new Ext.data.Store({
       // load using HTTP
      proxy: dataProxy,
      baseParams:{task: "list"},  
      // the return will be XML, so lets set up a reader
 
       reader: new Ext.data.XmlReader({
       
       // totalRecords: "results", // The element which contains the total dataset size (optional)
   		record: "Suppliers"},           // The repeated element which contains row information
   		[{name: 'supplierName', type: 'string'},{name: 'idSupplier', type: 'int'}]
        
        ) 
      });        
 
  var AddItemForm;
  var AddItemWindow;
  
  var CategoriesField;
  var SuppliersField;
  var CostField;
  var ValidFromField;
  var StockField;
  var ItemsField;
 
  CategoriesField = new Ext.form.ComboBox({
                       store: Catds,
                    //   id: 'categoryName',
					    fieldLabel: 'Category Name <html><font color=red> *</font></html>',
					    displayField:'categoryName',
					    valueField:'idExpensesCategories',
					    typeAhead: true,
					    editable: false,
					    width:200,
					    allowBlank:false,
					    triggerAction: 'all',
					    emptyText:'Select Category...',
					    selectOnFocus:true,
					    listeners: {
	     				select: function (combo, record, index) {
	    				var id=this.getValue()
	    				Ext.Ajax.request({   
					        waitMsg: 'Please wait...',
					        url: '../listExpCategories.do',
					        params: {
					          task: "getItems",
					          id:id
					        },
					        method:'POST', 
					        success: function(response){        
								 ItemsField.reset();
								 Itemsds.reload();
					        },
					        failure: function(response){
					          var result=response.responseText;
					          Ext.MessageBox.alert('error',result+'  could not connect to the database. retry later');          
					        }                      
					      });
	    			 }}
					   
		    });
		    
	 SuppliersField = new Ext.form.ComboBox({
                       store: suppds,
                    //   id: 'categoryName',
					    fieldLabel: 'Supplier Name',
					    displayField:'supplierName',
					    valueField:'idSupplier',
					    typeAhead: true,
					    editable: false,
					    width:200,
					    triggerAction: 'all',
					    emptyText:'Select Supplier...',
					    selectOnFocus:true
					   
		    });	
	ItemsField = new Ext.form.ComboBox({
                       store: Itemsds,
                    //   id: 'categoryName',
					    fieldLabel: 'Item Name <html><font color=red> *</font></html>',
					    displayField:'expenseItemName',
					    valueField:'idExpensesItem',
					    typeAhead: true,
					    editable: false,
					    allowBlank: false,
					    width:200,
					    triggerAction: 'all',
					    emptyText:'Select Item...',
					    selectOnFocus:true
					   
		    });		    
		    
	CostField = new Ext.form.TextField({
		    id: 'expenseItemCost',
		    fieldLabel: 'Cost <html><font color=red> *</font></html>',
		//    maxLength: 20,
		    width:200,
		//    allowNegative: false,
		    allowBlank: false,
		    maskRe: /([0-9\s]+)$/
		      });
	 StockField = new Ext.form.TextField({
		    id: 'expenseItemCurrentStock',
		    fieldLabel: 'Current Stock <html><font color=red> *</font></html>',
	//	    maxLength: 20,
		    width:200,
		//    allowNegative: false,
		    allowBlank: false,
		    maskRe: /([0-9\s]+)$/
		      });
		      	      
	 ValidFromField = new Ext.form.DateField({
			fieldLabel: 'Valid From <html><font color=red> *</font></html>',
                format: 'd-M-Y',
                minValue: '1960-01-01',
                width:200,
            //    disabledDays: [5, 6],
                id: 'expenseItemValidFrom',
        		vtype: 'daterange',
        		allowBlank:false,
        		endDateField: 'expenseItemValidTo'
            });
  var  ValidToField = new Ext.form.DateField({
			fieldLabel: 'Valid To',
                format: 'd-M-Y',
                minValue: '1960-01-01',
                width:200,
            //    disabledDays: [5, 6],
                id: 'expenseItemValidTo',
        		vtype: 'daterange',
        		startDateField:'expenseItemValidFrom'
            });	     
  
 
    //////////////************adding form****************/////////////////
    AddItemForm = new Ext.FormPanel({
       frame: true,
     //   title:'Add Coordinator History',
        //labelAlign: 'right',
        labelWidth: 120,
        width:500,
        waitMsgTarget: true,
        items: [
            new Ext.form.FieldSet({
               // title: 'Contact Information',
                autoHeight: true,
                defaultType: 'textfield',
                items: [CategoriesField,
                	  // SuppliersField,
                	   ItemsField,
                	   StockField,
                	   CostField,
                	   ValidFromField,
                	   ValidToField
					   
		                   ]
            })
        ],
       
    buttons: [{
      text: 'Save and Close',
      handler: addItem
    },{
      text: 'Cancel',
      handler: function(){
        // because of the global vars, we can only instantiate one window... so let's just hide it.
        AddItemWindow.hide();
      }
    }]
    });
  
  AddItemWindow= new Ext.Window({
      id: 'AddItemWindow',
      title: 'Add Expense Item',
      closable:false,
      width: 400,
      height: 260,
      plain:true,
      layout: 'fit',
      items: AddItemForm
    });

 //////////////********display form functions********************/////////////////   
    
   // reset the Form before opening it
  function resetItemForm(){
    CategoriesField.reset();
  //  SuppliersField.reset();
    CostField.setValue(0);
    ItemsField.reset();
    ValidFromField.reset();
    ValidToField.reset();
    StockField.setValue(0);
  }
  
  // check if the form is valid
  function isItemValid(){
  return(CategoriesField.isValid() && ItemsField.isValid() && StockField.isValid() && CostField.isValid()  && ValidFromField.isValid() );
  }
  
  // display or bring forth the form
  function displayItemWindow(){
  	 if(myGrid.selModel.getCount()!=0)
  	 {
		  if(!AddItemWindow.isVisible()){
		    resetItemForm();
		    AddItemWindow.show();
		  } else {
		    AddItemWindow.toFront();
		  }
  	 }
  	 else
  	 {Ext.MessageBox.alert('Warning','You did not select any supplier, please select supplier first!');
  
  }
  
  }
    
    
  /////////////////adding course function/////////////////////
  function addItem(){
  var VT='3000-01-01';
  if(ValidToField.getValue()!='')
  	VT=ValidToField.getValue().format('Y-m-d');
   if(CategoriesField.isValid() && ItemsField.isValid() && StockField.isValid() && CostField.isValid()  && ValidFromField.isValid()){
      Ext.Ajax.request({   
        waitMsg: 'Please wait...',
        url: '../listSuppliers.do',
        params: {
          task: "addItems",
          categoryID:      CategoriesField.getValue(),
          ItemID:			ItemsField.getValue(),
          cost:				CostField.getValue(),
          validFrom:		ValidFromField.getValue().format('Y-m-d'),
          validTo:			VT,
          stock:			StockField.getValue()
        },
        method:'POST', 
        success: function(response){        

			AddItemWindow.hide();
            Sds.reload();  
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
  /////////////////////////////////////////edit record////////////////////////////////////////////////////
  var EditItemForm;
  var EditItemWindow;
  
  var ECategoriesField;
 // var SuppliersField;
  var ECostField;
  var EValidFromField;
  var EStockField;
  var EItemsField;
 var catID;
  ECategoriesField = new Ext.form.ComboBox({
                       store: Catds,
                    //   id: 'categoryName',
					    fieldLabel: 'Category Name <html><font color=red> *</font></html>',
					    displayField:'categoryName',
					    valueField:'idExpensesCategories',
					    typeAhead: true,
					    editable: false,
					    width:200,
					    allowBlank:false,
					    triggerAction: 'all',
					    emptyText:'Select Category...',
					    selectOnFocus:true,
					    listeners: {
	     				select: function (combo, record, index) {
	    				//alert("this.getValue= "+this.getValue());
	    				catID=this.getValue();
	    				Ext.Ajax.request({   
					        waitMsg: 'Please wait...',
					        url: '../listExpCategories.do',
					        params: {
					          task: "getItems",
					          id:catID
					        },
					        method:'POST', 
					        success: function(response){        
								 EItemsField.reset();
								 Itemsds.reload();
					        },
					        failure: function(response){
					          var result=response.responseText;
					          Ext.MessageBox.alert('error',result+'  could not connect to the database. retry later');          
					        }                      
					      });
	    			 }}
					   
		    });
		   
	EItemsField = new Ext.form.ComboBox({
                       store: Itemsds,
                    //   id: 'categoryName',
					    fieldLabel: 'Item Name <html><font color=red> *</font></html>',
					    displayField:'expenseItemName',
					    valueField:'idExpensesItem',
					    typeAhead: true,
					    editable: false,
					    width:200,
					    triggerAction: 'all',
					    emptyText:'Select Item...',
					    selectOnFocus:true,
					    listeners: {
	     				select: function (combo, record, index) {
	    				//alert("this.getValue= "+this.getValue());
	    				itemID=this.getValue();
	    			 }}
					   
		    });		    
		    
	ECostField = new Ext.form.TextField({
		   // id: 'expenseItemCost',
		    fieldLabel: 'Cost <html><font color=red> *</font></html>',
		//    maxLength: 20,
		    width:200,
		//    allowNegative: false,
		    allowBlank: false,
		    maskRe: /([0-9\s]+)$/
		      });
	 EStockField = new Ext.form.TextField({
		  //  id: 'expenseItemCurrentStock',
		    fieldLabel: 'Current Stock <html><font color=red> *</font></html>',
	//	    maxLength: 20,
		    width:200,
		//    allowNegative: false,
		    allowBlank: false,
		    maskRe: /([0-9\s]+)$/
		      });
		      	      
	 EValidFromField = new Ext.form.DateField({
			fieldLabel: 'Valid From <html><font color=red> *</font></html>',
                format: 'd-M-Y',
                minValue: '1960-01-01',
                width:200,
            //    disabledDays: [5, 6],
                id: 'expenseItemValidFrom1',
        		vtype: 'daterange',
        		allowBlank:false,
        		endDateField: 'expenseItemValidTo1'
            });
  var  EValidToField = new Ext.form.DateField({
			fieldLabel: 'Valid To',
                format: 'd-M-Y',
                minValue: '1960-01-01',
                width:200,
            //    disabledDays: [5, 6],
                id: 'expenseItemValidTo1',
        		vtype: 'daterange',
        		startDateField:'expenseItemValidFrom1'
            });	     
  
 
    //////////////************adding form****************/////////////////
    EditItemForm = new Ext.FormPanel({
       frame: true,
     //   title:'Add Coordinator History',
        //labelAlign: 'right',
        labelWidth: 120,
        width:500,
        waitMsgTarget: true,
        items: [
            new Ext.form.FieldSet({
               // title: 'Contact Information',
                autoHeight: true,
                defaultType: 'textfield',
                items: [ECategoriesField,
                	  // SuppliersField,
                	   EItemsField,
                	   EStockField,
                	   ECostField,
                	   EValidFromField,
                	   EValidToField
					   
		                   ]
            })
        ],
       
    buttons: [{
      text: 'Save and Close',
      handler: EditItem
    },{
      text: 'Cancel',
      handler: function(){
        // because of the global vars, we can only instantiate one window... so let's just hide it.
        EditItemWindow.hide();
      }
    }]
    });
  
  EditItemWindow= new Ext.Window({
      id: 'EditItemWindow',
      title: 'Edit Expense Item',
      closable:false,
      width: 400,
      height: 260,
      plain:true,
      layout: 'fit',
      items: EditItemForm
    });

 //////////////********display form functions********************/////////////////   
    
   // reset the Form before opening it
  function resetEditItemForm(){
    ECategoriesField.reset();
  //  SuppliersField.reset();
    ECostField.setValue(0);
    EItemsField.reset();
    EValidFromField.reset();
    EValidToField.reset();
    EStockField.setValue(0);
  }
  
  // check if the form is valid
  function isItemValid(){
  return(ECategoriesField.isValid() && ECostField.isValid() && EItemsField.isValid() && EValidFromField.isValid() && EStockField.isValid());
  }
  
  // display or bring forth the form
  function displayEditItemWindow(){
  	 
		  if(!EditItemWindow.isVisible()){
		    resetEditItemForm();
		    EditItemWindow.show();
		  } else {
		    EditItemWindow.toFront();
		  }
  	
  }
    
    
  /////////////////adding course function/////////////////////
  function EditItem(){
  var EVT='3000-01-01';
  if(EValidToField.getValue()!='')
  	EVT=EValidToField.getValue().format('Y-m-d');
   var selections = mySIGrid.selModel.getSelections();
         var selectedCourse = [];
         for(i = 0; i< mySIGrid.selModel.getCount(); i++){
          selectedCourse.push(selections[i].id);}
   if(ECategoriesField.isValid() && EItemsField.isValid() && EStockField.isValid() && ECostField.isValid()  && EValidFromField.isValid()){
      Ext.Ajax.request({   
        waitMsg: 'Please wait...',
        url: '../listSuppliers.do',
        params: {
          task: "editItems",
          id:selections[0].id,
          categoryID:       catID,
          ItemID:			itemID,
          cost:				ECostField.getValue(),
          validFrom:		EValidFromField.getValue().format('Y-m-d'),
          validTo:			EVT,
          stock:			EStockField.getValue()
        },
        method:'POST', 
        success: function(response){        

			EditItemWindow.hide();
            Sds.reload();  
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
  
/********************************************************************/
 
  ////////////////////delete selection record(s)//////////////////////////////
  var selections = mySIGrid.selModel.getSelections();
  var selectedCourse = [];
  for(i = 0; i< mySIGrid.selModel.getCount(); i++){
    selectedCourse.push(selections[i].xml.idSupplierExpense);
  }
 
  
  function confirmDeleteCourses1(){
    if(myGrid.selModel.getCount() == 1) // only one president is selected here
    {
      Ext.MessageBox.confirm('Confirmation','Are you sure you want to delete this item?', deleteCourses);
    } else if(mySIGrid.selModel.getCount() > 1){
      Ext.MessageBox.confirm('Confirmation','Are you sure you want to delete those items?', deleteCourses);
    } else {
      Ext.MessageBox.alert('Uh oh...','You can\'t really delete something you haven\'t selected huh?');
    }
  }
  
  function deleteCourses(btn){
    if(btn=='yes'){
         var selections = mySIGrid.selModel.getSelections();
         var selectedCourse = [];
         for(i = 0; i< mySIGrid.selModel.getCount(); i++){
          selectedCourse.push(selections[i].id);
     //     alert("ssssssssssssss>>>>>> "+selections[i].id);
         }
         
         Ext.Ajax.request({  
            waitMsg: 'Please Wait',
            url: '../listSuppliers.do', 
            params: { 
               task: "DELETE", 
               ids:  selectedCourse
              }, method:'POST',
            success: function(response){
              var result=1;
              switch(result){
              case 1:  // Success : simply reload
                Sds.reload();
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
///////////////////////////////////////////////////////////////////////////////////
    var tap= new Ext.TabPanel({
                    region:'center',
                    deferredRender:false,
                    activeTab:0,
                    buttonAlign:'center',
                      height:495, 
                           /* width:980,*/
        			renderTo: 'binding-example',
                    
                    items:[{
                title:'Suppliers',
                layout:'form',
                defaults: {width: 1200},
                defaultType: 'textfield',
				autoScroll:true,
                items: [new Ext.form.FieldSet({
                    autoHeight: true,
                width:1200,
                border:false,
                    items:[{
        	header:false,
            layout:'column',
            border:false,
            items:[{
                columnWidth:.5,
                layout: 'form',
                border:false,
                items: [ myGrid
  						]
            },{
                columnWidth:.5,
                layout: 'form',
                border:false,
                items: [ mySIGrid
                		]
            }]
        }]}),
                    
                    ]
            }]});

	function stcCallBack1001(record, opts, success) {
//if (success) 
//// do whatever
//alert("the sucess ");
//// alert (" number of records "+ds.getCount() +"  recourd "+ds.getAt(0)) ;
////console.log("  LOOOOOOOOOOOOOOD ");

};

	loadtest=   ds.load({callback :  stcCallBack1001});

});