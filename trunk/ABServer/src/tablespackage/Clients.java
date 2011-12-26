/* Auto generated file */

package tablespackage;

import java.util.Date;
import java.util.Collection;

public class Clients {

	/** auto generated
	 * @es_generated
	 */
	private Integer idClients;
	/** auto generated
	 * @es_generated
	 */
	private Integer clientMain;
	/** auto generated
	 * @es_generated
	 */
	private String clientName;
	/** auto generated
	 * @es_generated
	 */
	private String clientApp;
	/** auto generated
	 * @es_generated
	 */
	private String clientColor;
	/** auto generated
	 * @es_generated
	 */
	private Date clientApproachDate;
	/** auto generated
	 * @es_generated
	 */
	private Date clientWorkDate;
	/** auto generated
	 * @es_generated
	 */
	private String clientApproachPerson;
	/** auto generated
	 * @es_generated
	 */
	private String clientInfo;
	/** auto generated
	 * @es_generated
	 */
	private String clientAddress;
	/** auto generated
	 * @es_generated
	 */
	private Collection contracts;
	/** auto generated
	 * @es_generated
	 */
	private Collection personalsMany;

	/** auto generated
	 * @es_generated
	 */
	public Clients() {
		super();
	}

	/** auto generated
	 * @es_generated
	 */
	public Clients(Integer idClients, Collection contracts,
			Collection personalsMany) {
		super();
		this.idClients = idClients;
		this.contracts = contracts;
		this.personalsMany = personalsMany;
	}

	/** auto generated
	 * @es_generated
	 */
	public Clients(Integer idClients, Integer clientMain, String clientName,
			String clientApp, String clientColor, Date clientApproachDate,
			Date clientWorkDate, String clientApproachPerson,
			String clientInfo, String clientAddress, Collection contracts,
			Collection personalsMany) {
		super();
		this.idClients = idClients;
		this.clientMain = clientMain;
		this.clientName = clientName;
		this.clientApp = clientApp;
		this.clientColor = clientColor;
		this.clientApproachDate = clientApproachDate;
		this.clientWorkDate = clientWorkDate;
		this.clientApproachPerson = clientApproachPerson;
		this.clientInfo = clientInfo;
		this.clientAddress = clientAddress;
		this.contracts = contracts;
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
	public Integer getIdClients() {
		return this.idClients;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setIdClients(Integer value) {
		this.idClients = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Integer getClientMain() {
		return this.clientMain;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setClientMain(Integer value) {
		this.clientMain = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public String getClientName() {
		return this.clientName;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setClientName(String value) {
		this.clientName = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public String getClientApp() {
		return this.clientApp;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setClientApp(String value) {
		this.clientApp = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public String getClientColor() {
		return this.clientColor;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setClientColor(String value) {
		this.clientColor = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Date getClientApproachDate() {
		return this.clientApproachDate;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setClientApproachDate(Date value) {
		this.clientApproachDate = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Date getClientWorkDate() {
		return this.clientWorkDate;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setClientWorkDate(Date value) {
		this.clientWorkDate = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public String getClientApproachPerson() {
		return this.clientApproachPerson;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setClientApproachPerson(String value) {
		this.clientApproachPerson = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public String getClientInfo() {
		return this.clientInfo;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setClientInfo(String value) {
		this.clientInfo = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public String getClientAddress() {
		return this.clientAddress;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setClientAddress(String value) {
		this.clientAddress = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Collection getContracts() {
		return this.contracts;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setContracts(Collection value) {
		this.contracts = value;
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
}
