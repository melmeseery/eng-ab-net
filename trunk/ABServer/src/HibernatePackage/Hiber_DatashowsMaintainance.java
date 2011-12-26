package HibernatePackage;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import com.mysql.jdbc.Statement;

import database.DataSourceConnection;

import tablespackage.Datashows;
import tablespackage.Datashowsmaintainance;
import tablespackage.Trainingcoordinatehistory;
import tablespackage.Trainingcoordinators;

public class Hiber_DatashowsMaintainance 
{
	/*----------------------------------------------------------------------------------------------------------*/
	public void insertDataMaintainance(Datashowsmaintainance c,String DatashowsMaintainanceDate,DataSourceConnection database)
	{
		try{
			
			String DatashowsMaintainanceCost=null;
			String DatashowsMaintainanceReason=null;
		
			if(c.getDatashowsMaintainanceCost()!=null)
				DatashowsMaintainanceCost="'"+c.getDatashowsMaintainanceCost()+"'";
			if(c.getDatashowsMaintainanceReason()!=null)
				DatashowsMaintainanceReason="'"+c.getDatashowsMaintainanceReason()+"'";
			if(DatashowsMaintainanceDate!=null)
				DatashowsMaintainanceDate="'"+DatashowsMaintainanceDate+"'";
			
			
			database.update("insert into datashowsmaintainance (DatashowsMaintainance_idDatashows,DatashowsMaintainanceCost,DatashowsMaintainanceDate,DatashowsMaintainanceReason) values("+c.getDatashowsMaintainance()+","+DatashowsMaintainanceCost+","+DatashowsMaintainanceDate+","+DatashowsMaintainanceReason+")");
			
		}
		  catch (Exception e) { e.printStackTrace();
	          
	      }  finally { 
	           
	      }

		
	}
/*----------------------------------------------------------------------------------------------------------*/
	
	public ArrayList<Integer> getDatashowsById(Integer id,DataSourceConnection database)
	{
		
		ArrayList<Integer> al=new ArrayList<Integer>();
		try{
			
			ResultSet l =database.retrieve("select idDatashowsMaintainance from datashowsmaintainance where DatashowsMaintainance_idDatashows="+id);
			while(l.next())
			 {
				al.add(l.getInt(1));
			 }
			 l.close();
			 
	}catch(Exception e){
		// //////System.out.println(e.getMessage());
	}finally{
		}
		return al;
	}
/*----------------------------------------------------------------------------------------------------------*/
	
	public Datashowsmaintainance getDataMainById(Integer id,DataSourceConnection database)
	{
		
		Datashowsmaintainance d=new Datashowsmaintainance();
		try{
			
			ResultSet l =database.retrieve("select * from datashowsmaintainance where idDatashowsMaintainance="+id);
			while(l.next())
			 {
				d.setIdDatashowsMaintainance(l.getInt(1));
				d.setDatashowsMaintainance(l.getInt(2));
				d.setDatashowsMaintainanceCost(l.getString(3));
				d.setDatashowsMaintainanceDate(l.getDate(4));
				d.setDatashowsMaintainanceReason(l.getString(5));
				//al.add(d);
			 }
			 l.close();
			
	}catch(Exception e){
		// //////System.out.println(e.getMessage());
	}finally{
		}
		return d;
	}	
	/*----------------------------------------------------------------------------------------------------------*/
	public void updateDataHistory(Datashowsmaintainance c,String DatashowsMaintainanceDate,DataSourceConnection database)
	{
		
		try{
			
			String DatashowsMaintainanceCost=null;
			String DatashowsMaintainanceReason=null;
		
			if(c.getDatashowsMaintainanceCost()!=null)
				DatashowsMaintainanceCost="'"+c.getDatashowsMaintainanceCost()+"'";
			if(c.getDatashowsMaintainanceReason()!=null)
				DatashowsMaintainanceReason="'"+c.getDatashowsMaintainanceReason()+"'";
			if(DatashowsMaintainanceDate!=null)
				DatashowsMaintainanceDate="'"+DatashowsMaintainanceDate+"'";
			
			
			database.update("update datashowsmaintainance set DatashowsMaintainanceCost="+DatashowsMaintainanceCost+",DatashowsMaintainanceDate="+DatashowsMaintainanceDate+",DatashowsMaintainanceReason="+DatashowsMaintainanceReason+" where idDatashowsMaintainance="+c.getIdDatashowsMaintainance());
			
		}
		  catch (Exception e) { e.printStackTrace();
	          
	      }  finally { 
	           
	      }
		
	}		
}
