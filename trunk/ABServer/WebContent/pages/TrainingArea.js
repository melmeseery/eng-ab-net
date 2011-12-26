
Ext.onReady(function() {

    Ext.form.Field.prototype.msgTarget = 'side';

    var bd = Ext.getBody();

	var Trainingareas  = Ext.data.Record.create([
      {name: 'trainingAreaCode', type: 'string'},
      {name: 'idTrainingAreas', type: 'int'},
      {name: 'trainingAreaName', type: 'string'}
     ]);
     
    dataProxy = new Ext.data.HttpProxy({
     	url: '../listTraingAreas.do',
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
   		record: "Trainingareas",           // The repeated element which contains row information
   		id: "idTrainingAreas"
        },Trainingareas
        ),
        sortInfo:{field: "trainingAreaName", direction: "ASC"}
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
        {header: "Training Area Name", width: 150, sortable: true, dataIndex: 'trainingAreaName'},
		{header: "Training Area Code", width: 200, sortable: true, dataIndex: 'trainingAreaCode'}
    ]);


 
    var myGrid = new Ext.grid.GridPanel({
        ds: ds,
        cm: colModel,
        stripeRows: true,
         height:495, 
        renderTo: 'binding-example',
               /* width:980,*/
        title:'Training Areas',
        tbar: [new Ext.Toolbar.Button({
             text: 'Add Training Area',
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
		
		var selections = myGrid.selModel.getSelections();
         var selectedCourse = [];
         for(i = 0; i< myGrid.selModel.getCount(); i++){
          selectedCourse.push(selections[i].id);
        //  alert("ssssssssssssss>>>>>> "+selections[i].id);
         }

window.location = 'editTA.jsp?t='+selections[0].id;
		
});

 /* myGrid.on("rowclick", function(myGrid) {
		alert("????????????");
		var selections = myGrid.selModel.getSelections();
         var selectedCourse = [];
         for(i = 0; i< myGrid.selModel.getCount(); i++){
          selectedCourse.push(selections[i].id);
          alert("ssssssssssssss>>>>>> "+selections[i].get('trainingAreaName'));
         }
		
}); */


 ////////////////////adding new record//////////////////////////////
  var AddTAForm;
  var AddTAWindow;
  
  var AreaNameField;
  var AreaCodeField;
 
  AreaNameField = new Ext.form.TextField({
    id: 'trainingAreaName',
    fieldLabel: 'Training Area Name <html><font color=red> *</font></html>',
  //  maxLength: 100,
    width: 200,
    allowBlank: false,
   // anchor : '95%',
    maskRe: /([a-zA-Z0-9\s]+)$/
      });
      
  AreaCodeField = new Ext.form.TextField({
    id: 'TrainingAreaCode',
    fieldLabel: 'Training Area Code <html><font color=red> *</font></html>',
     width: 200,
 //   maxLength: 100,
 //   allowNegative: false,
    allowBlank: false,
 //   anchor : '95%'    
  //  maskRe: /([0-9\s]+)$/
      });
  
 
    //////////////************adding form****************/////////////////
    AddTAForm = new Ext.FormPanel({
       frame: true,
     //   title:'Add Coordinator History',
        //labelAlign: 'right',
        labelWidth: 130,
        width:500,
        waitMsgTarget: true,
        items: [
            new Ext.form.FieldSet({
               // title: 'Contact Information',
                autoHeight: true,
                defaultType: 'textfield',
                items: [AreaNameField,
                	   AreaCodeField
					   
		                   ]
            })
        ],
       
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
      title: 'Creating a New Training Area',
      closable:false,
      width: 410,
      height: 180,
      plain:true,
      layout: 'fit',
      items: AddTAForm
    });

 //////////////********display form functions********************/////////////////   
    
   // reset the Form before opening it
  function resetCourseForm(){
    AreaNameField.reset();
    AreaCodeField.reset();
   
  }
  
  // check if the form is valid
  function isCourseFormValid(){
  return(AreaNameField.isValid() && AreaCodeField.isValid());
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
  function addTA(){
  
   if(AreaNameField.isValid() && AreaCodeField.isValid()){
      Ext.Ajax.request({   
        waitMsg: 'Please wait...',
        url: '../listCProperties.do',
        params: {
          task: "CREATETA",
          trainingAreaName:      AreaNameField.getValue(),
          trainingAreaCode:      AreaCodeField.getValue()
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
 
 ////////////////////editing new record//////////////////////////////
  var EditTAForm;
  var EditTAWindow;
  
  var EAreaNameField;
  var EAreaCodeField;
 
  EAreaNameField = new Ext.form.TextField({
   // id: 'trainingAreaName',
    fieldLabel: 'Training Area Name',
  //  maxLength: 100,
    width: 200,
    allowBlank: false,
   // anchor : '95%',
    maskRe: /([a-zA-Z0-9\s]+)$/
      });
      
  EAreaCodeField = new Ext.form.TextField({
   // id: 'TrainingAreaCode',
    fieldLabel: 'Training Area Code',
     width: 200,
//    maxLength: 100,
 //   allowNegative: false,
    allowBlank: false,
 //   anchor : '95%'    
  //  maskRe: /([0-9\s]+)$/
      });
  
 
    //////////////************adding form****************/////////////////
    EditTAForm = new Ext.FormPanel({
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
                items: [EAreaNameField,
                	   EAreaCodeField
					   
		                   ]
            })
        ],
       
    buttons: [{
      text: 'Save and Close',
      handler: editTA
    },{
      text: 'Cancel',
      handler: function(){
        // because of the global vars, we can only instantiate one window... so let's just hide it.
        EditTAWindow.hide();
      }
    }]
    });
  
  EditTAWindow= new Ext.Window({
      id: 'EditTAWindow',
      title: 'Creating a New Training Area',
      closable:false,
      width: 400,
      height: 180,
      plain:true,
      layout: 'fit',
      items: EditTAForm
    });

 //////////////********display form functions********************/////////////////   
    
   // reset the Form before opening it
  function resetEditTAForm(){
    EAreaNameField.reset();
    EAreaCodeField.reset();
   
  }
  
  // check if the form is valid
  function isEditFormValid(){
  return(EAreaNameField.isValid() && EAreaCodeField.isValid());
  }
  
  // display or bring forth the form
  function displayEditFormWindow(){
  if(!EditTAWindow.isVisible()){
    resetEditTAForm();
    EditTAWindow.show();
  } else {
    EditTAWindow.toFront();
  }
  
  
  }
    
    
  /////////////////editing course function/////////////////////
  function editTA(){
  var selections = myGrid.selModel.getSelections();
         var selectedCourse = [];
         for(i = 0; i< myGrid.selModel.getCount(); i++){
          selectedCourse.push(selections[i].id);}
   if(isEditFormValid()){
      Ext.Ajax.request({   
        waitMsg: 'Please wait...',
        url: '../listTraingAreas.do',
        params: {
          task: "editTA",
          id:selectedCourse,
          trainingAreaName:      EAreaNameField.getValue(),
          trainingAreaCode:      EAreaCodeField.getValue()
        },
        method:'POST', 
        success: function(response){        
			ds.reload();
			EditTAWindow.hide();
              
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
  var selections = myGrid.selModel.getSelections();
  var selectedCourse = [];
  for(i = 0; i< myGrid.selModel.getCount(); i++){
    selectedCourse.push(selections[i].xml.idTrainingAreas);
  }
 
  
  function confirmDeleteCourses(){
    if(myGrid.selModel.getCount() == 1) // only one president is selected here
    {
      Ext.MessageBox.confirm('Confirmation','Are you sure you want to delete this Training area?', deleteCourses);
    } else if(myGrid.selModel.getCount() > 1){
      Ext.MessageBox.confirm('Confirmation','Are you sure you want to delete those Training areas?', deleteCourses);
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
         // alert("ssssssssssssss>>>>>> "+selections[i].id);
         if(selections[i].get('trainingAreaName')=='Miscellanies')
         	Ext.MessageBox.alert('Error','It can not be deleted!!');
         }
         
         Ext.Ajax.request({  
            waitMsg: 'Please Wait',
            url: '../listTraingAreas.do', 
            params: { 
               task: "DELETESELECTIONS", 
               ids:  selectedCourse
              }, method:'POST',
            success: function(response){
              var result=1;
              switch(result){
              case 1:  // Success : simply reload
                ds.reload();//alert('deleteeeeeed');
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