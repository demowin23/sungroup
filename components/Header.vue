<template>
  <header
    class="flex items-center justify-between px-6 py-3 bg-white shadow-lg sticky top-0 z-50 transition-all duration-300"
  >
    <div class="flex items-center space-x-3">
      <img
        src="https://via.placeholder.com/48x48?text=Logo"
        alt="Logo"
        class="w-12 h-12 rounded-full shadow-md border-2 border-yellow-400 bg-white"
      />
      <span
        class="font-extrabold text-yellow-500 text-2xl tracking-wide drop-shadow"
        >SUN GROUP</span
      >
    </div>
    <nav class="hidden lg:flex flex-1 justify-center">
      <ul class="flex space-x-8 font-semibold text-lg">
        <li v-for="item in menu" :key="item.text">
          <NuxtLink
            :to="item.link"
            class="relative px-2 py-1 hover:text-yellow-500 transition-colors duration-200 after:absolute after:left-0 after:-bottom-1 after:w-full after:h-0.5 after:bg-yellow-400 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200 after:origin-left"
            >{{ item.text }}</NuxtLink
          >
        </li>
      </ul>
    </nav>
    <button
      class="lg:hidden p-2 rounded-full bg-yellow-100 hover:bg-yellow-200 shadow transition ml-auto"
      @click="open = !open"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-7 w-7 text-yellow-600"
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
    <transition name="fade">
      <div
        v-if="open"
        class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 lg:hidden"
      >
        <div
          class="bg-white rounded-2xl shadow-2xl p-8 w-11/12 max-w-xs relative flex flex-col items-center"
        >
          <button
            @click="open = false"
            class="absolute top-3 right-3 text-gray-500 hover:text-yellow-500 text-3xl font-bold"
          >
            &times;
          </button>
          <ul class="flex flex-col gap-6 mt-6">
            <li v-for="item in menu" :key="item.text">
              <NuxtLink
                :to="item.link"
                class="block text-gray-800 text-xl font-bold hover:text-yellow-500 transition-colors duration-200 text-center"
                @click="open = false"
                >{{ item.text }}</NuxtLink
              >
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, onMounted } from "vue";
const open = ref(false);
const menu = [
  { text: "TRANG CHỦ", link: "/" },
  { text: "GIỚI THIỆU", link: "/about" },
  { text: "DỰ ÁN", link: "/projects" },
  { text: "TIẾN ĐỘ", link: "/progress" },
  { text: "TIN TỨC", link: "/news" },
  { text: "LIÊN HỆ", link: "/contact" },
];

onMounted(() => {
  // Đóng popup khi resize lên PC
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1024) open.value = false;
  });
});
</script>

<style scoped>
@media (max-width: 1023px) {
  .hidden-mobile,
  .hidden-lg {
    display: none !important;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
