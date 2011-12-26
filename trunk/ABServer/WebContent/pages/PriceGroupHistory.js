
Ext.onReady(function() {

    Ext.form.Field.prototype.msgTarget = 'side';

    var bd = Ext.getBody();

	var Pricegrouphistory  = Ext.data.Record.create([
      {name: 'idPriceGroupHistory', type: 'int'},
      {name: 'priceGroupHitoryImcClient', type: 'string'},
      {name: 'priceGroupHitoryImcCompany', type: 'string'},
      {name: 'priceGroupHitoryInternational', type: 'string'},
      {name: 'priceGroupHitoryPulicClient', type: 'string'},
      {name: 'priceGroupHitoryPulicCompany', type: 'string'},
      {name: 'priceGroupValidFrom',type:'string'},
      {name: 'currency', type: 'string'},
      {name: 'priceGroupValid', type:'boolean'}

     ]);
     
    dataProxy = new Ext.data.HttpProxy({
     	url: '../listPriceHistory.do',
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
   		record: "Pricegrouphistory",           // The repeated element which contains row information
   		id: "idPriceGroupHistory"
        },Pricegrouphistory
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
      	{header: "IMC Rate @ Company Premises", width: 200, sortable: true, locked:false, dataIndex: 'priceGroupHitoryImcCompany'}, 
        {header: "IMC Rate @ Client Premises", width: 200, sortable: true, dataIndex: 'priceGroupHitoryImcClient'},
        {header: "Local Rate @ Company Premises", width: 200, sortable: true, locked:false, dataIndex: 'priceGroupHitoryPulicCompany'}, 
        {header: "Local Rate @ Client Premises", width: 200, sortable: true, dataIndex: 'priceGroupHitoryPulicClient'},
        {header: "International Rate", width: 150, sortable: true, dataIndex: 'priceGroupHitoryInternational'},
		{header: "Valid From", width: 150, sortable: true, dataIndex: 'priceGroupValidFrom'},
        {header: "Currency", width: 150, sortable: true, dataIndex: 'currency'}
    ]);


 
    var myGrid = new Ext.grid.GridPanel({
        ds: ds,
        cm: colModel,
        stripeRows: true,
         height:495, 
        renderTo: 'binding-example',
        
        title:'Group Training Price History',
        tbar: [new Ext.Toolbar.Button({
             text: 'Add Group Price',
             iconCls:'add',
             handler: function(){  window.location = 'addPriceGroup.jsp';}
             }),'-',new Ext.Toolbar.Button({
              text: 'Delete Selection',
              iconCls:'remove',
              handler: confirmDeleteCourses
              })],
        selModel: new Ext.grid.RowSelectionModel({singleSelect:false})
 
    });
    var valid;
    ds.on('load', function(){//alert(ds.getCount());
    	for(var i=0;i<ds.getCount();i++)
    	{
    		var Rec = ds.getAt(i);
    		//alert(Rec.get('priceGroupValid'))
    		if(Rec.get('priceGroupValid')==true)
    		{
    			valid=Rec.get('idPriceGroupHistory');
    			//alert('valid= '+Rec.get('priceGroupValid'));
    		}
    	}
    });
ds.on('add', function(){
	ds.reload();
//myGrid.getView().refresh();
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
});*/

		 var selections = myGrid.selModel.getSelections();
         var selectedCourse = [];
         for(i = 0; i< myGrid.selModel.getCount(); i++){
          selectedCourse.push(selections[i].id);
        //  alert("ssssssssssssss>>>>>> "+selections[i].id);
         }

window.location = 'editPriceHistory.jsp?p='+selections[0].id;
});

  
 
 
 /********************************************************************/
 
  ////////////////////delete selection record(s)//////////////////////////////
  var selections = myGrid.selModel.getSelections();
  var selectedCourse = [];
  for(i = 0; i< myGrid.selModel.getCount(); i++){
    selectedCourse.push(selections[i].xml.idCourses);
  }
 
  
  function confirmDeleteCourses(){
    if(myGrid.selModel.getCount() == 1) // only one president is selected here
    {
      Ext.MessageBox.confirm('Confirmation','Are you sure you want to delete this PriceGroup?', deleteCourses);
    } else if(myGrid.selModel.getCount() > 1){
      Ext.MessageBox.confirm('Confirmation','Are you sure you want to delete those PriceGroups?', deleteCourses);
    } else {
      Ext.MessageBox.alert('Uh oh...','You can\'t really delete something you haven\'t selected huh?');
    }
  }
  
  function deleteCourses(btn){
    if(btn=='yes'){//alert(valid);
         var selections = myGrid.selModel.getSelections();
         var selectedCourse = [];
         for(i = 0; i< myGrid.selModel.getCount(); i++){
         	if(selections[i].id != valid)
          		selectedCourse.push(selections[i].id);
        //  alert("ssssssssssssss>>>>>> "+selections[i].id);
        else
        	Ext.MessageBox.alert('error','You can not delete the valid price');  
       
        }
        if(selectedCourse.length != 0)
        { 
	        Ext.Ajax.request({  
	            waitMsg: 'Please Wait',
	            url: '../listPriceHistory.do', 
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
  }
  
  
  //////////////////////////FINISH DELETING//////////////////////////////////////////


	
	function stcCallBack1001(record, opts, success) {
//if (success) 
//// do whatever
//{alert("the sucess ");
// alert (" number of records "+ds.getCount() +"  recourd "+ds.getAt(0)) ;
 ////console.log("  LOOOOOOOOOOOOOOD ");
//}


};

	loadtest=   ds.load({callback :  stcCallBack1001});

});