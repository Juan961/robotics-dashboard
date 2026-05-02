<template>
  <section class="bg-surface-container p-6">
    <div class="flex items-center justify-between mb-8">
      <h2 class="text-xs font-headline font-bold text-primary uppercase tracking-[0.3em]">
        Lemniscata
      </h2>
    </div>

    <p class="text-[10px] text-secondary font-label uppercase tracking-widest block mb-1">
      Lemniscata is currently {{ lemniscataActive ? 'active' : 'inactive' }}.
    </p>

    <button
      class="px-6 py-2 bg-primary text-on-primary font-headline font-bold text-xs uppercase tracking-widest transition-all hover:shadow-[0_0_15px_rgba(219,252,255,0.4)] active:scale-95"
      @click="toggleLemniscata"
    >
      {{ lemniscataActive ? 'Deactivate' : 'Activate' }} Lemniscata
    </button>
  </section>
</template>

<script setup lang="ts">
const { send } = useRobotWebSocket();

const lemniscataActive = ref(false);

function toggleLemniscata() {
  lemniscataActive.value = !lemniscataActive.value;
  send({ lem: lemniscataActive.value });
}
</script>
