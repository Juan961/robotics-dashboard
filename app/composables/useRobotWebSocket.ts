import { type ComputedRef, type Ref } from 'vue'

const WS_URL = 'ws://10.83.198.142/ws'
const MAX_MESSAGES = 200

export interface Telemetry {
  t: number
  ref1: number
  ref2: number
  dist: number
  angle: number
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

// ---- Lazy singleton ----
interface State {
  messages: Ref<Telemetry[]>
  telemetry: ComputedRef<Telemetry | null>
  connected: Ref<boolean>
  error: Ref<string | null>
}

let state: State | null = null

function getState(): State {
  if (!state) {
    const messages = ref<Telemetry[]>([])
    state = {
      messages,
      telemetry: computed<Telemetry | null>(() => messages.value.at(-1) ?? null),
      connected: ref(false),
      error: ref<string | null>(null),
    }
  }
  return state
}

let ws: WebSocket | null = null
let reconnectTimeout: ReturnType<typeof setTimeout> | null = null
let consumers = 0

function connect() {
  if (!import.meta.client || ws) return

  const { messages, connected, error } = getState()

  console.info('[robot-ws] connecting to', WS_URL)
  ws = new WebSocket(WS_URL)

  ws.onopen = () => {
    console.info('[robot-ws] connected')
    connected.value = true
    error.value = null
  }

  ws.onmessage = (event) => {
    try {
      const msg = JSON.parse(event.data) as Telemetry
      console.debug('[robot-ws] message received', msg)
      const next = messages.value.length >= MAX_MESSAGES
        ? [...messages.value.slice(1), msg]
        : [...messages.value, msg]
      messages.value = next
    } catch {
      console.warn('[robot-ws] failed to parse message', event.data)
    }

  }

  ws.onerror = () => {
    console.error('[robot-ws] websocket error')
    error.value = 'WebSocket error'
  }

  ws.onclose = () => {
    console.info('[robot-ws] disconnected, scheduling reconnect')
    connected.value = false
    ws = null
    reconnectTimeout = setTimeout(connect, 1000)
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
    console.debug('[robot-ws] send', cmd)
    ws.send(JSON.stringify(cmd))
  } else {
    console.warn('[robot-ws] send skipped, socket not open', cmd)
  }
}

// ---- Composable ----
export function useRobotWebSocket() {
  onMounted(() => {
    if (++consumers === 1) connect()
  })

  onUnmounted(() => {
    if (--consumers === 0) disconnect()
  })

  return { ...getState(), send }
}

if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    if (ws) {
      ws.close()
      ws = null
    }
    if (reconnectTimeout) {
      clearTimeout(reconnectTimeout)
      reconnectTimeout = null
    }
    consumers = 0
    state = null
  })
}
