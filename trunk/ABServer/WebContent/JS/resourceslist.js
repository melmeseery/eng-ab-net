
Ext.onReady(function() {

//	Ext.grid.filter.StringFilter.prototype.icon = 'images/find.png';
    Ext.state.Manager.setProvider(new Ext.state.CookieProvider());

    Ext.form.Field.prototype.msgTarget = 'side';

    var bd = Ext.getBody();
    var resFullName = '';
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
	  {name: 'companyCVLink', type: 'string'},
      {name: 'contractingStatus', type: 'string'},
      {name: 'age', type: 'int'},
      {name: 'contracted', type: 'string'},
      {name: 'targetedDays', type: 'int'},
      {name: 'assignedDays', type: 'int'},
      {name: 'color', type: 'string'}
     

     ]);
 
 
 dataProxy = new Ext.data.HttpProxy({
     	url: '../ResourcesAction.do',
     	method: 'POST', 
        headers:{'request-type':'ajax' }
      });
 
 var ds = new Ext.data.Store({
       // load using HTTP
      proxy: dataProxy,
      baseParams:{task:'list'}, 
      // the return will be XML, so lets set up a reader
      reader: new Ext.data.XmlReader({
        totalRecords: "results", // The element which contains the total dataset size (optional)
   		record: "Resource",           // The repeated element which contains row information
   		id: "resourceId"
        },Resource
        ),
        sortInfo:{field: "resourceName", direction: "ASC"}
      });
  
  
  var resourceTplMarkup = [
		'<table border = "0"><tr><td><img src={resourcePhotoName} height="105" width="100" border="0"/> </td><td WIDTH=700>Name: {resourceName} {resourceLastName} ({resourceAbb})<br/>Mobile(s): [{firstmobilNum}]/[{secmobilNum}]<br/>Tel(s): [{resFirstTel}]/[{resSecTel}]<br/>Email(s): [{resFirstEmail}]/[{resSecEmail}]<br/>Fax: {resFax}</td><td>Last CV Update: {lastCVUpdate}<br/>{cvLink}<br/>{briefLink}<br/><a href="../JSP/resourceDetails.jsp?resourceId={resourceId}" target="_blank">Resource Details</a></td></tr></table>'
	];
	var resourceTpl = new Ext.Template(resourceTplMarkup);

 
 var filters = new Ext.grid.GridFilters({
	  filters:[
	    
	    {type: 'string',  dataIndex: 'resourceName'},
	    {type: 'string',  dataIndex: 'resourceLastName'},
	   
	    {
	      type: 'list',  
	      dataIndex: 'resourceType', 
	      options: ['Consultant', 'Trainer', 'Both']
	    },
	    {
	      type: 'list',  
	      dataIndex: 'seniority', 
	      options: ['Senior', 'Middle Agged', 'Junior']
	    },
	   
	    {
	      type: 'list',  
	      dataIndex: 'resourceHiegherDegree', 
	      options: ['B.Sc.', 'M.Sc.', 'Ph.D.','MBA', 'MPA', 'Diploma']
	    }
	]});
 var sm = new Ext.grid.CheckboxSelectionModel();
 
 function changeColor(value, p, record){
 	if(record.get('assignedDays')< record.get('targetedDays'))
 	{
 		  //console.log(record.get('resourceFileLocation'));
	 	var s=record.get('assignedDays');
	 	var link= '<DIV style="color:'+"red"+'">'+s+'</DIV>'
	        return String.format(
	                link,value);
	 	}
	 else
	 {
	 	var s=record.get('assignedDays');
	 	var link= '<DIV style="color:'+"green"+'">'+s+'</DIV>'
	        return String.format(
	                link,value);
	 	}
	 
    }
 
 
 
var grid = new Ext.grid.GridPanel({
        store: ds,
        plugins: filters,
        bbar: new Ext.PagingToolbar({
	    store: ds,
	    pageSize: 15,
	    plugins: filters
	  	})
        ,enableColLock: false,
	  loadMask: true,
        columns: [sm,
            {header: "Resource First Name", width: 170, dataIndex: 'resourceName', sortable: true},
            {header: "Resource Last Name", width: 170, dataIndex: 'resourceLastName', sortable: true},
            {header: "Resource Type", width: 130, dataIndex: 'resourceType', sortable: true},
            {header: "Seniority", width: 120, dataIndex: 'seniority', sortable: true},
            {header: "Resource Age", width: 90, dataIndex: 'age', sortable: true},
            {header: "Highest Degree", width: 100, dataIndex: 'resourceHiegherDegree', sortable: true},
            {header: "Contracting Status", width: 120, dataIndex: 'contractingStatus', sortable: true},
            {header: "Contracted", width: 90, dataIndex: 'contracted', sortable: true},
            {header: "Targeted Days", width: 100, dataIndex: 'targetedDays', sortable: true},
            {header: "Assigned Days", width: 100, dataIndex: 'assignedDays',renderer: changeColor, sortable: true}
        ],
//		viewConfig: {
//			forceFit: true
//		},
		sm:sm,
        height:250,
		split: true,
		region: 'north'
    });

////////////////////////////////edit resource///////////////////////////////////////
grid.on("rowdblclick", function(grid) {
	  var selections = grid.selModel.getSelections();
	  
	  resFullName = selections[0].get('resourceName')+' '+selections[0].get('resourceLastName');
	    //console.log('resFullName = '+resFullName);
	  
	  basicInfoFormEdit.getForm().reset();
	contactInfoFormEdit.getForm().reset();
	resourceQualifictionsFormEdit.getForm().reset();
	resourceTaxInfoFormEdit.getForm().reset();	
	  
//	  	uploadIdPhotoButtonEdit.disable();
//		uploadFilesButtonEdit.disable();
//		uploadPhotoButtonEdit.disable();
	  
	  edit_ds.load({params:{res_id: selections[0].id}});
	  
	  edit_win.setTitle('Edit Resource - '+resFullName);
	  
	  tabs2.setActiveTab(0);
	  
		edit_win.show();
		

});



/////////////////////////////////////delete resource/////////////////////////////////////////

//
//var selections = grid.selModel.getSelections();
//  var selectedResources = [];
//  for(i = 0; i< grid.selModel.getCount(); i++){
//    selectedResources.push(selections[i].xml.resourceId);
//  }
// 
//  
  function confirmDeleteResources(){
    if(grid.selModel.getCount() == 1) // only one president is selected here
    {
      Ext.MessageBox.confirm('Confirmation','Are you sure you want to delete this Resource?', deleteResources);
    } else if(grid.selModel.getCount() > 1){
      Ext.MessageBox.confirm('Confirmation','Are you sure you want to delete those Resources?', deleteResources);
    } else {
      Ext.MessageBox.alert('Uh oh...','You can\'t really delete something you haven\'t selected huh?');
    }
  }
  
  function deleteResources(btn){
    if(btn=='yes'){
         var selections = grid.selModel.getSelections();
         var selectedResources = [];
         for(i = 0; i< grid.selModel.getCount(); i++){
          selectedResources.push(selections[i].id);
        //  alert("ssssssssssssss>>>>>> "+selections[i].id);
         }
         
         Ext.Ajax.request({  
            waitMsg: 'Please Wait',
            url: '../ResourcesAction.do', 
            params: { 
               task: "deleteResource", 
               ids:  selectedResources
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


///////////////////////////////////// filter //////////////////////////////////////

 var retreivingDataProxy = new Ext.data.HttpProxy({
     	url: '../GeneralRetreivingAction.do',
     	method: 'POST', 
        headers:{'request-type':'ajax' }
  });
      
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
      
      
// coordinatorsDS.load();
 
 
	  var taCombo = new Ext.form.ComboBox({
	    
	     store: taDS,
		// fieldLabel: 'Resource Name',
		 valueField: 'trainingAreaId',
	     displayField:'trainingAreaName',
		 selectOnFocus: true,
		 typeAhead: true,
	     editable: false,
	     hideLabel: true,
	     triggerAction: 'all',
	
		 emptyText:'Select a Training Area...',
         listeners: {
         select: function (combo, record, index) {
    	    this.selectedIndex = index;
    	    cDS.removeAll();
    	cDS.load({params:{task:'coursesByTrainingAreaId',ta_id: this.getValue()}});
		cCombo.reset();
         }}
	   });
	   
	  taCombo.disable();
       var taCheckBox = new Ext.form.Checkbox({
	     	boxLabel: 'Training Area',
	     	 hideLabel: true,
			//boxLabel: 'Funded By IMC',
			//name: 'search_option',
		//	value: '1',
			checked: false,
			width:190
		});
	
	// when check the contract fund checkbox enable the cotract rate comboBox
 	taCheckBox.on('check', function(){
 		if(taCheckBox.checked){
 			taCombo.enable();
 			
 			taCombo.reset();
 			
 		}
 		else{
 			taCombo.disable();
 			
 			taCombo.reset();
 			cDS.removeAll();
	 		cDS.load({params:{task:'courses',ta_id: taCombo.getValue()}});
			cCombo.reset();
 		}
   	});
   	
   	//////////////////courses
   	
// Ext.namespace('Ext.example');
 /*

Ext.example.Store = new Ext.data.SimpleStore({
   	fields: ['id', 'name', 'title'],
    data : Ext.exampledata.states,

	 
	getNamesByIds: function(keyString) { 
		if(keyString==undefined) return null;
		var keys = keyString.split(','); 
	   	var text  = ''; 
	   	for(var i=0; i<keys.length; i++)
		{  
	    	var item = Ext.example.Store.query('id', keys[i]).items[0]; 
	    	if(item != undefined) text += (text!='' ? '; ':'') + item.data['name']; 
	   	} 
    	return text;
	}
});
*/
 var cDS = new Ext.data.Store({
       // load using HTTP
      proxy: retreivingDataProxy,
     // baseParams:{task: "FILTERCOURSES"},
      // the return will be XML, so lets set up a reader
      reader: new Ext.data.XmlReader({
       // The element which contains the total dataset size (optional)
   		record: "Course"},           // The repeated element which contains row information
   		[{name: 'courseName', type: 'string'},{name: 'courseId', type: 'int'}]
        )
      });
//Ext.example.StateMultiSelect = function(config) {
//    Ext.example.StateMultiSelect.superclass.constructor.call(this, config);
//};
//Ext.extend(Ext.example.StateMultiSelect, Ext.form.MultiSelectField, {
//	store: cDS
//	,valueField:'courseId'
//	,displayField:'courseName'
//	,mode: 'remote',
//	hideLabel: true,
//	emptyText:'Select a Course...'
//});
//
//  cCombo = new Ext.example.StateMultiSelect({
//		
//	}); 	
   	
      
      
// coordinatorsDS.load();
 
 
	  var cCombo = new Ext.form.ComboBox({
	    
	     store: cDS,
		 valueField: 'courseId',
	     displayField:'courseName',
		 selectOnFocus: true,
		 typeAhead: true,
	     editable: false,
	     hideLabel: true,
	     mode: 'local',
	     triggerAction: 'all',
		 emptyText:'Select a Course...'
	});
	  cCombo.disable();
       var cCheckBox = new Ext.form.Checkbox({
	     	boxLabel: 'Courses',
	     	hideLabel: true,
			checked: false,
			width:190
		});
	
	// when check the contract fund checkbox enable the cotract rate comboBox
 	cCheckBox.on('check', function(){
 		if(cCheckBox.checked){
 			cCombo.enable();
 			
 			cCombo.reset();
 			
 		}
 		else{
 			
 			cCombo.reset();
 			
 			cCombo.disable();
 			
 			
 		
 		}
   	});
   	
   	   	//////////////////consulting areas
   	
   	 var caDS = new Ext.data.Store({
       // load using HTTP
      proxy: retreivingDataProxy,
      baseParams:{task: "consultingAreas"},
      // the return will be XML, so lets set up a reader
      reader: new Ext.data.XmlReader({
       // The element which contains the total dataset size (optional)
   		record: "ConsultingArea"},           // The repeated element which contains row information
   		[{name: 'consultingAreaName', type: 'string'},{name: 'consultingAreaId', type: 'int'}]
        )
      });
      
      
// coordinatorsDS.load();
 
 
	  var caCombo = new Ext.form.ComboBox({
	    
	     store: caDS,
		// fieldLabel: 'Resource Name',
		 valueField: 'consultingAreaId',
	     displayField:'consultingAreaName',
		 selectOnFocus: true,
		 typeAhead: true,
	     editable: false,
	     hideLabel: true,
	     triggerAction: 'all',
	
		    emptyText:'Select a Consulting Area...'
	});
	  caCombo.disable();
       var caCheckBox = new Ext.form.Checkbox({
	     	boxLabel: 'Consulting Area',
	     	 hideLabel: true,
			//boxLabel: 'Funded By IMC',
			//name: 'search_option',
		//	value: '1',
			checked: false,
			width:190
		});
	
	// when check the contract fund checkbox enable the cotract rate comboBox
 	caCheckBox.on('check', function(){
 		if(caCheckBox.checked){
 			caCombo.enable();
 			
 			caCombo.reset();
 			
 		}
 		else{
 			caCombo.disable();
 			
 			caCombo.reset();
 		
 		}
   	});
   	
   	////////////////////////////////
      var filterFieldSet = new Ext.form.FieldSet({
           
            title: 'Filter By',
            autoHeight:true,
          //  autoWidth: true,
            defaults: {width: 200},
            defaultType: 'textfield',
           
            items :[taCheckBox,taCombo,cCheckBox,cCombo,caCheckBox,caCombo
            ]
        });       
	   var addFilterPanel = new Ext.FormPanel({
        labelWidth: 70, // label settings here cascade unless overridden
     //   url:'../listCProperties',
        frame:true,
     //   title: 'Add Course',
        bodyStyle:'padding:5px 5px 0',
        width: 350,
         
        defaults: {width: 300},
        defaultType: 'textfield',
		height:400,
        items: [  filterFieldSet
        		] ,
        		
        		buttons:[{text:'Filter',
            	handler:function(){startFiltering();AddFilterWindow.hide();}
            	},{text:'Cancel',
            	handler:function(){AddFilterWindow.hide();}
            	}]   });

      AddFilterWindow= new Ext.Window({
      id: 'AddFilterWindow',
      title: 'Adding a Resources Filter',
      closable:true,
      width: 350,
      height: 320,
      plain:true,
      layout: 'fit',
      items: addFilterPanel
    });
   
   function resetFilterForm(){
	addFilterPanel.getForm().reset(); 
	
}
     
  function displayFilterWindow(){
  if(!AddFilterWindow.isVisible()){
  //	cDS.removeAll();
//  	cDS.load({params:{ta_id: taCombo.getValue()}});
  	
  //  resetFilterForm();
    AddFilterWindow.show();
  } else {
    AddCalendarFilterWindow.toFront();
  }
  
  
  }	    


var i = 1;
function startFiltering(){
      ds.load({params:{start: 0, limit: 15,ta:taCombo.getValue(),c:cCombo.getValue(),ca:caCombo.getValue()}});//  Ext.example.msg('Item Check', 'You {1} the "{0}" menu item.', item.text, checked ? 'checked' : 'unchecked');
    }
////////////////////////////////add resource window/////////////////////////////////////////////////




//////////////////////////////////////////////////////////////////////////////////


var ct = new Ext.Panel({
		title:'Resources List',
        height:495, 
        /* width:980,*/
        renderTo: 'binding-example',
        autoScroll:true,
		frame: true,
	//	title: 'Book List',
	//	width: 540,
	//	height: 400,
		layout: 'border',
		items: [
			grid,
			{
				id: 'detailPanel',
				region: 'center',
				bodyStyle: {
					background: '#ffffff',
					padding: '9px'
				},
				html: 'Please select a resource to see additional details.'
			}
		],
		tbar:[{text:"Add New Resource",iconCls:'add',handler:addNewResource},new Ext.Toolbar.Button({
              text: 'Delete Selection(s)',
              iconCls:'remove',
              handler: confirmDeleteResources
              })
		,{text:"Filter",handler:displayFilterWindow}
		]
	})
	grid.getSelectionModel().on('rowselect', function(sm, rowIdx, r) {
		
		newRecord = r.copy();
		
		if(newRecord.get('cvLink') == '')
		newRecord.set('cvLink','download CV');
		else if(newRecord.get('cvLink') != 'download CV')
		newRecord.set('cvLink','<a href='+r.get('cvLink')+' target="_blank">download CV</a>');
		
		if(newRecord.get('briefLink') == '')
		newRecord.set('briefLink','download Brief');
		else if(newRecord.get('briefLink') != 'download Brief')
		newRecord.set('briefLink','<a href='+r.get('briefLink')+' target="_blank">download Brief</a>');
		
		var detailPanel = Ext.getCmp('detailPanel');
		resourceTpl.overwrite(detailPanel.body, newRecord.data);
	});
//    ds.load();


//////////////////////////////////////////////////////////////////////////////////////////////


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
		    fieldLabel: 'Gender<html><font color=red> *</font></html>',
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
		    fieldLabel: 'Resource Type <html><font color=red> *</font></html>',
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
      		//hideLabel: true,
      		//width: 200,
    		inputType: 'file'

     		});
     	
//     	
//     	uploadPhotoField.on('valid',function(){
//		
//				uploadPhotoButton.enable();
//		});
     		
 		var uploadPhotoButton = new Ext.Button({
  		text: 'Upload Photo',
  		minWidth:100,
  		type : 'submit',
  		
  		handler:function(){
  			if(uploadPhotoField.getValue() == ''){
  				Ext.Msg.show({
			        title: 'Error', 
			        msg: 'You Must Select Your Photo file to upload',
			        minWidth: 200,
			        modal: true,
			        icon: Ext.Msg.ERROR,
			        buttons: Ext.Msg.OK
				 });
			
  			}
  			else{ 
  			 basicInfoForm.getForm().submit({
	                	
	                    url: '../upload.do?photo='+uploadPhotoField.getValue(),
	                    waitMsg: 'Uploading your Files...',
	                   
	                    success: function(fp, o){
	                        msg('Success', 'Processed your files on the server');
	                       
	                    }
                   }
	              
                 );
  			}
  		}

 		});
     		
	  
	  var companyResumeField = new Ext.form.TextField({
      		fieldLabel: 'Company Format Resume',
      		
    		inputType: 'file'

     		});
     		
//     		
//     		companyResumeField.on('valid',function(){
//		
//		uploadFilesButton.enable();
//		});
     		
     		var ownResumeField = new Ext.form.TextField({
      		fieldLabel: 'Your Own Resume',
      		
    		inputType: 'file'

     		});
//     		
//     		ownResumeField.on('valid',function(){
//		
//		uploadFilesButton.enable();
//		});
     		
     	  var uploadBriefField = new Ext.form.TextField({
      		fieldLabel: 'Brief',
      		
    		inputType: 'file'

     		});
     		
//     		uploadBriefField.on('valid',function(){
//		
//		uploadFilesButton.enable();
//		});
     		
     	var uploadFilesButton = new Ext.Button({
  		text: 'Upload Files',
  		minWidth:100,
  		//disabled:true,
  		handler:function(){
  			if(uploadBriefField.getValue() == '' && ownResumeField.getValue() == '' && companyResumeField.getValue() == ''){
  				Ext.Msg.show({
			        title: 'Error', 
			        msg: 'You Must Select at least one file to upload',
			        minWidth: 200,
			        modal: true,
			        icon: Ext.Msg.ERROR,
			        buttons: Ext.Msg.OK
				 });
			
  			}
  			else{ 
  			 resourceQualifictionsForm.getForm().submit({
	                	
	                    url: '../upload.do?companycv='+companyResumeField.getValue+'&owncv='+ownResumeField.getValue()+'&brief='+uploadBriefField.getValue(),
	                    waitMsg: 'Uploading your Files...',
	                   
	                    success: function(fp, o){
	                        msg('Success', 'Processed your files on the server');
	                       
	                    }
                   }
	              
                 );
  			}
  		}

 		});
     	
     		
 	var idPhotoCopyField = new Ext.form.TextField({
  		fieldLabel: 'ID Photo Copy',
      		
    		inputType: 'file'
 		});
// 		idPhotoCopyField.on('valid',function(){
//		
//		uploadIdPhotoButton.enable();
//		});
 		var uploadIdPhotoButton = new Ext.Button({
  		text: 'Upload ID Photo Copy',
  		minWidth:150,
  		//disabled:true,
  		handler:function(){
  			if(idPhotoCopyField.getValue() == ''){
  				Ext.Msg.show({
			        title: 'Error', 
			        msg: 'You Must Select Your Id Photo file to upload',
			        minWidth: 200,
			        modal: true,
			        icon: Ext.Msg.ERROR,
			        buttons: Ext.Msg.OK
				 });
			
  			}
  			else{ 
  				resourceTaxInfoForm.getForm().submit({
	                	
	                    url: '../upload.do',
	                    waitMsg: 'Uploading your Files...',
	                   
	                    success: function(fp, o){
	                        msg('Success', 'Your file(s) uploaded successfully');
	                       
	                    }
                   }
	              
                 );
  			}
  		}

 		});
 		
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
		    fieldLabel: 'Seniority <html><font color=red> *</font></html>',
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
        	
        	fieldLabel: 'Highest Degree <html><font color=red> *</font></html>',
        	columns: [100, 100],
        vertical: true,
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
    var v = 0;

    highestDegreeradio.items.each(function(item) {
      v = item.getRawValue();
      
      if(item.getValue()){
      v = item.getRawValue();
      
      }
      else
      v = 0;
      return !item.getValue();
    });

    return v;
  }
        
   
   function sethighestDegreeradioValue(v1) {
	    var v2;
	
	    highestDegreeradio.items.each(function(item) {
	      v2 = item.getRawValue();
	     
	      if(v1==v2)
	      item.setValue(true);
	      return !(v1==v2);
	    });

	  }
	  		
 		var idNumberField = new Ext.form.NumberField({
  		fieldLabel: 'ID Number<html><font color=red> *</font></html>',
  		minLength:14
  		
 		});
 		
 		idNumberField.on('valid',function(){
 			if(idNumberField.getValue() == '')
 			return;
 			else{
 			Ext.MessageBox.wait('Check ID Number Uniqueness...');
 			Ext.Ajax.request({   
	       			
	        			url: '../ResourcesAction.do',	
	        			
	        			params: {
	          				task: "checkIdNumberValidity",
	          				
	          				idNumber: idNumberField.getValue()
	          				 
	        			},
	        			method:'POST', 
	        			success: function(response){
	                       		var result=response.responseText;
	        				//console.log(result);
	        				if(result == 'success')
								msg('Success', 'ID Number is Valid');
					else if(result == 'fail'){
					msg('Fail', 'This ID Number is exist in the system');
	          				idNumberField.reset();
					}
	                  
	                       
	                    },
	        			failure: function(response){
	          				msg('Fail', 'This ID Number is exist in the system');
	          				idNumberField.reset();
	        			}                      
	      			});
 			}
 			
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
            fieldLabel: 'Name <html><font color=red> *</font></html>',
            name: 'Name',
            allowBlank: false,
            maskRe: /([a-zA-Z0-9\s]+)$/
        });

        var lastName = new Ext.form.TextField({
            fieldLabel: 'Last Name <html><font color=red> *</font></html>',
            allowBlank: false,
            maskRe: /([a-zA-Z0-9\s]+)$/
        });

        var abbrev = new Ext.form.TextField({
            fieldLabel: 'Abbreviation <html><font color=red> *</font></html>',
            maxLength:4,
            maxLengthText:'The Max Length of This Field is Four Characters',
            allowBlank: false,
            maskRe: /([a-zA-Z0-9\s]+)$/
        });


			 var contractedData = [
		        ['1','No'],['2','Yes']];
		        
			  var contractedDS = new Ext.data.SimpleStore({
		        fields: ['id','name'],
		        data: contractedData
		    	});

		var contracted = new Ext.form.ComboBox({            	
		    store: contractedDS,
		    fieldLabel: 'Contracted',
		    displayField:'name',
		    valueField: 'id',
		    selectOnFocus: true,
		    mode: 'local',
		    typeAhead: true,
		    editable: false,
		    triggerAction: 'all',
		    value:1,
         listeners: {
         select: function (combo, record, index) {
    	    this.selectedIndex = index;

			if(index == 0)
			targetedDays.disable();
			else
			targetedDays.enable();
         }}
	  });

		var targetedDays = new Ext.form.NumberField({
            fieldLabel: 'Targeted Days',
            disabled:true
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
	
		    emptyText:'Select a Nationality...',
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
            fieldLabel: 'Foreign Country'
        });
        fn.disable();
        var birthDate = new Ext.form.DateField({
        	fieldLabel: 'Birth Date <html><font color=red> *</font></html>',
            format: 'd-M-Y'
        	});
        
  ///////////////////////////////edit elements////////////////////////////////////////////////
        
        var photoPath = '';
    	
    	var companyCVPath = '';
    	var cvPath = '';
    	var briefPath = '';
    	
    	var idphotoPath = '';
        
  	  var countryComboEdit = new Ext.form.ComboBox({            	
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


	 var genderComboEdit = new Ext.form.ComboBox({            	
		    store: genderDS,
		    fieldLabel: 'Gender <html><font color=red> *</font></html>',
		    displayField:'name',
		    valueField: 'id',
		    selectOnFocus: true,
		    mode: 'local',
		    typeAhead: true,
		    editable: false,
		    triggerAction: 'all',
	
		    emptyText:'Select a gender...'
	  });
 	

	  var resourceTypeComboEdit = new Ext.form.ComboBox({            	
		    store: resourceTypeDS,
		    fieldLabel: 'Resource Type <html><font color=red> *</font></html>',
		    displayField:'name',
		    valueField: 'id',
		    selectOnFocus: true,
		    mode: 'local',
		    typeAhead: true,
		    editable: false,
		    triggerAction: 'all',
	
		    emptyText:'Select a Type...'
	  });
	  
	  var uploadPhotoFieldEdit = new Ext.form.TextField({
    		fieldLabel: 'Photo',
    	//	hideLabel: true,
    	//	width: 200,
  		inputType: 'file'

   		});
//   		uploadPhotoFieldEdit.on('valid',function(){
//		
//		uploadPhotoButtonEdit.enable();
//		});
		var uploadPhotoButtonEdit = new Ext.Button({
		text: 'Upload Photo',
		minWidth:100,
		//disabled:true,
		type : 'submit',
		handler:function(){
			if(uploadPhotoFieldEdit.getValue() == ''){
  				Ext.Msg.show({
			        title: 'Error', 
			        msg: 'You Must Select Your Photo file to upload',
			        minWidth: 200,
			        modal: true,
			        icon: Ext.Msg.ERROR,
			        buttons: Ext.Msg.OK
				 });
			
  			}
  			else{ 
			 basicInfoFormEdit.getForm().submit({
	                	
	                    url: '../upload.do?resID='+resID+'&photo='+uploadPhotoField.getValue(),
	                    waitMsg: 'Uploading your Files...',
	                   
	                    success: function(fp, o){
	                        msg('Success', 'Processed your files on the server');
	                       
	                    }
                 }
	              
               );
  			}
			
		}

		});
   		
	  
	  var companyResumeFieldEdit = new Ext.form.TextField({
    		fieldLabel: 'Company Format Resume',
    		
  		inputType: 'file'

   		});
//   		companyResumeFieldEdit.on('valid',function(){
//		
//		uploadFilesButtonEdit.enable();
//		});
   		
   		var ownResumeFieldEdit = new Ext.form.TextField({
    		fieldLabel: 'Your Own Resume',
    		
  		inputType: 'file'

   		});
//   		ownResumeFieldEdit.on('valid',function(){
//		
//		uploadFilesButtonEdit.enable();
//		});
   	  var uploadBriefFieldEdit = new Ext.form.TextField({
    		fieldLabel: 'Brief',
    		
  		inputType: 'file'

   		});
   		
//   		uploadBriefFieldEdit.on('valid',function(){
//		
//		uploadFilesButtonEdit.enable();
//		});
   		
   	var uploadFilesButtonEdit = new Ext.Button({
		text: 'Upload Files',
		minWidth:100,
		//disabled:true,
		handler:function(){
			if(uploadBriefFieldEdit.getValue() == '' && ownResumeFieldEdit.getValue() == '' && companyResumeFieldEdit.getValue() == ''){
  				Ext.Msg.show({
			        title: 'Error', 
			        msg: 'You Must Select at least one file to upload',
			        minWidth: 200,
			        modal: true,
			        icon: Ext.Msg.ERROR,
			        buttons: Ext.Msg.OK
				 });
			
  			}
  			else{ 
			 resourceQualifictionsFormEdit.getForm().submit({
	                	
	                    url: '../upload.do?resID='+resID+'&companycv='+companyResumeField.getValue+'&owncv='+ownResumeField.getValue()+'&brief='+uploadBriefField.getValue(),
	                    waitMsg: 'Uploading your Files...',
	                   
	                    success: function(fp, o){
	                        msg('Success', 'Processed your files on the server');
	                       
	                    }
                 }
	              
               );
  			}
		}

		});
   	
   		
	var idPhotoCopyFieldEdit = new Ext.form.TextField({
		fieldLabel: 'ID Photo Copy',
    		
  		inputType: 'file'
		});
		
//		
//		idPhotoCopyFieldEdit.on('valid',function(){
//		
//		uploadIdPhotoButtonEdit.enable();
//		});
		
		var uploadIdPhotoButtonEdit = new Ext.Button({
		text: 'Upload ID Photo Copy',
		minWidth:150,
		//disabled:true,
		handler:function(){
			if(idPhotoCopyFieldEdit.getValue() == ''){
  				Ext.Msg.show({
			        title: 'Error', 
			        msg: 'You Must Select Your id Photo file to upload',
			        minWidth: 200,
			        modal: true,
			        icon: Ext.Msg.ERROR,
			        buttons: Ext.Msg.OK
				 });
			
  			}
  			else{ 
			 resourceTaxInfoFormEdit.getForm().submit({
	                	
	                    url: '../upload.do?resID='+resID,
	                    waitMsg: 'Uploading your Files...',
	                   
	                    success: function(fp, o){
	                        msg('Success', 'Your file(s) uploaded successfully');
	                       
	                    }
                 }
	              
               );
  			}
		}

		});
		

	  var resourceSeniorityComboEdit = new Ext.form.ComboBox({            	
		    store: resourceSeniorityDS,
		    fieldLabel: 'Seniority <html><font color=red> *</font></html>',
		    displayField:'name',
		    valueField: 'id',
		    selectOnFocus: true,
		    mode: 'local',
		    typeAhead: true,
		    editable: false,
		    triggerAction: 'all',
	
		    emptyText:'Select a Seniority...'
	  });
	
	
	  var highestDegreeradioEdit = new Ext.form.RadioGroup({
      	
      	fieldLabel: 'Highest Degree <html><font color=red> *</font></html>',
      	columns: [100, 100],
        vertical: true,
              items: [
                  {boxLabel: 'B.Sc.', name: 'rb-auto', inputValue: 1},
                  {boxLabel: 'M.Sc.', name: 'rb-auto', inputValue: 2},
                  {boxLabel: 'Ph.D.', name: 'rb-auto', inputValue: 3},
                  {boxLabel: 'MBA', name: 'rb-auto', inputValue: 4},
                  {boxLabel: 'MPA', name: 'rb-auto', inputValue: 5},
                  {boxLabel: 'Diploma', name: 'rb-auto', inputValue: 6}
              ]
      	
      	
      });
      
      
function gethighestDegreeradioEditValue() {
  var v = 0;

  highestDegreeradioEdit.items.each(function(item) {
    v = item.getRawValue();
    
//    if(item.getValue()){
//      v = item.getRawValue();
//      
//      }
//      else
//      v = 0;
    
    return !item.getValue();
  });

  return v;
}
      
 
 function sethighestDegreeradioEditValue(v1) {
	    var v2;
	
	    highestDegreeradioEdit.items.each(function(item) {
	      v2 = item.getRawValue();
	     
	      if(v1==v2)
	      item.setValue(true);
	      return !(v1==v2);
	    });
	
	  //  return v;
	  }
	  
	  
	  
	
		
		var idNumberFieldEdit = new Ext.form.NumberField({
		fieldLabel: 'ID Number<html><font color=red> *</font></html>',
		minLength:14
		
		});
		
		idNumberFieldEdit.on('change',function(){
			
			Ext.MessageBox.wait('Check ID Number Uniqueness...');
			Ext.Ajax.request({   			
	        			url: '../ResourcesAction.do',	
	        			params: {
	          				task: "checkIdNumberValidity",
	          				idNumber: idNumberFieldEdit.getValue()
	          				 
	        			},
	        			method:'POST', 
	        			success: function(response){
	        				var result=response.responseText;
	        				//console.log(result);
	        				if(result == 'success')
								msg('Success', 'ID Number is Valid');
					else if(result == 'fail'){
					msg('Fail', 'This ID Number is exist in the system');
	          				idNumberFieldEdit.reset();
					}
	                       
	                    },
	        			failure: function(response){
	          				msg('Fail', 'This ID Number is exist in the system');
	          				idNumberFieldEdit.reset();
	        			}                      
	      			});
			
			
		});
		
		var taxIDNumberFieldEdit = new Ext.form.NumberField({
		fieldLabel: 'Tax ID Number'
		});
		
		var taxDistrictFieldEdit = new Ext.form.NumberField({
		fieldLabel: 'Tax District'
		});
		
		var taxPaymentPercentFieldEdit = new Ext.form.NumberField({
		fieldLabel: 'Tax Deduction Percent',
    	maxValue:100,
    	minValue:0 
		});
		
		var taxFileNumberFieldEdit = new Ext.form.NumberField({
		fieldLabel: 'Tax File Number'
		});
		
		var cityEdit = new Ext.form.TextField({
          fieldLabel: 'City',
          name: 'city'
      });
      
      var addressEdit = new Ext.form.TextArea({
          fieldLabel: 'Address',
          name: 'address',
          grow: false,
          height : 40,
          preventScrollbars:true
      });
		
		var FirstEmailEdit = new Ext.form.TextField({
          fieldLabel: 'First E-Mail',
          vtype:'email'
      });
      
      var SecEmailEdit = new Ext.form.TextField({
          fieldLabel: 'Second E-Mail',
          vtype:'email'
      });
      

      var FirstMobileEdit = new Ext.form.TextField({
          fieldLabel: 'First Mobile',
          maskRe: /([0-9\s]+)$/
      })
      
      var SecMobileEdit = new Ext.form.TextField({
          fieldLabel: 'Second Mobile',
          maskRe: /([0-9\s]+)$/
      })
      
      var faxEdit = new Ext.form.TextField({
          fieldLabel: 'Fax',
          maskRe: /([0-9\s]+)$/
      })
      
      var FirstLandTelEdit = new Ext.form.TextField({
          fieldLabel: 'First Land Tel.',
          maskRe: /([0-9\s]+)$/
      })
      
      
      var SecLandTelEdit = new Ext.form.TextField({
          fieldLabel: 'Second Land Tel.',
          maskRe: /([0-9\s]+)$/
      })
      
      
      
      var resourceNameEdit = new Ext.form.TextField({
          fieldLabel: 'Name <html><font color=red> *</font></html>',
          name: 'Name',
          allowBlank:false,
          maskRe: /([a-zA-Z0-9\s]+)$/
      });

      var lastNameEdit = new Ext.form.TextField({
          fieldLabel: 'Last Name <html><font color=red> *</font></html>',
          allowBlank:false,
          maskRe: /([a-zA-Z0-9\s]+)$/
      });

      var abbrevEdit = new Ext.form.TextField({
          fieldLabel: 'Abbreviation <html><font color=red> *</font></html>',
          maxLength:4,
          maskRe: /([a-zA-Z0-9\s]+)$/
      });


		var contractedEdit = new Ext.form.ComboBox({            	
		    store: contractedDS,
		    fieldLabel: 'Contracted',
		    displayField:'name',
		    valueField: 'id',
		    selectOnFocus: true,
		    mode: 'local',
		    typeAhead: true,
		    editable: false,
		    triggerAction: 'all',
		    value:1,
         listeners: {
         select: function (combo, record, index) {
    	    this.selectedIndex = index;

			if(index == 0)
			targetedDaysEdit.disable();
			else
			targetedDaysEdit.enable();
         }}
	  });

		var targetedDaysEdit = new Ext.form.NumberField({
            fieldLabel: 'Targeted Days',
            disabled:true
        });
  


	  var nationalityEdit = new Ext.form.ComboBox({            	
		    store: nationalityDS,
		    fieldLabel: 'Nationality Country',
		    displayField:'name',
		    valueField: 'id',
		    selectOnFocus: true,
		    mode: 'local',
		    typeAhead: true,
		    editable: false,
		    triggerAction: 'all',
	
		    emptyText:'Select a Nationality...',
       listeners: {
       select: function (combo, record, index) {
  	    this.selectedIndex = index;

			if(index == 0)
			fnEdit.disable();
			else
			fnEdit.enable();
       }}
	  });
      
      var fnEdit = new Ext.form.TextField({
          fieldLabel: 'Foreign Country'
      });
      fnEdit.disable();
      var birthDateEdit = new Ext.form.DateField({
      	fieldLabel: 'Birth Date <html><font color=red> *</font></html>',
            format: 'd-M-Y'
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
		  
	        
		var photoLink = new Ext.form.Label({html:'<a href="'+photoPath+'" target="_blank">Open/Download Photo</a>'});      
		var companyCVLink = new Ext.form.Label({html:'<a href="'+companyCVPath+'" target="_blank">Resource Details</a>'});      
		var CVLink = new Ext.form.Label({html:'<a href="'+cvPath+'" target="_blank">Resource Details</a>'});      
		var briefLink = new Ext.form.Label({html:'<a href="'+briefPath+'" target="_blank">Resource Details</a>'});      
		var idPhotoLink = new Ext.form.Label({html:'<a href="'+idphotoPath+'" target="_blank">Resource Details</a>'});      
 
 /*-----------------------------add resource  form--------------------------------------*/
 var basicInfoForm = new Ext.form.FormPanel({
        	
          
//            labelWidth: 150,
            fileUpload: true,
//            autoWidth: true,
            frame: true,
         
            title:'Basic Information',
//            defaults: {width: 500},	// Default config options for child items
//          // layout:'form',
//            height: 270,
//            bodyStyle: Ext.isIE ? 'padding:0 0 5px 15px;' : 'padding:10px 15px;',
//           // border: true,
//            style: {
//                "margin-left": "10px", // when you add custom margin in IE 6...
//                "margin-right": Ext.isIE6 ? (Ext.isStrict ? "-10px" : "-13px") : "0"  // you have to adjust for it somewhere else
//            },
              items:[new Ext.form.FieldSet({
              //  title: 'Photo',
                labelWidth: 140,
                autoHeight: true,
             //   autoWidth: true,
                border: true,
          defaults: {width: 200},
                items: [resourceName,
              lastName,abbrev,
              genderCombo,nationality,
              fn,birthDate,contracted,targetedDays]}),
              new Ext.form.FieldSet({
              //  title: 'Photo',
                labelWidth: 100,
                autoHeight: true,
             //   autoWidth: true,
                border: true,
           
                items: [uploadPhotoField,uploadPhotoButton]
            })
              
             ]  });
 
 
 
 var contactInfoForm = new Ext.form.FormPanel({
//	 		 labelWidth: 150,
            frame: true,
            title:'Contact Information',
//            autoWidth: true,// Default config options for child items
//            defaults: {width: 500},
//            
//            height: 270,
//             bodyStyle: Ext.isIE ? 'padding:0 0 5px 15px;' : 'padding:10px 15px;',
//           
//            style: {
//                "margin-left": "10px", // when you add custom margin in IE 6...
//                "margin-right": Ext.isIE6 ? (Ext.isStrict ? "-10px" : "-13px") : "0"  // you have to adjust for it somewhere else
//            },
              items:[new Ext.form.FieldSet({
              //  title: 'Photo',
                labelWidth: 140,
                autoHeight: true,
             //   autoWidth: true,
                border: true,
          defaults: {width: 200},
                items: [FirstLandTel,
              SecLandTel,
              fax,FirstMobile,
              SecMobile,
              FirstEmail,
              SecEmail,
              countryCombo,
              city,address]})
              
              ] });
 

 
 var resourceQualifictionsForm = new Ext.form.FormPanel({
   
//             labelWidth: 150,
//            autoWidth: true,
            frame: true,
            
            
            fileUpload: true,
            title:'Resource Profile & Qualifications',
//            defaults: {width: 500},	// Default config options for child items
//            defaultType: 'textfield',
//           height: 270,
//             bodyStyle: Ext.isIE ? 'padding:0 0 5px 15px;' : 'padding:10px 15px;',
//            border: true,
//            style: {
//                "margin-left": "10px", // when you add custom margin in IE 6...
//                "margin-right": Ext.isIE6 ? (Ext.isStrict ? "-10px" : "-13px") : "0"  // you have to adjust for it somewhere else
//            },
            items:[new Ext.form.FieldSet({
              //  title: 'Photo',
                labelWidth: 140,
                autoHeight: true,
             //   autoWidth: true,
                border: true,
          
                items: [resourceTypeCombo,
                
            
            highestDegreeradio,
            resourceSeniorityCombo]}),
                new Ext.form.FieldSet({
              //  title: 'Photo',
              labelWidth: 100,
                autoHeight: true,
            //    autoWidth: true,
                border: true,
          
                items: [companyResumeField
		                   ]
            }), new Ext.form.FieldSet({
              //  title: 'Photo',
              labelWidth: 100,
                autoHeight: true,
            //    autoWidth: true,
                border: true,
          
                items: [ownResumeField]}), new Ext.form.FieldSet({
              //  title: 'Photo',
              labelWidth: 100,
                autoHeight: true,
            //    autoWidth: true,
                border: true,
           
                items: [uploadBriefField]}),new Ext.form.FieldSet({
              //  title: 'Photo',
                labelWidth: 140,
                autoHeight: true,
             //   autoWidth: true,
                border: false,
          
                items: [uploadFilesButton]})]});
 
 var resourceTaxInfoForm = new Ext.form.FormPanel({
    
//            labelWidth: 150,
            fileUpload: true,
//            autoWidth: true,
            frame: true,
         
            title:'Resource Tax Information',
//            defaults: {width: 500},	// Default config options for child items
//          // layout:'form',
//            height: 270,
//            bodyStyle: Ext.isIE ? 'padding:0 0 5px 15px;' : 'padding:10px 15px;',
//           // border: true,
//            style: {
//                "margin-left": "10px", // when you add custom margin in IE 6...
//                "margin-right": Ext.isIE6 ? (Ext.isStrict ? "-10px" : "-13px") : "0"  // you have to adjust for it somewhere else
//            },
              items:[new Ext.form.FieldSet({
              //  title: 'Photo',
                labelWidth: 140,
                autoHeight: true,
             defaults: {width: 200},
                border: true,
          
                items: [taxIDNumberField,
           taxDistrictField,
           taxPaymentPercentField,
           taxFileNumberField,
           idNumberField]}),
              new Ext.form.FieldSet({
              //  title: 'Photo',
              labelWidth: 100,
                autoHeight: true,
              //  autoWidth: true,
                border: true,
           
                items: [idPhotoCopyField,uploadIdPhotoButton
		                   ]
            })
              
             ]});
 /*-----------------------------edit resource  form--------------------------------------*/

// resourceNameEdit.setPagePosition(70,30);
// lastNameEdit.setPagePosition(70,50);
// abbrevEdit.setPagePosition(70,70);
// genderComboEdit.setPagePosition(70,90);
// nationalityEdit.setPagePosition(70,110);
// fnEdit.setPagePosition(70,130);
// birthDateEdit.setPagePosition(70,150);
 
 
 
 var basicInfoFormEdit = new Ext.form.FormPanel({
        	
            fileUpload: true,
           
            frame: true,
         
            title:'Basic Information',
           
              items:[new Ext.form.FieldSet({
              //  title: 'Photo',
                labelWidth: 140,
                autoHeight: true,
             //   autoWidth: true,
                border: true,
          		defaults: {width: 250},
                items: [resourceNameEdit,
              lastNameEdit,abbrevEdit,
              genderComboEdit,nationalityEdit,
              fnEdit,birthDateEdit,contractedEdit,targetedDaysEdit]}),
              new Ext.form.FieldSet({
              //  title: 'Photo',
                labelWidth: 100,
                autoHeight: true,
             //   autoWidth: true,
                border: true,
           //   defaults: {width: 150},
                layout:'column',
           //    width: 350,
              //  defaultType: 'textfield',
                items: [
                {width:350,layout: 'form',
                items: [uploadPhotoFieldEdit,uploadPhotoButtonEdit]},
                {width:150,layout: 'form',
                items: [photoLink]}
		                   ]
            })
              
             ]
        });
 
 
 
 var contactInfoFormEdit = new Ext.form.FormPanel({

           
            frame: true,
            title:'Contact Information',
            
              items:[new Ext.form.FieldSet({
              //  title: 'Photo',
                labelWidth: 140,
                autoHeight: true,
             //   autoWidth: true,
                border: true,
          		defaults: {width: 250},
                items: [FirstLandTelEdit,
              SecLandTelEdit,
              faxEdit,FirstMobileEdit,
              SecMobileEdit,
              FirstEmailEdit,
              SecEmailEdit,
              countryComboEdit,
              cityEdit,addressEdit]})
              
              ]
       });
 

 
 var resourceQualifictionsFormEdit = new Ext.form.FormPanel({
   
           
            frame: true,
            
            
            fileUpload: true,
            title:'Resource Profile & Qualifications',
            
            items:[new Ext.form.FieldSet({
              //  title: 'Photo',
                labelWidth: 140,
                autoHeight: true,
             	defaults: {width: 250},
                border: true,
          
                items: [resourceTypeComboEdit,
                
            
            highestDegreeradioEdit,
            resourceSeniorityComboEdit]}),
                new Ext.form.FieldSet({
              //  title: 'Photo',
              labelWidth: 100,
                autoHeight: true,
            //    autoWidth: true,
                border: true,
           //   defaults: {width: 150},
                layout:'column',
           //    width: 350,
              //  defaultType: 'textfield',
                items: [{width:350,layout: 'form',
                items: [companyResumeFieldEdit]},{width:150,layout: 'form',
                items: [companyCVLink]}
		                   ]
            }), new Ext.form.FieldSet({
              //  title: 'Photo',
              labelWidth: 100,
                autoHeight: true,
            //    autoWidth: true,
                border: true,
           //   defaults: {width: 150},
                layout:'column',
           //    width: 350,
              //  defaultType: 'textfield',
                items: [{width:350,layout: 'form',
                items: [ownResumeFieldEdit]},{width:150,layout: 'form',
                items: [CVLink]}]}), new Ext.form.FieldSet({
              //  title: 'Photo',
              labelWidth: 100,
                autoHeight: true,
            //    autoWidth: true,
                border: true,
           //   defaults: {width: 150},
                layout:'column',
           //    width: 350,
              //  defaultType: 'textfield',
                items: [{width:350,layout: 'form',
                items: [uploadBriefFieldEdit]},{width:150,layout: 'form',
                items: [briefLink]}]}),new Ext.form.FieldSet({
              //  title: 'Photo',
                labelWidth: 140,
                autoHeight: true,
             //   autoWidth: true,
                border: false,
          
                items: [uploadFilesButtonEdit]})]});
 
 var resourceTaxInfoFormEdit = new Ext.form.FormPanel({
    
   
            fileUpload: true,
          
            frame: true,
         
            title:'Resource Tax Information',
           
              items:[new Ext.form.FieldSet({
              //  title: 'Photo',
                labelWidth: 140,
                autoHeight: true,
             defaults: {width: 250},
                border: true,
          
                items: [taxIDNumberFieldEdit,
           taxDistrictFieldEdit,
           taxPaymentPercentFieldEdit,
           taxFileNumberFieldEdit,
           idNumberFieldEdit]}),
              new Ext.form.FieldSet({
              //  title: 'Photo',
              labelWidth: 100,
                autoHeight: true,
              //  autoWidth: true,
                border: true,
           //   defaults: {width: 150},
              layout:'column',
                
//                layout:'table',
//                layoutConfig: {
//			        // The total column count must be specified here
//			        columns: 3
//			    },
           //    width: 350,
              //  defaultType: 'textfield',
                items: [
                {
			    	layout:'form',
			        items: [idPhotoCopyFieldEdit,uploadIdPhotoButtonEdit],
			        width:350
			    },{
			       layout:'form',
			        items: [idPhotoLink],
			        width:150
			
			    }
//                {columnWidth:0.7,layout: 'form',
//                items: [idPhotoCopyFieldEdit,uploadIdPhotoButtonEdit]},{columnWidth:0.3,layout: 'form',
//                items: [idPhotoLink]}
		                   ]
            })
              
             ]
    
//            labelWidth: 150,
//   			autoWidth: true,
//   			frame: true,
//   			fileUpload: true,
//   			
//            title:'Resource Tax Information',
//            defaults: {width: 200},	// Default config options for child items
//            defaultType: 'textfield',
//            height: 240,
//             bodyStyle: Ext.isIE ? 'padding:0 0 5px 15px;' : 'padding:10px 15px;',
//         //   border: true,
//            style: {
//                "margin-left": "10px", // when you add custom margin in IE 6...
//                "margin-right": Ext.isIE6 ? (Ext.isStrict ? "-10px" : "-13px") : "0"  // you have to adjust for it somewhere else
//            },
//           items:[taxIDNumberFieldEdit,
//           taxDistrictFieldEdit,
//           taxPaymentPercentFieldEdit,
//           taxFileNumberFieldEdit,
//           idNumberFieldEdit,
//              new Ext.form.FieldSet({
//              //  title: 'Photo',
//                labelWidth: 100,
//                autoHeight: true,
//                autoWidth: true,
//                border: false,
//            //  defaults: {width: 150},
//                layout:'column',
//           //    width: 350,
//              //  defaultType: 'textfield',
//                items: [{columnWidth:0.75,layout: 'form',
//                items: [idPhotoCopyFieldEdit,uploadIdPhotoButtonEdit]},{columnWidth:0.25,layout: 'form',
//                items: [idPhotoLink]}
//		                   ]
//            })
//           ]
           
           
           });
 
 
        
 /***************************************resource tabs***********************************************/


var tabs1=  new Ext.TabPanel({
                    region:'center',
                 //   frame: true,
                    deferredRender:false,
                    activeTab:0,
                 anchor:'100% 100%'

				// tabs
				,defaults:{
					 layout:'form'
					,labelWidth:80
					,defaultType:'formpanel'
					,bodyStyle:'padding:5px'

					// as we use deferredRender:false we mustn't
					// render tabs into display:none containers
					,hideMode:'offsets'
				},
                    height:460,

                    items:[basicInfoForm,contactInfoForm,resourceQualifictionsForm,resourceTaxInfoForm]
                    });




var tabs2=  new Ext.TabPanel({
    region:'center',
 
    deferredRender:false,
   // activeTab:0,
	anchor:'100% 100%'
	,activeTab:3
	// tabs
	,defaults:{
		 layout:'form'
		,labelWidth:80
		,defaultType:'formpanel'
		,bodyStyle:'padding:5px'

		// as we use deferredRender:false we mustn't
		// render tabs into display:none containers
		,hideMode:'offsets'
	},
    height:460,


    items:[basicInfoFormEdit,contactInfoFormEdit,resourceQualifictionsFormEdit,resourceTaxInfoFormEdit],activeTab:2});

var win = new Ext.Window({
		 id:'tabsinform-win'
		,width:600
		,minWidth:240
		,height:530
		,buttonAlign:'center'
		,minHeight:160
		,layout:'fit'
        ,title:'Add New Resource'
		,closable:false
		,plain: true
		// form
		,items:[
		tabs1

			]
			, buttons:[{text: 'Save',
                        iconCls:'save',
                        // Function that fires when user clicks the button 
                        handler:function(){
                        	
                        	if(resourceName.getValue() == '' || lastName.getValue() == '' || 
                        	abbrev.getValue() == '' || genderCombo.getValue() == '' || 
                        	idNumberField.getValue() == '' || resourceTypeCombo.getValue() == '' || 
                        	resourceSeniorityCombo.getValue() == '' || birthDate.getValue() == '' || 
                        	gethighestDegreeradioValue() == 0 || (contracted.getValue() == 2 && targetedDays.getValue() == ''))
                        	{
                        		var errorMsg = 'You Must Enter The Resource';
                        		if(resourceName.getValue() == '')
                        		errorMsg = errorMsg+' Name';
                        		
                        		else if(lastName.getValue() == '')
                        		errorMsg = errorMsg+' Last Name';
                        		
                        		else if(abbrev.getValue() == '')
                        		errorMsg = errorMsg+' Abbreviation';
                        		
                        		else if(genderCombo.getValue() == '')
                        		errorMsg = errorMsg+' Gender';
                        		
                        		else if(birthDate.getValue() == '')
                        		errorMsg = errorMsg+' Birth Date';
                        		
                        		
                        		else if(contracted.getValue() == 2 && targetedDays.getValue() == '')
                        		errorMsg = errorMsg+' Targeted Days';
                        		
                        		
                        		else if(resourceTypeCombo.getValue() == ''){
                        		errorMsg = errorMsg+' Type';
                        		tabs1.activate(resourceQualifictionsForm);
                        		}
                        		
                        		else if(gethighestDegreeradioValue() == 0){
                        		errorMsg = errorMsg+' Highest Degree';
                        		tabs1.activate(resourceQualifictionsForm);
                        		}
                        		
                        		else if(resourceSeniorityCombo.getValue() == ''){
                        		errorMsg = errorMsg+' Seniority';
                        		tabs1.activate(resourceQualifictionsForm);
                        		}
                        		                        		
                        		else if(idNumberField.getValue() == ''){
                        		errorMsg = errorMsg+' ID Number';
                        		tabs1.activate(resourceTaxInfoForm);
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
	        	        			url: '../ResourcesAction.do',	
	        	        			
	        	        			params: {
	        	          				task: "addNewResource",
	        	          				firstname: resourceName.getValue(),
	        	          				lastname: lastName.getValue(),
	        	          				abbreviations: abbrev.getValue(),
	        	          				gender: genderCombo.getValue(),
	        	          				resNationality: nationality.getValue(),
	        	          				foreignCountry: fn.getValue(),
	        	          				birthdate: birthDate.getValue().format('Y-m-d'),
	        	          				contracted:contracted.getValue(),
	        	          				targeteddays:targetedDays.getValue(),
	        	          				
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
	        	          				cvupdatedate:(new Date()).format('Y-m-d'),
	        	          				brief: uploadBriefField.getValue(),
	        	          				idphoto: idPhotoCopyField.getValue()
	        	          				 
	        	        			},
	        	        			method:'POST', 
	        	        			success: function(response){
	        	        				
	//        	        			var redirect = '../JSP/resourceslist.jsp'; 
	//        			 			window.location = redirect;
	        	                       ds.reload();
	        	        				win.hide();
	        	        			},
	        	        			failure: function(response){
	        	          				var result=response.responseText;
	        	          				Ext.MessageBox.alert('error',result+'  could not connect to the database. retry later');          
	        	        			}                      
        	      			});
                        	}
        	                   
                    }},{text: 'Cancel',  
                        // Function that fires when user clicks the button 
                        handler:function(){
//                        	var redirect = '../JSP/resourceslist.jsp'; 
//        			 		window.location = redirect;
                    	win.hide();
                        	
                        }}]
	}); // eo new Ext.Window


/********************************************************************************************/
var col = new Ext.data.Store({
       // load using HTTP
      proxy: dataProxy,
       baseParams:{task: "colors"},   
      // the return will be XML, so lets set up a reader
      reader: new Ext.data.XmlReader({
       
       // totalRecords: "results", // The element which contains the total dataset size (optional)
   		record: "Course"},           // The repeated element which contains row information
   		[{name: 'courseColor', type: 'string'}]
        
        )
      });
    col.load();



function addNewResource(){
	
	basicInfoForm.getForm().reset();
	contactInfoForm.getForm().reset();
	resourceQualifictionsForm.getForm().reset();
	resourceTaxInfoForm.getForm().reset();
	
//	uploadIdPhotoButton.disable();
//	uploadFilesButton.disable();
//	uploadPhotoButton.disable();
	
	idNumberField.reset();
	
	tabs1.activate(basicInfoForm);
	
	win.show();
	
}

/////////////////////////////////////////////////////////////////////////////////////////


var resID = 0;


var edit_ds = new Ext.data.Store({
   // load using HTTP
  proxy: dataProxy,
  baseParams:{task:'retreiveResource'}, 
  // the return will be XML, so lets set up a reader
  reader: new Ext.data.XmlReader({
    totalRecords: "results", // The element which contains the total dataset size (optional)
		record: "Resource",           // The repeated element which contains row information
		id: "resourceId"
    },Resource
    )
  });

var edit_win = new Ext.Window({
		 id:'tabsinform-edit_win'
		,width:600
		,minWidth:240
		,height:530
		,buttonAlign:'center'
		,minHeight:160
		,layout:'fit'
        ,title:'Edit Resource'
		,closable:false

		// form
		,items:[
		tabs2
	
			]
			, buttons:[{text: 'Save',
                        iconCls:'save',
                        // Function that fires when user clicks the button 
                        handler:function(){
                        	
                        	if(resourceNameEdit.getValue() == '' || lastNameEdit.getValue() == '' || 
                        	abbrevEdit.getValue() == '' || genderComboEdit.getValue() == '' || 
                        	idNumberFieldEdit.getValue() == '' || resourceTypeComboEdit.getValue() == '' || 
                        	resourceSeniorityComboEdit.getValue() == '' || birthDateEdit.getValue() == '' || 
                        	gethighestDegreeradioEditValue() == 0 || (contractedEdit.getValue() == 2 && targetedDaysEdit.getValue() == ''))
                        	{
                        		var errorMsg = 'You Must Enter The Resource';
                        		if(resourceNameEdit.getValue() == '')
                        		errorMsg = errorMsg+' Name';
                        		
                        		else if(lastNameEdit.getValue() == '')
                        		errorMsg = errorMsg+' Last Name';
                        		
                        		else if(abbrevEdit.getValue() == '')
                        		errorMsg = errorMsg+' Abbreviation';
                        		
                        		else if(genderComboEdit.getValue() == '')
                        		errorMsg = errorMsg+' Gender';
                        		
                        		else if(birthDateEdit.getValue() == '')
                        		errorMsg = errorMsg+' Birth Date';
                        		
                        		else if(contractedEdit.getValue() == 2 && targetedDaysEdit.getValue() == '')
                        		errorMsg = errorMsg+' Targeted Days';
                        		
                        		else if(resourceTypeComboEdit.getValue() == ''){
                        		errorMsg = errorMsg+' Type';
                        		tabs2.activate(resourceQualifictionsFormEdit);
                        		}
                        		
                        		else if(gethighestDegreeradioEditValue() == 0){
                        		errorMsg = errorMsg+' Highest Degree';
                        		tabs2.activate(resourceQualifictionsFormEdit);
                        		}
                        		
                        		else if(resourceSeniorityComboEdit.getValue() == ''){
                        		errorMsg = errorMsg+' Seniority';
                        		tabs2.activate(resourceQualifictionsFormEdit);
                        		}
                        		                        		                        		
                        		else if(idNumberFieldEdit.getValue() == ''){
                        		errorMsg = errorMsg+' ID Number';
                        		tabs2.activate(resourceTaxInfoFormEdit);
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
    	        			url: '../ResourcesAction.do',	
    	        			
    	        			params: {
    	          				task: "editResource",
    	          				resourceId: resID,
    	          				firstname: resourceNameEdit.getValue(),
    	          				lastname: lastNameEdit.getValue(),
    	          				abbreviations: abbrevEdit.getValue(),
    	          				gender: genderComboEdit.getValue(),
    	          				resNationality: nationalityEdit.getValue(),
    	          				foreignCountry: fnEdit.getValue(),
    	          				birthdate: birthDateEdit.getValue().format('Y-m-d'),
    	          				contracted:contractedEdit.getValue(),
    	          				targeteddays:targetedDaysEdit.getValue(),
    	          				
    	          				firstLandTel: FirstLandTelEdit.getValue(),
    	          				secLandTel: SecLandTelEdit.getValue(),
    	          				fax: faxEdit.getValue(),
    	          				firstMobile: FirstMobileEdit.getValue(),
    	          				secMobile: SecMobileEdit.getValue(),
    	          				firstEmail: FirstEmailEdit.getValue(),
    	          				secEmail: SecEmailEdit.getValue(),
    	          				resAddress: addressEdit.getValue(),
    	          				resCity: cityEdit.getValue(),
    	          				country: countryComboEdit.getValue(),

    	          				resType: resourceTypeComboEdit.getValue(),
    	          				highestDegree: gethighestDegreeradioEditValue(),
    	          				seniority: resourceSeniorityComboEdit.getValue(),
    	          				
    	          				idNumber: idNumberFieldEdit.getValue(),
    	          				taxId: taxIDNumberFieldEdit.getValue(),
    	          				taxDistrict: taxDistrictFieldEdit.getValue(),
    	          				taxPayment: taxPaymentPercentFieldEdit.getValue(),
    	          				taxFileNum: taxFileNumberFieldEdit.getValue(),
    	          				
    	          				photo: uploadPhotoFieldEdit.getValue(),
    	          				companycv: companyResumeFieldEdit.getValue(),
    	          				owncv: ownResumeFieldEdit.getValue(),
    	          				cvupdatedate:(new Date()).format('Y-m-d'),
    	          				brief: uploadBriefFieldEdit.getValue(),
    	          				idphoto: idPhotoCopyFieldEdit.getValue()
    	          				 
    	        			},
    	        			method:'POST', 
    	        			success: function(response){
    	        				
//    	        			var redirect = '../JSP/resourceslist.jsp'; 
//    			 			window.location = redirect;
    	        				ds.reload();
    	                    edit_win.hide();   
    	
    	        			},
    	        			failure: function(response){
    	          				var result=response.responseText;
    	          				Ext.MessageBox.alert('error',result+'  could not connect to the database. retry later');          
    	        			}                      
    	      			});
                        	}
        	                   
                    }},{text: 'Cancel',  
                        // Function that fires when user clicks the button 
                        handler:function(){
//                        	var redirect = '../JSP/resourceslist.jsp'; 
//        			 		window.location = redirect;
                    	edit_win.hide();
                        	
                        }}]
	}); // eo new Ext.Window

edit_ds.on('load',function(){ 
	
	

var resourceRec = edit_ds.getAt(0);

resID = resourceRec.get('resourceId');

resourceNameEdit.setValue(resourceRec.get('resourceName'));
lastNameEdit.setValue(resourceRec.get('resourceLastName'));


FirstMobileEdit.setValue(resourceRec.get('firstmobilNum'));
SecMobileEdit.setValue(resourceRec.get('secmobilNum'));
FirstLandTelEdit.setValue(resourceRec.get('resFirstTel'));
SecLandTelEdit.setValue(resourceRec.get('resSecTel'));


FirstEmailEdit.setValue(resourceRec.get('resFirstEmail'));
SecEmailEdit.setValue(resourceRec.get('resSecEmail'));
faxEdit.setValue(resourceRec.get('resFax'));
abbrevEdit.setValue(resourceRec.get('resourceAbb'));
resourceTypeComboEdit.setValue(resourceRec.get('resourceType'));

resourceSeniorityComboEdit.setValue(resourceRec.get('seniority'));
sethighestDegreeradioEditValue(resourceRec.get('resourceHiegherDegree'));

  //console.log("resNationality === "+resourceRec.get('resNationality'));


if(resourceRec.get('contracted') == 'Yes'){
	contractedEdit.setValue(2);
targetedDaysEdit.enable();
targetedDaysEdit.setValue(resourceRec.get('targetedDays'));
}
else{
targetedDaysEdit.disable();
contractedEdit.setValue(1);
}
nationalityEdit.setValue(resourceRec.get('resNationality'));
if(resourceRec.get('resNationality') == 2 || resourceRec.get('resNationality') == 3){
fnEdit.enable();
fnEdit.setValue(resourceRec.get('foreignCountry'));
}
else
fnEdit.disable();
birthDateEdit.setValue(resourceRec.get('birthdate'));
addressEdit.setValue(resourceRec.get('resAddress'));
cityEdit.setValue(resourceRec.get('resCity'));
countryComboEdit.setValue(resourceRec.get('country'));
idNumberFieldEdit.setValue(resourceRec.get('idNumber'));
taxIDNumberFieldEdit.setValue(resourceRec.get('taxId'));
taxPaymentPercentFieldEdit.setValue(resourceRec.get('taxPayment'));
taxDistrictFieldEdit.setValue(resourceRec.get('taxDestrict'));
taxFileNumberFieldEdit.setValue(resourceRec.get('taxFileNum'));

genderComboEdit.setValue(resourceRec.get('gender'));


if(resourceRec.get('resourcePhotoName') == '../images/no_image.jpg')
	photoLink.setVisible(false);
else{
	photoLink.setVisible(true);
	photoPath=resourceRec.get('resourcePhotoName');

photoLink.setText('<a href="'+photoPath+'" target="_blank">Open/Download Photo</a>',false);





}
if(resourceRec.get('companyCVLink') == '')
	companyCVLink.setVisible(false);
else{
	companyCVLink.setVisible(true);
	companyCVPath=resourceRec.get('companyCVLink');
companyCVLink.setText('<a href="'+companyCVPath+'" target="_blank">Open/Download Company Format CV</a>',false);
}
if(resourceRec.get('cvLink') == '')
	CVLink.setVisible(false);
else{
	CVLink.setVisible(true);
	cvPath=resourceRec.get('cvLink');
CVLink.setText('<a href="'+cvPath+'" target="_blank">Open/Download CV</a>',false);
}
if(resourceRec.get('briefLink') == '')
	briefLink.setVisible(false);
else{
	briefLink.setVisible(true);
	briefPath=resourceRec.get('briefLink');
briefLink.setText('<a href="'+briefPath+'" target="_blank">Open/Download Brief</a>',false);
}
if(resourceRec.get('idPhotoLink') == '')
	idPhotoLink.setVisible(false);
else{
	idPhotoLink.setVisible(true);
	idphotoPath=resourceRec.get('idPhotoLink');
idPhotoLink.setText('<a href="'+idphotoPath+'" target="_blank">Open/Download ID Photo</a>',false);
}
});



/****************************************************************************************/

//function resetResources(){
//
//
//	Ext.Ajax.request({   
//        waitMsg: 'Please wait...',
//        url: '../ResourcesAction.do',
//        params: {
//          task: "RESETRESOURCES"
//        },
//        method:'POST', 
//        success: function(response){        
//		searchField.reset();
//		CourseNameCombo.reset();
//		ds.load();
//        },
//        failure: function(response){
//          var result=response.responseText;
//          Ext.MessageBox.alert('error',result+'  could not connect to the database. retry later');          
//        }                      
//      });
//
//
//
//
//};
   ds.load({params:{start: 0, limit: 15}});
//ds.on('load',function(){ 
//})

  
});
      