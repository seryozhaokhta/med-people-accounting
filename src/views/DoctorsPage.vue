<template>
  <div class="p-4">
    <DoctorsTable />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DoctorsTable from "../components/Doctors/DoctorsTable.vue";

export default defineComponent({
  name: "DoctorsPage",
  components: {
    DoctorsTable,
  },
});
</script>

<style scoped></style>
