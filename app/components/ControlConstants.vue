<template>
  <div class="space-y-6">
    <section class="bg-surface-container p-6">
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-xs font-headline font-bold text-primary uppercase tracking-[0.3em] flex items-center gap-2">
          Control Constants (PID)
        </h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
        <!-- Left Wheel PID -->
        <div class="space-y-8">
          <div class="flex items-center justify-between border-b border-outline-variant/10 pb-2">
            <span class="text-[11px] font-headline font-bold text-secondary uppercase tracking-widest">Left Wheel</span>
          </div>
          <div class="space-y-6">
            <PidSlider v-model="left.kp" label="Kp (Proportional)" :min="0" :max="200" :step="0.1" />
            <PidSlider v-model="left.ki" label="Ki (Integral)"     :min="0" :max="100"  :step="0.1" />
            <PidSlider v-model="left.kd" label="Kd (Derivative)"   :min="0" :max="10"   :step="0.001" />
          </div>
        </div>

        <!-- Right Wheel PID -->
        <div class="space-y-8">
          <div class="flex items-center justify-between border-b border-outline-variant/10 pb-2">
            <span class="text-[11px] font-headline font-bold text-secondary uppercase tracking-widest">Right Wheel</span>
          </div>
          <div class="space-y-6">
            <PidSlider v-model="right.kp" label="Kp (Proportional)" :min="0" :max="200" :step="0.1" />
            <PidSlider v-model="right.ki" label="Ki (Integral)"     :min="0" :max="100"  :step="0.1" />
            <PidSlider v-model="right.kd" label="Kd (Derivative)"   :min="0" :max="10"   :step="0.1" />
          </div>
        </div>

        <button
          class="px-6 py-2 bg-primary text-on-primary font-headline font-bold text-xs uppercase tracking-widest transition-all hover:shadow-[0_0_15px_rgba(219,252,255,0.4)] active:scale-95"
          @click="sendConstants"
        >
          Send data
        </button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { send } = useRobotWebSocket()

const left = reactive({ kp: 100, ki: 40, kd: 1 })
const right = reactive({ kp: 100, ki: 40, kd: 1 })

const sendConstants = () => {
  send({
    kp1: left.kp,  ki1: left.ki,  kd1: left.kd,
    kp2: right.kp, ki2: right.ki, kd2: right.kd,
  })
}
</script>
