package HibernatePackage;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;


import com.mysql.jdbc.Statement;

import database.DataSourceConnection;

import tablespackage.Consultingareas;
import tablespackage.Courses;

public class Hiber_Consultingareas 
{
	public ArrayList<Consultingareas> getConsultingAreas(DataSourceConnection database)
	{
		ArrayList<Consultingareas> Al=new ArrayList<Consultingareas>();
		
		try{
			
			
			ResultSet l =database.retrieve("select * from consultingareas");
		 	while(l.next())
		 	{
		 		Consultingareas ca=new Consultingareas();
				ca.setIdConsultingAreas(l.getInt(1));
				ca.setConsultingAreasName(l.getString(2));	
				Al.add(ca);
		 	}
		 	l.close();
			

		}catch(Exception e){
			
		}finally{
			}
		return Al;
	}
/*----------------------------------------------------------------------------------------------------------*/
	public void insertConArea(Consultingareas d,DataSourceConnection database)
	{
		try{
			
			database.update("insert into consultingareas (ConsultingAreasName) values('"+d.getConsultingAreasName()+"')");
			
		}
		  catch (Exception e) { e.printStackTrace();
	          
	      }  finally { 
	           
	      }
	}
/*----------------------------------------------------------------------------------------------------------*/
	public void updateCA(Consultingareas c,DataSourceConnection database)
	{
		
		try{
			
			database.update("update consultingareas set ConsultingAreasName='"+c.getConsultingAreasName()+"' where idConsultingAreas="+c.getIdConsultingAreas());
			
		}
		  catch (Exception e) { e.printStackTrace();
	          
	      }  finally { 
	           
	      }
		
	}	

}
