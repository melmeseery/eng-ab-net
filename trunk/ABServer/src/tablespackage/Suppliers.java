/* Auto generated file */

package tablespackage;

import java.util.Collection;

public class Suppliers {

	/** auto generated
	 * @es_generated
	 */
	private Integer idSupplier;
	/** auto generated
	 * @es_generated
	 */
	private Collection supplierexpense;
	/** auto generated
	 * @es_generated
	 */
	private Integer supplier;
	/** auto generated
	 * @es_generated
	 */
	private String supplierName;
	/** auto generated
	 * @es_generated
	 */
	private String supplierMobile;
	/** auto generated
	 * @es_generated
	 */
	private String supplierAddress;
	/** auto generated
	 * @es_generated
	 */
	private String supplierPhone;
	/** auto generated
	 * @es_generated
	 */
	private Collection bills;

	/** auto generated
	 * @es_generated
	 */
	public Suppliers() {
		super();
	}

	/** auto generated
	 * @es_generated
	 */
	public Suppliers(Integer idSupplier, Collection supplierexpense,
			Collection bills) {
		super();
		this.idSupplier = idSupplier;
		this.supplierexpense = supplierexpense;
		this.bills = bills;
	}

	/** auto generated
	 * @es_generated
	 */
	public Suppliers(Integer idSupplier, Collection supplierexpense,
			Integer supplier, String supplierName,
			String supplierMobile, String supplierAddress,
			String supplierPhone, Collection bills) {
		super();
		this.idSupplier = idSupplier;
		this.supplierexpense = supplierexpense;
		this.supplier = supplier;
		this.supplierName = supplierName;
		this.supplierMobile = supplierMobile;
		this.supplierAddress = supplierAddress;
		this.supplierPhone = supplierPhone;
		this.bills = bills;
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
	public Integer getIdSupplier() {
		return this.idSupplier;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setIdSupplier(Integer value) {
		this.idSupplier = value;
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
	public Integer getSupplier() {
		return this.supplier;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setSupplier(Integer value) {
		this.supplier = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public String getSupplierName() {
		return this.supplierName;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setSupplierName(String value) {
		this.supplierName = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public String getSupplierMobile() {
		return this.supplierMobile;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setSupplierMobile(String value) {
		this.supplierMobile = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public String getSupplierAddress() {
		return this.supplierAddress;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setSupplierAddress(String value) {
		this.supplierAddress = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public String getSupplierPhone() {
		return this.supplierPhone;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setSupplierPhone(String value) {
		this.supplierPhone = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Collection getBills() {
		return this.bills;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setBills(Collection value) {
		this.bills = value;
	}
}
