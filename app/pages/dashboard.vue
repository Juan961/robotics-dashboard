<template>
  <Head>
    <Title>Dashboard - Robótica</Title>
  </Head>

  <main class="font-roboto container mx-auto py-10 px-4">
    <h1 class="text-4xl font-black font-headline text-primary tracking-tighter uppercase">Dashboard</h1>

    <div class="pt-16 bg-surface p-8 mx-auto space-y-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <RobotParameters class="lg:col-span-1" />

        <InverseKinematics class="lg:col-span-2" />
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <Control class="lg:col-span-1" />

        <ControlConstants class="lg:col-span-2" />
      </div>

      <Telemetry />

      <div>
        <Joystick />
        <Map />
      </div>
    </div>
  </main>
</template>

<script setup>
const { telemetry, connected } = useRobotWebSocket()

/* watch(telemetry, (data) => {
  console.log('[WebSocket] Telemetry:', data)
})
 */
watch(connected, (value) => {
  console.log('[WebSocket] Connected:', value)
})
</script>
