export declare const OPENAI_CUA_DESCRIPTION = "This tool utilizes OpenAI's model to autonomously execute general-purpose browser-based tasks with balanced performance and reliability using a cloud browser. It handles complex interactions effectively with practical reasoning and clear execution.\n\nOptimal for tasks requiring:\n- Reliable, general-purpose browser automation\n- Clear, structured interactions with moderate complexity\n- Efficient handling of common web tasks and workflows\n\nBest suited use cases include:\n- Standard multi-step registration or form submissions\n- Navigating typical web applications requiring multiple interactions\n- Conducting structured web research tasks\n- Extracting data through interactive web processes\n\nProvide a clear step-by-step description, necessary context, and expected outcomes. Returns the completed result or an error message if issues arise.";
export declare const CLAUDE_COMPUTER_USE_DESCRIPTION = "\nThis tool leverages Anthropic's Claude model to autonomously execute complex browser tasks with sophisticated reasoning capabilities using a cloud browser. It specializes in handling intricate, nuanced, or highly context-sensitive web interactions.\n\nOptimal for tasks requiring:\n- Complex reasoning over multiple web pages\n- Nuanced interpretation and flexible decision-making\n- Human-like interaction with detailed context awareness\n\nBest suited use cases include:\n- Multi-step processes requiring reasoning (e.g., detailed registrations or onboarding)\n- Interacting intelligently with advanced web apps\n- Conducting in-depth research with complex conditions\n- Extracting information from dynamic or interactive websites\n\nProvide detailed task instructions, relevant context, and clearly specify the desired outcome for best results. Returns the completed result or an error message if issues arise.";
export declare const SCRAPE_SCHEMA: {
    type: "object";
    properties: {
        url: {
            type: string;
            description: string;
        };
        scrapeOptions: {
            type: string;
            description: string;
            properties: {
                formats: {
                    type: string;
                    description: string;
                    items: {
                        type: string;
                        enum: ("markdown" | "screenshot")[];
                    };
                };
                includeTags: {
                    type: string;
                    items: {
                        type: string;
                    };
                    description: string;
                };
                excludeTags: {
                    type: string;
                    items: {
                        type: string;
                    };
                    description: string;
                };
                onlyMainContent: {
                    type: string;
                    description: string;
                };
            };
            required: string[];
            additionalProperties: boolean;
        };
    };
    required: string[];
    additionalProperties: boolean;
};
export declare const SCREENSHOT_SCHEMA: {
    type: "object";
    properties: {
        url: {
            type: string;
            description: string;
        };
        scrapeOptions: {
            type: string;
            description: string;
            properties: {
                formats: {
                    type: string;
                    description: string;
                    items: {
                        type: string;
                        enum: ("markdown" | "screenshot")[];
                    };
                };
                includeTags: {
                    type: string;
                    items: {
                        type: string;
                    };
                    description: string;
                };
                excludeTags: {
                    type: string;
                    items: {
                        type: string;
                    };
                    description: string;
                };
                onlyMainContent: {
                    type: string;
                    description: string;
                };
            };
            required: string[];
            additionalProperties: boolean;
        };
    };
    required: string[];
    additionalProperties: boolean;
};
export declare const CRAWL_SCHEMA: {
    type: "object";
    properties: {
        url: {
            type: string;
            description: string;
        };
        maxPages: {
            type: string;
            description: string;
        };
        followLinks: {
            type: string;
            description: string;
        };
        ignoreSitemap: {
            type: string;
            description: string;
        };
        excludePatterns: {
            type: string;
            items: {
                type: string;
            };
            description: string;
        };
        includePatterns: {
            type: string;
            items: {
                type: string;
            };
            description: string;
        };
        scrapeOptions: {
            type: string;
            description: string;
            properties: {
                formats: {
                    type: string;
                    description: string;
                    items: {
                        type: string;
                        enum: ("markdown" | "screenshot")[];
                    };
                };
                includeTags: {
                    type: string;
                    items: {
                        type: string;
                    };
                    description: string;
                };
                excludeTags: {
                    type: string;
                    items: {
                        type: string;
                    };
                    description: string;
                };
                onlyMainContent: {
                    type: string;
                    description: string;
                };
            };
            required: string[];
            additionalProperties: boolean;
        };
    };
    required: string[];
    additionalProperties: boolean;
};
export declare const EXTRACT_SCHEMA: {
    type: "object";
    properties: {
        urls: {
            type: string;
            items: {
                type: string;
            };
            description: string;
        };
        prompt: {
            type: string;
            description: string;
        };
        schema: {
            type: string;
            description: string;
        };
        maxLinks: {
            type: string;
            description: string;
        };
    };
    required: string[];
    additionalProperties: boolean;
};
export declare const BROWSER_USE_SCHEMA: {
    type: "object";
    properties: {
        task: {
            type: string;
            description: string;
        };
        llm: {
            description: string;
            type: string;
            enum: string[];
            default: string;
        };
        plannerLlm: {
            description: string;
            type: string;
            enum: string[];
            default: string;
        };
        pageExtractionLlm: {
            description: string;
            type: string;
            enum: string[];
            default: string;
        };
        keepBrowserOpen: {
            type: string;
            description: string;
        };
    };
    required: string[];
    additionalProperties: boolean;
};
export declare const CLAUDE_COMPUTER_USE_SCHEMA: {
    type: "object";
    properties: {
        task: {
            type: string;
            description: string;
        };
        sessionOptions: {
            type: string;
            description: string;
            properties: {
                useProxy: {
                    type: string;
                    description: string;
                };
            };
            required: string[];
            additionalProperties: boolean;
        };
    };
    required: string[];
    additionalProperties: boolean;
};
export declare const OPENAI_CUA_SCHEMA: {
    type: "object";
    properties: {
        task: {
            type: string;
            description: string;
        };
        sessionOptions: {
            type: string;
            description: string;
            properties: {
                useProxy: {
                    type: string;
                    description: string;
                };
            };
            required: string[];
            additionalProperties: boolean;
        };
    };
    required: string[];
    additionalProperties: boolean;
};
