#!/usr/bin/env node
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
require("dotenv/config");
const node_fs_1 = __importDefault(require("node:fs"));
const commander_1 = require("commander");
const inquirer = __importStar(require("@inquirer/prompts"));
const ora_1 = __importDefault(require("ora"));
const boxen_1 = __importDefault(require("boxen"));
const chalk_1 = __importDefault(require("chalk"));
const readline_1 = __importDefault(require("readline"));
const agent_1 = require("../agent");
const custom_actions_1 = require("../custom-actions");
const types_1 = require("../types");
const error_1 = require("../agent/error");
const program = new commander_1.Command();
let currentSpinner = (0, ora_1.default)();
program
    .name("hyperbrowser")
    .description("CLI for Hyperbrowser - A powerful browser automation tool")
    .version("1.0.2");
program
    .command("run", { isDefault: true })
    .description("Run the interactive CLI")
    .option("-d, --debug", "Enable debug mode")
    .option("-c, --command <task description>", "Command to run")
    .option("-f, --file <file path>", "Path to a file containing a command")
    .option("-m, --mcp <mcp config file>", "Path to a file containing mcp config")
    .option("--hyperbrowser", "Use Hyperbrowser for the browser provider")
    .action(async function () {
    const options = this.opts();
    const debug = options.debug || false;
    const useHB = options.hyperbrowser || false;
    let taskDescription = options.command || undefined;
    const filePath = options.file || undefined;
    const mcpPath = options.mcp || undefined;
    console.log(chalk_1.default.blue("HyperAgent CLI"));
    currentSpinner.info(`Pause using ${chalk_1.default.bold("ctrl + p")} and resume using ${chalk_1.default.bold("ctrl + r")}\n`);
    try {
        // Check for API key if using Hyperbrowser
        if (useHB && !process.env.HYPERBROWSER_API_KEY) {
            const apiKey = await inquirer.password({
                message: "Hyperbrowser API key not found in environment variables. Please enter it here:",
                mask: "*",
            });
            if (!apiKey) {
                console.log(chalk_1.default.yellow("Hyperbrowser API key is required. Exiting."));
                process.exit(0);
            }
            process.env.HYPERBROWSER_API_KEY = apiKey; // Set it for the current process
        }
        const agent = new agent_1.HyperAgent({
            debug: debug,
            browserProvider: useHB ? "Hyperbrowser" : "Local",
            customActions: [
                (0, custom_actions_1.UserInteractionAction)(async ({ message, kind, choices }) => {
                    const currentText = currentSpinner.text;
                    try {
                        currentSpinner.stop();
                        currentSpinner.clear();
                        if (kind === "text_input") {
                            const response = await inquirer.input({
                                message,
                                required: true,
                            });
                            return {
                                success: true,
                                message: `User responded with the text: "${response}"`,
                            };
                        }
                        else if (kind === "confirm") {
                            const response = await inquirer.confirm({
                                message,
                            });
                            return {
                                success: true,
                                message: `User responded with "${response}"`,
                            };
                        }
                        else if (kind === "password") {
                            console.warn(chalk_1.default.red("Providing passwords to LLMs can be dangerous. Passwords are passed in plain-text to the LLM and can be read by other people."));
                            const response = await inquirer.password({
                                message,
                            });
                            return {
                                success: true,
                                message: `User responded with password: ${response}`,
                            };
                        }
                        else {
                            if (!choices || choices.length === 0) {
                                return {
                                    success: false,
                                    message: "For 'select' kind of user interaction, an array of choices is required.",
                                };
                            }
                            else {
                                const response = await inquirer.select({
                                    message,
                                    choices: choices.map((option) => ({
                                        value: option,
                                        name: option,
                                    })),
                                });
                                return {
                                    success: true,
                                    message: `User selected the choice: ${response}`,
                                };
                            }
                        }
                    }
                    finally {
                        currentSpinner.start(currentText);
                    }
                }),
            ],
        });
        let task;
        readline_1.default.emitKeypressEvents(process.stdin);
        process.stdin.on("keypress", async (ch, key) => {
            if (key && key.ctrl && key.name == "p") {
                if (currentSpinner.isSpinning) {
                    currentSpinner.stopAndPersist({ symbol: "⏸" });
                }
                currentSpinner.start(chalk_1.default.blue("Hyperagent will pause after completing this operation. Press Ctrl+r again to resume."));
                currentSpinner.stopAndPersist({ symbol: "⏸" });
                currentSpinner = (0, ora_1.default)();
                if (task.getStatus() == types_1.TaskStatus.RUNNING) {
                    task.pause();
                }
            }
            else if (key && key.ctrl && key.name == "r") {
                if (task.getStatus() == types_1.TaskStatus.PAUSED) {
                    currentSpinner.start(chalk_1.default.blue("Hyperagent will resume"));
                    currentSpinner.stopAndPersist({ symbol: "⏵" });
                    currentSpinner = (0, ora_1.default)();
                    task.resume();
                }
            }
            else if (key && key.ctrl && key.name == "c") {
                if (currentSpinner.isSpinning) {
                    currentSpinner.stopAndPersist();
                }
                console.log("\nShutting down HyperAgent");
                try {
                    await agent.closeAgent();
                    process.exit(0);
                }
                catch (err) {
                    console.error("Error during shutdown:", err);
                    process.exit(1);
                }
            }
        });
        process.stdin.setRawMode(true);
        const onStep = (params) => {
            const action = params.agentOutput.action;
            const output = params.actionOutput;
            const actionDisplay = output.success
                ? `  └── [${chalk_1.default.yellow(action.type)}] ${agent.pprintAction(action)}`
                : `  └── [${chalk_1.default.red(action.type)}] ${chalk_1.default.red(output.message)}`;
            currentSpinner.succeed(`[${chalk_1.default.yellow("step")}]: ${params.agentOutput.thoughts}\n${actionDisplay}`);
            currentSpinner = (0, ora_1.default)();
            process.stdin.setRawMode(true);
            process.stdin.resume();
        };
        const debugAgentOutput = (params) => {
            const action = params.action;
            const actionDisplay = `  └── [${chalk_1.default.yellow(action.type)}] ${agent.pprintAction(action)}`;
            currentSpinner.start(`[${chalk_1.default.yellow("planning")}]: ${params.thoughts}\n${actionDisplay}`);
            process.stdin.setRawMode(true);
            process.stdin.resume();
        };
        const onComplete = async (params) => {
            console.log((0, boxen_1.default)(params.output || "No Response", {
                title: chalk_1.default.yellow("HyperAgent Response"),
                titleAlignment: "center",
                float: "center",
                padding: 1,
                margin: { top: 2, left: 0, right: 0, bottom: 0 },
            }));
            console.log("\n");
            const continueTask = await inquirer.select({
                message: "Would you like to continue ",
                choices: [
                    { name: "Yes", value: true },
                    { name: "No", value: false },
                ],
            });
            if (continueTask) {
                const taskDescription = await inquirer.input({
                    message: "What should HyperAgent do next for you?",
                    required: true,
                });
                process.stdin.setRawMode(true);
                process.stdin.resume();
                task = await agent.executeTaskAsync(taskDescription, {
                    onStep: onStep,
                    debugOnAgentOutput: debugAgentOutput,
                    onComplete: onComplete,
                });
                task.emitter.addListener("error", (error) => {
                    task.cancel();
                    throw error;
                });
            }
            else {
                process.exit(0);
            }
        };
        if (!taskDescription) {
            if (filePath) {
                taskDescription = (await node_fs_1.default.promises.readFile(filePath)).toString();
            }
            else {
                taskDescription = await inquirer.input({
                    message: "What should HyperAgent do for you today?",
                    required: true,
                });
            }
        }
        if (mcpPath) {
            const mcpConfig = JSON.parse((await node_fs_1.default.promises.readFile(mcpPath)).toString());
            await agent.initializeMCPClient({ servers: mcpConfig });
        }
        if (useHB && !debug) {
            await agent.initBrowser();
            const session = agent.getSession();
            console.log(`Hyperbrowser Live URL: ${session.liveUrl}\n`);
        }
        task = await agent.executeTaskAsync(taskDescription, {
            onStep: onStep,
            onComplete: onComplete,
            debugOnAgentOutput: debugAgentOutput,
        });
        task.emitter.addListener("error", (error) => {
            task.cancel();
            throw error;
        });
    }
    catch (err) {
        if (err instanceof error_1.HyperagentError || err instanceof Error) {
            console.log(chalk_1.default.red(err.message));
            if (debug) {
                console.trace(err);
            }
        }
        else {
            console.log(chalk_1.default.red(err));
            if (debug) {
                console.trace(err);
            }
        }
    }
});
program.parse();
