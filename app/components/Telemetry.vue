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
import Chart from "chart.js/auto";

const rawListEl = ref<HTMLUListElement | null>(null);

const { telemetry, messages } = useRobotWebSocket();

watch(messages, async () => {
  await nextTick();
  if (rawListEl.value) {
    rawListEl.value.scrollTop = rawListEl.value.scrollHeight;
  }
}, { deep: true });

const data = [
  { year: 2010, count: 10 },
  { year: 2011, count: 20 },
  { year: 2012, count: 15 },
  { year: 2013, count: 25 },
  { year: 2014, count: 22 },
  { year: 2015, count: 30 },
  { year: 2016, count: 28 },
];

onMounted(() => {
  const leftPositionChart = new Chart(
    document.getElementById("leftWheelPosition"),
    {
      type: "bar",
      data: {
        labels: data.map((row) => row.year),
        datasets: [
          {
            label: "Acquisitions by year",
            data: data.map((row) => row.count),
          },
        ],
      },
    }
  );

  const rightPositionChart = new Chart(
    document.getElementById("rightWheelPosition"),
    {
      type: "bar",
      data: {
        labels: data.map((row) => row.year),
        datasets: [
          {
            label: "Acquisitions by year",
            data: data.map((row) => row.count),
          },
        ],
      },
    }
  );

  const leftVelocityChart = new Chart(
    document.getElementById("leftWheelVelocity"),
    {
      type: "bar",
      data: {
        labels: data.map((row) => row.year),
        datasets: [
          {
            label: "Acquisitions by year",
            data: data.map((row) => row.count),
          },
        ],
      },
    }
  );

  const rightVelocityChart = new Chart(
    document.getElementById("rightWheelVelocity"),
    {
      type: "bar",
      data: {
        labels: data.map((row) => row.year),
        datasets: [
          {
            label: "Acquisitions by year",
            data: data.map((row) => row.count),
          },
        ],
      },
    }
  );

  const accelerationChart = new Chart(document.getElementById("acceleration"), {
    type: "bar",
    data: {
      labels: data.map((row) => row.year),
      datasets: [
        {
          label: "Acquisitions by year",
          data: data.map((row) => row.count),
        },
      ],
    },
  });

  const gyroscopeChart = new Chart(document.getElementById("gyroscope"), {
    type: "bar",
    data: {
      labels: data.map((row) => row.year),
      datasets: [
        {
          label: "Acquisitions by year",
          data: data.map((row) => row.count),
        },
      ],
    },
  });

  const distanceChart = new Chart(document.getElementById("distance"), {
    type: "bar",
    data: {
      labels: data.map((row) => row.year),
      datasets: [
        {
          label: "Acquisitions by year",
          data: data.map((row) => row.count),
        },
      ],
    },
  });
});
</script>
