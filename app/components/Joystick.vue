<template>
  <section class="bg-surface-container p-6">
    <div class="flex items-center justify-between mb-8">
      <h2 class="text-xs font-headline font-bold text-primary uppercase tracking-[0.3em]">
        Joystick
      </h2>
    </div>

    <div class="flex flex-col items-center gap-6">
      <canvas
        ref="canvasRef"
        height="300"
        width="300"
        @pointerdown="onPointerDown"
        @pointermove="onPointerMove"
        @pointerup="onPointerEnd"
        @pointercancel="onPointerEnd"
      />

      <label class="flex items-center gap-3 cursor-pointer select-none">
        <input v-model="allowReference" type="checkbox" class="accent-primary w-3 h-3" />
        <span class="text-[11px] font-headline font-bold text-secondary uppercase tracking-widest">
          Allow joystick reference
        </span>
      </label>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const { send } = useRobotWebSocket();

const canvasRef = ref<HTMLCanvasElement | null>(null)
const allowReference = ref(false)

const CENTER = 150
const KNOB_RADIUS = 50
const MAX_DISTANCE = 100

const COLOR_KNOB = '#dbfcff'
const COLOR_CROSSHAIR = '#3b494b'

const SEND_INTERVAL_MS = 200

const knob = { x: 0, y: 0, alpha: 0.25 }
let isDragging = false
let animationId: number | null = null
let lastSendTime = 0

function draw() {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')!

  ctx.clearRect(0, 0, 300, 300)

  ctx.fillStyle = COLOR_CROSSHAIR
  ctx.fillRect(CENTER, 0, 1, 300)
  ctx.fillRect(0, CENTER, 300, 1)

  ctx.globalAlpha = knob.alpha
  ctx.fillStyle = COLOR_KNOB
  ctx.beginPath()
  ctx.arc(CENTER + knob.x, CENTER + knob.y, KNOB_RADIUS, 0, Math.PI * 2)
  ctx.fill()
  ctx.globalAlpha = 1
}

function calculateCoords(angle: number, distance: number) {
  const clamped = Math.min(distance, MAX_DISTANCE)
  const rads = (angle * Math.PI) / 180
  return { x: clamped * Math.cos(rads), y: clamped * Math.sin(rads) }
}

function getOffsetFromCenter(e: PointerEvent) {
  const rect = canvasRef.value!.getBoundingClientRect()
  return { x: e.clientX - rect.left - CENTER, y: e.clientY - rect.top - CENTER }
}

function onPointerDown(e: PointerEvent) {
  isDragging = true
  ;(e.target as HTMLCanvasElement).setPointerCapture(e.pointerId)
  if (animationId !== null) {
    cancelAnimationFrame(animationId)
    animationId = null
  }
  knob.alpha = 0.6
  draw()
}

function onPointerMove(e: PointerEvent) {
  if (!isDragging) return
  const { x, y } = getOffsetFromCenter(e)
  const angle = Math.atan2(y, x) * (180 / Math.PI)
  const distance = Math.sqrt(x * x + y * y)
  const coords = calculateCoords(angle, distance)
  knob.x = coords.x
  knob.y = coords.y

  const MAX_SPEED = 1.7
  const angle_rad = angle * (Math.PI / 180)
  const dist_norm = Math.min(distance / MAX_DISTANCE, 1)

  // Screen y is down, so negate sin → joystick up = positive linear speed
  const linear  = -Math.sin(angle_rad) * dist_norm * MAX_SPEED
  const angular =  Math.cos(angle_rad) * dist_norm * MAX_SPEED

  const ref1 = Number((linear + angular).toFixed(4))
  const ref2 = Number((linear - angular).toFixed(4))

  const now = performance.now()

  if (allowReference.value && now - lastSendTime >= SEND_INTERVAL_MS) {
    console.log({ref1, ref2})
    // send({ ref1, ref2 });
    lastSendTime = now
  }

  draw()
}

function onPointerEnd() {
  if (!isDragging) return
  isDragging = false
  knob.alpha = 0.25
  if (allowReference.value) {
    console.log({ref1: 0, ref2: 0})
    // send({ ref1: 0, ref2: 0 })
    lastSendTime = performance.now()
  }
  animateReturn()
}

function elasticOut(t: number) {
  if (t === 0 || t === 1) return t
  const p = 0.3
  return Math.pow(2, -10 * t) * Math.sin(((t - p / 4) * (2 * Math.PI)) / p) + 1
}

function animateReturn() {
  const startX = knob.x
  const startY = knob.y
  const duration = 750
  const startTime = performance.now()

  function step(now: number) {
    const t = Math.min((now - startTime) / duration, 1)
    const ease = elasticOut(t)
    knob.x = startX * (1 - ease)
    knob.y = startY * (1 - ease)
    draw()
    if (t < 1) {
      animationId = requestAnimationFrame(step)
    } else {
      knob.x = 0
      knob.y = 0
      draw()
      animationId = null
    }
  }

  animationId = requestAnimationFrame(step)
}

onMounted(draw)
onUnmounted(() => {
  if (animationId !== null) cancelAnimationFrame(animationId)
})
</script>

<style scoped>
canvas {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background-color: #32353c;
  cursor: all-scroll;
  user-select: none;
  touch-action: none;
}
</style>
