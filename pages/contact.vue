<template>
  <div>
    <Header />
    <section class="py-12 bg-yellow-50">
      <div class="container mx-auto px-4 flex flex-col md:flex-row gap-8">
        <div class="flex-1">
          <h1 class="text-3xl md:text-5xl font-bold text-yellow-600 mb-4">
            LIÊN HỆ
          </h1>
          <p class="text-gray-700 mb-2">Điện thoại: 0933 57 77 53</p>
          <p class="text-gray-700 mb-2">Email: sungroup.sale@gmail.com</p>
          <p class="text-gray-700 mb-2">
            Tầng 19, Tòa nhà Vincom Center, 56-72 Lê Thánh Tôn, Bến Nghé, Quận
            1, TP. Hồ Chí Minh.
          </p>
        </div>
        <div class="flex-1">
          <form class="bg-white rounded-xl shadow-lg p-8 flex flex-col gap-4">
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
            <textarea
              placeholder="Nội dung"
              class="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-200 min-h-[80px]"
            ></textarea>
            <button
              type="submit"
              class="mt-2 px-6 py-3 bg-yellow-500 text-white font-bold rounded-lg shadow hover:bg-yellow-600 transition-colors duration-200"
            >
              LIÊN HỆ NGAY
            </button>
          </form>
        </div>
      </div>
      <div class="mt-8 flex justify-center">
        <img
          src="https://via.placeholder.com/600x300?text=Map"
          alt="Map"
          class="rounded-xl shadow-lg w-full max-w-2xl object-cover"
        />
      </div>
    </section>
    <Footer />
  </div>
</template>

<script setup>
import Header from "~/components/Header.vue";
import Footer from "~/components/Footer.vue";
</script>
