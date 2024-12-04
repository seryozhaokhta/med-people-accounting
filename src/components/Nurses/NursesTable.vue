<template>
  <div>
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-2xl font-semibold">Медсестры</h2>
      <button
        @click="addNurse"
        class="flex items-center bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
      >
        <PlusIcon class="h-5 w-5 mr-2" />
        Добавить Медсестру
      </button>
    </div>
    <div class="hidden sm:block overflow-x-auto">
      <table class="min-w-full table-auto bg-white">
        <thead class="bg-gray-200">
          <tr>
            <th class="py-2 px-4 border-b">ФИО</th>
            <th class="py-2 px-4 border-b hidden md:table-cell">Отделение</th>
            <th class="py-2 px-4 border-b">Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="nurse in nurses"
            :key="nurse.id"
            class="text-center hover:bg-gray-100 transition-colors"
          >
            <td class="py-2 px-4 border-b">{{ nurse.fullName }}</td>
            <td class="py-2 px-4 border-b hidden md:table-cell">
              {{ nurse.department }}
            </td>
            <td class="py-2 px-4 border-b space-x-2">
              <button
                @click="editNurse(nurse)"
                class="flex items-center text-blue-500 hover:text-blue-700 transition-colors"
              >
                <PencilIcon class="h-5 w-5 mr-1" />
                Редактировать
              </button>
              <button
                @click="deleteNurse(nurse.id)"
                class="flex items-center text-red-500 hover:text-red-700 transition-colors"
              >
                <TrashIcon class="h-5 w-5 mr-1" />
                Удалить
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="block sm:hidden space-y-4">
      <div
        v-for="nurse in nurses"
        :key="nurse.id"
        class="bg-white p-4 rounded shadow hover:shadow-lg transition-shadow"
      >
        <div class="flex justify-between items-center mb-2">
          <h3 class="text-lg font-semibold">{{ nurse.fullName }}</h3>
          <div class="space-x-2">
            <button
              @click="editNurse(nurse)"
              class="flex items-center text-blue-500 hover:text-blue-700 transition-colors"
            >
              <PencilIcon class="h-5 w-5 mr-1" />
              Редактировать
            </button>
            <button
              @click="deleteNurse(nurse.id)"
              class="flex items-center text-red-500 hover:text-red-700 transition-colors"
            >
              <TrashIcon class="h-5 w-5 mr-1" />
              Удалить
            </button>
          </div>
        </div>
        <p class="text-sm">
          <strong>Отделение:</strong> {{ nurse.department }}
        </p>
      </div>
    </div>
    <BaseModal v-if="showModal">
      <NurseForm
        :nurse="currentNurse"
        @save="handleSaveNurse"
        @cancel="closeModal"
      />
    </BaseModal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useNursesStore, Nurse } from "../../stores/nurses";
import BaseModal from "../Common/BaseModal.vue";
import NurseForm from "../Forms/NurseForm.vue";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/vue/24/solid";

export default defineComponent({
  name: "NursesTable",
  components: {
    BaseModal,
    NurseForm,
    PlusIcon,
    PencilIcon,
    TrashIcon,
  },
  setup() {
    const nursesStore = useNursesStore();

    const showModal = ref(false);
    const currentNurse = ref<Nurse | undefined>(undefined);

    const addNurse = () => {
      currentNurse.value = undefined;
      showModal.value = true;
    };

    const editNurse = (nurse: Nurse) => {
      currentNurse.value = { ...nurse };
      showModal.value = true;
    };

    const deleteNurse = (id: number) => {
      if (confirm("Вы уверены, что хотите удалить эту медсестру?")) {
        nursesStore.deleteNurse(id);
      }
    };

    const closeModal = () => {
      showModal.value = false;
    };

    const handleSaveNurse = (nurse: Nurse) => {
      if (nurse.id === 0) {
        const newId =
          nursesStore.nurses.length > 0
            ? Math.max(...nursesStore.nurses.map((n) => n.id)) + 1
            : 1;
        nursesStore.addNurse({ ...nurse, id: newId });
      } else {
        nursesStore.updateNurse(nurse);
      }
      showModal.value = false;
    };

    return {
      nurses: nursesStore.nurses,
      showModal,
      currentNurse,
      addNurse,
      editNurse,
      deleteNurse,
      closeModal,
      handleSaveNurse,
    };
  },
});
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  border: 1px solid #ddd;
}
th {
  background-color: #f2f2f2;
}
button:hover {
  cursor: pointer;
}
</style>
