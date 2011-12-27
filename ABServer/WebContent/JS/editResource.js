//Dates Validation
Ext.apply(Ext.form.VTypes, {
    daterange : function(val, field) {
        var date = field.parseDate(val);

        if(!date){
            return false;
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

	var photoPath = '';
	
	var companyCVPath = '';
	var cvPath = '';
	var briefPath = '';
	
	var idphotoPath = '';
	
	var resID = 0;

 var Resource  = Ext.data.Record.create([
 
      {name: 'resourceId', type: 'int'},                                  
      {name: 'resourceName', type: 'string'},
      {name: 'resourceLastName', type: 'string'},
      {name: 'resNationality', type: 'string'},
      {name: 'birthdate', type: 'string'},
      {name: 'firstmobilNum', type: 'string'},
      {name: 'secmobilNum', type: 'string'},
      {name: 'resFirstTel', type: 'string'},
      {name: 'resSecTel', type: 'string'},
      {name: 'resFirstEmail', type: 'string'},
      {name: 'resSecEmail', type: 'string'},
      {name: 'resFax', type: 'string'},
      {name: 'resourceAbb', type: 'string'},
      {name: 'resourceType', type: 'string'},
      {name: 'seniority', type: 'string'},
      {name: 'resourceHiegherDegree', type: 'string'},
      {name: 'resAddress', type: 'string'}, 
      {name: 'resCity', type: 'string'},
      {name: 'gender', type: 'int'},
      {name: 'country', type: 'string'},
      {name: 'idNumber', type: 'string'},
      {name: 'taxId', type: 'string'},     
      {name: 'taxDestrict', type: 'string'},
      {name: 'taxPayment', type: 'string'},
      {name: 'resourcePhotoName', type: 'string'},
      {name: 'lastCVUpdate', type: 'string'},
      {name: 'cvLink', type: 'string'},
      {name: 'briefLink', type: 'string'},
      {name: 'idPhotoLink', type: 'string'},
      {name: 'taxFileNum', type: 'string'},
      {name: 'foreignCountry', type: 'string'},
      {name: 'companyCVLink', type: 'string'}

     ]);


dataProxy = new Ext.data.HttpProxy({
     	url: '../resourcesAction.do',
     	method: 'POST', 
        headers:{'request-type':'ajax' }
      });
var ds = new Ext.data.Store({
       // load using HTTP
      proxy: dataProxy,
      baseParams:{task:'RETRIEVERESOURCE'}, 
      // the return will be XML, so lets set up a reader
      reader: new Ext.data.XmlReader({
        totalRecords: "results", // The element which contains the total dataset size (optional)
   		record: "Resource",           // The repeated element which contains row information
   		id: "resourceId"
        },Resource
        )
      });



 /***********************the form panel******************************/
 
  var countryData = [
        ['1','Afghanistan'],['2','Albania'],['3','Algeria'],
        ['4','Andorra'],['5','Angola'],['6','Antigua and Barbuda'],
        ['7','Argentina'],['8','Armenia'],['9','Australia'],
        ['10','Austria'],['11','Azerbaijan'],['12','Bahamas'],
        ['13','Bahrain'],['14','Bangladesh'],['15','Barbados'],
        ['16','Belarus'],['17','Belgium'],['18','Belize'],
        ['19','Benin'],['20','Bhutan'],['21','Bolivia'],
        ['22','Bosnia and Herzegovina'],['23','Botswana'],
        ['24','Brazil'],['25','Brunei'],['26','Bulgaria'],
        ['27','Burkina Faso'],['28','Burundi'],['29','Cambodia'],
        ['30','Cameroon'],['31','Canada'],['32','Cape Verde'],
        ['33','Central African Republic'],['34','Chad'],
        ['35','Chile'],['36','China'],['37','Colombia'],
        ['38','Comoros'],['39','Congo (Brazzaville)'],
        ['40','Congo'],['41','Costa Rica'],['42','Croatia'],
        ['43','Cuba'],['44','Cyprus'],['45','Czech Republic'],
        ['46','Denmark'],['47','Djibouti'],['48','Dominica'],
        ['49','Dominican Republic'],['50','East Timor'],
        ['51','Ecuador'],['52','Egypt'],['53','El Salvador'],
        ['54','Equatorial Guinea'],['55','Eritrea'],
        ['56','Estonia'],['57','Ethiopia'],['58','Fiji'],
        ['59','Finland'],['60','France'],['61','Gabon'],
        ['62','Gambia'],['63','Georgia'],['64','Germany'],
        ['65','Ghana'],['66','Greece'],['67','Grenada'],
        ['68','Guatemala'],['69','Guinea'],['70','Guinea-Bissau'],
        ['71','Guyana'],['72','Haiti'],['73','Honduras'],
        ['74','Hungary'],['75','Iceland'],['76','India'],
        ['77','Indonesia'],['78','Iran'],['79','Iraq'],
        ['80','Ireland'],['81','Italy'],['82','Jamaica'],
        ['83','Japan'],['84','Jordan'],['85','Kazakhstan'],
        ['86','Kenya'],['87','Kiribati'],['88','Korea, North'],
        ['89','Korea, South'],['90','Kuwait'],['91','Kyrgyzstan'],
        ['92','Laos'],['93','Latvia'],['94','Lebanon'],
        ['95','Lesotho'],['96','Liberia']];
        
	  var countryDS = new Ext.data.SimpleStore({
        fields: ['id','name'],
        data: countryData
    	});
    	
    	
    	
    	 var nationalityData = [
        ['1','Egyption'],['2','Egyption + Foreign Nationality'],['3','Foreign Nationality']];
        
	  var nationalityDS = new Ext.data.SimpleStore({
        fields: ['id','name'],
        data: nationalityData
    	});
    	
    	
    	
	
	  var countryCombo = new Ext.form.ComboBox({            	
		    store: countryDS,
		    fieldLabel: 'Country',
		    displayField:'name',
		    valueField: 'name',
		    selectOnFocus: true,
		    mode: 'local',
		    typeAhead: true,
		    editable: false,
		    triggerAction: 'all',
	
		    emptyText:'Select a Country...'
	  });
 
  		var genderData = [
	        ['1','Male'],
	        ['2','Female']];
        
	  var genderDS = new Ext.data.SimpleStore({
        fields: ['id','name'],
        data: genderData
    	});
	
	 var genderCombo = new Ext.form.ComboBox({            	
		    store: genderDS,
		    fieldLabel: 'Gender',
		    displayField:'name',
		    valueField: 'id',
		    selectOnFocus: true,
		    mode: 'local',
		    typeAhead: true,
		    editable: false,
		    triggerAction: 'all',
	
		    emptyText:'Select a gender...'
	  });
   	  var resourceTypeData = [
        ['1','Consultant'],
        ['2','Trainer'],
        ['3','Both']];
        
	  var resourceTypeDS = new Ext.data.SimpleStore({
        fields: ['id','name'],
        data: resourceTypeData
    	});
	
	  var resourceTypeCombo = new Ext.form.ComboBox({            	
		    store: resourceTypeDS,
		    fieldLabel: 'Resource Type',
		    displayField:'name',
		    valueField: 'id',
		    selectOnFocus: true,
		    mode: 'local',
		    typeAhead: true,
		    editable: false,
		    triggerAction: 'all',
	
		    emptyText:'Select a Type...'
	  });
	  
	  var uploadPhotoField = new Ext.form.TextField({
      		fieldLabel: 'Photo',
      		hidden: true,
      		width: 200,
    		inputType: 'file'

     		});
     		
 		var uploadPhotoButton = new Ext.Button({
  		text: 'Upload Photo',
  		minWidth:400,
  		type : 'submit',
  		
  		hidden: true,
  		handler:function(){
  			
  			 basicInfoForm.getForm().submit({
	                	
	                    url: '../upload.do?resID='+resID+'&photo='+uploadPhotoField.getValue(),
	                    waitMsg: 'Uploading your Files...',
	                   
	                    success: function(fp, o){
	                        msg('Success', 'Processed your files on the server');
	                       
	                    }
                   }
	              
                 );
  			
  		}

 		});
     	
     	var downloadPhotoButton = new Ext.Button({
  		text: 'Open/Download Photo',
  		minWidth:400,
  		type : 'submit',
  	//	hidden: true,
  		handler:function(){
  			
  			var redirect = photoPath; 
		 	window.location = redirect;
  			
  		}

 		});
     	
     	
	  
	  var companyResumeField = new Ext.form.TextField({
      		fieldLabel: 'Company Format Resume',
      		hidden: true,
    		inputType: 'file'

     		});
     		
     		
     		var ownResumeField = new Ext.form.TextField({
      		fieldLabel: 'Your Own Resume',
      		hidden: true,
    		inputType: 'file'

     		});
     		
     	  var uploadBriefField = new Ext.form.TextField({
      		fieldLabel: 'Brief',
      		hidden: true,
    		inputType: 'file'

     		});
     	var uploadFilesButton = new Ext.Button({
  		text: 'Upload File(s)',
  		minWidth:400,
  		hidden: true,
  		handler:function(){
  			
  			 resourceQualifictionsForm.getForm().submit({
	                	
	                    url: '../upload.do?resID='+resID+'&companycv='+companyResumeField.getValue+'&owncv='+ownResumeField.getValue()+'&brief='+uploadBriefField.getValue(),
	                    waitMsg: 'Uploading your Files...',
	                   
	                    success: function(fp, o){
	                        msg('Success', 'Processed your files on the server');
	                       
	                    }
                   }
	              
                 );
  		}

 		});
     	
     	
     	var downloadcompanyCVButton = new Ext.Button({
  		text: 'Open/Download Company Format CV',
  		minWidth:400,
  		type : 'submit',
  	//	hidden: true,
  		handler:function(){
  			
  			var redirect = companyCVPath; 
		 	window.location = redirect;
  			
  		}

 		});
 		var downloadownCVButton = new Ext.Button({
  		text: 'Open/Download CV',
  		minWidth:400,
  		type : 'submit',
  	//	hidden: true,
  		handler:function(){
  			
  			var redirect = cvPath; 
		 	window.location = redirect;
  			
  		}

 		});
 		var downloadBriefButton = new Ext.Button({
  		text: 'Open/Download Brief',
  		minWidth:400,
  		type : 'submit',
  	//	hidden: true,
  		handler:function(){
  			
  			var redirect = briefPath; 
		 	window.location = redirect;
  			
  		}

 		});
     	
     		
 	var idPhotoCopyField = new Ext.form.TextField({
  		fieldLabel: 'ID Photo Copy',
      		hidden: true,
    		inputType: 'file'
 		});
 		
 		var uploadIdPhotoButton = new Ext.Button({
  		text: 'Upload ID Photo Copy',
  		minWidth:400,
  		hidden: true,
  		handler:function(){
  			
  			 resourceTaxInfoForm.getForm().submit({
	                	
	                    url: '../upload.do?resID='+resID,
	                    waitMsg: 'Uploading your Files...',
	                   
	                    success: function(fp, o){
	                        msg('Success', 'Your file(s) uploaded successfully');
	                       
	                    }
                   }
	              
                 );
  		}

 		});
 		var downloadIdPhotoButton = new Ext.Button({
  		text: 'Open/Download ID Photo Copy',
  		minWidth:400,
  		hidden: true,
  		handler:function(){
  			
  			var redirect = idphotoPath; 
		 	window.location = redirect;
  		}

 		});
 		
 	//	uploadIdPhotoButton.setPosition(100,100);
     var resourceSeniorityData = [
        ['1','Senior'],
        ['2','Middle Agged'],
        ['3','Junior']];
        
	  var resourceSeniorityDS = new Ext.data.SimpleStore({
        fields: ['id','name'],
        data: resourceSeniorityData
    });
	
	  var resourceSeniorityCombo = new Ext.form.ComboBox({            	
		    store: resourceSeniorityDS,
		    fieldLabel: 'Seniority',
		    displayField:'name',
		    valueField: 'id',
		    selectOnFocus: true,
		    mode: 'local',
		    typeAhead: true,
		    editable: false,
		    triggerAction: 'all',
	
		    emptyText:'Select a Seniority...'
	  });
	
	
	  var highestDegreeradio = new Ext.form.RadioGroup({
        	
        	fieldLabel: 'Highest Degree',
        	columns: 1,
                items: [
                    {boxLabel: 'B.Sc.', name: 'rb-auto', inputValue: 1},
                    {boxLabel: 'M.Sc.', name: 'rb-auto', inputValue: 2},
                    {boxLabel: 'Ph.D.', name: 'rb-auto', inputValue: 3},
                    {boxLabel: 'MBA', name: 'rb-auto', inputValue: 4},
                    {boxLabel: 'MPA', name: 'rb-auto', inputValue: 5},
                    {boxLabel: 'Diploma', name: 'rb-auto', inputValue: 6}
                ]
        	
        	
        });
        
        
 function gethighestDegreeradioValue() {
    var v;

    highestDegreeradio.items.each(function(item) {
      v = item.getRawValue();
      return !item.getValue();
    });

    return v;
  };
        
   
   function sethighestDegreeradioValue(v1) {
	    var v2;
	
	    highestDegreeradio.items.each(function(item) {
	      v2 = item.getRawValue();
	     
	      if(v1==v2)
	      item.setValue(true);
	      return !(v1==v2);
	    });
	
	  //  return v;
	  }
	  
	  
	  
	
 		
 		var idNumberField = new Ext.form.NumberField({
  		fieldLabel: 'ID Number'
  		
 		});
 		
 		idNumberField.on('blur',function(){
 			
 			
 			Ext.Ajax.request({   
	        			waitMsg: 'Check ID Number Uniqueness...',
	        			url: '../resourcesAction.do',	
	        			
	        			params: {
	          				task: "CHECKIDNUMBER",
	          				
	          				idNumber: idNumberField.getValue()
	          				 
	        			},
	        			method:'POST', 
	        			success: function(fp, o){
	                        msg('Success', 'ID Number is Valid');
	                       
	                    },
	        			failure: function(response){
	          				msg('Fail', 'This ID Number is exist in the system enter another one');
	          				idNumberField.reset();
	        			}                      
	      			});
 			
 			
 		});
 		
 		var taxIDNumberField = new Ext.form.NumberField({
  		fieldLabel: 'Tax ID Number'
 		});
 		
 		
 		
 		
 		
 		var taxDistrictField = new Ext.form.NumberField({
  		fieldLabel: 'Tax District'
 		});
 		
 		var taxPaymentPercentField = new Ext.form.NumberField({
  		fieldLabel: 'Tax Deduction Percent',
      	maxValue:100,
      	minValue:0 
 		});
 		
 		var taxFileNumberField = new Ext.form.NumberField({
  		fieldLabel: 'Tax File Number'
 		});
 		
 		var city = new Ext.form.TextField({
            fieldLabel: 'City',
            name: 'city'
        });
        
        var address = new Ext.form.TextArea({
            fieldLabel: 'Address',
            name: 'address',
            grow: false,
            height : 40,
            preventScrollbars:true
        });
 		
 		var FirstEmail = new Ext.form.TextField({
            fieldLabel: 'First E-Mail',
            vtype:'email'
        });
        
        var SecEmail = new Ext.form.TextField({
            fieldLabel: 'Second E-Mail',
            vtype:'email'
        });
        

        var FirstMobile = new Ext.form.TextField({
            fieldLabel: 'First Mobile',
            maskRe: /([0-9\s]+)$/
        })
        
        var SecMobile = new Ext.form.TextField({
            fieldLabel: 'Second Mobile',
            maskRe: /([0-9\s]+)$/
        })
        
        var fax = new Ext.form.TextField({
            fieldLabel: 'Fax',
            maskRe: /([0-9\s]+)$/
        })
        
        var FirstLandTel = new Ext.form.TextField({
            fieldLabel: 'First Land Tel.',
            maskRe: /([0-9\s]+)$/
        })
        
        
        var SecLandTel = new Ext.form.TextField({
            fieldLabel: 'Second Land Tel.',
            maskRe: /([0-9\s]+)$/
        })
        
        
        
        var resourceName = new Ext.form.TextField({
            fieldLabel: 'Name',
            name: 'Name',
            allowBlank:false
        });

        var lastName = new Ext.form.TextField({
            fieldLabel: 'Last Name'
        });

        var abbrev = new Ext.form.TextField({
            fieldLabel: 'Abbreviation',
            maxLength:2
        });

  	  var nationality = new Ext.form.ComboBox({            	
		    store: nationalityDS,
		    fieldLabel: 'Nationality Country',
		    displayField:'name',
		    valueField: 'id',
		    selectOnFocus: true,
		    mode: 'local',
		    typeAhead: true,
		    editable: false,
		    triggerAction: 'all',
	
		    emptyText:'Select a Your Nationality...',
         listeners: {
         select: function (combo, record, index) {
    	    this.selectedIndex = index;

			if(index == 0)
			fn.disable();
			else
			fn.enable();
         }}
	  });
        
        var fn = new Ext.form.TextField({
            fieldLabel: 'Your Foreign Country'
        });
        fn.disable();
        var birthDate = new Ext.form.DateField({
        	fieldLabel: 'Birth Date',
              format: 'Y-m-d'
        	});
     
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
		 
 
 
ds.load();
ds.on('load',function(){ 

var resourceRec = ds.getAt(0);

resID = resourceRec.get('resourceId');

resourceName.setValue(resourceRec.get('resourceName'));
lastName.setValue(resourceRec.get('resourceLastName'));

FirstMobile.setValue(resourceRec.get('firstmobilNum'));
SecMobile.setValue(resourceRec.get('secmobilNum'));
FirstLandTel.setValue(resourceRec.get('resFirstTel'));
SecLandTel.setValue(resourceRec.get('resSecTel'));


FirstEmail.setValue(resourceRec.get('resFirstEmail'));
SecEmail.setValue(resourceRec.get('resSecEmail'));
fax.setValue(resourceRec.get('resFax'));
abbrev.setValue(resourceRec.get('resourceAbb'));
resourceTypeCombo.setValue(resourceRec.get('resourceType'));

resourceSeniorityCombo.setValue(resourceRec.get('seniority'));
sethighestDegreeradioValue(resourceRec.get('resourceHiegherDegree'));

//console.log("resNationality === "+resourceRec.get('resNationality'));

nationality.setValue(resourceRec.get('resNationality'));
if(resourceRec.get('resNationality') == 2 || resourceRec.get('resNationality') == 3){
fn.enable();
fn.setValue(resourceRec.get('foreignCountry'));
}
else
fn.disable();
birthDate.setValue(resourceRec.get('birthdate'));
address.setValue(resourceRec.get('resAddress'));
city.setValue(resourceRec.get('resCity'));
countryCombo.setValue(resourceRec.get('country'));
idNumberField.setValue(resourceRec.get('idNumber'));
taxIDNumberField.setValue(resourceRec.get('taxId'));
taxPaymentPercentField.setValue(resourceRec.get('taxPayment'));
taxDistrictField.setValue(resourceRec.get('taxDestrict'));
taxFileNumberField.setValue(resourceRec.get('taxFileNum'));

genderCombo.setValue(resourceRec.get('gender'));

//{name: 'resourcePhotoName', type: 'string'},
//      {name: 'lastCVUpdate', type: 'string'},
//      {name: 'cvLink', type: 'string'},
//      {name: 'briefLink', type: 'string'},
//      {name: 'idPhotoLink', type: 'string'},
//      {name: 'taxFileNum', type: 'string'},
//      {name: 'foreignCountry', type: 'string'},
//      {name: 'companyCVLink', type: 'string'}

if(resourceRec.get('resourcePhotoName') == ''){
uploadPhotoField.setVisible(true);
uploadPhotoButton.setVisible(true);
downloadPhotoButton.setVisible(false);

}
else{
basicInfoForm.remove(uploadPhotoField);
basicInfoForm.remove(uploadPhotoButton);
photoPath = resourceRec.get('resourcePhotoName');
downloadPhotoButton.setVisible(true);

}

if(resourceRec.get('cvLink') == ''){
ownResumeField.setVisible(true);
downloadownCVButton.setVisible(false);
}
else{
resourceQualifictionsForm.remove(ownResumeField);
cvPath = resourceRec.get('cvLink');
downloadownCVButton.setVisible(true);
}

if(resourceRec.get('briefLink') == ''){
uploadBriefField.setVisible(true);
downloadBriefButton.setVisible(false);
}
else{
resourceQualifictionsForm.remove(uploadBriefField);
briefPath = resourceRec.get('briefLink');
downloadBriefButton.setVisible(true);
}

if(resourceRec.get('idPhotoLink') == ''){
idPhotoCopyField.setVisible(true);
uploadIdPhotoButton.setVisible(true);
downloadIdPhotoButton.setVisible(false);
}
else{
resourceTaxInfoForm.remove(idPhotoCopyField);
resourceTaxInfoForm.remove(uploadIdPhotoButton);
idphotoPath = resourceRec.get('idPhotoLink');
downloadIdPhotoButton.setVisible(true);
}

if(resourceRec.get('companyCVLink') == ''){
companyResumeField.setVisible(true);
downloadcompanyCVButton.setVisible(false);
}
else{
resourceQualifictionsForm.remove(companyResumeField);
companyCVPath = resourceRec.get('companyCVLink');
downloadcompanyCVButton.setVisible(true);
}

if(resourceRec.get('briefLink') == '' || resourceRec.get('companyCVLink') == '' || resourceRec.get('cvLink') == ''){
	uploadFilesButton.setVisible(true);
}
else
uploadFilesButton.setVisible(false);

});
 var l = new Ext.form.Label({html:'<a href="../JSP/resourceDetails.jsp?resourceId={resourceId}" target="_blank">Resource Details</a>'});

 /*-----------------------------add resource  form--------------------------------------*/
 var basicInfoForm = new Ext.form.FormPanel({
        	
           
            labelWidth: 150,
            fileUpload: true,
            autoWidth: true,
            frame: true,
            title:'Basic Information',
            defaults: {width: 250},	// Default config options for child items
           
            height: 270,
            bodyStyle: Ext.isIE ? 'padding:0 0 5px 15px;' : 'padding:10px 15px;',
           // border: true,
            style: {
                "margin-left": "10px", // when you add custom margin in IE 6...
                "margin-right": Ext.isIE6 ? (Ext.isStrict ? "-10px" : "-13px") : "0"  // you have to adjust for it somewhere else
            },
              items:[resourceName,l,lastName,abbrev,genderCombo,nationality,fn,birthDate,uploadPhotoField,uploadPhotoButton,downloadPhotoButton]
        });
 
 var contactInfoForm = new Ext.form.FormPanel({

            labelWidth: 150,
            frame: true,
            title:'Contact Information',
            autoWidth: true,	// Default config options for child items
            defaults: {width: 250},
            height: 270,
             bodyStyle: Ext.isIE ? 'padding:0 0 5px 15px;' : 'padding:10px 15px;',
            border: true,
            style: {
                "margin-left": "10px", // when you add custom margin in IE 6...
                "margin-right": Ext.isIE6 ? (Ext.isStrict ? "-10px" : "-13px") : "0"  // you have to adjust for it somewhere else
            },
              items:[FirstLandTel,SecLandTel,fax,FirstMobile,SecMobile,FirstEmail,SecEmail,countryCombo,city,address]
       });
 

 
 var resourceQualifictionsForm = new Ext.form.FormPanel({
   
            labelWidth: 150,
            autoWidth: true,
            frame: true,
            border: true,
            fileUpload: true,
            title:'Resource Profile & Qualifications',
            defaults: {width: 250},	// Default config options for child items
            defaultType: 'textfield',
            height: 240,
             bodyStyle: Ext.isIE ? 'padding:0 0 5px 15px;' : 'padding:10px 15px;',
            border: true,
            style: {
                "margin-left": "10px", // when you add custom margin in IE 6...
                "margin-right": Ext.isIE6 ? (Ext.isStrict ? "-10px" : "-13px") : "0"  // you have to adjust for it somewhere else
            },
            items:[resourceTypeCombo,companyResumeField,downloadcompanyCVButton,ownResumeField,downloadownCVButton,uploadBriefField,downloadBriefButton,uploadFilesButton, highestDegreeradio,resourceSeniorityCombo]});
 
 var resourceTaxInfoForm = new Ext.form.FormPanel({
    
            labelWidth: 150,
   			autoWidth: true,
   			frame: true,
   			fileUpload: true,
            title:'Resource Tax Information',
            defaults: {width: 250},	// Default config options for child items
            defaultType: 'textfield',
            height: 240,
             bodyStyle: Ext.isIE ? 'padding:0 0 5px 15px;' : 'padding:10px 15px;',
         //   border: true,
            style: {
                "margin-left": "10px", // when you add custom margin in IE 6...
                "margin-right": Ext.isIE6 ? (Ext.isStrict ? "-10px" : "-13px") : "0"  // you have to adjust for it somewhere else
            },
           items:[taxIDNumberField,taxDistrictField,taxPaymentPercentField,taxFileNumberField,idNumberField,idPhotoCopyField,uploadIdPhotoButton,downloadIdPhotoButton]});
 
 
        
 /***************************************resource tabs***********************************************/


var tabs=  new Ext.TabPanel({
                    region:'center',
                 //   frame: true,
                    deferredRender:false,
                    activeTab:0,
                    autoScroll : true,
                    height:495,
                  	buttonAlign:'center',
        			renderTo: 'binding-example',
                    items:[basicInfoForm,contactInfoForm,resourceQualifictionsForm,resourceTaxInfoForm],
                    buttons:[{text: 'Save',
               
                // Function that fires when user clicks the button 
                handler:function(){
                	
                	
	                      	Ext.Ajax.request({   
	        			waitMsg: 'Please wait...',
	        			url: '../resourcesAction.do',	
	        			
	        			params: {
	          				task: "EDITRESOURCE",
	          				resourceId: resID,
	          				firstname: resourceName.getValue(),
	          				lastname: lastName.getValue(),
	          				abbreviations: abbrev.getValue(),
	          				gender: genderCombo.getValue(),
	          				resNationality: nationality.getValue(),
	          				foreignCountry: fn.getValue(),
	          				birthdate: birthDate.getValue().format('Y-m-d'),
	          				
	          				firstLandTel: FirstLandTel.getValue(),
	          				secLandTel: SecLandTel.getValue(),
	          				fax: fax.getValue(),
	          				firstMobile: FirstMobile.getValue(),
	          				secMobile: SecMobile.getValue(),
	          				firstEmail: FirstEmail.getValue(),
	          				secEmail: SecEmail.getValue(),
	          				resAddress: address.getValue(),
	          				resCity: city.getValue(),
	          				country: countryCombo.getValue(),

	          				resType: resourceTypeCombo.getValue(),
	          				highestDegree: gethighestDegreeradioValue(),
	          				seniority: resourceSeniorityCombo.getValue(),
	          				
	          				idNumber: idNumberField.getValue(),
	          				taxId: taxIDNumberField.getValue(),
	          				taxDistrict: taxDistrictField.getValue(),
	          				taxPayment: taxPaymentPercentField.getValue(),
	          				taxFileNum: taxFileNumberField.getValue(),
	          				
	          				photo: uploadPhotoField.getValue(),
	          				companycv: companyResumeField.getValue(),
	          				owncv: ownResumeField.getValue(),
	          				brief: uploadBriefField.getValue(),
	          				idphoto: idPhotoCopyField.getValue()
	          				 
	        			},
	        			method:'POST', 
	        			success: function(response){
	        				
	        			var redirect = '../JSP/resourceslist.jsp'; 
			 			window.location = redirect;
	                       
	
	        			},
	        			failure: function(response){
	          				var result=response.responseText;
	          				Ext.MessageBox.alert('error',result+'  could not connect to the database. retry later');          
	        			}                      
	      			});
	                   
            }},{text: 'Cancel',  
                // Function that fires when user clicks the button 
                handler:function(){
                	var redirect = '../JSP/resourceslist.jsp'; 
			 		window.location = redirect;
                	
                }}]});
 
});
      