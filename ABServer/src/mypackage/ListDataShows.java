package mypackage;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;


import abItemsShow.CoordinateHistoryShow;
import abItemsShow.DSShow;
import abItemsShow.DataMainShow;
import tablespackage.Datashows;
import tablespackage.Datashowsmaintainance;
import tablespackage.Pricegrouphistory;
import tablespackage.Suppliers;
import tablespackage.Trainingcoordinatehistory;
import tablespackage.Trainingcoordinators;
import HibernatePackage.Hiber_DataShows;
import HibernatePackage.Hiber_DatashowsMaintainance;
//import HibernatePackage.HibernateUtil;

import com.mysql.jdbc.Statement;
import com.thoughtworks.xstream.XStream;

import database.DataSourceConnection;

public class ListDataShows extends org.apache.struts.action.Action {
    
    // Global Forwards
    public static final String GLOBAL_FORWARD_start = "start"; 

    // Local Forwards

    
    public ListDataShows() {
    }
    
    public ActionForward execute(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
    	Hiber_DataShows HD=new Hiber_DataShows();
    	Hiber_DatashowsMaintainance HDM=new Hiber_DatashowsMaintainance();
    	XStream xstream = new XStream();
    	HttpSession session=request.getSession(true);
    	
      	// create and intialize the database connection////////////
		DataSourceConnection database = new DataSourceConnection();
		database.initializeConnecton(this.servlet);
    	
    	if(request.getParameter("task").equals("list"))
    	{
	    	ArrayList datashows=HD.getDataShows(database);
	    	ArrayList<DSShow> ds=new ArrayList<DSShow>();
	    	for(int i=0;i<datashows.size();i++)
	    	{
	    		Datashows d=(Datashows)datashows.get(i);
	    		DSShow dShow=new DSShow();
	    		dShow.setDatashowInfo(d.getDatashowInfo());
	    		dShow.setDatashowName(d.getDatashowName());
	    		dShow.setDatashowPrice(d.getDatashowPrice());
	    	//	dShow.setDatashowsmaintainance(d.getDatashowsmaintainance());
	    		dShow.setIdDatashows(d.getIdDatashows());
	    		SimpleDateFormat s=new SimpleDateFormat("dd-MMM-yyyy",Locale.US);
	    		if(d.getDatashowPurchaseDate()!=null)
	    		{
	    		String dat=s.format(d.getDatashowPurchaseDate());
	    		////System.out.println(dat);
	    		dShow.setDatashowPurchaseDate(dat);
	    		}
	    		else
	    			dShow.setDatashowPurchaseDate(null);
	    		ds.add(dShow);
	    	}
	        xstream.alias("Datashows", DSShow.class);
	        String returnText = xstream.toXML(ds);
	       // ////System.out.println(ds.get(0).getDatashowPurchaseDate());
	        ////System.out.println("return text = "+returnText);
	        response.setContentType("application/xml;charset=UTF-8"); 
	        PrintWriter out = response.getWriter();
			out.write(returnText);
    	}
    	else if(request.getParameter("task").equals("AddDatashow"))
    	{
    		Datashows d=new Datashows();
    		String[] costs=request.getParameterValues("costs");
    		d.setDatashowInfo(request.getParameter("datashowInfo"));
    		d.setDatashowName(request.getParameter("datashowName"));
    		d.setDatashowPrice(request.getParameter("datashowPrice"));
    		Boolean b=true;
    		d.setDatashowValid(b);
    		String datashowPurchaseDate=null;
            if(!request.getParameter("datashowPurchaseDate").equals("3000-01-01"))
            	datashowPurchaseDate=request.getParameter("datashowPurchaseDate");
            
    		HD.insertDatashow(d,datashowPurchaseDate, database);
    		Integer id=HD.getLastOne(database);
    		 Integer len=Integer.valueOf(request.getParameter("length"));
       		// //////System.out.println("length of costs = "+len);
       		
 	    	for(int i=0;i<len;i++){
    			Datashowsmaintainance DM=new Datashowsmaintainance();
    			//Datashows t=new Datashows();
    			DM.setDatashowsMaintainanceCost(request.getParameterValues("costs")[i]);
    			String x=request.getParameterValues("dates")[i]+"x";
    			String maindate=null;
    			if(!x.equals("x"))
    				maindate=request.getParameterValues("dates")[i];
    			
        		//t.setIdDatashows(id);
        		DM.setDatashowsMaintainance(id);
        		DM.setDatashowsMaintainanceReason(request.getParameterValues("reasons")[i]);
        		HDM.insertDataMaintainance(DM,maindate, database);
    		}
    	}
//    	else if(request.getParameter("task").equals("listDM"))
//    	{
//    		ArrayList AL= new ArrayList();
//    		 xstream.alias("Datashowsmaintainance", CoordinateHistoryShow.class);
// 	        String returnText = xstream.toXML(AL);
// 	      //  // //////System.out.println(AL.size());
// 	        // //////System.out.println("return text = "+returnText);
// 	        response.setContentType("application/xml;charset=UTF-8"); 
// 	        PrintWriter out = response.getWriter();
// 			out.write(returnText);
//    	}
    	else if(request.getParameter("task").equals("DELETESELECTIONS"))
        {
    		if (request.getParameterValues("ids").length == 1)
            {
          	  try{
        			
        			
        			database.update("delete from datashows where idDatashows = "+request.getParameterValues("ids")[0]);
        			
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
          				
          				database.update("delete from datashows where idDatashows = "+request.getParameterValues("ids")[i]);
              			
                	  	}
          	     }
          			
          		  catch (Exception e) { e.printStackTrace();
          	          
          	      }  finally { 
          	           
          	      }
          	  }  
      
        }
    	else if(request.getParameter("task").equals("DELETE"))
        {
    		if (request.getParameterValues("ids").length == 1)
            {
          	  try{
        			
          		database.update("delete from datashowsmaintainance where idDatashowsMaintainance = "+request.getParameterValues("ids")[0]);
        			
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
          				
          				database.update("delete from datashowsmaintainance where idDatashowsMaintainance = "+request.getParameterValues("ids")[i]);
              			
                	  	}
          	     }
          			
          		  catch (Exception e) { e.printStackTrace();
          	          
          	      }  finally { 
          	           
          	      }
          	  }  
      
        }
    	else if(request.getParameter("task").equals("datashows"))
    	{
    		// //////System.out.println("ana geeeeeet"+session.getAttribute("datashowID"));
        	ArrayList<Datashows> l=new ArrayList<Datashows>();
        	Integer id=(Integer)session.getAttribute("datashowID");
        	Datashows c=HD.getDatashowById(id, database);
        	l.add(c);
        	 xstream.alias("Datashows", Datashows.class);
 	        String returnText = xstream.toXML(l);
 	        // //////System.out.println(l.size());
 	        // //////System.out.println("return text = "+returnText);
 	        response.setContentType("application/xml;charset=UTF-8"); 
 	        PrintWriter out = response.getWriter();
 			out.write(returnText);
    	}
    	else if(request.getParameter("task").equals("DHistory"))
    	{
    		Integer id=(Integer)session.getAttribute("datashowID");
    		ArrayList<Integer> AL=new ArrayList<Integer>();
    		AL=HDM.getDatashowsById(id, database);
    	//	ArrayList datashows=HD.getDataShows();
    		ArrayList<DataMainShow> H=new ArrayList<DataMainShow>();
    		// //////System.out.println("id= "+id);
    		for(int i=0;i<AL.size();i++)
    		{// //////System.out.println("ana goa el for "+AL.size());
    			DataMainShow DMS=new DataMainShow();
    			Datashowsmaintainance t=HDM.getDataMainById(AL.get(i), database);
    			//Datashows x=t.getDatashowsMaintainance();
    			DMS.setIdDatashowsMaintainance(t.getIdDatashowsMaintainance());
    			DMS.setDatashowsMaintainanceCost(t.getDatashowsMaintainanceCost());
    			if(t.getDatashowsMaintainanceDate()!=null)
    			{
    			SimpleDateFormat s=new SimpleDateFormat("dd-MMM-yyyy",Locale.US);
	    		String dat=s.format(t.getDatashowsMaintainanceDate());
	    		DMS.setDatashowsMaintainanceDate(dat);}
    			else
    				DMS.setDatashowsMaintainanceDate(null);
    			DMS.setDatashowsMaintainanceReason(t.getDatashowsMaintainanceReason());
//    			for(int j=0;j<datashows.size();j++)
//    			{
//    				Datashows tC=(Datashows)datashows.get(j);
//    				if(tC.getIdDatashows().equals(x.getIdDatashows()))
//    				{
//    					DMS.setDatashowsMaintainance(tC.getIdDatashows());
//    				}
//    			}
    			DMS.setDatashowsMaintainance(id);
    			H.add(DMS);
    		}
	        xstream.alias("Datashowsmaintainance", DataMainShow.class);
	        String returnText = xstream.toXML(H);
	        // //////System.out.println("size= "+H.size());
	        // //////System.out.println("return text = "+returnText);
	        response.setContentType("application/xml;charset=UTF-8"); 
	        PrintWriter out = response.getWriter();
			out.write(returnText);
    	}
    	else if(request.getParameter("task").equals("EditDatashow"))
    	{
    			Integer id=(Integer)session.getAttribute("datashowID");
    			String [] l=request.getParameterValues("costs");
	    		// //////System.out.println("length= "+l.length);
	    		Datashows Tc=new Datashows();
	    		Tc.setIdDatashows(id);
	    		Tc.setDatashowInfo(request.getParameter("datashowInfo"));
	    		Tc.setDatashowName(request.getParameter("datashowName"));
	    		Tc.setDatashowPrice(request.getParameter("datashowPrice"));
	    		String datashowSalvageDate=null;
	            if(!request.getParameter("datashowSalvageDate").equals("3000-01-01"))
	            	datashowSalvageDate=request.getParameter("datashowSalvageDate");
	    		String datashowPurchaseDate=null;
	            if(!request.getParameter("datashowPurchaseDate").equals("3000-01-01"))
	            	datashowPurchaseDate=request.getParameter("datashowPurchaseDate");
	            HD.updateDataShow(Tc,datashowSalvageDate,datashowPurchaseDate, database);
	    		if(request.getParameter("length")!=null)
	    		{
	       	      Integer len=Integer.valueOf(request.getParameter("length"));
	      		// //////System.out.println("length of costs = "+len);
	      		
		    		for(int i=0;i<len;i++)
		    		{// //////System.out.println("ana goa el for");
		    			Datashowsmaintainance tH=new Datashowsmaintainance();
		    			//Datashows t=new Datashows();
		    			tH.setDatashowsMaintainanceCost(l[i]);
		    			tH.setDatashowsMaintainanceReason(request.getParameterValues("reasons")[i]);
		    			String maindate=null;
		    			if(request.getParameterValues("dates")[i]!=null)
		    				maindate=request.getParameterValues("dates")[i];
		    			
		        		tH.setDatashowsMaintainance(id);
		        		HDM.insertDataMaintainance(tH,maindate, database);
	    		}
	    	}
    		
    	}
    	else if(request.getParameter("task").equals("AddHistory"))
    	{
    		Integer id=(Integer)session.getAttribute("datashowID");
    		Datashowsmaintainance dm=new Datashowsmaintainance();
    		dm.setDatashowsMaintainanceCost(request.getParameter("datashowsMaintainanceCost"));
    		dm.setDatashowsMaintainanceReason(request.getParameter("datashowsMaintainanceReason"));
    		String x=request.getParameter("datashowsMaintainanceDate")+"x";
    		String datashowsMaintainanceDate=null;
            if(!x.equals("x"))
            	datashowsMaintainanceDate=request.getParameter("datashowsMaintainanceDate");
            
    		dm.setDatashowsMaintainance(id);
    		HDM.insertDataMaintainance(dm,datashowsMaintainanceDate, database);
    	}
    	else if(request.getParameter("task").equals("EditHistory"))
    	{
    		  Integer id=Integer.valueOf(request.getParameter("id"));
    		  Datashowsmaintainance dm=new Datashowsmaintainance();
    		  dm.setIdDatashowsMaintainance(id);
	    	  dm.setDatashowsMaintainanceCost(request.getParameter("datashowsMaintainanceCost"));
	    	  dm.setDatashowsMaintainanceReason(request.getParameter("datashowsMaintainanceReason"));
	    	  String datashowsMaintainanceDate=null;
	          if(!request.getParameter("datashowsMaintainanceDate").equals("3000-01-01"))
	            	datashowsMaintainanceDate=request.getParameter("datashowsMaintainanceDate");
	          HDM.updateDataHistory(dm,datashowsMaintainanceDate, database);    
	    		
	    		
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
    public Date parseDate(String s) 
    {
    	 Calendar cal = Calendar.getInstance();
    	 cal.set(cal.YEAR,Integer.parseInt(s.substring(0,4)) );// //////System.out.println(s.substring(0,4));
    	 cal.set(cal.MONTH, Integer.parseInt(s.substring(5,7))-1);// //////System.out.println(s.substring(5,7));
    	 cal.set(cal.DATE, Integer.parseInt(s.substring(8,10)));// //////System.out.println(s.substring(8,10));
    	 // //////System.out.println(cal.getTime());
    	 return cal.getTime();
    }

}