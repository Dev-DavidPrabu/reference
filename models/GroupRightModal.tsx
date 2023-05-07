export interface GroupRightsModal {
    add: boolean
    approvalLevel1: boolean
    approvalLevel2: boolean
    approvalLevel3: boolean
    delete: boolean
    edit: boolean
    functionCode: string
    functionId: string
    id: string
    status: string
    userGroupCode: string
    userGroupId: string
    view: boolean
    comment?: string
    userGroupName: string
}
export interface addGroupData {
    showAddUser: boolean
    userType: string
    submitHandler: (value: string) => void
    userDetail: GroupRightsModal

}
export interface userGroupRightsInfo {
    "functionCode": string
    "functionId": string
    "id": string
    "'status'": string
    "userGroupCode": string
    "userGroupId": string
    "view": boolean
    "comment": string
    "userGroupName": string
}