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

import abItemsShow.ExShow;
import abItemsShow.SShow;
import abItemsShow.VShow;
import tablespackage.Expensescategories;
import tablespackage.Expensesitem;
import tablespackage.Personals;
import tablespackage.Supplierexpense;
import tablespackage.Suppliers;
import tablespackage.Trainingcoordinatehistory;
import tablespackage.Trainingcoordinators;
import tablespackage.Venues;
import HibernatePackage.Hiber_ExpensesItems;
import HibernatePackage.Hiber_Expensescategories;
import HibernatePackage.Hiber_Suppliers;
import HibernatePackage.Hiber_Venus;
//import HibernatePackage.HibernateUtil;

import com.mysql.jdbc.Statement;
import com.thoughtworks.xstream.XStream;

import database.DataSourceConnection;

public class ListSuppliers extends org.apache.struts.action.Action {
    
    // Global Forwards
    public static final String GLOBAL_FORWARD_start = "start"; 

    // Local Forwards

    
    public ListSuppliers() {
    }
    
    public ActionForward execute(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
    	Hiber_Suppliers HS=new Hiber_Suppliers();
    	HttpSession session=request.getSession(true);
    	SimpleDateFormat s1=new SimpleDateFormat("dd-MMM-yyyy",Locale.US);
    	
      	// create and intialize the database connection////////////
		DataSourceConnection database = new DataSourceConnection();
		database.initializeConnecton(this.servlet);
    	
    	if(request.getParameter("task").equals("list"))
    	{
    	ArrayList sup=HS.getSuppliers(database);
    //	ArrayList cats=HS.getExCatName();
    	ArrayList al=new ArrayList();
    	for(int i=0;i<sup.size();i++)
    	{
    		SShow vS=new SShow();
    		Suppliers v=(Suppliers)sup.get(i);
    	//	Expensescategories p=v.getSupplier();
    		vS.setIdSupplier(v.getIdSupplier());
    		vS.setSupplierAddress(v.getSupplierAddress());
    		vS.setSupplierMobile(v.getSupplierMobile());
    		vS.setSupplierName(v.getSupplierName());
    		vS.setSupplierPhone(v.getSupplierPhone());
    		al.add(vS);
    	}
        XStream xstream = new XStream();
        //for()
        xstream.alias("Suppliers", SShow.class);
        String returnText = xstream.toXML(al);
        // //////System.out.println("return text = "+returnText);
        response.setContentType("application/xml;charset=UTF-8"); 
        PrintWriter out = response.getWriter();
		out.write(returnText);
    	}
    	else if(request.getParameter("task").equals("check"))
    	{
    		Integer si=0;
    		si=Integer.valueOf(request.getParameter("id"));
    		// //////System.out.println("menu id= "+menuID);
    		 session.setAttribute("supItemID",si);
    	}
    	
    	else if(request.getParameter("task").equals("listSI"))
    	{
    		Integer id=(Integer)session.getAttribute("supItemID");
    		ArrayList<Supplierexpense> sup=HS.getSuppliersExpenses(id, database);
        	ArrayList<Supplierexpense> al=new ArrayList<Supplierexpense>();
        	for(int i=0;i<sup.size();i++)
        	{
        		Supplierexpense s=sup.get(i);
        		s.setCost(sup.get(i).getCost());
        		s.setCurrancy(sup.get(i).getCurrancy());
        		s.setIdSupplierExpense(sup.get(i).getIdSupplierExpense());
        		s.setStock(sup.get(i).getStock());
        		s.setSupplierid(sup.get(i).getSupplierid());
        		Hiber_Expensescategories HE=new Hiber_Expensescategories();
        		Expensescategories e=HE.getCatById(sup.get(i).getCategoryid(), database);
        		s.setCategoryName(e.getCategoryName());
        		Hiber_ExpensesItems HEI=new Hiber_ExpensesItems();
        		Expensesitem ei=HEI.getItemById(sup.get(i).getExpenseid(), database);
        		s.setExpenseItemName(ei.getExpenseItemName());
        		s.setCategoryid(sup.get(i).getCategoryid());
        		s.setExpenseid(sup.get(i).getExpenseid());
        		if(sup.get(i).getValidFrom()!=null)
        		{
	        		String validFrom=s1.format(sup.get(i).getValidFrom());
	        		s.setValidFrom1(validFrom);
	        		////System.out.println(validFrom);
        		}
        		else
        			s.setValidFrom1(null);
        		if(sup.get(i).getValidTo()!=null)
        		{
	        		String validTo=s1.format(sup.get(i).getValidTo());
	        		s.setValidTo1(validTo);
        		}
        		else
        			s.setValidTo1(null);
        		al.add(s);
        	}
            XStream xstream = new XStream();
            xstream.alias("Supplierexpense", Supplierexpense.class);
            String returnText = xstream.toXML(al);
            response.setContentType("application/xml;charset=UTF-8"); 
            PrintWriter out = response.getWriter();
    		out.write(returnText);
        	}
    	else if(request.getParameter("task").equals("AddSupplier"))
    	{
    		Suppliers s=new Suppliers();
    		s.setSupplierAddress(request.getParameter("supplierAddress"));
    		s.setSupplierMobile(request.getParameter("supplierMobile"));
    		s.setSupplierName(request.getParameter("supplierName"));
    		s.setSupplierPhone(request.getParameter("supplierPhone"));
    		HS.insertSupplier(s, database);
    	}
    	else if(request.getParameter("task").equals("DELETESELECTIONS"))
        {
    		if (request.getParameterValues("ids").length == 1)
            {
          	  try{
        			
        			database.update("delete from suppliers where idSupplier = "+request.getParameterValues("ids")[0]);
        			
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
          				
          				database.update("delete from suppliers where idSupplier = "+request.getParameterValues("ids")[i]);
              			
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
        			
        			
          		database.update("delete from supplierExpense where idSupplierExpense = "+request.getParameterValues("ids")[0]);
        			
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
          				
          				database.update("delete from supplierExpense where idSupplierExpense = "+request.getParameterValues("ids")[i]);
              			
                	  	}
          	     }
          			
          		  catch (Exception e) { e.printStackTrace();
          	          
          	      }  finally { 
          	           
          	      }
          	  }  
      
        }
    	else if(request.getParameter("task").equals("EditSupplier"))
    	{
    		  Integer id=Integer.valueOf(request.getParameter("id"));
    		  Suppliers s=new Suppliers();
    		  s.setIdSupplier(id);
	    	  s.setSupplierAddress(request.getParameter("supplierAddress"));
	    	  s.setSupplierMobile(request.getParameter("supplierMobile"));
	    	  s.setSupplierName(request.getParameter("supplierName"));
	    	  s.setSupplierPhone(request.getParameter("supplierPhone"));
	    	  HS.updateSupplier(s, database);
    	}
    	else if(request.getParameter("task").equals("addItems"))
    	{
    		Integer sID=(Integer)session.getAttribute("supItemID");
    		Integer eID=Integer.valueOf(request.getParameter("categoryID"));
    		Integer eiID=Integer.valueOf(request.getParameter("ItemID"));
    		Supplierexpense se=new Supplierexpense();
    		se.setCost(request.getParameter("cost"));
    		se.setStock(Integer.valueOf(request.getParameter("stock")));
    		se.setExpenseid(eiID);
    		se.setSupplierid(sID);
    		se.setCategoryid(eID);
//    		Date d=new Date();
//    		d=parseDate(request.getParameter("validFrom"));
//    		se.setValidFrom(d);
    		String vt=null;
    		if(!request.getParameter("validTo").equals("3000-01-01"))
    			vt=request.getParameter("validTo");
    		HS.insertSupplierExpense(se,request.getParameter("validFrom"),vt, database);
    	}
    	else if(request.getParameter("task").equals("editItems"))
    	{
    		  Integer sID=(Integer)session.getAttribute("supItemID");
    		  Integer id=Integer.valueOf(request.getParameter("id"));
    		  Supplierexpense se=new Supplierexpense();
    		  se.setIdSupplierExpense(id);
    		  se.setCategoryid(Integer.valueOf(request.getParameter("categoryID")));
    		  se.setCost(request.getParameter("cost"));
    		  se.setExpenseid(Integer.valueOf(request.getParameter("ItemID")));
    		  se.setStock(Integer.valueOf(request.getParameter("stock")));
    		  se.setSupplierid(sID);
    		  String vt=null;
      		  if(!request.getParameter("validTo").equals("3000-01-01"))
      			vt=request.getParameter("validTo");
      		  HS.updateItem(se,request.getParameter("validFrom"),vt, database);
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

