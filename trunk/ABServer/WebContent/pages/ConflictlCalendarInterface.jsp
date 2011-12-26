<%@ taglib uri="/WEB-INF/struts-html" prefix="html" %>

<html:html>
<head>
	<title>General Calendar Interface</title>
   <!-- Include Ext and app-specific scripts: -->
   <script type="text/javascript" src="../ext/adapter/ext/ext-base.js"></script>
    <script type="text/javascript" src="../ext/ext-all-debug.js"></script>
 	<script type="text/javascript" src="../JS/calendarFilter.js"></script>
  <script type="text/javascript" src="../JS/dojo/dojo.js" djConfig="parseOnLoad: true, isDebug: true"></script>
	<script type="text/javascript" src="../JS/calendar/ConflictCalendarScript.js"></script>
	
  <link rel="stylesheet" type="text/css" href="../ext/resources/css/ext-all.css"/>   
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
             <td width="160"><a href="../pages/index-login.jsp"><img src="../images/link_4.gif" width="160" height="30" border="0" /></a></td>
            <td width="160"><a href="../pages/contracts.jsp"><img src="../images/link_3.gif" width="160" height="30" border="0" /></a></td>
            <td width="160"><a href="../pages/generalCalendarInterface.jsp"><img src="../images/link_2_over.gif" width="160" height="30" border="0" /></a></td>
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
                <td width="19" height="1">&nbsp;</td>
                <td width="100" align="center" valign="middle"><div id="fi-button"></div></td>
                <td width="16" align="center" valign="middle">&nbsp;</td>
                <td width="81" align="center" valign="middle"><a href="../JSP/createHoliday.jsp"><img src="../images/Holidays.png" width="44" height="40" border=0/></a></td>
                <td width="16" align="center" valign="middle">&nbsp;</td>
                <td width="106" align="center" valign="middle"><div id="reset-button"></div></td>
                <td width="16" align="center" valign="middle">&nbsp;</td>
                <td width="106" align="center" valign="middle"><div id="Conflict-button"></div></td>
                <td width="210" align="center" valign="middle">&nbsp;</td>
                </tr>
              <tr>
                <td>&nbsp;</td>
                <td align="center" valign="middle"><span class="top-links-notvisited">Filters</span></td>
                <td align="center" valign="middle">&nbsp;</td>
                <td align="center" valign="middle"><span class="top-links-notvisited"><a href="../JSP/createHoliday.jsp">Add Holiday</a></span></td>
                <td align="center" valign="middle"></td>
               <td align="center" valign="middle"><span class="top-links-notvisited">Reset Calendar</span></td>
             <td align="center" valign="middle"></td>
            <td align="center" valign="middle"><span class="top-links-visited">View Conflicts</span></td>
                <td align="center" valign="middle">&nbsp;</td>
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
    <div   class="wide"  >
		<div class="wide"   id="dojoCalendar" dojoType="mywidgets:calendar"></div>
	</div></td><td width="4"><img src="../images/spacer.gif" width="1" height="1" /></td>
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
