/**
 * 
 */
package abItemsShow;

import java.util.Date;

/**
 * @author noha
 *
 */
public class ResourceHolidayShow {

	int holidayId = 0;
	String  HolidayName;

	String    fromDate;
	String    toDate;
	
	/**
	 * @return the holidayName
	 */
	public String getHolidayName() {
		return HolidayName;
	}
	/**
	 * @param holidayName the holidayName to set
	 */
	public void setHolidayName(String holidayName) {
		HolidayName = holidayName;
	}
	
	/**
	 * @return the holidayId
	 */
	public int getHolidayId() {
		return holidayId;
	}
	/**
	 * @param holidayId the holidayId to set
	 */
	public void setHolidayId(int holidayId) {
		this.holidayId = holidayId;
	}
	/**
	 * @return the fromDate
	 */
	public String getFromDate() {
		return fromDate;
	}
	/**
	 * @param fromDate the fromDate to set
	 */
	public void setFromDate(String fromDate) {
		this.fromDate = fromDate;
	}
	/**
	 * @return the toDate
	 */
	public String getToDate() {
		return toDate;
	}
	/**
	 * @param toDate the toDate to set
	 */
	public void setToDate(String toDate) {
		this.toDate = toDate;
	}
	
}
