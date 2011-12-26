/* Auto generated file */

package tablespackage;

import java.util.Date;

public class Supplierexpense {

	/** auto generated
	 * @es_generated
	 */
	private Integer idSupplierExpense;
	/** auto generated
	 * @es_generated
	 */
	private Integer categoryid;
	/** auto generated
	 * @es_generated
	 */
	private String categoryName;
	/** auto generated
	 * @es_generated
	 */
	private String ExpenseItemName;
	/** auto generated
	 * @es_generated
	 */
	private Integer supplierid;
	/** auto generated
	 * @es_generated
	 */
	private Integer expenseid;
	/** auto generated
	 * @es_generated
	 */
	private String cost;
	/** auto generated
	 * @es_generated
	 */
	private Integer stock;
	/** auto generated
	 * @es_generated
	 */
	private Date validTo;
	/** auto generated
	 * @es_generated
	 */
	private Date validFrom;
	/** auto generated
	 * @es_generated
	 */
	private String validTo1;
	/** auto generated
	 * @es_generated
	 */
	private String validFrom1;
	/** auto generated
	 * @es_generated
	 */
	private Integer currancy;

	/** auto generated
	 * @es_generated
	 */
	public Supplierexpense() {
		super();
	}

	/** auto generated
	 * @es_generated
	 */
	public Supplierexpense(Integer idSupplierExpense) {
		super();
		this.idSupplierExpense = idSupplierExpense;
	}

	/** auto generated
	 * @es_generated
	 */
	public Supplierexpense(Integer idSupplierExpense,
			Integer categoryid, Integer supplierid,
			Integer expenseid, String cost, Integer stock, Date validTo,
			Date validFrom, Integer currancy) {
		super();
		this.idSupplierExpense = idSupplierExpense;
		this.categoryid = categoryid;
		this.supplierid = supplierid;
		this.expenseid = expenseid;
		this.cost = cost;
		this.stock = stock;
		this.validTo = validTo;
		this.validFrom = validFrom;
		this.currancy = currancy;
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
	public Integer getIdSupplierExpense() {
		return this.idSupplierExpense;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setIdSupplierExpense(Integer value) {
		this.idSupplierExpense = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Integer getCategoryid() {
		return this.categoryid;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setCategoryid(Integer value) {
		this.categoryid = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Integer getSupplierid() {
		return this.supplierid;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setSupplierid(Integer value) {
		this.supplierid = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Integer getExpenseid() {
		return this.expenseid;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setExpenseid(Integer value) {
		this.expenseid = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public String getCost() {
		return this.cost;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setCost(String value) {
		this.cost = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Integer getStock() {
		return this.stock;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setStock(Integer value) {
		this.stock = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Date getValidTo() {
		return this.validTo;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setValidTo(Date value) {
		this.validTo = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Date getValidFrom() {
		return this.validFrom;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setValidFrom(Date value) {
		this.validFrom = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Integer getCurrancy() {
		return this.currancy;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setCurrancy(Integer value) {
		this.currancy = value;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public String getExpenseItemName() {
		return ExpenseItemName;
	}

	public void setExpenseItemName(String expenseItemName) {
		ExpenseItemName = expenseItemName;
	}

	public String getValidFrom1() {
		return validFrom1;
	}

	public void setValidFrom1(String validFrom1) {
		this.validFrom1 = validFrom1;
	}

	public String getValidTo1() {
		return validTo1;
	}

	public void setValidTo1(String validTo1) {
		this.validTo1 = validTo1;
	}
}
