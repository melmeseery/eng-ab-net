package HibernatePackage;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;


import com.mysql.jdbc.Statement;

import database.DataSourceConnection;

import tablespackage.Menus;
import tablespackage.Rooms;
import tablespackage.Venues;

public class Hiber_Menus 
{
	public ArrayList<Menus> getMenuById(Integer id,DataSourceConnection database)
	{
		
		ArrayList<Menus> al=new ArrayList<Menus>();
		try{
			
			ResultSet l =database.retrieve("select * from menus where Menu_idVenues="+id);
			while(l.next())
			 {
				Menus m=new Menus();
				m.setIdMenus(l.getInt(1));
				m.setMenuName(l.getString(2));
				m.setMenuDescription(l.getString(3));
				m.setMenuValidFrom(l.getDate(4));
				m.setMenuValidTo(l.getDate(5));
				al.add(m);
			 }
			 l.close();
			
		 	
		}catch(Exception e){
		}finally{
			}
		return al;
	}
	/*---------------------------------------------------------------------------------------*/
	public void insertMenu(Menus p,String validFrom,DataSourceConnection database)
	{
		try{
			
			String MenuName=null;
			String MenuDescription=null;
			
			if(p.getMenuName()!=null)
				MenuName="'"+p.getMenuName()+"'";
			if(p.getMenuDescription()!=null)
				MenuDescription="'"+p.getMenuDescription()+"'";
			if(validFrom!=null)
				validFrom="'"+validFrom+"'";
			database.update("insert into menus (MenuName,MenuDescription,MenuValidFrom,Menu_idVenues,MenuValid) values("+MenuName+","+MenuDescription+","+validFrom+","+p.getMenu()+","+p.getMenuValid()+")");
			
		}
		  catch (Exception e) { e.printStackTrace();
	          
	      }  finally { 
	           
	      }
	}	
	/*----------------------------------------------------------------------------------------*/
	public Integer getLastOne(DataSourceConnection database)
	{
		Integer id=0;
		
		try{
			
			ResultSet l =database.retrieve("select idMenus from menus");
			while(l.next())
		 	{
		 			id=l.getInt(1);
		 	}
		 	l.close();
		 	
		}catch(Exception e){
			// //////System.out.println(e.getMessage());
		}finally{
			}
		return id;
	}		
	/*----------------------------------------------------------------------------------------------------------*/
	public void update(Integer mid,String validTo,DataSourceConnection database)
	{
		
		try{
			
			database.update("update menus set MenuValidTo='"+validTo+"',MenuValid=false where idMenus="+mid);
			
		}
		  catch (Exception e) { e.printStackTrace();
	          
	      }  finally { 
	           
	      }
		
	}
	/*----------------------------------------------------------------------------------------------------------*/
	public void updateMenu(Menus p,String validFrom,String validTo,DataSourceConnection database)
	{
		
		try{
			
			String MenuName=null;
			String MenuDescription=null;
			
			if(p.getMenuName()!=null)
				MenuName="'"+p.getMenuName()+"'";
			if(p.getMenuDescription()!=null)
				MenuDescription="'"+p.getMenuDescription()+"'";
			if(validFrom!=null)
				validFrom="'"+validFrom+"'";
			if(validTo!=null)
				validTo="'"+validTo+"'";
			database.update("update menus set MenuName="+MenuName+",MenuDescription="+MenuDescription+",MenuValidFrom="+validFrom+",MenuValidTo="+validTo+",MenuValid="+p.getMenuValid()+" where idMenus="+p.getIdMenus());
			
		}
		  catch (Exception e) { e.printStackTrace();
	          
	      }  finally { 
	           
	      }
		
	}		
			
}
