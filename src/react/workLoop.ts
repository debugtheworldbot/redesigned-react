import { createDom } from "./createElement"

let nextUnitOfWork: VElement | null = null
export const workLoop = (deadline: TimeRemaining) => {
    let shouldYeild = false
    while (!!nextUnitOfWork && !shouldYeild) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork)

        shouldYeild = deadline.timeRemaining() < 1
    }
    window.requestIdleCallback(workLoop)
}
window.requestIdleCallback(workLoop)
const performUnitOfWork = (fiber: VElement) => {
    //把元素添加到 dom 中
    //为元素的子元素都创建一个 fiber 结构
    //找到下一个工作单元

    if (!fiber.dom) {
        fiber.dom = createDom(fiber)
    }

    return fiber


}