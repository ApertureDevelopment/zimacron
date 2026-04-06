<script setup lang="ts">
import {ref} from "vue";
import EditSettingsModal from "./Modals/EditSettingsModal.vue";

const isMobile = ref(document.body.clientWidth < 768)
window.addEventListener("resize", () => isMobile.value = document.body.clientWidth < 768)
</script>

<template>
    <EditSettingsModal />
    <div id="nav-bar">
        <div id="nav-bar-branding">
            {{ $t('nav.title') }}
        </div>
        <div v-if="isMobile" id="nav-side-bar-toggle">
            <i class="fa-solid fa-bars"></i>
        </div>
        <div id="nav-bar-options">
            test
        </div>
    </div>
</template>

<style scoped>

</style>