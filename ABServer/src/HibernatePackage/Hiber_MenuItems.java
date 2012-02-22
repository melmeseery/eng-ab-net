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
import tablespackage.Menuitems;
import tablespackage.Menus;
import tablespackage.Rooms;
import tablespackage.Venues;

public class Hiber_MenuItems
{
	public ArrayList<Menuitems> getMenuItemById(Integer id,DataSourceConnection database)
	{

		ArrayList<Menuitems> al=new ArrayList<Menuitems>();
		try{

			ResultSet l =database.retrieve("select * from menuitems where MenuItem_idMenus="+id);
			while(l.next())
			 {
				Menuitems m=new Menuitems();
				m.setIdMenuItems(l.getInt(1));
				m.setMenuItemName(l.getString(2));
				m.setMenuItemPrice(l.getString(3));
				m.setMenuItemTypePer(l.getInt(4));
				m.setMenuItemDescription(l.getString(5));
				m.setMenuItemValidFrom(l.getDate(6));
				m.setMenuItemValidTo(l.getDate(7));
				m.setMenuItem(l.getInt(8));
				al.add(m);
			 }
			 l.close();


		}catch(Exception e){
		}finally{
			}
		return al;
	}
/*-----------------------------------------------------------------------------------------------------*/
	public ArrayList<Menuitems> getValidMenuItemById(Integer id,DataSourceConnection database)
	{

		ArrayList<Menuitems> al=new ArrayList<Menuitems>();
		try{

			ResultSet l =database.retrieve("select * from menuitems where MenuItemValid=true and MenuItem_idMenus="+id);
			while(l.next())
			 {
				Menuitems m=new Menuitems();
				m.setIdMenuItems(l.getInt(1));
				m.setMenuItemName(l.getString(2));
				m.setMenuItemPrice(l.getString(3));
				m.setMenuItemTypePer(l.getInt(4));
				m.setMenuItemDescription(l.getString(5));
				m.setMenuItemValidFrom(l.getDate(6));
				m.setMenuItemValidTo(l.getDate(7));
				m.setMenuItem(l.getInt(8));
				al.add(m);
			 }
			 l.close();


		}catch(Exception e){
		}finally{
			}
		return al;
	}
	/*----------------------------------------------------------------------------------------------------------*/
	public void insertMenuItem(Menuitems p,String validFrom,String validTo,DataSourceConnection database)
	{
		try{

			String MenuItemName=null;
			String MenuItemPrice=null;
			String MenuItemDescription=null;


			if(p.getMenuItemName()!=null)
				MenuItemName="'"+p.getMenuItemName()+"'";
			if(p.getMenuItemPrice()!=null)
				MenuItemPrice="'"+p.getMenuItemPrice()+"'";
			if(p.getMenuItemDescription()!=null)
				MenuItemDescription="'"+p.getMenuItemDescription()+"'";
			if(validFrom!=null)
				validFrom="'"+validFrom+"'";
			if(validTo!=null)
				validTo="'"+validTo+"'";
			database.update("insert into menuitems (MenuItemName,MenuItemPrice,MenuItemDescription,MenuItemTypePer,MenuItemValidFrom,MenuItemValidTo,MenuItem_idMenus,MenuItemValid) values("+MenuItemName+","+MenuItemPrice+","+MenuItemDescription+","+p.getMenuItemTypePer()+","+validFrom+","+validTo+","+p.getMenuItem()+","+p.getMenuItemValid()+")");

		}
		  catch (Exception e) { e.printStackTrace();

	      }  finally {

	      }
	}
	/*----------------------------------------------------------------------------------------*/
//	public Integer getLastOne(DataSourceConnection database)
//	{
//		Integer id=0;
//
//		try{
//
//			ResultSet l =database.retrieve("select idMenuItems from menuitems");
//			while(l.next())
//		 	{
//		 			id=l.getInt(1);
//		 	}
//		 	l.close();
//
//
//		}catch(Exception e){
//			// //////System.out.println(e.getMessage());
//		}finally{
//			}
//		return id;
//	}
	/*----------------------------------------------------------------------------------------------------------*/
	public void updateMenuItem(Menuitems p,String validFrom,String validTo,DataSourceConnection database)
	{

		try{

			String MenuItemName=null;
			String MenuItemPrice=null;
			String MenuItemDescription=null;


			if(p.getMenuItemName()!=null)
				MenuItemName="'"+p.getMenuItemName()+"'";
			if(p.getMenuItemPrice()!=null)
				MenuItemPrice="'"+p.getMenuItemPrice()+"'";
			if(p.getMenuItemDescription()!=null)
				MenuItemDescription="'"+p.getMenuItemDescription()+"'";
			if(validFrom!=null)
				validFrom="'"+validFrom+"'";
			if(validTo!=null)
				validTo="'"+validTo+"'";
			database.update("update menuitems set MenuItemName="+MenuItemName+",MenuItemPrice="+MenuItemPrice+",MenuItemDescription="+MenuItemDescription+",MenuItemTypePer="+p.getMenuItemTypePer()+",MenuItemValidFrom="+validFrom+",MenuItemValidTo="+validTo+",MenuItemValid="+p.getMenuItemValid()+" where idMenuItems="+p.getIdMenuItems());

		}
		  catch (Exception e) { e.printStackTrace();

	      }  finally {

	      }

	}
	/*----------------------------------------------------------------------------------------------------------*/
	public void update(Integer mid,String validTo,DataSourceConnection database)
	{

		try{

			database.update("update menuitems set MenuItemValidTo='"+validTo+"',MenuItemValid=false where idMenuItems="+mid);

		}
		  catch (Exception e) { e.printStackTrace();

	      }  finally {

	      }

	}
}
