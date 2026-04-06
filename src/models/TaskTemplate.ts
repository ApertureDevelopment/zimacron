export class TaskTemplate {
    public ID : string;
    public Name : string;
    public Description : string;
    public Command : string;
    public Type : string;
    public IntervalMin : number | undefined;
    public CronExpr : string | undefined;
    public Category : string;
    public TimeoutSec : number;

    constructor(jsonDecoded : any) {
        this.ID = jsonDecoded.id;
        this.Name = jsonDecoded.name;
        this.Description = jsonDecoded.description;
        this.Command = jsonDecoded.command;
        this.Type = jsonDecoded.type;
        this.IntervalMin = jsonDecoded.interval_min;
        this.CronExpr = jsonDecoded.cron_expr;
        this.Category = jsonDecoded.category;
        this.TimeoutSec = jsonDecoded.timeout_sec;

        if (this.Type == "cron") {
            this.IntervalMin = undefined;
        } else if(this.Type == "interval") {
            this.CronExpr = undefined;
        }
    }

    public static fromJson(json: string) : TaskTemplate {
        return new TaskTemplate(JSON.parse(json));
    }
}