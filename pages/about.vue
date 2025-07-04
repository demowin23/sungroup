<template>
  <div>
    <Header />
    <section class="py-12 bg-yellow-50">
      <div
        class="container mx-auto px-4 flex flex-col md:flex-row gap-8 items-center"
      >
        <div class="flex-1">
          <h1 class="text-3xl md:text-5xl font-bold text-yellow-600 mb-4">
            SUN GROUP
          </h1>
          <p class="text-gray-700 mb-4">
            Sun Group - Lịch sử phát triển vững mạnh
          </p>
          <p class="text-gray-500 mb-2">
            Sun Group là tập đoàn kinh doanh đa ngành, dẫn đầu xu hướng bất động
            sản, du lịch, giải trí và hạ tầng tại Việt Nam. Chúng tôi cam kết
            phát triển các dự án đẳng cấp, góp phần nâng tầm vị thế Việt Nam
            trên bản đồ quốc tế.
          </p>
        </div>
        <div class="flex-1 flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
            alt="About Sun Group"
            class="rounded-xl shadow-lg w-96 h-64 object-cover"
          />
        </div>
      </div>
    </section>
    <Footer />
  </div>
</template>

<script setup>
import Header from "~/components/Header.vue";
import Footer from "~/components/Footer.vue";
</script>
