<template>
  <div class="min-h-screen bg-gray-50">
    <HeaderBar />
    <main class="container mx-auto p-4">
      <router-view />
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HeaderBar from "./components/Header/HeaderBar.vue";

export default defineComponent({
  name: "App",
  components: {
    HeaderBar,
  },
});
</script>

<style></style>
