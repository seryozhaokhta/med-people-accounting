<template>
  <div>
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-2xl font-semibold">Врачи</h2>
      <button
        @click="addDoctor"
        class="flex items-center bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
      >
        <PlusIcon class="h-5 w-5 mr-2" />
        Добавить Врача
      </button>
    </div>
    <div class="hidden sm:block overflow-x-auto">
      <table class="min-w-full table-auto bg-white">
        <thead class="bg-gray-200">
          <tr>
            <th class="py-2 px-4 border-b">ФИО</th>
            <th class="py-2 px-4 border-b hidden md:table-cell">Отделение</th>
            <th class="py-2 px-4 border-b hidden lg:table-cell">Заведующий</th>
            <th class="py-2 px-4 border-b">Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="doctor in doctors"
            :key="doctor.id"
            class="text-center hover:bg-gray-100 transition-colors"
          >
            <td class="py-2 px-4 border-b">{{ doctor.fullName }}</td>
            <td class="py-2 px-4 border-b hidden md:table-cell">
              {{ doctor.department }}
            </td>
            <td class="py-2 px-4 border-b hidden lg:table-cell">
              {{ doctor.isHead ? "Да" : "Нет" }}
            </td>
            <td class="py-2 px-4 border-b space-x-2">
              <button
                @click="editDoctor(doctor)"
                class="flex items-center text-blue-500 hover:text-blue-700 transition-colors"
              >
                <PencilIcon class="h-5 w-5 mr-1" />
                Редактировать
              </button>
              <button
                @click="deleteDoctor(doctor.id)"
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
        v-for="doctor in doctors"
        :key="doctor.id"
        class="bg-white p-4 rounded shadow hover:shadow-lg transition-shadow"
      >
        <div class="flex justify-between items-center mb-2">
          <h3 class="text-lg font-semibold">{{ doctor.fullName }}</h3>
          <div class="space-x-2">
            <button
              @click="editDoctor(doctor)"
              class="flex items-center text-blue-500 hover:text-blue-700 transition-colors"
            >
              <PencilIcon class="h-5 w-5 mr-1" />
              Редактировать
            </button>
            <button
              @click="deleteDoctor(doctor.id)"
              class="flex items-center text-red-500 hover:text-red-700 transition-colors"
            >
              <TrashIcon class="h-5 w-5 mr-1" />
              Удалить
            </button>
          </div>
        </div>
        <p class="text-sm">
          <strong>Отделение:</strong> {{ doctor.department }}
        </p>
        <p class="text-sm">
          <strong>Заведующий:</strong> {{ doctor.isHead ? "Да" : "Нет" }}
        </p>
      </div>
    </div>

    <BaseModal v-if="showModal">
      <DoctorForm
        :doctor="currentDoctor"
        @save="handleSaveDoctor"
        @cancel="closeModal"
      />
    </BaseModal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useDoctorsStore, Doctor } from "../../stores/doctors";
import BaseModal from "../Common/BaseModal.vue";
import DoctorForm from "../Forms/DoctorForm.vue";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/vue/24/solid";

export default defineComponent({
  name: "DoctorsTable",
  components: {
    BaseModal,
    DoctorForm,
    PlusIcon,
    PencilIcon,
    TrashIcon,
  },
  setup() {
    const doctorsStore = useDoctorsStore();

    const showModal = ref(false);
    const currentDoctor = ref<Doctor | undefined>(undefined);

    const addDoctor = () => {
      currentDoctor.value = undefined;
      showModal.value = true;
    };

    const editDoctor = (doctor: Doctor) => {
      currentDoctor.value = { ...doctor };
      showModal.value = true;
    };

    const deleteDoctor = (id: number) => {
      if (confirm("Вы уверены, что хотите удалить этого врача?")) {
        doctorsStore.deleteDoctor(id);
      }
    };

    const closeModal = () => {
      showModal.value = false;
    };

    const handleSaveDoctor = (doctor: Doctor) => {
      if (doctor.id === 0) {
        const newId =
          doctorsStore.doctors.length > 0
            ? Math.max(...doctorsStore.doctors.map((d) => d.id)) + 1
            : 1;
        doctorsStore.addDoctor({ ...doctor, id: newId });
      } else {
        doctorsStore.updateDoctor(doctor);
      }
      showModal.value = false;
    };

    return {
      doctors: doctorsStore.doctors,
      showModal,
      currentDoctor,
      addDoctor,
      editDoctor,
      deleteDoctor,
      closeModal,
      handleSaveDoctor,
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
