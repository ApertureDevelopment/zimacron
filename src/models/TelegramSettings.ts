import type {IJsonTransformable} from "./IJsonTransformable.ts";

export class TelegramSettings implements IJsonTransformable {
    public TelegramBotToken : string;
    public TelegramChatId : string;
    public TelegramOnSuccess : boolean;
    public TelegramOnError : boolean;
    public TelegramConfigured : boolean;

    constructor(jsonDecoded : any|null) {
        if (jsonDecoded == null) {
            this.TelegramBotToken = "";
            this.TelegramChatId = "";
            this.TelegramOnSuccess = false;
            this.TelegramOnError = false;
            this.TelegramConfigured = false;
            return;
        }
        this.TelegramBotToken = jsonDecoded.telegram_bot_token;
        this.TelegramChatId = jsonDecoded.telegram_chat_id;
        this.TelegramOnSuccess = jsonDecoded.telegram_on_success;
        this.TelegramOnError = jsonDecoded.telegram_on_failure;
        this.TelegramConfigured = jsonDecoded.telegram_configured;
    }

    public static fromJson(json: string) : TelegramSettings {
        return new TelegramSettings(JSON.parse(json));
    }

    public toJson() : object {
        return {
            telegram_bot_token:  this.TelegramBotToken,
            telegram_chat_id:    this.TelegramChatId,
            telegram_on_success: this.TelegramOnSuccess,
            telegram_on_failure: this.TelegramOnError,
        }
    }
}