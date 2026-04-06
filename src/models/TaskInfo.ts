import type {IJsonTransformable} from "./IJsonTransformable.ts";

export class TaskInfo implements IJsonTransformable {
    public ID : string;
    public Name : string;
    public Command : string;

    constructor(jsonDecoded : any) {
        this.ID = jsonDecoded.id;
        this.Name = jsonDecoded.name;
        this.Command = jsonDecoded.command;
    }

    public static fromJson(json: string) : TaskInfo {
        return new TaskInfo(JSON.parse(json));
    }

    public toJson() : object {
        return {
            id: this.ID,
            name: this.Name,
            command: this.Command,
        }
    }
}