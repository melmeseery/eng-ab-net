/**
 * 
 */
package abItemsShow;

import java.util.Date;

/**
 * @author noha
 *
 */
public class ContractsShow {

	int contractId = 0;
	String clientName = "";
	String proposalID = "";
	String contractProactiveType = "";
	String contractFundType = "";
	String contractRateType = "";
	String contractFirstStartDate = "";
	String contractFirstEndDate = "";
	String contractDealPerson = "";
	String contractDateOfRequest = "";
	String requestDate = "";
	String tentativeStartDate = "";
	String tentativeEndDate = "";
	
	String clientReceiveDate = "";
	String clientApproveDate = "";
	
	String coordinatorName = "";
	String coordinatorTeam = "";
	
	String contractPriceNote = "";
	
	int contractDealPersonTypeId = 0;
	String contractDealPersonType = "";
	String progressHistory = "";

	int contractVenueLocation = 0;
	int contractVenueArrangment = 0;
	int venueCostRes = 0;
	
	
	int clientId = 0;
	int coordinatorId = 0;
	int coordinatorTeamId = 0;
	
	int contractPrice = 0;
	int contractTotalPrice = 0;
	/**
	 * @return the clientName
	 */
	private Integer contractFee;
	/** auto generated
	 * @es_generated
	 */
	private String contractName;
	private String contractStartDate;
	/** auto generated
	 * @es_generated
	 */
	private String contractEndDate;
	/** auto generated
	 * @es_generated
	 */
	private String contractStatus;
	/** auto generated
	 * @es_generated
	 */
	private String contractNumber;
	/** auto generated
	 * @es_generated
	 */
	public String getClientName() {
		return clientName;
	}
	/**
	 * @param clientName the clientName to set
	 */
	public void setClientName(String clientName) {
		this.clientName = clientName;
	}
	/**
	 * @return the contractFundType
	 */
	public String getContractFundType() {
		return contractFundType;
	}
	/**
	 * @param contractFundType the contractFundType to set
	 */
	public void setContractFundType(String contractFundType) {
		this.contractFundType = contractFundType;
	}
	/**
	 * @return the contractProactiveType
	 */
	public String getContractProactiveType() {
		return contractProactiveType;
	}
	/**
	 * @param contractProactiveType the contractProactiveType to set
	 */
	public void setContractProactiveType(String contractProactiveType) {
		this.contractProactiveType = contractProactiveType;
	}
	
	
	/**
	 * @return the progressHistory
	 */
	public String getProgressHistory() {
		return progressHistory;
	}
	/**
	 * @param progressHistory the progressHistory to set
	 */
	public void setProgressHistory(String progressHistory) {
		this.progressHistory = progressHistory;
	}
	
	/**
	 * @return the coordinatorName
	 */
	public String getCoordinatorName() {
		return coordinatorName;
	}
	/**
	 * @param coordinatorName the coordinatorName to set
	 */
	public void setCoordinatorName(String coordinatorName) {
		this.coordinatorName = coordinatorName;
	}
	/**
	 * @return the proposalID
	 */
	public String getProposalID() {
		return proposalID;
	}
	/**
	 * @param proposalID the proposalID to set
	 */
	public void setProposalID(String proposalID) {
		this.proposalID = proposalID;
	}
	/**
	 * @return the requestDate
	 */
	public String getRequestDate() {
		return requestDate;
	}
	/**
	 * @param requestDate the requestDate to set
	 */
	public void setRequestDate(String requestDate) {
		this.requestDate = requestDate;
	}
	/**
	 * @return the tentativeEndDate
	 */
	public String getTentativeEndDate() {
		return tentativeEndDate;
	}
	/**
	 * @param tentativeEndDate the tentativeEndDate to set
	 */
	public void setTentativeEndDate(String tentativeEndDate) {
		this.tentativeEndDate = tentativeEndDate;
	}
	/**
	 * @return the tentativeStartDate
	 */
	public String getTentativeStartDate() {
		return tentativeStartDate;
	}
	/**
	 * @param tentativeStartDate the tentativeStartDate to set
	 */
	public void setTentativeStartDate(String tentativeStartDate) {
		this.tentativeStartDate = tentativeStartDate;
	}
	/**
	 * @return the contractRateType
	 */
	public String getContractRateType() {
		return contractRateType;
	}
	/**
	 * @param contractRateType the contractRateType to set
	 */
	public void setContractRateType(String contractRateType) {
		this.contractRateType = contractRateType;
	}
	/**
	 * @return the contractPrice
	 */
	public int getContractPrice() {
		return contractPrice;
	}
	/**
	 * @param contractPrice the contractPrice to set
	 */
	public void setContractPrice(int contractPrice) {
		this.contractPrice = contractPrice;
	}
	/**
	 * @return the contractEndDate
	 */
	public String getContractEndDate() {
		return contractEndDate;
	}
	/**
	 * @param contractEndDate the contractEndDate to set
	 */
	public void setContractEndDate(String contractEndDate) {
		this.contractEndDate = contractEndDate;
	}
	/**
	 * @return the contractNumber
	 */
	public String getContractNumber() {
		return contractNumber;
	}
	/**
	 * @param contractNumber the contractNumber to set
	 */
	public void setContractNumber(String contractNumber) {
		this.contractNumber = contractNumber;
	}
	/**
	 * @return the contractStartDate
	 */
	public String getContractStartDate() {
		return contractStartDate;
	}
	/**
	 * @param contractStartDate the contractStartDate to set
	 */
	public void setContractStartDate(String contractStartDate) {
		this.contractStartDate = contractStartDate;
	}
	/**
	 * @return the contractStatus
	 */
	public String getContractStatus() {
		return contractStatus;
	}
	/**
	 * @param contractStatus the contractStatus to set
	 */
	public void setContractStatus(String contractStatus) {
		this.contractStatus = contractStatus;
	}
	/**
	 * @return the contractId
	 */
	public int getContractId() {
		return contractId;
	}
	/**
	 * @param contractId the contractId to set
	 */
	public void setContractId(int contractId) {
		this.contractId = contractId;
	}
	/**
	 * @return the contractTotalPrice
	 */
	public int getContractTotalPrice() {
		return contractTotalPrice;
	}
	/**
	 * @param contractTotalPrice the contractTotalPrice to set
	 */
	public void setContractTotalPrice(int contractTotalPrice) {
		this.contractTotalPrice = contractTotalPrice;
	}
	/**
	 * @return the contractName
	 */
	public String getContractName() {
		return contractName;
	}
	/**
	 * @param contractName the contractName to set
	 */
	public void setContractName(String contractName) {
		this.contractName = contractName;
	}
	/**
	 * @return the contractFee
	 */
	public Integer getContractFee() {
		return contractFee;
	}
	/**
	 * @param contractFee the contractFee to set
	 */
	public void setContractFee(Integer contractFee) {
		this.contractFee = contractFee;
	}
	/**
	 * @return the contractDealPerson
	 */
	public String getContractDealPerson() {
		return contractDealPerson;
	}
	/**
	 * @param contractDealPerson the contractDealPerson to set
	 */
	public void setContractDealPerson(String contractDealPerson) {
		this.contractDealPerson = contractDealPerson;
	}
	public String getContractDateOfRequest() {
		return contractDateOfRequest;
	}
	public void setContractDateOfRequest(String contractDateOfRequest) {
		
		
		
		
		this.contractDateOfRequest = contractDateOfRequest;
	}
	public String getContractFirstStartDate() {
		return contractFirstStartDate;
	}
	public void setContractFirstStartDate(String contractFirstStartDate) {
		this.contractFirstStartDate = contractFirstStartDate;
	}
	public String getContractFirstEndDate() {
		return contractFirstEndDate;
	}
	public void setContractFirstEndDate(String contractFirstEndDate) {
		this.contractFirstEndDate = contractFirstEndDate;
	}
	/**
	 * @return the clientId
	 */
	public int getClientId() {
		return clientId;
	}
	/**
	 * @param clientId the clientId to set
	 */
	public void setClientId(int clientId) {
		this.clientId = clientId;
	}
	/**
	 * @return the coordinatorId
	 */
	public int getCoordinatorId() {
		return coordinatorId;
	}
	/**
	 * @param coordinatorId the coordinatorId to set
	 */
	public void setCoordinatorId(int coordinatorId) {
		this.coordinatorId = coordinatorId;
	}
	/**
	 * @return the coordinatorTeam
	 */
	public String getCoordinatorTeam() {
		return coordinatorTeam;
	}
	/**
	 * @param coordinatorTeam the coordinatorTeam to set
	 */
	public void setCoordinatorTeam(String coordinatorTeam) {
		this.coordinatorTeam = coordinatorTeam;
	}
	/**
	 * @return the coordinatorTeamId
	 */
	public int getCoordinatorTeamId() {
		return coordinatorTeamId;
	}
	/**
	 * @param coordinatorTeamId the coordinatorTeamId to set
	 */
	public void setCoordinatorTeamId(int coordinatorTeamId) {
		this.coordinatorTeamId = coordinatorTeamId;
	}
	/**
	 * @return the contractPriceNote
	 */
	public String getContractPriceNote() {
		return contractPriceNote;
	}
	/**
	 * @param contractPriceNote the contractPriceNote to set
	 */
	public void setContractPriceNote(String contractPriceNote) {
		this.contractPriceNote = contractPriceNote;
	}
	/**
	 * @return the contractVenueArrangment
	 */
	public int getContractVenueArrangment() {
		return contractVenueArrangment;
	}
	/**
	 * @param contractVenueArrangment the contractVenueArrangment to set
	 */
	public void setContractVenueArrangment(int contractVenueArrangment) {
		this.contractVenueArrangment = contractVenueArrangment;
	}
	/**
	 * @return the contractVenueLocation
	 */
	public int getContractVenueLocation() {
		return contractVenueLocation;
	}
	/**
	 * @param contractVenueLocation the contractVenueLocation to set
	 */
	public void setContractVenueLocation(int contractVenueLocation) {
		this.contractVenueLocation = contractVenueLocation;
	}
	/**
	 * @return the venueCostRes
	 */
	public int getVenueCostRes() {
		return venueCostRes;
	}
	/**
	 * @param venueCostRes the venueCostRes to set
	 */
	public void setVenueCostRes(int venueCostRes) {
		this.venueCostRes = venueCostRes;
	}
	/**
	 * @return the clientApproveDate
	 */
	public String getClientApproveDate() {
		return clientApproveDate;
	}
	/**
	 * @param clientApproveDate the clientApproveDate to set
	 */
	public void setClientApproveDate(String clientApproveDate) {
		this.clientApproveDate = clientApproveDate;
	}
	/**
	 * @return the clientReceiveDate
	 */
	public String getClientReceiveDate() {
		return clientReceiveDate;
	}
	/**
	 * @param clientReceiveDate the clientReceiveDate to set
	 */
	public void setClientReceiveDate(String clientReceiveDate) {
		this.clientReceiveDate = clientReceiveDate;
	}
	/**
	 * @return the contractDealPersonType
	 */
	public String getContractDealPersonType() {
		return contractDealPersonType;
	}
	/**
	 * @param contractDealPersonType the contractDealPersonType to set
	 */
	public void setContractDealPersonType(String contractDealPersonType) {
		this.contractDealPersonType = contractDealPersonType;
	}
	/**
	 * @return the contractDealPersonTypeId
	 */
	public int getContractDealPersonTypeId() {
		return contractDealPersonTypeId;
	}
	/**
	 * @param contractDealPersonTypeId the contractDealPersonTypeId to set
	 */
	public void setContractDealPersonTypeId(int contractDealPersonTypeId) {
		this.contractDealPersonTypeId = contractDealPersonTypeId;
	}
	
	
}
