<%@ taglib uri="/WEB-INF/struts-html" prefix="html" %>

<html:html>
<head>
	 <title>Add Course</title>
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
 <script type="text/javascript" src="../ext/adapter/ext/ext-base.js"></script>
    <script type="text/javascript" src="../ext/ext-all-debug.js"></script>
 	<script type="text/javascript" src="colorPicker.js"></script>
    <script type="text/javascript" src="../JS/radiogroup.js"></script>   
 	<script type="text/javascript" src="addCourse.js"></script>
 	<style type=text/css media=all>@import url( ColorPicker.css );</style>
        <script src="jquery-1.2.2.js" type="text/javascript"></script>
        <script src="ColorPicker.js" type="text/javascript"></script>
 	
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/> 
    <!-- Include Ext stylesheets here: -->
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
                <td align="center" valign="middle"></td>
                <td width=100 align="center" ><a href="../pages/trainarea.jsp"><img src="../images/Training area.png" width="60" height="40" border=0/></a></td>
                <td width="16" align="center">&nbsp;</td>
                <td width="16" align="center"></td>
                <td width=100 align="center"><a href="../pages/cources.jsp"><img src="../images/Courses.png" width="40" height="35" border=0/></a></td>
               <td width="16" align="center">&nbsp;</td>
                <td width="16" align="center">&nbsp;</td>
                
               <td width=100 align="center"><a href="../pages/tracks.jsp"><img src="../images/Tracks.png" width="40" height="35" border=0/></a></td>
              	<td width="16" align="center">&nbsp;</td>
                <td width="16" align="center">&nbsp;</td>
                
               <td width=100 align="center"><a href="priceGroupHistory.jsp"><img src="../images/Price-History.png" width="60" height="40" border=0/></a></td>
              
              </tr>
              <tr>
                <td>&nbsp;</td>
                <td align="center" valign="middle"><span class="top-links-notvisited"></span></td>
                
                <td align="center" valign="middle"><span class="top-links-notvisited"><a href="../pages/trainarea.jsp">Training Areas</a></span></td>
                <td align="center" valign="middle">&nbsp;</td>
                <td align="center" valign="middle"><span class="top-links-notvisited"></span></td>
                 <td align="center" valign="middle"><span class="top-links-visited"><a href="../pages/cources.jsp">Courses</a></span></td>
               <td align="center" valign="middle">&nbsp;</td>
                <td align="center" valign="middle"><span class="top-links-notvisited"></span></td>
                <td align="center" valign="middle"><span class="top-links-notvisited"><a href="../pages/tracks.jsp">Tracks</a></span></td>
                <td align="center" valign="middle">&nbsp;</td>
                <td align="center" valign="middle">&nbsp;</td>
                 <td align="center" valign="middle"><span class="top-links-notvisited"><a href="priceGroupHistory.jsp">Prices</a></span></td>
                
                <td align="center" valign="middle">&nbsp;</td>
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
                <td  align="left">
    
 <div id="binding-example" class="wide">
</div>
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
