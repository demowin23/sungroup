<template>
  <footer
    class="bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 text-gray-200 py-12 mt-8 border-t-4 border-yellow-400 shadow-inner"
  >
    <div
      class="container mx-auto px-4 flex flex-col md:flex-row md:divide-x md:divide-gray-700 gap-10 md:gap-0"
    >
      <!-- Cột 1: Logo + Info + Social -->
      <div
        class="w-full md:w-1/4 flex flex-col items-start md:pr-8 mb-8 md:mb-0"
      >
        <div class="flex items-center space-x-3 mb-3">
          <img
            src="https://via.placeholder.com/40x40?text=Logo"
            alt="Logo"
            class="w-10 h-10 rounded-full border-2 border-yellow-400 bg-white shadow"
          />
          <span class="font-extrabold text-yellow-400 text-xl tracking-wide"
            >SUN GROUP</span
          >
        </div>
        <p class="text-sm mb-2">
          Điện thoại:
          <a href="tel:0933577753" class="hover:text-yellow-400 transition"
            >0933 57 77 53</a
          >
        </p>
        <p class="text-sm mb-2">
          Email:
          <a
            href="mailto:sungroup.sale@gmail.com"
            class="hover:text-yellow-400 transition"
            >sungroup.sale@gmail.com</a
          >
        </p>
        <p class="text-sm">
          Tầng 19, Tòa nhà Vincom Center, 56-72 Lê Thánh Tôn, Bến Nghé, Quận 1,
          TP. Hồ Chí Minh.
        </p>
        <div class="flex space-x-3 mt-4">
          <a href="#" class="hover:text-yellow-400 transition"
            ><i class="fab fa-facebook-f"></i
          ></a>
          <a href="#" class="hover:text-yellow-400 transition"
            ><i class="fab fa-youtube"></i
          ></a>
          <a href="#" class="hover:text-yellow-400 transition"
            ><i class="fab fa-instagram"></i
          ></a>
        </div>
      </div>
      <!-- Cột 2: Dự án nổi bật -->
      <div
        class="w-full md:w-1/3 flex flex-col items-start md:px-8 mb-8 md:mb-0"
      >
        <h4 class="font-bold text-yellow-400 mb-3 text-lg">
          NHỮNG DỰ ÁN NỔI BẬT
        </h4>
        <ul class="space-y-2 w-full">
          <li
            v-for="item in projects"
            :key="item"
            class="hover:text-yellow-400 transition-colors cursor-pointer text-base border-b border-gray-700 last:border-0 py-2"
          >
            {{ item }}
          </li>
        </ul>
      </div>
      <!-- Cột 3: Form liên hệ -->
      <div class="w-full md:w-5/12 flex flex-col items-start md:pl-8">
        <h4 class="font-bold text-yellow-400 mb-3 text-lg">
          LIÊN HỆ PHÒNG KINH DOANH
        </h4>
        <form class="flex flex-col gap-3 w-full">
          <input
            type="text"
            placeholder="Họ và tên*"
            class="px-4 py-2 border border-gray-600 rounded bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-200"
          />
          <input
            type="tel"
            placeholder="Số điện thoại*"
            class="px-4 py-2 border border-gray-600 rounded bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-200"
          />
          <textarea
            placeholder="Lời nhắn cho chúng tôi"
            class="px-4 py-2 border border-gray-600 rounded bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-200 min-h-[40px]"
          ></textarea>
          <button
            type="submit"
            class="px-4 py-2 bg-yellow-500 text-white font-bold rounded hover:bg-yellow-600 transition-colors shadow"
          >
            ĐĂNG KÝ NGAY
          </button>
        </form>
      </div>
    </div>
    <div class="text-center text-xs text-gray-400 mt-10">
      © Sun Group. All rights reserved.
    </div>
  </footer>
</template>

<script setup>
const projects = [
  "Sun Group Cầu Giấy",
  "Blanca City",
  "Vinhomes Green Paradise",
  "Xanh Island",
  "Sun Pointe Residence",
  "Sun Cosmo Residence",
  "Sun Symphony Residence",
];
</script>
