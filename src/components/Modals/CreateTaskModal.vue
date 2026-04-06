<script setup lang="ts">
import {ref} from "vue";
import {useClient} from "../../HttpClient";
import { TaskRequest } from "../../models";

const emits = defineEmits<{
    (e: 'task:created', task: TaskRequest) : void,
    (e: 'task:creation-failed') : void,
    (e: 'close') : void
}>();

const task = ref<TaskRequest>(new TaskRequest(null));
const httpClient = useClient();

const onSubmit = async () => {
    const response = await httpClient.postAsync("cron/tasks", task.value);
    if(!response.ok) {
        emits('task:creation-failed');
        // TODO: Element map for error messages
        return;
    }
    emits('task:created', task.value);
}
</script>

<template>
    <div id="modal-background"></div>
    <div id="create-task-modal">
        <h2>{{ $t('taskModal.createTitle') }}</h2>
        <hr />
        <form id="create-task-modal-form">
            <div id="create-task-modal-content">
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