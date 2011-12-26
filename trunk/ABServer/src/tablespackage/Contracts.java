/* Auto generated file */

package tablespackage;

import java.util.Collection;
import java.util.Date;

public class Contracts {

	/** auto generated
	 * @es_generated
	 */
	private Integer idContracts;
	/** auto generated
	 * @es_generated
	 */
	private Collection contractcourse;
	/** auto generated
	 * @es_generated
	 */
	private Clients contract;
	/** auto generated
	 * @es_generated
	 */
	private Trainingcoordinators contract_1;
	/** auto generated
	 * @es_generated
	 */
	private String contractProposalId;
	/** auto generated
	 * @es_generated
	 */
	private String contractNumber;
	/** auto generated
	 * @es_generated
	 */
	private String contractName;
	/** auto generated
	 * @es_generated
	 */
	private Integer contractProactiveType;
	/** auto generated
	 * @es_generated
	 */
	private Integer contractFundType;
	/** auto generated
	 * @es_generated
	 */
	private Date contractProposalReceiveDate;
	/** auto generated
	 * @es_generated
	 */
	private Date contractAcceptDate;
	/** auto generated
	 * @es_generated
	 */
	private Date contractDateOfRequest;
	/** auto generated
	 * @es_generated
	 */
	private Date contractFirstStartDate;
	/** auto generated
	 * @es_generated
	 */
	private Date contractFirstEndDate;
	/** auto generated
	 * @es_generated
	 */
	private Date contractStartDate;
	/** auto generated
	 * @es_generated
	 */
	private Date contractEndDate;
	/** auto generated
	 * @es_generated
	 */
	private Integer contractRateType;
	/** auto generated
	 * @es_generated
	 */
	private Integer contractRateValue;
	/** auto generated
	 * @es_generated
	 */
	private Integer contractStatus;
	/** auto generated
	 * @es_generated
	 */
	private Integer contractFee;
	/** auto generated
	 * @es_generated
	 */
	private Short contractCancelClientPercent;
	/** auto generated
	 * @es_generated
	 */
	private Short contractCancelRecoursePercent;
	/** auto generated
	 * @es_generated
	 */
	private Integer contractPreCancelTime;
	/** auto generated
	 * @es_generated
	 */
	private Integer contractGroupPrice;
	/** auto generated
	 * @es_generated
	 */
	private Byte contractVenueFeeIncluded;
	/** auto generated
	 * @es_generated
	 */
	private String contractDealPerson;
	/** auto generated
	 * @es_generated
	 */
	private String contractPriceNote;
	/** auto generated
	 * @es_generated
	 */
	private Integer contractCoordinatorTeam;
	/** auto generated
	 * @es_generated
	 */
	private Integer contractVenueArrangmentRes;
	/** auto generated
	 * @es_generated
	 */
	private Integer contractVenueCostRes;
	/** auto generated
	 * @es_generated
	 */
	private Integer contractVenueLocation;
	/** auto generated
	 * @es_generated
	 */
	private Integer deleted;
	/** auto generated
	 * @es_generated
	 */
	private Collection contractcourse_1;

	/** auto generated
	 * @es_generated
	 */
	public Contracts() {
		super();
	}

	/** auto generated
	 * @es_generated
	 */
	public Contracts(Integer idContracts, Collection contractcourse,
			Clients contract, Integer deleted) {
		super();
		this.idContracts = idContracts;
		this.contractcourse = contractcourse;
		this.contract = contract;
		this.deleted = deleted;
	}

	/** auto generated
	 * @es_generated
	 */
	public Contracts(Integer idContracts, Collection contractcourse,
			Clients contract, Trainingcoordinators contract_1,
			String contractProposalId, String contractNumber,
			String contractName, Integer contractProactiveType,
			Integer contractFundType, Date contractProposalReceiveDate,
			Date contractAcceptDate, Date contractDateOfRequest,
			Date contractFirstStartDate, Date contractFirstEndDate,
			Date contractStartDate, Date contractEndDate,
			Integer contractRateType, Integer contractRateValue,
			Integer contractStatus, Integer contractFee,
			Short contractCancelClientPercent,
			Short contractCancelRecoursePercent, Integer contractPreCancelTime,
			Integer contractGroupPrice, Byte contractVenueFeeIncluded,
			String contractDealPerson, String contractPriceNote,
			Integer contractCoordinatorTeam,
			Integer contractVenueArrangmentRes, Integer contractVenueCostRes,
			Integer contractVenueLocation, Integer deleted) {
		super();
		this.idContracts = idContracts;
		this.contractcourse = contractcourse;
		this.contract = contract;
		this.contract_1 = contract_1;
		this.contractProposalId = contractProposalId;
		this.contractNumber = contractNumber;
		this.contractName = contractName;
		this.contractProactiveType = contractProactiveType;
		this.contractFundType = contractFundType;
		this.contractProposalReceiveDate = contractProposalReceiveDate;
		this.contractAcceptDate = contractAcceptDate;
		this.contractDateOfRequest = contractDateOfRequest;
		this.contractFirstStartDate = contractFirstStartDate;
		this.contractFirstEndDate = contractFirstEndDate;
		this.contractStartDate = contractStartDate;
		this.contractEndDate = contractEndDate;
		this.contractRateType = contractRateType;
		this.contractRateValue = contractRateValue;
		this.contractStatus = contractStatus;
		this.contractFee = contractFee;
		this.contractCancelClientPercent = contractCancelClientPercent;
		this.contractCancelRecoursePercent = contractCancelRecoursePercent;
		this.contractPreCancelTime = contractPreCancelTime;
		this.contractGroupPrice = contractGroupPrice;
		this.contractVenueFeeIncluded = contractVenueFeeIncluded;
		this.contractDealPerson = contractDealPerson;
		this.contractPriceNote = contractPriceNote;
		this.contractCoordinatorTeam = contractCoordinatorTeam;
		this.contractVenueArrangmentRes = contractVenueArrangmentRes;
		this.contractVenueCostRes = contractVenueCostRes;
		this.contractVenueLocation = contractVenueLocation;
		this.deleted = deleted;
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
	public Integer getIdContracts() {
		return this.idContracts;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setIdContracts(Integer value) {
		this.idContracts = value;
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
	public Clients getContract() {
		return this.contract;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setContract(Clients value) {
		this.contract = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Trainingcoordinators getContract_1() {
		return this.contract_1;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setContract_1(Trainingcoordinators value) {
		this.contract_1 = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public String getContractProposalId() {
		return this.contractProposalId;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setContractProposalId(String value) {
		this.contractProposalId = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public String getContractNumber() {
		return this.contractNumber;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setContractNumber(String value) {
		this.contractNumber = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public String getContractName() {
		return this.contractName;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setContractName(String value) {
		this.contractName = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Integer getContractProactiveType() {
		return this.contractProactiveType;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setContractProactiveType(Integer value) {
		this.contractProactiveType = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Integer getContractFundType() {
		return this.contractFundType;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setContractFundType(Integer value) {
		this.contractFundType = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Date getContractProposalReceiveDate() {
		return this.contractProposalReceiveDate;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setContractProposalReceiveDate(Date value) {
		this.contractProposalReceiveDate = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Date getContractAcceptDate() {
		return this.contractAcceptDate;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setContractAcceptDate(Date value) {
		this.contractAcceptDate = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Date getContractDateOfRequest() {
		return this.contractDateOfRequest;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setContractDateOfRequest(Date value) {
		this.contractDateOfRequest = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Date getContractFirstStartDate() {
		return this.contractFirstStartDate;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setContractFirstStartDate(Date value) {
		this.contractFirstStartDate = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Date getContractFirstEndDate() {
		return this.contractFirstEndDate;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setContractFirstEndDate(Date value) {
		this.contractFirstEndDate = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Date getContractStartDate() {
		return this.contractStartDate;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setContractStartDate(Date value) {
		this.contractStartDate = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Date getContractEndDate() {
		return this.contractEndDate;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setContractEndDate(Date value) {
		this.contractEndDate = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Integer getContractRateType() {
		return this.contractRateType;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setContractRateType(Integer value) {
		this.contractRateType = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Integer getContractRateValue() {
		return this.contractRateValue;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setContractRateValue(Integer value) {
		this.contractRateValue = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Integer getContractStatus() {
		return this.contractStatus;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setContractStatus(Integer value) {
		this.contractStatus = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Integer getContractFee() {
		return this.contractFee;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setContractFee(Integer value) {
		this.contractFee = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Short getContractCancelClientPercent() {
		return this.contractCancelClientPercent;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setContractCancelClientPercent(Short value) {
		this.contractCancelClientPercent = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Short getContractCancelRecoursePercent() {
		return this.contractCancelRecoursePercent;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setContractCancelRecoursePercent(Short value) {
		this.contractCancelRecoursePercent = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Integer getContractPreCancelTime() {
		return this.contractPreCancelTime;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setContractPreCancelTime(Integer value) {
		this.contractPreCancelTime = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Integer getContractGroupPrice() {
		return this.contractGroupPrice;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setContractGroupPrice(Integer value) {
		this.contractGroupPrice = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Byte getContractVenueFeeIncluded() {
		return this.contractVenueFeeIncluded;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setContractVenueFeeIncluded(Byte value) {
		this.contractVenueFeeIncluded = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public String getContractDealPerson() {
		return this.contractDealPerson;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setContractDealPerson(String value) {
		this.contractDealPerson = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public String getContractPriceNote() {
		return this.contractPriceNote;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setContractPriceNote(String value) {
		this.contractPriceNote = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Integer getContractCoordinatorTeam() {
		return this.contractCoordinatorTeam;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setContractCoordinatorTeam(Integer value) {
		this.contractCoordinatorTeam = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Integer getContractVenueArrangmentRes() {
		return this.contractVenueArrangmentRes;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setContractVenueArrangmentRes(Integer value) {
		this.contractVenueArrangmentRes = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Integer getContractVenueCostRes() {
		return this.contractVenueCostRes;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setContractVenueCostRes(Integer value) {
		this.contractVenueCostRes = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Integer getContractVenueLocation() {
		return this.contractVenueLocation;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setContractVenueLocation(Integer value) {
		this.contractVenueLocation = value;
	}

	/** auto generated
	 * @es_generated
	 */
	public Integer getDeleted() {
		return this.deleted;
	}

	/** auto generated
	 * @es_generated
	 */
	public void setDeleted(Integer value) {
		this.deleted = value;
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
