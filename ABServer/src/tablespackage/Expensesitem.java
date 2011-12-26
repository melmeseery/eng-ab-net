/* Auto generated file */

package tablespackage;

import java.util.Collection;
import java.util.Date;

public class Expensesitem {

	/** auto generated
	 * @es_generated
	 */
	private Integer idExpensesItem;
	/** auto generated
	 * @es_generated
	 */
	private Collection supplierexpense;
	/** auto generated
	 * @es_generated
	 */
	private Collection contractcourseexpense;
	/** auto generated
	 * @es_generated
	 */
	private Integer expensesItem;
	/** auto generated
	 * @es_generated
	 */
	private String expenseItemName;
	/** auto generated
	 * @es_generated
	 */
	private Integer expenseItemType;
	/** auto generated
	 * @es_generated
	 */
	private Integer expenseItemCost;
	/** auto generated
	 * @es_generated
	 */
	private Boolean expenseItemValid;
	/** auto generated
	 * @es_generated
	 */
	private String expenseItemCurrentStock;
	/** auto generated
	 * @es_generated
	 */
	private Date expenseItemValidFrom;
	/** auto generated
	 * @es_generated
	 */
	private Date expenseItemValidTo;

	/** auto generated
	 * @es_generated
	 */
	public Expensesitem() {
		super();
	}

	/** auto generated
	 * @es_generated
	 */
	public Expensesitem(Integer idExpensesItem, Collection supplierexpense,
			Collection contractcourseexpense, Integer expensesItem) {
		super();
		this.idExpensesItem = idExpensesItem;
		this.supplierexpense = supplierexpense;
		this.contractcourseexpense = contractcourseexpense;
		this.expensesItem = expensesItem;
	}

	/** auto generated
	 * @es_generated
	 */
	public Expensesitem(Integer idExpensesItem, Collection supplierexpense,
			Collection contractcourseexpense, Integer expensesItem,
			String expenseItemName, Integer expenseItemType,
			Integer expenseItemCost, Boolean expenseItemValid,
			String expenseItemCurrentStock, Date expenseItemValidFrom,
			Date expenseItemValidTo) {
		super();
		this.idExpensesItem = idExpensesItem;
		this.supplierexpense = supplierexpense;
		this.contractcourseexpense = contractcourseexpense;
		this.expensesItem = expensesItem;
		this.expenseItemName = expenseItemName;
		this.expenseItemType = expenseItemType;
		this.expenseItemCost = expenseItemCost;
		this.expenseItemValid = expenseItemValid;
		this.expenseItemCurrentStock = expenseItemCurrentStock;
		this.expenseItemValidFrom = expenseItemValidFrom;
		this.expenseItemValidTo = expenseItemValidTo;
	}

	/** auto generated
	 * @es_generated
	 */
	public boolean equals(Object value) {
		//TODO Implement equals() using Business key equality.	
		return super.equals(value);
	}

	/** auto generated
	 * @es_generated
	 */
	public int hashCode() {
		//TODO Implement hashCode() using Business key equality.	
		return super.hashCode();
	}

	/** auto generated
	 * @es_generated
	 */
	public String toString() {
		//TODO Implement toString().	
		return super.toString();
	}

	/** auto generated
	 * @es_generated
	 */
	public Integer getIdExpensesItem() {
		return this.idExpensesItem;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setIdExpensesItem(Integer value) {
		this.idExpensesItem = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Collection getSupplierexpense() {
		return this.supplierexpense;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setSupplierexpense(Collection value) {
		this.supplierexpense = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Collection getContractcourseexpense() {
		return this.contractcourseexpense;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setContractcourseexpense(Collection value) {
		this.contractcourseexpense = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Integer getExpensesItem() {
		return this.expensesItem;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setExpensesItem(Integer value) {
		this.expensesItem = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public String getExpenseItemName() {
		return this.expenseItemName;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setExpenseItemName(String value) {
		this.expenseItemName = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Integer getExpenseItemType() {
		return this.expenseItemType;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setExpenseItemType(Integer value) {
		this.expenseItemType = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Integer getExpenseItemCost() {
		return this.expenseItemCost;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setExpenseItemCost(Integer value) {
		this.expenseItemCost = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Boolean getExpenseItemValid() {
		return this.expenseItemValid;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setExpenseItemValid(Boolean value) {
		this.expenseItemValid = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public String getExpenseItemCurrentStock() {
		return this.expenseItemCurrentStock;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setExpenseItemCurrentStock(String value) {
		this.expenseItemCurrentStock = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Date getExpenseItemValidFrom() {
		return this.expenseItemValidFrom;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setExpenseItemValidFrom(Date value) {
		this.expenseItemValidFrom = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Date getExpenseItemValidTo() {
		return this.expenseItemValidTo;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setExpenseItemValidTo(Date value) {
		this.expenseItemValidTo = value;
	}
}
