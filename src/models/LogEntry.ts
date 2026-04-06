import type {IJsonTransformable} from "./IJsonTransformable.ts";

export class LogEntry implements IJsonTransformable {
    public Time : BigInt;
    public DurationMs : BigInt;
    public Message : string;
    public Success : boolean;

    constructor(jsonDecoded : any) {
        this.Time = BigInt(jsonDecoded.time);
        this.DurationMs = BigInt(jsonDecoded.duration_ms);
        this.Message = jsonDecoded.message;
        this.Success = jsonDecoded.success;
    }

    public static fromJson(json: string) : LogEntry {
        return new LogEntry(JSON.parse(json));
    }

    public toJson() : object {
        return {
            time: this.Time,
            duration_ms: this.DurationMs,
            message: this.Message,
            success: this.Success,
        }
    }
}