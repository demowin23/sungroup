<template>
  <section
    class="relative w-full h-[60vw] min-h-[400px] flex items-center justify-center overflow-hidden"
  >
    <img
      src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"
      alt="Hero Background"
      class="absolute inset-0 w-full h-full object-cover object-center scale-110 animate-zoom"
    />
    <div class="relative z-10 text-center text-white drop-shadow-lg">
      <h1 class="text-4xl md:text-6xl font-bold mb-4 animate-fadein">
        SUN GROUP
      </h1>
      <p class="text-lg md:text-2xl max-w-2xl mx-auto animate-fadein delay-200">
        Sun Group là tập đoàn kinh doanh đa ngành, dẫn đầu xu hướng bất động
        sản, du lịch, giải trí và hạ tầng tại Việt Nam.
      </p>
    </div>
    <div
      class="absolute inset-0 bg-gradient-to-b from-black/30 to-white/10"
    ></div>
  </section>
</template>

<style scoped>
@keyframes zoom {
  0% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1.12);
  }
}
.animate-zoom {
  animation: zoom 10s linear infinite alternate;
}
@keyframes fadein {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
.animate-fadein {
  animation: fadein 1.2s cubic-bezier(0.4, 0, 0.2, 1) both;
}
.animate-fadein.delay-200 {
  animation-delay: 0.2s;
}
</style>
