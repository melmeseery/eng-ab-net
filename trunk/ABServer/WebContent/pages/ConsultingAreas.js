
Ext.onReady(function() {

    Ext.form.Field.prototype.msgTarget = 'side';

    var bd = Ext.getBody();

	var Consultingareas  = Ext.data.Record.create([
      {name: 'consultingAreasName', type: 'string'},
      {name: 'idConsultingAreas', type: 'int'}
     ]);
     
    dataProxy = new Ext.data.HttpProxy({
     	url: '../listResources.do',
     	method: 'POST', 
        headers:{'request-type':'ajax' }
      });

    var ds = new Ext.data.Store({
       // load using HTTP
      proxy: dataProxy,
      baseParams:{task: "listCAreas"},   
      // the return will be XML, so lets set up a reader
      reader: new Ext.data.XmlReader({
        totalRecords: "results", // The element which contains the total dataset size (optional)
   		record: "Consultingareas",           // The repeated element which contains row information
   		id: "idConsultingAreas"
        },Consultingareas
        ),
        sortInfo:{field: "consultingAreasName", direction: "ASC"}
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
      	{header: "Consulting Area Name", width: 150, sortable: true, locked:false, dataIndex: 'consultingAreasName'}
    ]);


 
    var myGrid = new Ext.grid.GridPanel({
        ds: ds,
        cm: colModel,
        stripeRows: true,
         height:495, 
               /* width:980,*/
        renderTo: 'binding-example',
        title:'Consulting Areas',
        tbar: [new Ext.Toolbar.Button({
             text: 'Add Consulting Area',
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

		var sel = myGrid.getSelectionModel().getSelected();
        var selIndex = ds.indexOf(sel);
        var seldata=sel.data;

		displayEditCAWindow();
		EAreaNameField.setValue(seldata.consultingAreasName);
		
});


  
  ds.on('add', function(){
	ds.reload();
//myGrid.getView().refresh();
   });

 ////////////////////adding new record//////////////////////////////
  var AddAreaForm;
  var AddAreaWindow;
  
  var AreaNameField;
 
  AreaNameField = new Ext.form.TextField({
    id: 'consultingAreasName',
    fieldLabel: 'Consulting Area Name <html><font color=red> *</font></html>',
  //  maxLength: 20,
    allowBlank: false,
   // anchor : '95%',
    maskRe: /([a-zA-Z0-9\s]+)$/
      });
      
  
  
 
    //////////////************adding form****************/////////////////
    AddAreaForm = new Ext.FormPanel({
        labelAlign: 'left',
        bodyStyle:'padding:5px',
        labelWidth: 150,
        width: 350, 
        hight:150, 
        frame:true,      
        items: [ new Ext.form.FieldSet({
                title: 'Consulting Area Details',
                autoHeight: true,
                defaultType: 'textfield',
                items: [
               AreaNameField]
            })],
       
    buttons: [{
      text: 'Save and Close',
      handler: addArea
    },{
      text: 'Cancel',
      handler: function(){
        // because of the global vars, we can only instantiate one window... so let's just hide it.
        AddAreaWindow.hide();
      }
    }]
    });
  
  AddAreaWindow= new Ext.Window({
      id: 'AddAreaWindow',
      title: 'Creating a New Consulting Area',
      closable:false,
      width: 380,
      height: 150,
      plain:true,
      layout: 'fit',
      items: AddAreaForm
    });

 //////////////********display form functions********************/////////////////   
    
   // reset the Form before opening it
  function resetAreaForm(){
    AreaNameField.reset();
   
  }
  
  // check if the form is valid
  function isAreaFormValid(){
  return(AreaNameField.isValid());
  }
  
  // display or bring forth the form
  function displayFormWindow(){
  if(!AddAreaWindow.isVisible()){
    resetAreaForm();
    AddAreaWindow.show();
  } else {
    AddAreaWindow.toFront();
  }
  
  
  }
    
    
  /////////////////adding Area function/////////////////////
  function addArea(){
  
   if(AreaNameField.isValid()){
      Ext.Ajax.request({   
        waitMsg: 'Please wait...',
        url: '../listResources.do',
        params: {
          task: "AddConArea",
          consultingAreasName:      AreaNameField.getValue()
        },
        method:'POST', 
        success: function(response){        
			 var record = new Ext.data.Record({
						    	  consultingAreasName:      AreaNameField.getValue()
						    });  
						    ds.add(record); 
						    AddAreaWindow.hide();   
		
              
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
 ////////////////////editing new record//////////////////////////////
  var EditAreaForm;
  var EditAreaWindow;
  
  var EAreaNameField;
 
  EAreaNameField = new Ext.form.TextField({
   // id: 'consultingAreasName',
    fieldLabel: 'Consulting Area Name',
  //  maxLength: 20,
    allowBlank: false,
   // anchor : '95%',
    maskRe: /([a-zA-Z0-9\s]+)$/
      });
      
  
  
 
    //////////////************adding form****************/////////////////
    EditAreaForm = new Ext.FormPanel({
        labelAlign: 'left',
        bodyStyle:'padding:5px',
        labelWidth: 150,
        width: 350, 
        hight:150, 
        frame:true,      
        items: [ new Ext.form.FieldSet({
                title: 'Consulting Area Details',
                autoHeight: true,
                defaultType: 'textfield',
                items: [
               EAreaNameField]
            })],
       
    buttons: [{
      text: 'Save and Close',
      handler: EditArea
    },{
      text: 'Cancel',
      handler: function(){
        // because of the global vars, we can only instantiate one window... so let's just hide it.
        EditAreaWindow.hide();
      }
    }]
    });
  
  EditAreaWindow= new Ext.Window({
      id: 'EditAreaWindow',
      title: 'Edit Consulting Area',
      closable:false,
      width: 380,
      height: 150,
      plain:true,
      layout: 'fit',
      items: EditAreaForm
    });

 //////////////********display form functions********************/////////////////   
    
   // reset the Form before opening it
  function resetEAreaForm(){
    EAreaNameField.reset();
   
  }
  
  // check if the form is valid
  function isEAreaFormValid(){
  return(EAreaNameField.isValid());
  }
  
  // display or bring forth the form
  function displayEditCAWindow(){
  if(!EditAreaWindow.isVisible()){
    resetEAreaForm();
    EditAreaWindow.show();
  } else {
    EditAreaWindow.toFront();
  }
  
  
  }
    
    
  /////////////////adding Area function/////////////////////
  function EditArea(){
  
   if(isEAreaFormValid()){
   	var selections = myGrid.selModel.getSelections();
         var selectedCourse = [];
         for(i = 0; i< myGrid.selModel.getCount(); i++){
          selectedCourse.push(selections[i].id);}
      Ext.Ajax.request({   
        waitMsg: 'Please wait...',
        url: '../listResources.do',
        params: {
        	id:selections[0].id,
          task: "EditConArea",
          consultingAreasName:      EAreaNameField.getValue()
        },
        method:'POST', 
        success: function(response){        
			 var record = new Ext.data.Record({
						    	  consultingAreasName:      EAreaNameField.getValue()
						    });  
						    ds.reload(); 
						    EditAreaWindow.hide();   
		
              
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
  
  ////////////////////delete selection record(s)//////////////////////////////
  var selections = myGrid.selModel.getSelections();
  var selectedCourse = [];
  for(i = 0; i< myGrid.selModel.getCount(); i++){
    selectedCourse.push(selections[i].xml.idConsultingAreas);
  }
 
  
  function confirmDeleteCourses(){
    if(myGrid.selModel.getCount() == 1) // only one president is selected here
    {
      Ext.MessageBox.confirm('Confirmation','Are you sure you want to delete this Consulting Area?', deleteCourses);
    } else if(myGrid.selModel.getCount() > 1){
      Ext.MessageBox.confirm('Confirmation','Are you sure you want to delete those Consulting Areas?', deleteCourses);
    } else {
      Ext.MessageBox.alert('Uh oh...','You can\'t really delete something you haven\'t selected huh?');
    }
  }
  
  function deleteCourses(btn){
    if(btn=='yes'){
         var selections = myGrid.selModel.getSelections();
         var selectedArea = [];
         for(i = 0; i< myGrid.selModel.getCount(); i++){
          selectedArea.push(selections[i].id);
        //  alert("ssssssssssssss>>>>>> "+selections[i].id);
         }
         
         Ext.Ajax.request({  
            waitMsg: 'Please Wait',
            url: '../listResources.do', 
            params: { 
               task: "DELETE", 
               ids:  selectedArea
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