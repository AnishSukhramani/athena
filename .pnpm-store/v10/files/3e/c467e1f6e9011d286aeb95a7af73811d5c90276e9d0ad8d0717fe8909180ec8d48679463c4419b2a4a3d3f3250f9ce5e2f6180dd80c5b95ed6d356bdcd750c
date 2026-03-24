import type { Readable } from 'node:stream';
import type { JsonValue, TypedArray } from 'type-fest';
import type { ApifyApiError } from './apify_api_error';
import type { RequestQueueClientListRequestsOptions, RequestQueueClientListRequestsResult } from './resource_clients/request_queue';
import type { WebhookUpdateData } from './resource_clients/webhook';
/**
 * Generic interface for objects that may contain a data property.
 *
 * @template R - The type of the data property
 */
export interface MaybeData<R> {
    data?: R;
}
/**
 * Returns object's 'data' property or throws if parameter is not an object,
 * or an object without a 'data' property.
 */
export declare function pluckData<R>(obj: MaybeData<R>): R;
/**
 * If given HTTP error has NOT_FOUND_STATUS_CODE status code then returns undefined.
 * Otherwise rethrows error.
 */
export declare function catchNotFoundOrThrow(err: ApifyApiError): void;
type ReturnJsonValue = string | number | boolean | null | Date | ReturnJsonObject | ReturnJsonArray;
type ReturnJsonObject = {
    [Key in string]?: ReturnJsonValue;
};
type ReturnJsonArray = ReturnJsonValue[];
/**
 * Traverses JSON structure and converts fields that end with "At" to a Date object (fields such as "modifiedAt" or
 * "createdAt").
 *
 * If you want parse other fields as well, you can provide a custom matcher function shouldParseField(). This
 * admittedly awkward approach allows this function to be reused for various purposes without introducing potential
 * breaking changes.
 *
 * If the field cannot be converted to Date, it is left as is.
 */
export declare function parseDateFields(input: JsonValue, shouldParseField?: ((key: string) => boolean) | null, depth?: number): ReturnJsonValue;
/**
 * Helper function that converts array of webhooks to base64 string
 */
export declare function stringifyWebhooksToBase64(webhooks: WebhookUpdateData[]): string | undefined;
/**
 * Gzip provided value, otherwise returns undefined.
 */
export declare function maybeGzipValue(value: unknown): Promise<Buffer | undefined>;
/**
 * Helper function slice the items from array to fit the max byte length.
 */
export declare function sliceArrayByByteLength<T>(array: T[], maxByteLength: number, startIndex: number): T[];
export declare function isNode(): boolean;
/**
 * Dynamic import wrapper that prevents bundlers from statically analyzing the import specifier.
 * Use this for Node.js-only modules that should not be included in browser bundles.
 */
export declare function dynamicNodeImport<T = any>(specifier: string): Promise<T>;
export declare function isBuffer(value: unknown): value is Buffer | ArrayBuffer | TypedArray;
export declare function isStream(value: unknown): value is Readable;
export declare function getVersionData(): {
    version: string;
};
/**
 * Helper class to create async iterators from paginated list endpoints with exclusive start key.
 */
export declare class PaginationIterator {
    private readonly maxPageLimit;
    private readonly getPage;
    private readonly limit?;
    private readonly exclusiveStartId?;
    constructor(options: PaginationIteratorOptions);
    [Symbol.asyncIterator](): AsyncIterator<RequestQueueClientListRequestsResult>;
}
declare global {
    export const BROWSER_BUILD: boolean | undefined;
    export const VERSION: string | undefined;
}
/**
 * Options for creating a pagination iterator.
 */
export interface PaginationIteratorOptions {
    maxPageLimit: number;
    getPage: (opts: RequestQueueClientListRequestsOptions) => Promise<RequestQueueClientListRequestsResult>;
    limit?: number;
    exclusiveStartId?: string;
}
/**
 * Standard pagination options for API requests.
 */
export interface PaginationOptions {
    /** Position of the first returned entry. */
    offset?: number;
    /** Maximum number of entries requested. */
    limit?: number;
    /** Maximum number of items returned in one API response. Relevant in the context of asyncIterator, the iterator
     * will fetch results in chunks of this size from API and yield them one by one. It will stop fetching once the
     * limit is reached or once all items from API have been fetched.
     *
     * Chunk size is usually limited by API. Minimum of those two limits will be used.
     * */
    chunkSize?: number;
}
/**
 * Standard paginated response format.
 *
 * @template Data - The type of items in the response
 */
export interface PaginatedResponse<Data> {
    /** Total count of entries. */
    total: number;
    /** Entries. */
    items: Data[];
}
/**
 * Paginated list with detailed pagination information.
 *
 * Used primarily for Dataset items and other list operations that support
 * offset-based pagination and field transformations.
 *
 * @template Data - The type of items in the list
 */
export interface PaginatedList<Data> extends PaginatedResponse<Data> {
    /** Count of dataset entries returned in this set. */
    count: number;
    /** Position of the first returned entry in the dataset. */
    offset: number;
    /** Maximum number of dataset entries requested. */
    limit: number;
    /** Should the results be in descending order. */
    desc: boolean;
}
/**
 * Type representing both a Promise of a paginated list and an async iterable.
 *
 * Allows both awaiting the first page and iterating through all pages.
 *
 * @template T - The type of items in the paginated list
 */
export type PaginatedIterator<T> = Promise<PaginatedList<T>> & AsyncIterable<T>;
export declare function cast<T>(input: unknown): T;
export declare function asArray<T>(value: T | T[]): T[];
/**
 * Generic dictionary type (key-value map).
 *
 * @template T - The type of values in the dictionary
 */
export type Dictionary<T = unknown> = Record<PropertyKey, T>;
/**
 * Utility type that makes specific keys optional while preserving union types.
 *
 * @template T - The base type
 * @template K - Keys to make optional
 */
export type DistributiveOptional<T, K extends keyof T> = T extends any ? Omit<T, K> & Partial<Pick<T, K>> : never;
/**
 * Adds query parameters to a given URL based on the provided options object.
 */
export declare function applyQueryParamsToUrl(url: URL, options?: Record<string, string | number | boolean | string[] | undefined>): URL;
export {};
//# sourceMappingURL=utils.d.ts.map