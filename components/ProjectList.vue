<template>
  <section class="py-12 bg-white">
    <div class="container mx-auto px-4">
      <h2
        class="text-2xl md:text-4xl font-bold text-yellow-600 mb-8 text-center"
      >
        NHỮNG DỰ ÁN NỔI BẬT
      </h2>
      <div v-if="loading" class="text-center py-8 text-lg text-yellow-600">
        Đang tải...
      </div>
      <div v-else-if="error" class="text-center py-8 text-red-500">
        {{ error }}
      </div>
      <div v-else>
        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          <div
            v-for="project in projects"
            :key="project.id"
            class="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 flex flex-col"
            @click="goToProject(project.id, project.name)"
            style="cursor: pointer"
          >
            <img
              :src="getImageUrl(project.main_image)"
              :alt="project.name"
              class="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
            />
            <div class="p-4 flex-1 flex flex-col">
              <h3 class="text-lg font-bold text-gray-800 mb-2">
                {{ project.name }}
              </h3>
              <p class="text-gray-500 mb-4 flex-1">{{ project.short_intro }}</p>
              <a
                href="#"
                class="inline-block mt-auto px-4 py-2 bg-yellow-500 text-white rounded font-semibold hover:bg-yellow-600 transition-colors duration-200 text-center"
                >TÌM HIỂU NGAY</a
              >
            </div>
          </div>
        </div>
        <div v-if="totalPages > 1" class="flex justify-center mt-8 space-x-2">
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
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from "vue-router";
import { onMounted, ref, watch } from "vue";
import { useProjectStore } from "~/store/useProjectStore";
import { useRuntimeConfig } from "#app";

const router = useRouter();
const projectStore = useProjectStore();
const { fetchProjects } = projectStore;

const config = useRuntimeConfig();
const apiBase = config.public.apiBase;

const projects = ref([]);
const currentPage = ref(1);
const pageSize = 8;
const totalPages = ref(1);
const loading = ref(false);
const error = ref(null);

async function loadProjects(page = 1) {
  loading.value = true;
  error.value = null;
  try {
    const data = await fetchProjects(page, pageSize, true);
    if (data && Array.isArray(data.data)) {
      projects.value = data.data;
      totalPages.value = data.totalPages || Math.ceil(data.total / pageSize);
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

function slugify(text) {
  const from =
    "àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ";
  const to =
    "aaaaaaaaaaaaaaaaaeeeeeeeeeeeiiiiiooooooooooooooooouuuuuuuuuuuyyyyydAAAAAAAAAAAAAAAAAEEEEEEEEEEEIIIIIOOOOOOOOOOOOOOOOOUUUUUUUUUUUYYYYYD";
  let slug = text;
  for (let i = 0; i < from.length; i++) {
    slug = slug.replace(new RegExp(from[i], "g"), to[i]);
  }
  return slug
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function goToProject(id, name) {
  const slug = slugify(name || "");
  router.push({ path: `/projects/${id}-${slug}` });
}

function getImageUrl(image) {
  if (!image) return "";
  if (image.startsWith("http")) return image;
  return `${apiBase}/uploads/${image}`;
}
</script>
