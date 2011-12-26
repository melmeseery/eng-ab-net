<%@ taglib uri="/WEB-INF/struts-html" prefix="html" %>
<html:html><head>
  <html:javascript formName="FormData"/>
</head>

<font color="red"><html:errors /></font>
<body>
	<html:form action="/HomePage.do" method="post" onsubmit="return validateFormData(this)">
    <table>
    	<tr><td>User Name: </td>
    	<td><html:text property="userName"></html:text></td>
    	</tr>
    	<tr>
	    	<td>Password : </td>
	    	<TD><html:password property="password"></html:password></TD>
    	</tr>
    	<tr>
	    	<td><html:submit value="Login"/></td>
    	</tr>
    </table>
    </html:form>
  
</body>
</html:html>
