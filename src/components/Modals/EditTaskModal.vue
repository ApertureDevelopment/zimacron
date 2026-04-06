<script setup lang="ts">
import type {Task} from "../../models";
import {useClient} from "../../HttpClient";

const httpClient = useClient();
const emits = defineEmits<{
    (e: 'task:updated', task: Task) : void,
    (e: 'task:update-failed') : void,
    (e: 'close') : void
}>();

const props = defineProps<{
    id: string,
    task: Task
}>()

const onSubmit = async () => {
    const response = await httpClient.putAsync(`cron/tasks/${props.id}`, props.task);
    if(!response.ok) {
        emits('task:update-failed');
        // TODO: Element map for error messages
        return;
    }
    emits('task:updated', props.task);
}

</script>

<template>
    <div id="modal-background"></div>
    <div id="edit-task-modal">
        <h2>{{ $t('taskModal.editTitle') }}</h2>
        <hr />
        <form id="edit-task-modal-form">
            <input type="hidden" id="edit-task-modal-id" :value="id" />
            <div id="edit-task-modal-content">
                <!-- input elements -->
                <div id="create-task-modal-buttons">
                    <button type="submit" @click.prevent="onSubmit">{{ $t('taskModal.saveButton') }}</button>
                    <button type="button" @click="emits('close')">{{ $t('taskModal.cancelButton') }}</button>
                </div>
            </div>
        </form>
    </div>
</template>

<style scoped>

</style>