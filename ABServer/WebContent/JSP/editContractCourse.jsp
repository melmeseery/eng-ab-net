<html>
<head>
	<title>Edit Contract Course</title>



    <link rel="stylesheet" type="text/css" href="../ext/resources/css/ext-all.css">
     <link rel="stylesheet" type="text/css" href="../ext/resources/css/form.css"/>
     <link href="../css/Mytheme.css" rel="stylesheet" type="text/css" />
</head>
<body>
   <script type="text/javascript" src="../ext/adapter/ext/ext-base.js"></script>
    <script type="text/javascript" src="../ext/ext-all-debug.js"></script>
    <script type="text/javascript" src="../examples.js"></script>
    <script type="text/javascript" src="../JS/editContractCourse.js"></script>

    <%
     Integer contractId=Integer.valueOf(request.getParameter("contractId"));
     Integer courseId=Integer.valueOf(request.getParameter("courseId"));
     Integer courseFund=Integer.valueOf(request.getParameter("courseFund"));


     session.setAttribute("contractId",contractId);
     session.setAttribute("courseId",courseId);
     session.setAttribute("courseFund",courseFund);
     %>
    <!-- Include Ext stylesheets here: -->

  <div id = "content"></div>

  <div id="north">
    <p></p>
  </div>
  <div id="center">

  </div>

 <p></p>
 <div id="fi-button"></div>
 <div id="fi-button-msg" style="display:none;"></div>
        <div class="x-clear"></div>

  <div id="props-panel" class="wide" >
  </div>


</body>
</html>