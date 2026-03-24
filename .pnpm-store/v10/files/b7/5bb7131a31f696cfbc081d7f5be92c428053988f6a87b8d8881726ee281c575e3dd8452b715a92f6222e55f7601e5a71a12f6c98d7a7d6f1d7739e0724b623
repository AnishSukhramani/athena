import type { ApifyClient } from '../apify_client';
import type { HttpClient } from '../http_client';
import type { PaginatedResponse, PaginationOptions } from '../utils';
/** @private */
export interface ApiClientOptions {
    baseUrl: string;
    publicBaseUrl: string;
    resourcePath: string;
    apifyClient: ApifyClient;
    httpClient: HttpClient;
    id?: string;
    params?: Record<string, unknown>;
}
export interface ApiClientOptionsWithOptionalResourcePath extends Omit<ApiClientOptions, 'resourcePath'> {
    resourcePath?: string;
}
export type ApiClientSubResourceOptions = Omit<ApiClientOptions, 'resourcePath'>;
/** @private */
export declare abstract class ApiClient {
    id?: string;
    safeId?: string;
    baseUrl: string;
    publicBaseUrl: string;
    resourcePath: string;
    url: string;
    apifyClient: ApifyClient;
    httpClient: HttpClient;
    params?: Record<string, unknown>;
    constructor(options: ApiClientOptions);
    protected _subResourceOptions<T>(moreOptions?: T): BaseOptions & T;
    protected _url(path?: string): string;
    protected _publicUrl(path?: string): string;
    protected _params<T>(endpointParams?: T): Record<string, unknown>;
    protected _toSafeId(id: string): string;
    /**
     * Returns async iterator to iterate through all items and Promise that can be awaited to get first page of results.
     */
    protected _listPaginatedFromCallback<T extends PaginationOptions, Data, R extends PaginatedResponse<Data>>(getPaginatedList: (options?: T) => Promise<R>, options?: T): AsyncIterable<Data> & Promise<R>;
}
export interface BaseOptions {
    baseUrl: string;
    publicBaseUrl: string;
    apifyClient: ApifyClient;
    httpClient: HttpClient;
    params: Record<string, unknown>;
}
//# sourceMappingURL=api_client.d.ts.map