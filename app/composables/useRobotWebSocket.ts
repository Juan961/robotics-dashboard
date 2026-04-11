const WS_URL = 'ws://192.168.20.174/ws'
const MAX_MESSAGES = 200

export interface Telemetry {
  t: number
  ref1: number
  ref2: number
  dist: number
  pos1: number
  vel1: number
  pos2: number
  vel2: number
  ax: number
  ay: number
  az: number
  gx: number
  gy: number
  gz: number
  kp1: number
  ki1: number
  kd1: number
  kp2: number
  ki2: number
  kd2: number
}

export interface Command {
  ref1?: number
  ref2?: number
  kp1?: number
  ki1?: number
  kd1?: number
  kp2?: number
  ki2?: number
  kd2?: number
  reset?: boolean
}

export function useRobotWebSocket() {
  const messages = ref<Telemetry[]>([])
  const telemetry = computed<Telemetry | null>(() => messages.value[messages.value.length - 1] ?? null)
  const connected = ref(false)
  const error = ref<string | null>(null)

  let ws: WebSocket | null = null
  let reconnectTimeout: ReturnType<typeof setTimeout> | null = null

  function connect() {
    if (ws) return

    ws = new WebSocket(WS_URL)

    ws.onopen = () => {
      connected.value = true
      error.value = null
    }

    ws.onmessage = (event) => {
      try {
        messages.value.push(JSON.parse(event.data) as Telemetry)
        if (messages.value.length > MAX_MESSAGES) {
          messages.value.shift()
        }
      } catch {
        console.warn('Failed to parse WS message:', event.data)
      }
    }

    ws.onerror = () => {
      error.value = 'WebSocket error'
    }

    ws.onclose = () => {
      connected.value = false
      ws = null
      reconnectTimeout = setTimeout(connect, 3000)
    }
  }

  function disconnect() {
    if (reconnectTimeout) {
      clearTimeout(reconnectTimeout)
      reconnectTimeout = null
    }
    ws?.close()
    ws = null
  }

  function send(cmd: Command) {
    if (ws?.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(cmd))
    }
  }

  onMounted(connect)
  onUnmounted(disconnect)

  return { telemetry, messages, connected, error, send }
}
