declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<object, object, unknown>
  export default component
}

declare module 'vuedraggable' {
  import { DefineComponent } from 'vue'
  const draggable: DefineComponent<unknown, unknown, unknown>
  export default draggable
}