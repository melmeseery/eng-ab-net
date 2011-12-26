/* Auto generated file */

package tablespackage;

import java.util.Date;

public class Rooms {

	/** auto generated
	 * @es_generated
	 */
	private Integer idRooms;
	/** auto generated
	 * @es_generated
	 */
	private Integer room;
	/** auto generated
	 * @es_generated
	 */
	private Integer roomCapacity;
	/** auto generated
	 * @es_generated
	 */
	private Integer roomNumber;
	/** auto generated
	 * @es_generated
	 */
	private Boolean roomValidity;
	/** auto generated
	 * @es_generated
	 */
	private Date roomValidFrom;
	/** auto generated
	 * @es_generated
	 */
	private Boolean roomValid;
	/** auto generated
	 * @es_generated
	 */
	private Date roomValidTo;

	/** auto generated
	 * @es_generated
	 */
	public Rooms() {
		super();
	}

	/** auto generated
	 * @es_generated
	 */
	public Rooms(Integer idRooms) {
		super();
		this.idRooms = idRooms;
	}

	/** auto generated
	 * @es_generated
	 */
	public Rooms(Integer idRooms, Integer room, Integer roomCapacity,
			Integer roomNumber, Boolean roomValidity, Date roomValidFrom,
			Boolean roomValid, Date roomValidTo) {
		super();
		this.idRooms = idRooms;
		this.room = room;
		this.roomCapacity = roomCapacity;
		this.roomNumber = roomNumber;
		this.roomValidity = roomValidity;
		this.roomValidFrom = roomValidFrom;
		this.roomValid = roomValid;
		this.roomValidTo = roomValidTo;
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
	public Integer getIdRooms() {
		return this.idRooms;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setIdRooms(Integer value) {
		this.idRooms = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Integer getRoom() {
		return this.room;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setRoom(Integer value) {
		this.room = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Integer getRoomCapacity() {
		return this.roomCapacity;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setRoomCapacity(Integer value) {
		this.roomCapacity = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Integer getRoomNumber() {
		return this.roomNumber;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setRoomNumber(Integer value) {
		this.roomNumber = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Boolean getRoomValidity() {
		return this.roomValidity;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setRoomValidity(Boolean value) {
		this.roomValidity = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Date getRoomValidFrom() {
		return this.roomValidFrom;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setRoomValidFrom(Date value) {
		this.roomValidFrom = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Boolean getRoomValid() {
		return this.roomValid;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setRoomValid(Boolean value) {
		this.roomValid = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Date getRoomValidTo() {
		return this.roomValidTo;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setRoomValidTo(Date value) {
		this.roomValidTo = value;
	}
}
