/*
 * GreetingAction.java
 *
 * Created by Exadel Struts Studio
 */

package actions;

import java.io.PrintWriter;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import database.DataSourceConnection;

public class LoginAction extends org.apache.struts.action.Action {

	// Global Forwards
	public static final String GLOBAL_FORWARD_start = "start";

	public LoginAction() {
	}

	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {

		DataSourceConnection database = new DataSourceConnection();
		database.initializeConnecton(this.servlet);

		ResultSet rs = database
				.retrieve("SELECT* FROM users where UserUsername = '"
						+ request.getParameter("userUsername")
						+ "' and UserPassword = '"
						+ request.getParameter("userPassword") + "';");

		if (rs.next()){
			
			HttpSession sess = request.getSession(true);
			sess.setAttribute("LogIn", request.getParameter("userUsername"));
			
			PrintWriter out = response.getWriter();

			out.write("{'success':true,'message':'success'}");

			
		}
		else {
			PrintWriter out = response.getWriter();

			out.write("{'success':false,'message':'failure'}");

		}

		try {
			rs.close();
			database.finalize();
		} catch (SQLException e) {

			e.printStackTrace();
		} catch (Throwable e) {

			e.printStackTrace();
		}

		return null;
	}
}