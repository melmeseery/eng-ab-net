/* Auto generated file */

package tablespackage;

import java.util.Date;

public class Prices {

	/** auto generated
	 * @es_generated
	 */
	private Integer idPrices;
	/** auto generated
	 * @es_generated
	 */
	private Integer courses;
	/** auto generated
	 * @es_generated
	 */
	private String priceImcCompany;
	/** auto generated
	 * @es_generated
	 */
	private String pricePublicCompany;
	/** auto generated
	 * @es_generated
	 */
	private String priceInternational;
	/** auto generated
	 * @es_generated
	 */
	private Date priceValidFrom;
	/** auto generated
	 * @es_generated
	 */
	private Boolean priceValid;
	/** auto generated
	 * @es_generated
	 */
	private Date priceValidTo;
	/** auto generated
	 * @es_generated
	 */
	private String currency;
	/** auto generated
	 * @es_generated
	 */
	private String priceImcClient;
	/** auto generated
	 * @es_generated
	 */
	private String pricePublicClient;

	/** auto generated
	 * @es_generated
	 */
	public Prices() {
		super();
	}

	/** auto generated
	 * @es_generated
	 */
	public Prices(Integer idPrices, Integer courses, Boolean priceValid) {
		super();
		this.idPrices = idPrices;
		this.courses = courses;
		this.priceValid = priceValid;
	}

	/** auto generated
	 * @es_generated
	 */
	public Prices(Integer idPrices, Integer courses, String priceImcCompany,
			String pricePublicCompany, String priceInternational,
			Date priceValidFrom, Boolean priceValid, Date priceValidTo,
			String currency, String priceImcClient, String pricePublicClient) {
		super();
		this.idPrices = idPrices;
		this.courses = courses;
		this.priceImcCompany = priceImcCompany;
		this.pricePublicCompany = pricePublicCompany;
		this.priceInternational = priceInternational;
		this.priceValidFrom = priceValidFrom;
		this.priceValid = priceValid;
		this.priceValidTo = priceValidTo;
		this.currency = currency;
		this.priceImcClient = priceImcClient;
		this.pricePublicClient = pricePublicClient;
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
	public Integer getIdPrices() {
		return this.idPrices;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setIdPrices(Integer value) {
		this.idPrices = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Integer getCourses() {
		return this.courses;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setCourses(Integer value) {
		this.courses = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public String getPriceImcCompany() {
		return this.priceImcCompany;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setPriceImcCompany(String value) {
		this.priceImcCompany = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public String getPricePublicCompany() {
		return this.pricePublicCompany;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setPricePublicCompany(String value) {
		this.pricePublicCompany = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public String getPriceInternational() {
		return this.priceInternational;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setPriceInternational(String value) {
		this.priceInternational = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Date getPriceValidFrom() {
		return this.priceValidFrom;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setPriceValidFrom(Date value) {
		this.priceValidFrom = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Boolean getPriceValid() {
		return this.priceValid;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setPriceValid(Boolean value) {
		this.priceValid = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Date getPriceValidTo() {
		return this.priceValidTo;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setPriceValidTo(Date value) {
		this.priceValidTo = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public String getCurrency() {
		return this.currency;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setCurrency(String value) {
		this.currency = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public String getPriceImcClient() {
		return this.priceImcClient;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setPriceImcClient(String value) {
		this.priceImcClient = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public String getPricePublicClient() {
		return this.pricePublicClient;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setPricePublicClient(String value) {
		this.pricePublicClient = value;
	}
}
