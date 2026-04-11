<template>
  <div class="lg:col-span-8 space-y-6">
    <!-- Control Card -->
    <section class="bg-surface-container p-6">
      <div class="flex items-center justify-between mb-8">
        <h2
          class="text-xs font-headline font-bold text-primary uppercase tracking-[0.3em] flex items-center gap-2"
        >
          Telemetry charts
        </h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h3
            class="text-[11px] font-headline font-bold text-secondary uppercase tracking-widest"
          >
            Left wheel position
          </h3>

          <canvas id="leftWheelPosition"></canvas>
        </div>

        <div>
          <h3
            class="text-[11px] font-headline font-bold text-secondary uppercase tracking-widest"
          >
            Right wheel position
          </h3>

          <canvas id="rightWheelPosition"></canvas>
        </div>

        <div>
          <h3
            class="text-[11px] font-headline font-bold text-secondary uppercase tracking-widest"
          >
            Left wheel velocity
          </h3>

          <canvas id="leftWheelVelocity"></canvas>
        </div>

        <div>
          <h3
            class="text-[11px] font-headline font-bold text-secondary uppercase tracking-widest"
          >
            Right wheel velocity
          </h3>

          <canvas id="rightWheelVelocity"></canvas>
        </div>

        <div>
          <h3
            class="text-[11px] font-headline font-bold text-secondary uppercase tracking-widest"
          >
            Acceleration
          </h3>

          <canvas id="acceleration"></canvas>
        </div>

        <div>
          <h3
            class="text-[11px] font-headline font-bold text-secondary uppercase tracking-widest"
          >
            Gyroscope
          </h3>

          <canvas id="gyroscope"></canvas>
        </div>

        <div>
          <h3
            class="text-[11px] font-headline font-bold text-secondary uppercase tracking-widest"
          >
            Distance
          </h3>

          <canvas id="distance"></canvas>
        </div>
      </div>

      <div class="flex flex-col h-full">
        <h3
          class="text-[11px] font-headline font-bold text-secondary uppercase tracking-widest mb-2"
        >
          Raw data
        </h3>

        <ul
          ref="rawListEl"
          class="font-mono text-xs space-y-1 flex-1 overflow-y-auto max-h-40"
        >
          <li
            v-for="(entry, i) in messages"
            :key="i"
            class="text-on-surface-variant break-all"
          >
            {{ JSON.stringify(entry) }}
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import Chart from 'chart.js/auto'
import type { Telemetry } from '~/composables/useRobotWebSocket'

const MAX_POINTS = 200

const rawListEl = ref<HTMLUListElement | null>(null)
const { telemetry, messages } = useRobotWebSocket()

// ---- Chart helpers ----
function makeDataset(label: string, color: string) {
  return {
    label,
    data: [] as number[],
    borderColor: color,
    backgroundColor: color + '22',
    borderWidth: 1.5,
    pointRadius: 0,
    tension: 0.3,
  }
}

function makeChart(id: string, datasets: ReturnType<typeof makeDataset>[]) {
  return new Chart(document.getElementById(id) as HTMLCanvasElement, {
    type: 'line',
    data: { labels: [] as number[], datasets },
    options: {
      animation: false,
      responsive: true,
      scales: {
        x: { display: false },
        y: { display: true, ticks: { maxTicksLimit: 5 } },
      },
      plugins: {
        legend: { display: datasets.length > 1 },
      },
    },
  })
}

function pushToChart(chart: Chart, t: number, values: number[]) {
  const labels = chart.data.labels as number[]
  if (labels.length >= MAX_POINTS) {
    labels.shift()
    chart.data.datasets.forEach((ds) => (ds.data as number[]).shift())
  }
  labels.push(t)
  values.forEach((v, i) => (chart.data.datasets[i].data as number[]).push(v))
  chart.update('none')
}

// ---- Chart instances ----
let leftPositionChart: Chart
let rightPositionChart: Chart
let leftVelocityChart: Chart
let rightVelocityChart: Chart
let accelerationChart: Chart
let gyroscopeChart: Chart
let distanceChart: Chart

onMounted(() => {
  leftPositionChart  = makeChart('leftWheelPosition',  [makeDataset('pos1', '#4f8ef7')])
  rightPositionChart = makeChart('rightWheelPosition', [makeDataset('pos2', '#f74f8e')])
  leftVelocityChart  = makeChart('leftWheelVelocity',  [makeDataset('vel1', '#4ff7a0')])
  rightVelocityChart = makeChart('rightWheelVelocity', [makeDataset('vel2', '#f7c94f')])
  distanceChart      = makeChart('distance',           [makeDataset('dist', '#a0f74f')])

  accelerationChart = makeChart('acceleration', [
    makeDataset('X', '#f74f4f'),
    makeDataset('Y', '#4ff74f'),
    makeDataset('Z', '#4f4ff7'),
  ])

  gyroscopeChart = makeChart('gyroscope', [
    makeDataset('X', '#f74f4f'),
    makeDataset('Y', '#4ff74f'),
    makeDataset('Z', '#4f4ff7'),
  ])
})

// ---- Feed charts from live telemetry ----
watch(telemetry, (data: Telemetry | null) => {
  if (!data) return
  const t = data.t

  pushToChart(leftPositionChart,  t, [data.pos1])
  pushToChart(rightPositionChart, t, [data.pos2])
  pushToChart(leftVelocityChart,  t, [data.vel1])
  pushToChart(rightVelocityChart, t, [data.vel2])
  pushToChart(distanceChart,      t, [data.dist])
  pushToChart(accelerationChart,  t, [data.ax, data.ay, data.az])
  pushToChart(gyroscopeChart,     t, [data.gx, data.gy, data.gz])
})

// ---- Auto-scroll raw data ----
watch(messages, async () => {
  await nextTick()
  if (rawListEl.value) {
    rawListEl.value.scrollTop = rawListEl.value.scrollHeight
  }
}, { deep: true })
</script>
