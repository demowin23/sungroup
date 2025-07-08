<template>
  <div class="min-h-screen bg-gray-50 py-10">
    <div class="flex justify-between items-center max-w-7xl mx-auto mb-4">
      <h1 class="text-2xl font-bold text-center">Thêm dự án mới</h1>
      <div class="flex gap-2">
        <button
          class="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700 transition"
          @click="goToAdmin"
        >
          Quản lý dự án
        </button>
        <button
          class="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition ml-2"
          @click="router.push('/')"
        >
          Trang chủ
        </button>
      </div>
    </div>
    <ProjectForm
      :submitText="'Thêm dự án'"
      :loading="loading"
      :errorMessage="errorMessage"
      @submit="handleSubmit"
      @cancel="goToAdmin"
      ref="projectFormRef"
    />
  </div>
</template>

<script setup>
import ProjectForm from "~/components/ProjectForm.vue";
import { useProjectStore } from "~/store/useProjectStore";
import { ref } from "vue";
import { useRouter } from "vue-router";

const projectStore = useProjectStore();
const { addProject, loading } = projectStore;
const errorMessage = ref("");
const router = useRouter();
const projectFormRef = ref(null);

async function handleSubmit(formData) {
  console.log(formData);
  errorMessage.value = "";
  if (!formData.name.trim()) {
    errorMessage.value = "Vui lòng nhập tên dự án.";
    return;
  }
  if (
    !formData.detail ||
    formData.detail.replace(/<(.|\n)*?>/g, "").trim() === ""
  ) {
    errorMessage.value = "Vui lòng nhập chi tiết dự án.";
    return;
  }
  if (!formData.main_image) {
    errorMessage.value = "Vui lòng chọn ảnh chính cho dự án.";
    return;
  }
  try {
    await addProject(formData);
    alert("Thêm Thành công");
    if (projectFormRef.value && projectFormRef.value.resetForm) {
      projectFormRef.value.resetForm();
    }
  } catch (e) {
    console.trace(e);
    errorMessage.value = "Có lỗi xảy ra khi thêm dự án.";
  }
}

function goToAdmin() {
  router.push("/projects/admin");
}
</script>
