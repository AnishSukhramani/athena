"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlatformFeature = exports.UserClient = void 0;
const resource_client_1 = require("../base/resource_client");
const utils_1 = require("../utils");
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
class UserClient extends resource_client_1.ResourceClient {
    /**
     * @hidden
     */
    constructor(options) {
        super({
            resourcePath: 'users',
            ...options,
        });
    }
    /**
     * Retrieves the user data.
     *
     * Depending on whether ApifyClient was created with a token,
     * the method will either return public or private user data.
     *
     * @returns The user object.
     * @see https://docs.apify.com/api/v2/user-get
     */
    async get() {
        return this._get();
    }
    /**
     * Retrieves the user's monthly usage data.
     *
     * @returns The monthly usage object, or `undefined` if it does not exist.
     * @see https://docs.apify.com/api/v2/users-me-usage-monthly-get
     */
    async monthlyUsage() {
        const requestOpts = {
            url: this._url('usage/monthly'),
            method: 'GET',
            params: this._params(),
        };
        try {
            const response = await this.httpClient.call(requestOpts);
            return (0, utils_1.cast)((0, utils_1.parseDateFields)((0, utils_1.pluckData)(response.data), 
            // Convert  monthlyUsage.dailyServiceUsages[].date to Date (by default it's ignored by parseDateFields)
            /* shouldParseField = */ (key) => key === 'date'));
        }
        catch (err) {
            (0, utils_1.catchNotFoundOrThrow)(err);
        }
        return undefined;
    }
    /**
     * Retrieves the user's account and usage limits.
     *
     * @returns The account and usage limits object, or `undefined` if it does not exist.
     * @see https://docs.apify.com/api/v2/users-me-limits-get
     */
    async limits() {
        const requestOpts = {
            url: this._url('limits'),
            method: 'GET',
            params: this._params(),
        };
        try {
            const response = await this.httpClient.call(requestOpts);
            return (0, utils_1.cast)((0, utils_1.parseDateFields)((0, utils_1.pluckData)(response.data)));
        }
        catch (err) {
            (0, utils_1.catchNotFoundOrThrow)(err);
        }
        return undefined;
    }
    /**
     * Updates the user's account and usage limits.
     *
     * @param options - The new limits to set.
     * @see https://docs.apify.com/api/v2/users-me-limits-put
     */
    async updateLimits(options) {
        const requestOpts = {
            url: this._url('limits'),
            method: 'PUT',
            params: this._params(),
            data: options,
        };
        await this.httpClient.call(requestOpts);
    }
}
exports.UserClient = UserClient;
var PlatformFeature;
(function (PlatformFeature) {
    PlatformFeature["Actors"] = "ACTORS";
    PlatformFeature["Storage"] = "STORAGE";
    PlatformFeature["ProxySERPS"] = "PROXY_SERPS";
    PlatformFeature["Scheduler"] = "SCHEDULER";
    PlatformFeature["Webhooks"] = "WEBHOOKS";
    PlatformFeature["Proxy"] = "PROXY";
    PlatformFeature["ProxyExternalAccess"] = "PROXY_EXTERNAL_ACCESS";
})(PlatformFeature || (exports.PlatformFeature = PlatformFeature = {}));
//# sourceMappingURL=user.js.map