//Dates Validation
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

  		  var holidayName = new Ext.form.TextField({
      		fieldLabel: 'Holiday Name',
      		allowBlank: false,
      		//editable: false,
    		//readOnly : true,
    		maskRe: /([a-zA-Z0-9\s]+)$/
     		});
     		
     		
	
			var startHolidayDateField = new Ext.form.DateField({
			 fieldLabel: 'Start Date',
             format: 'd-M-Y',
           //  minValue: '1999-01-10',
           //  disabledDays: [5, 6],
      		// disabled: true,
      		 id: 'startdt',
        	 vtype: 'daterange',
        	 endDateField: 'enddt'
            });
            
     		var endHolidayDateField = new Ext.form.DateField({
			  fieldLabel: 'End Date',
              format: 'd-M-Y',
           //   minValue: '1999-01-10',
            //  disabledDays: [5, 6],
     		//  disabled: true,
        	  id: 'enddt',
        	  vtype: 'daterange',
        	  startDateField: 'startdt' // id of the start date field
     		  
            });
   
 
/***********************the main form panel******************************/
 var createHolidayForm = new Ext.form.FormPanel({
    labelWidth: 150,
    frame: true,
    height : 450,
 	 defaults: {width: 300},
    title:'Create Holiday',
   // defaultType: 'fieldset',
   
   items: [holidayName,
     		startHolidayDateField,
     		endHolidayDateField
     		] ,
     		buttons:[{ 
                text:'Save',
                iconCls:'save',
                formBind: true,  
                // Function that fires when user clicks the button 
                handler:function(){ 
                    createHolidayForm.getForm().submit( 
                    	  	Ext.Ajax.request({   
					        waitMsg: 'Please wait...',
					        url: '../HolidaysAction.do',
					        params: {
					          task: "addNewHoliday",
					          holiday_name:  holidayName.getValue(),
					          startDate: startHolidayDateField.getValue().format('Y-m-d'),
					          endDate: endHolidayDateField.getValue().format('Y-m-d')
					        },
					        method:'POST', 
					        success: function(response){   
					        	var result=response.responseText;
					        	
								Ext.MessageBox.alert('Status', 'Holiday saved successfully.', showResult);
					           },
					        failure: function(response){
					          var result=response.responseText;
					          Ext.MessageBox.alert('error','cannot add this holiday becouse one or more dayes of this holiday have a posted courses');          
					        }                      
					      })
                    	  );} 
           		 	},{ 
	                text:'Cancel',
	                formBind: true,  
	                // Function that fires when user clicks the button 
	                handler:showResult}] 
     		
    
});


function showResult(btn){
         var redirect = '../JSP/holidays.jsp'; 
		 window.location = redirect;
    };

  
  var pn=new Ext.TabPanel({
                      region:'center',
                 //   frame: true,
                    deferredRender:false,
                    activeTab:0,
                    autoScroll : true,
                    autoHeight : true,
                  height:495, 
                           /* width:980,*/
        			renderTo: 'binding-example',
                    items:[createHolidayForm]});
                    
      

//]});
//end
});