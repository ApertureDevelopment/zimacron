import type {Result} from "./Result.ts";
import {NotificationConfig} from "./NotificationConfig.ts";
import type {IJsonTransformable} from "./IJsonTransformable.ts";

export class Task implements IJsonTransformable {
    public ID : string;
    public Name : string;
    public Command : string;
    public Type : string;
    public Interval : number;
    public CronExpr : string;
    public Status : string;
    public LastRunAt : BigInt;
    public NextRunAt : BigInt;
    public LastResult : Result;
    public TimeoutSec : number;
    public RetryCount : number;
    public RetryDelaySec : number;
    public CurrentRetry : number;
    public Env: Map<string, string> | undefined;
    public Notifications : NotificationConfig[] | undefined;
    public Category : string | undefined;
    public Tags : string[] | undefined;
    public Priority : number | undefined;
    public DependsOn : string[] | undefined;
    public AllowParallel : boolean | undefined;
    public MaxLogEntries : number | undefined;
    public Executing : boolean;

    constructor(jsonDecoded : any) {
        this.ID = jsonDecoded.id;
        this.Name = jsonDecoded.name;
        this.Command = jsonDecoded.command;
        this.Type = jsonDecoded.type;
        this.Interval = jsonDecoded.interval;
        this.CronExpr = jsonDecoded.cron_expr;
        this.Status = jsonDecoded.status;
        this.LastRunAt = BigInt(jsonDecoded.last_run_at);
        this.NextRunAt = BigInt(jsonDecoded.next_run_at);
        this.LastResult = jsonDecoded.last_result;
        this.TimeoutSec = jsonDecoded.timeout_sec;
        this.RetryCount = jsonDecoded.retry_count;
        this.RetryDelaySec = jsonDecoded.retry_delay_sec;
        this.CurrentRetry = jsonDecoded.current_retry;
        this.Env = jsonDecoded.env;
        this.Notifications = jsonDecoded.notifications === undefined ? undefined : new Array<NotificationConfig>();
        this.Category = jsonDecoded.category;
        this.Tags = jsonDecoded.tags;
        this.Priority = jsonDecoded.priority;
        this.DependsOn = jsonDecoded.depends_on;
        this.AllowParallel = jsonDecoded.allow_parallel;
        this.MaxLogEntries = jsonDecoded.max_log_entries;
        this.Executing = jsonDecoded.executing;

        jsonDecoded.notifications?.forEach((notification : any) => {
            this.Notifications?.push(new NotificationConfig(notification));
        })
    }

    public static fromJson(json: string) : Task {
        return new Task(JSON.parse(json));
    }

    public toJson() : object {
        return {
            id: this.ID,
            name: this.Name,
            command: this.Command,
            type: this.Type,
            interval: this.Interval,
            cron_expr: this.CronExpr,
            status: this.Status,
            last_run_at: this.LastRunAt,
            next_run_at: this.NextRunAt,
            last_result: this.LastResult,
            timeout_sec: this.TimeoutSec,
            retry_count: this.RetryCount,
            retry_delay_sec: this.RetryDelaySec,
            current_retry: this.CurrentRetry,
            env: this.Env,
            notifications: this.Notifications,
            category: this.Category,
            tags: this.Tags,
            priority: this.Priority,
            depends_on: this.DependsOn,
            allow_parallel: this.AllowParallel,
            max_log_entries: this.MaxLogEntries,
            executing: this.Executing,
        }
    }
}