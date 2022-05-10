export type WsDialogType = {
    active: boolean
    bottleId: number
    bottleOwnerId: string
    id: number
    lastMessage: {
        dateTime: string
        dialogId: number
        id: number
        senderId: string
        value: string,
        messageType: string
    } | null 
    recipientId: string
}