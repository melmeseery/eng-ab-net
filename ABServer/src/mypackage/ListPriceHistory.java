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

import abItemsShow.PricegroupShow;
import tablespackage.Pricegrouphistory;
import HibernatePackage.Hiber_PriceHistory;
//import HibernatePackage.HibernateUtil;

import com.mysql.jdbc.Statement;
import com.thoughtworks.xstream.XStream;

import database.DataSourceConnection;

public class ListPriceHistory extends org.apache.struts.action.Action {
    
    // Global Forwards
    public static final String GLOBAL_FORWARD_start = "start"; 

    // Local Forwards

    
    public ListPriceHistory() {
    }
    
    public ActionForward execute(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
    	Hiber_PriceHistory HP=new Hiber_PriceHistory();
    	HttpSession session=request.getSession(true);
    	XStream xstream = new XStream();
    	
    	  
      	// create and intialize the database connection////////////
    		DataSourceConnection database = new DataSourceConnection();
    		database.initializeConnecton(this.servlet);
    	
    	if(request.getParameter("task").equals("list"))
    	{
	    	ArrayList resources=HP.getPricesHistory(database);
	    	ArrayList<PricegroupShow> pS=new ArrayList<PricegroupShow>();
	        xstream.alias("Pricegrouphistory", PricegroupShow.class);
	        // //////System.out.println("ana ba3d el alias");
	        for(int i=0;i<resources.size();i++)
	        {
	        	PricegroupShow p=new PricegroupShow();
	        	Pricegrouphistory pH=(Pricegrouphistory)resources.get(i);
	        	p.setIdPriceGroupHistory(pH.getIdPriceGroupHistory());
	        	p.setPriceGroupValid(pH.getPriceGroupValid());
	        	p.setPriceGroupHitoryImcClient(pH.getPriceGroupHitoryImcClient());
	        	p.setPriceGroupHitoryImcCompany(pH.getPriceGroupHitoryImcCompany());
	        	p.setPriceGroupHitoryInternational(pH.getPriceGroupHitoryInternational());
	        	p.setPriceGroupHitoryPulicClient(pH.getPriceGroupHitoryPulicClient());
	        	p.setPriceGroupHitoryPulicCompany(pH.getPriceGroupHitoryPulicCompany());
	        	SimpleDateFormat s=new SimpleDateFormat("dd-MMM-yyyy",Locale.US);
	        	if(pH.getPriceGroupValidFrom()!=null)
	        	{
					String dat=s.format(pH.getPriceGroupValidFrom());
					p.setPriceGroupValidFrom(dat);
	        	}
	        	else
	        		p.setPriceGroupValidFrom(null);
	        	
	        	p.setCurrency(pH.getCurrency());
	        	pS.add(p);
    			
	        }
	        String returnText = xstream.toXML(pS);
	        // //////System.out.println("return text = "+returnText);
	        response.setContentType("application/xml;charset=UTF-8"); 
	        PrintWriter out = response.getWriter();
			out.write(returnText);
    	}
    	else if(request.getParameter("task").equals("AddPriceGroup"))
    	{
    		
    	//	// //////System.out.println("haaaa"+request.getParameter("priceGroupValidFrom")+"????? "+request.getParameter("priceGroupValidTo"));
    		Pricegrouphistory p=new Pricegrouphistory();
    		p.setPriceGroupHitoryImcClient(request.getParameter("priceGroupHitoryImcClient"));
    		p.setPriceGroupHitoryImcCompany(request.getParameter("priceGroupHitoryImcCompany"));
    		p.setPriceGroupHitoryPulicClient(request.getParameter("priceGroupHitoryPublicClient"));
    		p.setPriceGroupHitoryPulicCompany(request.getParameter("priceGroupHitoryPublicCompany"));
    		p.setPriceGroupHitoryInternational(request.getParameter("priceGroupHitoryInternational"));
    		p.setPriceGroupValid(true);
    		String date=null;
            //	// //////System.out.println("valid from= "+request.getParameter("priveValidFrom")+" valid to "+request.getParameter("priceValidTo"));
            if(!request.getParameter("priceGroupValidFrom").equals("3000-01-01"))
            	date=request.getParameter("priceGroupValidFrom");
            	
    		p.setCurrency(request.getParameter("currency"));
    	//	Date d2=new Date();
    	//	d2=parseDate(request.getParameter("priceGroupValidTo"));
    	//	p.setPriceGroupValidTo(d2);
    		// //////System.out.println("date1= "+d+" date2= "+d2);
    		Integer pid=HP.getLastOne(database);
    		HP.update(pid, database);
    		HP.insertPriceGroup(p,date, database);
    	}
    	 else if(request.getParameter("task").equals("data"))
         {
         	Integer id=(Integer)session.getAttribute("priceGroupID");
         	// //////System.out.println(id);
         	Pricegrouphistory c=HP.getPriceGroupById(id, database);
         	// //////System.out.println(c.getPriceGroupValid());
         	ArrayList l=new ArrayList();
         	l.add(c);
              xstream.alias("Pricegrouphistory",Pricegrouphistory.class);
              String returnText = xstream.toXML(l);
              // //////System.out.println("return text = "+returnText);
              response.setContentType("application/xml;charset=UTF-8"); 
              PrintWriter out = response.getWriter();
      		
   			out.write(returnText);
   			// //////System.out.println("ana b3d el out");
          	
         }
         else if(request.getParameter("task").equals("EditPriceGroup"))
         {
         		  Integer id=(Integer)session.getAttribute("priceGroupID");
         		  Pricegrouphistory p=new Pricegrouphistory();
         		  p.setIdPriceGroupHistory(id);
         	      p.setPriceGroupHitoryImcClient(request.getParameter("priceGroupHitoryImcClient"));
         	      p.setPriceGroupHitoryImcCompany(request.getParameter("priceGroupHitoryImcCompany"));
        	      p.setPriceGroupHitoryPulicClient(request.getParameter("priceGroupHitoryPublicClient"));
        	      p.setPriceGroupHitoryPulicCompany(request.getParameter("priceGroupHitoryPublicCompany"));
         	      p.setPriceGroupHitoryInternational(request.getParameter("priceGroupHitoryInternational"));
         	     String date=null;
                 //	// //////System.out.println("valid from= "+request.getParameter("priveValidFrom")+" valid to "+request.getParameter("priceValidTo"));
                 if(!request.getParameter("priceGroupValidFrom").equals("3000-01-01"))
                 	date=request.getParameter("priceGroupValidFrom");
                 
         		p.setCurrency(request.getParameter("currency"));
         		HP.updatePrice(p,date, database);

         }
         else if(request.getParameter("task").equals("DELETESELECTIONS"))
         {
        	 if (request.getParameterValues("ids").length == 1)
             {
           	  try{
         			
         			database.update("delete from pricegrouphistory where idPriceGroupHistory = "+request.getParameterValues("ids")[0]);
         			
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
           				
           				database.update("delete from pricegrouphistory where idPriceGroupHistory = "+request.getParameterValues("ids")[i]);
               			
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
    
    public Date parseDate(String s) 
    {// //////System.out.println("date= "+s);
    	 Calendar cal = Calendar.getInstance();
    	 cal.set(cal.YEAR,Integer.parseInt(s.substring(0,4)) );// //////System.out.println(s.substring(0,4));
    	 cal.set(cal.MONTH, Integer.parseInt(s.substring(5,7))-1);// //////System.out.println(s.substring(5,7));
    	 cal.set(cal.DATE, Integer.parseInt(s.substring(8,10)));// //////System.out.println(s.substring(8,10));
    	 // //////System.out.println(cal.getTime());
    	 return cal.getTime();
    }

}