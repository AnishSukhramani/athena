"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamService = void 0;
const client_1 = require("../client");
const base_1 = require("./base");
class TeamService extends base_1.BaseService {
    /**
     * Get the credit info for the team
     */
    async getCreditInfo() {
        try {
            return await this.request("/team/credit-info");
        }
        catch (error) {
            if (error instanceof client_1.HyperbrowserError) {
                throw error;
            }
            throw new client_1.HyperbrowserError("Failed to get team credit info", undefined);
        }
    }
}
exports.TeamService = TeamService;
