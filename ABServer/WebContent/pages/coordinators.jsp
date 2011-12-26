<%@ taglib uri="/WEB-INF/struts-html" prefix="html" %>

<html:html>
<head>
	 <title>Training Coordinators</title>
   <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<style type="text/css">
<!--
body {
	margin-left: 0px;
	margin-top: 0px;
	margin-right: 0px;
	margin-bottom: 0px;
	background-color: #00548F;
}
-->
</style>
<style type="text/css">
.forward {
	background-image: url(../images/icons/forward.gif) !important;
}

.backward {
	background-image: url(../images/icons/backward.gif) !important;
}

.add {
	background-image: url(../images/icons/add.gif) !important;
}

.remove {
	background-image: url(../images/icons/delete.gif) !important;
}

.save {
	background-image: url(../images/icons/save.gif) !important;
}




</style>
<style type="text/css">
<!--
@import url("../css/new.css");
.style1 {
	color: #FFFFFF;
	font-weight: bold;
	font-family: Arial;
}
-->
</style>
<link href="../css/css.css" rel="stylesheet" type="text/css" />
<style type="text/css">
<!--
#Layer1 {
	position:absolute;
	width:200px;
	height:115px;
	z-index:1;
}
-->
</style>    
   <!-- Include Ext and app-specific scripts: -->
   <script type="text/javascript" src="../ext/adapter/ext/ext-base.js"></script>
    <script type="text/javascript" src="../ext/ext-all-debug.js"></script>
  <link rel="stylesheet" type="text/css" href="../ext/resources/css/ext-all.css"/>
    <script type="text/javascript" src="Coordinators.js"></script>  

</head>
<body>
    <%
	String s=(String)session.getAttribute("LogIn");
	//  ////System.out.println("s= "+s);
	if(s == null)
		response.sendRedirect("../pages/Login.jsp");
%>
   <table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td>&nbsp;</td>
    <td width="1000"><table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td><table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td height="10"><img src="../images/spacer.gif" width="1" height="1" /></td>
            <td height="10"><img src="../images/spacer.gif" width="1" height="1" /></td>
            <td height="10"><img src="../images/spacer.gif" width="1" height="1" /></td>
            <td height="10"><img src="../images/spacer.gif" width="1" height="1" /></td>
            <td height="10"><img src="../images/spacer.gif" width="1" height="1" /></td>
          </tr>
          <tr>
     	    <td width="160"><a href="../pages/index-login.jsp"><img src="../images/link_4_over.gif" width="160" height="30" border="0" /></a></td>
            <td width="160"><a href="../pages/contracts.jsp"><img src="../images/link_3.gif" width="160" height="30" border="0" /></a></td>
            <td width="160"><a href="../pages/generalCalendarInterface.jsp"><img src="../images/link_2.gif" width="160" height="30" border="0" /></a></td>
             <td width="160"><a href="../pages/users.jsp"><img src="../images/link_1.gif" width="160" height="30" border="0" /></a></td>
             <td>&nbsp;</td>
          </tr>
        </table></td>
      </tr>
      <tr>
        <td height="85" background="../images/bg-header.gif"><table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td><table width="100%" border="0" cellspacing="0" cellpadding="0">
               <tr>
                <td width="16">&nbsp;</td>
                <td width="100" align="center"><a href="../pages/cources.jsp"><img src="../images/Courses.png" width="40" height="40" border=0/></a></td>
                <td width="16" align="center">&nbsp;</td>
                <td width="100" align="center"><a href="../JSP/resourceslist.jsp"><img src="../images/Resources.png" width="60" height="43" border=0/></a></td>
                <td width="16" align="center">&nbsp;</td>
                 <td width="100" align="center"><a href="../pages/clients.jsp"><img src="../images/Clients.png" width="60" height="43" border=0/></a></td>
                <td width="16" align="center">&nbsp;</td>
                <td width=100 align="center"><a href="../pages/Teams.jsp"><img src="../images/Training Coordinates.png" width="43" height="40" border=0/></a></td>
                <td width="16" align="center">&nbsp;</td>
                <td width=100 align="center"><a href="../pages/coordinators.jsp"><img src="../images/Training Coordinates.png" width="43" height="40" border=0/></a></td>
                <td width="16" align="center">&nbsp;</td>
                <td width=100 align="center"><a href="../pages/datashows.jsp"><img src="../images/Data shows.png" width="60" height="43" border=0/></a></td>
                <td width="16" align="center">&nbsp;</td>
                <td width=100 align="center"><a href="../pages/venus.jsp"><img src="../images/Venus.png" width="43" height="39" border=0/></a></td>
                <td width="16" align="center">&nbsp;</td>
                <td width="100" align="center"><a href="../pages/suppliers.jsp"><img src="../images/Suppliers.png" width="65" height="45" border=0/></a></td>
                
              </tr>
              <tr>
                <td>&nbsp;</td>
                <td align="center" valign="middle"><span class="top-links-notvisited"><a href="../pages/cources.jsp">Training Products</a></span></td>
                <td align="center" valign="middle">&nbsp;</td>
                <td align="center" valign="middle"><span class="top-links-notvisited"><a href="../JSP/resourceslist.jsp">Resources</span></td>
                <td align="center" valign="middle">&nbsp;</td>
                <td align="center" valign="middle"><span class="top-links-notvisited"><a href="../pages/clients.jsp">Clients</a></span></td>
                <td align="center" valign="middle">&nbsp;</td>
                <td align="center" valign="middle"><span class="top-links-notvisited"><a href="../pages/Teams.jsp">Coordinators Teams</a></span></td>
                 <td align="center" valign="middle">&nbsp;</td>
                <td align="center" valign="middle"><span class="top-links-visited"><a href="../pages/coordinators.jsp">Coordinators</a></span></td>
                <td align="center" valign="middle">&nbsp;</td>
                <td align="center" valign="middle"><span class="top-links-notvisited"><a href="../pages/datashows.jsp">Data shows</a></span></td>
                <td align="center" valign="middle">&nbsp;</td>
                <td align="center" valign="middle"><span class="top-links-notvisited"><a href="../pages/venus.jsp">Venues</a></span></td>
                <td align="center" valign="middle">&nbsp;</td>
                <td align="center" valign="middle"><span class="top-links-notvisited"><a href="../pages/suppliers.jsp">Suppliers</a></span></td>
               </tr>
            </table></td><td width="354"><table width="100%" border="0" cellpadding="0" cellspacing="0">
              <tr>
                <td width="20">&nbsp;</td>
                <td><table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td height="30" align="center" class="welcome">Welcome <% out.println(" "+s); %></td>
                  </tr>
                  <tr>
                    <td align="center" class="logout"><a href="../pages/Login.jsp">Logout</a></td>
                  </tr>
                </table></td>
                <td width="150" align="center" valign="middle"><img src="../images/Logo.JPG" width="130" height="30" border="0" /></td>
              </tr>
            </table></td>
          </tr>
        </table></td>
      </tr>
      <tr>
        <td height="460" align="center" valign="top" background="../images/tile.gif"><table class="wide"  width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td width="15" height="470">&nbsp;</td>
            <td valign="top"    ><table width="100%" border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td height="4" colspan="3"><img src="../images/spacer.gif" width="1" height="1" /></td>
                </tr>
              <tr>
                <td width="4"><img src="../images/spacer.gif" width="1" height="1" /></td>
                <td width="956" align="left">
    <div id="binding-example" class="wide"></div>
    </td>
    <td width="4"><img src="../images/spacer.gif" width="1" height="1" /></td>
              </tr>
              <tr>
                <td height="4" colspan="3"><img src="../images/spacer.gif" width="1" height="1" /></td>
                </tr>
            </table></td>
            <td width="15">&nbsp;</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
        </table></td>
      </tr>
    </table></td>
    <td>&nbsp;</td>
  </tr>
</table>
   
</body>
</html:html>
