<template>
  <div class="lg:col-span-8 space-y-6">
    <!-- Control Constants (PID) Card -->
    <section class="bg-surface-container p-6">
      <div class="flex items-center justify-between mb-8">
        <h2
          class="text-xs font-headline font-bold text-primary uppercase tracking-[0.3em] flex items-center gap-2"
        >
          Control Constants (PID)
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
              >Left Wheel</span
            >
          </div>
          <div class="space-y-6">
            <div class="space-y-2">
              <div class="flex justify-between items-center">
                <label class="text-[10px] text-outline uppercase font-mono"
                  >Kp (Proportional)</label
                >
                <input
                  class="bg-transparent text-primary font-mono text-xs w-12 text-right outline-none"
                  type="number"
                  value="0.45"
                />
              </div>
              <div
                class="h-1.5 bg-surface-container-highest w-full rounded-full overflow-hidden relative"
              >
                <div
                  class="absolute top-0 left-0 h-full bg-gradient-to-r from-primary/50 to-primary w-[45%]"
                ></div>
              </div>
            </div>
            <div class="space-y-2">
              <div class="flex justify-between items-center">
                <label class="text-[10px] text-outline uppercase font-mono"
                  >Ki (Integral)</label
                >
                <input
                  class="bg-transparent text-primary font-mono text-xs w-12 text-right outline-none"
                  type="number"
                  value="0.12"
                />
              </div>
              <div
                class="h-1.5 bg-surface-container-highest w-full rounded-full overflow-hidden relative"
              >
                <div
                  class="absolute top-0 left-0 h-full bg-gradient-to-r from-primary/50 to-primary w-[12%]"
                ></div>
              </div>
            </div>
            <div class="space-y-2">
              <div class="flex justify-between items-center">
                <label class="text-[10px] text-outline uppercase font-mono"
                  >Kd (Derivative)</label
                >
                <input
                  class="bg-transparent text-primary font-mono text-xs w-12 text-right outline-none"
                  type="number"
                  value="0.88"
                />
              </div>
              <div
                class="h-1.5 bg-surface-container-highest w-full rounded-full overflow-hidden relative"
              >
                <div
                  class="absolute top-0 left-0 h-full bg-gradient-to-r from-primary/50 to-primary w-[88%]"
                ></div>
              </div>
            </div>
          </div>
        </div>
        <!-- Right Wheel PID -->
        <div class="space-y-8">
          <div
            class="flex items-center justify-between border-b border-outline-variant/10 pb-2"
          >
            <span
              class="text-[11px] font-headline font-bold text-secondary uppercase tracking-widest"
              >Right Wheel</span
            >
          </div>
          <div class="space-y-6">
            <div class="space-y-2">
              <div class="flex justify-between items-center">
                <label class="text-[10px] text-outline uppercase font-mono"
                  >Kp (Proportional)</label
                >
                <input
                  class="bg-transparent text-primary font-mono text-xs w-12 text-right outline-none"
                  type="text"
                  value="0.45"
                />
              </div>
              <div
                class="h-1.5 bg-surface-container-highest w-full rounded-full overflow-hidden relative"
              >
                <div
                  class="absolute top-0 left-0 h-full bg-gradient-to-r from-primary/50 to-primary w-[45%]"
                ></div>
              </div>
            </div>
            <div class="space-y-2">
              <div class="flex justify-between items-center">
                <label class="text-[10px] text-outline uppercase font-mono"
                  >Ki (Integral)</label
                >
                <input
                  class="bg-transparent text-primary font-mono text-xs w-12 text-right outline-none"
                  type="text"
                  value="0.12"
                />
              </div>
              <div
                class="h-1.5 bg-surface-container-highest w-full rounded-full overflow-hidden relative"
              >
                <div
                  class="absolute top-0 left-0 h-full bg-gradient-to-r from-primary/50 to-primary w-[12%]"
                ></div>
              </div>
            </div>
            <div class="space-y-2">
              <div class="flex justify-between items-center">
                <label class="text-[10px] text-outline uppercase font-mono"
                  >Kd (Derivative)</label
                >
                <input
                  class="bg-transparent text-primary font-mono text-xs w-12 text-right outline-none"
                  type="text"
                  value="0.88"
                />
              </div>
              <div
                class="h-1.5 bg-surface-container-highest w-full rounded-full overflow-hidden relative"
              >
                <div
                  class="absolute top-0 left-0 h-full bg-gradient-to-r from-primary/50 to-primary w-[88%]"
                ></div>
              </div>
            </div>
          </div>
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

<script lang="ts">
const leftWheelConstants = reactive({
  kp: 0.45,
  ki: 0.12,
  kd: 0.88,
});

const rightWheelConstants = reactive({
  kp: 0.45,
  ki: 0.12,
  kd: 0.88,
});

const sendControlData = () => {
  // Aquí podrías implementar la lógica para enviar los datos al backend o a los motores
  console.log("Left Wheel Constants:", leftWheelConstants);
  console.log("Right Wheel Constants:", rightWheelConstants);
};
</script>

