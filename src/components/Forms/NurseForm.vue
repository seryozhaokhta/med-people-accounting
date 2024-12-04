<template>
  <div>
    <h3 class="text-xl font-semibold mb-4">
      {{ isEditing ? "Редактировать Медсестру" : "Добавить Медсестру" }}
    </h3>
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label class="block mb-1 font-medium">ФИО:</label>
        <input
          v-model="form.fullName"
          type="text"
          class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label class="block mb-1 font-medium">Отделение:</label>
        <select
          v-model="form.department"
          class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Выберите отделение</option>
          <option value="Кардиологическое">Кардиологическое</option>
          <option value="Хирургическое">Хирургическое</option>
        </select>
      </div>
      <div class="flex justify-end space-x-2">
        <button
          type="button"
          @click="$emit('cancel')"
          class="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
        >
          Отмена
        </button>
        <button
          type="submit"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Сохранить
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { Nurse } from "../../stores/nurses";

export default defineComponent({
  name: "NurseForm",
  props: {
    nurse: {
      type: Object as () => Nurse | undefined,
      default: undefined,
    },
  },
  emits: ["save", "cancel"],
  setup(props, { emit }) {
    const form = reactive({
      id: props.nurse?.id || 0,
      fullName: props.nurse?.fullName || "",
      department: props.nurse?.department || "",
    });

    const isEditing = props.nurse !== undefined;

    const handleSubmit = () => {
      emit("save", { ...form });
    };

    return {
      form,
      isEditing,
      handleSubmit,
    };
  },
});
</script>

<style scoped></style>
