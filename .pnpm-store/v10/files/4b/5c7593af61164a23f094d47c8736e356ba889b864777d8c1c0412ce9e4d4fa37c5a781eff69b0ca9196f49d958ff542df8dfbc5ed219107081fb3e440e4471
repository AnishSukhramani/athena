"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiClient = void 0;
/** @private */
class ApiClient {
    constructor(options) {
        Object.defineProperty(this, "id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "safeId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "baseUrl", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "publicBaseUrl", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "resourcePath", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "url", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "apifyClient", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "httpClient", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "params", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        const { baseUrl, publicBaseUrl, apifyClient, httpClient, resourcePath, id, params = {} } = options;
        this.id = id;
        this.safeId = id && this._toSafeId(id);
        this.baseUrl = baseUrl;
        this.publicBaseUrl = publicBaseUrl;
        this.resourcePath = resourcePath;
        this.url = id ? `${baseUrl}/${resourcePath}/${this.safeId}` : `${baseUrl}/${resourcePath}`;
        this.apifyClient = apifyClient;
        this.httpClient = httpClient;
        this.params = params;
    }
    _subResourceOptions(moreOptions) {
        const baseOptions = {
            baseUrl: this._url(),
            publicBaseUrl: this.publicBaseUrl,
            apifyClient: this.apifyClient,
            httpClient: this.httpClient,
            params: this._params(),
        };
        return { ...baseOptions, ...moreOptions };
    }
    _url(path) {
        return path ? `${this.url}/${path}` : this.url;
    }
    _publicUrl(path) {
        const url = this.id
            ? `${this.publicBaseUrl}/${this.resourcePath}/${this.safeId}`
            : `${this.publicBaseUrl}/${this.resourcePath}`;
        return path ? `${url}/${path}` : url;
    }
    _params(endpointParams) {
        return { ...this.params, ...endpointParams };
    }
    _toSafeId(id) {
        // The id has the format `username/actor-name`, so we only need to replace the first `/`.
        return id.replace('/', '~');
    }
    /**
     * Returns async iterator to iterate through all items and Promise that can be awaited to get first page of results.
     */
    _listPaginatedFromCallback(getPaginatedList, options = {}) {
        const minForLimitParam = (a, b) => {
            // API treats 0 as undefined for limit parameter
            if (a === 0)
                a = undefined;
            if (b === 0)
                b = undefined;
            if (a === undefined)
                return b;
            if (b === undefined)
                return a;
            return Math.min(a, b);
        };
        const paginatedListPromise = getPaginatedList({
            ...options,
            limit: minForLimitParam(options.limit, options.chunkSize),
        });
        async function* asyncGenerator() {
            var _a;
            let currentPage = await paginatedListPromise;
            yield* currentPage.items;
            const offset = (_a = options.offset) !== null && _a !== void 0 ? _a : 0;
            const limit = Math.min(options.limit || currentPage.total, currentPage.total);
            let currentOffset = offset + currentPage.items.length;
            let remainingItems = Math.min(currentPage.total - offset, limit) - currentPage.items.length;
            while (currentPage.items.length > 0 && // Continue only if at least some items were returned in the last page.
                remainingItems > 0) {
                const newOptions = {
                    ...options,
                    limit: minForLimitParam(remainingItems, options.chunkSize),
                    offset: currentOffset,
                };
                currentPage = await getPaginatedList(newOptions);
                yield* currentPage.items;
                currentOffset += currentPage.items.length;
                remainingItems -= currentPage.items.length;
            }
        }
        return Object.defineProperty(paginatedListPromise, Symbol.asyncIterator, {
            value: asyncGenerator,
        });
    }
}
exports.ApiClient = ApiClient;
//# sourceMappingURL=api_client.js.map