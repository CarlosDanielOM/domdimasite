export interface Command {
    _id?: string;
    name: string;
    cmd: string;
    func: string;
    message: string;
    reserved: boolean;
    cooldown: number;
    description?: string;
    userLevel: number;
    userLevelName: string;
    createdAt?: Date;
    updatedAt?: Date;
    __v?: number;
    channelID: string;
    channel: string;
}
