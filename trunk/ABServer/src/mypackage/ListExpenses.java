package mypackage;
import java.io.PrintWriter;
import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import abItemsShow.ExShow;
import tablespackage.Expensescategories;
import tablespackage.Expensesitem;
import HibernatePackage.Hiber_Expenses;
import HibernatePackage.Hiber_Expensescategories;

import com.thoughtworks.xstream.XStream;

public class ListExpenses extends org.apache.struts.action.Action {
    
    // Global Forwards
    public static final String GLOBAL_FORWARD_start = "start"; 

    // Local Forwards

    
    public ListExpenses() {
    }
    
    public ActionForward execute(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
//    	Hiber_Expenses HE=new Hiber_Expenses();
//    	Hiber_Expensescategories Hecat=new Hiber_Expensescategories();
//    	ArrayList l=HE.getExpenses();
//    	ArrayList exCat=Hecat.getExCategories();
//    	ArrayList Show=new ArrayList();
//    	for(int i=0;i<l.size();i++)
//    	{// //////System.out.println("ana goa el for");
//    		Expensesitem c=(Expensesitem)l.get(i);
//    		ExShow e=new ExShow();
//    		e.setExpenseItemCost(c.getExpenseItemCost());
//    		e.setExpenseItemCurrentStock(c.getExpenseItemCurrentStock());
//    		e.setExpenseItemName(c.getExpenseItemName());
//    		e.setExpenseItemType(c.getExpenseItemType());
//    		e.setExpenseItemValid(c.getExpenseItemValid());
//    		e.setExpenseItemValidFrom(c.getExpenseItemValidFrom());
//    		e.setIdExpensesItem(c.getIdExpensesItem());
//    		for(int j=0;j<exCat.size();j++)
//    		{
//    			Expensescategories eCat=(Expensescategories) exCat.get(j);
//    			//Integer x=eCat.getIdExpensesCategories();
//    		//	// //////System.out.println(x+"  "+exCat.get(i));
//    			if(c.getExpensesItem().getIdExpensesCategories().equals(eCat.getIdExpensesCategories()))
//    			{
//    				// //////System.out.println("ana goa el iffff");
//    				e.setExpensesCategories(eCat.getCategoryName());
//    			}
//    		}
//    		
//    		Show.add(e);
//    	}
//    	
//        XStream xstream = new XStream();
//        xstream.alias("Expensesitem", ExShow.class);
//        // //////System.out.println("ana ba3d el alias");
//      //  // //////System.out.println(cShow.getCourseNameEng());
//        String returnText = xstream.toXML(Show);
//        // //////System.out.println("return text = "+returnText);
//        response.setContentType("application/xml;charset=UTF-8"); 
//        PrintWriter out = response.getWriter();
//		
//
//			out.write(returnText);

    	return mapping.findForward("success");

    }

}