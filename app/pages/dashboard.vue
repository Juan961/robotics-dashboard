<template>
  <Head>
    <Title>Dashboard - Robótica</Title>
  </Head>

  <main class="font-roboto container mx-auto py-10 px-4">
    <h1 class="text-4xl font-black font-headline text-primary tracking-tighter uppercase">Dashboard</h1>

    <div class="pt-16 bg-surface p-8 max-w-7xl mx-auto space-y-8">
      <RobotParameters />

      <InverseKinematics />

      <ControlConstants />

      <Control />

      <Telemetry />

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
