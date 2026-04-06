import type {IJsonTransformable} from "./IJsonTransformable.ts";

export class NotificationConfig implements IJsonTransformable {
    public Enabled : boolean;
    public Type : string;
    public Target : string;
    public OnSuccess : boolean;
    public OnFailure : boolean;

    public SMTPHost : string | undefined;
    public SMTPPort : number | undefined;
    public SMTPUsername : string | undefined;
    public SMTPPassword : string | undefined;
    public SMTPFrom : string | undefined;

    public TelegramBotToken : string | undefined;

    constructor(jsonDecoded : any) {
        this.Enabled = jsonDecoded.enabled;
        this.Type = jsonDecoded.type;
        this.Target = jsonDecoded.target;
        this.OnSuccess = jsonDecoded.on_success;
        this.OnFailure = jsonDecoded.on_failure;

        if (this.Type == "smtp") {
            this.SMTPHost = jsonDecoded.smtp_host;
            this.SMTPPort = jsonDecoded.smtp_port;
            this.SMTPUsername = jsonDecoded.smtp_username;
            this.SMTPPassword = jsonDecoded.smtp_password;
            this.SMTPFrom = jsonDecoded.smtp_from;
        } else if (this.Type == "telegram") {
            this.TelegramBotToken = jsonDecoded.telegram_bot_token;
        }
    }

    public static fromJson(json: string) : NotificationConfig {
        return new NotificationConfig(JSON.parse(json));
    }

    public toJson() : object {
        return {
            enabled: this.Enabled,
            type: this.Type,
            target: this.Target,
            on_success: this.OnSuccess,
            on_failure: this.OnFailure,
            smtp_host: this.SMTPHost,
            smtp_port: this.SMTPPort,
            smtp_username: this.SMTPUsername,
            smtp_password: this.SMTPPassword,
            smtp_from: this.SMTPFrom,
            telegram_bot_token: this.TelegramBotToken,
        }
    }
}