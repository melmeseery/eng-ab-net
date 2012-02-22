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
import tablespackage.Expensesitem;

public class Hiber_ExpensesItems
{
/*----------------------------------------------------------------------------------------------------------*/

	public ArrayList<Integer> getEXitemById(Integer id,DataSourceConnection database)
	{

		ArrayList<Integer> al=new ArrayList<Integer>();
		try{

			ResultSet l =database.retrieve("select idExpensesItem from expensesitem where ExpensesItem_idExpensesCategories="+id);
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

	public ArrayList<Expensesitem> getEitemById(Integer id,DataSourceConnection database)
	{

		ArrayList<Expensesitem> al=new ArrayList<Expensesitem>();
		try{

			ResultSet l =database.retrieve("select * from expensesitem where ExpensesItem_idExpensesCategories="+id);
			while(l.next())
			 {
				Expensesitem DS=new Expensesitem();
		 		DS.setIdExpensesItem(l.getInt(1));
		 		DS.setExpensesItem(l.getInt(2));
				DS.setExpenseItemName(l.getString(3));
				DS.setExpenseItemType(l.getInt(4));
				DS.setExpenseItemCost(l.getInt(5));
				DS.setExpenseItemCurrentStock(l.getString(7));
				DS.setExpenseItemValidFrom(l.getDate(8));
				DS.setExpenseItemValidTo(l.getDate(9));
		 		al.add(DS);
			 }
			 l.close();

	}catch(Exception e){
		// //////System.out.println(e.getMessage());
	}finally{
		}
		return al;
	}
	/*----------------------------------------------------------------------------------------------------------*/
	public void insertExItem(Expensesitem d,String validFrom,DataSourceConnection database)
	{
		try{

			String ExpenseItemName=null;
			String ExpenseItemType=null;
			String ExpenseItemCurrentStock=null;

			if(d.getExpenseItemName()!=null)
				ExpenseItemName="'"+d.getExpenseItemName()+"'";
			if(d.getExpenseItemType()!=null)
				ExpenseItemType="'"+d.getExpenseItemType()+"'";
			if(d.getExpenseItemCurrentStock()!=null)
				ExpenseItemCurrentStock="'"+d.getExpenseItemCurrentStock()+"'";
			if(validFrom!=null)
				validFrom="'"+validFrom+"'";
			////System.out.println("insert into Expensesitem (ExpensesItem_idExpensesCategories,ExpenseItemName,ExpenseItemType,ExpenseItemCost,ExpenseItemCurrentStock,ExpenseItemValidFrom) values("+d.getExpensesItem()+","+ExpenseItemName+","+ExpenseItemType+","+d.getExpenseItemCost()+","+ExpenseItemCurrentStock+","+validFrom+")");
			database.update("insert into expensesitem (ExpensesItem_idExpensesCategories,ExpenseItemName,ExpenseItemType,ExpenseItemCost,ExpenseItemCurrentStock,ExpenseItemValidFrom) values("+d.getExpensesItem()+","+ExpenseItemName+","+ExpenseItemType+","+d.getExpenseItemCost()+","+ExpenseItemCurrentStock+","+validFrom+")");

		}
		  catch (Exception e) { e.printStackTrace();

	      }  finally {

	      }
	}
/*------------------------------------------------------------------------------------*/
	public ArrayList<Expensesitem> getExItems(DataSourceConnection database)
	{
		ArrayList<Expensesitem> Al=new ArrayList<Expensesitem>();
		try{

			ResultSet l =database.retrieve("select * from expensesitem");
		 	while(l.next())
		 	{
		 		Expensesitem DS=new Expensesitem();
		 		DS.setIdExpensesItem(l.getInt(1));
		 		DS.setExpensesItem(l.getInt(2));
				DS.setExpenseItemName(l.getString(3));
				DS.setExpenseItemType(l.getInt(4));
				DS.setExpenseItemCost(l.getInt(5));
				DS.setExpenseItemCurrentStock(l.getString(7));
				DS.setExpenseItemValidFrom(l.getDate(8));
				DS.setExpenseItemValidTo(l.getDate(9));
		 		Al.add(DS);
		 	}
		 	l.close();



		}catch(Exception e){

		}finally{
			}
		return Al;
	}
	/*----------------------------------------------------------------------------------------------------------*/
	public Expensesitem getItemById(Integer id,DataSourceConnection database)
	{
		Expensesitem DS=new Expensesitem();
		try{

			ResultSet l =database.retrieve("select * from expensesitem where idExpensesItem="+id);
		 	if(l.next())
		 	{
		 		DS.setIdExpensesItem(l.getInt(1));
		 		DS.setExpensesItem(l.getInt(2));
				DS.setExpenseItemName(l.getString(3));
				DS.setExpenseItemType(l.getInt(4));
				DS.setExpenseItemCost(l.getInt(5));
				DS.setExpenseItemCurrentStock(l.getString(7));
				DS.setExpenseItemValidFrom(l.getDate(8));
				DS.setExpenseItemValidTo(l.getDate(9));
		 	}
		 	////System.out.println();
		 	l.close();

		}catch(Exception e){e.printStackTrace();
		}


		return DS;
	}
	/*----------------------------------------------------------------------------------------*/
	public Integer getValidExpenseItem(int idCategories , DataSourceConnection database)
	{
		Integer id=0;

		try{

			ResultSet l =database.retrieve("select idExpensesItem from expensesitem  where ExpenseItemValid=true  And ExpensesItem_idExpensesCategories=" +idCategories );
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

			database.update("update expensesitem set ExpenseItemValid=false, ExpenseItemValidTo='"+validTo+"' where idExpensesItem="+mid);

		}
		  catch (Exception e) { e.printStackTrace();

	      }  finally {

	      }

	}
/*-------------------------------------------------------------------------------------------*/
	public void updateItem(Expensesitem d,String validFrom,String validTo,DataSourceConnection database)
	{
		try{

			String ExpenseItemName=null;
		//	String ExpenseItemType=null;
			String ExpenseItemCurrentStock=null;

			if(d.getExpenseItemName()!=null)
				ExpenseItemName="'"+d.getExpenseItemName()+"'";
			if(d.getExpenseItemCurrentStock()!=null)
				ExpenseItemCurrentStock="'"+d.getExpenseItemCurrentStock()+"'";
			if(validFrom!=null)
				validFrom="'"+validFrom+"'";
			if(validTo!=null)
				validTo="'"+validTo+"'";
		//	//System.out.println("update Expensesitem set ExpenseItemName="+ExpenseItemName+",ExpenseItemType="+d.getExpenseItemType()+",ExpenseItemCurrentStock="+ExpenseItemCurrentStock+",ExpenseItemValidFrom="+validFrom+",ExpenseItemCost="+d.getExpenseItemCost()+" where idExpensesItem="+d.getIdExpensesItem());
			database.update("update expensesitem set ExpenseItemName="+ExpenseItemName+",ExpenseItemType="+d.getExpenseItemType()+",ExpenseItemCurrentStock="+ExpenseItemCurrentStock+",ExpenseItemValidFrom="+validFrom+",ExpenseItemValidTo="+validTo+",ExpenseItemCost="+d.getExpenseItemCost()+" where idExpensesItem="+d.getIdExpensesItem());


		}
		  catch (Exception e) { e.printStackTrace();

	      }  finally {

	      }
	}
}
