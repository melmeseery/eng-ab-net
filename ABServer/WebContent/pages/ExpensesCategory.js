
Ext.onReady(function() {

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

    var ds = new Ext.data.GroupingStore({
       // load using HTTP
      proxy: dataProxy,
      groupField:'categoryParentName',
      sortInfo:{field: 'categoryParentName', direction: "ASC"},
      baseParams:{task: "list"},   
      // the return will be XML, so lets set up a reader
      reader: new Ext.data.XmlReader({
        totalRecords: "results", // The element which contains the total dataset size (optional)
   		record: "Expensescategories",           // The repeated element which contains row information
   		id: "idExpensesCategories"
        },Expensescategories
        ),
        sortInfo:{field: "categoryName", direction: "ASC"}
      });
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
      	{header: "Category Parent Name", width: 150, sortable: true, locked:false, dataIndex: 'categoryParentName'},
      	{header: "Category Name", width: 150, sortable: true, locked:false, dataIndex: 'categoryName'}
    ]);


 
    var myGrid = new Ext.grid.GridPanel({
        ds: ds,
        cm: colModel,
        stripeRows: true,
         height:495,
        renderTo: 'binding-example',
        title:'Expenses Categories',
         view: new Ext.grid.GroupingView({
            forceFit:true,
            groupTextTpl: '{text} ({[values.rs.length]} {[values.rs.length > 1 ? "Items" : "Item"]})'
        }),
        
        tbar: [new Ext.Toolbar.Button({
             text: 'Add Categoy',
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


		 var selections = myGrid.selModel.getSelections();
         var selectedCourse = [];
         for(i = 0; i< myGrid.selModel.getCount(); i++){
          selectedCourse.push(selections[i].id);
        //  alert("ssssssssssssss>>>>>> "+selections[i].id);
         }

window.location = 'editExCategory.jsp?cat='+selections[0].id;
});

  
//  ds.on('add', function(){
//	ds.reload();
//////myGrid.getView().refresh();
//   });

 ////////////////////adding new record//////////////////////////////
  var AddTAForm;
  var AddTAWindow;
  var Typeds=[['Parent','Parent'],['Sub Category','Sub Category']];
  var CatNameField;
 
  CatNameField = new Ext.form.TextField({
    id: 'categoryName',
    fieldLabel: 'Category Name <html><font color=red> *</font></html>',
  //  maxLength: 20,
    allowBlank: false,
    width:200,
   // anchor : '95%',
    maskRe: /([a-zA-Z0-9\s]+)$/
      });
        var TypeField = new Ext.form.ComboBox({
                       store: Typeds,
                       id: 'categoryType',
					    fieldLabel: 'Category Type <html><font color=red> *</font></html>',
					    displayField:'categoryType',
					    typeAhead: true,
					    editable: false,
					     allowBlank: false,
					    width:200,
					    triggerAction: 'all',
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
	    				    CategoriesField.reset();
	    				    Catds.reload();
	    			 }}
					   
		    });	   
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
					    selectOnFocus:true
					   
		    });	   
  
 CategoriesField.disable();
    //////////////************adding form****************/////////////////
    AddTAForm = new Ext.FormPanel({
        labelAlign: 'left',
        bodyStyle:'padding:5px',
        labelWidth: 130,
        width: 400, 
        hight:200, 
        frame:true,      
        items: [ new Ext.form.FieldSet({
                title: 'Category Details',
                autoHeight: true,
                defaultType: 'textfield',
                items: [
               CatNameField,
               TypeField,
               CategoriesField]
            })],
       
    buttons: [{
      text: 'Save and Close',
      handler: addTA
    },{
      text: 'Cancel',
      handler: function(){
        // because of the global vars, we can only instantiate one window... so let's just hide it.
        AddTAWindow.hide();
      }
    }]
    });
  
  AddTAWindow= new Ext.Window({
      id: 'AddTAWindow',
      title: 'Creating a New Expenses Category',
      closable:false,
      width: 420,
      height: 200,
      plain:true,
      layout: 'fit',
      items: AddTAForm
    });

 //////////////********display form functions********************/////////////////   
    
   // reset the Form before opening it
  function resetCourseForm(){
    CatNameField.reset();
   TypeField.reset();
   CategoriesField.reset();
  }
  
  // check if the form is valid
  function isCourseFormValid(){
  return(CatNameField.isValid() && TypeField.isValid() && CategoriesField.isValid());
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
    
    
  /////////////////adding course function/////////////////////
  function addTA(){//alert(CategoriesField.getValue())
  
   if(CatNameField.isValid() && TypeField.isValid() && CategoriesField.isValid()){
      Ext.Ajax.request({   
        waitMsg: 'Please wait...',
        url: '../listExpCategories.do',
        params: {
          task: "AddCat",
          categoryName:      CatNameField.getValue(),
          categoryType:		 TypeField.getValue(),
          categoryParentId:  CategoriesField.getValue()	 
        },
        method:'POST', 
        success: function(response){        
			
						    ds.reload(); 
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
  
  ////////////////////////////////////////////////////////////////////  
    /////////////////////FINISH ADDING/////////////////////////////
 ////////////////////////////////////////////////////////////////////
 
 /********************************************************************/
 
  ////////////////////delete selection record(s)//////////////////////////////
  var selections = myGrid.selModel.getSelections();
  var selectedCourse = [];
  for(i = 0; i< myGrid.selModel.getCount(); i++){
    selectedCourse.push(selections[i].xml.idExpensesCategories);
  }
 
  
  function confirmDeleteCourses(){
    if(myGrid.selModel.getCount() == 1) // only one president is selected here
    {
      Ext.MessageBox.confirm('Confirmation','Are you sure you want to delete this Category?', deleteCourses);
    } else if(myGrid.selModel.getCount() > 1){
      Ext.MessageBox.confirm('Confirmation','Are you sure you want to delete those Categories?', deleteCourses);
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
            url: '../listExpCategories.do', 
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

	
	function stcCallBack1001(record, opts, success) {
//if (success) 
//// do whatever
//alert("the sucess ");
//// alert (" number of records "+ds.getCount() +"  recourd "+ds.getAt(0)) ;
////console.log("  LOOOOOOOOOOOOOOD ");

};

	loadtest=   ds.load({callback :  stcCallBack1001});

});