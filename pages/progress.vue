<template>
  <div>
    <Header />
    <section class="py-12 bg-white">
      <div class="container mx-auto px-4">
        <h1
          class="text-3xl md:text-5xl font-bold text-yellow-600 mb-8 text-center"
        >
          TIẾN ĐỘ
        </h1>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
            v-for="item in progresses"
            :key="item.id"
            class="bg-yellow-50 rounded-xl shadow p-6 flex flex-col md:flex-row gap-4 items-center hover:shadow-lg transition-all duration-300"
          >
            <img
              :src="item.image"
              :alt="item.title"
              class="w-40 h-28 object-cover rounded-lg"
            />
            <div>
              <h3 class="text-lg font-bold text-yellow-700 mb-2">
                {{ item.title }}
              </h3>
              <p class="text-gray-600">{{ item.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer />
  </div>
</template>

<script setup>
import Header from "~/components/Header.vue";
import Footer from "~/components/Footer.vue";
const progresses = [
  {
    id: 1,
    title: "Tiến độ xây dựng dự án Sun Group tại Phú Quốc tháng 03/2023",
    desc: "Sun Group hiện là nguồn lực quan trọng thúc đẩy các dự án hoàn thành đúng tiến độ.",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 2,
    title: "Tiến độ xây dựng tháng 10/2022 Sunset Town và Sun Tropical Village",
    desc: "Sunset Town và Sun Tropical Village đang được đẩy nhanh tiến độ xây dựng.",
    image:
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 3,
    title:
      "Tiến độ xây dựng tháng 08/2022 Thị Trấn Địa Trung Hải và Sun Tropical Village",
    desc: "Các dự án trọng điểm tại Phú Quốc đang hoàn thiện các hạng mục cuối cùng.",
    image:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 4,
    title:
      "Tiến độ xây dựng tháng 07/2022 của Thị Trấn Địa Trung Hải và Sun Tropical Village",
    desc: "Các dự án Sun Group luôn đảm bảo tiến độ và chất lượng.",
    image:
      "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=400&q=80",
  },
];
</script>
