<template>
  <div>
    <Header />
    <section class="py-12 bg-white">
      <div class="container mx-auto px-4">
        <h1
          class="text-3xl md:text-5xl font-bold text-yellow-600 mb-8 text-center"
        >
          DỰ ÁN
        </h1>
        <div v-if="loading" class="text-center py-8 text-lg text-yellow-600">
          Đang tải...
        </div>
        <div v-else-if="error" class="text-center py-8 text-red-500">
          {{ error }}
        </div>
        <div v-else>
          <div class="projects-grid">
            <div
              v-for="project in paginatedProjects"
              :key="project.id"
              class="project-card"
            >
              <img :src="getImageUrl(project.main_image)" :alt="project.name" />
              <div class="project-content">
                <h3 class="project-title">
                  {{ project.name }}
                </h3>
                <p class="project-desc">{{ project.short_intro }}</p>
              </div>
            </div>
          </div>
          <!-- Pagination -->
          <div
            v-if="totalPages > 1"
            class="flex flex-wrap justify-between items-center mt-4 gap-2"
          >
            <div class="flex space-x-2">
              <button
                class="px-3 py-1 rounded border border-yellow-400 text-yellow-600 bg-white hover:bg-yellow-100 font-semibold"
                :disabled="currentPage === 1"
                @click="goToPage(currentPage - 1)"
              >
                Trước
              </button>
              <button
                v-for="page in totalPages"
                :key="page"
                class="px-3 py-1 rounded border border-yellow-400 font-semibold"
                :class="
                  page === currentPage
                    ? 'bg-yellow-400 text-white'
                    : 'bg-white text-yellow-600 hover:bg-yellow-100'
                "
                @click="goToPage(page)"
              >
                {{ page }}
              </button>
              <button
                class="px-3 py-1 rounded border border-yellow-400 text-yellow-600 bg-white hover:bg-yellow-100 font-semibold"
                :disabled="currentPage === totalPages"
                @click="goToPage(currentPage + 1)"
              >
                Sau
              </button>
            </div>
            <div class="flex items-center">
              <label for="pageSize" class="mr-2 font-medium"
                >Số dự án/trang:</label
              >
              <select
                id="pageSize"
                v-model="pageSize"
                @change="onPageSizeChange"
                class="border rounded px-2 py-1"
              >
                <option :value="8">8</option>
                <option :value="16">16</option>
                <option :value="32">32</option>
                <option :value="50">50</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import Header from "~/components/Header.vue";
import Footer from "~/components/Footer.vue";
import { useProjectStore } from "~/store/useProjectStore";
import { useRuntimeConfig } from "#app";

const projectStore = useProjectStore();
const projects = ref([]);
const currentPage = ref(1);
const pageSize = ref(16);
const totalPages = ref(1);
const loading = ref(false);
const error = ref(null);
const config = useRuntimeConfig();
const apiBase = config.public.apiBase;

async function loadProjects(page = 1) {
  loading.value = true;
  error.value = null;
  try {
    const data = await projectStore.fetchProjects(page, pageSize.value);
    if (data && Array.isArray(data.data)) {
      projects.value = data.data;
      totalPages.value =
        data.totalPages || Math.ceil(data.total / pageSize.value);
    } else if (Array.isArray(data)) {
      projects.value = data;
      totalPages.value = 1;
    }
  } catch (e) {
    error.value = e?.message || "Lỗi khi tải danh sách dự án";
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  loadProjects(currentPage.value);
});

watch(currentPage, (page) => {
  loadProjects(page);
});

function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
}

function getImageUrl(image) {
  if (!image) return "";
  if (image.startsWith("http")) return image;
  return `${apiBase}/uploads/${image}`;
}

const paginatedProjects = computed(() => projects.value);

function onPageSizeChange() {
  currentPage.value = 1;
  loadProjects(1);
}
</script>
