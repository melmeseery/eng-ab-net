
Ext.onReady(function() {

    Ext.form.Field.prototype.msgTarget = 'side';

    var bd = Ext.getBody();

	var Audiencetypes  = Ext.data.Record.create([
      {name: 'audienceName', type: 'string'},
      {name: 'idAudienceTypes', type: 'int'}
     ]);
     
    dataProxy = new Ext.data.HttpProxy({
     	url: '../listCourses.do',
     	method: 'POST', 
        headers:{'request-type':'ajax' }
      });

    var ds = new Ext.data.Store({
       // load using HTTP
      proxy: dataProxy,
      baseParams:{task: "listAud"},   
      // the return will be XML, so lets set up a reader
      reader: new Ext.data.XmlReader({
        totalRecords: "results", // The element which contains the total dataset size (optional)
   		record: "Audiencetypes",           // The repeated element which contains row information
   		id: "idAudienceTypes"
        },Audiencetypes
        ),
        sortInfo:{field: "audienceName", direction: "ASC"}
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
      	{header: "Audience Type", width: 150, sortable: true, locked:false, dataIndex: 'audienceName'}
    ]);


 
    var myGrid = new Ext.grid.GridPanel({
        ds: ds,
        cm: colModel,
        stripeRows: true,
         height:495, 
               /* width:980,*/
        renderTo: 'binding-example',
        title:'Targeted Participants',
        tbar: [new Ext.Toolbar.Button({
             text: 'Add Participant',
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

		displayEditAudioWindow();
		EAudioNameField.setValue(seldata.audienceName);
		
});

  
  ds.on('add', function(){
	ds.reload();
//myGrid.getView().refresh();
   });

 ////////////////////adding new record//////////////////////////////
  var AddAudioForm;
  var AddAudioWindow;
  
  var AudioNameField;
 
  AudioNameField = new Ext.form.TextField({
    id: 'audienceName',
    fieldLabel: 'Participant Name <html><font color=red> *</font></html>',
    width:180,
  //  maxLength: 20,
    allowBlank: false,
   // anchor : '95%',
    maskRe: /([a-zA-Z0-9\s]+)$/
      });
      
  
  
 
    //////////////************adding form****************/////////////////
    AddAudioForm = new Ext.FormPanel({
        labelAlign: 'left',
        bodyStyle:'padding:5px',
        labelWidth: 150,
        width: 370, 
        hight:150, 
        frame:true,      
        items: [ new Ext.form.FieldSet({
                title: 'Targeted Participant Details',
                autoHeight: true,
                defaultType: 'textfield',
                items: [
               AudioNameField]
            })],
       
    buttons: [{
      text: 'Save and Close',
      handler: addAudio
    },{
      text: 'Cancel',
      handler: function(){
        // because of the global vars, we can only instantiate one window... so let's just hide it.
        AddAudioWindow.hide();
      }
    }]
    });
  
  AddAudioWindow= new Ext.Window({
      id: 'AddAudioWindow',
      title: 'Creating a New Targeted Participant',
      closable:false,
      width: 420,
      height: 170,
      plain:true,
      layout: 'fit',
      items: AddAudioForm
    });

 //////////////********display form functions********************/////////////////   
    
   // reset the Form before opening it
  function resetAudioForm(){
    AudioNameField.reset();
   
  }
  
  // check if the form is valid
  function isAudioFormValid(){
  return(AudioNameField.isValid());
  }
  
  // display or bring forth the form
  function displayFormWindow(){
  if(!AddAudioWindow.isVisible()){
    resetAudioForm();
    AddAudioWindow.show();
  } else {
    AddAudioWindow.toFront();
  }
  
  
  }
    
    
  /////////////////adding Area function/////////////////////
  function addAudio(){
  
   if(AudioNameField.isValid()){
      Ext.Ajax.request({   
        waitMsg: 'Please wait...',
        url: '../listCourses.do',
        params: {
          task: "AddAudio",
          audienceName:      AudioNameField.getValue()
        },
        method:'POST', 
        success: function(response){        
			 var record = new Ext.data.Record({
						    	  audienceName:      AudioNameField.getValue()
						    });  
						    ds.add(record); 
						    AddAudioWindow.hide();   
		
              
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
    
 ////////////////////editing new record//////////////////////////////
  var EditAudioForm;
  var EditAudioWindow;
  
  var EAudioNameField;
 
  EAudioNameField = new Ext.form.TextField({
   // id: 'audienceName',
    fieldLabel: 'Participant Name <html><font color=red> *</font></html>',
    width:180,
  //  maxLength: 20,
    allowBlank: false,
   // anchor : '95%',
    maskRe: /([a-zA-Z0-9\s]+)$/
      });
      
  
  
 
    //////////////************editing form****************/////////////////
    EditAudioForm = new Ext.FormPanel({
        labelAlign: 'left',
        bodyStyle:'padding:5px',
        labelWidth: 150,
        width: 370, 
        hight:150, 
        frame:true,      
        items: [ new Ext.form.FieldSet({
                title: 'Targeted Participants Details',
                autoHeight: true,
                defaultType: 'textfield',
                items: [
               EAudioNameField]
            })],
       
    buttons: [{
      text: 'Save and Close',
      handler: EditAudio
    },{
      text: 'Cancel',
      handler: function(){
        // because of the global vars, we can only instantiate one window... so let's just hide it.
        EditAudioWindow.hide();
      }
    }]
    });
  
  EditAudioWindow= new Ext.Window({
      id: 'EditAudioWindow',
      title: 'Edit Targeted Participant',
      closable:false,
      width: 420,
      height: 170,
      plain:true,
      layout: 'fit',
      items: EditAudioForm
    });

 //////////////********display form functions********************/////////////////   
    
   // reset the Form before opening it
  function resetEditAudioForm(){
    EAudioNameField.reset();
   
  }
  
  // check if the form is valid
  function isEditAudioFormValid(){
  return(EAudioNameField.isValid());
  }
  
  // display or bring forth the form
  function displayEditAudioWindow(){
  if(!EditAudioWindow.isVisible()){
    resetEditAudioForm();
    EditAudioWindow.show();
  } else {
    EditAudioWindow.toFront();
  }
  
  
  }
    
    
  /////////////////Edit Audio function/////////////////////
  function EditAudio(){
  
   if(EAudioNameField.isValid()){
   	var selections = myGrid.selModel.getSelections();
         var selectedCourse = [];
         for(i = 0; i< myGrid.selModel.getCount(); i++){
          selectedCourse.push(selections[i].id);}
      Ext.Ajax.request({   
        waitMsg: 'Please wait...',
        url: '../listCourses.do',
        params: {
          id:selections[0].id,
          task: "EditAudio",
          audienceName:      EAudioNameField.getValue()
        },
        method:'POST', 
        success: function(response){        
			 
						    ds.reload(); 
						    EditAudioWindow.hide();   
		
              
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
    selectedCourse.push(selections[i].xml.idAudienceTypes);
  }
 
  
  function confirmDeleteCourses(){
    if(myGrid.selModel.getCount() == 1) // only one president is selected here
    {
      Ext.MessageBox.confirm('Confirmation','Are you sure you want to delete this Audience Type?', deleteCourses);
    } else if(myGrid.selModel.getCount() > 1){
      Ext.MessageBox.confirm('Confirmation','Are you sure you want to delete those Audience Types?', deleteCourses);
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
            url: '../listCourses.do', 
            params: { 
               task: "DELETEAUDIO", 
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