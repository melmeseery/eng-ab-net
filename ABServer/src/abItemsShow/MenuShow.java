package abItemsShow;

import java.util.Date;

public class MenuShow 
{
	private Integer idMenus;
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
	private String menuValidFrom;
	/** auto generated
	 * @es_generated
	 */
	private String menuValidTo;
	/** auto generated
	 * @es_generated
	 */
	private Boolean menuValid;
	public MenuShow(Integer idMenus, String menuName, String menuDescription, String menuValidFrom, String menuValidTo, Boolean menuValid) {
		super();
		this.idMenus = idMenus;
		this.menuName = menuName;
		this.menuDescription = menuDescription;
		this.menuValidFrom = menuValidFrom;
		this.menuValidTo = menuValidTo;
		this.menuValid = menuValid;
	}
	public MenuShow() {
		super();
		// TODO Auto-generated constructor stub
	}
	/**
	 * @return the idMenus
	 */
	public Integer getIdMenus() {
		return idMenus;
	}
	/**
	 * @param idMenus the idMenus to set
	 */
	public void setIdMenus(Integer idMenus) {
		this.idMenus = idMenus;
	}
	/**
	 * @return the menuDescription
	 */
	public String getMenuDescription() {
		return menuDescription;
	}
	/**
	 * @param menuDescription the menuDescription to set
	 */
	public void setMenuDescription(String menuDescription) {
		this.menuDescription = menuDescription;
	}
	/**
	 * @return the menuName
	 */
	public String getMenuName() {
		return menuName;
	}
	/**
	 * @param menuName the menuName to set
	 */
	public void setMenuName(String menuName) {
		this.menuName = menuName;
	}
	/**
	 * @return the menuValid
	 */
	public Boolean getMenuValid() {
		return menuValid;
	}
	/**
	 * @param menuValid the menuValid to set
	 */
	public void setMenuValid(Boolean menuValid) {
		this.menuValid = menuValid;
	}
	/**
	 * @return the menuValidFrom
	 */
	public String getMenuValidFrom() {
		return menuValidFrom;
	}
	/**
	 * @param menuValidFrom the menuValidFrom to set
	 */
	public void setMenuValidFrom(String menuValidFrom) {
		this.menuValidFrom = menuValidFrom;
	}
	/**
	 * @return the menuValidTo
	 */
	public String getMenuValidTo() {
		return menuValidTo;
	}
	/**
	 * @param menuValidTo the menuValidTo to set
	 */
	public void setMenuValidTo(String menuValidTo) {
		this.menuValidTo = menuValidTo;
	}

}
