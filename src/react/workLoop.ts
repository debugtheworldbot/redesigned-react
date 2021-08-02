import { createDom } from "./createElement"

type Fiber = VElement | null
let nextUnitOfWork: Fiber = null
// work in progress root
let wipRoot: Fiber = null
export const workLoop = (deadline: TimeRemaining) => {
    console.log('loop');

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

    if (!fiber.dom) {
        fiber.dom = createDom(fiber)
    }
    if (fiber.parent) {
        fiber.parent.dom?.appendChild(fiber.dom)
    }

    const elements = fiber.props.children
    let index = 0
    let preSibling: VElement | null = null

    while (index < elements?.length) {
        const element = elements[index]

        const newFiber: VElement = {
            type: element.type,
            props: element.props,
            parent: fiber,
            dom: null
        }

        if (index === 0) {
            fiber.child = newFiber
        } else {
            preSibling!.sibling = newFiber
        }
        preSibling = newFiber
        index++
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

const commitRoot = () => {
}