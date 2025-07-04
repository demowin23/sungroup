<template>
  <section class="py-12 bg-white">
    <div class="container mx-auto px-4">
      <h2
        class="text-2xl md:text-4xl font-bold text-yellow-600 mb-8 text-center"
      >
        NHỮNG DỰ ÁN NỔI BẬT
      </h2>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
      >
        <div
          v-for="project in projects"
          :key="project.id"
          class="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 flex flex-col"
          @click="goToProject(project.id)"
          style="cursor: pointer"
        >
          <img
            :src="project.image"
            :alt="project.name"
            class="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
          />
          <div class="p-4 flex-1 flex flex-col">
            <h3 class="text-lg font-bold text-gray-800 mb-2">
              {{ project.name }}
            </h3>
            <p class="text-gray-500 mb-4 flex-1">{{ project.desc }}</p>
            <a
              href="#"
              class="inline-block mt-auto px-4 py-2 bg-yellow-500 text-white rounded font-semibold hover:bg-yellow-600 transition-colors duration-200 text-center"
              >TÌM HIỂU NGAY</a
            >
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const projects = [
  {
    id: 1,
    name: "Sun Elite City Hạ Long",
    desc: "Dự án đẳng cấp tại Hạ Long với vị trí đắc địa và tiện ích vượt trội.",
    image:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 2,
    name: "Sun Feliza Suites",
    desc: "Căn hộ cao cấp tại trung tâm thành phố, thiết kế hiện đại.",
    image:
      "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 3,
    name: "Xanh Island Cát Bà",
    desc: "Khu nghỉ dưỡng sinh thái đẳng cấp tại đảo Cát Bà.",
    image:
      "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 4,
    name: "Sun Urban City Hà Nam",
    desc: "Khu đô thị hiện đại, tiện nghi tại Hà Nam.",
    image:
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 5,
    name: "Sun Symphony Residence Đà Nẵng",
    desc: "Căn hộ ven biển với view tuyệt đẹp tại Đà Nẵng.",
    image:
      "https://images.unsplash.com/photo-1465101178521-c1a9136a3c8b?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 6,
    name: "The Pathway Sầm Sơn",
    desc: "Dự án nghỉ dưỡng cao cấp tại Sầm Sơn.",
    image:
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 7,
    name: "Sun Pointe Residence",
    desc: "Căn hộ sang trọng với tiện ích đỉnh cao.",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 8,
    name: "Sunrise Park Villa",
    desc: "Biệt thự nghỉ dưỡng ven biển tuyệt đẹp.",
    image:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80",
  },
];

function goToProject(id) {
  router.push({ path: `/projects/${id}` });
}
</script>
