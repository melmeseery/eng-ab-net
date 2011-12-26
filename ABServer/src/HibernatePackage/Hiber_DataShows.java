package HibernatePackage;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import com.mysql.jdbc.Statement;

import database.DataSourceConnection;

import tablespackage.Courses;
import tablespackage.Datashows;
import tablespackage.Trainingcoordinators;

public class Hiber_DataShows 
{
	public ArrayList getDataShows(DataSourceConnection database)
	{
		ArrayList Al=new ArrayList();
		
		try{
		
			ResultSet l =database.retrieve("select * from datashows");
		 	while(l.next())
		 	{
		 		Datashows DS=new Datashows();
				DS.setIdDatashows(l.getInt(1));
				DS.setDatashowName(l.getString(2));
		 		DS.setDatashowPrice(l.getString(3));
		 		DS.setDatashowPurchaseDate(l.getDate(4));
		 		DS.setDatashowSalvageDate(l.getDate(5));
		 		DS.setDatashowInfo(l.getString(7));
		 		Al.add(DS);
		 	}
		 		
		 	
		}catch(Exception e){
		}finally{
			}
		return Al;
	}
	/*----------------------------------------------------------------------------------------------------------*/
	public void insertDatashow(Datashows c,String DatashowPurchaseDate,DataSourceConnection database)
	{
		try{
			
			String DatashowName=null;
			String DatashowPrice=null;
			String DatashowInfo=null;
		
			if(c.getDatashowName()!=null)
				DatashowName="'"+c.getDatashowName()+"'";
			if(c.getDatashowPrice()!=null)
				DatashowPrice="'"+c.getDatashowPrice()+"'";
			if(c.getDatashowInfo()!=null)
				DatashowInfo="'"+c.getDatashowInfo()+"'";
			if(DatashowPurchaseDate!=null)
				DatashowPurchaseDate="'"+DatashowPurchaseDate+"'";
			
			
			database.update("insert into datashows (DatashowName,DatashowPrice,DatashowPurchaseDate,DatashowInfo) values("+DatashowName+","+DatashowPrice+","+DatashowPurchaseDate+","+DatashowInfo+")");
			
		}
		  catch (Exception e) { e.printStackTrace();
	          
	      }  finally { 
	           
	      }

	}
	public Integer getLastOne(DataSourceConnection database)
	{
		Integer id=0;
		
		try{
			
			ResultSet l =database.retrieve("select idDatashows from datashows");
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
	public Datashows getDatashowById(Integer id,DataSourceConnection database)
	{
		Datashows DS=new Datashows();
		try{
			
			ResultSet l =database.retrieve("select * from datashows where idDatashows="+id);
			while(l.next())
			 {
				DS.setIdDatashows(l.getInt(1));
				DS.setDatashowName(l.getString(2));
		 		DS.setDatashowPrice(l.getString(3));
		 		DS.setDatashowPurchaseDate(l.getDate(4));
		 		DS.setDatashowSalvageDate(l.getDate(5));
		 		DS.setDatashowInfo(l.getString(7));
			 }
			 l.close();
			 
	}catch(Exception e){
		// //////System.out.println(e.getMessage());
	}finally{
		}
		return DS;
	}
/*----------------------------------------------------------------------------------------------------------*/
	public void updateDataShow(Datashows c,String datashowSalvageDate,String DatashowPurchaseDate,DataSourceConnection database)
	{
		
		try{
		
			String DatashowName=null;
			String DatashowPrice=null;
			String DatashowInfo=null;
		
			if(c.getDatashowName()!=null)
				DatashowName="'"+c.getDatashowName()+"'";
			if(c.getDatashowPrice()!=null)
				DatashowPrice="'"+c.getDatashowPrice()+"'";
			if(c.getDatashowInfo()!=null)
				DatashowInfo="'"+c.getDatashowInfo()+"'";
			if(DatashowPurchaseDate!=null)
				DatashowPurchaseDate="'"+DatashowPurchaseDate+"'";
			if(datashowSalvageDate!=null)
				datashowSalvageDate="'"+datashowSalvageDate+"'";
			
			database.update("update datashows set DatashowName="+DatashowName+",DatashowPrice="+DatashowPrice+",DatashowPurchaseDate="+DatashowPurchaseDate+",DatashowSalvageDate="+datashowSalvageDate+",DatashowInfo="+DatashowInfo+" where idDatashows="+c.getIdDatashows());
			
		}
		  catch (Exception e) { e.printStackTrace();
	          
	      }  finally { 
	           
	      }
		
	}		
}
