<template>
  <div class="p-4">
    <NursesTable />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NursesTable from "../components/Nurses/NursesTable.vue";

export default defineComponent({
  name: "NursesPage",
  components: {
    NursesTable,
  },
});
</script>

<style scoped></style>
