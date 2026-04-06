<script setup lang="ts">

import CreateTaskModal from "./Modals/CreateTaskModal.vue";
import EditTaskModal from "./Modals/EditTaskModal.vue";
import {ref} from "vue";
import {Task} from "../models";
import TaskList from "./TaskList.vue";

const selectedTask = ref<Task|null>(null);
const editModalOpen = ref(false);
const createModalOpen = ref(false);
</script>

<template>
    <CreateTaskModal v-if="createModalOpen" />
    <EditTaskModal v-if="selectedTask && editModalOpen" :id="selectedTask.ID" :task="selectedTask" />
    <div class="content-container">
        <div id="content-header">
            <h2>{{ $t('taskView.title') }}</h2>
            <div>
                <div>
                    <!--search options-->
                </div>
                <div>
                    <!--task actions-->
                </div>
            </div>
        </div>
        <div id="content-body">
            <TaskList />
        </div>
    </div>
</template>

<style scoped>

</style>