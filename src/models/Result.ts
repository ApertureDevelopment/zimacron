import type {IJsonTransformable} from "./IJsonTransformable.ts";

export class Result implements IJsonTransformable {
    public Success : boolean;
    public Message : string;

    constructor(jsonDecoded : any) {
        this.Success = jsonDecoded.success;
        this.Message = jsonDecoded.message;
    }
    public static fromJson(json: string) : Result {
        return new Result(JSON.parse(json));
    }

    public toJson() : object {
        return {
            success: this.Success,
            message: this.Message,
        }
    }
}