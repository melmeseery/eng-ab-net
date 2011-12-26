package HibernatePackage;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import tablespackage.Expensesitem;

public class Hiber_Expenses 
{
	public Hiber_Expenses() {
		// TODO Auto-generated constructor stub
	}
//	public ArrayList getExpenses()
//	{
//		Expensesitem Ex=new Expensesitem();
//		ArrayList Al=new ArrayList();
//		Session session = null;
//	
//		try{
//			// This step will read hibernate.cfg.xml and prepare hibernate for use
//			SessionFactory sessionFactory = new Configuration().configure().buildSessionFactory();
//			//tx=session.beginTransaction();
//			session =sessionFactory.openSession();
//		    // //////System.out.println("*******************************");
//		    // //////System.out.println("Query using Hibernate Query Language");
//			//Query using Hibernate Query Language
//		 	List l =session.createQuery("from Expensesitem").list();
//		 	for(Iterator it=l.iterator();it.hasNext();)
//		 	{
//		 		Object row = (Object) it.next();
//		 		if (row instanceof Expensesitem) {
//					Ex = (Expensesitem) row;
//					Al.add(Ex);
//					//// //////System.out.println("courseType= "+DS.getDatashowName());
//					
//				}
//		 		else {
//		 			
//		 			// //////System.out.println(" errorrrrrrrrrrrr");
//		 		}
//		 		
//		 	}
//		 		
//		 		
//	        session.close();
//		}catch(Exception e){
//			// //////System.out.println(e.getMessage());
//		}finally{
//			}
//		return Al;
//	}

}
