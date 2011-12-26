package HibernatePackage;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import com.mysql.jdbc.Statement;

import database.DataSourceConnection;

import tablespackage.Clients;
import tablespackage.Datashows;
import tablespackage.Datashowsmaintainance;
import tablespackage.Expensescategories;

public class Hiber_Expensescategories 
{
	public Hiber_Expensescategories() {
		// TODO Auto-generated constructor stub
	}
	public ArrayList<Expensescategories> getExCategories(DataSourceConnection database)
	{
		ArrayList<Expensescategories> Al=new ArrayList<Expensescategories>();
		
		try{
		
			ResultSet l =database.retrieve("select * from expensescategories");
			while(l.next())
		 	{
				Expensescategories Ecat=new Expensescategories();
				Ecat.setIdExpensesCategories(l.getInt(1));
		 		Ecat.setCategoryName(l.getString(2));
		 		Ecat.setCategoryType(l.getString(3));
		 		Ecat.setCategoryParentName(l.getString(4));
		 		Ecat.setCategoryParentId(l.getInt(5));
		 		Al.add(Ecat);
		 	}
		 		
		 	l.close();
			
		}catch(Exception e){
			// //////System.out.println(e.getMessage());
		}finally{
			}
		return Al;
	}
	
	public ArrayList<Expensescategories> getParExCategories(DataSourceConnection database)
	{
		ArrayList<Expensescategories> Al=new ArrayList<Expensescategories>();
		try{
			
			ResultSet l =database.retrieve("select * from expensescategories where CategoryType='Parent'");
			while(l.next())
		 	{
				Expensescategories Ecat=new Expensescategories();
				Ecat.setIdExpensesCategories(l.getInt(1));
		 		Ecat.setCategoryName(l.getString(2));
		 		Ecat.setCategoryType(l.getString(3));
		 		Ecat.setCategoryParentName(l.getString(4));
		 		Ecat.setCategoryParentId(l.getInt(5));
		 		Al.add(Ecat);
		 	}
		 		
		 	l.close();
			
		}catch(Exception e){
			// //////System.out.println(e.getMessage());
		}finally{
			}
		return Al;
	}	
	/*----------------------------------------------------------------------------------------------------------*/
	public void insertExCat(Expensescategories d,DataSourceConnection database)
	{
		try{
			
			String CategoryName=null;
			String CategoryType=null;
			String CategoryParentName=null;
			
			if(d.getCategoryName()!=null)
				CategoryName="'"+d.getCategoryName()+"'";
			if(d.getCategoryType()!=null)
				CategoryType="'"+d.getCategoryType()+"'";
			if(d.getCategoryParentName()!=null)
				CategoryParentName="'"+d.getCategoryParentName()+"'";
			
			database.update("insert into expensescategories (CategoryName,CategoryType,CategoryParentName,CategoryParentID) values("+CategoryName+","+CategoryType+","+CategoryParentName+","+d.getCategoryParentId()+")");
			
		}
		  catch (Exception e) { e.printStackTrace();
	          
	      }  finally { 
	           
	      }
		
	}
	/*----------------------------------------------------------------------------------------------------------*/
	public Expensescategories getCatById(Integer id,DataSourceConnection database)
	{
		Expensescategories Ecat=new Expensescategories();
		try{
			
			ResultSet l =database.retrieve("select * from expensescategories where idExpensesCategories="+id);
		 	if(l.next())
		 	{
		 		Ecat.setIdExpensesCategories(l.getInt(1));
		 		Ecat.setCategoryName(l.getString(2));
		 		Ecat.setCategoryType(l.getString(3));
		 		Ecat.setCategoryParentName(l.getString(4));
		 		Ecat.setCategoryParentId(l.getInt(5));
		 		
				
		 	}
		 	////System.out.println();	
		 	l.close();
			
		}catch(Exception e){e.printStackTrace();
		}
		return Ecat;
	}
	/*-------------------------------------------------------------------------------------------*/
	public void updateCat(Expensescategories d,DataSourceConnection database)
	{
		try{
			
			String CategoryName=null;
			String CategoryType=null;
			String CategoryParentName=null;
			
			if(d.getCategoryName()!=null)
				CategoryName="'"+d.getCategoryName()+"'";
			if(d.getCategoryType()!=null)
				CategoryType="'"+d.getCategoryType()+"'";
			if(d.getCategoryParentName()!=null)
				CategoryParentName="'"+d.getCategoryParentName()+"'";
			database.update("update expensescategories set CategoryName="+CategoryName+",CategoryType="+CategoryType+",CategoryParentName="+CategoryParentName+",CategoryParentID="+d.getCategoryParentId()+" where idExpensesCategories="+d.getIdExpensesCategories());
			
			
		}
		  catch (Exception e) { e.printStackTrace();
	          
	      }  finally { 
	           
	      }
	}		
}
