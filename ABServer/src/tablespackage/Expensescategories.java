/* Auto generated file */

package tablespackage;

import java.util.Collection;

public class Expensescategories {

	/** auto generated
	 * @es_generated
	 */
	private Integer idExpensesCategories;
	/** auto generated
	 * @es_generated
	 */
	private Collection supplierexpense;
	/** auto generated
	 * @es_generated
	 */
	private Collection suppliers;
	/** auto generated
	 * @es_generated
	 */
	private Integer categoryParentId;
	/** auto generated
	 * @es_generated
	 */
	private Collection expensescategories;
	/** auto generated
	 * @es_generated
	 */
	private String categoryName;
	/** auto generated
	 * @es_generated
	 */
	private String categoryType;
	/** auto generated
	 * @es_generated
	 */
	private String categoryParentName;
	/** auto generated
	 * @es_generated
	 */
	private Collection expensesitem;

	/** auto generated
	 * @es_generated
	 */
	public Expensescategories() {
		super();
	}

	/** auto generated
	 * @es_generated
	 */
	public Expensescategories(Integer idExpensesCategories,
			Collection supplierexpense, Collection suppliers,
			Collection expensescategories, Collection expensesitem) {
		super();
		this.idExpensesCategories = idExpensesCategories;
		this.supplierexpense = supplierexpense;
		this.suppliers = suppliers;
		this.expensescategories = expensescategories;
		this.expensesitem = expensesitem;
	}

	/** auto generated
	 * @es_generated
	 */
	public Expensescategories(Integer idExpensesCategories,
			Collection supplierexpense, Collection suppliers,
			Integer categoryParentId, Collection expensescategories,
			String categoryName, String categoryType,
			String categoryParentName, Collection expensesitem) {
		super();
		this.idExpensesCategories = idExpensesCategories;
		this.supplierexpense = supplierexpense;
		this.suppliers = suppliers;
		this.categoryParentId = categoryParentId;
		this.expensescategories = expensescategories;
		this.categoryName = categoryName;
		this.categoryType = categoryType;
		this.categoryParentName = categoryParentName;
		this.expensesitem = expensesitem;
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
	public Integer getIdExpensesCategories() {
		return this.idExpensesCategories;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setIdExpensesCategories(Integer value) {
		this.idExpensesCategories = value;
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
	public Collection getSuppliers() {
		return this.suppliers;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setSuppliers(Collection value) {
		this.suppliers = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Integer getCategoryParentId() {
		return this.categoryParentId;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setCategoryParentId(Integer value) {
		this.categoryParentId = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Collection getExpensescategories() {
		return this.expensescategories;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setExpensescategories(Collection value) {
		this.expensescategories = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public String getCategoryName() {
		return this.categoryName;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setCategoryName(String value) {
		this.categoryName = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public String getCategoryType() {
		return this.categoryType;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setCategoryType(String value) {
		this.categoryType = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public String getCategoryParentName() {
		return this.categoryParentName;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setCategoryParentName(String value) {
		this.categoryParentName = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Collection getExpensesitem() {
		return this.expensesitem;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setExpensesitem(Collection value) {
		this.expensesitem = value;
	}
}
