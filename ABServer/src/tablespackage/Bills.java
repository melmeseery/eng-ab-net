/* Auto generated file */

package tablespackage;

import java.util.Collection;
import java.util.Date;

public class Bills {

	/** auto generated
	 * @es_generated
	 */
	private Integer idBills;
	/** auto generated
	 * @es_generated
	 */
	private Collection contractcourseexpense;
	/** auto generated
	 * @es_generated
	 */
	private Suppliers billSuppliers;
	/** auto generated
	 * @es_generated
	 */
	private String billNo;
	/** auto generated
	 * @es_generated
	 */
	private Date billDate;
	/** auto generated
	 * @es_generated
	 */
	private Date billCoverStartDate;
	/** auto generated
	 * @es_generated
	 */
	private Date billCoverEndDate;
	/** auto generated
	 * @es_generated
	 */
	private String billTotalAmount;
	/** auto generated
	 * @es_generated
	 */
	private Date billPayDate;
	/** auto generated
	 * @es_generated
	 */
	private Boolean billPayed;

	/** auto generated
	 * @es_generated
	 */
	public Bills() {
		super();
	}

	/** auto generated
	 * @es_generated
	 */
	public Bills(Integer idBills, Collection contractcourseexpense) {
		super();
		this.idBills = idBills;
		this.contractcourseexpense = contractcourseexpense;
	}

	/** auto generated
	 * @es_generated
	 */
	public Bills(Integer idBills, Collection contractcourseexpense,
			Suppliers billSuppliers, String billNo, Date billDate,
			Date billCoverStartDate, Date billCoverEndDate,
			String billTotalAmount, Date billPayDate, Boolean billPayed) {
		super();
		this.idBills = idBills;
		this.contractcourseexpense = contractcourseexpense;
		this.billSuppliers = billSuppliers;
		this.billNo = billNo;
		this.billDate = billDate;
		this.billCoverStartDate = billCoverStartDate;
		this.billCoverEndDate = billCoverEndDate;
		this.billTotalAmount = billTotalAmount;
		this.billPayDate = billPayDate;
		this.billPayed = billPayed;
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
	public Integer getIdBills() {
		return this.idBills;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setIdBills(Integer value) {
		this.idBills = value;
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
	public Suppliers getBillSuppliers() {
		return this.billSuppliers;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setBillSuppliers(Suppliers value) {
		this.billSuppliers = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public String getBillNo() {
		return this.billNo;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setBillNo(String value) {
		this.billNo = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Date getBillDate() {
		return this.billDate;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setBillDate(Date value) {
		this.billDate = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Date getBillCoverStartDate() {
		return this.billCoverStartDate;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setBillCoverStartDate(Date value) {
		this.billCoverStartDate = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Date getBillCoverEndDate() {
		return this.billCoverEndDate;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setBillCoverEndDate(Date value) {
		this.billCoverEndDate = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public String getBillTotalAmount() {
		return this.billTotalAmount;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setBillTotalAmount(String value) {
		this.billTotalAmount = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Date getBillPayDate() {
		return this.billPayDate;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setBillPayDate(Date value) {
		this.billPayDate = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Boolean getBillPayed() {
		return this.billPayed;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setBillPayed(Boolean value) {
		this.billPayed = value;
	}
}
