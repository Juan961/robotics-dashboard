<template>
  <div class="space-y-2">
    <div class="flex justify-between items-center">
      <label class="text-[10px] text-outline uppercase font-mono">{{ label }}</label>
      <span class="text-primary font-mono text-xs">{{ modelValue.toFixed(decimals) }}</span>
    </div>
    <input
      type="range"
      :min="min"
      :max="max"
      :step="step"
      :value="modelValue"
      @input="$emit('update:modelValue', parseFloat(($event.target as HTMLInputElement).value))"
      class="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-surface-container-highest accent-primary"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: number
  label: string
  min: number
  max: number
  step: number
}>()

defineEmits<{ 'update:modelValue': [value: number] }>()

const decimals = computed(() => {
  const s = props.step.toString()
  const dot = s.indexOf('.')
  return dot === -1 ? 0 : s.length - dot - 1
})
</script>
