package HibernatePackage;


import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.util.*;


import com.mysql.jdbc.Statement;

import database.DataSourceConnection;

import tablespackage.Trainingcoordinators;
import tablespackage.Users;
public class Hiber_Users 
{
	
	public Hiber_Users(){}
	
	public void insertUser(Users c,DataSourceConnection database)
	{
		try{
			
			String UserUsername=null;
			String UserPassword=null;
			
			if(c.getUserUsername()!=null)
				UserUsername="'"+c.getUserUsername()+"'";
			if(c.getUserPassword()!=null)
				UserPassword="'"+c.getUserPassword()+"'";
			
			
			database.update("insert into users (UserUsername,UserPassword,UserPrivilage) values("+UserUsername+","+UserPassword+","+c.getUserPrivilage()+")");
			
		}
		  catch (Exception e) { e.printStackTrace();
	          
	      }  finally { 
	           
	      }
	}
//	public String checkUser(String id) 
//	{
//		//boolean flag=false;
//		String pass="";
//		Session session = null;
//	//	Transaction tx=null;
//	////System.out.println("id= "+id);
//		try{
//			// This step will read hibernate.cfg.xml and prepare hibernate for use
//			SessionFactory sessionFactory = new Configuration().configure().buildSessionFactory();
//			//tx=session.beginTransaction();
//			session =sessionFactory.openSession();
//		     //////System.out.println("*******************************");
//		     //////System.out.println("Query using Hibernate Query Language");
//			//Query using Hibernate Query Language
//			////System.out.println("   from Users where userUsername='"+id+"'");
//		 	List l =session.createQuery("   from Users where userUsername='"+id+"'").list();
//		 	////System.out.println("size= "+l.size());
//		 	for(Iterator it=l.iterator();it.hasNext();){
//		 		Object row = (Object) it.next();
//		 		if (row instanceof Users) {
//					Users Testuser = (Users) row;
//				//	////System.out.println("username= "+Testuser.getUserUsername());
//					pass=Testuser.getUserPassword();
//				//	////System.out.println("pass= "+Testuser.getUserPassword());
//				}
//		 		else {
//		 			
//		 			//////System.out.println(" errorrrrrrrrrrrr");
//		 		}
//		 		
//				}
//		 	//////System.out.println("pass= "+pass);
//	
//	        session.close();
//		}catch(Exception e){
//			//e.printStackTrace();
//		}finally{
//			}
//		return pass;
//	}
	public ArrayList<Users> getUsers(DataSourceConnection database)
	{
		ArrayList<Users> Al=new ArrayList<Users>();
		try{
			
			ResultSet l =database.retrieve("select * from users");
		 	while(l.next())
		 	{
		 		Users u=new Users();
				u.setIdUsers(l.getInt(1));
				u.setUserUsername(l.getString(2));
				u.setUserPassword(l.getString(3));
				u.setUserPrivilage(l.getInt(4));
				Al.add(u);
		 	}
		 	l.close();
			
	        
		}catch(Exception e){e.printStackTrace();
			// //////System.out.println(e.getMessage());
		}finally{
			}
		return Al;
	}
	/*----------------------------------------------------------------------------------------------------------*/
	public void updateUser(Users c,DataSourceConnection database)
	{
		
		try{
			
		//	//System.out.println("update Trainingcoordinatehistory set TrainingCoordinateHistoryValidFrom="+date+" where idTrainingCoordinateHistory="+id);
			String UserUsername=null;
			String UserPassword=null;
			
			if(c.getUserUsername()!=null)
				UserUsername="'"+c.getUserUsername()+"'";
			if(c.getUserPassword()!=null)
				UserPassword="'"+c.getUserPassword()+"'";
			
			database.update("update users set UserUsername="+UserUsername+",UserPassword="+UserPassword+",UserPrivilage="+c.getUserPrivilage()+" where idUsers="+c.getIdUsers());
			
		}
		  catch (Exception e) { e.printStackTrace();
	          
	      }  finally { 
	           
	      }
		
	}	
}
