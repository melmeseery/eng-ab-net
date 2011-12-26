/* Auto generated file */

package tablespackage;

import java.util.Date;
import java.util.Collection;

public class Menus {

	/** auto generated
	 * @es_generated
	 */
	private Integer idMenus;
	/** auto generated
	 * @es_generated
	 */
	private Integer menu;
	/** auto generated
	 * @es_generated
	 */
	private String menuName;
	/** auto generated
	 * @es_generated
	 */
	private String menuDescription;
	/** auto generated
	 * @es_generated
	 */
	private Date menuValidFrom;
	/** auto generated
	 * @es_generated
	 */
	private Date menuValidTo;
	/** auto generated
	 * @es_generated
	 */
	private Boolean menuValid;
	/** auto generated
	 * @es_generated
	 */
	private Collection menuitems;

	/** auto generated
	 * @es_generated
	 */
	public Menus() {
		super();
	}

	/** auto generated
	 * @es_generated
	 */
	public Menus(Integer idMenus, Collection menuitems) {
		super();
		this.idMenus = idMenus;
		this.menuitems = menuitems;
	}

	/** auto generated
	 * @es_generated
	 */
	public Menus(Integer idMenus, Integer menu, String menuName,
			String menuDescription, Date menuValidFrom, Date menuValidTo,
			Boolean menuValid, Collection menuitems) {
		super();
		this.idMenus = idMenus;
		this.menu = menu;
		this.menuName = menuName;
		this.menuDescription = menuDescription;
		this.menuValidFrom = menuValidFrom;
		this.menuValidTo = menuValidTo;
		this.menuValid = menuValid;
		this.menuitems = menuitems;
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
	public Integer getIdMenus() {
		return this.idMenus;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setIdMenus(Integer value) {
		this.idMenus = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Integer getMenu() {
		return this.menu;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setMenu(Integer value) {
		this.menu = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public String getMenuName() {
		return this.menuName;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setMenuName(String value) {
		this.menuName = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public String getMenuDescription() {
		return this.menuDescription;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setMenuDescription(String value) {
		this.menuDescription = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Date getMenuValidFrom() {
		return this.menuValidFrom;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setMenuValidFrom(Date value) {
		this.menuValidFrom = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Date getMenuValidTo() {
		return this.menuValidTo;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setMenuValidTo(Date value) {
		this.menuValidTo = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Boolean getMenuValid() {
		return this.menuValid;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setMenuValid(Boolean value) {
		this.menuValid = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Collection getMenuitems() {
		return this.menuitems;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setMenuitems(Collection value) {
		this.menuitems = value;
	}
}
