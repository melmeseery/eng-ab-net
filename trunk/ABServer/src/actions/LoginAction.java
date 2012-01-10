/*
 * GreetingAction.java
 *
 * Created by Exadel Struts Studio
 */

package actions;

import java.io.PrintWriter;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Properties;

import javax.mail.AuthenticationFailedException;
import javax.mail.MessagingException;
import javax.mail.NoSuchProviderException;
import javax.mail.Session;
import javax.mail.Store;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import database.DataSourceConnection;

public class LoginAction extends org.apache.struts.action.Action {

	// Global Forwards
	public static final String GLOBAL_FORWARD_start = "start";
	  static Logger logger = Logger.getLogger(LoginAction.class);
	public LoginAction() {
	}

	private boolean AuthenticateUserEmail(String Email, String Pass){
		boolean debug = true;
		boolean  LoginCorrectly=false ;
	    // Get a Properties object
	    Properties props = System.getProperties();

	    // Get a Session object
	    javax.mail.Session session = Session.getInstance(props, null);
	    session.setDebug(debug);
		// TODO Auto-generated method stub
		String protocol="pop3s";
		String host = "mail.ca-eg.com";
		 String username = Email;
		 String password = Pass;
	     logger.info(" the url is "+host+"  user name "+username);

//			String protocol="pop3s";
//			String host = "pop.gmail.com";
//			 String username = "melmeseery@gmail.com";
//			 String password = "allah2guideme";

	           String mbox = null;
			    // ...
			    Store store;
				try {
					store = session.getStore(protocol);

			    store.connect(host, username, password);

			     logger.info("  correct password...   ");
			    LoginCorrectly=true;


				} catch (NoSuchProviderException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}catch (AuthenticationFailedException e){
				     logger.info("  wrong password. ..............");
					LoginCorrectly=false;
				} catch (MessagingException e) {

					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			     logger.info("  LoginCorrectly   "+			LoginCorrectly);

             return LoginCorrectly;
	}

	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
       logger.info("   inside the login action............");
		DataSourceConnection database = new DataSourceConnection();
		database.initializeConnecton(this.servlet);

		String Email=request.getParameter("userEmail");
		String Pass=request.getParameter("userPassword");

	     logger.info("   Inside the email and check what to set...."+Email+ "   pass is " +Pass);

		if(AuthenticateUserEmail(Email,  Pass)){
			// if authenticate from the webserver now authenticate from local server
           logger.info("  now iside the database check the  username ");
		ResultSet rs = database
				.retrieve("SELECT * FROM users where UserEmail = '"
						+ request.getParameter("userEmail")
						+ "' and UserPassword = '"
						+ request.getParameter("userPassword") + "';");
		logger.info( "SELECT * FROM users where UserEmail = '"
						+ request.getParameter("userEmail")
						+ "' and UserPassword = '"
						+ request.getParameter("userPassword") + "';");
		if (rs.next()){

			HttpSession sess = request.getSession(true);
			sess.setAttribute("LogIn", rs.getString( 2));

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


		}// server authentiate if,
		 else {
			PrintWriter out = response.getWriter();

			out.write("{'success':false,'message':'failure'}");

		}



		return null;
	}
}