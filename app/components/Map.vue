<template>
  <section class="bg-surface-container p-6">
    <div class="flex items-center justify-between mb-8">
      <h2 class="text-xs font-headline font-bold text-primary uppercase tracking-[0.3em]">
        Position Map
      </h2>
      <button
        @click="resetTrail"
        class="text-[11px] font-headline font-bold text-secondary uppercase tracking-widest hover:text-primary transition-colors"
      >
        Reset
      </button>
    </div>
    <canvas ref="canvasRef" :width="W" :height="H" class="w-full" />
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

const { telemetry } = useRobotWebSocket()

const canvasRef = ref<HTMLCanvasElement | null>(null)

const W = 600
const H = 400
const SCALE = 60        // px per world unit
const GRID_STEP = 1     // world units between grid lines
const ROBOT_SIZE = 16   // px
const TRAIL_MAX = 400

// Theme colors
const C_GRID      = '#1e2229'
const C_AXIS      = '#3b494b'
const C_TRAIL     = '#00dbe9'
const C_ROBOT     = '#dbfcff'
const C_ARROW     = '#004f54'
const C_TEXT      = '#bbc7da'

const trail: { x: number; y: number }[] = []
const robot = { x: 0, y: 0, theta: 0 }

function worldToScreen(wx: number, wy: number, cx: number, cy: number) {
  return {
    sx: W / 2 + (wx - cx) * SCALE,
    sy: H / 2 - (wy - cy) * SCALE,
  }
}

function draw() {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')!
  const { x: cx, y: cy, theta } = robot

  ctx.clearRect(0, 0, W, H)

  // Grid lines
  const gxMin = Math.floor(cx - W / (2 * SCALE)) - 1
  const gxMax = Math.ceil(cx + W / (2 * SCALE)) + 1
  const gyMin = Math.floor(cy - H / (2 * SCALE)) - 1
  const gyMax = Math.ceil(cy + H / (2 * SCALE)) + 1

  for (let gx = gxMin; gx <= gxMax; gx += GRID_STEP) {
    const { sx } = worldToScreen(gx, 0, cx, cy)
    ctx.strokeStyle = gx === 0 ? C_AXIS : C_GRID
    ctx.lineWidth = gx === 0 ? 1 : 0.5
    ctx.beginPath()
    ctx.moveTo(sx, 0)
    ctx.lineTo(sx, H)
    ctx.stroke()
  }
  for (let gy = gyMin; gy <= gyMax; gy += GRID_STEP) {
    const { sy } = worldToScreen(0, gy, cx, cy)
    ctx.strokeStyle = gy === 0 ? C_AXIS : C_GRID
    ctx.lineWidth = gy === 0 ? 1 : 0.5
    ctx.beginPath()
    ctx.moveTo(0, sy)
    ctx.lineTo(W, sy)
    ctx.stroke()
  }

  // Trail
  if (trail.length > 1) {
    ctx.beginPath()
    const p0 = worldToScreen(trail[0].x, trail[0].y, cx, cy)
    ctx.moveTo(p0.sx, p0.sy)
    for (let i = 1; i < trail.length; i++) {
      const p = worldToScreen(trail[i].x, trail[i].y, cx, cy)
      ctx.lineTo(p.sx, p.sy)
    }
    ctx.strokeStyle = C_TRAIL
    ctx.lineWidth = 1.5
    ctx.globalAlpha = 0.45
    ctx.stroke()
    ctx.globalAlpha = 1
  }

  // Robot square + direction arrow, centered on canvas
  ctx.save()
  ctx.translate(W / 2, H / 2)
  ctx.rotate(-theta)  // canvas y is flipped, so negate

  ctx.fillStyle = C_ROBOT
  ctx.globalAlpha = 0.9
  ctx.fillRect(-ROBOT_SIZE / 2, -ROBOT_SIZE / 2, ROBOT_SIZE, ROBOT_SIZE)
  ctx.globalAlpha = 1

  // Arrow pointing forward (+x in robot frame)
  const arrowLen = ROBOT_SIZE * 0.9
  ctx.strokeStyle = C_ARROW
  ctx.lineWidth = 2.5
  ctx.lineCap = 'round'
  ctx.beginPath()
  ctx.moveTo(0, 0)
  ctx.lineTo(arrowLen, 0)
  ctx.stroke()

  ctx.restore()

  // Coordinate readout
  const thetaDeg = ((theta * 180) / Math.PI).toFixed(1)
  ctx.fillStyle = C_TEXT
  ctx.font = '10px "Roboto Mono", monospace'
  ctx.fillText(
    `x: ${cx.toFixed(3)}  y: ${cy.toFixed(3)}  θ: ${thetaDeg}°`,
    10,
    H - 10,
  )
}

watch(telemetry, (data) => {
  if (!data) return
  robot.x = data.x ?? 0
  robot.y = data.y ?? 0
  robot.theta = data.theta ?? 0

  if (trail.length >= TRAIL_MAX) trail.shift()
  trail.push({ x: robot.x, y: robot.y })

  draw()
})

function resetTrail() {
  trail.length = 0
  draw()
}

onMounted(draw)
</script>

<style scoped>
canvas {
  display: block;
  background-color: #10131a;
}
</style>
