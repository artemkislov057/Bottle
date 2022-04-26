export type WsDataType = {
    eventNumber: number,
    model: {
        id: number,
        lat: number,
        lng: number,
        geoObjectName: string | null,
        address: string,
        title: string,
        description: string,
        contentItemsCount: number,
        isContentLoaded: boolean,
        contentIds: number[],
        category: string,
        lifeTime: number,
        created: string,
        endTime: string,
        active: boolean,
        maxPickingUp: number,
        pickingUp: number,
        userId: string,
        bottleId: number
    }    
}