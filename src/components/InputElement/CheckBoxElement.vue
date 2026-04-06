<script setup lang="ts">

defineProps<{
    id: string
    label: string
    tooltip: string
    value: boolean
}>();

defineEmits<{
    (e: 'update:value', value: boolean) : void
}>();

</script>

<template>
    <div :id="id" class="checkbox-element">
        <label :id="id + '-input-label'" :for="id + '-input-field'" v-model="label"></label>
        <input :id="id + '-input-field'" type="checkbox" :value="id" :title="tooltip" @change="$emit('update:value', value)" :checked="value"/>
    </div>
</template>

<style scoped>

</style>