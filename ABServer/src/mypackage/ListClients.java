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


import abItemsShow.ClientShow;
import abItemsShow.ContractsShow;
import abItemsShow.PersonalShow;

import com.mysql.jdbc.Statement;
import com.thoughtworks.xstream.XStream;

import database.DataSourceConnection;

import tablespackage.Clients;
import tablespackage.Contracts;
import tablespackage.Expensescategories;
import tablespackage.Personals;
import tablespackage.Rooms;
import tablespackage.Venues;

import HibernatePackage.Hiber_Clients;
import HibernatePackage.Hiber_Contracts;
import HibernatePackage.Hiber_Personals;
////import HibernatePackage.HibernateUtil;

public class ListClients extends org.apache.struts.action.Action {
    
    // Global Forwards
    public static final String GLOBAL_FORWARD_start = "start"; 

    // Local Forwards

    
    public ListClients() {
    }
    
    public ActionForward execute(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
      Hiber_Clients HC=new Hiber_Clients();
      Hiber_Contracts HCon=new Hiber_Contracts();
      Hiber_Personals HP=new Hiber_Personals();
      HttpSession session=request.getSession(true);
      SimpleDateFormat s=new SimpleDateFormat("dd-MMM-yyyy",Locale.US);
  	  XStream xstream = new XStream();
  	  
  	// create and intialize the database connection////////////
		DataSourceConnection database = new DataSourceConnection();
		database.initializeConnecton(this.servlet);
  	  
  	  
      if(request.getParameter("task").equals("list"))
      {
	      ArrayList<Clients> c=HC.getClients(database,request);
	  //    ArrayList persons=HP.getPersons();
	      // //////System.out.println("length= "+persons.size());
	      ArrayList<ClientShow> al=new ArrayList<ClientShow>();
	      for(int i=0;i<c.size();i++)
	      {// //////System.out.println("ana goa for1");
	    	  Clients cc=c.get(i);
	    	  ClientShow cs=new ClientShow();
	    	  Personals p=HC.getClientPersonal(cc.getClientMain(), database);
	    	  if(p!=null)
	    	  {
				  cs.setPersonFName(p.getPersonFirstName());
				  cs.setPersonLName(p.getPersonLastName());
				  cs.setPersonMobile(p.getPersonMobile());
				  cs.setPersonTelePhone(p.getPersonTelePhone());
				  cs.setPersonTitle(p.getPersonTitle());
				  cs.setPersonEmail(p.getPersonEmail());	    	  
		    	  cs.setClientAddress(cc.getClientAddress());
		    	  cs.setClientApp(cc.getClientApp());
		    	  cs.setPersonDep(p.getPersonAddress());
	    	  }
	    	  SimpleDateFormat s1=new SimpleDateFormat("dd-MMM-yyyy",Locale.US);
	    	  if(cc.getClientApproachDate()!=null)
	    	  {
	     		  String d1=s1.format(cc.getClientApproachDate());
	     		  cs.setClientApproachDate(d1);
	    	  }
	    	  else
	    		  cs.setClientApproachDate(null);
	    	  cs.setClientApproachPerson(cc.getClientApproachPerson());
	    	  cs.setClientColor(cc.getClientColor());
	    	  cs.setClientInfo(cc.getClientInfo());
	    	  cs.setClientName(cc.getClientName());
	    	//  cs.setClientWorkDate(cc.getClientWorkDate());
	    	//  SimpleDateFormat s=new SimpleDateFormat("dd-MMM-yyyy",Locale.US);
	    	  if(cc.getClientWorkDate() != null)
	    	  {
	     		  String d=s.format(cc.getClientWorkDate());
	     		  cs.setClientWorkDate(d);
	    	  }
	    	  else
	    		  cs.setClientWorkDate(null);
	    	  cs.setIdClients(cc.getIdClients());
//	    	  for(int j=0;j<persons.size();j++)
//	    		{// //////System.out.println("ana goa for2");
//	    			Personals pp=(Personals)persons.get(j);
//	    			if(p != null && p.getIdPersonals() != null && p.getIdPersonals().equals(pp.getIdPersonals()))
//	    			{// //////System.out.println("an agoa el if");
//	    				//cs.sesetPersonEmail(pp.getPersonEmail());
//	    				cs.setPersonFName(pp.getPersonFirstName());
//	    				cs.setPersonLName(pp.getPersonLastName());
//	    				cs.setPersonMobile(pp.getPersonMobile());
//	    				cs.setPersonTelePhone(pp.getPersonTelePhone());
//	    				cs.setPersonTitle(pp.getPersonTitle());
//	    				cs.setPersonEmail(pp.getPersonEmail());
//	    			}
//	    		}
	    	  al.add(cs);
	      }
	      xstream.alias("Clients", ClientShow.class);
	        String returnText = xstream.toXML(al);
	        // //////System.out.println("return text = "+returnText);
	        response.setContentType("application/xml;charset=UTF-8"); 
	        PrintWriter out = response.getWriter();
			out.write(returnText);
      }
  	else if(request.getParameter("task").equals("listP"))
	{
		Integer id=(Integer)session.getAttribute("clientId");
		// //////System.out.println("ana goa el action "+id);
		Clients c=HC.getClientById(id, database);
		PersonalShow p=HP.getPersonById(c.getClientMain(), database);
    	ArrayList<PersonalShow>l=new ArrayList<PersonalShow>();
    	l.add(p);
    	ArrayList<Integer> pp=HP.getClientPs(id, database);
    	// //////System.out.println("size of personals = "+pp.size());
    	for(int i=0;i<pp.size();i++)
    	{
    		PersonalShow ps=HP.getPersonById(pp.get(i), database);
    		l.add(ps);
    	}
        xstream.alias("Personals", PersonalShow.class);
	        String returnText = xstream.toXML(l);
	        // //////System.out.println(l.size());
	        // //////System.out.println("return text = "+returnText);
	        response.setContentType("application/xml;charset=UTF-8"); 
	        PrintWriter out = response.getWriter();
			out.write(returnText);
			
	}
  	else if(request.getParameter("task").equals("listC"))
  	{
  		// //////System.out.println("ana geeeeeet"+session.getAttribute("clientId"));
    	ArrayList<ClientShow> l=new ArrayList<ClientShow>();
    	Integer id=(Integer)session.getAttribute("clientId");
    	Clients c=HC.getClientById(id, database);
    	ClientShow v=new ClientShow();
    	v.setClientAddress(c.getClientAddress());
    	v.setClientApp(c.getClientApp());
    	SimpleDateFormat s1=new SimpleDateFormat("dd-MMM-yyyy",Locale.US);
    	if(c.getClientApproachDate()!=null)
    	{
			String d1=s1.format(c.getClientApproachDate());
			v.setClientApproachDate(d1);
    	}
    	else
    		v.setClientApproachDate(null);
		v.setClientApproachPerson(c.getClientApproachPerson());
    	v.setClientColor(c.getClientColor());
    	v.setClientInfo(c.getClientInfo());
    	v.setClientName(c.getClientName());
    	//SimpleDateFormat s=new SimpleDateFormat("dd-MMM-yyyy",Locale.US);
    	if(c.getClientWorkDate()!=null)
    	{
		String d=s.format(c.getClientWorkDate());
		v.setClientWorkDate(d);
    	}
    	else
    		v.setClientWorkDate(null);
		v.setIdClients(c.getIdClients());
    	l.add(v);
        xstream.alias("Clients", ClientShow.class);
	        String returnText = xstream.toXML(l);
	        // //////System.out.println(l.size());
	        // //////System.out.println("return text = "+returnText);
	        response.setContentType("application/xml;charset=UTF-8"); 
	        PrintWriter out = response.getWriter();
			out.write(returnText);
			// //////System.out.println("an ba3d el out");
  	}
      else if(request.getParameter("task").equals("AddClient"))
      {
    	  Clients c=new Clients();
    	  c.setClientAddress(request.getParameter("clientAddress"));
    	  c.setClientApp(request.getParameter("clientApp"));
    	  c.setClientApproachPerson(request.getParameter("clientApproachPerson"));
    	  c.setClientName(request.getParameter("clientName"));
    	  String workDate=null;
          if(!request.getParameter("clientWorkDate").equals("3000-01-01"))
        	  workDate=request.getParameter("clientWorkDate");
          String appDate=null;
          if(!request.getParameter("clientApproachDate").equals("3000-01-01"))
        	  appDate=request.getParameter("clientApproachDate");
          
    	  Personals p=new Personals();
    	  p.setPersonAddress(request.getParameter("personAddress"));
    	  p.setPersonEmail(request.getParameter("personEmail"));
    	  p.setPersonFirstName(request.getParameter("personFirstName"));
    	  p.setPersonLastName(request.getParameter("personLastName"));
    	  p.setPersonMobile(request.getParameter("personMobile").toString());
    	  p.setPersonTelePhone(request.getParameter("personTelePhone").toString());
    	  p.setPersonTitle(request.getParameter("personTitle"));
    	  HC.insertClient(c,workDate,appDate, database);
    	  Integer id=HC.getLastOne(database);
    	  HP.insertPersonal(p, database);
    	  Integer pId=HP.getLastOne(database);
    	  HC.insertMMPersonal(id, pId, database);
    	  Clients Tc=new Clients();
    	  Tc.setIdClients(id);
    	  Tc.setClientMain(pId);
    	  HC.update(Tc, database);
		    	
      }
      else if(request.getParameter("task").equals("EditClient"))
  		{
  			  Integer id=(Integer)session.getAttribute("clientId");
  			  Clients c=new Clients();
  			  c.setIdClients(id);
	    	  c.setClientAddress(request.getParameter("clientAddress"));
	      	  c.setClientApp(request.getParameter("clientApp"));
	      	  c.setClientApproachPerson(request.getParameter("clientApproachPerson"));
	      	  c.setClientColor(request.getParameter("clientColor"));
	      	  c.setClientName(request.getParameter("clientName"));
	      	String workDate=null;
	          if(!request.getParameter("clientWorkDate").equals("3000-01-01"))
	        	  workDate=request.getParameter("clientWorkDate");
	          String appDate=null;
	          if(!request.getParameter("clientApproachDate").equals("3000-01-01"))
	        	  appDate=request.getParameter("clientApproachDate");
	          
	      	  HC.updateClient(c,workDate,appDate, database);
  		}
      else if(request.getParameter("task").equals("DELETESELECTIONS"))
      {
    	  if (request.getParameterValues("ids").length == 1)
          {
        	  try{
        			
      			
        			database.update("delete from clients where idClients = "+request.getParameterValues("ids")[0]);
        			database.finalize();
        	  } catch (SQLException e) {

      			e.printStackTrace();
      		} catch (Throwable e) {

      			e.printStackTrace();
      		}
        	  
          }
          else if (request.getParameterValues("ids").length > 1)
          {
        	  try{
        		
        			for (int i = 0; i < request.getParameterValues("ids").length; i++) 
              	  	{
        				
        				database.update("delete from clients where idClients = "+request.getParameterValues("ids")[i]);
            			
              	  	}
        	     }
        			
        		  catch (Exception e) { e.printStackTrace();
        	          
        	      }  finally { 
        	           
        	      }
        	  }  

      }
      else if(request.getParameter("task").equals("AddContact"))
  		{
  				Personals p=new Personals();
  				Integer id=(Integer)session.getAttribute("clientId");
  				p.setPersonAddress(request.getParameter("personAddress"));
	    		p.setPersonEmail(request.getParameter("personEmail"));
	    		p.setPersonFirstName(request.getParameter("personFirstName"));
	    		p.setPersonLastName(request.getParameter("personLastName"));
	    		p.setPersonMobile(request.getParameter("personMobile"));
	    		p.setPersonTelePhone(request.getParameter("personTelePhone"));
	    		p.setPersonTitle(request.getParameter("personTitle"));
	    		HP.insertPersonal(p, database);
	      	    Integer pId=HP.getLastOne(database);
	      	    HC.insertMMPersonal(id, pId, database);
	      	    if(request.getParameter("mainContact").equals("0"))
	    		{
	    			Integer cID=(Integer)session.getAttribute("clientId");
	   	        	Clients Tc=new Clients();
	   	        	Tc.setIdClients(cID);
	   	        	Tc.setClientMain(pId);
	   		    	//	Tc.setClientMain(p);
	   		    	HC.update(Tc, database);	
	    		}
	     
  		
  	}
      else if(request.getParameter("task").equals("EditContact"))
  		{
  				Integer id=Integer.valueOf(request.getParameter("id"));
  				Personals Tc=new Personals();
  				Tc.setIdPersonals(id);
	    		Tc.setPersonAddress(request.getParameter("personAddress"));
	    		Tc.setPersonEmail(request.getParameter("personEmail"));
	    		Tc.setPersonFirstName(request.getParameter("personFirstName"));
	    		Tc.setPersonLastName(request.getParameter("personLastName"));
	    		Tc.setPersonTelePhone(request.getParameter("personTelePhone").toString());
	    		Tc.setPersonMobile(request.getParameter("personMobile").toString());
	    		Tc.setPersonTitle(request.getParameter("personTitle"));
	    		HP.updateContact(Tc, database);
	    		//System.out.println("mai contact= "+request.getParameter("mainContact1"));
	    		if(request.getParameter("mainContact1").equals("0"))
	    		{
	 	        	Integer cID=(Integer)session.getAttribute("clientId");
	 	        	Clients c=new Clients();
	 	        	c.setIdClients(cID);
 		    		//Personals p=new Personals();
 		    		//p.setIdPersonals(id);
 		    		c.setClientMain(id);
 		    		HC.update(c, database);
	    		}
  	}
      else if(request.getParameter("task").equals("listCon"))
      {
    	  Integer id=(Integer)session.getAttribute("clientId");
    	  ArrayList<Contracts> con=HCon.getContractsById(id, database);
    	  ArrayList<ContractsShow> cShow=new ArrayList<ContractsShow>();
    	  for(int i=0;i<con.size();i++)
      	{
    		ContractsShow e=new ContractsShow();
    		Contracts c=(Contracts)con.get(i);
      		e.setContractFee(c.getContractFee());
      		if(c.getContractFundType().equals(1))
    			e.setContractFundType("Funded By IMC");
    		else
    		{
    			e.setContractFundType("Not Funded");
    			if(c.getContractRateType().equals(1))
    				e.setContractRateType("International");
    			else if(c.getContractRateType().equals(2))
    				e.setContractRateType("Local");
    			else if(c.getContractRateType().equals(3))
    				e.setContractRateType("Other");
    		}
    		e.setProposalID(c.getContractProposalId());
    		if(c.getContractProactiveType().equals(1))
    			e.setContractProactiveType("Proactive");
    		else
    			e.setContractProactiveType("Reactive");
    		
    		if(c.getContractDateOfRequest()!=null)
    		{
        		String dat=s.format(c.getContractDateOfRequest());
    			e.setContractDateOfRequest(dat);
    		}
    		else
    			e.setContractDateOfRequest(null);
    		
    		if(c.getContractFirstStartDate()!=null)
    		{
        		String dat=s.format(c.getContractFirstStartDate());
    			e.setContractFirstStartDate(dat);
    		}
    		else
    			e.setContractFirstStartDate(null);
    		
    		if(c.getContractFirstEndDate()!=null)
    		{
    			String dat=s.format(c.getContractFirstEndDate());
    			e.setContractFirstEndDate(dat);
    		}
    		else
    			e.setContractFirstEndDate(null);
    		
    		e.setContractDealPerson(c.getContractDealPerson());
      		cShow.add(e);
      	}
          xstream.alias("Contracts", ContractsShow.class);
	        String returnText = xstream.toXML(cShow);
	        // //////System.out.println(cShow.size());
	        // //////System.out.println("return text = "+returnText);
	        response.setContentType("application/xml;charset=UTF-8"); 
	        PrintWriter out = response.getWriter();
			out.write(returnText);
      }
      else if(request.getParameter("task").equals("DELETECONTACT"))
      {
  		Integer vID=(Integer)session.getAttribute("clientId");
	        if (request.getParameterValues("ids").length == 1)
          {
        	  try{
      			
        		  database.update("delete from clientpersonal where ClientPersonals_idPersonals = "+request.getParameterValues("ids")[0]+" and ClientsPersonal_idClients="+vID);
      			
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
        				
        				database.update("delete from clientpersonal where ClientPersonals_idPersonals = "+request.getParameterValues("ids")[i]+" and ClientsPersonal_idClients="+vID);
            			
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
    {
    	 Calendar cal = Calendar.getInstance();
    	 cal.set(cal.YEAR,Integer.parseInt(s.substring(0,4)) );// //////System.out.println(s.substring(0,4));
    	 cal.set(cal.MONTH, Integer.parseInt(s.substring(5,7))-1);// //////System.out.println(s.substring(5,7));
    	 cal.set(cal.DATE, Integer.parseInt(s.substring(8,10)));// //////System.out.println(s.substring(8,10));
    	 // //////System.out.println(cal.getTime());
    	 return cal.getTime();
    }
}