<template>
  <div class="lg:col-span-8 space-y-6">
    <section class="bg-surface-container p-6">
      <div class="flex items-center justify-between mb-8">
        <h2
          class="text-xs font-headline font-bold text-primary uppercase tracking-[0.3em] flex items-center gap-2"
        >
          Inverse Kinematics
        </h2>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Turn Card -->
        <div
          class="glass-panel p-5 group hover:border-primary/30 transition-all"
        >
          <div class="flex items-center gap-3 mb-6">
            <h3
              class="text-[10px] font-headline font-bold text-secondary uppercase tracking-widest"
            >
              Turn around axis
            </h3>
          </div>
          <div class="space-y-4">
            <div>
              <label class="text-[9px] text-outline uppercase block"
                >Time (s)</label
              >
              <input
                class="w-full bg-transparent border-b border-primary/50 focus:border-primary py-1 text-primary font-mono outline-none text-sm"
                type="number"
                placeholder="5"
                v-model="ownAxisData.time"
                @change="calculateTurnAroundAxis"
              />
            </div>
            <div class="pt-4 mt-4 border-t border-outline-variant/10">
              <div
                class="flex justify-between text-[9px] text-outline uppercase mb-2"
              >
                <span>Wheel Output</span>
              </div>
              <div class="flex gap-2">
                <div
                  class="bg-surface-container-lowest flex-1 p-2 border border-outline-variant/10 text-center"
                >
                  <div class="text-[8px] text-outline uppercase">Left</div>
                  <div class="text-xs font-mono text-primary">{{ formatWheel(ownAxisData.leftWheel) }}</div>
                </div>
                <div
                  class="bg-surface-container-lowest flex-1 p-2 border border-outline-variant/10 text-center"
                >
                  <div class="text-[8px] text-outline uppercase">Right</div>
                  <div class="text-xs font-mono text-primary">{{ formatWheel(ownAxisData.rightWheel) }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Circle Card -->
        <div
          class="glass-panel p-5 group hover:border-primary/30 transition-all"
        >
          <div class="flex items-center gap-3 mb-6">
            <h3
              class="text-[10px] font-headline font-bold text-secondary uppercase tracking-widest"
            >
              Circle trajectory
            </h3>
          </div>
          <div class="space-y-4">
            <div class="flex gap-4">
              <div class="flex-1">
                <label class="text-[9px] text-outline uppercase block"
                  >Diameter (m)</label
                >
                <input
                  class="w-full bg-transparent border-b border-primary/50 focus:border-primary py-1 text-primary font-mono outline-none text-sm"
                  placeholder="1.2"
                  type="number"
                  v-model="circleData.diameter"
                  @change="calculateCircleTrajectory"
                />
              </div>
              <div class="flex-1">
                <label class="text-[9px] text-outline uppercase block"
                  >Time (s)</label
                >
                <input
                  class="w-full bg-transparent border-b border-primary/50 focus:border-primary py-1 text-primary font-mono outline-none text-sm"
                  placeholder="5.0"
                  type="number"
                  v-model="circleData.time"
                  @change="calculateCircleTrajectory"
                />
              </div>
            </div>
            <div class="pt-4 mt-4 border-t border-outline-variant/10">
              <div
                class="flex justify-between text-[9px] text-outline uppercase mb-2"
              >
                <span>Wheel Output</span>
              </div>
              <div class="flex gap-2">
                <div
                  class="bg-surface-container-lowest flex-1 p-2 border border-outline-variant/10 text-center"
                >
                  <div class="text-[8px] text-outline uppercase">Left</div>
                  <div class="text-xs font-mono text-primary">{{ formatWheel(circleData.leftWheel) }}</div>
                </div>
                <div
                  class="bg-surface-container-lowest flex-1 p-2 border border-outline-variant/10 text-center"
                >
                  <div class="text-[8px] text-outline uppercase">Right</div>
                  <div class="text-xs font-mono text-primary">{{ formatWheel(circleData.rightWheel) }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Line Card -->
        <div
          class="glass-panel p-5 group hover:border-primary/30 transition-all border-primary-container/20"
        >
          <div class="flex items-center gap-3 mb-6">
            <h3
              class="text-[10px] font-headline font-bold text-secondary uppercase tracking-widest"
            >
              Line trajectory
            </h3>
          </div>
          <div class="space-y-4">
            <div class="flex gap-4">
              <div class="flex-1">
                <label class="text-[9px] text-outline uppercase block"
                  >Distance (m)</label
                >
                <input
                  class="w-full bg-transparent border-b border-primary/50 focus:border-primary py-1 text-primary font-mono outline-none text-sm"
                  type="number"
                  placeholder="5.0"
                  v-model="linearData.distance"
                  @change="calculateLineTrajectory"
                />
              </div>
              <div class="flex-1">
                <label class="text-[9px] text-outline uppercase block"
                  >Time (s)</label
                >
                <input
                  class="w-full bg-transparent border-b border-primary/50 focus:border-primary py-1 text-primary font-mono outline-none text-sm"
                  type="number"
                  placeholder="1.5"
                  v-model="linearData.time"
                  @change="calculateLineTrajectory"
                />
              </div>
            </div>
            <div class="pt-4 mt-4 border-t border-outline-variant/10">
              <div
                class="flex justify-between text-[9px] text-outline uppercase mb-2"
              >
                <span>Wheel Output</span>
              </div>
              <div class="flex gap-2">
                <div
                  class="bg-surface-container-lowest flex-1 p-2 border border-outline-variant/10 text-center"
                >
                  <div
                    class="text-[8px] text-outline uppercase font-bold text-primary"
                  >
                    Left
                  </div>
                  <div class="text-xs font-mono text-primary font-bold">
                    {{ formatWheel(linearData.leftWheel) }}
                  </div>
                </div>
                <div
                  class="bg-surface-container-lowest flex-1 p-2 border border-outline-variant/10 text-center"
                >
                  <div
                    class="text-[8px] text-outline uppercase font-bold text-primary"
                  >
                    Right
                  </div>
                  <div class="text-xs font-mono text-primary font-bold">
                    {{ formatWheel(linearData.rightWheel) }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { wheelRadius, wheelDistance } = toRefs(useRobot());

const ownAxisData = reactive({
  time: 0,
  leftWheel: 0,
  rightWheel: 0,
});

const circleData = reactive({
  diameter: 0,
  time: 0,
  leftWheel: 0,
  rightWheel: 0,
});

const linearData = reactive({
  distance: 0,
  time: 0,
  leftWheel: 0,
  rightWheel: 0,
});

const formatWheel = (value: number) => {
  return Number.isFinite(value) ? value.toFixed(5) : "0.00000";
};

const calculateTurnAroundAxis = () => {
  if (ownAxisData.time <= 0) {
    ownAxisData.leftWheel = 0;
    ownAxisData.rightWheel = 0;
    return;
  }

  console.log("A")

  const angularVel = (360 * Math.PI) / (ownAxisData.time * 180);

  ownAxisData.leftWheel = angularVel*wheelDistance.value / ( 2 * wheelRadius.value );

  ownAxisData.rightWheel = -angularVel*wheelDistance.value / ( 2 * wheelRadius.value );
};

const calculateCircleTrajectory = () => {
  if (circleData.time <= 0 || circleData.diameter <= 0) {
    circleData.leftWheel = 0;
    circleData.rightWheel = 0;
    return;
  }

  const linealVel = (circleData.diameter * Math.PI) / circleData.time;
  const angularVel = linealVel / (circleData.diameter / 2);

  circleData.leftWheel = (2 * linealVel - wheelDistance.value * angularVel ) / ( 2 * wheelRadius.value );
  circleData.rightWheel = (2 * linealVel + wheelDistance.value * angularVel ) / ( 2 * wheelRadius.value );
};

const calculateLineTrajectory = () => {
  if (linearData.time <= 0 || linearData.distance <= 0) {
    linearData.leftWheel = 0;
    linearData.rightWheel = 0;
    return;
  }

  const linealVel = linearData.distance / linearData.time;

  linearData.leftWheel = linealVel / wheelRadius.value;
  linearData.rightWheel = linealVel / wheelRadius.value;
};
</script>
