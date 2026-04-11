<template>
  <div class="lg:col-span-8 space-y-6">
    <!-- Control Card -->
    <section class="bg-surface-container p-6">
      <div class="flex items-center justify-between mb-8">
        <h2
          class="text-xs font-headline font-bold text-primary uppercase tracking-[0.3em] flex items-center gap-2"
        >
          Control
        </h2>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
        <!-- Left Wheel PID -->
        <div class="space-y-8">
          <div
            class="flex items-center justify-between border-b border-outline-variant/10 pb-2"
          >
            <span
              class="text-[11px] font-headline font-bold text-secondary uppercase tracking-widest"
              >Left Wheel Reference r/s</span
            >
          </div>
          <input
            class="w-full bg-transparent border-b border-outline-variant/30 focus:border-primary transition-colors py-2 text-primary font-mono text-xl focus:ring-0 outline-none"
            type="number"
            v-model="leftWheelReference"
          />
        </div>
        <!-- Right Wheel PID -->
        <div class="space-y-8">
          <div
            class="flex items-center justify-between border-b border-outline-variant/10 pb-2"
          >
            <span
              class="text-[11px] font-headline font-bold text-secondary uppercase tracking-widest"
              >Right Wheel Reference r/s</span
            >
          </div>
          <input
            class="w-full bg-transparent border-b border-outline-variant/30 focus:border-primary transition-colors py-2 text-primary font-mono text-xl focus:ring-0 outline-none"
            type="number"
            v-model="rightWheelReference"
          />
        </div>

        <button
          class="px-6 py-2 bg-primary text-on-primary font-headline font-bold text-xs uppercase tracking-widest transition-all hover:shadow-[0_0_15px_rgba(219,252,255,0.4)] active:scale-95"
        >
          Send data
        </button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const leftWheelReference = ref(0);

const rightWheelReference = ref(0);

const sendControlData = () => {
  // Aquí podrías implementar la lógica para enviar los datos al backend o a los motores
  console.log("Left Wheel Reference:", leftWheelReference.value);
  console.log("Right Wheel Reference:", rightWheelReference.value);
};
</script>
