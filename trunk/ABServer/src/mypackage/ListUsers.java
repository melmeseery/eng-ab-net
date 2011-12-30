package mypackage;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import abItemsShow.UserShow;
import tablespackage.Suppliers;
import tablespackage.Users;
import HibernatePackage.Hiber_Users;
//import HibernatePackage.HibernateUtil;

import com.mysql.jdbc.Statement;
import com.thoughtworks.xstream.XStream;

import database.DataSourceConnection;

public class ListUsers extends org.apache.struts.action.Action {

    // Global Forwards
    public static final String GLOBAL_FORWARD_start = "start";

    // Local Forwards


    public ListUsers() {
    }

    public ActionForward execute(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
    	Hiber_Users HU=new Hiber_Users();
        XStream xstream = new XStream();
        ArrayList<UserShow> al=new ArrayList<UserShow>();

      	// create and intialize the database connection////////////
		DataSourceConnection database = new DataSourceConnection();
		database.initializeConnecton(this.servlet);

        if(request.getParameter("task").equals("list"))
        {
        	ArrayList<Users> users=HU.getUsers(database);
        	for(int i=0;i<users.size();i++)
        	{
        		UserShow us=new UserShow();
        		us.setIdUsers(users.get(i).getIdUsers());
        		us.setUserPassword(users.get(i).getUserPassword());
        		us.setUserUsername(users.get(i).getUserUsername());
        		us.setUserEmail(users.get(i).getUserEmail() );
        		Integer j=users.get(i).getUserPrivilage();
        		if(j.equals(0))
        			us.setUserPrivilage("Admin");
        		else if(j.equals(1))
        			us.setUserPrivilage("Accountant");
        		else if(j.equals(2))
        			us.setUserPrivilage("Employee");
        		else if(j.equals(3))
        			us.setUserPrivilage("User");
        		al.add(us);
        	}
	        xstream.alias("Users", UserShow.class);
	        // //////System.out.println("ana ba3d el alias");
	        String returnText = xstream.toXML(al);
	        // //////System.out.println("return text = "+returnText);
	        response.setContentType("application/xml;charset=UTF-8");
	        PrintWriter out = response.getWriter();
			out.write(returnText);
        }
        else if(request.getParameter("task").equals("AddUser"))
        {
        	Users u=new Users();
        	u.setUserPassword(request.getParameter("userPassword"));
        	String privillage=request.getParameter("userPrivilage");
        	if(privillage.equals("Admin"))
        		u.setUserPrivilage(0);
        	else if(privillage.equals("Accountant"))
        		u.setUserPrivilage(1);
        	else if(privillage.equals("Employee"))
        		u.setUserPrivilage(2);
        	else if(privillage.equals("User"))
        		u.setUserPrivilage(3);
        	u.setUserUsername(request.getParameter("userUsername"));
        	u.setUserEmail(request.getParameter("userEmail") );
        	HU.insertUser(u, database);
        }
        else if(request.getParameter("task").equals("EditUser"))
        {
        	  Integer id=Integer.valueOf(request.getParameter("id"));
    		  Users s=new Users();
    		  s.setIdUsers(id);
	    	  s.setUserPassword(request.getParameter("userPassword"));
	    	  String privillage=request.getParameter("userPrivilage");
	        	if(privillage.equals("Admin"))
	        		s.setUserPrivilage(0);
	        	else if(privillage.equals("Accountant"))
	        		s.setUserPrivilage(1);
	        	else if(privillage.equals("Employee"))
	        		s.setUserPrivilage(2);
	        	else if(privillage.equals("User"))
	        		s.setUserPrivilage(3);
	    	  s.setUserUsername(request.getParameter("userUsername"));
	    		s.setUserEmail(request.getParameter("userEmail") );
	    	 HU.updateUser(s, database);

        }
        else if(request.getParameter("task").equals("DELETESELECTIONS"))
        {
        	 if (request.getParameterValues("ids").length == 1)
             {
           	  try{

           		database.update("delete from users where idUsers = "+request.getParameterValues("ids")[0]);

         		}
         		  catch (Exception e) { e.printStackTrace();

         	      }  finally {

         	      }

             }
             else if (request.getParameterValues("ids").length > 1)
             {
           	  try{

           			for (int i = 0; i < request.getParameterValues("ids").length; i++)
                 	  	{

           				database.update("delete from users where idUsers = "+request.getParameterValues("ids")[i]);

                 	  	}
           	     }

           		  catch (Exception e) { e.printStackTrace();

           	      }  finally {

           	      }
           	  }

        }

      try{

    		database.finalize();
  	  } catch (SQLException e) {

			e.printStackTrace();
		} catch (Throwable e) {

			e.printStackTrace();
		}

    	return mapping.findForward("success");

    }

}