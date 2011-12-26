<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<title>Home Page</title>
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
  //System.out.println("s= "+s);
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
                <td align="center" valign="middle"><span class="top-links-notvisited"><a href="../pages/coordinators.jsp">Coordinators</a></span></td>
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
        <td height="460" align="center" valign="top" background="../images/tile.gif"><P CLASS="ctl" ALIGN=CENTER STYLE="margin-bottom: 0cm"><FONT SIZE=5 STYLE="font-size: 20pt"><SPAN LANG="en-US"><B>Welcome
To Schedulizer</B></SPAN></FONT></P>
<P CLASS="ctl" ALIGN=CENTER STYLE="margin-bottom: 0cm"><FONT COLOR="#0000ff"><FONT SIZE=2 STYLE="font-size: 11pt"><SPAN LANG="en-US">Your
way for professional training management</SPAN></FONT></FONT></P>
<P CLASS="ctl" ALIGN=CENTER STYLE="margin-bottom: 0cm"><BR>
</P>
<P CLASS="ctl" ALIGN=CENTER STYLE="margin-bottom: 0cm"><SPAN LANG="en-US"><FONT SIZE=1 STYLE="font-size: 8pt">Developed
by </FONT><FONT SIZE=1 STYLE="font-size: 8pt"><U><B>EngNet</B></U></FONT><FONT SIZE=1 STYLE="font-size: 8pt">,
a software registered company</FONT></SPAN></P>
<P CLASS="ctl" ALIGN=CENTER STYLE="margin-bottom: 0cm"><BR>
</P>
<P CLASS="ctl" ALIGN=CENTER STYLE="margin-bottom: 0cm"><FONT SIZE=2><SPAN LANG="en-US"><B>Address:
Smart Village, B115, Giza.</B></SPAN></FONT></P>
<P CLASS="ctl" ALIGN=CENTER STYLE="margin-bottom: 0cm"><FONT SIZE=2><SPAN LANG="en-US"><B>General
Manager: Dr. Hatem Elrefaei</B></SPAN></FONT></P>
<P CLASS="ctl" ALIGN=CENTER STYLE="margin-bottom: 0cm"><FONT SIZE=2><SPAN LANG="en-US"><B>Telephone:
0106995530</B></SPAN></FONT></P>
<P CLASS="ctl" ALIGN=CENTER STYLE="margin-bottom: 0cm"><SPAN LANG="en-US"><FONT SIZE=2><B>Email:
</B></FONT><FONT COLOR="#0000ff"><U><A HREF="mailto:hatem@mcit.gov.eg"><FONT SIZE=2><B>hatem@mcit.gov.eg</B></FONT></A></U></FONT><FONT SIZE=2><B>
</B></FONT></SPAN>
</P>
<P CLASS="ctl" ALIGN=CENTER STYLE="margin-bottom: 0cm"><BR>
</P>
<P CLASS="ctl" STYLE="margin-bottom: 0cm"><SPAN LANG="en-US"><U><B>Notes:</B></U></SPAN></P>
<OL>
	<LI><P CLASS="ctl" ALIGN=JUSTIFY STYLE="margin-bottom: 0cm"><SPAN LANG="en-US">Schedulizer
	is aimed to serve any training company, institution, and university
	in the process of booking rooms, and assigning instructors (called
	resources in the program) to make successful training events. For
	more information about Schedulizer please read <A HREF="../files/Schedulizer brochure.doc">this brochure</A><B>.</B></SPAN></P>
	<LI><P CLASS="ctl" ALIGN=JUSTIFY STYLE="margin-bottom: 0cm"><SPAN LANG="en-US">This
	is a public site to demonstrate the Schedulizer Software. So it is
	accessed by many potential customers of EngNet. Thus the database is
	shared by all participants who may be adding or deleting data at the
	same time you are operating.</SPAN></P>
	<LI><P CLASS="ctl" ALIGN=JUSTIFY STYLE="margin-bottom: 0cm"><SPAN LANG="en-US">Accordingly,
	all information, names, photos, and documents are only used for the
	DEMO purpose of Schedulizer software and are not real business
	information.</SPAN></P>
	<LI><P CLASS="ctl" ALIGN=JUSTIFY STYLE="margin-bottom: 0cm"><SPAN LANG="en-US">The
	operation speed of Schedulizer when running on your server at your
	company is much faster than its speed on this internet based
	version. So we guarantee your satisfaction concerning the speed when
	installing on your machine.</SPAN></P>
	<LI><P CLASS="ctl" ALIGN=JUSTIFY STYLE="margin-bottom: 0cm"><SPAN LANG="en-US">Avoid
	using the following symbols or characters when entering information:
	&ldquo;!, #, $, %, %, ^, &amp;, *, \, /, _, -&ldquo;.</SPAN></P>
	<LI><P CLASS="ctl" ALIGN=JUSTIFY STYLE="margin-bottom: 0cm"><SPAN LANG="en-US">All
	fields with red stars &ldquo;<FONT COLOR="#ff0000">*</FONT>&rdquo;
	beside them are mandatory information. </SPAN>
	</P>
	<LI><P CLASS="ctl" ALIGN=JUSTIFY STYLE="margin-bottom: 0cm"><SPAN LANG="en-US">Please
	use meaningful names so others can follow them through the tables.</SPAN></P>
	<LI><P CLASS="ctl" ALIGN=JUSTIFY STYLE="margin-bottom: 0cm"><SPAN LANG="en-US">Please
	be considerate when entering information, any inappropriate words
	will be removed.</SPAN></P>
</OL>



<table class="wide"  width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td width="15" height="470">
</td>
            
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
    <td></td>
  </tr>
</table>

</body>
</html>
