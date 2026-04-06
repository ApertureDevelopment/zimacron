import type {IJsonTransformable} from "./IJsonTransformable.ts";

export class ValidationError implements IJsonTransformable {
    public Message : string;
    public Field : string;
    public Value : string;

    constructor(jsonDecoded : any) {
        this.Message = jsonDecoded.message;
        this.Field = jsonDecoded.field;
        this.Value = jsonDecoded.value;
    }

    public static fromJson(json: string) : ValidationError {
        return new ValidationError(JSON.parse(json));
    }

    public toJson() : object {
        return {
            message: this.Message,
            field: this.Field,
            value: this.Value,
        }
    }
}