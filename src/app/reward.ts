export interface Reward {
    title: string;
    cost: number;
    skipQueue: boolean;
    prompt: string;
    priceIncrease: number;
    returnToOriginalCost: boolean;
    rewardMessage: string;
    rewardType?: string;
}
