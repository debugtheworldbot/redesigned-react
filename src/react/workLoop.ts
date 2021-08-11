import { createDom } from "./createElement"
import { updateDom } from "./updateDom"

type Fiber = VElement | null
let nextUnitOfWork: Fiber = null
// work in progress root
let wipRoot: Fiber = null
let currentRoot: Fiber = null
let deletions: VElement[] | null = null
export const workLoop = (deadline: TimeRemaining) => {
    let shouldYeild = false
    while (!!nextUnitOfWork && !shouldYeild) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
        shouldYeild = deadline.timeRemaining() < 1
    }
    if (!nextUnitOfWork && wipRoot) {
        commitRoot()
    }
    window.requestIdleCallback(workLoop)
}

const performUnitOfWork = (fiber: VElement) => {
    //把元素添加到 dom 中
    //为元素的子元素都创建一个 fiber 结构
    //找到下一个工作单元
    const isFucComponent = fiber.type instanceof Function
    if (isFucComponent) {
        updateFucComponent(fiber)
    } else {
        updateHostComponent(fiber)
    }

    if (fiber.child) return fiber.child

    let nextFiber = fiber
    // if sibling exists,return;else return parent
    while (nextFiber) {
        if (nextFiber.sibling) return nextFiber.sibling
        nextFiber = nextFiber.parent!
    }
    return null
}
const reconcileChildren = (fiber: Fiber, elements: VElement[]) => {

    if (!fiber) return
    let index = 0
    let oldFiber = fiber.alternate?.child
    let preSibling: VElement | null = null

    while (index < elements?.length || !!oldFiber) {
        const element = elements[index]

        const sameType = oldFiber && element && element.type === oldFiber.type

        let newFiber: VElement | null = null
        if (sameType) {
            // update node
            newFiber = {
                type: oldFiber!.type,
                props: element.props,
                dom: oldFiber?.dom,
                parent: fiber,
                alternate: oldFiber,
                effectTag: 'UPDATE'
            }

        } else if (!sameType && element) {
            // add
            newFiber = {
                type: element.type,
                props: element.props,
                dom: null,
                parent: fiber,
                alternate: null,
                effectTag: 'PLACEMENT'
            }
        } else {
            // remove
            oldFiber!.effectTag = 'DELETION'
            deletions!.push(oldFiber!)
        }
        if (oldFiber) {
            oldFiber = oldFiber.sibling
        }
        if (index === 0) {
            fiber.child = newFiber
        } else {
            preSibling!.sibling = newFiber
        }
        preSibling = newFiber
        index++
    }
}

export const render = (element: VElement, container: HTMLElement) => {
    wipRoot = {
        dom: container,
        props: {
            children: [element]
        },
        alternate: currentRoot
    }
    deletions = []
    nextUnitOfWork = wipRoot
}

const commitRoot = () => {
    deletions?.forEach(d => commitWork(d))
    commitWork(wipRoot?.child!)
    currentRoot = wipRoot
    wipRoot = null
}
const commitWork = (fiber?: Fiber) => {
    if (!fiber) return
    let domParentFiber = fiber.parent
    while (!domParentFiber?.dom) {
        domParentFiber = domParentFiber?.parent
    }
    const domParent = domParentFiber?.dom
    if (fiber.effectTag === 'PLACEMENT' && !!fiber.dom) {
        domParent?.appendChild(fiber.dom)
    } else if (fiber.effectTag === 'UPDATE' && !!fiber.dom) {
        updateDom(
            fiber.dom,
            fiber.alternate?.props!,
            fiber.props
        )

    }
    else if (fiber.effectTag === 'DELETION') {
        let child = fiber
        while (!child?.dom) {
            child = fiber.child!
        }
        domParent?.removeChild(child.dom!)
    }
    commitWork(fiber.child)
    commitWork(fiber.sibling)
}
const updateHostComponent = (fiber: VElement) => {
    if (!fiber.dom) {
        fiber.dom = createDom(fiber)
    }
    const elements = fiber.props.children
    reconcileChildren(fiber, elements)
}
let wipFiber: VElement
let hookIndex: number = -1

const updateFucComponent = (fiber: VElement) => {
    wipFiber = fiber
    hookIndex = 0
    wipFiber.hooks = []
    const children = [(fiber.type as Function)(fiber.props)]

    reconcileChildren(fiber, children)
}
export const useState = <T>(initial: T): [T, Function] => {
    const oldHook = wipFiber?.alternate?.hooks![hookIndex]
    const hook: { state: T, queue: Function[] } = {
        state: oldHook ? oldHook.state : initial,
        queue: []
    }
    const actions = oldHook ? oldHook.queue : []
    actions.forEach(action => hook.state = action(hook.state))
    const setState = (action: Function) => {
        hook.queue.push(action)
        wipRoot = {
            dom: currentRoot?.dom,
            props: currentRoot?.props!,
            alternate: currentRoot
        }
        nextUnitOfWork = wipRoot
        deletions = []
    }
    wipFiber.hooks?.push(hook)
    hookIndex++

    return [hook.state, setState]

}