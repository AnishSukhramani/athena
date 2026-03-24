import { z } from "zod";
/**
 * Zod schema for a single element match result
 */
export declare const ExamineDomResultSchema: z.ZodObject<{
    elementId: z.ZodString;
    description: z.ZodString;
    confidence: z.ZodNumber;
    method: z.ZodDefault<z.ZodEnum<{
        fill: "fill";
        type: "type";
        check: "check";
        nextChunk: "nextChunk";
        prevChunk: "prevChunk";
        click: "click";
        hover: "hover";
        press: "press";
        uncheck: "uncheck";
        selectOptionFromDropdown: "selectOptionFromDropdown";
        scrollToElement: "scrollToElement";
        scrollToPercentage: "scrollToPercentage";
    }>>;
    arguments: z.ZodDefault<z.ZodArray<z.ZodString>>;
}, z.core.$strip>;
/**
 * Zod schema for examineDom response (array of results)
 */
export declare const ExamineDomResultsSchema: z.ZodObject<{
    elements: z.ZodArray<z.ZodObject<{
        elementId: z.ZodString;
        description: z.ZodString;
        confidence: z.ZodNumber;
        method: z.ZodDefault<z.ZodEnum<{
            fill: "fill";
            type: "type";
            check: "check";
            nextChunk: "nextChunk";
            prevChunk: "prevChunk";
            click: "click";
            hover: "hover";
            press: "press";
            uncheck: "uncheck";
            selectOptionFromDropdown: "selectOptionFromDropdown";
            scrollToElement: "scrollToElement";
            scrollToPercentage: "scrollToPercentage";
        }>>;
        arguments: z.ZodDefault<z.ZodArray<z.ZodString>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type ExamineDomResultsType = z.infer<typeof ExamineDomResultsSchema>;
