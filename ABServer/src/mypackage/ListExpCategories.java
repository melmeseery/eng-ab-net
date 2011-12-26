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

import abItemsShow.CatShow;
import abItemsShow.ExItemShow;
import tablespackage.Expensescategories;
import tablespackage.Expensesitem;
import tablespackage.Suppliers;
import HibernatePackage.Hiber_ExpensesItems;
import HibernatePackage.Hiber_Expensescategories;
//import HibernatePackage.HibernateUtil;

import com.mysql.jdbc.Statement;
import com.thoughtworks.xstream.XStream;

import database.DataSourceConnection;

public class ListExpCategories extends org.apache.struts.action.Action {
    
    // Global Forwards
    public static final String GLOBAL_FORWARD_start = "start"; 

    // Local Forwards

    
    public ListExpCategories() {
    }
    
    public ActionForward execute(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
    	Hiber_Expensescategories HE=new Hiber_Expensescategories();
    	Hiber_ExpensesItems HEI=new Hiber_ExpensesItems();
    	XStream xstream = new XStream();
    	HttpSession session=request.getSession(true);
    	
      	// create and intialize the database connection////////////
		DataSourceConnection database = new DataSourceConnection();
		database.initializeConnecton(this.servlet);
    	
    	if(request.getParameter("task").equals("list"))
    	{
	    	ArrayList categories=HE.getExCategories(database);
	        xstream.alias("Expensescategories", Expensescategories.class);
	        String returnText = xstream.toXML(categories);
	        // //////System.out.println("return text = "+returnText);
	        response.setContentType("application/xml;charset=UTF-8"); 
	        PrintWriter out = response.getWriter();
			out.write(returnText);
    	}
    	else if(request.getParameter("task").equals("getItems"))
    	{
    		Integer catID=0;
    		catID=Integer.valueOf(request.getParameter("id"));
    		// //////System.out.println("menu id= "+menuID);
    		 session.setAttribute("catID",catID);
    	}
    	else if(request.getParameter("task").equals("listPar"))
    	{
	    	ArrayList categories=HE.getParExCategories(database);
	        xstream.alias("Expensescategories", Expensescategories.class);
	        String returnText = xstream.toXML(categories);
	        // //////System.out.println("return text = "+returnText);
	        response.setContentType("application/xml;charset=UTF-8"); 
	        PrintWriter out = response.getWriter();
			out.write(returnText);
    	}
    	else if(request.getParameter("task").equals("AddCat"))
    	{
    		Expensescategories ex=new Expensescategories();
    		ex.setCategoryName(request.getParameter("categoryName"));
    		ex.setCategoryType(request.getParameter("categoryType"));
    		if(request.getParameter("categoryType").equals("Parent"))
    		{
    			ex.setCategoryParentId(null);
    			ex.setCategoryParentName(null);
    		}
    		else
    		{////System.out.println("??+ "+request.getParameter("categoryParentId"));
    			Expensescategories e=new Expensescategories();
    			e=HE.getCatById(Integer.valueOf(request.getParameter("categoryParentId")), database);
    		//	e.setIdExpensesCategories(Integer.valueOf(request.getParameter("categoryParentId")));
    			ex.setCategoryParentId(Integer.valueOf(request.getParameter("categoryParentId")));
    		//	e=HE.getCatById(Integer.valueOf(request.getParameter("categoryParentId")));
    			ex.setCategoryParentName(e.getCategoryName());
    		}
    		HE.insertExCat(ex, database);
    	}
    	else if(request.getParameter("task").equals("listEI"))
    	{
    		Integer id=(Integer)session.getAttribute("CatId");
    		ArrayList<Integer> al=HEI.getEXitemById(id, database);
    		ArrayList<ExItemShow> l=new ArrayList<ExItemShow>();
    		if(al !=null)
    		{////System.out.println("ana goa el if");
	    		for(int i=0;i<al.size();i++)
	    		{
	    			ExItemShow eS=new ExItemShow();
	    			Expensesitem e=HEI.getItemById(al.get(i), database);
	    			eS.setIdExpensesItem(al.get(i));
	    		//	eS.setExpenseItemCost(e.getExpenseItemCost());
	    		//	eS.setExpenseItemCurrentStock(e.getExpenseItemCurrentStock());
	    			eS.setExpenseItemName(e.getExpenseItemName());
	    			Integer type=e.getExpenseItemType();
	    			if(type.equals(0))
	    				eS.setExpenseItemType("Per Person");
	    			else if(type.equals(1))
	    				eS.setExpenseItemType("Per Unit");
	    			else if(type.equals(2))
	    				eS.setExpenseItemType("Per Day");
	    			else if(type.equals(3))
	    				eS.setExpenseItemType("Per Night");
	    			//eS.setExpenseItemValid(e.getExpenseItemValid());
	    			if(e.getExpenseItemValidFrom()!=null)
	    			{
	    				SimpleDateFormat s=new SimpleDateFormat("dd-MMM-yyyy",Locale.US);
	    				String dat=s.format(e.getExpenseItemValidFrom());
		    			eS.setExpenseItemValidFrom(dat);
	    			}
	    			else
	    				eS.setExpenseItemValidFrom(null);
	    			if(e.getExpenseItemValidTo()!=null)
	    			{//System.out.println("validto "+eS.getExpenseItemValidTo());
	    				SimpleDateFormat s=new SimpleDateFormat("dd-MMM-yyyy",Locale.US);
			    		String dat=s.format(e.getExpenseItemValidTo());
			    		eS.setExpenseItemValidTo(dat);
	    			}
	    			else
	    			//eS.setExpenseItemValidFrom(e.getExpenseItemValidFrom());
	    				eS.setExpenseItemValidTo(null);
	    			l.add(eS);
	    		}
    		}
    		
    		// //////System.out.println("size of arraaaaaaaaay is "+al.size());
    		xstream.alias("Expensesitem", ExItemShow.class);
	        String returnText = xstream.toXML(l);
	        // //////System.out.println("return text = "+returnText);
	        response.setContentType("application/xml;charset=UTF-8"); 
	        PrintWriter out = response.getWriter();
			out.write(returnText);
			
    	}
    	else if(request.getParameter("task").equals("listItems"))
		{
    		Integer id=(Integer)session.getAttribute("catID");
    		//System.out.println("id= "+id);
			ArrayList<Expensesitem> e=HEI.getEitemById(id, database);
			//System.out.println("size= "+e.size());
			ArrayList<ExItemShow> eShow=new ArrayList<ExItemShow>();
			if(e !=null)
			{
				for(int i=0;i<e.size();i++)
				{////System.out.println("ana goa el foor");
					Expensesitem ei=e.get(i);
					ExItemShow eS=new ExItemShow();
					eS.setExpenseItemName(ei.getExpenseItemName());
					eS.setIdExpensesItem(ei.getIdExpensesItem());
					eShow.add(eS);
				}
			}
			xstream.alias("Expensesitem", ExItemShow.class);
	        String returnText = xstream.toXML(eShow);
	        // //////System.out.println("return text = "+returnText);
	        response.setContentType("application/xml;charset=UTF-8"); 
	        PrintWriter out = response.getWriter();
			out.write(returnText);
		}
    	else if(request.getParameter("task").equals("listC"))
    	{
    		Integer id=(Integer)session.getAttribute("CatId");// //////System.out.println("listC "+id);
    		Expensescategories e=HE.getCatById(id, database);
    		CatShow c=new CatShow();
    		c.setIdExpensesCategories(e.getIdExpensesCategories());
    		c.setCategoryName(e.getCategoryName());
    		if(e.getCategoryParentId()!=null)
    		{
    		c.setCategoryParentId(e.getCategoryParentId());
    		c.setCategoryParentName(e.getCategoryParentName());
    		}
    		else
    		{
    			c.setCategoryParentId(null);
    			c.setCategoryParentName(null);
    		}
    		c.setCategoryType(e.getCategoryType());
    		ArrayList<CatShow>al=new ArrayList<CatShow>();
    		al.add(c);
    		xstream.alias("Expensescategories", CatShow.class);
	        String returnText = xstream.toXML(al);
	        // //////System.out.println("return text = "+returnText);
	        response.setContentType("application/xml;charset=UTF-8"); 
	        PrintWriter out = response.getWriter();
			out.write(returnText);
    	}
    	else if(request.getParameter("task").equals("EditCat"))
    	{
    		  Integer id=(Integer)session.getAttribute("CatId");
    		  Expensescategories s=new Expensescategories();
    		  s.setIdExpensesCategories(id);
	    	  s.setCategoryName(request.getParameter("categoryName"));
	    	  s.setCategoryType(request.getParameter("categoryType"));
	    	  //System.out.println(request.getParameter("categoryParentId"));
	    	  
	    	  if(request.getParameter("categoryType").equals("Parent"))
	    	  {
	    		  s.setCategoryParentId(null);
	    		  s.setCategoryParentName(null); 
	    	  }
	    	  else if(request.getParameter("categoryParentId")!=null)
	    	  {//System.out.println(request.getParameter("categoryParentId"));
	    		//  Integer cID=Integer.valueOf(request.getParameter("categoryParentId"));
	    		  Expensescategories e=new Expensescategories();
	    			e=HE.getCatById(Integer.valueOf(request.getParameter("categoryParentId")), database);
	    		//	e.setIdExpensesCategories(Integer.valueOf(request.getParameter("categoryParentId")));
	    			s.setCategoryParentId(Integer.valueOf(request.getParameter("categoryParentId")));
	    		//	e=HE.getCatById(Integer.valueOf(request.getParameter("categoryParentId")));
	    			s.setCategoryParentName(e.getCategoryName()); 
	    	  }
	    	 HE.updateCat(s, database);
    	}
    	else if(request.getParameter("task").equals("EditExItem"))
    	{
    		  Integer id=Integer.valueOf(request.getParameter("id"));
    		  Expensesitem s=new Expensesitem();
    		  s.setIdExpensesItem(id);
	    	 // s.setExpenseItemCost(Integer.valueOf(request.getParameter("expenseItemCost")));
	    	  s.setExpenseItemName(request.getParameter("expenseItemName"));
	    	  String type=request.getParameter("expenseItemType");
	    	//  s.setExpenseItemCurrentStock(request.getParameter("expenseItemCurrentStock"));
	    	  if(type.equals("Per Person"))
	    		  s.setExpenseItemType(0);
	    	  else if(type.equals("Per Unit"))
	    		  s.setExpenseItemType(1);
	    	  else if(type.equals("Per Day"))
	    		  s.setExpenseItemType(2);
	    	  else if(type.equals("Per Night"))
	    		  s.setExpenseItemType(3);
	    	  String date=null;
	    	  if(!request.getParameter("expenseItemValidFrom").equals("3000-01-01"))
	    		  date=request.getParameter("expenseItemValidFrom");
	    	  String date1=null;
	    	  if(!request.getParameter("expenseItemValidTo").equals("3000-01-01"))
	    		  date1=request.getParameter("expenseItemValidTo");
	    	  
	    	  HEI.updateItem(s,date,date1, database);
	    	  
    	}
    	else if(request.getParameter("task").equals("AddExItem"))
    	{
    		Expensesitem e=new Expensesitem();
    		Integer id=(Integer)session.getAttribute("CatId");
    	//	e.setExpenseItemCost(Integer.valueOf(request.getParameter("expenseItemCost")));
    		e.setExpenseItemName(request.getParameter("expenseItemName"));
    	//	 e.setExpenseItemCurrentStock(request.getParameter("expenseItemCurrentStock"));
    		 String type=request.getParameter("expenseItemType");
	    	  if(type.equals("Per Person"))
	    		  e.setExpenseItemType(0);
	    	  else if(type.equals("Per Unit"))
	    		  e.setExpenseItemType(1);
	    	  else if(type.equals("Per Day"))
	    		  e.setExpenseItemType(2);
	    	  else if(type.equals("Per Night"))
	    		  e.setExpenseItemType(3);
	    	  e.setExpenseItemValid(true);
    		//e.setExpenseItemValidFrom(value)
	    	  String date=null;
	    	  if(request.getParameter("expenseItemValidFrom")!=null)
	    	  {
	    		  date=request.getParameter("expenseItemValidFrom");
	    		  Integer eid=HEI.getLastOne(database);
	    		  HEI.update(eid,date, database);
	    	  }
    		
    		e.setExpensesItem(id);
    		HEI.insertExItem(e,date, database);
    	}
    	else if(request.getParameter("task").equals("DELETESELECTIONS"))
        {
    		if (request.getParameterValues("ids").length == 1)
            {
          	  try{
        		
        			
        			database.update("delete from expensescategories where idExpensesCategories = "+request.getParameterValues("ids")[0]);
        			
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
          				
          				database.update("delete from expensescategories where idExpensesCategories = "+request.getParameterValues("ids")[i]);
              			
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
        			
        			////System.out.println("delete from expensesitem where idExpensesItem = "+request.getParameterValues("ids")[0]);
        			database.update("delete from expensesitem where idExpensesItem = "+request.getParameterValues("ids")[0]);
        			
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
          				
          				database.update("delete from expensesitem where idExpensesItem = "+request.getParameterValues("ids")[i]);
              			
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