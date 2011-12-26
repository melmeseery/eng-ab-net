/* Auto generated file */

package tablespackage;

public class Contractcourseexpense {

	/** auto generated
	 * @es_generated
	 */
	private Integer contractcourseexpenseId;
	/** auto generated
	 * @es_generated
	 */
	private Expensesitem expensesItem;
	/** auto generated
	 * @es_generated
	 */
	private Bills bills;
	/** auto generated
	 * @es_generated
	 */
	private Integer idContractCourseExpenseActualCount;
	/** auto generated
	 * @es_generated
	 */
	private Byte idContractCourseExpenseValue;
	/** auto generated
	 * @es_generated
	 */
	private Integer contractCourseCoursesIdCourses;
	/** auto generated
	 * @es_generated
	 */
	private Integer contractCourseContractsIdContracts;

	/** auto generated
	 * @es_generated
	 */
	public Contractcourseexpense() {
		super();
	}

	/** auto generated
	 * @es_generated
	 */
	public Contractcourseexpense(Integer contractcourseexpenseId) {
		super();
		this.contractcourseexpenseId = contractcourseexpenseId;
	}

	/** auto generated
	 * @es_generated
	 */
	public Contractcourseexpense(Integer contractcourseexpenseId,
			Expensesitem expensesItem, Bills bills,
			Integer idContractCourseExpenseActualCount,
			Byte idContractCourseExpenseValue,
			Integer contractCourseCoursesIdCourses,
			Integer contractCourseContractsIdContracts) {
		super();
		this.contractcourseexpenseId = contractcourseexpenseId;
		this.expensesItem = expensesItem;
		this.bills = bills;
		this.idContractCourseExpenseActualCount = idContractCourseExpenseActualCount;
		this.idContractCourseExpenseValue = idContractCourseExpenseValue;
		this.contractCourseCoursesIdCourses = contractCourseCoursesIdCourses;
		this.contractCourseContractsIdContracts = contractCourseContractsIdContracts;
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
	public Integer getContractcourseexpenseId() {
		return this.contractcourseexpenseId;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setContractcourseexpenseId(Integer value) {
		this.contractcourseexpenseId = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Expensesitem getExpensesItem() {
		return this.expensesItem;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setExpensesItem(Expensesitem value) {
		this.expensesItem = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Bills getBills() {
		return this.bills;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setBills(Bills value) {
		this.bills = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Integer getIdContractCourseExpenseActualCount() {
		return this.idContractCourseExpenseActualCount;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setIdContractCourseExpenseActualCount(Integer value) {
		this.idContractCourseExpenseActualCount = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Byte getIdContractCourseExpenseValue() {
		return this.idContractCourseExpenseValue;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setIdContractCourseExpenseValue(Byte value) {
		this.idContractCourseExpenseValue = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Integer getContractCourseCoursesIdCourses() {
		return this.contractCourseCoursesIdCourses;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setContractCourseCoursesIdCourses(Integer value) {
		this.contractCourseCoursesIdCourses = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Integer getContractCourseContractsIdContracts() {
		return this.contractCourseContractsIdContracts;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setContractCourseContractsIdContracts(Integer value) {
		this.contractCourseContractsIdContracts = value;
	}
}
