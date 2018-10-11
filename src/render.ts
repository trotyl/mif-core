import { Component, Context } from './component'

export interface ComponentType<T> {
  new (options: RenderOptions): Component<T>
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

export function render<T>(component: ComponentType<T>, options: RenderOptions, container?: HTMLElement): Component<T> {
  const instance = new component(options)
  if (container != null) {
    instance.attach(container)
  }
  return instance
}

