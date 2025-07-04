<template>
  <div>
    <Header />
    <section class="py-12 bg-white">
      <div class="container mx-auto px-4">
        <h1
          class="text-3xl md:text-5xl font-bold text-yellow-600 mb-8 text-center"
        >
          TIN TỨC
        </h1>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
            v-for="item in news"
            :key="item.id"
            class="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row gap-4 items-center hover:shadow-lg transition-all duration-300"
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
const news = [
  {
    id: 1,
    title:
      "Sun Feliza Suite – Biểu tượng sống đẳng cấp mới tại trung tâm Cầu Giấy",
    desc: "Sun Feliza Suite chắc chắn sẽ có tên không thể bỏ qua trong năm 2025.",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 2,
    title:
      "Sun Group Cầu Giấy – Biểu tượng phát triển bất động sản cao cấp tại trung tâm Hà Nội",
    desc: "Sun Group Cầu Giấy là điểm nhấn mới của thị trường bất động sản Hà Nội.",
    image:
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 3,
    title:
      "Vinhomes Green City – Đô thị All-in-One đầu tiên phía Tây Bắc TPHCM",
    desc: "Vinhomes Green City là đô thị sinh thái All-in-One đầu tiên tại phía Tây Bắc TPHCM.",
    image:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 4,
    title:
      "LUMIÈRE Midtown – Chất sống tinh anh giữa tâm điểm phồn hoa The Global City",
    desc: "LUMIÈRE Midtown – biểu tượng của phong cách sống đẳng cấp.",
    image:
      "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=400&q=80",
  },
];
</script>
