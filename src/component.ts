export interface Context {
  isRoot: boolean
  basePath: string
  navigate(path: string): void
}

export interface StateChanges<S> {
  current: Partial<S>
  previous: Partial<S>
}

export abstract class Component<S = any> {
  state: Partial<S> = {}
  node!: Node

  constructor(readonly context: Context) {
    this.node = this.onCreate(context)
  }

  protected abstract onCreate(_context: Context): Node
  protected onUpdate(_changes: StateChanges<any>) { }
  protected onAttach(): void { }
  protected onDetach(): void { }
  protected onDestroy(): void { }

  set(state: Partial<S>): void {
    const previous = this.state
    this.state = state
    this.onUpdate({ previous, current: state })
  }

  get(): Partial<S> {
    return this.state
  }

  attach(parent: HTMLElement): void {
    parent.appendChild(this.node)
    this.onAttach()
  }

  detach(): void {
    if (this.node.parentElement != null) {
      this.node.parentElement.removeChild(this.node)
      this.onDetach()
    }
  }

  destroy(): void {
    this.detach()
    this.onDestroy()
  }
}
