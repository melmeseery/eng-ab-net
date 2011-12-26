package HibernatePackage;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;


import com.mysql.jdbc.Statement;

import database.DataSourceConnection;

import tablespackage.Expensescategories;
import tablespackage.Supplierexpense;
import tablespackage.Suppliers;
import tablespackage.Teams;
import tablespackage.Trainingcoordinators;

public class Hiber_Suppliers
{
	public ArrayList<Suppliers> getSuppliers(DataSourceConnection database)
	{
		ArrayList<Suppliers> Al=new ArrayList<Suppliers>();
		
		try{
			
			ResultSet l =database.retrieve("select * from suppliers");
			while(l.next())
		 	{
				Suppliers DS=new Suppliers();
				DS.setIdSupplier(l.getInt(1));
		 		DS.setSupplierName(l.getString(2));
		 		DS.setSupplierMobile(l.getString(3));
		 		DS.setSupplierAddress(l.getString(4));
		 		DS.setSupplierPhone(l.getString(5));
		 		DS.setSupplier(l.getInt(6));
		 		Al.add(DS);
		 	}
			l.close();
			
		}catch(Exception e){
			
		}finally{
			}
		return Al;
	}
	/////////////////////////////////////////////////////////////////////////////////////////
	public ArrayList<Supplierexpense> getSuppliersExpenses(Integer id,DataSourceConnection database)
	{
		ArrayList<Supplierexpense> Al=new ArrayList<Supplierexpense>();
		
		try{
			
			ResultSet l =database.retrieve("select * from supplierexpense where Supplierid="+id);
			while(l.next())
		 	{
				Supplierexpense DS=new Supplierexpense();
				DS.setSupplierid(l.getInt(1));
				DS.setExpenseid(l.getInt(2));
				DS.setCost(l.getString(3));
				DS.setStock(l.getInt(4));
				DS.setValidTo(l.getDate(5));
				DS.setValidFrom(l.getDate(6));
				DS.setCurrancy(l.getInt(7));
				DS.setIdSupplierExpense(l.getInt(8));
				DS.setCategoryid(l.getInt(9));
		 		Al.add(DS);
		 	}
			l.close();
			
		}catch(Exception e){
			
		}finally{
			}
		return Al;
	}
	/*---------------------------------------------------------------------------------------*/
	public void insertSupplier(Suppliers t,DataSourceConnection database)
	{
		try{
			
			
			String name=null;
			String mobile=null;
			String address=null;
			String phone=null;
			
			if(t.getSupplierAddress()!=null)
				address="'"+t.getSupplierAddress()+"'";
			if(t.getSupplierMobile()!=null)
				mobile="'"+t.getSupplierMobile()+"'";
			if(t.getSupplierName()!=null)
				name="'"+t.getSupplierName()+"'";
			if(t.getSupplierPhone()!=null)
				phone="'"+t.getSupplierPhone()+"'";
			
			database.update("insert into suppliers (SupplierName,SupplierMobile,SupplierAddress,SupplierPhone) values("+name+","+mobile+","+address+","+phone+")");
			
		}
		  catch (Exception e) { e.printStackTrace();
	          
	      }  finally { 
	           
	      }
	}
	/*---------------------------------------------------------------------------------------*/
	public void insertSupplierExpense(Supplierexpense s,String validFrom,String validTo,DataSourceConnection database)
	{
		try{

			
			String cost=null;
			String stock=null;
			String curr=null;
			
			
			if(s.getCost()!=null)
				cost="'"+s.getCost()+"'";
			if(s.getStock()!=null)
				stock="'"+s.getStock()+"'";
			if(s.getCurrancy()!=null)
				curr="'"+s.getCurrancy()+"'";
			if(validFrom!=null)
				validFrom="'"+validFrom+"'";
			if(validTo!=null)
				validTo="'"+validTo+"'";
			
			database.update("insert into supplierexpense (Supplierid,Expenseid,cost,stock,ValidTo,ValidFrom,Currancy,categoryid) values("+s.getSupplierid()+","+s.getExpenseid()+","+cost+","+stock+","+validTo+","+validFrom+","+curr+","+s.getCategoryid()+")");
			
		}
		  catch (Exception e) { e.printStackTrace();
	          
	      }  finally { 
	           
	      }
	}	
	/*-------------------------------------------------------------------------------------------*/
	public void updateSupplier(Suppliers t,DataSourceConnection database)
	{
		
		try{
			
			String name=null;
			String mobile=null;
			String address=null;
			String phone=null;
			
			if(t.getSupplierAddress()!=null)
				address="'"+t.getSupplierAddress()+"'";
			if(t.getSupplierMobile()!=null)
				mobile="'"+t.getSupplierMobile()+"'";
			if(t.getSupplierName()!=null)
				name="'"+t.getSupplierName()+"'";
			if(t.getSupplierPhone()!=null)
				phone="'"+t.getSupplierPhone()+"'";
			
			database.update("update suppliers set SupplierName="+name+",SupplierAddress="+address+",SupplierMobile="+mobile+",SupplierPhone="+phone+" where idSupplier="+t.getIdSupplier());
			
		}
		  catch (Exception e) { e.printStackTrace();
	          
	      }  finally { 
	           
	      }
		
	}		
	/*-------------------------------------------------------------------------------------------*/
	public void updateItem(Supplierexpense t,String vf,String vt,DataSourceConnection database)
	{
		
		try{

			String cost=null;
			
			
			if(t.getCost()!=null)
				cost="'"+t.getCost()+"'";
			if(vf!=null)
				vf="'"+vf+"'";
			if(vt!=null)
				vt="'"+vt+"'";
			
			
			////System.out.println("update Supplierexpense set Supplierid="+t.getSupplierid()+",Expenseid="+t.getExpenseid()+",cost="+cost+",stock="+t.getStock()+",ValidTo="+vt+",ValidFrom="+vf+",categoryid="+t.getCategoryid()+" where idSupplierExpense="+t.getIdSupplierExpense());
			database.update("update supplierexpense set Supplierid="+t.getSupplierid()+",Expenseid="+t.getExpenseid()+",cost="+cost+",stock="+t.getStock()+",ValidTo="+vt+",ValidFrom="+vf+",categoryid="+t.getCategoryid()+" where idSupplierExpense="+t.getIdSupplierExpense());
			
		}
		  catch (Exception e) { e.printStackTrace();
	          
	      }  finally { 
	           
	      }
		
	}			
}
