<template>
  <div>
    <Header />
    <section class="bg-yellow-100 py-0">
      <div class="w-full">
        <img
          :src="project.banner"
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
          {{ project.name }}
        </h1>
        <div class="border-b border-black/70 mb-2"></div>
        <div
          class="flex flex-col md:flex-row md:items-center md:justify-between text-base text-black gap-2 md:gap-0 pb-2 border-b border-black/70"
        >
          <div class="text-left w-full md:w-1/3">
            Ngày đăng: {{ project.date }}
          </div>
          <div class="text-center w-full md:w-1/3">Số từ: 2500 từ.</div>
          <div class="text-right w-full md:w-1/3">Khoảng: 10 phút đọc.</div>
        </div>
      </div>
    </section>
    <section class="py-8 bg-white project-detail-section">
      <div class="container mx-auto px-4 max-w-7xl xl:flex xl:gap-8">
        <div class="prose max-w-none flex-1">
          <p>{{ project.desc }}</p>
          <h2 class="text-xl font-bold mt-8 mb-2">
            Tổng Quan Dự Án {{ project.name }}
          </h2>
          <img
            :src="project.images[0]"
            alt="Tổng quan"
            class="w-full rounded-lg shadow mb-4 project-detail-banner"
          />
          <p>{{ project.overview }}</p>
          <h3 class="text-lg font-bold mt-6 mb-2">Vị Trí Đắc Địa</h3>
          <ul class="list-disc pl-6 mb-4">
            <li v-for="item in project.location" :key="item">{{ item }}</li>
          </ul>
          <h3 class="text-lg font-bold mt-6 mb-2">Tiện Ích Nổi Bật</h3>
          <ul class="list-disc pl-6 mb-4">
            <li v-for="item in project.features" :key="item">{{ item }}</li>
          </ul>
          <img
            :src="project.images[1]"
            alt="Tiện ích"
            class="w-full rounded-lg shadow mb-4 project-detail-banner"
          />
          <h3 class="text-lg font-bold mt-6 mb-2">Trải Nghiệm Sống Đẳng Cấp</h3>
          <p>{{ project.experience }}</p>
          <img
            :src="project.images[2]"
            alt="Trải nghiệm"
            class="w-full rounded-lg shadow mb-4 project-detail-banner"
          />
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
                @click="goToProject(item.id)"
              >
                <img
                  :src="item.image || item.banner"
                  :alt="item.name"
                  class="w-full h-40 object-cover"
                />
                <div class="p-4">
                  <h3 class="font-bold text-gray-800 mb-1">{{ item.name }}</h3>
                  <p class="text-gray-500 text-sm">{{ item.desc }}</p>
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

const route = useRoute();
const router = useRouter();
const id = route.params.id;

// Mock data dự án
const projects = [
  {
    id: "1",
    name: "Sun Elite City Hạ Long",
    banner:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
    date: "2024-07-01",
    desc: "Sun Elite City Hạ Long là dự án đẳng cấp ven biển với vị trí đắc địa và tiện ích vượt trội.",
    overview:
      "Dự án gồm nhiều phân khu hiện đại, tích hợp các tiện ích quốc tế, không gian sống xanh và hệ thống giao thông thuận tiện.",
    location: [
      "Cách trung tâm Hạ Long 5 phút",
      "Gần các khu du lịch nổi tiếng",
      "Kết nối giao thông thuận tiện",
    ],
    features: [
      "Hồ bơi vô cực",
      "Khu vui chơi trẻ em",
      "Trung tâm thương mại",
      "Công viên ven biển",
    ],
    experience:
      "Trải nghiệm sống đẳng cấp với không gian xanh, tiện ích hiện đại và cộng đồng cư dân văn minh.",
    images: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: "2",
    name: "Sun Feliza Suites",
    banner:
      "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80",
    date: "2024-06-15",
    desc: "Sun Feliza Suites là căn hộ cao cấp tại trung tâm thành phố, thiết kế hiện đại.",
    overview:
      "Căn hộ sang trọng, tiện nghi, gần các tiện ích lớn và giao thông thuận tiện.",
    location: [
      "Trung tâm thành phố",
      "Gần trường học, bệnh viện",
      "Khu vực an ninh tốt",
    ],
    features: ["Phòng gym", "Khu BBQ", "Sân chơi trẻ em"],
    experience:
      "Sống tại Sun Feliza Suites là tận hưởng cuộc sống tiện nghi, hiện đại.",
    images: [
      "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1465101178521-c1a9136a3c8b?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: "3",
    name: "Xanh Island Cát Bà",
    banner:
      "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?auto=format&fit=crop&w=800&q=80",
    date: "2024-05-20",
    desc: "Khu nghỉ dưỡng sinh thái đẳng cấp tại đảo Cát Bà.",
    overview:
      "Biệt thự nghỉ dưỡng ven biển, không gian xanh, tiện ích quốc tế.",
    location: ["Đảo Cát Bà", "Gần bãi biển", "Khu vực yên tĩnh"],
    features: ["Bể bơi", "Nhà hàng", "Spa cao cấp"],
    experience: "Tận hưởng kỳ nghỉ tuyệt vời tại Xanh Island Cát Bà.",
    images: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80",
    ],
  },
];

const project = projects.find((p) => p.id === id) || projects[0];
const relatedProjects = projects.filter((p) => p.id !== project.id);

function goToProject(pid) {
  router.push({ path: `/projects/${pid}` });
}

const windowWidth = ref(process.client ? window.innerWidth : 1280);
function handleResize() {
  windowWidth.value = window.innerWidth;
}
onMounted(() => {
  window.addEventListener("resize", handleResize);
});
onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
</script>
