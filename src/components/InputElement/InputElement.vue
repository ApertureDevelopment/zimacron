<script setup lang="ts">

defineProps<{
    id: string
    label?: string
    placeholder: string
    tooltip: string
    value: string
    error?: string
    type: string
}>();

defineEmits<{
    (e: 'update:value', value: string) : void
}>();

</script>

<template>
    <div :id="id" class="input-element">
        <label :id="id + '-input-label'" :for="id + '-input-field'" v-model="label"></label>
        <input :id="id + '-input-field'" :type="type" :placeholder="placeholder" :value="value" :title="tooltip" @change="$emit('update:value', value)" />
        <div :id="id + '-input-error'" v-if="error" class="input-error-message">
            <hr />
            <div v-model="error"></div>
        </div>
    </div>
</template>

<style scoped>

</style>