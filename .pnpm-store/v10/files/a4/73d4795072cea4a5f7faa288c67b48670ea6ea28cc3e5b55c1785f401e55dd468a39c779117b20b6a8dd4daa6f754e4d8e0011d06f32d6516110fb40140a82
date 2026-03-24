"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HyperAgent = void 0;
const uuid_1 = require("uuid");
const providers_1 = require("../llm/providers");
const types_1 = require("../types");
const fs_1 = __importDefault(require("fs"));
const actions_1 = require("./actions");
const browser_providers_1 = require("../browser-providers");
const error_1 = require("./error");
const find_element_1 = require("./shared/find-element");
const types_2 = require("../context-providers/a11y-dom/types");
const client_1 = require("./mcp/client");
const agent_1 = require("./tools/agent");
const utils_1 = require("../utils");
const waitForSettledDOM_1 = require("../utils/waitForSettledDOM");
const perf_hooks_1 = require("perf_hooks");
const cdp_1 = require("../cdp");
const dom_cache_1 = require("../context-providers/a11y-dom/dom-cache");
const options_1 = require("../debug/options");
const runtime_context_1 = require("./shared/runtime-context");
const perform_action_1 = require("./actions/shared/perform-action");
const action_cache_script_1 = require("./shared/action-cache-script");
const action_cache_exec_1 = require("./shared/action-cache-exec");
class HyperAgent {
    get currentPage() {
        if (this._currentPage) {
            return this.setupHyperPage(this._currentPage);
        }
        return null;
    }
    set currentPage(page) {
        this._currentPage = page;
    }
    constructor(params = {}) {
        this.tasks = {};
        this.tokenLimit = 128000;
        this.debug = false;
        this.actions = [...actions_1.DEFAULT_ACTIONS];
        this.actionCacheByTaskId = {};
        this.browser = null;
        this.context = null;
        this._currentPage = null;
        this._variables = {};
        if (!params.llm) {
            if (process.env.OPENAI_API_KEY) {
                this.llm = (0, providers_1.createLLMClient)({
                    provider: "openai",
                    model: "gpt-4o",
                    temperature: 0,
                });
            }
            else {
                throw new error_1.HyperagentError("No LLM provider provided", 400);
            }
        }
        else if (typeof params.llm === "object" && "provider" in params.llm) {
            // It's an LLMConfig
            this.llm = (0, providers_1.createLLMClient)(params.llm);
        }
        else {
            // It's already a HyperAgentLLM instance
            this.llm = params.llm;
        }
        this.browserProviderType = (params.browserProvider ?? "Local");
        (0, options_1.setDebugOptions)(params.debugOptions, this.debug);
        // TODO(Phase4): This legacy provider branch will be replaced by connector configs.
        this.browserProvider = (this.browserProviderType === "Hyperbrowser"
            ? new browser_providers_1.HyperbrowserProvider({
                ...(params.hyperbrowserConfig ?? {}),
                debug: params.debug,
            })
            : new browser_providers_1.LocalBrowserProvider(params.localConfig));
        if (params.customActions) {
            params.customActions.forEach(this.registerAction, this);
        }
        this.debug = params.debug ?? false;
        this.cdpActionsEnabled = params.cdpActions ?? true;
        this.errorEmitter = new utils_1.ErrorEmitter();
    }
    /**
     *  This is just exposed as a utility function. You don't need to call it explicitly.
     * @returns A reference to the current rebrowser-playwright browser instance.
     */
    async initBrowser() {
        if (!this.browser) {
            this.browser = await this.browserProvider.start();
            if (this.browserProviderType === "Hyperbrowser" &&
                this.browser.contexts().length > 0) {
                this.context = this.browser.contexts()[0];
            }
            else {
                this.context = await this.browser.newContext({
                    viewport: null,
                });
            }
            // Listen for new pages (tabs/popups)
            this.context.on("page", () => {
                if (this.debug) {
                    console.log("New tab/popup detected");
                }
                // Note: We used to auto-switch this._currentPage here, but that breaks
                // scoped page interactions. If a user is awaiting pageA.ai(), and a new
                // tab opens, we don't want pageA to suddenly become pageB.
                // The user or the specific task logic should handle tab switching if desired.
            });
            return this.browser;
        }
        return this.browser;
    }
    /**
     * Use this function instead of accessing this.actions directly.
     * This function configures if there is a need for an output schema as a part of the complete action.
     * @param outputSchema
     * @returns
     */
    getActions(outputSchema) {
        if (outputSchema) {
            return [
                ...this.actions,
                (0, actions_1.generateCompleteActionWithOutputDefinition)(outputSchema),
            ];
        }
        else {
            return [...this.actions, actions_1.CompleteActionDefinition];
        }
    }
    /**
     * Get all variables
     * @returns Record of variables
     */
    getVariables() {
        return this._variables;
    }
    /**
     * Set a variable
     * @param key Key of the variable
     * @param value Value of the variable
     */
    addVariable(variable) {
        this._variables[variable.key] = variable;
    }
    /**
     * Get a variable
     * @param key Key of the variable
     * @returns Value of the variable
     */
    getVariable(key) {
        return this._variables[key];
    }
    /**
     * Delete a variable
     * @param key Key of the variable
     */
    deleteVariable(key) {
        delete this._variables[key];
    }
    getActionCache(taskId) {
        const cache = this.actionCacheByTaskId[taskId];
        if (!cache)
            return null;
        return {
            ...cache,
            steps: [...cache.steps],
        };
    }
    /**
     * Get all pages in the context
     * @returns Array of HyperPage objects
     */
    async getPages() {
        if (!this.browser) {
            await this.initBrowser();
        }
        if (!this.context) {
            throw new error_1.HyperagentError("No context found");
        }
        return this.context.pages().map(this.setupHyperPage.bind(this), this);
    }
    /**
     * Create a new page in the context
     * @returns HyperPage object
     */
    async newPage() {
        if (!this.browser) {
            await this.initBrowser();
        }
        if (!this.context) {
            throw new error_1.HyperagentError("No context found");
        }
        const page = await this.context.newPage();
        return this.setupHyperPage(page);
    }
    /**
     * Close the agent and all associated resources
     */
    async closeAgent() {
        await (0, cdp_1.disposeAllCDPClients)().catch((error) => {
            console.warn("[HyperAgent] Failed to dispose CDP clients:", error);
        });
        for (const taskId in this.tasks) {
            const task = this.tasks[taskId];
            if (!types_1.endTaskStatuses.has(task.status)) {
                task.status = types_1.TaskStatus.CANCELLED;
            }
        }
        if (this.mcpClient) {
            await this.mcpClient.disconnect();
            this.mcpClient = undefined;
        }
        if (this.browser) {
            await this.browserProvider.close();
            this.browser = null;
            this.context = null;
        }
    }
    /**
     * Get the current page or create a new one if none exists
     * @returns The current page
     */
    async getCurrentPage() {
        if (!this.browser) {
            await this.initBrowser();
        }
        if (!this.context) {
            throw new error_1.HyperagentError("No context found");
        }
        // Poll context for new pages to catch any that opened since the last check
        // This handles race conditions where the 'page' event might not have fired yet
        // or where we missed it during a heavy operation.
        const pages = this.context.pages();
        if (pages.length > 0) {
            const lastPage = pages[pages.length - 1];
            // If the last page is different and not closed, switch to it
            // We prefer the newest page as it's likely the result of the user's last action
            if (lastPage && !lastPage.isClosed() && lastPage !== this._currentPage) {
                if (this.debug) {
                    console.log(`[HyperAgent] Polling detected new page, switching focus: ${lastPage.url()}`);
                }
                this._currentPage = lastPage;
            }
        }
        if (!this.currentPage || this.currentPage.isClosed()) {
            this._currentPage = await this.context.newPage();
            return this.setupHyperPage(this._currentPage);
        }
        return this.currentPage;
    }
    /**
     * Get task control object for a specific task
     * @param taskId ID of the task
     * @returns Task control object
     */
    getTaskControl(taskId) {
        const taskState = this.tasks[taskId];
        if (!taskState) {
            throw new error_1.HyperagentError(`Task ${taskId} not found`);
        }
        return {
            id: taskId,
            getStatus: () => taskState.status,
            pause: () => {
                if (taskState.status === types_1.TaskStatus.RUNNING) {
                    taskState.status = types_1.TaskStatus.PAUSED;
                }
                return taskState.status;
            },
            resume: () => {
                if (taskState.status === types_1.TaskStatus.PAUSED) {
                    taskState.status = types_1.TaskStatus.RUNNING;
                }
                return taskState.status;
            },
            cancel: () => {
                if (taskState.status !== types_1.TaskStatus.COMPLETED) {
                    taskState.status = types_1.TaskStatus.CANCELLED;
                }
                return taskState.status;
            },
            emitter: this.errorEmitter,
        };
    }
    /**
     * Execute a task asynchronously and return a Task control object
     * @param task The task to execute
     * @param params Optional parameters for the task
     * @param initPage Optional page to use for the task
     * @returns A promise that resolves to a Task control object for managing the running task
     */
    async executeTaskAsync(task, params, initPage) {
        const taskId = (0, uuid_1.v4)();
        let activeTaskPage = initPage || (await this.getCurrentPage());
        // Follow new tabs opened by the current active page
        const onPage = async (newPage) => {
            try {
                const opener = await newPage.opener();
                if (opener === activeTaskPage) {
                    if (this.debug) {
                        console.log(`[HyperAgent] Task following new tab: ${newPage.url()}`);
                    }
                    activeTaskPage = newPage;
                }
            }
            catch {
                // Ignore
            }
        };
        this.context?.on("page", onPage);
        const cleanup = () => this.context?.off("page", onPage);
        const taskState = {
            id: taskId,
            task: task,
            status: types_1.TaskStatus.PENDING,
            startingPage: activeTaskPage,
            steps: [],
        };
        this.tasks[taskId] = taskState;
        const mergedParams = params ?? {};
        (0, agent_1.runAgentTask)({
            llm: this.llm,
            actions: this.getActions(mergedParams.outputSchema),
            tokenLimit: this.tokenLimit,
            debug: this.debug,
            mcpClient: this.mcpClient,
            variables: this._variables,
            cdpActions: this.cdpActionsEnabled,
            activePage: async () => activeTaskPage,
        }, taskState, mergedParams)
            .then((result) => {
            this.actionCacheByTaskId[taskId] = result.actionCache;
            cleanup();
        })
            .catch((error) => {
            cleanup();
            // Retrieve the correct state to update
            const failedTaskState = this.tasks[taskId];
            if (failedTaskState) {
                failedTaskState.status = types_1.TaskStatus.FAILED;
                failedTaskState.error = error.message;
                // Emit error on the central emitter, including the taskId
                this.errorEmitter.emit("error", error);
            }
            else {
                // Fallback if task state somehow doesn't exist
                console.error(`Task state ${taskId} not found during error handling.`);
            }
        });
        return this.getTaskControl(taskId);
    }
    /**
     * Execute a task and wait for completion
     * @param task The task to execute
     * @param params Optional parameters for the task
     * @param initPage Optional page to use for the task
     * @returns A promise that resolves to the task output
     */
    async executeTask(task, params, initPage) {
        const taskId = (0, uuid_1.v4)();
        let activeTaskPage = initPage || (await this.getCurrentPage());
        // Follow new tabs opened by the current active page
        const onPage = async (newPage) => {
            try {
                const opener = await newPage.opener();
                if (opener === activeTaskPage) {
                    if (this.debug) {
                        console.log(`[HyperAgent] Task following new tab: ${newPage.url()}`);
                    }
                    activeTaskPage = newPage;
                }
            }
            catch {
                // Ignore
            }
        };
        this.context?.on("page", onPage);
        const taskState = {
            id: taskId,
            task: task,
            status: types_1.TaskStatus.PENDING,
            startingPage: activeTaskPage,
            steps: [],
        };
        this.tasks[taskId] = taskState;
        try {
            const mergedParams = params ?? {};
            const result = await (0, agent_1.runAgentTask)({
                llm: this.llm,
                actions: this.getActions(mergedParams?.outputSchema),
                tokenLimit: this.tokenLimit,
                debug: this.debug,
                mcpClient: this.mcpClient,
                variables: this._variables,
                cdpActions: this.cdpActionsEnabled,
                activePage: async () => activeTaskPage,
            }, taskState, mergedParams);
            this.context?.off("page", onPage);
            this.actionCacheByTaskId[taskId] = result.actionCache;
            return result;
        }
        catch (error) {
            this.context?.off("page", onPage);
            taskState.status = types_1.TaskStatus.FAILED;
            throw error;
        }
    }
    async runFromActionCache(cache, pageOrGetter, params) {
        const replayId = (0, uuid_1.v4)();
        const maxXPathRetries = params?.maxXPathRetries ?? 3;
        const debug = params?.debug ?? this.debug;
        const getPage = () => typeof pageOrGetter === "function" ? pageOrGetter() : pageOrGetter;
        const stepsResult = [];
        let replayStatus = types_1.TaskStatus.COMPLETED;
        /**
         * Type-safe dispatch for HyperPage perform* methods.
         * Explicitly routes to the correct method with proper typing.
         *
         * Methods that require a value argument (second param): type, fill, press, selectOptionFromDropdown, scrollToPercentage
         * Methods with only xpath and options: click, hover, check, uncheck, scrollToElement, nextChunk, prevChunk
         */
        const dispatchPerformHelper = (hp, method, xpath, value, options) => {
            switch (method) {
                case "click":
                    return hp.performClick(xpath, options);
                case "hover":
                    return hp.performHover(xpath, options);
                case "type":
                    return hp.performType(xpath, value ?? "", options);
                case "fill":
                    return hp.performFill(xpath, value ?? "", options);
                case "press":
                    return hp.performPress(xpath, value ?? "", options);
                case "selectOptionFromDropdown":
                    return hp.performSelectOption(xpath, value ?? "", options);
                case "check":
                    return hp.performCheck(xpath, options);
                case "uncheck":
                    return hp.performUncheck(xpath, options);
                case "scrollToElement":
                    return hp.performScrollToElement(xpath, options);
                case "scrollToPercentage":
                    return hp.performScrollToPercentage(xpath, value ?? "", options);
                case "nextChunk":
                    return hp.performNextChunk(xpath, options);
                case "prevChunk":
                    return hp.performPrevChunk(xpath, options);
                default:
                    throw new Error(`Unknown perform helper method: ${method}`);
            }
        };
        /** Set of valid method names that can be dispatched */
        const validHelperMethods = new Set([
            "click",
            "fill",
            "type",
            "press",
            "selectOptionFromDropdown",
            "check",
            "uncheck",
            "hover",
            "scrollToElement",
            "scrollToPercentage",
            "nextChunk",
            "prevChunk",
        ]);
        for (const step of [...cache.steps].sort((a, b) => a.stepIndex - b.stepIndex)) {
            const page = getPage();
            const hyperPage = page;
            let result;
            if (step.actionType === "goToUrl") {
                const url = (step.arguments && step.arguments[0]) ||
                    step.actionParams?.url ||
                    "";
                if (!url || typeof url !== "string") {
                    result = {
                        taskId: cache.taskId,
                        status: types_1.TaskStatus.FAILED,
                        steps: [],
                        output: "Missing URL for goToUrl",
                    };
                }
                else {
                    await hyperPage.goto(url, { waitUntil: "domcontentloaded" });
                    await (0, waitForSettledDOM_1.waitForSettledDOM)(hyperPage);
                    (0, dom_cache_1.markDomSnapshotDirty)(hyperPage);
                    result = {
                        taskId: cache.taskId,
                        status: types_1.TaskStatus.COMPLETED,
                        steps: [],
                        output: `Navigated to ${url}`,
                        replayStepMeta: {
                            usedCachedAction: true,
                            fallbackUsed: false,
                            retries: 0,
                            cachedXPath: null,
                            fallbackXPath: null,
                            fallbackElementId: null,
                        },
                    };
                }
            }
            else if (step.actionType === "complete") {
                result = {
                    taskId: cache.taskId,
                    status: types_1.TaskStatus.COMPLETED,
                    steps: [],
                    output: "Task Complete",
                    replayStepMeta: {
                        usedCachedAction: true,
                        fallbackUsed: false,
                        retries: 0,
                        cachedXPath: null,
                        fallbackXPath: null,
                        fallbackElementId: null,
                    },
                };
            }
            else if (step.actionType === "refreshPage") {
                await hyperPage.reload({ waitUntil: "domcontentloaded" });
                await (0, waitForSettledDOM_1.waitForSettledDOM)(hyperPage);
                (0, dom_cache_1.markDomSnapshotDirty)(hyperPage);
                result = {
                    taskId: cache.taskId,
                    status: types_1.TaskStatus.COMPLETED,
                    steps: [],
                    output: "Page refreshed",
                    actionCache: {
                        taskId: cache.taskId,
                        createdAt: cache.createdAt,
                        status: types_1.TaskStatus.COMPLETED,
                        steps: [],
                    },
                    replayStepMeta: {
                        usedCachedAction: true,
                        fallbackUsed: false,
                        retries: 0,
                        cachedXPath: null,
                        fallbackXPath: null,
                        fallbackElementId: null,
                    },
                };
            }
            else if (step.actionType === "wait") {
                const durationRaw = (step.arguments && step.arguments[0]) ||
                    step.actionParams?.duration;
                const durationMs = typeof durationRaw === "number"
                    ? durationRaw
                    : Number.parseInt(String(durationRaw ?? ""), 10);
                const waitMs = Number.isFinite(durationMs) ? durationMs : 1000;
                await hyperPage.waitForTimeout(waitMs);
                result = {
                    taskId: cache.taskId,
                    status: types_1.TaskStatus.COMPLETED,
                    steps: [],
                    output: `Waited ${waitMs}ms`,
                    actionCache: {
                        taskId: cache.taskId,
                        createdAt: cache.createdAt,
                        status: types_1.TaskStatus.COMPLETED,
                        steps: [],
                    },
                    replayStepMeta: {
                        usedCachedAction: true,
                        fallbackUsed: false,
                        retries: 0,
                        cachedXPath: null,
                        fallbackXPath: null,
                        fallbackElementId: null,
                    },
                };
            }
            else if (step.actionType === "extract") {
                try {
                    if (!step.instruction) {
                        throw new Error("Missing objective/instruction for extract action");
                    }
                    const extractResult = await hyperPage.extract(step.instruction);
                    result = {
                        taskId: cache.taskId,
                        status: types_1.TaskStatus.COMPLETED,
                        steps: [],
                        output: typeof extractResult === "string"
                            ? extractResult
                            : JSON.stringify(extractResult),
                        replayStepMeta: {
                            usedCachedAction: true,
                            fallbackUsed: false,
                            retries: 0,
                            cachedXPath: null,
                            fallbackXPath: null,
                            fallbackElementId: null,
                        },
                    };
                }
                catch (err) {
                    result = {
                        taskId: cache.taskId,
                        status: types_1.TaskStatus.FAILED,
                        steps: [],
                        output: `Extract failed: ${err?.message || String(err)}`,
                        replayStepMeta: {
                            usedCachedAction: true,
                            fallbackUsed: false,
                            retries: 0,
                            cachedXPath: null,
                            fallbackXPath: null,
                            fallbackElementId: null,
                        },
                    };
                }
            }
            else if (step.actionType === "analyzePdf") {
                result = {
                    taskId: cache.taskId,
                    status: types_1.TaskStatus.FAILED,
                    steps: [],
                    output: "analyzePdf replay is not supported in runFromActionCache.",
                    replayStepMeta: {
                        usedCachedAction: true,
                        fallbackUsed: false,
                        retries: 0,
                        cachedXPath: null,
                        fallbackXPath: null,
                        fallbackElementId: null,
                    },
                };
            }
            else {
                const method = step.method;
                if (method && validHelperMethods.has(method)) {
                    const options = {
                        performInstruction: step.instruction ?? null,
                        maxSteps: maxXPathRetries,
                    };
                    if (step.frameIndex !== null && step.frameIndex !== undefined) {
                        options.frameIndex = step.frameIndex;
                    }
                    const valueArg = step.arguments?.[0];
                    result = await dispatchPerformHelper(hyperPage, method, step.xpath ?? "", valueArg, options);
                }
                else if (step.instruction) {
                    result = await hyperPage.perform(step.instruction);
                }
                else {
                    result = {
                        taskId: cache.taskId,
                        status: types_1.TaskStatus.FAILED,
                        steps: [],
                        output: `Cannot replay action type "${step.actionType}" without instruction`,
                        replayStepMeta: {
                            usedCachedAction: false,
                            fallbackUsed: false,
                            retries: 0,
                            cachedXPath: null,
                            fallbackXPath: null,
                            fallbackElementId: null,
                        },
                    };
                }
            }
            const finalMeta = result.replayStepMeta;
            const finalSuccess = result.status === types_1.TaskStatus.COMPLETED;
            stepsResult.push({
                stepIndex: step.stepIndex,
                actionType: step.actionType,
                usedXPath: finalMeta?.usedCachedAction ?? false,
                fallbackUsed: finalMeta?.fallbackUsed ?? false,
                cachedXPath: finalMeta?.cachedXPath ?? null,
                fallbackXPath: finalMeta?.fallbackXPath ?? null,
                fallbackElementId: finalMeta?.fallbackElementId ?? null,
                retries: finalMeta?.retries ?? 0,
                success: finalSuccess,
                message: result.output ||
                    (finalSuccess ? "Completed" : "Failed to execute cached action"),
            });
            if (!finalSuccess) {
                replayStatus = types_1.TaskStatus.FAILED;
                break;
            }
        }
        const replayResult = {
            replayId,
            sourceTaskId: cache.taskId,
            steps: stepsResult,
            status: replayStatus,
        };
        if (debug) {
            const debugDir = "debug/action-cache";
            fs_1.default.mkdirSync(debugDir, { recursive: true });
            fs_1.default.writeFileSync(`${debugDir}/replay-${replayId}.json`, JSON.stringify(replayResult, null, 2));
        }
        return replayResult;
    }
    /**
     * Find element with retry logic
     * Retries element finding with DOM refetch until element is found or max retries reached
     *
     * @param instruction Natural language instruction for the action
     * @param page The page to search on
     * @param maxRetries Maximum number of retry attempts
     * @param retryDelayMs Delay between retries in milliseconds
     * @returns Object containing the found element, DOM state, and element map
     * @throws Error if element is not found after all retries
     */
    async findElementWithRetry(instruction, page, maxRetries, retryDelayMs, startTime) {
        // Delegate to shared utility
        const result = await (0, find_element_1.findElementWithInstruction)(instruction, page, this.llm, {
            maxRetries,
            retryDelayMs,
            debug: this.debug,
        });
        // Check if element was found
        if (result.success && result.element) {
            // Success - return the result
            return {
                element: result.element,
                domState: result.domState,
                elementMap: result.elementMap,
                llmResponse: result.llmResponse,
            };
        }
        // Element not found after all retries - handle error case
        if (this.debug) {
            console.error(`[aiAction] No elements found for instruction: "${instruction}" after ${maxRetries} attempts`);
            console.error(`[aiAction] Current URL: ${page.url()}`);
            console.error(`[aiAction] Total elements in final a11y tree: ${result.domState.elements.size}`);
            // Write debug data to files before throwing error
            await this.writeDebugData({
                instruction,
                page,
                startTime,
                domState: result.domState,
                elementMap: result.elementMap,
                llmResponse: result.llmResponse,
                error: new error_1.HyperagentError(`No elements found for instruction: "${instruction}" after ${maxRetries} retry attempts.`, 404),
                success: false,
            });
        }
        throw new error_1.HyperagentError(`No elements found for instruction: "${instruction}" after ${maxRetries} retry attempts. The instruction may be too vague, the element may not exist, or the page may not have fully loaded.`, 404);
    }
    async writeDebugData(params) {
        if (!this.debug || !params.domState || !params.elementMap) {
            return;
        }
        const { writeAiActionDebug } = await Promise.resolve().then(() => __importStar(require("../utils/debugWriter")));
        try {
            const screenshot = await params.page
                .screenshot({ type: "png" })
                .catch(() => null);
            if (params.success && params.element) {
                // Success case - write found element data
                await writeAiActionDebug({
                    instruction: params.instruction,
                    url: params.page.url(),
                    timestamp: params.startTime,
                    domElementCount: params.domState.elements.size,
                    domTree: params.domState.domState,
                    screenshot: screenshot || undefined,
                    foundElement: {
                        elementId: params.element.elementId,
                        method: params.element.method,
                        arguments: params.element.arguments,
                        xpath: params.element.xpath,
                    },
                    llmResponse: params.llmResponse,
                    success: true,
                    frameDebugInfo: params.domState.frameDebugInfo,
                });
            }
            else {
                // Error case - write available elements
                const availableElements = this.collectInteractiveElements(params.elementMap, HyperAgent.AIACTION_CONFIG.MAX_DEBUG_ELEMENTS_TO_STORE);
                await writeAiActionDebug({
                    instruction: params.instruction,
                    url: params.page.url(),
                    timestamp: params.startTime,
                    domElementCount: params.domState.elements.size,
                    domTree: params.domState.domState,
                    screenshot: screenshot || undefined,
                    availableElements,
                    llmResponse: params.llmResponse,
                    error: {
                        message: params.error instanceof Error
                            ? params.error.message
                            : String(params.error),
                        stack: params.error instanceof Error ? params.error.stack : undefined,
                    },
                    success: false,
                    frameDebugInfo: params.domState.frameDebugInfo,
                });
            }
        }
        catch (debugError) {
            console.error(`[aiAction] Failed to write debug data:`, debugError);
        }
    }
    /**
     * Collect interactive elements from element map for debugging
     * Extracts elements with interactive roles (button, link, textbox, etc.)
     *
     * @param elementMap Map of element IDs to element data
     * @param limit Maximum number of elements to collect
     * @returns Array of interactive elements with id, role, and label
     */
    collectInteractiveElements(elementMap, limit = 20) {
        // Group elements by frame
        const frameElements = new Map();
        for (const [id, elem] of elementMap) {
            const role = elem.role;
            if (role &&
                [
                    "button",
                    "link",
                    "textbox",
                    "searchbox",
                    "combobox",
                    "checkbox",
                    "tab",
                    "menuitem",
                ].includes(role)) {
                const label = elem.name || elem.description || elem.value || "";
                if (label) {
                    // Extract frame index from ID (format: "frameIndex-backendNodeId")
                    const frameIndex = id.split("-")[0];
                    if (!frameElements.has(frameIndex)) {
                        frameElements.set(frameIndex, []);
                    }
                    frameElements.get(frameIndex).push({ id, role, label });
                }
            }
        }
        // Collect elements: prioritize iframe content, then main frame
        const result = [];
        // First, collect ALL iframe elements (non-0 frames)
        for (const [frameIndex, elements] of frameElements) {
            if (frameIndex !== "0") {
                result.push(...elements);
            }
        }
        // Then, fill remaining slots with main frame elements
        const mainFrameElements = frameElements.get("0") || [];
        const remainingSlots = limit - result.length;
        if (remainingSlots > 0) {
            result.push(...mainFrameElements.slice(0, remainingSlots));
        }
        return result.slice(0, limit);
    }
    /**
     * Execute a single granular action using a11y mode
     * Internal method used by page.perform() (and deprecated page.aiAction())
     *
     * Architecture: Simple examine->act flow
     * - 1 LLM call (examineDom finds element and suggests method)
     * - Direct execution (no agent loop)
     *
     * @param instruction Natural language instruction for a single action
     * @param page The page to execute the action on
     * @returns A promise that resolves to the task output
     */
    async executeSingleAction(instruction, pageOrGetter, _params) {
        const taskId = (0, uuid_1.v4)();
        const actionStart = perf_hooks_1.performance.now();
        const startTime = new Date().toISOString();
        if (this.debug) {
            console.log(`[aiAction] Instruction: ${instruction}`);
        }
        const getPage = () => typeof pageOrGetter === "function" ? pageOrGetter() : pageOrGetter;
        const initialPage = getPage();
        let domState = null;
        let elementMap = null;
        try {
            // Find element with retry logic
            const findStart = perf_hooks_1.performance.now();
            const { element, domState: foundDomState, elementMap: foundElementMap, llmResponse, } = await this.findElementWithRetry(instruction, initialPage, HyperAgent.AIACTION_CONFIG.MAX_RETRIES, HyperAgent.AIACTION_CONFIG.RETRY_DELAY_MS, startTime);
            // Check if page context switched during findElement (e.g. new tab opened by previous action)
            if (getPage() !== initialPage) {
                throw new error_1.HyperagentError("Page context switched during execution", 409);
            }
            domState = foundDomState;
            elementMap = foundElementMap;
            logPerf(this.debug, "[Perf][executeSingleAction] findElementWithRetry", findStart);
            if (this.debug) {
                console.log(`[aiAction] Found element: ${element.elementId}`);
                console.log(`[aiAction] Method: ${element.method}`);
                console.log(`[aiAction] Arguments:`, element.arguments);
            }
            if (!element.method) {
                throw new error_1.HyperagentError("Element method is missing from LLM response", 500);
            }
            const method = element.method;
            const args = element.arguments || [];
            if (!(0, types_2.isEncodedId)(element.elementId)) {
                throw new error_1.HyperagentError(`Element ID "${element.elementId}" is not in encoded format (frameIndex-backendNodeId).`, 400);
            }
            let actionXPath = domState?.xpathMap?.[element.elementId] ?? null;
            // Use shared runtime context
            const { cdpClient, frameContextManager } = await (0, runtime_context_1.initializeRuntimeContext)(initialPage, this.debug);
            // Check context switch again before action
            if (getPage() !== initialPage) {
                throw new error_1.HyperagentError("Page context switched during execution", 409);
            }
            // Create a context object compatible with performAction
            // We need to mock the ActionContext shape since performAction expects it
            // but we don't have a full AgentCtx/TaskState here
            const actionContext = {
                domState,
                page: initialPage,
                tokenLimit: this.tokenLimit,
                llm: this.llm,
                debug: this.debug,
                // Only provide CDP if enabled
                cdpActions: this.cdpActionsEnabled,
                cdp: this.cdpActionsEnabled
                    ? {
                        client: cdpClient,
                        frameContextManager,
                        resolveElement: cdp_1.resolveElement,
                        dispatchCDPAction: cdp_1.dispatchCDPAction,
                        preferScriptBoundingBox: this.debug,
                        debug: this.debug,
                    }
                    : undefined,
                // These are required by ActionContext but not used by performAction
                debugDir: undefined,
                mcpClient: this.mcpClient,
                variables: Object.values(this._variables),
                invalidateDomCache: () => (0, dom_cache_1.markDomSnapshotDirty)(initialPage),
            };
            // Use shared performAction to execute
            const actionOutput = await (0, perform_action_1.performAction)(actionContext, {
                elementId: element.elementId,
                method,
                arguments: args,
                instruction,
                confidence: 1, // Implicit confidence for single action
            });
            if (!actionOutput.success) {
                throw new Error(actionOutput.message);
            }
            // Wait for DOM to settle after action
            const waitStart = perf_hooks_1.performance.now();
            await (0, waitForSettledDOM_1.waitForSettledDOM)(initialPage);
            (0, dom_cache_1.markDomSnapshotDirty)(initialPage);
            logPerf(this.debug, "[Perf][executeSingleAction] action execution", actionStart);
            logPerf(this.debug, "[Perf][executeSingleAction] waitForSettledDOM", waitStart);
            // Write debug data on success
            await this.writeDebugData({
                instruction,
                page: initialPage,
                startTime,
                domState,
                elementMap,
                element: {
                    elementId: element.elementId,
                    method,
                    arguments: args,
                    xpath: actionXPath,
                },
                llmResponse,
                success: true,
            });
            logPerf(this.debug, "[Perf][executeSingleAction] total", actionStart);
            return {
                taskId,
                status: types_1.TaskStatus.COMPLETED,
                steps: [],
                output: `Successfully executed: ${instruction}`,
                actionCache: {
                    taskId,
                    createdAt: startTime,
                    status: types_1.TaskStatus.COMPLETED,
                    steps: [],
                },
                replayStepMeta: {
                    usedCachedAction: false,
                    fallbackUsed: false,
                    retries: 1,
                    cachedXPath: null,
                    fallbackXPath: actionXPath ?? null,
                    fallbackElementId: element.elementId ?? null,
                },
            };
        }
        catch (error) {
            // If page switched during execution, prioritize that over the error
            // This catches cases where findElement failed because the old page closed/navigated
            if (getPage() !== initialPage) {
                throw new error_1.HyperagentError("Page context switched during execution", 409);
            }
            // Write debug data on error
            await this.writeDebugData({
                instruction,
                page: initialPage,
                startTime,
                domState,
                elementMap,
                error,
                success: false,
            });
            // Re-throw HyperagentErrors as-is
            if (error instanceof error_1.HyperagentError) {
                throw error;
            }
            // Wrap other errors
            const errorMsg = error instanceof Error ? error.message : String(error);
            throw new error_1.HyperagentError(`Failed to execute action: ${errorMsg}`, 500);
        }
    }
    /**
     * Register a new action with the agent
     * @param action The action to register
     */
    async registerAction(action) {
        if (action.type === "complete") {
            throw new error_1.HyperagentError("Could not add an action with the name 'complete'. Complete is a reserved action.", 400);
        }
        const actionsList = new Set(this.actions.map((registeredAction) => registeredAction.type));
        if (actionsList.has(action.type)) {
            throw new Error(`Could not register action of type ${action.type}. Action with the same name is already registered`);
        }
        else {
            this.actions.push(action);
        }
    }
    /**
     * Initialize the MCP client with the given configuration
     * @param config The MCP configuration
     */
    async initializeMCPClient(config) {
        if (!config || config.servers.length === 0) {
            return;
        }
        this.mcpClient = new client_1.MCPClient(this.debug);
        try {
            for (const serverConfig of config.servers) {
                try {
                    const { serverId, actions } = await this.mcpClient.connectToServer(serverConfig);
                    for (const action of actions) {
                        this.registerAction(action);
                    }
                    if (this.debug) {
                        console.log(`MCP server ${serverId} initialized successfully`);
                    }
                }
                catch (error) {
                    console.error(`Failed to initialize MCP server ${serverConfig.id || "unknown"}:`, error);
                }
            }
            const serverIds = this.mcpClient.getServerIds();
            if (this.debug) {
                console.log(`Successfully connected to ${serverIds.length} MCP servers`);
            }
        }
        catch (error) {
            console.error("Failed to initialize MCP client:", error);
            this.mcpClient = undefined;
        }
    }
    /**
     * Connect to an MCP server at runtime
     * @param serverConfig Configuration for the MCP server
     * @returns Server ID if connection was successful
     */
    async connectToMCPServer(serverConfig) {
        if (!this.mcpClient) {
            this.mcpClient = new client_1.MCPClient(this.debug);
        }
        try {
            const { serverId, actions } = await this.mcpClient.connectToServer(serverConfig);
            // Register the actions from this server
            for (const action of actions) {
                this.registerAction(action);
            }
            if (this.debug) {
                console.log(`Connected to MCP server with ID: ${serverId}`);
            }
            return serverId;
        }
        catch (error) {
            console.error(`Failed to connect to MCP server:`, error);
            return null;
        }
    }
    /**
     * Disconnect from a specific MCP server
     * @param serverId ID of the server to disconnect from
     * @returns Boolean indicating if the disconnection was successful
     */
    disconnectFromMCPServer(serverId) {
        if (!this.mcpClient) {
            return false;
        }
        try {
            this.mcpClient.disconnectServer(serverId);
            return true;
        }
        catch (error) {
            console.error(`Failed to disconnect from MCP server ${serverId}:`, error);
            return false;
        }
    }
    /**
     * Check if a specific MCP server is connected
     * @param serverId ID of the server to check
     * @returns Boolean indicating if the server is connected
     */
    isMCPServerConnected(serverId) {
        if (!this.mcpClient) {
            return false;
        }
        return this.mcpClient.getServerIds().includes(serverId);
    }
    /**
     * Get all connected MCP server IDs
     * @returns Array of server IDs
     */
    getMCPServerIds() {
        if (!this.mcpClient) {
            return [];
        }
        return this.mcpClient.getServerIds();
    }
    /**
     * Get information about all connected MCP servers
     * @returns Array of server information objects or null if no MCP client is initialized
     */
    getMCPServerInfo() {
        if (!this.mcpClient) {
            return null;
        }
        return this.mcpClient.getServerInfo();
    }
    /**
     * Pretty print an action
     * @param action The action to print
     * @returns Formatted string representation of the action
     */
    pprintAction(action) {
        const foundAction = this.actions.find((actions) => actions.type === action.type);
        if (foundAction && foundAction.pprintAction) {
            return foundAction.pprintAction(action.params);
        }
        return "";
    }
    getSession() {
        const session = this.browserProvider.getSession();
        if (!session) {
            return null;
        }
        return session;
    }
    createScriptFromActionCache(steps, taskId) {
        return (0, action_cache_script_1.createScriptFromActionCache)({ steps, taskId });
    }
    setupHyperPage(page) {
        const hyperPage = page;
        // Clean up existing listener if this page was already setup
        if (hyperPage._scopeListenerCleanup) {
            hyperPage._scopeListenerCleanup();
        }
        // History Stack: [Root, Tab1, Tab2, ...]
        const pageStack = [page];
        const getActivePage = () => pageStack[pageStack.length - 1];
        // Handle tab closing (Pop)
        const handleClose = (p) => {
            const idx = pageStack.indexOf(p);
            if (idx !== -1) {
                if (this.debug) {
                    console.log(`[HyperPage] Tab closed, removing from stack`);
                }
                pageStack.splice(idx, 1);
            }
        };
        // Listen for close on the root page
        page.on("close", () => handleClose(page));
        // Handle new tabs (Push)
        const onPage = async (newPage) => {
            try {
                // Check if the new page is opened by our current active scope page
                const opener = await newPage.opener();
                if (opener === getActivePage()) {
                    if (this.debug) {
                        console.log(`[HyperPage] Auto-switching to new tab (Push): ${newPage.url()}`);
                    }
                    // Update the scope to follow the new tab
                    pageStack.push(newPage);
                    // Listen for close on the new page
                    newPage.on("close", () => handleClose(newPage));
                }
            }
            catch {
                // Ignore
            }
        };
        // Attach a persistent listener to track page flow for the lifetime of this wrapper
        page.context().on("page", onPage);
        hyperPage._scopeListenerCleanup = () => {
            page.context().off("page", onPage);
        };
        const executeSingleActionWithRetry = async (instruction, params) => {
            const maxRetries = 3;
            for (let i = 0; i < maxRetries; i++) {
                try {
                    return await this.executeSingleAction(instruction, getActivePage, params);
                }
                catch (err) {
                    if (err.statusCode === 409 ||
                        (err.message && err.message.includes("Page context switched"))) {
                        if (this.debug) {
                            console.log("[HyperPage] Action aborted due to tab switch, retrying on new page...");
                        }
                        // Wait briefly for stability
                        await new Promise((resolve) => setTimeout(resolve, 500));
                        continue;
                    }
                    throw err;
                }
            }
            throw new error_1.HyperagentError("Failed to execute action after max retries due to page switching", 500);
        };
        hyperPage.ai = (task, params) => this.executeTask(task, params, getActivePage());
        hyperPage.perform = (instruction, params) => executeSingleActionWithRetry(instruction, params);
        hyperPage.aiAction = async (instruction, params) => {
            return executeSingleActionWithRetry(instruction, params);
        };
        hyperPage.getActionCache = (taskId) => this.getActionCache(taskId);
        hyperPage.runFromActionCache = (cache, params) => this.runFromActionCache(cache, getActivePage, params);
        const deps = {
            debug: this.debug,
            tokenLimit: this.tokenLimit,
            llm: this.llm,
            mcpClient: this.mcpClient,
            variables: Object.values(this._variables),
            cdpActionsEnabled: this.cdpActionsEnabled,
        };
        (0, action_cache_exec_1.attachCachedActionHelpers)(deps, hyperPage);
        // aiAsync tasks run in background, so we just use the current scope start point.
        // The task itself has internal auto-following logic (from executeTaskAsync implementation).
        hyperPage.aiAsync = (task, params) => this.executeTaskAsync(task, params, getActivePage());
        hyperPage.extract = async (task, outputSchema, params) => {
            if (!task && !outputSchema) {
                throw new error_1.HyperagentError("No task description or output schema specified", 400);
            }
            const taskParams = {
                maxSteps: params?.maxSteps ?? 2,
                ...params,
                outputSchema,
            };
            if (task) {
                const res = await this.executeTask(`You have to perform an extraction on the current page. You have to perform the extraction according to the task: ${task}. Make sure your final response only contains the extracted content`, taskParams, getActivePage());
                if (outputSchema) {
                    const outputText = res.output;
                    if (typeof outputText !== "string" || outputText === "") {
                        throw new Error(`Extract failed: Agent did not complete with output. Task status: ${res.status}. Check debug output for details.`);
                    }
                    return JSON.parse(outputText);
                }
                const outputText = res.output;
                if (typeof outputText !== "string" || outputText === "") {
                    throw new Error(`Extract failed: Agent did not complete with output. Task status: ${res.status}. Check debug output for details.`);
                }
                return outputText;
            }
            else {
                const res = await this.executeTask("You have to perform a data extraction on the current page. Make sure your final response only contains the extracted content", taskParams, getActivePage());
                if (typeof res.output !== "string" || res.output === "") {
                    throw new Error(`Extract failed: Agent did not complete with output. Task status: ${res.status}. Check debug output for details.`);
                }
                return JSON.parse(res.output);
            }
        };
        return hyperPage;
    }
}
exports.HyperAgent = HyperAgent;
// aiAction configuration constants
HyperAgent.AIACTION_CONFIG = {
    MAX_RETRIES: 10,
    RETRY_DELAY_MS: 1000,
    CLICK_TIMEOUT: 3500,
    MAX_DEBUG_ELEMENTS_TO_DISPLAY: 20,
    MAX_DEBUG_ELEMENTS_TO_STORE: 50,
    MAX_LABEL_LENGTH: 60,
};
function logPerf(debug, label, start) {
    if (!debug)
        return;
    const duration = perf_hooks_1.performance.now() - start;
    console.log(`${label} took ${Math.round(duration)}ms`);
}
