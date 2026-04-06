import type {IJsonTransformable} from "./IJsonTransformable.ts";

export class ResultInfo implements IJsonTransformable {
    public Success : boolean;
    public Message : string;
    public DurationMs : number;

    constructor(jsonDecoded : any) {
        this.Success = jsonDecoded.success;
        this.Message = jsonDecoded.message;
        this.DurationMs = jsonDecoded.duration_ms;
    }

    public static fromJson(json: string) : ResultInfo {
        return new ResultInfo(JSON.parse(json));
    }

    public toJson() : object {
        return {
            success: this.Success,
            message: this.Message,
            duration_ms: this.DurationMs,
        }
    }
}