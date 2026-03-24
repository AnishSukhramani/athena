import type { ApiClientSubResourceOptions } from '../base/api_client';
import { ResourceClient } from '../base/resource_client';
/**
 * Client for managing user account information.
 *
 * Provides methods to retrieve user details, monthly usage statistics, and account limits.
 * When using an API token, you can access your own user information or public information
 * about other users.
 *
 * @example
 * ```javascript
 * const client = new ApifyClient({ token: 'my-token' });
 * const userClient = client.user('my-user-id');
 *
 * // Get user information
 * const user = await userClient.get();
 *
 * // Get monthly usage
 * const usage = await userClient.monthlyUsage();
 *
 * // Get account limits
 * const limits = await userClient.limits();
 * ```
 *
 * @see https://docs.apify.com/platform/actors/running
 */
export declare class UserClient extends ResourceClient {
    /**
     * @hidden
     */
    constructor(options: ApiClientSubResourceOptions);
    /**
     * Retrieves the user data.
     *
     * Depending on whether ApifyClient was created with a token,
     * the method will either return public or private user data.
     *
     * @returns The user object.
     * @see https://docs.apify.com/api/v2/user-get
     */
    get(): Promise<User>;
    /**
     * Retrieves the user's monthly usage data.
     *
     * @returns The monthly usage object, or `undefined` if it does not exist.
     * @see https://docs.apify.com/api/v2/users-me-usage-monthly-get
     */
    monthlyUsage(): Promise<MonthlyUsage | undefined>;
    /**
     * Retrieves the user's account and usage limits.
     *
     * @returns The account and usage limits object, or `undefined` if it does not exist.
     * @see https://docs.apify.com/api/v2/users-me-limits-get
     */
    limits(): Promise<AccountAndUsageLimits | undefined>;
    /**
     * Updates the user's account and usage limits.
     *
     * @param options - The new limits to set.
     * @see https://docs.apify.com/api/v2/users-me-limits-put
     */
    updateLimits(options: LimitsUpdateOptions): Promise<void>;
}
export interface User {
    username: string;
    profile: {
        bio?: string;
        name?: string;
        pictureUrl?: string;
        githubUsername?: string;
        websiteUrl?: string;
        twitterUsername?: string;
    };
    id?: string;
    email?: string;
    proxy?: UserProxy;
    plan?: UserPlan;
    effectivePlatformFeatures?: EffectivePlatformFeatures;
    createdAt?: Date;
    isPaying?: boolean;
}
export interface UserProxy {
    password: string;
    groups: ProxyGroup[];
}
export interface ProxyGroup {
    name: string;
    description: string;
    availableCount: number;
}
export interface UserPlan {
    id: string;
    description: string;
    isEnabled: boolean;
    monthlyBasePriceUsd: number;
    monthlyUsageCreditsUsd: number;
    usageDiscountPercent: number;
    enabledPlatformFeatures: PlatformFeature[];
    maxMonthlyUsageUsd: number;
    maxActorMemoryGbytes: number;
    maxMonthlyActorComputeUnits: number;
    maxMonthlyResidentialProxyGbytes: number;
    maxMonthlyProxySerps: number;
    maxMonthlyExternalDataTransferGbytes: number;
    maxActorCount: number;
    maxActorTaskCount: number;
    dataRetentionDays: number;
    availableProxyGroups: Record<string, number>;
    teamAccountSeatCount: number;
    supportLevel: string;
    availableAddOns: unknown[];
}
export declare enum PlatformFeature {
    Actors = "ACTORS",
    Storage = "STORAGE",
    ProxySERPS = "PROXY_SERPS",
    Scheduler = "SCHEDULER",
    Webhooks = "WEBHOOKS",
    Proxy = "PROXY",
    ProxyExternalAccess = "PROXY_EXTERNAL_ACCESS"
}
interface EffectivePlatformFeature {
    isEnabled: boolean;
    disabledReason: string | null;
    disabledReasonType: string | null;
    isTrial: boolean;
    trialExpirationAt: Date | null;
}
interface EffectivePlatformFeatures {
    ACTORS: EffectivePlatformFeature;
    STORAGE: EffectivePlatformFeature;
    SCHEDULER: EffectivePlatformFeature;
    PROXY: EffectivePlatformFeature;
    PROXY_EXTERNAL_ACCESS: EffectivePlatformFeature;
    PROXY_RESIDENTIAL: EffectivePlatformFeature;
    PROXY_SERPS: EffectivePlatformFeature;
    WEBHOOKS: EffectivePlatformFeature;
    ACTORS_PUBLIC_ALL: EffectivePlatformFeature;
    ACTORS_PUBLIC_DEVELOPER: EffectivePlatformFeature;
}
export interface MonthlyUsage {
    usageCycle: UsageCycle;
    monthlyServiceUsage: {
        [key: string]: MonthlyServiceUsageData;
    };
    dailyServiceUsages: DailyServiceUsage[];
    totalUsageCreditsUsdBeforeVolumeDiscount: number;
    totalUsageCreditsUsdAfterVolumeDiscount: number;
}
export interface UsageCycle {
    startAt: Date;
    endAt: Date;
}
/** Monthly usage of a single service */
interface MonthlyServiceUsageData {
    quantity: number;
    baseAmountUsd: number;
    baseUnitPriceUsd: number;
    amountAfterVolumeDiscountUsd: number;
    priceTiers: PriceTier[];
}
interface PriceTier {
    quantityAbove: number;
    discountPercent: number;
    tierQuantity: number;
    unitPriceUsd: number;
    priceUsd: number;
}
interface DailyServiceUsage {
    date: Date;
    serviceUsage: {
        [key: string]: DailyServiceUsageData;
    };
    totalUsageCreditsUsd: number;
}
/** Daily usage of a single service */
interface DailyServiceUsageData {
    quantity: number;
    baseAmountUsd: number;
}
export interface AccountAndUsageLimits {
    monthlyUsageCycle: MonthlyUsageCycle;
    limits: Limits;
    current: Current;
}
export interface MonthlyUsageCycle {
    startAt: Date;
    endAt: Date;
}
export interface Limits {
    maxMonthlyUsageUsd: number;
    maxMonthlyActorComputeUnits: number;
    maxMonthlyExternalDataTransferGbytes: number;
    maxMonthlyProxySerps: number;
    maxMonthlyResidentialProxyGbytes: number;
    maxActorMemoryGbytes: number;
    maxActorCount: number;
    maxActorTaskCount: number;
    maxConcurrentActorJobs: number;
    maxTeamAccountSeatCount: number;
    dataRetentionDays: number;
}
export type LimitsUpdateOptions = {
    maxMonthlyUsageUsd: number;
} | {
    dataRetentionDays: number;
};
export interface Current {
    monthlyUsageUsd: number;
    monthlyActorComputeUnits: number;
    monthlyExternalDataTransferGbytes: number;
    monthlyProxySerps: number;
    monthlyResidentialProxyGbytes: number;
    actorMemoryGbytes: number;
    actorCount: number;
    actorTaskCount: number;
    activeActorJobCount: number;
    teamAccountSeatCount: number;
}
export {};
//# sourceMappingURL=user.d.ts.map