"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.endTaskStatuses = exports.TaskStatus = exports.AgentOutputFn = void 0;
const zod_1 = require("zod");
const AgentOutputFn = (actionsSchema) => zod_1.z.object({
    thoughts: zod_1.z
        .string()
        .describe("Your reasoning about the current state and what needs to be done next based on the task goal and previous actions"),
    memory: zod_1.z
        .string()
        .describe("A summary of successful actions completed so far and the resulting state changes (e.g., 'Clicked login button -> login form appeared', 'Filled email field with user@example.com')"),
    action: actionsSchema,
});
exports.AgentOutputFn = AgentOutputFn;
var TaskStatus;
(function (TaskStatus) {
    TaskStatus["PENDING"] = "pending";
    TaskStatus["RUNNING"] = "running";
    TaskStatus["PAUSED"] = "paused";
    TaskStatus["CANCELLED"] = "cancelled";
    TaskStatus["COMPLETED"] = "completed";
    TaskStatus["FAILED"] = "failed";
})(TaskStatus || (exports.TaskStatus = TaskStatus = {}));
exports.endTaskStatuses = new Set([
    TaskStatus.CANCELLED,
    TaskStatus.COMPLETED,
    TaskStatus.FAILED,
]);
