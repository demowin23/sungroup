<template>
  <div>
    <Header />
    <section class="bg-yellow-100 py-0">
      <div class="w-full">
        <img
          :src="getImageUrl(project?.main_image)"
          alt="Banner"
          class="w-full object-cover project-detail-banner rounded-none shadow-none"
          style="
            display: block;
            margin: 0;
            border-radius: 0;
            box-shadow: none;
            width: 100vw;
            height: auto;
            max-width: 100vw;
          "
        />
      </div>
    </section>
    <section class="bg-yellow-400 text-center py-4 mt-4 rounded-lg shadow">
      <div class="max-w-7xl mx-auto px-4">
        <h1
          class="text-3xl md:text-4xl font-extrabold text-center text-gray-900 uppercase tracking-wide mb-4"
        >
          {{ project?.name }}
        </h1>
        <div class="border-b border-black/70 mb-2"></div>
        <div
          class="flex flex-col md:flex-row md:items-center md:justify-between text-base text-black gap-2 md:gap-0 pb-2 border-b border-black/70"
        >
          <div class="text-left w-full md:w-1/3">
            Ngày đăng: {{ project?.created_at }}
          </div>
          <div class="text-center w-full md:w-1/3">Số từ: 2500 từ</div>
          <div class="text-right w-full md:w-1/3">Khoảng: 10 phút đọc</div>
        </div>
      </div>
    </section>
    <section class="py-8 bg-white project-detail-section">
      <div class="container mx-auto px-4 max-w-7xl xl:flex xl:gap-8">
        <div class="prose max-w-none flex-1">
          <p>{{ project?.short_intro }}</p>
          <h2 class="text-xl font-bold mt-8 mb-2">
            Tổng Quan Dự ÁN {{ project?.name }}
          </h2>
          <div class="custom-quill-editor ql-snow" style="border: none">
            <div
              class="ql-editor html-output"
              style="padding: 0"
              data-gramm="false"
              contenteditable="true"
            >
              <div class="html-preview" v-html="project?.detail"></div>
            </div>
          </div>
        </div>
        <div class="mt-12 xl:mt-0 xl:w-96 xl:flex-shrink-0">
          <div
            class="bg-yellow-100 py-8 project-detail-section h-full flex flex-col"
          >
            <h2 class="text-xl font-bold text-yellow-700 mb-4 text-center">
              DỰ ÁN LIÊN QUAN
            </h2>
            <div
              class="project-detail-related flex-row xl:flex-col gap-4 xl:gap-4"
            >
              <div
                v-for="item in relatedProjects"
                :key="item.id"
                class="project-detail-related-card"
                @click="goToProject(item.id, item.name)"
              >
                <img
                  :src="getImageUrl(item.main_image)"
                  :alt="item.name"
                  class="w-full h-40 object-cover"
                />
                <div class="p-4">
                  <h3 class="font-bold text-gray-800 mb-1">{{ item.name }}</h3>
                  <p class="text-gray-500 text-sm">{{ item.short_intro }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="bg-yellow-50 py-8 project-detail-section">
      <div class="container mx-auto px-4 max-w-2xl">
        <h2 class="text-xl font-bold text-yellow-700 mb-4 text-center">
          ĐĂNG KÝ TƯ VẤN CHI TIẾT
        </h2>
        <form
          class="bg-white rounded-xl shadow-lg p-6 flex flex-col gap-4 project-detail-form"
        >
          <input
            type="text"
            placeholder="Họ và tên*"
            class="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-200"
          />
          <input
            type="tel"
            placeholder="Số điện thoại*"
            class="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-200"
          />
          <input
            type="email"
            placeholder="Email*"
            class="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-200"
          />
          <button
            type="submit"
            class="mt-2 px-6 py-3 bg-yellow-500 text-white font-bold rounded-lg shadow hover:bg-yellow-600 transition-colors duration-200"
          >
            ĐĂNG KÝ TƯ VẤN NGAY
          </button>
        </form>
      </div>
    </section>
    <Footer />
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import Header from "~/components/Header.vue";
import Footer from "~/components/Footer.vue";
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useProjectStore } from "~/store/useProjectStore";
import { useRuntimeConfig } from "#app";
const config = useRuntimeConfig();
const apiBase = config.public.apiBase;

const route = useRoute();
const router = useRouter();
const rawParam = route.params.id;
const id = Array.isArray(rawParam)
  ? rawParam[0]
  : (rawParam || "").split("-")[0];
const projectStore = useProjectStore();
const loading = ref(false);
const error = ref(null);

function getImageUrl(image) {
  if (!image) return "";
  if (image.startsWith("http")) return image;
  return `${apiBase}/uploads/${image}`;
}
const project = ref({});
let relatedProjects = ref([]);

const windowWidth = ref(process.client ? window.innerWidth : 1280);
function handleResize() {
  windowWidth.value = window.innerWidth;
}
onMounted(async () => {
  try {
    project.value = await projectStore.fetchProjectDetail(id);
    const data = await projectStore.fetchProjects(1, 5, true);
    relatedProjects.value = data.data;
  } catch (e) {
    error.value = e?.message || "Không tìm thấy dự án";
  } finally {
    loading.value = false;
  }
  window.addEventListener("resize", handleResize);
});
onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
</script>
