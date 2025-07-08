<template>
  <form
    @submit.prevent="onSubmit"
    class="max-w-7xl mx-auto bg-white p-6 rounded shadow"
  >
    <div class="mb-4 flex items-center gap-4">
      <div class="flex-1">
        <label class="block mb-1 font-medium">Tên dự án</label>
        <input
          v-model="name"
          type="text"
          class="w-full border rounded px-3 py-2"
          placeholder="Nhập tên dự án"
        />
      </div>
      <div class="flex items-center gap-2 mt-6">
        <input type="checkbox" v-model="is_featured" id="is_featured" />
        <label for="is_featured" class="font-medium">Nổi bật</label>
      </div>
    </div>
    <div class="mb-4">
      <label class="block mb-1 font-medium">Giới thiệu nhanh</label>
      <input v-model="shortIntro" class="w-full border rounded px-3 py-2" />
    </div>
    <div class="mb-4">
      <label class="block mb-1 font-medium">Ảnh chính</label>
      <input
        type="file"
        @change="onFileChange"
        class="w-full border rounded px-3 py-2"
        accept="image/*"
      />
      <div v-if="mainImagePreview" class="mt-2">
        <img
          :src="mainImagePreview"
          alt="preview"
          class="w-32 h-20 object-cover rounded"
        />
      </div>
    </div>
    <div class="mb-4">
      <label class="block mb-1 font-medium">Chi tiết dự án</label>
      <ClientOnly>
        <div class="quill-scrollable">
          <QuillEditor
            v-model:content="detail"
            contentType="html"
            class="bg-white"
            :toolbar="toolbarOptions"
          />
        </div>
      </ClientOnly>
    </div>

    <button
      type="submit"
      class="bg-blue-600 text-white px-4 py-2 rounded mr-2"
      :disabled="loading"
      @click.prevent="onSubmit"
    >
      <span v-if="loading">Đang lưu...</span>
      <span v-else>{{ submitText }}</span>
    </button>
    <button
      v-if="$attrs.onCancel || $attrs['onCancel'] !== undefined"
      type="button"
      class="bg-gray-500 text-white px-4 py-2 rounded"
      @click="handleCancel"
    >
      Hủy
    </button>
    <div v-if="errorMessage" class="text-red-500 mt-2">{{ errorMessage }}</div>
    <div v-if="success" class="text-green-500 mt-2">Thành công!</div>
  </form>
</template>

<script setup>
import { ref, watch, toRefs, defineExpose, nextTick } from "vue";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { useProjectStore } from "~/store/useProjectStore";
import { useRouter } from "vue-router";
import { defineProps, defineEmits } from "vue";
import { useRuntimeConfig } from "#app";

const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({}),
  },
  submitText: { type: String, default: "Thêm dự án" },
  loading: { type: Boolean, default: false },
  errorMessage: { type: String, default: "" },
  success: { type: Boolean, default: false },
});
const emit = defineEmits(["submit", "cancel"]);

const name = ref(props.initialData.name || "");
const detail = ref("");
const mainImage = ref(null);
const mainImagePreview = ref("");
const shortIntro = ref("");
const is_featured = ref(props.initialData.is_featured ?? false);

const router = useRouter();
const config = useRuntimeConfig();
const apiBase = config.public.apiBase;

watch(
  () => props.initialData,
  (val) => {
    if (val) {
      name.value = val.name || "";
      detail.value = val.detail || "";
      mainImage.value = null;
      let preview = val.main_image_preview || val.main_image || "";
      if (preview && !preview.startsWith("http")) {
        mainImagePreview.value = `${apiBase}/uploads/${preview}`;
      } else {
        mainImagePreview.value = preview;
      }
      shortIntro.value = val.short_intro || "";
      is_featured.value = val.is_featured ?? false;
    } else {
      name.value = "";
      detail.value = "";
      mainImage.value = null;
      mainImagePreview.value = "";
      shortIntro.value = "";
      is_featured.value = false;
    }
  },
  { immediate: true }
);

const projectStore = useProjectStore();
const { addProject, loading, error } = projectStore;

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"],
  ["blockquote", "code-block"],
  [{ header: 1 }, { header: 2 }],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }],
  [{ indent: "-1" }, { indent: "+1" }],
  [{ direction: "rtl" }],
  [{ size: ["small", false, "large", "huge"] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: [] }, { background: [] }],
  [{ font: [] }],
  [{ align: [] }],
  ["clean"],
  ["link", "image", "video"],
];

function onFileChange(e) {
  const file = e.target.files[0];
  mainImage.value = file || null;
  if (file) {
    mainImagePreview.value = URL.createObjectURL(file);
  }
}

async function onSubmit() {
  emit("submit", {
    name: name.value,
    detail: detail.value,
    main_image: mainImage.value,
    main_image_preview: mainImagePreview.value,
    short_intro: shortIntro.value,
    is_featured: is_featured.value,
  });
}

function handleCancel() {
  emit("cancel");
}

function goToAdmin() {
  router.push("/projects/admin");
}

defineExpose({
  resetForm,
});

function resetForm() {
  name.value = "";
  detail.value = "";
  mainImage.value = null;
  mainImagePreview.value = "";
  shortIntro.value = "";
  is_featured.value = false;
  nextTick(() => {
    detail.value = "";
  });
}
</script>

<style scoped>
.input,
.file-input {
  @apply border rounded px-3 py-2 w-full;
}
.btn {
  @apply bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition;
}
.quill-scrollable {
  max-height: 60vh;
  height: 600px;
  overflow-y: auto;
}
:deep(.ql-toolbar.ql-snow) {
  border: 1px solid #d1d5db;
  box-sizing: border-box;
  font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif;
  position: sticky;
  z-index: 1000;
  background: #fff;
  top: 0;
}
</style>
