/* Auto generated file */

package tablespackage;

import java.util.Collection;

public class Personals {

	/** auto generated
	 * @es_generated
	 */
	private Integer idPersonals;
	/** auto generated
	 * @es_generated
	 */
	private String personFirstName;
	/** auto generated
	 * @es_generated
	 */
	private String personLastName;
	/** auto generated
	 * @es_generated
	 */
	private String personEmail;
	/** auto generated
	 * @es_generated
	 */
	private String personTitle;
	/** auto generated
	 * @es_generated
	 */
	private String personTelePhone;
	/** auto generated
	 * @es_generated
	 */
	private String personMobile;
	/** auto generated
	 * @es_generated
	 */
	private String personAddress;
	/** auto generated
	 * @es_generated
	 */
	private Collection clients;
	/** auto generated
	 * @es_generated
	 */
	private Collection venues;
	/** auto generated
	 * @es_generated
	 */
	private Collection clientsMany;
	/** auto generated
	 * @es_generated
	 */
	private Collection venuesMany;

	/** auto generated
	 * @es_generated
	 */
	public Personals() {
		super();
	}

	/** auto generated
	 * @es_generated
	 */
	public Personals(Integer idPersonals, Collection clients,
			Collection venues, Collection clientsMany, Collection venuesMany) {
		super();
		this.idPersonals = idPersonals;
		this.clients = clients;
		this.venues = venues;
		this.clientsMany = clientsMany;
		this.venuesMany = venuesMany;
	}

	/** auto generated
	 * @es_generated
	 */
	public Personals(Integer idPersonals, String personFirstName,
			String personLastName, String personEmail, String personTitle,
			String personTelePhone, String personMobile, String personAddress,
			Collection clients, Collection venues, Collection clientsMany,
			Collection venuesMany) {
		super();
		this.idPersonals = idPersonals;
		this.personFirstName = personFirstName;
		this.personLastName = personLastName;
		this.personEmail = personEmail;
		this.personTitle = personTitle;
		this.personTelePhone = personTelePhone;
		this.personMobile = personMobile;
		this.personAddress = personAddress;
		this.clients = clients;
		this.venues = venues;
		this.clientsMany = clientsMany;
		this.venuesMany = venuesMany;
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
	public Integer getIdPersonals() {
		return this.idPersonals;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setIdPersonals(Integer value) {
		this.idPersonals = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public String getPersonFirstName() {
		return this.personFirstName;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setPersonFirstName(String value) {
		this.personFirstName = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public String getPersonLastName() {
		return this.personLastName;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setPersonLastName(String value) {
		this.personLastName = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public String getPersonEmail() {
		return this.personEmail;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setPersonEmail(String value) {
		this.personEmail = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public String getPersonTitle() {
		return this.personTitle;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setPersonTitle(String value) {
		this.personTitle = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public String getPersonTelePhone() {
		return this.personTelePhone;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setPersonTelePhone(String value) {
		this.personTelePhone = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public String getPersonMobile() {
		return this.personMobile;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setPersonMobile(String value) {
		this.personMobile = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public String getPersonAddress() {
		return this.personAddress;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setPersonAddress(String value) {
		this.personAddress = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Collection getClients() {
		return this.clients;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setClients(Collection value) {
		this.clients = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Collection getVenues() {
		return this.venues;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setVenues(Collection value) {
		this.venues = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Collection getClientsMany() {
		return this.clientsMany;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setClientsMany(Collection value) {
		this.clientsMany = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Collection getVenuesMany() {
		return this.venuesMany;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setVenuesMany(Collection value) {
		this.venuesMany = value;
	}
}
