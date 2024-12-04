<template>
  <header
    class="bg-primary text-white p-4 flex justify-between items-center relative"
  >
    <div class="flex items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-8 w-8 mr-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 8c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm0 8c-2.21 0-4-1.79-4-4v-2c0-2.21 1.79-4 4-4s4 1.79 4 4v2c0 2.21-1.79 4-4 4z"
        />
      </svg>
      <h1 class="text-xl font-semibold">Учет работников</h1>
    </div>
    <nav class="hidden md:flex space-x-4">
      <router-link
        to="/doctors"
        class="hover:bg-primary-dark px-3 py-2 rounded transition-colors flex items-center"
      >
        Врачи
      </router-link>
      <router-link
        to="/nurses"
        class="hover:bg-primary-dark px-3 py-2 rounded transition-colors flex items-center"
      >
        Медсестры
      </router-link>
    </nav>
    <div class="md:hidden">
      <button @click="toggleMenu" class="focus:outline-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </div>
    <div
      v-if="isMenuOpen"
      class="absolute top-16 right-4 bg-primary rounded-md shadow-lg md:hidden"
    >
      <router-link
        to="/doctors"
        class="block px-4 py-2 hover:bg-primary-dark transition-colors flex items-center"
        @click="toggleMenu"
      >
        Врачи
      </router-link>
      <router-link
        to="/nurses"
        class="block px-4 py-2 hover:bg-primary-dark transition-colors flex items-center"
        @click="toggleMenu"
      >
        Медсестры
      </router-link>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "HeaderBar",
  setup() {
    const isMenuOpen = ref(false);

    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value;
    };

    return {
      isMenuOpen,
      toggleMenu,
    };
  },
});
</script>

<style scoped>
nav a {
  color: inherit;
}
</style>
