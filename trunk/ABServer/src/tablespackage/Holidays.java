/* Auto generated file */

package tablespackage;

import java.util.Date;

public class Holidays {

	/** auto generated
	 * @es_generated
	 */
	private Integer idHolidays;
	/** auto generated
	 * @es_generated
	 */
	private String holidayName;
	/** auto generated
	 * @es_generated
	 */
	private String holidayColor;
	/** auto generated
	 * @es_generated
	 */
	private Date startDate;
	/** auto generated
	 * @es_generated
	 */
	private Date endDate;
	/** auto generated
	 * @es_generated
	 */
	private Boolean oneDay;
	/** auto generated
	 * @es_generated
	 */
	private String holidayType;
	/** auto generated
	 * @es_generated
	 */
	private String holidayFlag;

	/** auto generated
	 * @es_generated
	 */
	public Holidays() {
		super();
	}

	/** auto generated
	 * @es_generated
	 */
	public Holidays(Integer idHolidays) {
		super();
		this.idHolidays = idHolidays;
	}

	/** auto generated
	 * @es_generated
	 */
	public Holidays(Integer idHolidays, String holidayName,
			String holidayColor, Date startDate, Date endDate, Boolean oneDay,
			String holidayType, String holidayFlag) {
		super();
		this.idHolidays = idHolidays;
		this.holidayName = holidayName;
		this.holidayColor = holidayColor;
		this.startDate = startDate;
		this.endDate = endDate;
		this.oneDay = oneDay;
		this.holidayType = holidayType;
		this.holidayFlag = holidayFlag;
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
	public Integer getIdHolidays() {
		return this.idHolidays;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setIdHolidays(Integer value) {
		this.idHolidays = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public String getHolidayName() {
		return this.holidayName;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setHolidayName(String value) {
		this.holidayName = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public String getHolidayColor() {
		return this.holidayColor;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setHolidayColor(String value) {
		this.holidayColor = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Date getStartDate() {
		return this.startDate;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setStartDate(Date value) {
		this.startDate = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Date getEndDate() {
		return this.endDate;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setEndDate(Date value) {
		this.endDate = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Boolean getOneDay() {
		return this.oneDay;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setOneDay(Boolean value) {
		this.oneDay = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public String getHolidayType() {
		return this.holidayType;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setHolidayType(String value) {
		this.holidayType = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public String getHolidayFlag() {
		return this.holidayFlag;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setHolidayFlag(String value) {
		this.holidayFlag = value;
	}
}
