export {}
declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  interface CSSProperties {
    [key: `--${string}`]: string
  }
  const component: DefineComponent<
    Record<string, unknown>,
    Record<string, unknown>,
    any
  >
  export default component
}
