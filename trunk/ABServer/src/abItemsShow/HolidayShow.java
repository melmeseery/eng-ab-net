/**
 * 
 */
package abItemsShow;

/**
 * @author noha
 *
 */
public class HolidayShow {

	int     HolidayID;
	String  HolidayName;
	String  HolidayColor;
	boolean OneDay;
	String    starttime;
	String    endtime;
	/**
	 * 
	 */
	public HolidayShow() {
		HolidayID = 0;
		HolidayName = "";
		HolidayColor = "yellow";
		OneDay = true;
		starttime = "";
		endtime = "";
	}

	/**
	 * @return the holidayColor
	 */
	public String getHolidayColor() {
		return HolidayColor;
	}
	/**
	 * @param holidayColor the holidayColor to set
	 */
	public void setHolidayColor(String holidayColor) {
		HolidayColor = holidayColor;
	}
	/**
	 * @return the holidayID
	 */
	public int getHolidayID() {
		return HolidayID;
	}
	/**
	 * @param holidayID the holidayID to set
	 */
	public void setHolidayID(int holidayID) {
		HolidayID = holidayID;
	}
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
	 * @return the oneDay
	 */
	public boolean isOneDay() {
		return OneDay;
	}
	/**
	 * @param oneDay the oneDay to set
	 */
	public void setOneDay(boolean oneDay) {
		OneDay = oneDay;
	}

	/**
	 * @return the endtime
	 */
	public String getEndtime() {
		return endtime;
	}

	/**
	 * @param endtime the endtime to set
	 */
	public void setEndtime(String endtime) {
		this.endtime = endtime;
	}

	/**
	 * @return the starttime
	 */
	public String getStarttime() {
		return starttime;
	}

	/**
	 * @param starttime the starttime to set
	 */
	public void setStarttime(String starttime) {
		this.starttime = starttime;
	}
	
	
}

