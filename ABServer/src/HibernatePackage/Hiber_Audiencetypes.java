package HibernatePackage;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import com.mysql.jdbc.Statement;

import database.DataSourceConnection;

import tablespackage.Audiencetypes;
import tablespackage.Clients;
import tablespackage.Consultingareas;

public class Hiber_Audiencetypes 
{
	public ArrayList<Audiencetypes> getAudience(DataSourceConnection database)
	{
		ArrayList<Audiencetypes> Al=new ArrayList<Audiencetypes>();
		
		try{
			
			ResultSet l =database.retrieve("select * from audiencetypes");
			while(l.next())
		 	{
				Audiencetypes DS=new Audiencetypes();
				DS.setIdAudienceTypes(l.getInt(1));
				DS.setAudienceName(l.getString(2));
				Al.add(DS);
		 	}
		 	l.close();
		 	
		 	
		}catch(Exception e){
			// //////System.out.println(e.getMessage());
		}finally{
			}
		return Al;
	}
	/*----------------------------------------------------------------------------------------------------------*/
	public void insertAudio(Audiencetypes a,DataSourceConnection database)
	{
		try{
			
			database.update("insert into audiencetypes (AudienceName) values('"+a.getAudienceName()+"')");
			
		}
		  catch (Exception e) { e.printStackTrace();

		  }
	}
	/*----------------------------------------------------------------------------------------------------------*/
	public void updateAT(Audiencetypes c,DataSourceConnection database)
	{
		
		try{
			
			
			database.update("update audiencetypes set AudienceName='"+c.getAudienceName()+"' where idAudienceTypes="+c.getIdAudienceTypes());
			
		}
		  catch (Exception e) { e.printStackTrace();
	          
	      }  finally { 
	           
	      }
		
	}	
}
