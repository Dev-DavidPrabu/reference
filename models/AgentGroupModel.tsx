export interface AgentGroupFilterModel {
    agentGroupName: string,
    agentGroupCode: string,
    status:string
}

export interface CreateAgentGroupModel {
    agentGroupName: string,
    agentGroupCode: string,
    regNumber: string,
    mobileNumber: string,
    emailAddress: string,
    regDate: string,
    faxNo: string,
    gstNo: string
}

export interface UpdateAgentGroupModel {
    agentGroupName: string,
    agentGroupCode: string,
    regNumber: string,
    mobileNumber: string,
    emailAddress: string,
    regDate: string,
    faxNo: string,
    gstNo: string
}