<template>
  <div>
    <h3 class="text-xl font-semibold mb-4">
      {{ isEditing ? "Редактировать Врача" : "Добавить Врача" }}
    </h3>
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label class="block mb-1 font-medium">ФИО:</label>
        <input
          v-model="form.fullName"
          type="text"
          class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
      </div>
      <div>
        <label class="block mb-1 font-medium">Отделение:</label>
        <select
          v-model="form.department"
          class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          required
        >
          <option value="">Выберите отделение</option>
          <option value="Кардиологическое">Кардиологическое</option>
          <option value="Хирургическое">Хирургическое</option>
        </select>
      </div>
      <div class="mb-4 flex items-center">
        <input
          v-model="form.isHead"
          type="checkbox"
          id="isHead"
          class="mr-2 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
        />
        <label for="isHead" class="font-medium">Заведующий отделения</label>
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
          class="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors"
        >
          Сохранить
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { Doctor } from "../../stores/doctors";

export default defineComponent({
  name: "DoctorForm",
  props: {
    doctor: {
      type: Object as () => Doctor | undefined,
      default: undefined,
    },
  },
  emits: ["save", "cancel"],
  setup(props, { emit }) {
    const form = reactive({
      id: props.doctor?.id || 0,
      fullName: props.doctor?.fullName || "",
      department: props.doctor?.department || "",
      isHead: props.doctor?.isHead || false,
    });

    const isEditing = props.doctor !== undefined;

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
