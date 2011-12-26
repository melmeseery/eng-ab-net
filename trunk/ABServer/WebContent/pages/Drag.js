   
  Ext.ns('Example');
   
 
  Example.GridDropZone = function(grid, config) {
  this.grid = grid;
  Example.GridDropZone.superclass.constructor.call(this, grid.view.scroller.dom, config);
  };
  Ext.extend(Example.GridDropZone, Ext.dd.DropZone, {
    
  onContainerOver:function(dd, e, data) {
  return dd.grid !== this.grid ? this.dropAllowed : this.dropNotAllowed;
   } // eo function onContainerOver
   
  ,onContainerDrop:function(dd, e, data) {
 if(dd.grid !== this.grid) {
   this.grid.store.add(data.selections);
 Ext.each(data.selections, function(r) {
  dd.grid.store.remove(r);
  });
  this.grid.onRecordsDrop(dd.grid, data.selections);
   return true;
 }
 else {
 return false;
 }
 } // eo function onContainerDrop
  
 });

   Example.Grid = Ext.extend(Ext.grid.GridPanel, {
  
   border:false
   // ,bodyStyle:'border-top:1px solid #99bbe8'
  ,autoScroll:true
  ,viewConfig:{forceFit:true}
  ,layout:'fit'
  ,enableDragDrop:true
   ,initComponent:function() {
    
   Ext.apply(this, {
   columns:[
  {dataIndex:'firstName', header:'First Name'}
   ,{dataIndex:'midName', header:'First Name'}
   ,{dataIndex:'lastName', header:'First Name'}
   ,{dataIndex:'note', header:'Note'}
   ]
  }); // eo apply
   
// call parent
  Example.Grid.superclass.initComponent.apply(this, arguments);
   
   } // eo function initComponent
 ,onRender:function() {
   Example.Grid.superclass.onRender.apply(this, arguments);
   
  this.dz = new Example.GridDropZone(this, {ddGroup:this.ddGroup || 'GridDD'});
  } // eo function onRender
  
  ,onRecordsDrop:Ext.emptyFn
   
  }); // eo extend
   

 Example.Grid1 = Ext.extend(Example.Grid, {
  
  initComponent:function() {
  
  Ext.apply(this, {
  store:new Ext.data.SimpleStore({
  id:0
  ,fields:['id', 'firstName', 'midName', 'lastName', 'note']
 ,data:[
 [1, 'Joe', 'John', 'Doe', 'Drag me!']
  ,[2, 'Bill', 'M.', 'Smith', 'Drag me!']
 ,[3, 'Mary', 'Lee', 'White', 'Drag me!']
 ,[4, 'Ann', 'A.', 'Berry', 'Drag me!']
 ,[5, 'Max', 'Larry', 'Lee', 'Drag me!']
 ,[6, 'Harry','Frank', 'Louis', 'Drag me!']
 ]
 })
  }); // eo apply
  
 // call parent
 Example.Grid1.superclass.initComponent.apply(this, arguments);
  
 } // eo function initComponent
 }); // eo extend
  
 // register xtype
 Ext.reg('examplegrid1', Example.Grid1);

  Example.Grid2 = Ext.extend(Example.Grid, {
  
 initComponent:function() {
  
 Ext.apply(this, {
  store:new Ext.data.SimpleStore({
 id:0
  ,fields:['id', 'firstName', 'midName', 'lastName', 'note']
  ,data:[
  [7, 'Carlos', '', 'Mitchel', 'Drag me!']
 ,[8, 'Ron', 'W.', 'Brown', 'Drag me!']
 ,[9, 'Alex', 'G.', 'Lem', 'Drag me!']
 ,[10, 'Frank', '', 'Amber', 'Drag me!']
  ,[11, 'Ashley', 'Edward', 'Anderson', 'Drag me!']
 ,[12, 'Bernice','C.', 'Dexter', 'Drag me!']
  ]
 })
 }); // eo apply
  
  // call parent
 Example.Grid2.superclass.initComponent.apply(this, arguments);
  
  } // eo function initComponent
 }); // eo extend
  
  // register xtype
 Ext.reg('examplegrid2', Example.Grid2);
 // }}}
  
 Ext.BLANK_IMAGE_URL = './ext/resources/images/default/s.gif';
  
 // application main entry point
 Ext.onReady(function() {
  
  Ext.QuickTips.init();
   
 
   
  var win = new Ext.Window({
 layout:'border'
  ,width:680
  ,height:240
 // ,title:Ext.getDom('page-title').innerHTML
  ,items:[{
  xtype:'examplegrid1'
  ,region:'west'
  ,width:340
  ,split:true
  },{
  xtype:'examplegrid2'
  ,region:'center'
  }]
  });
  win.show();
   
  }); // eo function onReady
   
  // eof
