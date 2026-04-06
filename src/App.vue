<script setup lang="ts">
import NavBar from "./components/NavBar.vue";
import MainContent from "./components/MainContent.vue";
import {useHead} from "@unhead/vue";
import {documentTitle, htmlLanguage} from "./i18n.ts";

useHead({
  htmlAttrs: {
    lang: htmlLanguage
  },
  title: documentTitle
})
</script>

<template>
    <NavBar />
    <MainContent />
</template>
