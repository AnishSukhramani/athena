import { z } from "zod";
import { ActionOutput, AgentActionDefinition } from "../types";
export declare const UserInteractionActionParams: z.ZodDiscriminatedUnion<[z.ZodObject<{
    message: z.ZodString;
    kind: z.ZodLiteral<"text_input">;
    choices: z.ZodArray<z.ZodString>;
}, z.core.$strip>, z.ZodObject<{
    message: z.ZodString;
    kind: z.ZodLiteral<"password">;
    choices: z.ZodArray<z.ZodString>;
}, z.core.$strip>, z.ZodObject<{
    message: z.ZodString;
    kind: z.ZodLiteral<"confirm">;
    choices: z.ZodArray<z.ZodString>;
}, z.core.$strip>, z.ZodObject<{
    message: z.ZodString;
    kind: z.ZodLiteral<"select">;
    choices: z.ZodArray<z.ZodString>;
}, z.core.$strip>], "kind">;
export type UserInteractionActionParamsType = typeof UserInteractionActionParams;
type userInputFn = (params: z.infer<UserInteractionActionParamsType>) => Promise<ActionOutput>;
export declare const UserInteractionAction: (userInputFn: userInputFn) => AgentActionDefinition<UserInteractionActionParamsType>;
export {};
