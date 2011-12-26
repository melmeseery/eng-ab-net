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

	var Contracts  = Ext.data.Record.create([
	  {name: 'contractId', type: 'int'},
      {name: 'clientName', type: 'string'},
      {name: 'contractStatus', type: 'string'},
      {name: 'contractDateOfRequest', type: 'string'},
      {name: 'contractFirstStartDate', type: 'string'},
      {name: 'contractFirstEndDate', type: 'string'},
      {name: 'contractFundType', type: 'string'},
      {name: 'contractProactiveType', type: 'string'},
      {name: 'proposalID', type: 'string'},
      {name: 'contractDateOfRequest', type: 'string'},
      {name: 'contractDealPerson', type: 'string'},
      {name: 'contractRateType', type:'string'},
      {name: 'contractTotalPrice', type:'int'}
     ]);
     
    dataProxy = new Ext.data.HttpProxy({
     	url: '../ContractsAction.do',
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
   		record: "Contracts",           // The repeated element which contains row information
   		id: "contractId"
        },Contracts
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
 var sm = new Ext.grid.CheckboxSelectionModel();
    // the DefaultColumnModel expects this blob to define columns. It can be extended to provide
    // custom or reusable ColumnModels
      var colModel = new Ext.grid.ColumnModel([sm,
      	{header: "Contract ID", width: 130, sortable: true, locked:false, dataIndex: 'proposalID'}, 
      	     {header: "Client", width: 150, sortable: true, dataIndex: 'clientName'},
        {header: "Deal Person", width: 150, sortable: true, dataIndex: 'contractDealPerson'},
        {header: "Fund Type", width: 130, sortable: true, dataIndex: 'contractFundType'},
        {header: "Proactive Type", width: 100, sortable: true, dataIndex: 'contractProactiveType'}, 
        {header: "Contract Rate Type", width: 120, sortable: true, dataIndex: 'contractRateType'},
        {header: "Request Date", width: 120, sortable: true, dataIndex: 'contractDateOfRequest'},
        {header: "Tentative Start Date", width: 120, sortable: true, dataIndex: 'contractFirstStartDate'},
        {header: "Tentative End Date", width: 120, sortable: true, dataIndex: 'contractFirstEndDate'},
        {header: "Status", width: 120, sortable: true, dataIndex: 'contractStatus'},
        {header: "Contract Total Price", width: 120, sortable: true, dataIndex: 'contractTotalPrice'}
        
        
        
    ]);


 
    var myGrid = new Ext.grid.GridPanel({
        ds: ds,
        cm: colModel,
        stripeRows: true,
        height:495, 
        renderTo: 'binding-example',
         /* width:980,*/
        title:'Contracts',
        sm:sm,
          viewConfig: {
            forceFit:true
        },
        selModel: new Ext.grid.RowSelectionModel({singleSelect:false}),
        tbar:[new Ext.Toolbar.Button({
              text: 'Delete Selection(s)',
           	  tooltip:'Remove the selected Contract(s)',
              iconCls:'remove',
              handler: confirmDeleteContract
              })
		
		]
 
    });

myGrid.on("rowdblclick", function(myGrid) {
	  var selections = myGrid.selModel.getSelections();
         var selectedCourse = [];
         for(i = 0; i< myGrid.selModel.getCount(); i++){
          selectedCourse.push(selections[i].id);
        //  alert("ssssssssssssss>>>>>> "+selections[i].id);
         }

window.location = '../JSP/editContract.jsp?contractid='+selections[0].id;
});


  
  ds.on('add', function(){
	ds.reload();
//myGrid.getView().refresh();
   });

 
 /********************************************************************/
 
  ////////////////////delete selection record(s)//////////////////////////////

  function confirmDeleteContract(){
    if(myGrid.selModel.getCount() == 1) // only one president is selected here
    {
      Ext.MessageBox.confirm('Confirmation','Are you sure you want to delete this Contract?', deleteContracts);
    } else if(myGrid.selModel.getCount() > 1){
      Ext.MessageBox.confirm('Confirmation','Are you sure you want to delete those Contracts?', deleteContracts);
    } else {
      Ext.MessageBox.alert('Uh oh...','You can\'t really delete something you haven\'t selected?');
    }
  }
  
  function deleteContracts(btn){
    if(btn=='yes'){
         var selections = myGrid.selModel.getSelections();
         var selectedContract = [];
         for(i = 0; i< myGrid.selModel.getCount(); i++){
          selectedContract.push(selections[i].id);
        //  alert("ssssssssssssss>>>>>> "+selections[i].id);
         }
         
         Ext.Ajax.request({  
            waitMsg: 'Please Wait',
            url: '../ContractsAction.do', 
            params: { 
               task: "deleteContract", 
               ids:  selectedContract,
               contstatus:'contract'
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
//console.log("  LOOOOOOOOOOOOOOD ");

};

	loadtest=   ds.load({callback :  stcCallBack1001});

});