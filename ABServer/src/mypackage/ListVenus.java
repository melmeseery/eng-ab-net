package mypackage;
import java.io.PrintWriter;
import java.lang.reflect.Array;
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

import abItemsShow.MenuItemShow;
import abItemsShow.MenuShow;
import abItemsShow.PersonalShow;
import abItemsShow.RoomShow;
import abItemsShow.VShow;
import tablespackage.Datashows;
import tablespackage.Menuitems;
import tablespackage.Menus;
import tablespackage.Personals;
import tablespackage.Rooms;
import tablespackage.Trainingcoordinators;
import tablespackage.Venues;
import HibernatePackage.Hiber_Clients;
import HibernatePackage.Hiber_Courses;
import HibernatePackage.Hiber_DataShows;
import HibernatePackage.Hiber_MenuItems;
import HibernatePackage.Hiber_Menus;
import HibernatePackage.Hiber_Personals;
import HibernatePackage.Hiber_Rooms;
import HibernatePackage.Hiber_Venus;
//import HibernatePackage.HibernateUtil;

import com.mysql.jdbc.Statement;
import com.thoughtworks.xstream.XStream;

import database.DataSourceConnection;

public class ListVenus extends org.apache.struts.action.Action {
    
    // Global Forwards
    public static final String GLOBAL_FORWARD_start = "start"; 

    // Local Forwards

    
    public ListVenus() {
    }
    
    public ActionForward execute(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
    	Hiber_Venus HV=new Hiber_Venus();
    	Hiber_Rooms HR=new Hiber_Rooms();
    	Hiber_Menus HM=new Hiber_Menus();
    	Integer menuID=0;
    	SimpleDateFormat s=new SimpleDateFormat("dd-MMM-yyyy",Locale.US);
    	Hiber_MenuItems HMI=new Hiber_MenuItems();
    	Hiber_Personals HP=new Hiber_Personals();
    	HttpSession session=request.getSession(true);
    	XStream xstream = new XStream();
    	
      	// create and intialize the database connection////////////
		DataSourceConnection database = new DataSourceConnection();
		database.initializeConnecton(this.servlet);
    	
    	/*--------------------------------------Venues Functions----------------------------------------*/
    	if(request.getParameter("task").equals("list"))
    	{
	    	ArrayList venus=HV.getVenus(database);
	    //	ArrayList persons=HP.getPersons();
	    	ArrayList<VShow> al=new ArrayList<VShow>();
	    	for(int i=0;i<venus.size();i++)
	    	{
	    		VShow vS=new VShow();
	    		Venues v=(Venues)venus.get(i);
	    		Personals p=HV.getVenuePersonal(v.getPersonals(), database);
	    		vS.setIdVenues(v.getIdVenues());
	    		vS.setVenueAddress(v.getVenueAddress());
	    		vS.setVenueDistrict(v.getVenueDistrict());
	    		vS.setVenueName(v.getVenueName());
	    		vS.setVenuMainContact(v.getVenuMainContact().toString());
//	    		for(int j=0;j<persons.size();j++)
//	    		{
//	    			Personals pp=(Personals)persons.get(j);
//	    			if(p.getIdPersonals().equals(pp.getIdPersonals()))
//	    			{
//	    				vS.setPersonEmail(pp.getPersonEmail());
//	    				vS.setPersonFName(pp.getPersonFirstName());
//	    				vS.setPersonLName(pp.getPersonLastName());
//	    			}
//	    		}
	    		vS.setPersonEmail(p.getPersonEmail());
				vS.setPersonFName(p.getPersonFirstName());
				vS.setPersonLName(p.getPersonLastName());
	    		al.add(vS);
	    	}
	        
	        xstream.alias("Venues", VShow.class);
	        String returnText = xstream.toXML(al);
	        // //////System.out.println("return text = "+returnText);
	        response.setContentType("application/xml;charset=UTF-8"); 
	        PrintWriter out = response.getWriter();
			out.write(returnText);
    	}
    	else if(request.getParameter("task").equals("AddVenue"))
    	{
    		Venues v=new Venues();
    		v.setVenueAddress(request.getParameter("venueAddress"));
    		v.setVenueDistrict(request.getParameter("venueDistrict"));
    		v.setVenueName(request.getParameter("venueName"));
    		v.setVenuMainContact(request.getParameter("venueMainContact").toString());
    		Personals p=new Personals();
    		p.setPersonAddress(request.getParameter("personAddress"));
    		p.setPersonEmail(request.getParameter("personEmail"));
    		p.setPersonFirstName(request.getParameter("personFirstName"));
    		p.setPersonLastName(request.getParameter("personLastName"));
    		p.setPersonMobile(request.getParameter("personMobile").toString());
    		p.setPersonTelePhone(request.getParameter("personTelePhone").toString());
    		p.setPersonTitle(request.getParameter("personTitle"));
    		HP.insertPersonal(p, database);
    		Integer pid=HP.getLastOne(database);
    		//	v.setPersonals(p);
    		v.setPersonals(pid);
    		HV.insertVenue(v, database);
    		Integer id=HV.getLastOne(database);
    		HP.insertRelationPersonal(id, pid, database);
    		
    	}
    	else if(request.getParameter("task").equals("listV"))
    	{
    		// //////System.out.println("ana geeeeeet"+session.getAttribute("venueID"));
        	ArrayList<VShow> l=new ArrayList<VShow>();
        	Integer id=(Integer)session.getAttribute("venueID");
        	Venues c=HV.getVenueById(id, database);
        	VShow v=new VShow();
        	v.setIdVenues(c.getIdVenues());
        	v.setVenueAddress(c.getVenueAddress());
        	v.setVenueDistrict(c.getVenueDistrict());
        	v.setVenueName(c.getVenueName());
        	v.setVenuMainContact(c.getVenuMainContact());
        	
        	l.add(v);
            xstream.alias("Venues", VShow.class);
 	        String returnText = xstream.toXML(l);
 	        // //////System.out.println(l.size());
 	        // //////System.out.println("return text = "+returnText);
 	        response.setContentType("application/xml;charset=UTF-8"); 
 	        PrintWriter out = response.getWriter();
 			out.write(returnText);
 			// //////System.out.println("an ba3d el out");
    	}
    	else if(request.getParameter("task").equals("EditVenue"))
    	{
    			Integer id=(Integer)session.getAttribute("venueID");
    			Venues Tc=new Venues();
    			Tc.setIdVenues(id);
	    		Tc.setVenueAddress(request.getParameter("venueAddress"));
	    		Tc.setVenueDistrict(request.getParameter("venueDistrict"));
	    		Tc.setVenueName(request.getParameter("venueName"));
	    		Tc.setVenuMainContact(request.getParameter("venueMainContact"));
	    		HV.updateVenue(Tc, database);
    	}
    	else if(request.getParameter("task").equals("DELETESELECTIONS"))
        {
    		if (request.getParameterValues("ids").length == 1)
            {
          	  try{
        			
          		database.update("delete from venues where idVenues = "+request.getParameterValues("ids")[0]);
        			
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
          				
          				database.update("delete from venues where idVenues = "+request.getParameterValues("ids")[i]);
              			
                	  	}
          	     }
          			
          		  catch (Exception e) { e.printStackTrace();
          	          
          	      }  finally { 
          	           
          	      }
          	  }  
      
        }
   /*----------------------------------------Personal Functions-----------------------------------------------*/
    	else if(request.getParameter("task").equals("listP"))
    	{
    		Integer id=(Integer)session.getAttribute("venueID");
    		// //////System.out.println("ana goa el action "+id);
        	//Venues c=HV.getVenueById(id);
        	//Personals p=c.getPersonals();
        	Hiber_Clients HC=new Hiber_Clients();
        	Integer pid=HC.getPer(id, database);
        	PersonalShow p=HP.getPersonById(pid, database);
        	ArrayList<PersonalShow>l=new ArrayList<PersonalShow>();
        	l.add(p);
        	ArrayList<Integer> pp=HP.getPs(id, database);
        	// //////System.out.println("size of personals = "+pp.size());
        	for(int i=0;i<pp.size();i++)
        	{
        		PersonalShow pShow=HP.getPersonById(pp.get(i), database);
        		l.add(pShow);
        	}
            xstream.alias("Personals", PersonalShow.class);
 	        String returnText = xstream.toXML(l);
 	        // //////System.out.println(l.size());
 	        // //////System.out.println("return text = "+returnText);
 	        response.setContentType("application/xml;charset=UTF-8"); 
 	        PrintWriter out = response.getWriter();
 			out.write(returnText);
 			
    	}
    	
    	else if(request.getParameter("task").equals("AddContact"))
    	{
    			Personals p=new Personals();
    			Integer id=(Integer)session.getAttribute("venueID");
    			p.setPersonAddress(request.getParameter("personAddress"));
	    		p.setPersonEmail(request.getParameter("personEmail"));
	    		p.setPersonFirstName(request.getParameter("personFirstName"));
	    		p.setPersonLastName(request.getParameter("personLastName"));
	    		p.setPersonMobile(request.getParameter("personMobile"));
	    		p.setPersonTelePhone(request.getParameter("personTelePhone"));
	    		p.setPersonTitle(request.getParameter("personTitle"));
	    		HP.insertPersonal(p, database);
	    		Integer pid=HP.getLastOne(database);
	    		HP.insertRelationPersonal(id, pid, database);
	    		if(request.getParameter("mainContact1").equals("0"))
	    		{
	    			Integer vID=(Integer)session.getAttribute("venueID");
	   	        	Venues Tc=new Venues();
	   	        	Tc.setIdVenues(vID);
	   		    	Tc.setPersonals(pid);
	   		    	HV.update(Tc, database);
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
    		if(request.getParameter("mainContact").equals("0"))
   	        {
    			Integer vID=(Integer)session.getAttribute("venueID");
   	        	Venues Tc1=new Venues();
   	        	Tc1.setIdVenues(vID);
   		    	Tc1.setPersonals(id);
   		    	HV.update(Tc1, database);
   		    		
   	        }
    	}
    	else if(request.getParameter("task").equals("DELETECONTACT"))
        {
    		Integer vID=(Integer)session.getAttribute("venueID");
	        if (request.getParameterValues("ids").length == 1)
            {
          	  try{
        			
          		database.update("delete from venuspersonal where Personals_idPersonals = "+request.getParameterValues("ids")[0]+" and Venues_idVenues="+vID);
        			
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
          				
          				database.update("delete from venuspersonal where Personals_idPersonals = "+request.getParameterValues("ids")[i]+" and Venues_idVenues="+vID);
              			
                	  	}
          	     }
          			
          		  catch (Exception e) { e.printStackTrace();
          	          
          	      }  finally { 
          	           
          	      }
          	  }  
      
        }
  /*--------------------------------------------Rooms Functions--------------------------------------------------*/
    	
    	else if(request.getParameter("task").equals("AddRoom"))
    	{
    		Integer id=(Integer)session.getAttribute("venueID");
    		Rooms r=new Rooms();
    		Venues v=new Venues();
    		v.setIdVenues(id);
    		r.setRoomNumber(Integer.valueOf(request.getParameter("roomNumber")));
    		r.setRoomValid(true);
    		String validFrom=null;
    		if(!request.getParameter("roomValidFrom").equals("3000-01-01"))
    		{
    			validFrom=request.getParameter("roomValidFrom");
    			Integer rid=HR.getLastOne(database);
    			//System.out.println(validFrom);
    			
    			HR.update(rid,validFrom, database);
    		}
     		r.setRoom(id);
     		HR.insertRoom(r,validFrom, database);
     		
    	}
    	else if(request.getParameter("task").equals("EditRoom"))
    	{
    			Integer id=Integer.valueOf(request.getParameter("id"));
    			Rooms r=new Rooms();
    			r.setIdRooms(id);
	    		r.setRoomNumber(Integer.valueOf(request.getParameter("roomNumber")));
	    		r.setRoomValid(true);
	    		String validFrom=null;
	    		if(!request.getParameter("roomValidFrom").equals("3000-01-01"))
	    			validFrom=request.getParameter("roomValidFrom");
	    		
	    		String validTo=null;
	    		if(!request.getParameter("roomValidTo").equals("3000-01-01"))
	    		{
	    			validTo=request.getParameter("roomValidTo");
	    			//r.setRoomValid(false);
	    		}
	    		
	    		HR.updateRoom(r,validFrom,validTo, database);
    	}
    	
    	else if(request.getParameter("task").equals("listR"))
    	{
    		Integer id=(Integer)session.getAttribute("venueID");
    		// //////System.out.println("ana goa el action "+id);
        	ArrayList<RoomShow> l=new ArrayList<RoomShow>();
        	ArrayList<Rooms> r=HR.getRoomsById(id, database);
        	for(int i=0;i<r.size();i++)
        	{
        		RoomShow rS=new RoomShow();
        		Rooms rr=(Rooms)r.get(i);
        		rS.setIdRooms(rr.getIdRooms());
        		rS.setRoomCapacity(rr.getRoomCapacity());
        		rS.setRoomNumber(rr.getRoomNumber());
        		//rS.setRoomValid(rr.getRoomValid());
        		//SimpleDateFormat s=new SimpleDateFormat("dd-MMM-yyyy",Locale.US);
        		if(rr.getRoomValidFrom()!=null)
        		{
					String dat=s.format(rr.getRoomValidFrom());
	    			rS.setRoomValidFrom(dat);
        		}
        		if(rr.getRoomValidTo() !=null)
        		{
        			String dat=s.format(rr.getRoomValidTo());    			
        			rS.setRoomValidTo(dat);
        		}
        		else
        			rS.setRoomValidTo(null);
        	//	rS.setRoomValidity(rr.getRoomValidity());
        		l.add(rS);
        	}
            xstream.alias("Rooms", RoomShow.class);
 	        String returnText = xstream.toXML(l);
 	        // //////System.out.println(l.size());
 	        // //////System.out.println("return text = "+returnText);
 	        response.setContentType("application/xml;charset=UTF-8"); 
 	        PrintWriter out = response.getWriter();
 			out.write(returnText);
    	}
    	else if(request.getParameter("task").equals("DELETEROOM"))
        {
    		//Integer vID=(Integer)session.getAttribute("venueID");
	        if (request.getParameterValues("ids").length == 1)
            {
          	  try{
        			
          		database.update("delete from rooms where idRooms = "+request.getParameterValues("ids")[0]);
        			
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
          				
          				database.update("delete from rooms where idRooms = "+request.getParameterValues("ids")[i]);
              			
                	  	}
          	     }
          			
          		  catch (Exception e) { e.printStackTrace();
          	          
          	      }  finally { 
          	           
          	      }
          	  }  
      
        }	
/*-------------------------------------------Menues Functions-------------------------------------------------*/    	
    	else if(request.getParameter("task").equals("listM"))
    	{
    		Integer id=(Integer)session.getAttribute("venueID");
    		// //////System.out.println("ana goa el action "+id);
        	ArrayList<MenuShow> l=new ArrayList<MenuShow>();
        	ArrayList<Menus> m=HM.getMenuById(id, database);
        	for(int i=0;i<m.size();i++)
        	{
        		MenuShow mS=new MenuShow();
        		Menus mm=(Menus)m.get(i);
        		mS.setIdMenus(mm.getIdMenus());
        		mS.setMenuDescription(mm.getMenuDescription());
        		mS.setMenuName(mm.getMenuName());
        	//	mS.setMenuValid(mm.getMenuValid());
        		
				if(mm.getMenuValidFrom()!=null)
        		{
        			String dat=s.format(mm.getMenuValidFrom());
	    			mS.setMenuValidFrom(dat);
        		}
				else
					mS.setMenuValidFrom(null);
				if(mm.getMenuValidTo()!=null)
				{
					String dat=s.format(mm.getMenuValidTo());
					mS.setMenuValidTo(dat);
				}
				else
					mS.setMenuValidTo(null);
        		//mS.setMenuValidFrom(mm.getMenuValidFrom());
        		//mS.setMenuValidTo(mm.getMenuValidTo());
        		l.add(mS);
        	}
            xstream.alias("Menus", MenuShow.class);
 	        String returnText = xstream.toXML(l);
 	        // //////System.out.println(l.size());
 	        // //////System.out.println("return text = "+returnText);
 	        response.setContentType("application/xml;charset=UTF-8"); 
 	        PrintWriter out = response.getWriter();
 			out.write(returnText);
 			// //////System.out.println("ana b3d el ouuuuuuuuuuut");
    	}
    	else if(request.getParameter("task").equals("AddMenu"))
    	{
    		Integer id=(Integer)session.getAttribute("venueID");
    		Menus r=new Menus();
    	//	Venues v=new Venues();
    	//	v.setIdVenues(id);
    		r.setMenuDescription(request.getParameter("menuDescription"));
    		r.setMenuName(request.getParameter("menuName"));
    		String validFrom=null;
    		if(!request.getParameter("menuValidFrom").equals("3000-01-01"))
    		{
    			validFrom=request.getParameter("menuValidFrom");
    			Integer mid=HM.getLastOne(database);
    			//System.out.println(validFrom);
    			HM.update(mid,validFrom, database);
    		}
   		
//    		String validTo=null;
//    		if(!request.getParameter("menuValidTo").equals("3000-01-01"))
//    			validTo=request.getParameter("menuValidTo");
     		r.setMenu(id);
     		r.setMenuValid(true);
     		HM.insertMenu(r,validFrom, database);
    	}
    	else if(request.getParameter("task").equals("EditMenu"))
    	{
    			Integer id=Integer.valueOf(request.getParameter("id"));
    			Menus r=new Menus();
    			r.setIdMenus(id);
	    		r.setMenuDescription(request.getParameter("menuDescription"));
	    		r.setMenuName(request.getParameter("menuName"));
	    		String validFrom=null;
	    		r.setMenuValid(true);
	    		if(!request.getParameter("menuValidFrom").equals("3000-01-01"))
	    			validFrom=request.getParameter("menuValidFrom");
	    		
	    		String validTo=null;
	    		if(!request.getParameter("menuValidTo").equals("3000-01-01"))
	    		{
	    			validTo=request.getParameter("menuValidTo");
	    			r.setMenuValid(false);
	    			ArrayList<Menuitems> mi=HMI.getValidMenuItemById(id, database);
	    			for(int i=0;i<mi.size();i++)
	    			{
	    				Menuitems m=mi.get(i);
	    			//	m.setMenuItemValid(false);
	    				HMI.update(m.getIdMenuItems(), validTo, database);
	    			}
	    		}
	    		HM.updateMenu(r,validFrom,validTo, database);
    	}
    	else if(request.getParameter("task").equals("DELETEMENU"))
        {
    		//Integer vID=(Integer)session.getAttribute("venueID");
	        if (request.getParameterValues("ids").length == 1)
            {
          	  try{
        			
        			////System.out.println("delete from menus where idMenus = "+request.getParameterValues("ids")[0]);
          		database.update("delete from menus where idMenus = "+request.getParameterValues("ids")[0]);
        			
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
          				
          				database.update("delete from menus where idMenus = "+request.getParameterValues("ids")[i]);
              			
                	  	}
          	     }
          			
          		  catch (Exception e) { e.printStackTrace();
          	          
          	      }  finally { 
          	           
          	      }
          	  }  
      
        }	
  /*------------------------------------Menus Items----------------------------------*/
    	else if(request.getParameter("task").equals("check"))
    	{
    		menuID=Integer.valueOf(request.getParameter("id"));
    		// //////System.out.println("menu id= "+menuID);
    	     session.setAttribute("menuID",menuID);
    	}
    	else if(request.getParameter("task").equals("listMI"))
    	{
    		Integer id=(Integer)session.getAttribute("menuID");
    		ArrayList<MenuItemShow> l=new ArrayList<MenuItemShow>();
        	ArrayList<Menuitems> mi=HMI.getMenuItemById(id, database);
        	for(int i=0;i<mi.size();i++)
        	{
        		MenuItemShow mS=new MenuItemShow();
        		Menuitems mm=(Menuitems)mi.get(i);
        		mS.setIdMenuItems(mm.getIdMenuItems());
        		mS.setMenuItemDescription(mm.getMenuItemDescription());
        		mS.setMenuItemName(mm.getMenuItemName());
        		mS.setMenuItemPrice(mm.getMenuItemPrice());
        		Integer type=mm.getMenuItemTypePer();
        		if(type.equals(0))
        			mS.setMenuItemTypePer("Per Person");
        		else if(type.equals(1))
        			mS.setMenuItemTypePer("Per Unit");
        		
        		if(mm.getMenuItemValidFrom()!=null)
        		{
        			String dat=s.format(mm.getMenuItemValidFrom());
        			mS.setMenuItemValidFrom(dat);
        		}
        		else
        			mS.setMenuItemValidFrom(null);
        		
        		if(mm.getMenuItemValidTo()!=null)
        		{
        			String dat=s.format(mm.getMenuItemValidTo());
        			mS.setMenuItemValidTo(dat);
        		}
        		//mS.setMenuItemValid(mm.getMenuItemValid());
        		//mS.setMenuItemValidFrom(mm.getMenuItemValidFrom());
        		//mS.setMenuItemValidTo(mm.getMenuItemValidTo());
        		l.add(mS);
        	}
            xstream.alias("Menuitems", MenuItemShow.class);
 	        String returnText = xstream.toXML(l);
 	        // //////System.out.println(l.size());
 	        // //////System.out.println("return text = "+returnText);
 	        response.setContentType("application/xml;charset=UTF-8"); 
 	        PrintWriter out = response.getWriter();
 			out.write(returnText);
    	}
    	else if(request.getParameter("task").equals("AddMenuItem"))
    	{
    		Integer id=(Integer)session.getAttribute("menuID");
    		// //////System.out.println("iddd= "+id);
    		Menuitems r=new Menuitems();
    		//Menus v=new Menus();
    		//v.setIdMenus(id);
    		r.setMenuItem(id);
    		r.setMenuItemPrice(request.getParameter("menuItemPrice"));
    		String type=request.getParameter("menuItemTypePer");
    		if(type.equals("Per Person"))
    			r.setMenuItemTypePer(0);
    		else if(type.equals("Per Unit"))
    			r.setMenuItemTypePer(1);
    		//r.setMenuItemValid(true);
    		r.setMenuItemName(request.getParameter("menuItemName"));
    		r.setMenuItemDescription(request.getParameter("menuItemDescription"));
    		r.setMenuItemValid(true);
    		String validFrom=null;
    		if(!request.getParameter("menuItemValidFrom").equals("3000-01-01"))
    		{
    			validFrom=request.getParameter("menuItemValidFrom");
    			//Integer mid=HMI.getLastOne();
    			////System.out.println(validFrom);
    			//HMI.update(mid,validFrom);
    		}
    		String validTo=null;
    		if(!request.getParameter("menuItemValidTo").equals("3000-01-01"))
    		{
    			validTo=request.getParameter("menuItemValidTo");
    			r.setMenuItemValid(false);
    		}
    		
     		HMI.insertMenuItem(r,validFrom,validTo, database);
    	}
    	else if(request.getParameter("task").equals("EditMenuItem"))
    	{
    			Integer id=Integer.valueOf(request.getParameter("id"));
    			Menuitems r=new Menuitems();
    			r.setIdMenuItems(id);
	    		r.setMenuItemDescription(request.getParameter("menuItemDescription"));
	    		r.setMenuItemName(request.getParameter("menuItemName"));
	    		String validFrom=null;
	    		r.setMenuItemValid(true);
	    		if(!request.getParameter("menuItemValidFrom").equals("3000-01-01"))
	    			validFrom=request.getParameter("menuItemValidFrom");
	    		
	    		String validTo=null;
	    		if(!request.getParameter("menuItemValidTo").equals("3000-01-01"))
	    		{
	    			validTo=request.getParameter("menuItemValidTo");
	    		//	r.setMenuItemValid(false);
	    		}
	    		
	     		r.setMenuItemPrice(request.getParameter("menuItemPrice"));
	     		String type=request.getParameter("menuItemTypePer");
	    		if(type.equals("Per Person"))
	    			r.setMenuItemTypePer(0);
	    		else if(type.equals("Per Unit"))
	    			r.setMenuItemTypePer(1);
	     		
	    		HMI.updateMenuItem(r,validFrom,validTo, database);
    	}
    	else if(request.getParameter("task").equals("DELETEMENUITEM"))
        {
    		//Integer vID=(Integer)session.getAttribute("venueID");
	        if (request.getParameterValues("ids").length == 1)
            {
          	  try{
        			
        		//	//System.out.println("delete from menus where idMenus = "+request.getParameterValues("ids")[0]);
          		database.update("delete from menuitems where idMenuItems = "+request.getParameterValues("ids")[0]);
        			
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
          				
          				database.update("delete from menuitems where idMenuItems = "+request.getParameterValues("ids")[i]);
              			
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