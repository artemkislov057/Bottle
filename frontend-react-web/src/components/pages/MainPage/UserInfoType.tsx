export type UserInfoType = {
    id: string,
    nickname: string,
    rating: {
        value: number,
        dict: {
            "1": number,
            "2": number,
            "3": number,
            "4": number,
            "5": number
        }
    },
    sex: string,
    type: number,
    commercialData: {
        contactPerson: string
        email: string
        fullName: string
        identificationNumber: string
        phoneNumber: string
        psrn: string
    } | null
    email?: string
    isCommercial: boolean
    maxBottlesCount: number
}
