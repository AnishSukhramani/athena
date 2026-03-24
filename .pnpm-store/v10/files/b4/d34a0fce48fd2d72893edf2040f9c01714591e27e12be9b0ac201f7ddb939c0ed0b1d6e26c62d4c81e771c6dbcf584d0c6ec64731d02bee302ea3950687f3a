import type { ApiClientSubResourceOptions } from '../base/api_client';
import { ResourceClient } from '../base/resource_client';
import type { ActorEnvironmentVariable } from './actor_version';
/**
 * Client for managing a specific Actor environment variable.
 *
 * Environment variables are key-value pairs that are available to the Actor during execution.
 * This client provides methods to get, update, and delete environment variables.
 *
 * @example
 * ```javascript
 * const client = new ApifyClient({ token: 'my-token' });
 * const actorClient = client.actor('my-actor-id');
 * const versionClient = actorClient.version('0.1');
 *
 * // Get an environment variable
 * const envVarClient = versionClient.envVar('MY_VAR');
 * const envVar = await envVarClient.get();
 *
 * // Update environment variable
 * await envVarClient.update({ value: 'new-value' });
 * ```
 *
 * @see https://docs.apify.com/platform/actors/development/programming-interface/environment-variables
 */
export declare class ActorEnvVarClient extends ResourceClient {
    /**
     * @hidden
     */
    constructor(options: ApiClientSubResourceOptions);
    /**
     * Retrieves the environment variable.
     *
     * @returns The environment variable object, or `undefined` if it does not exist.
     * @see https://docs.apify.com/api/v2/act-version-env-var-get
     */
    get(): Promise<ActorEnvironmentVariable | undefined>;
    /**
     * Updates the environment variable.
     *
     * @param actorEnvVar - The updated environment variable data.
     * @returns The updated environment variable object.
     * @see https://docs.apify.com/api/v2/act-version-env-var-put
     */
    update(actorEnvVar: ActorEnvironmentVariable): Promise<ActorEnvironmentVariable>;
    /**
     * Deletes the environment variable.
     *
     * @see https://docs.apify.com/api/v2/act-version-env-var-delete
     */
    delete(): Promise<void>;
}
//# sourceMappingURL=actor_env_var.d.ts.map