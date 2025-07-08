<template>
  <div class="max-w-7xl mx-auto py-10">
    <h1 class="text-2xl font-bold mb-6 text-center">
      Quản lý bài viết (Admin)
    </h1>
    <div class="flex justify-end mb-4">
      <button
        class="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700 transition"
        @click="goToCreate"
      >
        Thêm bài viết
      </button>
    </div>
    <div v-if="loading" class="text-center">Đang tải...</div>
    <div v-if="error" class="text-red-500 text-center mb-4">{{ error }}</div>
    <table v-if="projects.length" class="w-full border">
      <thead>
        <tr class="bg-gray-100">
          <th class="p-2 border">ID</th>
          <th class="p-2 border">Tên bài viết</th>
          <th class="p-2 border">Ảnh chính</th>
          <th class="p-2 border">Giới thiệu nhanh</th>
          <th class="p-2 border">Nổi bật</th>
          <th class="p-2 border">Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="project in projects" :key="project.id">
          <td class="p-2 border">{{ project.id }}</td>
          <td class="p-2 border">{{ project.name }}</td>
          <td class="p-2 border">
            <img
              v-if="project.main_image"
              :src="getImageUrl(project.main_image)"
              alt="main image"
              class="w-16 h-16 object-cover rounded cursor-pointer"
              @mouseenter="
                showImagePopup(getImageUrl(project.main_image), $event)
              "
              @mousemove="
                showImagePopup(getImageUrl(project.main_image), $event)
              "
              @mouseleave="hideImagePopup"
            />
            <span v-else>-</span>
          </td>
          <td class="p-2 border">{{ project.short_intro }}</td>
          <td class="p-2 border text-center">
            <input
              type="checkbox"
              :checked="project.is_featured"
              @change.prevent="toggleFeatured(project)"
              class="w-5 h-5 accent-yellow-400 cursor-pointer"
            />
          </td>
          <td class="p-2 border">
            <button
              class="bg-yellow-400 text-white px-3 py-1 rounded mr-2"
              @click="editProject(project)"
            >
              Sửa
            </button>
            <button
              class="bg-red-500 text-white px-3 py-1 rounded"
              @click="deleteProjectConfirm(project.id)"
            >
              Xóa
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else class="text-center">Không có bài viết nào.</div>

    <!-- Form sửa bài viết -->
    <div
      v-if="editingProject"
      class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
    >
      <div class="bg-white p-6 rounded shadow w-full max-w-2xl relative">
        <button
          class="absolute top-2 right-2 text-gray-500"
          @click="cancelEdit"
        >
          &times;
        </button>
        <h2 class="text-xl font-bold mb-4">Sửa bài viết</h2>
        <ProjectForm
          :initialData="editForm"
          :submitText="'Lưu'"
          :loading="loading"
          :errorMessage="error"
          @submit="submitEdit"
          @cancel="cancelEdit"
        />
      </div>
    </div>

    <div
      v-if="hoveredImage"
      :style="{
        position: 'fixed',
        left: mousePosition.x + 20 + 'px',
        top: mousePosition.y + 20 + 'px',
        zIndex: 1000,
      }"
      @mouseenter="hideImagePopup"
    >
      <img
        :src="hoveredImage"
        alt="popup"
        style="
          width: 400px;
          max-width: 90vw;
          box-shadow: 0 2px 16px rgba(0, 0, 0, 0.3);
          border-radius: 8px;
          background: white;
        "
      />
    </div>

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
        <label for="pageSize" class="mr-2 font-medium">Số bài/trang:</label>
        <select
          id="pageSize"
          v-model="pageSize"
          @change="onPageSizeChange"
          class="border rounded px-2 py-1"
        >
          <option :value="5">5</option>
          <option :value="10">10</option>
          <option :value="20">20</option>
          <option :value="50">50</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useProjectStore } from "~/store/useProjectStore";
import { useRuntimeConfig } from "#app";
import { useRouter } from "vue-router";
import ProjectForm from "~/components/ProjectForm.vue";

const projectStore = useProjectStore();
const { loading, error, fetchProjects, updateProject, deleteProject } =
  projectStore;

const editingProject = ref(null);
const editForm = ref({
  id: null,
  name: "",
  detail: "",
  main_image: null,
  main_image_preview: "",
});
const currentPage = ref(1);
const pageSize = ref(10);
const totalPages = ref(1);
const projects = ref([]);
const config = useRuntimeConfig();
const apiBase = config.public.apiBase;

const hoveredImage = ref(null);
const mousePosition = ref({ x: 0, y: 0 });
const router = useRouter();

async function loadProjects(page = 1) {
  try {
    const data = await fetchProjects(page, pageSize.value);
    if (data && Array.isArray(data.data)) {
      projects.value = data.data;
      totalPages.value =
        data.totalPages || Math.ceil(data.total / pageSize.value);
    } else if (Array.isArray(data)) {
      projects.value = data;
      totalPages.value = 1;
    }
  } catch (e) {}
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

function editProject(project) {
  editingProject.value = project.id;
  editForm.value = {
    id: project.id,
    name: project.name,
    detail: project.detail || "",
    main_image: null,
    main_image_preview: project.main_image || "",
    is_featured: project.is_featured,
  };
}

function cancelEdit() {
  editingProject.value = null;
  editForm.value = {
    id: null,
    name: "",
    detail: "",
    main_image: null,
    main_image_preview: "",
    is_featured: false,
  };
}

function onFileChange(e) {
  const file = e.target.files[0];
  if (file) {
    editForm.value.main_image = file;
    editForm.value.main_image_preview = URL.createObjectURL(file);
  }
}

async function submitEdit(formData) {
  try {
    const changedFields = {};
    if (formData.name !== editForm.value.name)
      changedFields.name = formData.name;
    if (formData.detail !== editForm.value.detail)
      changedFields.detail = formData.detail;
    if (formData.short_intro !== editForm.value.short_intro)
      changedFields.short_intro = formData.short_intro;
    if (formData.main_image) changedFields.main_image = formData.main_image;
    if (formData.is_featured !== editForm.value.is_featured)
      changedFields.is_featured = formData.is_featured;
    if (Object.keys(changedFields).length === 0) {
      cancelEdit();
      return;
    }
    await updateProject(editForm.value.id, changedFields);
    setTimeout(() => {
      projects.value = fetchProjects();
    }, 1000);
    cancelEdit();
  } catch (e) {}
}

async function deleteProjectConfirm(id) {
  if (confirm("Bạn có chắc muốn xóa bài viết này?")) {
    await deleteProject(id);

    setTimeout(() => {
      projects.value = fetchProjects();
    }, 1000);
  }
}

function showImagePopup(image, event) {
  hoveredImage.value = image;
  mousePosition.value = { x: event.clientX, y: event.clientY };
}

function hideImagePopup() {
  hoveredImage.value = null;
}

function goToCreate() {
  router.push("/projects/create");
}

function toggleFeatured(project) {
  updateProject(project.id, { is_featured: !project.is_featured })
    .then(() => {
      project.is_featured = !project.is_featured;
    })
    .catch(() => {});
}

function onPageSizeChange() {
  currentPage.value = 1;
  loadProjects(1);
}
</script>
