/*
 * Ext JS Library 2.1 Copyright(c) 2006-2008, Ext JS, LLC. licensing@extjs.com
 * 
 * http://extjs.com/license
 */

Ext.apply(Ext.form.VTypes, {
			daterange : function(val, field) {
				var date = field.parseDate(val);

				// We need to force the picker to update values to recaluate the
				// disabled dates display
				var dispUpd = function(picker) {
					var ad = picker.activeDate;
					picker.activeDate = null;
					picker.update(ad);
				};

				if (field.ValidFromField) {
					var sd = Ext.getCmp(field.ValidFromField);
					sd.maxValue = date;
					if (sd.menu && sd.menu.picker) {
						sd.menu.picker.maxDate = date;
						dispUpd(sd.menu.picker);
					}
				} else if (field.ValidToField) {
					var ed = Ext.getCmp(field.ValidToField);
					ed.minValue = date;
					if (ed.menu && ed.menu.picker) {
						ed.menu.picker.minDate = date;
						dispUpd(ed.menu.picker);
					}
				}
				/*
				 * Always return true since we're only using this vtype to set
				 * the min/max allowed values (these are tested for after the
				 * vtype test)
				 */
				return true;
			}
		});

Ext.onReady(function() {

	Ext.QuickTips.init();
	// turn on validation errors beside the field globally
	Ext.form.Field.prototype.msgTarget = 'side';

	var bd = Ext.getBody();

	dataProxy = new Ext.data.HttpProxy({
				url : '../listDataShows.do',
				method : 'POST',
				headers : {
					'request-type' : 'ajax'
				}
			});

	var Datashowsmaintainance = Ext.data.Record.create([{
				name : 'idDatashowsMaintainance',
				type : 'int'
			}, {
				name : 'datashowsMaintainanceCost',
				type : 'int'
			}, {
				name : 'datashowsMaintainanceDate',
				type : 'boolean'
			}, {
				name : 'datashowsMaintainanceReason',
				type : 'string'
			}

	]);

	var ds = new Ext.data.Store({
				// load using HTTP
				proxy : dataProxy,
				// baseParams:{task: "listHistory"},
				// the return will be XML, so lets set up a reader
				reader : new Ext.data.XmlReader({
							totalRecords : "results", // The element which
														// contains the total
														// dataset size
														// (optional)

							record : "Datashowsmaintainance", // The repeated
																// element which
																// contains row
																// information
							id : "idDatashowsMaintainance"
						}, Datashowsmaintainance)
			});

	// example of custom renderer function
	function italic(value) {
		return '' + value + '';
	}

	// example of custom renderer function
	function change(val) {
		if (val > 0) {
			return '' + val + '';
		} else if (val < 0) {
			return '' + val + '';
		}
		return val;
	}
	// example of custom renderer function
	function pctChange(val) {
		if (val > 0) {
			return '' + val + '%';
		} else if (val < 0) {
			return '' + val + '%';
		}
		return val;
	}

	// the DefaultColumnModel expects this blob to define columns. It can be
	// extended to provide
	// custom or reusable ColumnModels
	var colModel = new Ext.grid.ColumnModel([{
				header : "Cost",
				width : 150,
				sortable : true,
				dataIndex : 'datashowsMaintainanceCost'
			}, {
				header : "Date",
				width : 150,
				sortable : true,
				dataIndex : 'datashowsMaintainanceDate'
			}, {
				header : "Reason",
				width : 150,
				sortable : true,
				dataIndex : 'datashowsMaintainanceReason'
			}

	]);

	ds.on('add', function() {
		ds.reload();
			// myGrid.getView().refresh();
		});

	var myGrid = new Ext.grid.GridPanel({
				ds : ds,
				cm : colModel,
				stripeRows : true,
				height : 235,
				// width:500,
				autoScroll : true,
				title : 'Datashows Maintenance',
				tbar : [new Ext.Toolbar.Button({
							text : 'Add Datashow Maintenance',
							iconCls : 'add',
							handler : displayFormWindow
						}),// new Ext.Toolbar.Button({
				// text: 'Delete Selection',
				// handler: confirmDeleteCourses
				// })
				],
				selModel : new Ext.grid.RowSelectionModel({
							singleSelect : false
						})

			});

	// ///////////////////////////////////////////////////////////////////

	/**
	 * ---------------------------------------Add
	 * form------------------------------------------
	 */
	var CostField = new Ext.form.TextField({
				id : 'datashowsMaintainanceCost',
				fieldLabel : 'Maintenance Cost <html><font color=red> *</font></html>',
				// maxLength: 20,
				width : 220,
				allowBlank : false,
				maskRe : /([0-9\s]+)$/
			});

	var DateField = new Ext.form.DateField({
		fieldLabel : 'Maintenance Date <html><font color=red> *</font></html>',
		format : 'd-M-Y',
		minValue : '06-01-01',
		width : 220,
		// disabledDays: [5, 6],
		id : 'datashowsMaintainanceDate',
		allowBlank : false,
		vtype : 'daterange'
		,
			// requestDateField: 'requestdt'
		});

	var ReasonField = new Ext.form.TextArea({
		fieldLabel : 'Maintenance Reason <html><font color=red> *</font></html>',
		id : 'datashowsMaintainanceReason',
		// maxLength: 20,
		width : 220,
		allowBlank : false,
		maskRe : /([a-zA-Z0-9\s]+)$/
	});

	// ////////////************adding form****************/////////////////
	// var valid='Salary';
	// var flag=true;
	var dates = [];
	var fs = new Ext.FormPanel({
				frame : true,
				// title:'Add Coordinator History',
				// labelAlign: 'right',
				labelWidth : 90,
				width : 340,
				waitMsgTarget : true,
				items : [new Ext.form.FieldSet({
							// title: 'Contact Information',
							autoHeight : true,
							defaultType : 'textfield',
							items : [CostField, DateField, ReasonField]
						})],
				buttons : [{
					text : 'Save',
					formBind : true,
					// Function that fires when user clicks the button
					handler : function() {
						if (CostField.isValid() && DateField.isValid()
								&& ReasonField.isValid()) {
							var record = new Ext.data.Record({
										datashowsMaintainanceCost : CostField
												.getValue(),
										datashowsMaintainanceDate : DateField
												.getValue().format('d-M-Y'),
										datashowsMaintainanceReason : ReasonField
												.getValue()
									});
							ds.add(record);
							dates.push(DateField.getValue().format('Y-m-d'))
							AddTAWindow.hide();
						} else {
							var errorMsg = 'Your Form is not valid!';
							Ext.Msg.show({
										title : 'Error',
										msg : errorMsg,
										minWidth : 200,
										modal : true,
										icon : Ext.Msg.ERROR,
										buttons : Ext.Msg.OK
									});
						}
					}
				}, {
					text : 'Cancel',
					handler : function() {
						AddTAWindow.hide();
					}
				}]

			});
	AddTAWindow = new Ext.Window({
				id : 'AddTAWindow',
				title : 'Adding a Datashow Maintenance',
				closable : false,
				width : 400,
				height : 250,
				plain : true,
				layout : 'fit',
				items : fs
			});

	// ////////////********display form
	// functions********************/////////////////

	// reset the Form before opening it
	function resetCourseForm() {
		CostField.reset();
		DateField.reset();
		ReasonField.reset();

	}

	// check if the form is valid
	function isCourseFormValid() {
		return (ReasonField.isValid() && DateField.isValid() && CostField
				.isValid());
	}

	// display or bring forth the form
	function displayFormWindow() {
		if (!AddTAWindow.isVisible()) {
			resetCourseForm();
			AddTAWindow.show();
		} else {
			AddTAWindow.toFront();
		}

	}

	// ///////////////////////////////////////////////////////////////////

	/*
	 * ================ Simple form =======================
	 */
	bd.createChild({
				tag : 'h2',
				html : ''
			});

	/* ======================== Form Fields========================= */

	var NameField = new Ext.form.TextField({
				fieldLabel : 'Name <html><font color=red> *</font></html>',
				allowBlank : false,
				width : 220,
				id : 'datashowName',
				maskRe : /([a-zA-Z0-9\s]+)$/
			});

	var PriceField = new Ext.form.NumberField({
		fieldLabel : 'Price <html><font color=red> *</font></html>',
		allowBlank : false,
		width : 220,
		id : 'datashowPrice'
		,
			// maskRe: /([a-zA-Z0-9\s]+)$/
		});

	var InfoField = new Ext.form.TextArea({
				id : 'datashowInfo',
				width : 220,
				fieldLabel : 'Information',
				// maxLength: 20,
				// allowNegative: false,
				// allowBlank: false,
				maskRe : /([a-zA-Z0-9\s]+)$/
			});

	var SlavageDateField = new Ext.form.DateField({
		fieldLabel : 'Slavage Date',
		format : 'd-M-Y',
		width : 220,
		minValue : '06-01-01',
		// disabledDays: [5, 6],
		id : 'datashowSalvageDate',
		vtype : 'daterange'
		,
			// requestDateField: 'requestdt'
		});

	var PurchaseDateField = new Ext.form.DateField({
		fieldLabel : 'Purchase Date <html><font color=red> *</font></html>',
		format : 'd-M-Y',
		id : 'datashowPurchaseDate',
		minValue : '06-01-01',
		vtype : 'daterange',
		allowBlank : false,
		width : 220
			// disabledDays: [5, 6]

		});
	function isDatashowFormValid() {// alert(NameField.isValid()+'
									// '+PriceField.isValid()+'
									// '+PurchaseDateField.isValid());
		return (NameField.isValid() && PriceField.isValid() && PurchaseDateField
				.isValid());
	}
	// var ValidField =
	/* ================================================================= */
	var simple = new Ext.FormPanel({
				labelWidth : 150, // label settings here cascade unless
									// overridden
				// url:'../listCProperties',
				frame : true,
				title : 'Add Datashow',
				bodyStyle : 'padding:5px 5px 0',
				// autoScroll:true,
				// width: 600,
				defaults : {
					width : 541
				},
				defaultType : 'textfield',

				items : [new Ext.form.FieldSet({
							autoHeight : true,
							title : "DataShow Details",
							defaultType : 'textfield',
							items : [NameField, PriceField, PurchaseDateField,
									InfoField, myGrid]
						})]

			});
	// ////console.log("ana henaaaa")

	var pan = new Ext.TabPanel({
		region : 'center',
		deferredRender : false,
		activeTab : 0,
		height : 495,
		buttonAlign : 'center',
		/* width:980, */
		renderTo : 'binding-example',
		items : [simple],
		buttons : [{
			text : 'Save',
			formBind : true,
			// Function that fires when user clicks the button
			handler : function() {
				var cost = [];
				// var date=[];
				var reason = [];
				var dd = '3000-01-01';
				for (i = 0; i < ds.getCount(); i++) {
					var HistoryRec = ds.getAt(i);
					cost.push(HistoryRec.get('datashowsMaintainanceCost'));
					// date.push(HistoryRec.get('datashowsMaintainanceDate'));
					reason.push(HistoryRec.get('datashowsMaintainanceReason'));
				}
				if (PurchaseDateField.getValue() != '') {
					dd = PurchaseDateField.getValue().format('Y-m-d');
				}
				if (NameField.isValid() && PriceField.isValid()
						&& PurchaseDateField.isValid()) {// alert(isDatashowFormValid)
					simple.getForm().submit(Ext.Ajax.request({
										waitMsg : 'Please wait...',
										url : '../listDataShows.do',
										params : {
											task : "AddDatashow",
											costs : cost,
											dates : dates,
											length : cost.length,
											reasons : reason,
											datashowName : NameField.getValue(),
											datashowPrice : PriceField
													.getValue(),
											datashowInfo : InfoField.getValue(),
											datashowPurchaseDate : dd

										},
										method : 'POST',
										success : function(response) { // //console.log("success");//alert(valid);
											var redirect = 'datashows.jsp';
											window.location = redirect;

										},
										failure : function(response) {// //console.log("faaaaaaaaaail");//alert(ValidFromField.getValue().format('Y-m-d'));
											simple.getForm().reset();
										}
									}));
				} else {
					var errorMsg = 'Your Form is not valid!';
					Ext.Msg.show({
								title : 'Error',
								msg : errorMsg,
								minWidth : 200,
								modal : true,
								icon : Ext.Msg.ERROR,
								buttons : Ext.Msg.OK
							});
				}
			}
		}, {
			text : 'Cancel',
			handler : function() {
				window.location = 'datashows.jsp';
			}
		}]
	});

	function stcCallBack1001(record, opts, success) {
		// if (success)
		// // do whatever
		// alert("the sucess ");
		// // alert (" number of records "+ds.getCount() +" recourd
		// "+ds.getAt(0)) ;
		// ////console.log(" LOOOOOOOOOOOOOOD ");

	};
	// loadtest= ds.load({callback : stcCallBack1001});
	simple.render(document.body);

});