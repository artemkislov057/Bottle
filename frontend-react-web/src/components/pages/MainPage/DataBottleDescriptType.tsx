export type DataBottleDescType = {    
    titleName: string,
    address: string,
    timeLife: number,
    countPick: number,
    description: string,
    // content: string[] | number[],
    content: Array<File>,
    bottleId: number,
    category: string,
    initTimeLife?: number
}