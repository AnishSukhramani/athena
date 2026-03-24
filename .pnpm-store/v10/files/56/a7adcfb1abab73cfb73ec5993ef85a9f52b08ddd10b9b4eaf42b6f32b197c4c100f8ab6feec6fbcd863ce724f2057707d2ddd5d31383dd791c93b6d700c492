import type { PaginatedResponse, PaginationOptions } from '../utils';
import { ApiClient } from './api_client';
/**
 * Resource collection client.
 * @private
 */
export declare class ResourceCollectionClient extends ApiClient {
    /**
     * @private
     */
    protected _list<T, R>(options?: T): Promise<R>;
    /**
     * Returns async iterator to iterate through all items and Promise that can be awaited to get first page of results.
     */
    protected _listPaginated<T extends PaginationOptions, Data, R extends PaginatedResponse<Data>>(options?: T): AsyncIterable<Data> & Promise<R>;
    protected _create<D, R>(resource: D): Promise<R>;
    protected _getOrCreate<D, R>(name?: string, resource?: D): Promise<R>;
}
//# sourceMappingURL=resource_collection_client.d.ts.map