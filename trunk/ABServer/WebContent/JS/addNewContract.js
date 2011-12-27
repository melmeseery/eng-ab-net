
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

	  var radioValue = 'checked';
	  var checkBoxValue = '0';
	  var editedCoursePrice = 0;
	  var contractPriceValue = 0;
	  var oldCourseName = '';
	
	  var addHideOrReset = true;
      var contractId = '';
 	  var AddCourseWindow;
 	  
 	   var contractDealPersonType = '';
	  var contractDealPersonTypeId = 0;


 dataProxy = new Ext.data.HttpProxy({
     	url: '../GeneralRetreivingAction.do',
     	method: 'POST', 
        headers:{'request-type':'ajax' }
      });

	

    var clientsDS = new Ext.data.Store({
       // load using HTTP
      proxy: dataProxy,
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
    	    Ext.Ajax.request({   
        waitMsg: 'Please wait...',
        url: '../ContractsAction.do',
        params: {
          task: "generateProposalId",
          clientid:this.getValue()
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
        	width: 400,
                items: [
                    {boxLabel: 'Proactive Business Development', name: 'rb-auto1', inputValue: 1,checked:true},
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
        	fieldLabel: 'Client Funding <html><font color=red> *</font></html>',
        	columns:1,
        	name:'n1',
        	value:1,
        	checked:true,
        	boxLabel:'Not Funded',
	         listeners: {
	         check: function () {
	    	    
	    	      //console.log('on checkkkk ... '+getContractFundValue());
 		
		 		if(getContractFundValue() == 1){
		 			contractRateCombo.disable();
		 			contractRateCombo.reset();
		 			
		 			locationCombo.enable();
		 			locationCombo.reset();
		 			contractPrice.reset();
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
            boxLabel:'Funded By a Sponsoring Body'
        });
        
        
         
      /******************get value***********************************/  
	 function getContractFundValue() {
	 	  //console.log(ContractFund.checked);
	 	var v =0;
	 	if(ContractNoFund.getValue() == true)
	 	
	 	 v = 2;
	 	else //if(ContractNoFund.getValue() == true)
	 	
	 	 v = 1;
	 	
	 	return v;
	 	

	  };


var coordinatorsDS = new Ext.data.Store({
       // load using HTTP
      proxy: dataProxy,
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
      proxy: dataProxy,
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
	    	    //console.log(getcoordinatorSelectionValue());
		 		if(getcoordinatorSelectionValue() == 1){
		 			coordinatorNameCombo.enable();
		 			coordinatorNameCombo.reset();
		 			
		 			coordinatorTeamCombo.disable();
		 			coordinatorTeamCombo.reset();
		 			
		 		
		 		}
		 		else if(getcoordinatorSelectionValue() == 2){
					coordinatorNameCombo.disable();
		 			coordinatorNameCombo.reset();
		 			
		 			coordinatorTeamCombo.enable();
		 			coordinatorTeamCombo.reset();
					
		 		
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
        
      coordinatorTeamCombo.disable();  
      coordinatorNameCombo.disable(); 
      /******************get value***********************************/  
	 function getcoordinatorSelectionValue() {
	 	  //console.log(coordinator_individual.checked);
	 	var v = 0;
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
		    width: 200,
		    fieldLabel: 'Proposal Rate Type <html><font color=red> *</font></html>',
		    displayField:'name',
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
		    	  contractDealPerson.enable();
         	}}
	});
 
 
     
        var dealPersonDS = new Ext.data.Store({
       // load using HTTP
      proxy: dataProxy,
      //baseParams:{task: "contractDealPersons"},  
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
		    disabled:true,
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
      
      
     		
     		
     		var tentativeStartDateField = new Ext.form.TextField({
      		fieldLabel: 'Tentative Start Date',
      		allowBlank: false,
      		editable: false,
    		readOnly : true
     		});
     		
     		var tentativeEndDateField = new Ext.form.TextField({
      		fieldLabel: 'Tentative End Date',
      		allowBlank: false,
      		editable: false,
    		readOnly : true
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
		    width: 200,
		    valueField: 'id',
		    selectOnFocus: true,
		    mode: 'local',
		    disabled: true,
		    typeAhead: true,
		    editable: false,
		    triggerAction: 'all',
	
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
		    width: 200,
		    displayField:'name',
		    valueField: 'id',
		    selectOnFocus: true,
		    mode: 'local',
		    typeAhead: true,
		    disabled: true,
		    editable: false,
		    triggerAction: 'all',
	
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
		    width: 200,
		    mode: 'local',
		    typeAhead: true,
		    disabled: true,
		    editable: false,
		    triggerAction: 'all',
	
		    emptyText:'Who Pay The Venue Cost...',
		    
         	listeners: {
         		select: function (combo, record, index) {
    	    		this.selectedIndex = index;
    	   			if(index == 1){
    	   				contractPrice.reset();
			    	   	contractPrice.enable();
					 	
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
      		width: 200,
      		
      		editable: false,
    		//disabled : true,
    		maskRe: /([a-zA-Z0-9\s]+)$/
     		});	
     		
     		var proposalProgressHistory = new Ext.form.TextArea({
      		fieldLabel: 'Progress History',
      		width: 200,
      		
      		editable: false,
    		//disabled : true,
    		maskRe: /([a-zA-Z0-9\s]+)$/
     		});	

	
			var clientReceiveDateField = new Ext.form.DateField({
			 fieldLabel: 'Client Receive Date',
             format: 'd-M-Y',
             minValue: '01-01-1940',
             
      		 disabled: true,
      		 width: 200,
      		 id: 'startdt',
        	 vtype: 'daterange',
        	 endDateField: 'enddt'
            });
            
     		var clientApproveDateField = new Ext.form.DateField({
			  fieldLabel: 'Client Approve Date',
              format: 'd-M-Y',
              minValue: '01-01-1940',
              width: 200,
     		  disabled: true,
        	  id: 'enddt',
        	  vtype: 'daterange',
        	  startDateField: 'startdt' // id of the start date field
     		  
            });
   



/***********************the main form panel******************************/
 var createProposalForm = new Ext.form.FormPanel({
    labelWidth: 100,
    frame: true,
    autoWidth : true,
	autoHeight : true,
  //  autoScroll : true, 
   layout:'table',
   layoutConfig: {columns:2},
    title:'Create New Proposal',
    defaultType: 'fieldset',
   
    items: [{
        	
            xtype: 'fieldset',
            labelWidth: 130,
            hideBorders : false,
            title:'Proposal Info',
       width: 450,	// Default config options for child items
         //   defaultType: 'grid',
            height: 480,
           
            items: [clientNameCombo,
     		proposalIdField,
			ContractProactive,
			 new Ext.form.FieldSet({
              //  title: 'Photo',
                labelWidth: 100,
                autoHeight: true,
             //   autoWidth: true,
                border: true,
         		anchor:'100% 100%',
                layout:'column',
           //    width: 350,
              //  defaultType: 'textfield',
                items: [
                {width:200,layout: 'form',
                items: [ContractNoFund]},
                {width:200,layout: 'form',
                items: [ContractFund]}
		                   ]
            }),

			contractRateCombo,

			 new Ext.form.FieldSet({
              //  title: 'Photo',
                labelWidth: 100,
                autoHeight: true,
             //   autoWidth: true,
                border: true,
         		anchor:'100% 100%',
                layout:'column',
           //    width: 250,
              //  defaultType: 'textfield',
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
         //   border: false,
            style: {
                "margin-left": "10px", // when you add custom margin in IE 6...
                "margin-right": Ext.isIE6 ? (Ext.isStrict ? "-10px" : "-13px") : "0"  // you have to adjust for it somewhere else
            },
            items: [locationCombo,venueArrangmentCombo,venueCostResCombo,contractPrice,
     		contractPriceNote,requestDateField,
     		tentativeStartField,
     		tentativeEndField,
     		proposalProgressHistory]
        }
        ] 
     		
    
  });


	function showResult(btn){
	         var redirect = '../pages/pendingContracts.jsp'; 
			 window.location = redirect;
	    };


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
					//, anchor:'100% 100%'

				// tabs
				,defaults:{
					labelWidth:80
					,defaultType:'formpanel'
					,bodyStyle:'padding:5px'

					// as we use deferredRender:false we mustn't
					// render tabs into display:none containers
					,hideMode:'offsets'
				},
					// tabs
					
                    items:[createProposalForm],
     		buttons:[{ 
                text:'Save Proposal',
                formBind: true,
                iconCls:'save',  
                // Function that fires when user clicks the button 
                handler:function(){ 
                 //   createProposalForm.getForm().submit( 
                 
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
                 
                 if(clientNameCombo.getValue() == '' || (getContractFundValue() == 2 && contractRateCombo.getValue() == '') ||  
                 	contractDealPerson.getValue() == '' || 
                 	(contractRateCombo.getValue() == 2 && locationCombo.getValue() == '') || 
                 	(getContractFundValue() == 1 && locationCombo.getValue() == '') ||
                 	(locationCombo.getValue() == 3 && venueArrangmentCombo.getValue() == '') || 
                 	(venueArrangmentCombo.getValue() == 3 && venueCostResCombo.getValue() == '') || 
                 	requestDateField.getValue() == '')
                        	{
                        		var errorMsg = 'You Must Enter The Proposal';
                        		
                        		if(clientNameCombo.getValue() == '')
                        		errorMsg = errorMsg+' Client Name';
                        		
                        		else if(getContractFundValue() == 2 && contractRateCombo.getValue() == '')
                        		errorMsg = errorMsg+' Rate Type';
                        		
                        		else if(contractDealPerson.getValue() == '')
                        		errorMsg = errorMsg+' Deal Person';
                        		
                        		else if((getContractFundValue() == 1 && locationCombo.getValue() == '') || (contractRateCombo.getValue() == 2 && locationCombo.getValue() == '')){
                        		errorMsg = 'You Must Select Where the Location';
                        		
                        		}
                        		
                        		else if(locationCombo.getValue() == 3 && venueArrangmentCombo.getValue() == ''){
                        		errorMsg = 'You Must Select Who Arrange the Venue';
                        		
                        		}
                        		
                        		else if(venueArrangmentCombo.getValue() == 3 && venueCostResCombo.getValue() == ''){
                        		errorMsg = 'You Must Select Who Pay the Venue Cost';
                        		
                        		}
                        		
                        		else if(requestDateField.getValue() == ''){
                        		errorMsg = errorMsg+' Request Date';
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
                 
                    	  	Ext.Ajax.request({   
					        waitMsg: 'Please wait...',
					        url: '../ContractsAction.do',
					        params: {
					          task: "addNewContract",
					          clientname:               clientNameCombo.getValue(),
							  proposalid:               proposalIdField.getValue(),
							  contractProactive:        getContractProactiveValue(),
							  fund:      	            getContractFundValue(),
							  contractRate:             contractRateCombo.getValue(),
							  requestDate:              requestDateField.getValue().format('Y-m-d'),
							  tentativeStart:           tsf,
							  tentativeEnd:             tef,
							  progressHistory:          proposalProgressHistory.getValue(),
							  contractdealpersontype:   contractDealPersonType,
							  contractdealpersontypeid: contractDealPersonTypeId,
					          contractgroupPrice:       contractPrice.getValue(),
					          contractVenueLocation:    locationCombo.getValue(),
					          contractVenueArrangment:  venueArrangmentCombo.getValue(),
					          venueCostRes:             venueCostResCombo.getValue(),
							  coordinatorselection:     getcoordinatorSelectionValue(),
							  coordinatorindividual:    coordinatorNameCombo.getValue(),
							  coordinatorteam:          coordinatorTeamCombo.getValue(),
					          contractPriceNote:        contractPriceNote.getValue()
					        },
					        method:'POST', 
					        success: function(response){        
								Ext.MessageBox.alert('Status', 'Changes saved successfully.', showResult);
					
					        },
					        failure: function(response){
					          var result=response.responseText;
					          Ext.MessageBox.alert('error',result+'  could not connect to the database. retry later');          
					        }                      
					      });
                       }

     			 } 
   			}
	    ,{ 
	        text:'Cancel',
	        formBind: true,  
	        // Function that fires when user clicks the button 
	        handler:function(){showResult(); }}         
	    
	    ]});
//end
});