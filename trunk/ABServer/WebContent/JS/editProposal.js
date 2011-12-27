                                                                                                                                                                                                                           

// dates validation
Ext.apply(Ext.form.VTypes, {
    daterange : function(val, field) {
        var date = field.parseDate(val);

        if(!date){
            return;
        }
        if (field.startDateField && (!this.dateRangeMax || (date.getTime() != this.dateRangeMax.getTime()))) {
            var start = Ext.getCmp(field.startDateField);
            start.maxValue = date;
            //start.validate();
            this.dateRangeMax = date;
        } 
        else if (field.endDateField && (!this.dateRangeMin || (date.getTime() != this.dateRangeMin.getTime()))) {
            var end = Ext.getCmp(field.endDateField);
            end.minValue = date;
          //  end.validate();
            this.dateRangeMin = date;
        }
        /*
         * Always return true since we're only using this vtype to set the
         * min/max allowed values (these are tested for after the vtype test)
         */
        return true;
    }
});


Ext.onReady(function() {

      Ext.form.Field.prototype.msgTarget = 'side';

      var bd = Ext.getBody();
	  var checkBoxValue = '0';
	  var contractPriceValue = 0;
	  
	  var contractGroupPrice = 0;
	  
      var contractId = '';
      var contractCourse = '';
      var clientId = '';
 	  var coordinatorId = '';
 	  var coordinatorTeamId = '';
	  var venue_datashow_Grid_cID = 0;
	  
	  var contractDealPersonType = '';
	  var contractDealPersonTypeId = 0;
	  
	  var contractFlag = true;
	  
	  

var Contract = Ext.data.Record.create([
	  {name: 'contractId', type: 'int'},
      {name: 'clientName', type: 'string'},
      {name: 'clientId', type: 'int'},
      {name: 'proposalID', type: 'string'},
      {name: 'contractProactiveType', type: 'string'},
      {name: 'contractRateType', type: 'string'},
      {name: 'contractFundType', type: 'string'},
      {name: 'requestDate', type: 'string'},
      {name: 'tentativeStartDate', type: 'string'},
      
      {name: 'clientReceiveDate', type: 'string'},
      {name: 'clientApproveDate', type: 'string'},
      
      {name: 'tentativeEndDate', type: 'string'},
      {name: 'contractDealPerson', type: 'string'},
      {name: 'contractPrice', type: 'int'},
      {name: 'contractTotalPrice', type: 'int'},
      {name: 'contractPriceNote', type: 'string'},
      {name: 'coordinatorName', type: 'string'},
      {name: 'coordinatorId', type: 'int'},
      {name: 'coordinatorTeam', type: 'string'},
      
       {name: 'contractDealPersonTypeId', type: 'int'},
        {name: 'contractDealPersonType', type: 'string'},
      
      
      {name: 'coordinatorTeamId', type: 'int'},
      {name: 'contractVenueLocation', type: 'int'},
      {name: 'contractVenueArrangment', type: 'int'},
      {name: 'venueCostRes', type: 'int'},
      {name: 'contractStatus', type: 'string'},
      {name: 'progressHistory', type: 'string'}

     ]);

var retreivingDataProxy = new Ext.data.HttpProxy({
     	url: '../GeneralRetreivingAction.do',
     	method: 'POST', 
        headers:{'request-type':'ajax' }
  });


contractProxy = new Ext.data.HttpProxy({
     	url: '../ContractsAction.do',
     	method: 'POST', 
        headers:{'request-type':'ajax' }
      });

  var contractDS = new Ext.data.Store({
       // load using HTTP
      proxy: contractProxy,
      baseParams:{task:'retreiveContract'},  
      // the return will be XML, so lets set up a reader
      reader: new Ext.data.XmlReader({
        totalRecords: "results",// The element which contains the total dataset size (optional)
   		record: "Contract",
   		id: "contractId"
        },Contract
        )
      });
 
 contractDS.on('load', function(){
  	
		var contractRec = contractDS.getAt(0);
		
		clientNameCombo.setValue(contractRec.get('clientName'));
		ProgressHistory.setValue(contractRec.get('progressHistory'));
		
		createProposalForm.setTitle('Edit Proposal - '+contractRec.get('clientName'));
		contractCoursesGrid.setTitle(contractRec.get('clientName')+' Courses');
		
		clientId = contractRec.get('clientId');
		
		  //console.log('cintract price === '+contractRec.get('contractPrice'));
		setContractProactiveValue(contractRec.get('contractProactiveType'));
		setContractFundValue(contractRec.get('contractFundType'));
		
		
		if(contractRec.get('contractFundType') == '1'){
		
		checkBoxValue = '1';
		//pan.getComponent(5).enable();
		contractRateCombo.disable();
		
		}
		else{
		
		checkBoxValue = '0';
		
		contractRateCombo.enable();
		
		contractRateCombo.setValue(contractRec.get('contractRateType'));
		
		}
		

		if(contractRec.get('contractVenueLocation') == 0)
			locationCombo.disable();
		else{
			locationCombo.enable();
			locationCombo.setValue(contractRec.get('contractVenueLocation'))
		}
		if(contractRec.get('contractVenueArrangment') == 0)
			venueArrangmentCombo.disable();
		else{
		venueArrangmentCombo.enable();
		venueArrangmentCombo.setValue(contractRec.get('contractVenueArrangment'));
		}
		if(contractRec.get('venueCostRes') == 0)
			venueCostResCombo.disable();
		else{
			venueCostResCombo.enable();
		venueCostResCombo.setValue(contractRec.get('venueCostRes'));
		}
		
	//	console.log(contractRec.get('contractStatus'));

		contractPrice.enable();
	
		contractGroupPrice = contractRec.get('contractPrice');
		contractPrice.setValue(contractRec.get('contractPrice'));
		
		if(contractRec.get('contractDealPersonType') == 'Resources')
		dealPersonTypeCombo.setValue(3);
		else if(contractRec.get('contractDealPersonType') == 'TrainingCoordinators')
		dealPersonTypeCombo.setValue(2);
		else if(contractRec.get('contractDealPersonType') == 'Users')
		dealPersonTypeCombo.setValue(1);
		
		contractDealPerson.setValue(contractRec.get('contractDealPerson'));
		
		contractDealPersonType = contractRec.get('contractDealPersonType');
		contractDealPersonTypeId = contractRec.get('contractDealPersonTypeId');
		
		
		
		
		contractId = contractRec.get('contractId');	
		
		proposalIdField.setValue(contractRec.get('proposalID'));

		requestDateField.setValue(contractRec.get('requestDate'));
		tentativeStartField.setValue(contractRec.get('tentativeStartDate'));
		tentativeEndField.setValue(contractRec.get('tentativeEndDate'));
		
		requestDateField.disable();
//		tentativeStartField.disable();
//		tentativeEndField.disable();
		
		if(contractRec.get('clientReceiveDate') == ''){
			clientReceiveCheckBox.enable();
			clientReceiveCheckBox.setValue(false);
			clientReceiveDateField.disable();
			
			
			clientApproveCheckBox.reset();
			clientApproveDateField.reset();
			clientApproveCheckBox.disable();
			clientApproveDateField.disable();
		}
		else{
			clientReceiveCheckBox.setValue(true);
			clientReceiveDateField.setValue(contractRec.get('clientReceiveDate'));
			if(contractRec.get('clientApproveDate') != ''){
			clientReceiveCheckBox.disable();
			clientReceiveDateField.disable();
			}
			else{
				clientReceiveCheckBox.enable();
				clientReceiveDateField.enable();
			}
			
			
		}
		
		if(contractRec.get('clientApproveDate') == '' && contractRec.get('clientReceiveDate') != ''){
			clientApproveCheckBox.enable();
			clientApproveCheckBox.setValue(false);
			clientApproveDateField.disable();
			

		}
		else if(contractRec.get('clientReceiveDate') != ''){
			clientApproveCheckBox.setValue(true);
			clientApproveCheckBox.disable();
			clientApproveDateField.setValue(contractRec.get('clientApproveDate'));
			clientApproveDateField.disable();
			
			
		}
		
		
		
		
		if(contractRec.get('coordinatorName') == ''){
			
			
			if(contractRec.get('coordinatorTeam') == ''){
			coordinator_team.setValue(false);
			coordinatorTeamCombo.disable();
			
			}
			else{
			coordinator_team.setValue(true);
			coordinatorTeamCombo.enable();	
			coordinatorTeamCombo.setValue(contractRec.get('coordinatorTeam'));
			coordinatorTeamId = contractRec.get('coordinatorTeamId');
			}
			coordinator_individual.setValue(false);
			coordinatorNameCombo.disable();
			
			
		}
		else{
		coordinator_individual.setValue(true);
		coordinatorNameCombo.enable();	
		
		  //console.log('coordinator name = '+contractRec.get('coordinatorName'));
		  //console.log('coordinator id = '+contractRec.get('coordinatorId'));
		
		coordinatorNameCombo.setValue(contractRec.get('coordinatorName'));
		coordinatorId = contractRec.get('coordinatorId');
		
		coordinator_team.setValue(false);
		coordinatorTeamCombo.disable();
		
		}
		
		
		
		contractTotalPrice.setValue(contractRec.get('contractTotalPrice'));
		contractPriceNote.setValue(contractRec.get('contractPriceNote'));
		
		//'<h4>-> '+contractRec.get('contractTotalPrice')+'</h4>'
		
		
		pan.getTopToolbar().add('<DIV style="color:'+"red"+'"><h4>&nbsp;-> '+contractRec.get('contractTotalPrice')+'</h4></DIV>');
		///load the contract courses
		ds.load();
});




 
	

    var clientsDS = new Ext.data.Store({
       // load using HTTP
      proxy: retreivingDataProxy,
      baseParams:{task: "clients"},  
      // the return will be XML, so lets set up a reader
      reader: new Ext.data.XmlReader({
       // The element which contains the total dataset size (optional)
   		record: "Client"
        },[{name: 'clientName', type: 'string'},{name:'clientId',type:'int'}]
        )
      });
   	
   	var clientNameCombo = new Ext.form.ComboBox({        	
		    store: clientsDS,
		    width: 200,
		    fieldLabel: 'Client Name <html><font color=red> *</font></html>',
		    valueField: 'clientId',
		    displayField:'clientName',
		    typeAhead: true,
		    editable: false,
		    triggerAction: 'all',
		    emptyText:'Select a client...',
		    selectOnFocus:true,
         listeners: {
         select: function (combo, record, index) {
    	    this.selectedIndex = index;
    	    
      		clientId = this.getValue();
      		
      		
      		 Ext.Ajax.request({   
			        waitMsg: 'Please wait...',
			        url: '../ContractsAction.do',
			        params: {
			          task: "changeProposalId",
			          clientid:this.getValue(),
			          contractId:contractId
			        },
			        method:'POST', 
			        success: function(response){        
			
				   proposalIdField.setValue(response.responseText);
			       
			        },
			        failure: function(response){
			          var result=response.responseText;
			          Ext.MessageBox.alert('error',result+'  could not connect to the database. retry later');          
			        }                      
     			 });
      
         }}
			});
	
	var proposalIdField = new Ext.form.TextField({
      		fieldLabel: 'Proposal ID',
      		allowBlank: false,
      		width: 200,
    		autoShow : true,
    		readOnly: true,
    	//	disabled : true,
    		maskRe: /([a-zA-Z0-9\s]+)$/
     		});
     		
   
   
    var ContractProactive = new Ext.form.RadioGroup({
        	//xtype: 'radiogroup',
        	fieldLabel: 'How Client was Approached <html><font color=red> *</font></html>',
        	columns:1,
                items: [
                    {boxLabel: 'Proactive Business Development', name: 'rb-auto1', inputValue: 1},
                    {boxLabel: 'Reactve to Client Request', name: 'rb-auto1', inputValue: 2}
                ]
        	
        	
        });
        
      /******************get value***********************************/  
	 function getContractProactiveValue() {
	    var v;
	
	    ContractProactive.items.each(function(item) {
	      v = item.getRawValue();
	      return !item.getValue();
	    });
	
	    return v;
	  };
	  
	  
	  function setContractProactiveValue(v1) {
	    var v2;
	
	    ContractProactive.items.each(function(item) {
	      v2 = item.getRawValue();

	     
	      if(v1==v2)
	      item.setValue(true);
	      return !(v1==v2);
	    });
	
	  };
   

    var ContractNoFund = new Ext.form.Radio({
        	//xtype: 'radiogroup',
        	fieldLabel: 'Client Funding<html><font color=red> *</font></html>',
        	columns:1,
        	name:'n1',
        	value:1,
        	
        	boxLabel:'Not Funded',
	         listeners: {
	         check: function () {
	    	    
	    	      //console.log('on checkkkk ... '+getContractFundValue());
 		
		 		if(getContractFundValue() == 1){
		 			contractRateCombo.disable();
		 			contractRateCombo.reset();
		 			
		 			locationCombo.enable();
		 			locationCombo.reset();
		 			
		 			venueArrangmentCombo.disable();
		 			venueArrangmentCombo.reset();
		 			
		 			venueCostResCombo.disable();
		 			venueCostResCombo.reset();
		 			
		 		//	pan.getComponent(5).enable();
		 			
		 								
					contractPrice.reset();
				//	contractPrice.disable();
		 			
		 			contractfund = 1;
		 		
		 		}
		 		else if(getContractFundValue() == 2){
					contractRateCombo.enable();
					contractRateCombo.reset();
					
					locationCombo.disable();
		 			locationCombo.reset();
					
					venueArrangmentCombo.disable();
		 			venueArrangmentCombo.reset();
		 			
		 			venueCostResCombo.disable();
		 			venueCostResCombo.reset();
		 			
					//pan.getComponent(5).disable();
					
					contractPrice.reset();
				//	contractPrice.disable();
		 			contractfund = 2;
		 		}
			    	    
			}}
		        	
        	
        });
       var ContractFund = new Ext.form.Radio({
        	//xtype: 'radiogroup',
        	fieldLabel: 'Client Funding',
        	hideLabel:true,
        	columns:1,
        	name:'n1',
        	value:2,
            boxLabel:'Funded By a Sponsoring Body',
	        listeners: {
	         	check: function () {
	         		ContractNoFund.fireEvent('check');
	         	}
	         }
        });
        
        
         
      /******************get value***********************************/  
	 function getContractFundValue() {
	 	  //console.log(ContractFund.checked);
	 	var v;
	 	if(ContractNoFund.getValue() == true)
	 	
	 	 v = 2;
	 	else if(ContractFund.getValue() == true)
	 	
	 	 v = 1;
	 	
	 	return v;
	 	

	  };
	function setContractFundValue(v1) {
		 	
		 	if(v1 == 1){
		 	
		 	ContractFund.setValue(true);
		 	ContractNoFund.setValue(false);
		 	}
		 	else if(v1 == 2){
		 	
		 	 ContractNoFund.setValue(true);
		 	 ContractFund.setValue(false);
		 	}
		 	
		  };

var coordinatorsDS = new Ext.data.Store({
       // load using HTTP
      proxy: retreivingDataProxy,
      baseParams:{task: "coordinators"},
      // the return will be XML, so lets set up a reader
      reader: new Ext.data.XmlReader({
       // The element which contains the total dataset size (optional)
   		record: "Coordinator"
        },[{name: 'coordinatorName', type: 'string'},{name: 'coordinatorId', type: 'int'}]
        )
      });

var coordinatorsteamsDS = new Ext.data.Store({
       // load using HTTP
      proxy: retreivingDataProxy,
      baseParams:{task: "coordinatorsTeams"},
      // the return will be XML, so lets set up a reader
      reader: new Ext.data.XmlReader({
       // The element which contains the total dataset size (optional)
   		record: "CoordinatorsTeam"
        },[{name: 'coordinatorsTeamName', type: 'string'},{name: 'coordinatorsTeamId', type: 'int'}]
        )
      });

	var coordinatorNameCombo = new Ext.form.ComboBox({            	
		    store: coordinatorsDS,
		    width: 200,
		    fieldLabel: 'Name',
		    valueField: 'coordinatorId',
		    displayField:'coordinatorName',
		    selectOnFocus: true,
		    typeAhead: true,
		    editable: false,
		    triggerAction: 'all',
	
		    emptyText:'Select Coordinator...',
		    selectOnFocus:true,
	         listeners: {
	         select: function (combo, record, index) {
	    	    coordinatorId = this.getValue();
	         }}
	});
	var coordinatorTeamCombo = new Ext.form.ComboBox({            	
			    store: coordinatorsteamsDS,
			    fieldLabel: 'Team',
			    width: 200,
			    displayField:'coordinatorsTeamName',
			    valueField: 'coordinatorsTeamId',
			    selectOnFocus: true,
			    typeAhead: true,
			    editable: false,
			    triggerAction: 'all',
		
			    emptyText:'Select Coordinator Team...',
		    	selectOnFocus:true,
	         listeners: {
	         select: function (combo, record, index) {
	    	    coordinatorTeamId = this.getValue();
	         }}
		});



    var coordinator_individual = new Ext.form.Radio({
        	//xtype: 'radiogroup',
        	fieldLabel: 'Coordinator Selection',
        	columns:1,
        	name:'n2',
        	value:1,
        //	checked:true,
        	boxLabel:'Individual',
	         listeners: {
	         check: function () {
	    	    //console.log('change .......... '+getcoordinatorSelectionValue());
		 		if(getcoordinatorSelectionValue() == 1){
		 			coordinatorNameCombo.enable();
		 		//	coordinatorNameCombo.reset();
		 			
		 			coordinatorTeamCombo.disable();
		 			coordinatorTeamCombo.reset();
		 			
		 		
		 		}
		 		else if(getcoordinatorSelectionValue() == 2){
					coordinatorNameCombo.disable();
		 			coordinatorNameCombo.reset();
		 			
		 			coordinatorTeamCombo.enable();
		 		//	coordinatorTeamCombo.reset();
					
		 		
		 		}
			    	   
			         }}
		        	
        	
        });
       var coordinator_team = new Ext.form.Radio({
        	
        	hideLabel:true,
        	columns:1,
        	name:'n2',
        	value:2,
            boxLabel:'Team',
	        listeners: {
	         	check: function () {
	         		coordinator_individual.fireEvent('check');
	         	}
	         }
        });
        
     
      /******************get value***********************************/  
	 function getcoordinatorSelectionValue() {
	 	  //console.log(coordinator_individual.checked);
	 	var v =0;
	 	if(coordinator_individual.getValue() == true)
	 	
	 	 v = 1;
	 	else if(coordinator_team.getValue() == true)
	 	
	 	 v = 2;
	 	
	 	return v;
	 	

	  };


  var rateTypeData = [
        ['1','International'],
        ['2','Local']];

	var rateTypeDS = new Ext.data.SimpleStore({
        fields: ['id','name'],
        data: rateTypeData
    });
	// the contract rate comboBox
	var contractRateCombo = new Ext.form.ComboBox({            	
		    store: rateTypeDS,
		    fieldLabel: 'Proposal Rate Type <html><font color=red> *</font></html>',
		    displayField:'name',
		    width: 200,
		    valueField: 'id',
		    selectOnFocus: true,
		    mode: 'local',
		    typeAhead: true,
		    editable: false,
		    triggerAction: 'all',
	
		    emptyText:'Select a Contract Rate Type...',
		    
         listeners: {
         select: function (combo, record, index) {
    	 this.selectedIndex = index;
    	    if(index == 0){
    	    Ext.Ajax.request({   
		        waitMsg: 'Please wait...',
		        url: '../ContractsAction.do',
		        params: {
		          task: "retreiveContractPrice",
				  priceType:"E"
		        },
		        method:'POST', 
		        success: function(response){        
				contractPrice.reset();
			   contractPrice.setValue(response.responseText);
		       
		        },
		        failure: function(response){
		          var result=response.responseText;
		          Ext.MessageBox.alert('error',result+'  could not connect to the database. retry later');          
		        }                      
      		});
      		locationCombo.reset();
      		locationCombo.disable();
		 	
		 	venueArrangmentCombo.reset();
      		venueArrangmentCombo.disable();
      		
      		venueCostResCombo.reset();
      		venueCostResCombo.disable();
		 	
		 	
    	   }
    	   else if(index == 1){
    	   	contractPrice.reset();
    	   	locationCombo.enable();
		 	locationCombo.reset();
    	   }
         }}
	});
	
	
	
	
     
	var requestDateField = new Ext.form.DateField({
				fieldLabel: 'Date of Request<html><font color=red> *</font></html>',
                format: 'd-M-Y',
                minValue: '1940-01-01',
                width: 200,
                id: 'requestdt',
        		vtype: 'daterange',
        		endDateField: 'tsdt'
            });
            
     var tentativeStartField = new Ext.form.DateField({
				fieldLabel: 'Tentative Start Date',
                format: 'd-M-Y',
                minValue: '1940-01-01',
                width: 200,
                id: 'tsdt',
        		vtype: 'daterange',
        		endDateField: 'tedt',
        		startDateField: 'requestdt'
            });
    
    var tentativeEndField = new Ext.form.DateField({
				fieldLabel: 'Tentative End Date',
                format: 'd-M-Y',
                minValue: '1940-01-01',
                width: 200,
                id: 'tedt',
                vtype: 'daterange',
        		startDateField: 'tsdt'
            });
       

 ///////////////////////////////////////////////////////////////////////////////////////////////////////////
 
 
 var dealPersonTypeData = [
        ['1','Directors/Managers'],
        ['2','Coordinators'],['3','Associates']];

	var dealPersonTypeDS = new Ext.data.SimpleStore({
        fields: ['id','name'],
        data: dealPersonTypeData
    });
	// the contract rate comboBox
	var dealPersonTypeCombo = new Ext.form.ComboBox({            	
		    store: dealPersonTypeDS,
		    fieldLabel: 'Position of Responsible Person <html><font color=red> *</font></html>',
		    displayField:'name',
		    width: 200,
		    valueField: 'id',
		    selectOnFocus: true,
		    mode: 'local',
		    //disabled: true,
		    typeAhead: true,
		    editable: false,
		    triggerAction: 'all',
	
		    emptyText:'Select The Deal Person Position...',
		    
         	listeners: {
         		select: function (combo, record, index) {
    	    		this.selectedIndex = index;
    	    
    	    	  dealPersonDS.load({params:{task:'contractDealPersons',dealPersonType: this.getValue()}});
		    	  contractDealPerson.reset();
         	}}
	});
       
        var dealPersonDS = new Ext.data.Store({
       // load using HTTP
      proxy: retreivingDataProxy,
   //   baseParams:{task: "contractDealPersons"},  
      // the return will be XML, so lets set up a reader
      reader: new Ext.data.XmlReader({
       // The element which contains the total dataset size (optional)
   		record: "DealPerson"
        },[{name: 'dealPersonName', type: 'string'},{name: 'dealPersonType', type: 'string'},{name:'dealPersonId',type:'int'}]
        )
      });
       
        
       var contractDealPerson = new Ext.form.ComboBox({
      		fieldLabel: 'Person Responsible to Finalize the Proposal <html><font color=red> *</font></html>',
      		store: dealPersonDS,
		    displayField:'dealPersonName',
		    width: 200,
		    //valueField: 'id',
		    selectOnFocus: true,
		    mode: 'local',
		    typeAhead: true,
		    editable: false,
		    triggerAction: 'all',
	
		    emptyText:'Select Contract Deal Person...',
		    
         listeners: {
         select: function (combo, record, index) {
    	 this.selectedIndex = index;
    	   
    	    contractDealPersonType = dealPersonDS.getAt(index).get('dealPersonType');
			contractDealPersonTypeId = dealPersonDS.getAt(index).get('dealPersonId');
			
         }}
	});     
      
      //////////////////////////venue//////////////////////////////////////////////////
    var locationData = [
        ['1','@ Our Premises'],
        ['2','@ Client Premises'],['3','@ a Venue']];

	var locationDS = new Ext.data.SimpleStore({
        fields: ['id','name'],
        data: locationData
    });
	// the contract rate comboBox
	var locationCombo = new Ext.form.ComboBox({            	
		    store: locationDS,
		    fieldLabel: 'Location <html><font color=red> *</font></html>',
		    displayField:'name',
		    valueField: 'id',
		    selectOnFocus: true,
		    mode: 'local',
		    disabled: true,
		    typeAhead: true,
		    editable: false,
		    triggerAction: 'all',
	width: 200,
		    emptyText:'Where The Location...',
		    
         	listeners: {
         		select: function (combo, record, index) {
    	    		this.selectedIndex = index;
    	    		if(index == 2){
    	    		contractPrice.reset();
		    	   	venueArrangmentCombo.enable();
				 	venueArrangmentCombo.reset();
		    	   }
		    	    else {
		    	    var p = "";
		    	    if(getContractFundValue() == 1){
		    	    if(index == 0)
		    	    	p = "A";
		    	    else if(index == 1)
		    	    	p = "B";
		    	    }
		    	    else if(getContractFundValue() == 2){
		    	    if(index == 0)
		    	    	p = "C";
		    	    else if(index == 1)
		    	    	p = "D";
		    	    }  	
		    	    	
		    
		    	    Ext.Ajax.request({   
				        waitMsg: 'Please wait...',
				        url: '../ContractsAction.do',
				        params: {
				          task: "retreiveContractPrice",
					      priceType:p
				        },
				        method:'POST', 
				        success: function(response){        
						contractPrice.reset();
					   contractPrice.setValue(response.responseText);
				       
				        },
				        failure: function(response){
				          var result=response.responseText;
				          Ext.MessageBox.alert('error',result+'  could not connect to the database. retry later');          
				        }                      
		      		});
		    	   }
		    	  
         	}}
	});
	/////////////////////////////////////////////////////////////////
	var venueArrangmentData = [
        ['1','Client'],
        ['2','Our Company']];

	var venueArrangmentDS = new Ext.data.SimpleStore({
        fields: ['id','name'],
        data: venueArrangmentData
    });
	// the contract rate comboBox
	var venueArrangmentCombo = new Ext.form.ComboBox({            	
		    store: venueArrangmentDS,
		    fieldLabel: 'Venue Arrangment <html><font color=red> *</font></html>',
		    displayField:'name',
		    valueField: 'id',
		    selectOnFocus: true,
		    mode: 'local',
		    typeAhead: true,
		    disabled: true,
		    editable: false,
		    triggerAction: 'all',
	width: 200,
		    emptyText:'Who Arrange The Venue...',
		    
         	listeners: {
         		select: function (combo, record, index) {
    	    		this.selectedIndex = index;
	    	   			if(index == 1){
	    	   			contractPrice.reset();
			    	   	venueCostResCombo.enable();
					 	venueCostResCombo.reset();
			    	   }
			    	    else {
			    	    	
			    	    	var p = "";
				    	    if(getContractFundValue() == 1){
				    	    
				    	    	p = "B";
				    	    
				    	    }
				    	    else if(getContractFundValue() == 2){
				    	    
				    	    	p = "D";
				    	   
				    	    }  	
			    	    	
			    	    	Ext.Ajax.request({   
					        waitMsg: 'Please wait...',
					        url: '../ContractsAction.do',
					        params: {
					          task: "retreiveContractPrice",
					          priceType:p
					        },
					        method:'POST', 
					        success: function(response){        
							contractPrice.reset();
						   contractPrice.setValue(response.responseText);
					       
					        },
					        failure: function(response){
					          var result=response.responseText;
					          Ext.MessageBox.alert('error',result+'  could not connect to the database. retry later');          
					        }                      
			      		});
			    	   }
         	}}
	});
   ///////////////////////////////////////////////////////////////////
   
   		var venueCostResData = [
        ['1','Client'],
        ['2','Our Company']];

	var venueCostResDS = new Ext.data.SimpleStore({
        fields: ['id','name'],
        data: venueCostResData
    });
	// the contract rate comboBox
	var venueCostResCombo = new Ext.form.ComboBox({            	
		    store: venueCostResDS,
		    fieldLabel: 'Venue Cost Resposibality <html><font color=red> *</font></html>',
		    displayField:'name',
		    valueField: 'id',
		    selectOnFocus: true,
		    mode: 'local',
		    typeAhead: true,
		    disabled: true,
		    editable: false,
		    triggerAction: 'all',
			width: 200,
		    emptyText:'Who Pay The Venue Cost...',
		    
         	listeners: {
         		select: function (combo, record, index) {
    	    		this.selectedIndex = index;
    	   			if(index == 1){
    	   				contractPrice.reset();
			    	   //	contractPrice.enable();
					 	
			    	   }
			    	    else {
			    	    	var p = "";
				    	    if(getContractFundValue() == 1){
				    	    
				    	    	p = "B";
				    	    
				    	    }
				    	    else if(getContractFundValue() == 2){
				    	    
				    	    	p = "D";
				    	   
				    	    }  	
			    	    	Ext.Ajax.request({   
					        waitMsg: 'Please wait...',
					        url: '../ContractsAction.do',
					        params: {
					          task: "retreiveContractPrice",
					          priceType:p
					        },
					        method:'POST', 
					        success: function(response){        
							contractPrice.reset();
						   contractPrice.setValue(response.responseText);
					      
					        },
					        failure: function(response){
					          var result=response.responseText;
					          Ext.MessageBox.alert('error',result+'  could not connect to the database. retry later');          
					        }                      
			      		});
			    	   }
         	}}
	});	
   
   ////////////////////////////////////////////////////////
     		
   
     		var contractPrice = new Ext.form.NumberField({
      		fieldLabel: 'Man Day Rate',
      		allowBlank: false,
      		editable: true,
    		//disabled : true,
    		width: 200,
    		value:0
     		});	
     		
     		var contractPriceNote = new Ext.form.TextArea({
      		fieldLabel: 'Proposal Price Note',
      		
      		editable: false,
      		width: 200,
    		//disabled : true,
    		maskRe: /([a-zA-Z0-9\s]+)$/
     		});	
     		
     	
			/*-------------------------------------------------*/
	
			var contractTotalPrice = new Ext.form.NumberField({
      		fieldLabel: 'Proposal Total Price',
      		allowBlank: false,
      		width: 200,
      		value: contractPriceValue,
      		readOnly: true

     		});	
	
	//////////////////////////////////////////////////////////////////////////////////////////
		var clientReceiveCheckBox = new Ext.form.Checkbox({
	     	hideLabel: true,
			boxLabel: 'Client Received The Proposal',
			//name: 'search_option',
			value: '1',
			checked: false,
			width:350
		});
	
	// when check the contract fund checkbox enable the cotract rate comboBox
 	clientReceiveCheckBox.on('check', function(){
 		if(clientReceiveCheckBox.checked){
 			clientReceiveDateField.enable();
 			
 			clientReceiveDateField.reset();
 			
 		}
 		else{
 			
 			clientReceiveDateField.disable();
 			
 			clientReceiveDateField.reset();
 			
 			clientApproveCheckBox.disable();
 		}
   	});
	
			var clientReceiveDateField = new Ext.form.DateField({
			 fieldLabel: 'Client Receive Date',
             format: 'd-M-Y',
             minValue: '01-01-1940',
             width: 200,
      		// disabled: true,
      		 id: 'startdt',
        	 vtype: 'daterange',
        	 endDateField: 'enddt'
            });
            
            var ProgressHistory = new Ext.form.TextArea({
      		fieldLabel: 'Progress History',
      		width: 200,
      		
      		editable: false,
    		//disabled : true,
    		maskRe: /([a-zA-Z0-9\s]+)$/
     		});	
    ///////////////////////////////////////////////////////////////////////////////////
   	var clientApproveCheckBox = new Ext.form.Checkbox({
	     	hideLabel: true,
			boxLabel: 'Client Approved The Proposal',
			//name: 'search_option',
			value: '1',
			checked: false,
			width:350
		});
	
	// when check the contract fund checkbox enable the cotract rate comboBox
 	clientApproveCheckBox.on('check', function(){
 		if(clientApproveCheckBox.checked){
 			clientApproveDateField.enable();
 			
 			clientApproveDateField.reset();
 			
 		}
 		else{
 			
 			clientApproveDateField.disable();
 			
 			clientApproveDateField.reset();
 			
 		
 		}
   	}); 
           
     		var clientApproveDateField = new Ext.form.DateField({
			  fieldLabel: 'Client Approve Date',
              format: 'd-M-Y',
              minValue: '01-01-1940',
              width: 200,
     		//  disabled: true,
        	  id: 'enddt',
        	  vtype: 'daterange',
        	  startDateField: 'startdt' // id of the start date field
     		  
            });
   



/***********************the main form panel******************************/
 var createProposalForm = new Ext.form.FormPanel({
    //labelWidth: 100,
    frame: true,
    autoWidth : true, 
    autoHeight : true,
   layout:'table',
   layoutConfig: {columns:2},
    title:'Edit Proposal',
    defaultType: 'fieldset',
   defults:{width:600},
    items: [{
        	
            xtype: 'fieldset',
            labelWidth: 125,
            hideBorders : false,
            title:'Proposal Info',
            
           width: 460,	// Default config options for child items
            height: 480,
            items: [clientNameCombo,
     		proposalIdField,
			ContractProactive,
			 new Ext.form.FieldSet({
                labelWidth: 100,
                autoHeight: true,
                border: true,
         		anchor:'100% 100%',
                layout:'column',
                items: [
                {width:200,layout: 'form',
                items: [ContractNoFund]},
                {width:200,layout: 'form',
                items: [ContractFund]}
		                   ]
            }),

			contractRateCombo
			,
			 new Ext.form.FieldSet({
                labelWidth: 100,
                autoHeight: true,
                border: true,
         		anchor:'100% 100%',
                layout:'column',
                items: [
                {width:200,layout: 'form',
                items: [coordinator_individual]},
                {width:170,layout: 'form',
                items: [coordinator_team]}
		                   ]
            }),coordinatorNameCombo,coordinatorTeamCombo,dealPersonTypeCombo,
            contractDealPerson
     		
     		]
        },{
        	
            xtype: 'fieldset',
            labelWidth: 155,
            hideBorders : false,
            title:'Proposal Prices & Dates',
            width: 450,	// Default config options for child items        
            height: 480,
            bodyStyle: Ext.isIE ? 'padding:0 0 5px 15px;' : 'padding:10px 15px;',
            style: {
                "margin-left": "10px", // when you add custom margin in IE 6...
                "margin-right": Ext.isIE6 ? (Ext.isStrict ? "-10px" : "-13px") : "0"  // you have to adjust for it somewhere else
            },
            items: [locationCombo,venueArrangmentCombo,venueCostResCombo,contractPrice,
     		contractPriceNote,requestDateField,
     		tentativeStartField,
     		tentativeEndField,
     		clientReceiveCheckBox,
     		clientReceiveDateField,
     		clientApproveCheckBox,
     		clientApproveDateField,
     		ProgressHistory]
        }
        ]
     		
    
  });
//////////////////////////////////////////contract courses/////////////////////////////////////////////


 var msg = function(title, msg){
    Ext.Msg.show({
        title: title, 
        msg: msg,
        minWidth: 200,
        modal: true,
        icon: Ext.Msg.INFO,
        buttons: Ext.Msg.OK
    });
};


var Course  = Ext.data.Record.create([
  {name: 'courseId', type: 'int'},
  {name: 'courseName', type: 'string'},
  {name: 'status', type: 'string'},
  {name: 'courseRuns', type: 'int'},
  {name: 'courseDays', type: 'int'},
  {name: 'courseTotalDays', type: 'int'},
  {name: 'courseType', type: 'string'},
  {name: 'coursePriceType', type: 'string'},
  {name: 'coursePrice', type: 'int'},
  {name: 'courseParticipantsPerRun', type: 'int'},
  {name: 'courseTotalPrice', type: 'int'},
  {name: 'resourceId', type: 'int'},
  {name: 'coordinatorId', type: 'int'},
  {name: 'coordinatorName', type: 'string'},
  {name: 'venueId', type: 'int'},
  {name: 'venueName', type: 'string'},
  {name: 'venueConfirmDate', type: 'string'},
  {name: 'resourceConfirmDate', type: 'string'},
  {name: 'resourceName', type: 'string'},
  {name: 'venueLocation', type: 'string'},
  {name: 'venueDetails', type: 'string'},
  {name: 'datashowRequest', type: 'string'},
  
  {name: 'clientConfirmDate', type: 'string'},
  {name: 'cancelDate', type: 'string'},
  
  {name: 'locReceivedDate', type: 'string'},
  {name: 'CPRReceivedDate', type: 'string'},
  {name: 'courseComment', type: 'string'},
  {name: 'locNumber', type: 'int'},

  {name: 'resourceConfirm', type: 'boolean'},
  {name: 'venueConfirm', type: 'boolean'},
  {name: 'clientConfirm', type: 'boolean'},
  {name: 'locReceived', type: 'boolean'},
  {name: 'CPRReceived', type: 'boolean'},
  {name: 'courseCancel', type: 'boolean'},
  {name: 'priceRole', type: 'int'},
  {name: 'courseTime', type: 'int'}

 ]);
 
gridDataProxy = new Ext.data.HttpProxy({
	url: '../ContractsAction.do',
	method: 'POST', 
	headers:{'request-type':'ajax' }
});
 
var ds = new Ext.data.GroupingStore({
   // load using HTTP
  proxy: gridDataProxy,
  baseParams:{task:'retreiveContractCourses'}, 
  // the return will be XML, so lets set up a reader
  reader: new Ext.data.XmlReader({
    totalRecords: "results", // The element which contains the total dataset size (optional)
	record: "Course",           // The repeated element which contains row information
	id: "courseId"
    },Course
    ),
	groupField:'courseName',
	sortInfo:{field: 'courseName', direction: "ASC"}

    
  });
 ds.on('load',function(){
 	
 });
 
 
 var sm = new Ext.grid.CheckboxSelectionModel();

// the DefaultColumnModel expects this blob to define columns. It can be extended to provide
// custom or reusable ColumnModels
var colModel = new Ext.grid.ColumnModel([
sm,
    {id:'courseName',header: "Course", width: 120, sortable: true, locked:false, dataIndex: 'courseName'},
    {header: "Run Number", width: 100, sortable: true, dataIndex: 'courseRuns'},
    {header: "Course Days", width: 100, sortable: true, dataIndex: 'courseDays'},
    
    {header: "Course Type", width: 100, sortable: true, dataIndex: 'courseType'},
    {header: "Course Status", width: 100, sortable: true, dataIndex: 'status'},
    {header: "Price", width: 70, sortable: true, dataIndex: 'coursePrice'},
    {header: "Participants Per Run", width: 130, sortable: true, dataIndex: 'courseParticipantsPerRun'},
    {id:'courseTotalPrice',header: "Course Total Price", width: 170, sortable: true, dataIndex: 'courseTotalPrice'},
    {header: "Comment", width: 150, sortable: true, dataIndex: 'courseComment'}
]); 
  /*-------------------------contract courses grid-------------------------------------*/
var contractCoursesGrid = new Ext.grid.GridPanel({
        ds: ds,
        cm: colModel,
      colspan:2,
        autoExpandColumn: 'courseTotalPrice',
      //  frame:true,
      	 sm: sm,
      	 height: 463,
         autoHeight: false,
         width: 900,
         border: true,
         region: 'center',
         autoScroll: true,
         title:'Contract Courses',
         tbar: [new Ext.Toolbar.Button({
             text: 'Add Course',
             tooltip:'Add a new Contract Course',
             iconCls:'add',
             handler: displayContractCourseWindow
             }),new Ext.Toolbar.Button({
              text: 'Delete Selection',
           	  tooltip:'Remove the selected Course(s)',
              iconCls:'remove',
              handler: confirmDeleteCourses
              })],
        selModel: new Ext.grid.RowSelectionModel({singleSelect:false}),
        view: new Ext.grid.GroupingView({
            forceFit:true,
            groupTextTpl: '{text} ({[values.rs.length]} {[values.rs.length > 1 ? "Runs" : "Item"]})'
        }),
        

    });
    
/*-----------------------------add course comment-----------------------------------------------------*/
  var courseComment = new Ext.form.TextArea({
            fieldLabel: 'Comment',
           // disabled: true,
            grow: false,
            preventScrollbars:true
        });   
  
  
   var addCourseCommentForm = new Ext.form.FormPanel({
           
            
            
            labelWidth: 90,
         //   autoHeight:true,
            frame: true,
            defaults: {width: 200},
            defaultType: 'textfield',
          //  colspan:2,
            items :[courseComment
 
            ]
        });
 
 addCourseCommentWindow= new Ext.Window({
      id: 'addCourseCommentWindow',
      title: 'Comment',
      width: 400,
      height: 150,
      plain:true,
      buttonAlign:'center',
   //   layout: 'fit',
      items: [addCourseCommentForm],
         buttons:[{ 
                text:'Save',
                formBind: true,
             	iconCls:'save',  
                // Function that fires when user clicks the button 
                handler:function(){	
                	  Ext.Ajax.request({   
				        waitMsg: 'Please wait...',
				        url: '../ContractsAction.do',
				        params: {
				          task:              "addContractCourseComment",
				          courseId:          contractCourse,
				          courseComment :    courseComment.getValue()
				        },
				        method:'POST', 
				        success: function(response){
				        	ds.load();
				        	//contractDS.load();        
							addCourseCommentWindow.hide();    
				        },
				        failure: function(response){
				          var result=response.responseText;
				          Ext.MessageBox.alert('error',result+'  could not connect to the database. retry later');          
				        }                      
      				});
                	
              	
                }
              
            },{text:'Cancel',
            	handler:function(){addCourseCommentWindow.hide();}
            	}
           ] 
    });
//function resetEditContractCourseForm(){
//	editContractCourseForm.getForm().reset();
//	
//}		    
function displayAddCourseCommentWindow(){
  if(!addCourseCommentWindow.isVisible()){
   
    addCourseCommentWindow.show();
  } else {
    addCourseCommentWindow.toFront();
  }

}		      

    contractCoursesGrid.on('cellclick',function(grid, rowIndex, columnIndex, e) {
        var record = grid.getStore().getAt(rowIndex);  // Get the Record

	    contractCourse = record.get('courseId');
		 if(columnIndex == 9){
		 	courseComment.setValue(record.get('courseComment'));
	 	displayAddCourseCommentWindow();
	 }  
});
/*----------------------------add contract course---------------------------------------------------------------*/


 var taDS = new Ext.data.Store({
   // load using HTTP
  proxy: retreivingDataProxy,
  baseParams:{task: "trainingAreas"},
  // the return will be XML, so lets set up a reader
  reader: new Ext.data.XmlReader({
   	// The element which contains the total dataset size (optional)
	record: "TrainingArea"
	},[{name: 'trainingAreaId', type: 'int'},
	{name: 'trainingAreaName', type: 'string'}])
 
 });

taDS.on('load',function(){
	
	  //console.log('nnn '+taDS.getCount());
});

 var tracksDS = new Ext.data.Store({
   // load using HTTP
  proxy: retreivingDataProxy,
  baseParams:{task: "tracks"},
  // the return will be XML, so lets set up a reader
  reader: new Ext.data.XmlReader({
   	// The element which contains the total dataset size (optional)
	record: "Track"
	},[{name: 'trackName', type: 'string'},
   	   {name: 'trackId', type: 'int'}])
 });
tracksDS.on('load',function(){
	
	  //console.log('nnn '+tracksDS.getCount());
});
	//the radio buttons which determine the way which the user will select the course with respect to
	var trainingAreasRedio = new Ext.form.Radio({
        	fieldLabel: 'Select Course By',
        	columns:1,
        	name:'n3',
        	value:1,
        	boxLabel:'Training Areas',
	        listeners: {
	         	check: function () {
	    	
	    			  //console.log('the check value = '+getcourseSelectionValue());
			 		if(getcourseSelectionValue() == 1){
			 			taCombo.enable();
			 			taCombo.reset();
			 			
			 			tracksCombo.disable();
			 			tracksCombo.reset();
			 			
			 		
			 		}
			 		else if(getcourseSelectionValue() == 2){
						taCombo.disable();
			 			taCombo.reset();
			 			
			 			tracksCombo.enable();
			 			tracksCombo.reset();
						
			 		
			 		}
			    	    
			  }}
		        	
        	
        });
       var tracksRedio = new Ext.form.Radio({
        	
        	hideLabel:true,
        	columns:1,
        	name:'n3',
        	value:2,
            boxLabel:'Tracks',
	        listeners: {
	         	check: function () {
	         		trainingAreasRedio.fireEvent('check');
	         	}
	         }
        });
        
     
      /******************get value***********************************/  
	 function getcourseSelectionValue() {
	 	
	 	var v;
	 	if(trainingAreasRedio.checked == true)
	 	 	v = 1;
	 	 
	 	else //if(tracksRedio.checked == true)
	 	 	v = 2;
	 	
	 	return v;	 	

	  };
	


  var taCombo = new Ext.form.ComboBox({
	    fieldLabel: 'Training Area',
	     store: taDS,
		 valueField: 'trainingAreaId',
	     displayField:'trainingAreaName',
		 selectOnFocus: true,
		 typeAhead: true,
	     editable: false,
	  //   hideLabel: true,
	     triggerAction: 'all',
		 emptyText:'Select Training Area...',
         listeners: {
         select: function (combo, record, index) {
    	    this.selectedIndex = index;
    	    cDS.removeAll();
    		cDS.load({params:{task:'coursesByTrainingAreaId',ta_id: this.getValue(),track_id: tracksCombo.getValue()}});
			cCombo.enable();
			cCombo.reset();
         }}
	   });
	   
	  taCombo.disable();
 
   var tracksCombo = new Ext.form.ComboBox({
	    fieldLabel: 'Track Name',
	     store: tracksDS,
	 	 valueField: 'trackId',
	     displayField:'trackName',
		 selectOnFocus: true,
		 typeAhead: true,
	     editable: false,
	  //   hideLabel: true,
	     triggerAction: 'all',
		 emptyText:'Select Track...',
         listeners: {
         select: function (combo, record, index) {
    	    this.selectedIndex = index;
    	    cDS.removeAll();
    		cDS.load({params:{task:'coursesByTrackId',ta_id: taCombo.getValue(),track_id: this.getValue()}});
			cCombo.enable();
			cCombo.reset();
         }}
	   });
	   
	  tracksCombo.disable();
 
 var cDS = new Ext.data.Store({
       // load using HTTP
      proxy: retreivingDataProxy,
    //  baseParams:{task: "FILTERCOURSES"},
      // the return will be XML, so lets set up a reader
      reader: new Ext.data.XmlReader({
       // The element which contains the total dataset size (optional)
   		record: "Course"},           // The repeated element which contains row information
   		[{name: 'courseName', type: 'string'},{name: 'courseId', type: 'int'}]
        )
 });
 
  var cCombo = new Ext.form.ComboBox({
	 fieldLabel: 'Course Name', 
     store: cDS,
	 valueField: 'courseId',
     displayField:'courseName',
	 selectOnFocus: true,
	 typeAhead: true,
	 disabled: true,
     editable: false,
     mode :'local',
     triggerAction: 'all',
	 emptyText:'Select Course...',
	 listeners: {
         expand: function (combo, record, index) {
    	    this.selectedIndex = index;
    	  //  cDS.removeAll();
    	//	cDS.load({params:{ta_id: taCombo.getValue(),track_id: tracksCombo.getValue()}});
			//cCombo.reset();
         }}
  });
   
   
 var CourseNumOfRuns = new Ext.form.NumberField({
   	id: 'courseRuns',
   	fieldLabel: 'Number Of Runs',
   	allowNegative: false,
   	allowBlank: false
 });
       
var addContractCourseForm = new Ext.FormPanel({
        frame: true,
        labelWidth: 100,
        width:250,
        autoHieght: true,
        waitMsgTarget: true,
        items: [
         new Ext.form.FieldSet({
                labelWidth: 100,
                autoHeight: true,
                border: true,
         		anchor:'100% 100%',
                layout:'column',
                items: [
                {width:230,layout: 'form',
                items: [trainingAreasRedio]},
                {width:100,layout: 'form',
                items: [tracksRedio]}
		        ]
            }),taCombo,tracksCombo,cCombo,CourseNumOfRuns
		                 
        ],
         buttons:[{ 
                text:'Save',
                formBind: true,
             	iconCls:'save',  
                // Function that fires when user clicks the button 
                handler:function(){	
                var course  = cCombo.getValue();
                if(taCombo.getValue() != '' && cCombo.getValue() == '')
                Ext.Msg.show({
			         title: 'Error', 
			        msg: 'You Must Select Course',
			        minWidth: 200,
			        modal: true,
			        icon: Ext.Msg.ERROR,
			        buttons: Ext.Msg.OK
   				 });
                
                else {
                	if(tracksCombo.getValue() != '' && cCombo.getValue() == ''){
               		
               		if(CourseNumOfRuns.getValue() == '')
               			{
               				Ext.Msg.show({
					         title: 'Error', 
					        msg: 'You Must Enter The Course Number of Runs',
					        minWidth: 200,
					        modal: true,
					        icon: Ext.Msg.ERROR,
					        buttons: Ext.Msg.OK
		   				 });
               			}
               			else{
               		
               			Ext.MessageBox.confirm('Confirm', 'are you sure you want to select all this track course(s).', addCourseConfirmFunction);
               			}
               		
               		
                	}else if(cCombo.getValue() != ''){
               			
               			if(CourseNumOfRuns.getValue() == '')
               			{
               				Ext.Msg.show({
					         title: 'Error', 
					        msg: 'You Must Enter The Course Number of Runs',
					        minWidth: 200,
					        modal: true,
					        icon: Ext.Msg.ERROR,
					        buttons: Ext.Msg.OK
		   				 });
               			}
               			else{
                	  Ext.Ajax.request({   
				        waitMsg: 'Please wait...',
				        url: '../ContractsAction.do',
				        params: {
				          task: "addNewContractCourse",
				          contractId:  contractId,
				          
				          courseId :    cCombo.getValue(),
				      	  courseRuns  : CourseNumOfRuns.getValue()
				        },
				        method:'POST', 
				        success: function(response){
				        	//ds.load();
				        	contractDS.load();        
							AddContractCourseWindow.hide();       
				        },
				        failure: function(response){
				          var result=response.responseText;
				          Ext.MessageBox.alert('error',result+'  could not connect to the database. retry later');          
				        }                      
      				});
               		}
      				}
                }     	
                }
            },{text:'Cancel',
            	handler:function(){AddContractCourseWindow.hide();}
            	}
           ] 
  
    });
    
AddContractCourseWindow= new Ext.Window({
      id: 'AddContractCourseWindow',
      title: 'Adding New Course',
      width: 400,
      height: 250,
      plain:true,
      layout: 'fit',
      items: addContractCourseForm
    });
function resetContractCourseForm(){
	addContractCourseForm.getForm().reset();
	
}		    
function displayContractCourseWindow(){
  if(!AddContractCourseWindow.isVisible()){
    resetContractCourseForm();
    AddContractCourseWindow.show();
  } else {
    AddContractCourseWindow.toFront();
  }

}		      
 /*-----------------------------edit contract course--------------------------------------------------------------*/
 
  
 var editCourseName = new Ext.form.TextField({
   	
   	fieldLabel: 'Course Name',
   	readOnly: true,
   	disabled:true
 });
 
 
  var editCourseType = new Ext.form.TextField({          	
		   
		    fieldLabel: 'Course Type',
		    readOnly: true
	  });

 var editCoursePrice = new Ext.form.NumberField({
   	
   	fieldLabel: 'Course Price'
 }); 
 var editCourseDays = new Ext.form.NumberField({
   	
   	fieldLabel: 'Course Days'
 }); 
  var editCourseParticipants = new Ext.form.NumberField({
   	
   	fieldLabel: 'No. of Participants'
 }); 

 
 var courseTimeData = [
        ['1','Full Day'],
        ['2','Half Session'],
        ['3','Evening Session']];
        
	  var courseTimeDS = new Ext.data.SimpleStore({
        fields: ['id','name'],
        data: courseTimeData
    });
	var courseTime = new Ext.form.ComboBox({
            store: courseTimeDS,
		    fieldLabel:'Course Time',
		    displayField:'name',
		    valueField:'id',
		    selectOnFocus: true,
		    mode: 'local',
		    typeAhead: true,
		    editable: false,
		    triggerAction: 'all'
            });
	
var priceRoleData = [
        ['1','Individual Role'],
        ['2','Group Role']];
        
	  var priceRoleDS = new Ext.data.SimpleStore({
        fields: ['id','name'],
        data: priceRoleData
    });
	var priceRole = new Ext.form.ComboBox({
            store: priceRoleDS,
		    fieldLabel:'Which Price Role You Want To Applay',
		    displayField:'name',
		    valueField:'id',
		    selectOnFocus: true,
		    mode: 'local',
		    typeAhead: true,
		    emptyText:'Select Price Role...',
		    editable: false,
		    triggerAction: 'all'
            });	

        

 var editContractCourseForm = new Ext.FormPanel({
        frame: true,
      //  fileUpload: true,
        labelWidth: 100,
        defaults: {width: 250},
        height: 330,
        waitMsgTarget: true,
        anchor: '95%',
        items: [
         editCourseName,editCourseType,editCoursePrice,
		      editCourseDays,editCourseParticipants,courseTime,priceRole
        ]
  
    });
    
EditContractCourseWindow= new Ext.Window({
      id: 'EditContractCourseWindow',
      title: 'Editing Course',
      width: 400,
      height: 330,
      plain:true,
      buttonAlign:'center',
   //   layout: 'fit',
      items: [editContractCourseForm],
         buttons:[{ 
                text:'Save',
                formBind: true,
             	iconCls:'save',  
                // Function that fires when user clicks the button 
                handler:editContractCourse
            },{text:'Cancel',
            	handler:function(){EditContractCourseWindow.hide();}
            	}
           ] 
    });
//function resetEditContractCourseForm(){
//	editContractCourseForm.getForm().reset();
//	
//}		    
function displayEditContractCourseWindow(){
  if(!EditContractCourseWindow.isVisible()){
  //  resetEditContractCourseForm();
    EditContractCourseWindow.show();
  } else {
    EditContractCourseWindow.toFront();
  }

}		      

 contractCoursesGrid.on("rowdblclick", function() {
	  var selections = contractCoursesGrid.selModel.getSelections();
         var selectedCourse = [];
         for(i = 0; i< contractCoursesGrid.selModel.getCount(); i++){
          contractCourse = selections[i].id;
        editCourseName.setValue(selections[i].get('courseName'));
        editCourseName.disable();
        editCourseType.setValue(selections[i].get('courseType'));
        editCourseType.disable();
       if(selections[i].get('courseType')== 'Both'){
        priceRole.enable();
		
		
		if(selections[i].get('priceRole') == 0)
		priceRole.reset();
		else
        priceRole.setValue(selections[i].get('priceRole'));
		
        }
        else{
        priceRole.reset();
		priceRole.disable();
        
        }
      //  editCoursePriceTypeCombo.setValue(selections[i].get('coursePriceType'));
        editCoursePrice.setValue(selections[i].get('coursePrice'));
        editCourseDays.setValue(selections[i].get('courseDays'));
        editCourseParticipants.setValue(selections[i].get('courseParticipantsPerRun'));
     //   getCourseTimeRadioValue();
   //  courseTimeRadio.reset();
       courseTime.setValue(selections[i].get('courseTime'));
       // editCourseStartDate
        
        
         }
EditContractCourseWindow.setTitle("Edit Course - "+selections[0].get('courseName')+'('+selections[0].get('courseRuns')+')')
displayEditContractCourseWindow();
});
   
function editContractCourse(){
	//setCourseTimeRadioValue(2);
	  Ext.Ajax.request({   
				        waitMsg: 'Please wait...',
				        url: '../ContractsAction.do',
				        params: {
				          task: "editContractCourse",
				          contractId:  contractId,
				          courseId :    contractCourse,
				          coursePrice:editCoursePrice.getValue(),
		      			  courseDays:editCourseDays.getValue(),
		      			  courseParticipants:editCourseParticipants.getValue(),
		      			  courseTime:courseTime.getValue(),
		      			  courseType:editCourseType.getValue(),
		      			  coursePriceRole:priceRole.getValue()
				        },
				        method:'POST', 
				        success: function(response){
				        	//ds.load();
				        	contractDS.load();        
							EditContractCourseWindow.hide();       
				        },
				        failure: function(response){
				          var result=response.responseText;
				          Ext.MessageBox.alert('error',result+'  could not connect to the database. retry later');          
				        }                      
      });
           
	
}     
   
 /*---------------------------deleting contract course(s)---------------------------------------------------------*/

 
 //confirm delete function 
  function confirmDeleteCourses(){
    if(contractCoursesGrid.selModel.getCount() == 1) // only one president is selected here
    {
      Ext.MessageBox.confirm('Confirmation','Are you sure you want to delete this Course Run?', deleteCourses);
    } else if(contractCoursesGrid.selModel.getCount() > 1){
      Ext.MessageBox.confirm('Confirmation','Are you sure you want to delete those Course(s) Runs?', deleteCourses);
    } else {
      Ext.MessageBox.alert('Uh oh...','You can\'t really delete something you haven\'t selected');
    }
  }
  
  function deleteCourses(btn){
    if(btn=='yes'){
         var selections = contractCoursesGrid.getSelections();
         var selectedCourse = [];
         for(i = 0; i< selections.length; i++){
          selectedCourse.push(selections[i].get('courseId'));
        //	contractPriceValue = contractTotalPrice.getValue()-selections[i].get('courseTotalPrice');
   	
         }
        
         Ext.Ajax.request({  
            waitMsg: 'Please Wait',
            url: '../ContractsAction.do',
        	params: {
          		task: "deleteContractCourse",
               coursesIds:  selectedCourse
              }, 
            method:'POST',
            success: function(response){

//                ds.load();
				contractDS.load();   
                
              
            },
            failure: function(response){
              var result=response.responseText;
              Ext.MessageBox.alert('error','could not connect to the database. retry later');      
              }
         });
       //   contractTotalPrice.setValue(contractPriceValue);
      }  
  }
/////////////////////////////////////assigning/////////////////////////////////////////////////////////////////
function formatDate(value){
	  //console.log(value);
	if(Date.parseDate(value,'d-M-Y') == undefined)
	return value ? value.dateFormat('d-M-Y') : '';
        return value ? Date.parseDate(value,'d-M-Y').dateFormat('d-M-Y') : '';
    };
    
    function returnFormatDate(value){
    	var dt = new Date(Date.parseDate(value,'d-M-Y'));
//    	  //console.log('>>>>>'+value);
//	    //dt = Sun Jan 15 2006 (all date parts specified)
		if(dt.format('Y-m-d') == 'NaN-NaN-NaN')
		dt = new Date(value);
  //console.log('the date = '+dt+' the new date = '+dt.format('Y-m-d'));
		return dt.format('Y-m-d');
        
    };
/////////////////////////////////////assign resource/////////////////////////////////////////////////////////////////
	
	 var resourcesDS = new Ext.data.Store({
       // load using HTTP
      proxy: retreivingDataProxy,
    //  baseParams:{task: "resources"},
      // the return will be XML, so lets set up a reader
      reader: new Ext.data.XmlReader({
       // The element which contains the total dataset size (optional)
   		record: "Resource"
        },[{name: 'resourceName', type: 'string'},{name: 'resourceId', type: 'int'}]
        )
      });

 var resource_row_index = 0;
 
	  var resourcesCombo = new Ext.form.ComboBox({
	    
	     store: resourcesDS,
		 fieldLabel: 'Resource Name',
		// valueField: 'idResources',
	     displayField:'resourceName',
		 selectOnFocus: true,
		 typeAhead: true,
	     editable: true,
	     mode:'local',
	     triggerAction: 'all',
		 emptyText:'Select Resource...',
		listeners: {
	     select: function (combo, record, index) {

	    resourceGrid.getStore().getAt(resource_row_index).set('resourceId',resourcesDS.getAt(index).get('resourceId'));
	    
	    resourceGrid.getStore().getAt(resource_row_index).set('resourceConfirmDate','');
	    resourceGrid.getStore().getAt(resource_row_index).set('resourceConfirm',false);
	    	
	     }
//	     ,
//	     change:function (combo, newValue, oldValue) {
//	     	if(newValue != oldValue){
//	     	resourceGrid.getStore().getAt(resource_row_index).set('resourceConfirmDate','');
//	     	resourceGrid.getStore().getAt(resource_row_index).set('resourceConfirm',false);
//	     	}
//	     }
	     
	     }
	
	});
 // custom column plugin example
	var resourceCheckColumn = new Ext.grid.CheckColumn({
	   header: "Resource Confirmation",
	   dataIndex: 'resourceConfirm',
	   width: 155
	});

 var resourcecm = new Ext.grid.ColumnModel([{
           id:'courseId',
           header: "Course Name",
           dataIndex: 'courseName',
           width: 220
        },
        {
           header: "Run Number",
           dataIndex: 'courseRuns',
           width: 100
        },
        
        {
           header: "Course Status",
           dataIndex: 'status',
           width: 100
        }
        
        ,{
           id:'resourceId',
           header: "Resource Name",
           dataIndex: 'resourceName',
           width: 230,
           editor: resourcesCombo
        },resourceCheckColumn,{
           header: "Confirmation Date",
           dataIndex: 'resourceConfirmDate',
           width: 195,
           renderer: formatDate,
           
           editor: new Ext.form.DateField({
                format: 'd-M-Y',
                minValue: '01/01/06'
            })
        }
    ]);



 var resourceGrid = new Ext.grid.EditorGridPanel({
        store: ds,
        cm: resourcecm,
        
        width:600,
        height: 453,
        
        title:'Assign Resource',
        frame:true,
        plugins:resourceCheckColumn,
        
        clicksToEdit:1
    });
resourceGrid.on('cellclick',function(grid, rowIndex, columnIndex, e) {
        var record = grid.getStore().getAt(rowIndex);  // Get the Record

	  	  
	  	 // record.set('resourceConfirmDate','');
	      cID = record.get('courseId');
		resource_row_index = rowIndex;
    	resourcesDS.load({params:{task:'resourcesByCourseId',course_id:cID}});
    	

});


var saveAssignResource = function(){
	
	
//	ds.commitChanges();
	
	var resourceIds = []; 
	var courseIds = [];
	var confirmResourceDates = [];
	var confirmResource = [];
	
	var error = false;
	
	for(var index=0; index<resourceGrid.getStore().getCount(); index++) {
		
		
		
		if(resourceGrid.getStore().getAt(index).get('resourceConfirm') == true && resourceGrid.getStore().getAt(index).get('resourceId') == ''){
			
			Ext.Msg.show({
	         title: 'Error', 
	        msg: 'You Must Select The Resource Name of '+resourceGrid.getStore().getAt(index).get('courseName')+' Course with ('+resourceGrid.getStore().getAt(index).get('courseRuns')+') Run Number',
	        minWidth: 200,
	        modal: true,
	        icon: Ext.Msg.ERROR,
	        buttons: Ext.Msg.OK
		 });
			error = true;
			break;
		}
		
		
		resourceIds[index] = resourceGrid.getStore().getAt(index).get('resourceId');
		courseIds[index] = resourceGrid.getStore().getAt(index).get('courseId');
		
		if(resourceGrid.getStore().getAt(index).get('resourceConfirm') == true && resourceGrid.getStore().getAt(index).get('resourceConfirmDate') == ''){
			
			Ext.Msg.show({
	         title: 'Error', 
	        msg: 'You Must Enter The Date of Resource Confirmation of '+resourceGrid.getStore().getAt(index).get('courseName')+' Course with ('+resourceGrid.getStore().getAt(index).get('courseRuns')+') Run Number',
	        minWidth: 200,
	        modal: true,
	        icon: Ext.Msg.ERROR,
	        buttons: Ext.Msg.OK
		 });
			error = true;
			break;
		}
		
		if(resourceGrid.getStore().getAt(index).get('resourceConfirm') == true)
		confirmResource[index] = 1;
		else
		confirmResource[index] = 0;
	
	if(resourceGrid.getStore().getAt(index).get('resourceConfirmDate') != null && resourceGrid.getStore().getAt(index).get('resourceConfirmDate') != ''){
		confirmResourceDates[index] = returnFormatDate(resourceGrid.getStore().getAt(index).get('resourceConfirmDate'));//resourceGrid.getStore().getAt(index).get('resourceConfirmDate').format('Y-m-d');
	confirmResource[index] = 1;
	
	}
		else
		confirmResourceDates[index] = resourceGrid.getStore().getAt(index).get('resourceConfirmDate');
	
	}
	if(!error){
	Ext.Ajax.request({   
        waitMsg: 'Please wait...',
        url: '../ContractsAction.do',
        params: {
          task: "assignResourceToContractCourse",
          contractId:contractId,
          resource_ids:  resourceIds,
          course_ids:courseIds,
          resource_confirm_date:confirmResourceDates,
          resource_confirm:confirmResource
        },
        method:'POST', 
        success: function(response){
        	ds.commitChanges();
        	ds.load();
        },
        failure: function(response){
          var result=response.responseText;
          Ext.MessageBox.alert('error',result+'  could not connect to the database. retry later');          
        }                      
      });
	}
}


//resourceGrid.on('rowclick',function(grid, rowIndex, e) {
//        var record = grid.getStore().getAt(rowIndex);  // Get the Record
//
//	  	  //console.log(record.get('resourceConfirm'));
//	    
//	
//});
//  

/////////////////////////////////////assign venue & datashow/////////////////////////////////////////////////////////////////
	
 // custom column plugin example
    var confirmCheckColumn = new Ext.grid.CheckColumn({
       header: "Venue Confirmation",
       dataIndex: 'venueConfirm',
       width: 155
    });
 var datashowData = [
        ['1','Our Company'],
        ['2','Client']];
        
	  var datashowDS = new Ext.data.SimpleStore({
        fields: ['id','name'],
        data: datashowData
    });
	

 var venue_datashow_cm = new Ext.grid.ColumnModel([{
           id:'courseId',
           header: "Course Name",
           dataIndex: 'courseName',
           width: 200
        },{
           header: "Run Number",
           dataIndex: 'courseRuns',
           width: 100
        },{
           header: "Course Status",
           dataIndex: 'status',
           width: 100
        },{
           
           header: "Location",
           dataIndex: 'venueLocation',
           width: 200
        },{
           
           header: "Venue Place",
           dataIndex: 'venueName',
           width: 200
        },{
           
           header: "Venue Detail",
           dataIndex: 'venueDetails',
           width: 200
        },confirmCheckColumn,{
           header: "Confirmation Date",
           dataIndex: 'venueConfirmDate',
           width: 175,
           renderer: formatDate,
           
           editor: new Ext.form.DateField({
                format: 'd-M-Y',
                minValue: '01/01/06'
            })
        },{
           header: "Datashow Resposibality",
           dataIndex: 'datashowRequest',
           width: 175,
          
           
           editor: new Ext.form.ComboBox({
               store: datashowDS,
		    
		    displayField:'name',
		    selectOnFocus: true,
		    mode: 'local',
		    typeAhead: true,
		    editable: false,
		    triggerAction: 'all'
            })
        }
    ]);



 var venue_datashow_Grid = new Ext.grid.EditorGridPanel({
        store: ds,
        cm: venue_datashow_cm,
     
        width:600,
        height: 453,
        
        title:'Assign Venue And Datashow',
        frame:true,
        plugins:confirmCheckColumn,
         viewConfig: {
            forceFit:true
        },
        clicksToEdit:1
    });
    
 		var venuesCheckBox = new Ext.form.Checkbox({
	     	fieldLabel: 'From Our Company',
			//boxLabel: 'Funded By IMC',
			//name: 'search_option',
			value: '1',
			checked: false,
			width:190
		});
	
	// when check the contract fund checkbox enable the cotract rate comboBox
 	venuesCheckBox.on('check', function(){
 		if(venuesCheckBox.checked){
 			venuesCombo.enable();
 			venuesCombo.reset();
 			
 			
 			venueLocation.disable();
 			venueLocation.reset();
 		}
 		else{
 			venuesCombo.disable();
 			
 			venuesCombo.reset();
 			
 			
 			venueLocation.enable();
			venueLocation.reset();
 		
 		}
   	});

      
	 var venuesDS = new Ext.data.Store({
	       // load using HTTP
	      proxy: retreivingDataProxy,
	     // baseParams:{task: "contractcoursevenues"},
	      // the return will be XML, so lets set up a reader
	      reader: new Ext.data.XmlReader({
	       // The element which contains the total dataset size (optional)
	   		record: "Venue"
	        },[{name: 'venueId', type: 'int'},{name: 'venueName', type: 'string'}]
	        )
	      });
    
   
   var venueName = '';
     var venue_datashow_row_index = 0;
	 
	  var venuesCombo = new Ext.form.ComboBox({
	    
	     store: venuesDS,
		 fieldLabel: 'Venue Place',
	     displayField:'venueName',
	     valueField: 'venueId',
		 selectOnFocus: true,
		 typeAhead: true,
	     editable: false,
	     triggerAction: 'all',
		 mode: 'local',
	     emptyText: 'Select Venue...',
		listeners: {
	     select: function (combo, record, index) {
            venueName = venuesDS.getAt(index).get('venueName');
            venueDetail.setValue('');
	     	if(this.getValue() == -1){
	     		venueDetail.enable();
	     	}
	     	else{
	     		venueDetail.disable();
	     	}
	     
	     }}
	
	});
venuesCombo.disable();   
    
  var venueLocation = new Ext.form.ComboBox({
            fieldLabel: 'The Location',
           store: locationDS,
		    
		    displayField:'name',
		    valueField: 'id',
		    selectOnFocus: true,
		    mode: 'local',
		    //disabled: true,
		    typeAhead: true,
		    editable: false,
		    triggerAction: 'all',
			width: 200,
		    emptyText:'Where The Location...',
		    
         	listeners: {
         		select: function (combo, record, index) {
    	    		this.selectedIndex = index;
    	    		venueDetail.reset();
    	    		venueDetail.setValue('');
    	    		venuesCombo.reset();
    	    		if(index == 0){
    	    		venueDetail.disable();
    	    		venuesCombo.disable();
		    	   }
		    	   else if(index == 1){
		    	   	venueDetail.enable();
    	    		venuesCombo.disable();
		    	   }
		    	   else if(index == 2){
		    	   	venueDetail.disable();
    	    		venuesCombo.enable();
		    	   }
		    	  
         	}}
        });
        
       var venueDetail = new Ext.form.TextArea({
            fieldLabel: 'Venue Detail',
            disabled: true,
            grow: true,
            preventScrollbars:true
        });   
        
 
 var venueDatashowForm = new Ext.form.FormPanel({
           
            
            
            labelWidth: 90,
         //   autoHeight:true,
            frame: true,
            defaults: {width: 200},
            defaultType: 'textfield',
          //  colspan:2,
            items :[venueLocation,venuesCombo,venueDetail
 
            ]
        });
 
 assignVenueDatashowWindow= new Ext.Window({
      id: 'AssignVenueDatashowWindow',
      title: 'Assign Venue',
      width: 400,
      height: 210,
      plain:true,
      buttonAlign:'center',
   //   layout: 'fit',
      items: [venueDatashowForm],
         buttons:[{ 
                text:'Save',
                formBind: true,
             	iconCls:'save',  
                // Function that fires when user clicks the button 
                handler:function(){	
                	var record = venue_datashow_Grid.getStore().getById(venue_datashow_Grid_cID);
                	
                	venue_datashow_Grid.getStore().getAt(venue_datashow_row_index).set('venueName',venueName);
                	venue_datashow_Grid.getStore().getAt(venue_datashow_row_index).set('venueId',venuesCombo.getValue());	
    		       
					if(venueLocation.getValue() == 1){
						
						record.set('venueDetails','');
						record.set('venueLocation','@ Our Premises');
						
					}
                	else if(venueLocation.getValue() == 2){
						
						record.set('venueDetails',venueDetail.getValue());
						record.set('venueLocation','@ Client Premises');
						
					}
                	else if(venueLocation.getValue() == 3){
						
						record.set('venueDetails',venueDetail.getValue());
						record.set('venueLocation','@ a Venue');
						
					}
                	//record.set('venueLocation',venueLocation.getValue());
                	assignVenueDatashowWindow.hide();
                //	venue_datashow_Grid.getStore().reload();
                }
              
            },{text:'Cancel',
            	handler:function(){assignVenueDatashowWindow.hide();}
            	}
           ] 
    });
//function resetEditContractCourseForm(){
//	editContractCourseForm.getForm().reset();
//	
//}		    
function displayAssignVenueDatashowWindow(){
  if(!assignVenueDatashowWindow.isVisible()){
   
    assignVenueDatashowWindow.show();
  } else {
    assignVenueDatashowWindow.toFront();
  }

}		      

 venuesDS.load({params:{task:'contractcoursevenues'}});          
venue_datashow_Grid.on('cellclick',function(grid, rowIndex, columnIndex, e) {
	 var record = grid.getStore().getAt(rowIndex);// Get the Record

	 if(columnIndex == 3 || columnIndex == 4 || columnIndex == 5){
       
	      venue_datashow_Grid_cID = record.get('courseId');
		  venue_datashow_row_index = rowIndex;
	      venueDatashowForm.getForm().reset();
	      
	      /////////////////////////////////////////////////
	      if(record.get('venueLocation') == '@ Our Premises'){
	      	venueLocation.setValue(1);
	      	venuesCombo.reset();
	      	venueDetail.reset();
	      	venuesCombo.disable();
	      	venueDetail.setValue('');
	      	venueDetail.disable();
	      	
	      }
	      else if(record.get('venueLocation') == '@ Client Premises'){
	      	venueLocation.setValue(2);
	      	venuesCombo.reset();
	      	venueDetail.reset();
	      	venuesCombo.disable();
	      	venueDetail.enable();
	      	venueDetail.setValue(record.get('venueDetails'));
	      	
	      }
	      else if(record.get('venueLocation') == '@ a Venue'){
	      	venueLocation.setValue(3);
	      	venuesCombo.reset();
	      	venueDetail.reset();
	      	venuesCombo.enable();
	      	venuesCombo.setValue(record.get('venueId'));
	      	venueDetail.disable();
	      	if(record.get('venueId') == -1){
	      	venueDetail.enable();
	      	venueDetail.setValue(record.get('venueDetails'));
	      	
	      	}
	      }
	      else{
	        venueLocation.reset();
	      	venuesCombo.reset();
	      	venueDetail.reset();
	      	venuesCombo.disable();
	      	venueDetail.disable();
	      }
	      
	      /////////////////////////////////////////////////
	      
		  displayAssignVenueDatashowWindow();
	}
	
});


var save_venue_datashow = function(){

	
	var venueIds = []; 
	var courseIds = [];
	var venueLocations = [];
	var venueDetails = [];
	
	var datashow_resposibality = [];
	var venue_confirmation = [];
	var venue_confirmation_dates = [];
	
	var error = false;
	
	for(var index=0; index<venue_datashow_Grid.getStore().getCount(); index++) {
		
		venueIds[index] = venue_datashow_Grid.getStore().getAt(index).get('venueId');
		
		venueLocations[index] = venue_datashow_Grid.getStore().getAt(index).get('venueLocation');
		venueDetails[index] = venue_datashow_Grid.getStore().getAt(index).get('venueDetails');
		
		if(venue_datashow_Grid.getStore().getAt(index).get('venueConfirm') == true && venue_datashow_Grid.getStore().getAt(index).get('venueLocation') == ''){
			
			Ext.Msg.show({
	         title: 'Error', 
	        msg: 'You Must Enter The Venue Name of '+venue_datashow_Grid.getStore().getAt(index).get('courseName')+' Course with ('+venue_datashow_Grid.getStore().getAt(index).get('courseRuns')+') Run Number',
	        minWidth: 200,
	        modal: true,
	        icon: Ext.Msg.ERROR,
	        buttons: Ext.Msg.OK
		 });
			error = true;
			break;
		}
		
		
		courseIds[index] = venue_datashow_Grid.getStore().getAt(index).get('courseId');
		
		if(venue_datashow_Grid.getStore().getAt(index).get('venueConfirm') == true && venue_datashow_Grid.getStore().getAt(index).get('venueConfirmDate') == ''){
			
			Ext.Msg.show({
	         title: 'Error', 
	        msg: 'You Must Enter The Date of Venue Confirmation of '+venue_datashow_Grid.getStore().getAt(index).get('courseName')+' Course with ('+venue_datashow_Grid.getStore().getAt(index).get('courseRuns')+') Run Number',
	        minWidth: 200,
	        modal: true,
	        icon: Ext.Msg.ERROR,
	        buttons: Ext.Msg.OK
		 });
			error = true;
			break;
		}
		
		
		if(venue_datashow_Grid.getStore().getAt(index).get('venueConfirm') == true)
		venue_confirmation[index] = 1;
		else
		venue_confirmation[index] = 0;
		
		if(venue_datashow_Grid.getStore().getAt(index).get('venueConfirmDate') != null && venue_datashow_Grid.getStore().getAt(index).get('venueConfirmDate') != ''){
		venue_confirmation_dates[index] = returnFormatDate(venue_datashow_Grid.getStore().getAt(index).get('venueConfirmDate'));
		venue_confirmation[index] = 1;
		}
		else
		venue_confirmation_dates[index] = venue_datashow_Grid.getStore().getAt(index).get('venueConfirmDate');
		datashow_resposibality[index] = venue_datashow_Grid.getStore().getAt(index).get('datashowRequest');
	}
	
	if(!error){
	
	Ext.Ajax.request({   
        waitMsg: 'Please wait...',
        url: '../ContractsAction.do',
        params: {
          task: "assignVenueAndDatashowToContractCourse",
          venues_ids:         venueIds,
          contractId:contractId,
          course_ids:         courseIds,
          venues_locations:   venueLocations,
          venues_details:   venueDetails,
          venues_confirmations:   venue_confirmation,
          datashow_res:       datashow_resposibality,
          venues_dates:       venue_confirmation_dates
        },
        method:'POST', 
        success: function(response){
        	ds.commitChanges();
        	ds.load();
        },
        failure: function(response){
          var result=response.responseText;
          Ext.MessageBox.alert('error',result+'  could not connect to the database. retry later');          
        }                      
      });
	}
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////


var pan= new Ext.TabPanel({
                    region:'center',
                    height:495, 
                           /* width:980,*/
                           autoHeight : true,
        			renderTo: 'binding-example',
                    deferredRender:false,
                    autoScroll: true,
                    buttonAlign:'center',
                    activeTab:0
	
					// tabs
					,defaults:{
					labelWidth:80
					,defaultType:'formpanel'
					,bodyStyle:'padding:5px'

					// as we use deferredRender:false we mustn't
					// render tabs into display:none containers
					,hideMode:'offsets'
				},
                    items:[createProposalForm,contractCoursesGrid,resourceGrid,venue_datashow_Grid],
     		buttons:[{ 
                text:'Save Changes',
                iconCls:'save',
                formBind: true,  
                // Function that fires when user clicks the button 
                handler:function(){ 
                 if(pan.activeTab == createProposalForm){
                 	var clientRDate = '';
                 	if(clientReceiveDateField.getValue() != '')
                 	    clientRDate = clientReceiveDateField.getValue().format('Y-m-d');
                 	    
                 	var clientADate = '';
                 	if(clientApproveDateField.getValue() != '')
                 	    clientADate = clientApproveDateField.getValue().format('Y-m-d');
                 	   
                 	     var tsf;
		                 var tef;
		                 
		                 if(tentativeStartField.getValue() == '')
		                 tsf = tentativeStartField.getValue();
		                 else
		                 tsf = tentativeStartField.getValue().format('Y-m-d');
		                 
		                 if(tentativeEndField.getValue() == '')
		                 tef = tentativeEndField.getValue();
		                 else
		                 tef = tentativeEndField.getValue().format('Y-m-d');
                 	    
                 	    
                 	     if((getContractFundValue() == 1 && locationCombo.getValue() == '') || (contractRateCombo.getValue() == 2 && locationCombo.getValue() == '') || 
                 	     (locationCombo.getValue() == 3 && venueArrangmentCombo.getValue() == '') || 
                 	     (venueArrangmentCombo.getValue() == 3 && venueCostResCombo.getValue() == ''))
                        	{
                        		var errorMsg = '';
                        		
                        		if((getContractFundValue() == 1 && locationCombo.getValue() == '') || (contractRateCombo.getValue() == 2 && locationCombo.getValue() == '')){
                        		errorMsg = 'You Must Select Where the Location';
                        		
                        		}
                        		
                        		else if(locationCombo.getValue() == 3 && venueArrangmentCombo.getValue() == ''){
                        		errorMsg = 'You Must Select Who Arrange the Venue';
                        		
                        		}
                        		
                        		else if(venueArrangmentCombo.getValue() == 3 && venueCostResCombo.getValue() == ''){
                        		errorMsg = 'You Must Select Who Pay the Venue Cost';
                        		
                        		}
                        		
                        		
                        		Ext.Msg.show({
							         title: 'Error', 
							        msg: errorMsg,
							        minWidth: 200,
							        modal: true,
							        icon: Ext.Msg.ERROR,
							        buttons: Ext.Msg.OK
								 });
                        		
                        		
                        	}
                        	else{
                 	    
                 	    if(contractGroupPrice == contractPrice.getValue() || ds.getCount() == 0){
                 	    
                    	  	Ext.Ajax.request({   
					        waitMsg: 'Please wait...',
					        url: '../ContractsAction.do',
					        params: {
					          task: "editContract",
					          contractId:               contractId,
					          clientname:               clientId,
							  proposalid:               proposalIdField.getValue(),
							  contractProactive:        getContractProactiveValue(),
							  fund:      	            getContractFundValue(),
							  contractRate:             contractRateCombo.getValue(),
							  requestDate:              requestDateField.getValue().format('Y-m-d'),
							  tentativeStart:           tsf,
							  tentativeEnd:             tef,
							  progressHistory:          ProgressHistory.getValue(),
							  contractdealpersontype:   contractDealPersonType,
							  contractdealpersontypeid: contractDealPersonTypeId,
					          contractfee:              contractTotalPrice.getValue(),
					          contractgroupPrice:       contractPrice.getValue(),
					 		  contractVenueLocation:    locationCombo.getValue(),
                              contractVenueArrangment:  venueArrangmentCombo.getValue(),
                              venueCostRes:             venueCostResCombo.getValue(),
							  coordinatorselection:     getcoordinatorSelectionValue(),
							  coordinatorindividual:    coordinatorId,
							  coordinatorteam:          coordinatorTeamId,
					          contractPriceNote:        contractPriceNote.getValue(),
					          clientReceiveDate:        clientRDate,
					          clientApproveDate:        clientADate
					        },
					        method:'POST', 
					        success: function(response){        
								Ext.MessageBox.alert('Status', 'Changes saved successfully.', showResult);
								contractDS.load();
					
					        },
					        failure: function(response){
					          var result=response.responseText;
					          Ext.MessageBox.alert('error',result+'  could not connect to the database. retry later');          
					        }                      
      				});

                       }
                       else{
                 	   	Ext.Msg.show({
				         title: 'Error', 
				        msg: 'You Cannot Change The Man Day Rate after assigning Courses to This Contract',
				        minWidth: 200,
				        modal: true,
				        icon: Ext.Msg.ERROR,
				        buttons: Ext.Msg.OK
					 });
						contractDS.load();
                 	   }
                 	   }
                 	   
                }
      				else if(pan.activeTab == resourceGrid){
      					saveAssignResource();
      					//contractDS.load();
      				}
      				else if(pan.activeTab == venue_datashow_Grid){
      					save_venue_datashow();
      					//contractDS.load();
      				}
      				
                } 
            }
            
            ,{ 
                text:'Post To Calendar',
                formBind: true, 
                iconCls:'calendar', 
                // Function that fires when user clicks the button 
                handler:function(){
                	
        					var redirect = '../pages/CalendarInterface.jsp?contractId='+contractId; 
						 	window.location = redirect;
                	 
                	 
                	
                } 
            },{ 
                text:'Generate PDF',
                formBind: true,  
                // Function that fires when user clicks the button 
                handler:function(){ 
                    createProposalForm.getForm().submit( 
                    	  	Ext.Ajax.request({   
					        waitMsg: 'Please wait...',
					        url: '../ContractsAction.do',
					        params: {
					          task: 	   "generateContractPDF",
						      contractId: contractId,
					          contractFee: contractTotalPrice.getValue()
					        },
					        method:'POST', 
					        success: function(response){        
								Ext.MessageBox.alert('Status', 'Contract Details saved successfully.');
					
					        },
					        failure: function(response){
					          var result=response.responseText;
					          Ext.MessageBox.alert('error',result+'  could not connect to the database. retry later');          
					        }                      
      					})
                    ); 
                } 
            }
            
            
            ]
            
            ,tbar: [
            			'<html><h4>Proposal Total Price: </h4></html>'
            			]
            });
            
function addCourseConfirmFunction(btn){
//	  //console.log(btn);
         if(btn == 'yes')
         {
         	
         	Ext.Ajax.request({   
				        waitMsg: 'Please wait...',
				        url: '../ContractsAction.do',
				        params: {
				          task: "addNewContractCourse",
				          contractId:  contractId,
				          trackId:tracksCombo.getValue(),
				          
				      	  courseRuns  : CourseNumOfRuns.getValue()
				        },
				        method:'POST', 
				        success: function(response){
				        //	ds.load();
				        	contractDS.load();        
							AddContractCourseWindow.hide();       
				        },
				        failure: function(response){
				          var result=response.responseText;
				          Ext.MessageBox.alert('error',result+'  could not connect to the database. retry later');          
				        }                      
      				});
         	
         }
    };


function showResult(btn){
	//contractDS.load();
 };

            

 contractDS.load();
//end
});

Ext.grid.CheckColumn = function(config){
    Ext.apply(this, config);
    if(!this.id){
        this.id = Ext.id();
    }
    this.renderer = this.renderer.createDelegate(this);
};

Ext.grid.CheckColumn.prototype ={
    init : function(grid){
        this.grid = grid;
        this.grid.on('render', function(){
            var view = this.grid.getView();
            view.mainBody.on('mousedown', this.onMouseDown, this);
        }, this);
    },

    onMouseDown : function(e, t){
        if(t.className && t.className.indexOf('x-grid3-cc-'+this.id) != -1){
            e.stopEvent();
            var index = this.grid.getView().findRowIndex(t);
            var record = this.grid.store.getAt(index);
            record.set(this.dataIndex, !record.data[this.dataIndex]);
            if(this.dataIndex == 'resourceConfirm' && !record.data[this.dataIndex])
            this.grid.getStore().getAt(index).set('resourceConfirmDate','');
            if(this.dataIndex == 'venueConfirm' && !record.data[this.dataIndex])
            this.grid.getStore().getAt(index).set('venueConfirmDate','');
        }
    },

    renderer : function(v, p, record){
        p.css += ' x-grid3-check-col-td'; 
        return '<div class="x-grid3-check-col'+(v?'-on':'')+' x-grid3-cc-'+this.id+'">&#160;</div>';
    }
};
