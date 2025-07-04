<template>
  <section class="py-12 bg-yellow-50">
    <div class="container mx-auto px-4">
      <h2
        class="text-2xl md:text-3xl font-bold text-yellow-600 mb-6 text-center"
      >
        ĐĂNG KÝ TƯ VẤN CHI TIẾT
      </h2>
      <form
        class="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 flex flex-col gap-4"
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
        <textarea
          placeholder="Lời nhắn cho chúng tôi"
          class="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-200 min-h-[80px]"
        ></textarea>
        <button
          type="submit"
          class="mt-2 px-6 py-3 bg-yellow-500 text-white font-bold rounded-lg shadow hover:bg-yellow-600 transition-colors duration-200"
        >
          ĐĂNG KÝ TƯ VẤN NGAY
        </button>
      </form>
    </div>
  </section>
</template>

<style scoped></style>
