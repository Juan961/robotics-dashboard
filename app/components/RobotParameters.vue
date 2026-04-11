<template>
  <section
    class="bg-surface-container-low p-6 border-l-2 border-primary-container"
  >
    <h2
      class="text-xs font-headline font-bold text-primary uppercase tracking-[0.3em] mb-6 flex items-center gap-2"
    >
      Robot Dimensions
    </h2>
    <div class="space-y-6">
      <div class="relative">
        <label
          class="text-[10px] text-secondary font-label uppercase tracking-widest block mb-1"
          >Length between wheels</label
        >
        <input
          class="w-full bg-transparent border-b border-outline-variant/30 focus:border-primary transition-colors py-2 text-primary font-mono text-xl focus:ring-0 outline-none"
          type="number"
          v-model="wheelDistance"
        />
        <span
          class="absolute right-0 bottom-2 text-[10px] text-outline font-mono"
          >m</span
        >
      </div>
      <div class="relative">
        <label
          class="text-[10px] text-secondary font-label uppercase tracking-widest block mb-1"
          >Radius of the wheel</label
        >
        <input
          class="w-full bg-transparent border-b border-outline-variant/30 focus:border-primary transition-colors py-2 text-primary font-mono text-xl focus:ring-0 outline-none"
          type="number"
          v-model="wheelRadius"
        />
        <span
          class="absolute right-0 bottom-2 text-[10px] text-outline font-mono"
          >m</span
        >
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { wheelRadius, wheelDistance } = toRefs(useRobot());
</script>
