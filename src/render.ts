import { Component, Context } from './component'

export interface ComponentType<T extends Component<any>> {
  new (options: Context): T
}

export interface RenderOptions {
  context: Context
  basePath?: string
  navigateFn?: (path: string) => void
}

const base = document.querySelector('base')
const basePath = base != null ? base.href : '/'

export const ROOT_CONTEXT: Context = {
  isRoot: true,
  basePath,
  navigate(): void {
    throw new Error(`Navigation not supported!`)
  }
}

export function render<T extends Component<any>>(component: ComponentType<T>, options: RenderOptions, container?: HTMLElement): T {
  const instance = new component(options.context)
  if (container != null) {
    instance.attach(container)
  }
  return instance
}

