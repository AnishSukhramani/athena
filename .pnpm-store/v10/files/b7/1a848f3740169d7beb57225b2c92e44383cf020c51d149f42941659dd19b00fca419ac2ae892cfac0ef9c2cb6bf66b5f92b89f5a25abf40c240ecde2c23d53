import { SessionDetail } from "../types";
import { ComputerActionResponse, Coordinate, ComputerActionMouseButton } from "../types/computer-action";
import { BaseService } from "./base";
export declare class ComputerActionService extends BaseService {
    private executeRequest;
    click(session: SessionDetail | string, x: number, y: number, button?: ComputerActionMouseButton, numClicks?: number, returnScreenshot?: boolean): Promise<ComputerActionResponse>;
    typeText(session: SessionDetail | string, text: string, returnScreenshot?: boolean): Promise<ComputerActionResponse>;
    screenshot(session: SessionDetail | string): Promise<ComputerActionResponse>;
    pressKeys(session: SessionDetail | string, keys: string[], returnScreenshot?: boolean): Promise<ComputerActionResponse>;
    drag(session: SessionDetail | string, path: Coordinate[], returnScreenshot?: boolean): Promise<ComputerActionResponse>;
    moveMouse(session: SessionDetail | string, x: number, y: number, returnScreenshot?: boolean): Promise<ComputerActionResponse>;
    scroll(session: SessionDetail | string, x: number, y: number, scrollX: number, scrollY: number, returnScreenshot?: boolean): Promise<ComputerActionResponse>;
    holdKey(session: SessionDetail | string, key: string, duration: number, returnScreenshot?: boolean): Promise<ComputerActionResponse>;
    mouseDown(session: SessionDetail | string, button?: ComputerActionMouseButton, returnScreenshot?: boolean): Promise<ComputerActionResponse>;
    mouseUp(session: SessionDetail | string, button?: ComputerActionMouseButton, returnScreenshot?: boolean): Promise<ComputerActionResponse>;
    getClipboardText(session: SessionDetail | string, returnScreenshot?: boolean): Promise<ComputerActionResponse>;
    putSelectionText(session: SessionDetail | string, text: string, returnScreenshot?: boolean): Promise<ComputerActionResponse>;
}
