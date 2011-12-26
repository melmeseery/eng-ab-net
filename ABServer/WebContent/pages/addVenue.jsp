<%@ taglib uri="/WEB-INF/struts-html" prefix="html" %>

<html:html>
<head>
	 <title>Add Venue</title>
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
   <!-- Include Ext and app-specific scripts: -->
   <script type="text/javascript" src="../ext/adapter/ext/ext-base.js"></script>
    <script type="text/javascript" src="../ext/ext-all-debug.js"></script>
 	<script type="text/javascript" src="colorPicker.js"></script>
   <script type="text/javascript" src="../JS/radiogroup.js"></script>
      <script type="text/javascript" src="AddVenue.js"></script>
    
  <link rel="stylesheet" type="text/css" href="../ext/resources/css/ext-all.css"/>   

</head>
<body>
	 
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
     
            <td width="160"><a href="../pages/generalCalendarInterface.jsp"><img src="../images/link_2.gif" width="160" height="30" border="0" /></a></td>
            <td width="160"><a href="../pages/contracts.jsp"><img src="../images/link_3.gif" width="160" height="30" border="0" /></a></td>
            <td width="160"><a href="../pages/index-login.jsp"><img src="../images/link_4_over.gif" width="160" height="30" border="0" /></a></td>
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
               
                <td width=100 align="center"><a href="../pages/coordinators.jsp"><img src="../images/Training Coordinates.png" width="43" height="40" border=0/></a></td>
                <td width="16" align="center">&nbsp;</td>
                <td width=100 align="center"><a href="../pages/datashows.jsp"><img src="../images/Data shows.png" width="60" height="43" border=0/></a></td>
                <td width="16" align="center">&nbsp;</td>
                <td width=100 align="center"><a href="../pages/venus.jsp"><img src="../images/Venus.png" width="43" height="39" border=0/></a></td>
                <td width="16" align="center">&nbsp;</td>
                <td width="100" align="center"><a href="../pages/suppliers.jsp"><img src="../images/Suppliers.png" width="65" height="45" border=0/></a></td>
                <td width="16" align="center">&nbsp;</td>
                <td align="center"><a href="../pages/users.jsp"><img src="../images/Users.png" width="43" height="40" border=0/></a></td>
           
              </tr>
              <tr>
                <td>&nbsp;</td>
                <td align="center" valign="middle"><span class="top-links-notvisited"><a href="../pages/cources.jsp">Training Products</a></span></td>
                <td align="center" valign="middle">&nbsp;</td>
                <td align="center" valign="middle"><span class="top-links-notvisited"><a href="../JSP/resourceslist.jsp">Resources</span></td>
                <td align="center" valign="middle">&nbsp;</td>
                <td align="center" valign="middle"><span class="top-links-notvisited"><a href="../pages/clients.jsp">Clients</a></span></td>
                <td align="center" valign="middle">&nbsp;</td>
                <td align="center" valign="middle"><span class="top-links-notvisited"><a href="../pages/coordinators.jsp">Coordinators</a></span></td>
                <td align="center" valign="middle">&nbsp;</td>
                <td align="center" valign="middle"><span class="top-links-notvisited"><a href="../pages/datashows.jsp">Data shows</a></span></td>
                <td align="center" valign="middle">&nbsp;</td>
                <td align="center" valign="middle"><span class="top-links-notvisited"><a href="../pages/venus.jsp">Venues</a></span></td>
                <td align="center" valign="middle">&nbsp;</td>
                <td align="center" valign="middle"><span class="top-links-notvisited"><a href="../pages/suppliers.jsp">Suppliers</a></span></td>
                <td align="center" valign="middle">&nbsp;</td>
                <td align="center" valign="middle"><span class="top-links-notvisited"><a href="../pages/users.jsp">Users</a></span></td>
              </tr>
            </table></td><td width="354"><table width="100%" border="0" cellpadding="0" cellspacing="0">
              <tr>
                <td width="20">&nbsp;</td>
                <td><table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td width="70"><span class="login-text">User Name :</span></td>
                    <td align="left" valign="middle"><label>
                      <input name="textarea" type="text" class="text-field" value="" size="15" />
                    </label></td>
                  </tr>
                  <tr>
                    <td class="login-text">Passward  :</td>
                    <td align="left" valign="middle"><input name="textarea2" type="password" class="text-field" value="" size="15" /></td>
                  </tr>
                  <tr>
                    <td>&nbsp;</td>
                    <td align="center" valign="middle"><img src="../images/login-btn.gif" width="41" height="15" /></td>
                  </tr>
                </table></td>
                <td width="150">&nbsp;</td>
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
