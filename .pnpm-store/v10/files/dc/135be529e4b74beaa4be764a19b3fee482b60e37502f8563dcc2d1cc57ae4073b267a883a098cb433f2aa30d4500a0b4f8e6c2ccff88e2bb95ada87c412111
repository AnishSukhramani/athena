"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PDFActionDefinition = exports.PDFAction = void 0;
const zod_1 = require("zod");
const dotenv_1 = require("dotenv");
const genai_1 = require("@google/genai");
(0, dotenv_1.config)();
exports.PDFAction = zod_1.z
    .object({
    pdfUrl: zod_1.z.string().describe("The URL of the PDF to analyze."),
    prompt: zod_1.z.string().describe("The prompt/question to ask about the PDF."),
})
    .describe("Analyze a PDF using Gemini and a prompt");
exports.PDFActionDefinition = {
    type: "analyzePdf",
    actionParams: exports.PDFAction,
    run: async (ctx, action) => {
        const goog = new genai_1.GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const { pdfUrl, prompt } = action;
        let pdfBuffer = null;
        try {
            // Try direct request first (works for direct PDF links)
            const response = await ctx.page.request.get(pdfUrl);
            if (response.ok() &&
                response.headers()["content-type"]?.includes("pdf")) {
                pdfBuffer = Buffer.from(await response.body());
            }
            else {
                // Fallback: navigate and intercept response
                const [resp] = await Promise.all([
                    ctx.page.waitForResponse((r) => r.url() === pdfUrl && r.headers()["content-type"]?.includes("pdf")),
                    ctx.page.goto(pdfUrl, { waitUntil: "networkidle" }),
                ]);
                pdfBuffer = Buffer.from(await resp.body());
            }
        }
        catch (err) {
            return {
                success: false,
                message: `Failed to download PDF: ${err}`,
            };
        }
        if (!pdfBuffer) {
            return {
                success: false,
                message: "Could not retrieve PDF file.",
            };
        }
        const geminiResponse = await goog.models.generateContent({
            model: "gemini-2.5-pro-preview-03-25",
            contents: [
                { text: prompt },
                {
                    inlineData: {
                        mimeType: "application/pdf",
                        data: pdfBuffer.toString("base64"),
                    },
                },
            ],
        });
        return {
            success: true,
            message: geminiResponse.text || "No response text returned.",
        };
    },
    pprintAction: function (params) {
        return `Analyze PDF at URL: ${params.pdfUrl} with prompt: ${params.prompt}`;
    },
};
