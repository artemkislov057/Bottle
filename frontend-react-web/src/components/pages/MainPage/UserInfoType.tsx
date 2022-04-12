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
    commercialData: string[] | null //
}
