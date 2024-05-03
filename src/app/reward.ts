export interface Reward {
    _id?: string;
    title: string;
    cost: number;
    skipQueue?: boolean;
    prompt: string;
    priceIncrease: number;
    returnToOriginalCost: boolean;
    rewardMessage: string;
    rewardType?: string;
    isEnabled?: boolean;
    is_global_cooldown_enabled?: boolean;
    global_cooldown_seconds?: number;
    cooldown?: number;
}
