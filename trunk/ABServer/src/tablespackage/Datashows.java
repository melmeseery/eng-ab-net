/* Auto generated file */

package tablespackage;

import java.util.Collection;
import java.util.Date;

public class Datashows {

	/** auto generated
	 * @es_generated
	 */
	private Integer idDatashows;
	/** auto generated
	 * @es_generated
	 */
	private Collection datashowsmaintainance;
	/** auto generated
	 * @es_generated
	 */
	private String datashowName;
	/** auto generated
	 * @es_generated
	 */
	private String datashowPrice;
	/** auto generated
	 * @es_generated
	 */
	private Date datashowPurchaseDate;
	/** auto generated
	 * @es_generated
	 */
	private Date datashowSalvageDate;
	/** auto generated
	 * @es_generated
	 */
	private Boolean datashowValid;
	/** auto generated
	 * @es_generated
	 */
	private String datashowInfo;

	/** auto generated
	 * @es_generated
	 */
	public Datashows() {
		super();
	}

	/** auto generated
	 * @es_generated
	 */
	public Datashows(Integer idDatashows, Collection datashowsmaintainance) {
		super();
		this.idDatashows = idDatashows;
		this.datashowsmaintainance = datashowsmaintainance;
	}

	/** auto generated
	 * @es_generated
	 */
	public Datashows(Integer idDatashows, Collection datashowsmaintainance,
			String datashowName, String datashowPrice,
			Date datashowPurchaseDate, Date datashowSalvageDate,
			Boolean datashowValid, String datashowInfo) {
		super();
		this.idDatashows = idDatashows;
		this.datashowsmaintainance = datashowsmaintainance;
		this.datashowName = datashowName;
		this.datashowPrice = datashowPrice;
		this.datashowPurchaseDate = datashowPurchaseDate;
		this.datashowSalvageDate = datashowSalvageDate;
		this.datashowValid = datashowValid;
		this.datashowInfo = datashowInfo;
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
	public Integer getIdDatashows() {
		return this.idDatashows;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setIdDatashows(Integer value) {
		this.idDatashows = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Collection getDatashowsmaintainance() {
		return this.datashowsmaintainance;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setDatashowsmaintainance(Collection value) {
		this.datashowsmaintainance = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public String getDatashowName() {
		return this.datashowName;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setDatashowName(String value) {
		this.datashowName = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public String getDatashowPrice() {
		return this.datashowPrice;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setDatashowPrice(String value) {
		this.datashowPrice = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Date getDatashowPurchaseDate() {
		return this.datashowPurchaseDate;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setDatashowPurchaseDate(Date value) {
		this.datashowPurchaseDate = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Date getDatashowSalvageDate() {
		return this.datashowSalvageDate;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setDatashowSalvageDate(Date value) {
		this.datashowSalvageDate = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Boolean getDatashowValid() {
		return this.datashowValid;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setDatashowValid(Boolean value) {
		this.datashowValid = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public String getDatashowInfo() {
		return this.datashowInfo;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setDatashowInfo(String value) {
		this.datashowInfo = value;
	}
}
