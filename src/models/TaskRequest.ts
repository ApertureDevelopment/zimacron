import {NotificationConfig} from "./NotificationConfig.ts";
import type {IJsonTransformable} from "./IJsonTransformable.ts";

export class TaskRequest implements IJsonTransformable {
    public Name : string;
    public Command : string;
    public Type : string;
    public IntervalMin : number | undefined;
    public CronExpr : string | undefined;
    public TimeoutSec : number;
    public RetryCount : number;
    public RetryDelaySec : number;
    public Env: Map<string, string> | undefined;
    public Notifications : NotificationConfig[] | undefined;
    public Category : string | undefined;
    public Tags : string[] | undefined;
    public Priority : number | undefined;
    public DependsOn : string[] | undefined;
    public AllowParallel : boolean | undefined;
    public MaxLogEntries : number | undefined;

    constructor(jsonDecoded : any | null) {
        if (jsonDecoded == null) {
            this.Name = "New Task";
            this.Command = "";
            this.Type = "interval";
            this.TimeoutSec = 30;
            this.RetryCount = 3;
            this.RetryDelaySec = 10;
            return;
        }

        this.Name = jsonDecoded.name;
        this.Command = jsonDecoded.command;
        this.Type = jsonDecoded.type;
        this.IntervalMin = jsonDecoded.interval_min;
        this.CronExpr = jsonDecoded.cron_expr;
        this.TimeoutSec = jsonDecoded.timeout_sec;
        this.RetryCount = jsonDecoded.retry_count;
        this.RetryDelaySec = jsonDecoded.retry_delay_sec;
        this.Env = jsonDecoded.env;
        this.Notifications = jsonDecoded.notifications === undefined ? undefined : new Array<NotificationConfig>();
        this.Category = jsonDecoded.category;
        this.Tags = jsonDecoded.tags;
        this.Priority = jsonDecoded.priority;
        this.DependsOn = jsonDecoded.depends_on;
        this.AllowParallel = jsonDecoded.allow_parallel;
        this.MaxLogEntries = jsonDecoded.max_log_entries;

        jsonDecoded.notifications?.forEach((notification : any) => {
            this.Notifications?.push(new NotificationConfig(notification))
        })
    }

    public static fromJson(json: string) : TaskRequest {
        return new TaskRequest(JSON.parse(json));
    }

    public toJson() : object {
        return {
            name: this.Name,
            command: this.Command,
            type: this.Type,
            interval_min: this.IntervalMin,
            cron_expr: this.CronExpr,
            timeout_sec: this.TimeoutSec,
            retry_count: this.RetryCount,
            retry_delay_sec: this.RetryDelaySec,
            env: this.Env,
            notifications: this.Notifications,
            category: this.Category,
            tags: this.Tags,
            priority: this.Priority,
            depends_on: this.DependsOn,
            allow_parallel: this.AllowParallel,
            max_log_entries: this.MaxLogEntries,
        }
    }
}