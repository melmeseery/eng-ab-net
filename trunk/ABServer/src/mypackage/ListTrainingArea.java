package mypackage;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import abItemsShow.CShow;
import tablespackage.Courses;
import tablespackage.Coursetypes;
import tablespackage.Datashows;
import tablespackage.Suppliers;
import tablespackage.Trackcourses;
import tablespackage.Trainingareas;
import HibernatePackage.Hiber_Courses;
import HibernatePackage.Hiber_TA;
//import HibernatePackage.HibernateUtil;

import com.mysql.jdbc.Statement;
import com.thoughtworks.xstream.XStream;

import database.DataSourceConnection;

public class ListTrainingArea extends org.apache.struts.action.Action {
    
    // Global Forwards
    public static final String GLOBAL_FORWARD_start = "start"; 

    // Local Forwards

    
    public ListTrainingArea() {
    }
    
    public ActionForward execute(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
    	Hiber_Courses HC=new Hiber_Courses();
    	Hiber_TA HTA=new Hiber_TA();
    	XStream xstream = new XStream();
    	 HttpSession session=request.getSession(true);
    
    	// create and intialize the database connection////////////
 		DataSourceConnection database = new DataSourceConnection();
 		database.initializeConnecton(this.servlet);
    	 
    	if(request.getParameter("task").equals("list"))
    	{
	    	ArrayList cTA=HTA.getCourseTA(database);
	        xstream.alias("Trainingareas", Trainingareas.class);
	        String returnText = xstream.toXML(cTA);
	        // //////System.out.println("return text = "+returnText);
	        response.setContentType("application/xml;charset=UTF-8"); 
	        PrintWriter out = response.getWriter();
			out.write(returnText);
    	}
		
		else if(request.getParameter("task").equals("editTA"))
    	{// //////System.out.println("ana goa el update");
    		Integer id=(Integer)session.getAttribute("TAID");
    		Trainingareas s=new Trainingareas();
	    	s.setTrainingAreaCode(request.getParameter("trainingAreaCode"));
	    	s.setTrainingAreaName(request.getParameter("trainingAreaName"));
	    	s.setIdTrainingAreas(id);
	    	HTA.update(s, database);
    	}
    	
		else if(request.getParameter("task").equals("listT"))
   	 	{
   		// // //////System.out.println("ana geeeeeet"+session.getAttribute("TAID"));
			
        	ArrayList<Trainingareas> l=new ArrayList<Trainingareas>();
        	Integer id=(Integer)session.getAttribute("TAID");
        	Trainingareas c=HTA.getTAById(id, database);
        	l.add(c);
        	 xstream.alias("Trainingareas", Trainingareas.class);
 	        String returnText = xstream.toXML(l);
 	        // //////System.out.println(l.size());
 	        //System.out.println("return text = "+returnText);
 	        response.setContentType("application/xml;charset=UTF-8"); 
 	        PrintWriter out = response.getWriter();
 			out.write(returnText);
   	 		}
		 else if(request.getParameter("task").equals("listC"))
	     	{
	     		Integer id=(Integer)session.getAttribute("TAID");
	     		ArrayList<Courses> l=HC.getCoursesById(id, database);
	     		ArrayList<CShow> cShow=new ArrayList<CShow>();
	     	//	ArrayList<Coursetypes> cTypes=HC.getCourseType();
	         	for(int i=0;i<l.size();i++)
	         	{
	         		Courses c=l.get(i);
	         	//	Coursetypes cT=c.getCourse_2();
	         		CShow cNew=new CShow();
	         		cNew.setIdCourses(c.getIdCourses());
	         		cNew.setCourseDays(c.getCourseDays());
	         		cNew.setCourseNameEng(c.getCourseNameEng());
	         		cNew.setCourseCode(c.getCourseCode());
	         		if(c.getIdCourseTypes().equals(1))
	        			cNew.setCourseType("Group");
	        		else if(c.getIdCourseTypes().equals(2))
	        			cNew.setCourseType("Individual");
	        		else if(c.getIdCourseTypes().equals(3))
	        			cNew.setCourseType("Both");
	         		cShow.add(cNew);
	         		
	         	}
	             xstream.alias("Course", CShow.class);
	             String returnText = xstream.toXML(cShow);
	             // //////System.out.println("return text = "+returnText);
	             response.setContentType("application/xml;charset=UTF-8"); 
	             PrintWriter out = response.getWriter();
	     		 out.write(returnText);
	     	}
		 else if(request.getParameter("task").equals("AddCourse"))
		 {
			  Courses c=new Courses();
	        //	Coursetypes ct=new Coursetypes();
	        //	Trainingareas cta=new Trainingareas();
	        	// //////System.out.println("course Type "+request.getParameter("courseType"));
	        	if(request.getParameter("courseType").equals("Group"))
	        	{
	        		c.setIdCourseTypes(1);
	        	}
	        	else if(request.getParameter("courseType").equals("Individual"))
	        	{
	        		c.setIdCourseTypes(2);
	        	}
	        	else if(request.getParameter("courseType").equals("Both"))
	        	{
	        		c.setIdCourseTypes(3);
	        	}
	        //	cta.setIdTrainingAreas((Integer)session.getAttribute("TAID"));
	        //	c.setCourse_1(cta);
	        	c.setCourseCode(request.getParameter("courseCode"));
	        	c.setCourseDays(new Integer(Integer.parseInt(request.getParameter("courseDays"))));
	        	c.setCourseNameEng(request.getParameter("courseNameEng"));
	        	c.setIdTrainingArea((Integer)session.getAttribute("TAID"));
	        	int taId = 0;
	        	if((Integer)session.getAttribute("TAID") != null)
	        	taId = (Integer)session.getAttribute("TAID");
	        	else{
	        		
	        		taId = Integer.parseInt(request.getParameter("TAID"));
	        	}
	        	
	        	c.setIdTrainingArea(taId);
	        	HC.insertCourse(c, database);
			 
		 }
		 else if(request.getParameter("task").equals("EditCourse"))
		 {
	    		  Integer id=Integer.valueOf(request.getParameter("id"));
	    		  Courses s=new Courses();
	    		  s.setIdCourses(id);
		    	  s.setCourseCode(request.getParameter("courseCode"));
		    	  s.setCourseDays(Integer.valueOf(request.getParameter("courseDays")));
		    	  s.setCourseNameEng(request.getParameter("courseNameEng"));
		    	  if(request.getParameter("courseType").equals("Group"))
		        	{
		        		s.setIdCourseTypes(1);
		        	}
		        	else if(request.getParameter("courseType").equals("Individual"))
		        	{
		        		s.setIdCourseTypes(2);
		        	}
		        	else if(request.getParameter("courseType").equals("Both"))
		        	{
		        		s.setIdCourseTypes(3);
		        	}
		    	 HC.updatecourseTA(s, database);
		 }
		 else if(request.getParameter("task").equals("DELETESELECTIONS"))
		 {											  
			    	
	              if (request.getParameterValues("ids").length == 1)
	              {
	            	  ArrayList<Courses>c=HC.getCoursesById(Integer.valueOf(request.getParameterValues("ids")[0]), database);
	            	//  ////System.out.println("size= "+c.size());
	            	  for(int i=0;i<c.size();i++)
	            	  {
	            		  Integer id=c.get(i).getIdCourses();
	              		      Courses s=HC.getCourseById(id, database);
	                 	      Trainingareas t=HTA.getMiscID("Miscellanies", database);
		          	    	 // ////System.out.println("id= "+t.getIdTrainingAreas()+" name= "+t.getTrainingAreaName());
		          	    	  s.setIdTrainingArea(t.getIdTrainingAreas());
		          	    	  HC.updateCourseTA(s, database);
	          	    	
	              		
	            	  }
	            	  String hql = "delete from trainingareas where idTrainingareas = "+request.getParameterValues("ids")[0]+" and trainingAreaName != 'Miscellanies'";
	            	  try{
	            			
	            			database.update(hql);
	            			
	            		}
	            		  catch (Exception e) { //System.out.println("delete");e.printStackTrace();
	            	          
	            	      }  finally { 
	            	           
	            	      }
	              }
	              else if (request.getParameterValues("ids").length > 1)
	              {
	            	  for (int i = 0; i < request.getParameterValues("ids").length; i++) 
	            	  {	
	            		  ArrayList<Courses>c=HC.getCoursesById(Integer.valueOf(request.getParameterValues("ids")[i]), database);
	            		  for(int j=0;j<c.size();j++)
		            	  {
		            		  	  Integer id=c.get(j).getIdCourses();
		              		      Courses s=HC.getCourseById(id, database);
		                 	      Trainingareas t=HTA.getMiscID("Miscellanies", database);
			          	    	 // ////System.out.println("id= "+t.getIdTrainingAreas()+" name= "+t.getTrainingAreaName());
			          	    	  s.setIdTrainingArea(t.getIdTrainingAreas());
			          	    	  HC.updateCourseTA(s, database);
		          	    	
		              		
		            	  }
		            	  String hql = "delete from trainingareas where idTrainingareas = "+request.getParameterValues("ids")[i]+" and trainingAreaName != 'Miscellanies'";
		            	  try{
		            			
		            		  database.update(hql);
		            			
		            		}
		            		  catch (Exception e) { //System.out.println("deleteee");e.printStackTrace();
		            	          
		            	      }  finally { 
		            	           
		            	      }
	              }
	         }
	              
		 }
		 else if(request.getParameter("task").equals("DELETE"))
         {
			 if(request.getParameter("Tname").equals("Miscellanies"))
			 {
				 if (request.getParameterValues("ids").length == 1)
	             {
	           	  try{
	         			
	         			
	           		database.update("delete from courses where idCourses = "+request.getParameterValues("ids")[0]);
	         			
	         		}
	         		  catch (Exception e) { 
	         	          
	         	      }  
	           	  
	             }
	             else if (request.getParameterValues("ids").length > 1)
	             {
	           	  try{
	           			
	           			for (int i = 0; i < request.getParameterValues("ids").length; i++) 
	                 	  	{
	           				
	           				database.update("delete from courses where idCourses = "+request.getParameterValues("ids")[i]);
	               			
	                 	  	}
	           	     }
	           			
	           		  catch (Exception e) { 
	           	          
	           	      }  
	           	  }  

			 }
			 else if (request.getParameterValues("ids").length == 1 )
             {
        		 Courses s=new Courses();
        		 s.setIdCourses(Integer.valueOf(request.getParameterValues("ids")[0]));
        		 Trainingareas t=HTA.getMiscID("Miscellanies", database);
      	    	 s.setIdTrainingArea(t.getIdTrainingAreas());
           	  	 HC.updateCourseTA(s, database);
           	  
             }
             else if (request.getParameterValues("ids").length > 1)
             {
            	 for (int i = 0; i < request.getParameterValues("ids").length; i++) 
          	  	{
            	 Courses s=new Courses();
        		 s.setIdCourses(Integer.valueOf(request.getParameterValues("ids")[i]));
        		 Trainingareas t=HTA.getMiscID("Miscellanies", database);
      	    	 s.setIdTrainingArea(t.getIdTrainingAreas());
           	  	 HC.updateCourseTA(s, database);
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