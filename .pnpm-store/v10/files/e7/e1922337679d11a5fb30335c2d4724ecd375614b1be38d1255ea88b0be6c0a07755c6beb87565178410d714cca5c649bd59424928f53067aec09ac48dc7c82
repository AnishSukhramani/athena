"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isZodSchema = exports.sleep = void 0;
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
exports.sleep = sleep;
const isZodSchema = (schema) => {
    return (schema &&
        typeof schema === "object" &&
        "_def" in schema &&
        "parse" in schema &&
        typeof schema.parse === "function");
};
exports.isZodSchema = isZodSchema;
