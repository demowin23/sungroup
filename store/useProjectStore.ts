import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRuntimeConfig } from '#app';

export interface Project {
  id: number;
  name: string;
  detail?: string;
  main_image?: string;
}

export const useProjectStore = defineStore('project', () => {
  const projects = ref<Project[]>([]);
  const projectDetail = ref<Project | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const config = useRuntimeConfig();
  const apiBase = config.public.apiBase;

  // Helper fetch wrapper
  async function fetchJson(input: RequestInfo, init?: RequestInit) {
    const res = await fetch(input, init);
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  }

  // Lấy danh sách dự án
  async function fetchProjects(page = 1, limit = 10, is_featured = false) {
    loading.value = true;
    error.value = null;
    try {
      let url = `${apiBase}/api/other-projects?page=${page}&limit=${limit}`;
      if (is_featured === true) {
        url += `&is_featured=true`;
      }
      const data = await fetchJson(url);
      projects.value = data;
      return data;
    } catch (e: any) {
      error.value = e?.message || 'Lỗi khi tải danh sách dự án';
    } finally {
      loading.value = false;
    }
  }

  // Lấy chi tiết dự án
  async function fetchProjectDetail(id: number) {
    loading.value = true;
    error.value = null;
    try {
      const data = await fetchJson(`${apiBase}/api/other-projects/${id}`);
      projectDetail.value = data;
    } catch (e: any) {
      error.value = e?.message || 'Lỗi khi tải chi tiết dự án';
    } finally {
      loading.value = false;
    }
  }

  // Thêm mới dự án (form-data)
  async function addProject(data: { name: string; detail?: string; main_image?: File | null ; short_intro?: string; is_featured?: boolean}) {
    loading.value = true;
    error.value = null;
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      if (data.detail) formData.append('detail', data.detail);
      if (data.main_image) formData.append('main_image', data.main_image);
      if (data.short_intro) formData.append('short_intro', data.short_intro);
      formData.append('is_featured', data?.is_featured ? 'true' : 'false');
      const res = await fetch(`${apiBase}/api/other-projects`, {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error(await res.text());
      const project = await res.json();
      return project;
    } catch (e: any) {
      error.value = e?.message || 'Lỗi khi thêm dự án';
      throw e;
    } finally {
      loading.value = false;
    }
  }

  // Sửa dự án (form-data)
  async function updateProject(id: number, data: { name?: string; detail?: string; main_image?: File | null; is_featured?: boolean }) {
    loading.value = true;
    error.value = null;
    try {
      const formData = new FormData();
      if (data.name) formData.append('name', data.name);
      if (data.detail) formData.append('detail', data.detail);
      if (data.main_image) formData.append('main_image', data.main_image);
      if (typeof data.is_featured !== 'undefined') formData.append('is_featured', data.is_featured ? 'true' : 'false');
      const res = await fetch(`${apiBase}/api/other-projects/${id}`, {
        method: 'PUT',
        body: formData,
      });
      if (!res.ok) throw new Error(await res.text());
      const project = await res.json();
      const idx = projects.value.findIndex(p => p.id === id);
      if (idx !== -1) projects.value[idx] = project;
      if (projectDetail.value && projectDetail.value.id === id) projectDetail.value = project;
      return project;
    } catch (e: any) {
      error.value = e?.message || 'Lỗi khi sửa dự án';
      throw e;
    } finally {
      loading.value = false;
    }
  }

  // Xóa dự án
  async function deleteProject(id: number) {
    loading.value = true;
    error.value = null;
    try {
      const res = await fetch(`${apiBase}/api/other-projects/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error(await res.text());
      projects.value = projects.value.filter(p => p.id !== id);
      if (projectDetail.value && projectDetail.value.id === id) projectDetail.value = null;
    } catch (e: any) {
      error.value = e?.message || 'Lỗi khi xóa dự án';
      throw e;
    } finally {
      loading.value = false;
    }
  }

  return {
    projects,
    projectDetail,
    loading,
    error,
    fetchProjects,
    fetchProjectDetail,
    addProject,
    updateProject,
    deleteProject,
  };
}); 