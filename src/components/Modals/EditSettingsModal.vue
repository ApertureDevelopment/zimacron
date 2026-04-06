<script setup lang="ts">
import {TelegramSettings} from "../../models";
import {useClient} from "../../HttpClient";
import {onMounted, ref} from "vue";
import InputElement from "../InputElement/InputElement.vue";
import {useI18n} from "vue-i18n";
import CheckBoxElement from "../InputElement/CheckBoxElement.vue";

const { t } = useI18n();
const httpClient = useClient();
const emits = defineEmits<{
    (e: 'settings:updated', settings: TelegramSettings) : void,
    (e: 'settings:update-failed') : void,
    (e: 'close') : void
}>();

const settings = ref<TelegramSettings>(new TelegramSettings(null));

const onSubmit = async () => {
    const response = await httpClient.postAsync(`cron/settings`, settings.value);
    if(!response.ok) {
        emits('settings:update-failed');
        // TODO: Element map for error messages
        return;
    }
    emits('settings:updated', settings.value);
}

onMounted(async () => {
    const response = await httpClient.getAsync('cron/settings');
    if(!response.ok) {
        return;
    }
    settings.value = TelegramSettings.fromJson(await response.text());
});

</script>

<template>
    <div id="modal-background"></div>
    <div id="settings-modal">
        <h2>{{ $t('settingsModal.title') }}</h2>
        <hr />
        <div id="settings-modal-description">
            {{ $t('settingsModal.description') }}
        </div>
        <form id="settings-modal-form">
            <div id="settings-modal-content">
                <!-- input elements -->
                <InputElement
                    id="settings-modal-telegram-bot-token"
                    :label="t('settingsModal.botToken.label')"
                    :placeholder="t('settingsModal.botToken.placeholder')"
                    :tooltip="t('settingsModal.botToken.tooltip')"
                    :value="settings.TelegramBotToken"
                    type="text"
                />
                <InputElement
                    id="settings-modal-telegram-chat-idn"
                    :label="t('settingsModal.chatId.label')"
                    :placeholder="t('settingsModal.chatId.placeholder')"
                    :tooltip="t('settingsModal.chatId.tooltip')"
                    :value="settings.TelegramChatId"
                    type="text"
                />
                <div id="settings-modal-tg-notification-selection">
                    <CheckBoxElement
                        id="settings-modal-on-success"
                        :label="t('settingsModal.onSuccessCheckbox.label')"
                        :tooltip="t('settingsModal.onSuccessCheckbox.tooltip')"
                        :value="settings.TelegramOnSuccess" />
                    <CheckBoxElement
                        id="settings-modal-on-failure"
                        :label="t('settingsModal.onFailureCheckbox.label')"
                        :tooltip="t('settingsModal.onFailureCheckbox.tooltip')"
                        :value="settings.TelegramOnError" />
                </div>
                <div id="settings-modal-buttons">
                    <button type="button" @click.prevent="onSubmit">{{ $t('settingsModal.testButton') }}</button>
                    <button type="submit" @click.prevent="onSubmit">{{ $t('settingsModal.saveButton') }}</button>
                    <button type="button" @click="emits('close')">{{ $t('settingsModal.cancelButton') }}</button>
                </div>
            </div>
        </form>
    </div>
</template>

<style scoped>

</style>