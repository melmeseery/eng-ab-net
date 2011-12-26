/* Auto generated file */

package tablespackage;

import java.util.Date;

public class Eventday {

	/** auto generated
	 * @es_generated
	 */
	private Integer eventDayid;
	/** auto generated
	 * @es_generated
	 */
	private Contractcourse eventDayContract;
	/** auto generated
	 * @es_generated
	 */
	private Date eventDayDate;
	/** auto generated
	 * @es_generated
	 */
	private String eventDayPeriod;
	/** auto generated
	 * @es_generated
	 */
	private Boolean eventDayisFullDay;
	/** auto generated
	 * @es_generated
	 */
	private Integer eventDayDayNo;

	/** auto generated
	 * @es_generated
	 */
	public Eventday() {
		super();
	}

	/** auto generated
	 * @es_generated
	 */
	public Eventday(Integer eventDayid) {
		super();
		this.eventDayid = eventDayid;
	}

	/** auto generated
	 * @es_generated
	 */
	public Eventday(Integer eventDayid, Contractcourse eventDayContract,
			Date eventDayDate, String eventDayPeriod,
			Boolean eventDayisFullDay, Integer eventDayDayNo) {
		super();
		this.eventDayid = eventDayid;
		this.eventDayContract = eventDayContract;
		this.eventDayDate = eventDayDate;
		this.eventDayPeriod = eventDayPeriod;
		this.eventDayisFullDay = eventDayisFullDay;
		this.eventDayDayNo = eventDayDayNo;
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
	public Integer getEventDayid() {
		return this.eventDayid;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setEventDayid(Integer value) {
		this.eventDayid = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Contractcourse getEventDayContract() {
		return this.eventDayContract;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setEventDayContract(Contractcourse value) {
		this.eventDayContract = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Date getEventDayDate() {
		return this.eventDayDate;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setEventDayDate(Date value) {
		this.eventDayDate = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public String getEventDayPeriod() {
		return this.eventDayPeriod;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setEventDayPeriod(String value) {
		this.eventDayPeriod = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Boolean getEventDayisFullDay() {
		return this.eventDayisFullDay;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setEventDayisFullDay(Boolean value) {
		this.eventDayisFullDay = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Integer getEventDayDayNo() {
		return this.eventDayDayNo;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setEventDayDayNo(Integer value) {
		this.eventDayDayNo = value;
	}
}
