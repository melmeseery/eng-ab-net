/* Auto generated file */

package tablespackage;

import java.util.Collection;

public class Venues {

	/** auto generated
	 * @es_generated
	 */
	private Integer idVenues;
	/** auto generated
	 * @es_generated
	 */
	private Collection menus;
	/** auto generated
	 * @es_generated
	 */
	private Integer personals;
	/** auto generated
	 * @es_generated
	 */
	private String venueName;
	/** auto generated
	 * @es_generated
	 */
	private String venueAddress;
	/** auto generated
	 * @es_generated
	 */
	private String venueDistrict;
	/** auto generated
	 * @es_generated
	 */
	private String venuMainContact;
	/** auto generated
	 * @es_generated
	 */
	private Collection contractcourse;
	/** auto generated
	 * @es_generated
	 */
	private Collection rooms;
	/** auto generated
	 * @es_generated
	 */
	private Collection personalsMany;
	/** auto generated
	 * @es_generated
	 */
	private Collection contractcourse_1;

	/** auto generated
	 * @es_generated
	 */
	public Venues() {
		super();
	}

	/** auto generated
	 * @es_generated
	 */
	public Venues(Integer idVenues, Collection menus,
			Collection contractcourse, Collection rooms,
			Collection personalsMany) {
		super();
		this.idVenues = idVenues;
		this.menus = menus;
		this.contractcourse = contractcourse;
		this.rooms = rooms;
		this.personalsMany = personalsMany;
	}

	/** auto generated
	 * @es_generated
	 */
	public Venues(Integer idVenues, Collection menus, Integer personals,
			String venueName, String venueAddress, String venueDistrict,
			String venuMainContact, Collection contractcourse,
			Collection rooms, Collection personalsMany) {
		super();
		this.idVenues = idVenues;
		this.menus = menus;
		this.personals = personals;
		this.venueName = venueName;
		this.venueAddress = venueAddress;
		this.venueDistrict = venueDistrict;
		this.venuMainContact = venuMainContact;
		this.contractcourse = contractcourse;
		this.rooms = rooms;
		this.personalsMany = personalsMany;
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
	public Integer getIdVenues() {
		return this.idVenues;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setIdVenues(Integer value) {
		this.idVenues = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Collection getMenus() {
		return this.menus;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setMenus(Collection value) {
		this.menus = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Integer getPersonals() {
		return this.personals;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setPersonals(Integer value) {
		this.personals = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public String getVenueName() {
		return this.venueName;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setVenueName(String value) {
		this.venueName = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public String getVenueAddress() {
		return this.venueAddress;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setVenueAddress(String value) {
		this.venueAddress = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public String getVenueDistrict() {
		return this.venueDistrict;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setVenueDistrict(String value) {
		this.venueDistrict = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public String getVenuMainContact() {
		return this.venuMainContact;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setVenuMainContact(String value) {
		this.venuMainContact = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Collection getContractcourse() {
		return this.contractcourse;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setContractcourse(Collection value) {
		this.contractcourse = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Collection getRooms() {
		return this.rooms;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setRooms(Collection value) {
		this.rooms = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Collection getPersonalsMany() {
		return this.personalsMany;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setPersonalsMany(Collection value) {
		this.personalsMany = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Collection getContractcourse_1() {
		return this.contractcourse_1;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setContractcourse_1(Collection value) {
		this.contractcourse_1 = value;
	}
}
