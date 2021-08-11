import { updateDom } from "./updateDom"

type EleKeys = keyof HTMLProps
type OmitChildren = keyof Omit<HTMLProps, 'children'>
const createElement = (type: string, props: Partial<HTMLElement>, ...children: VElement[]): VElement => {
    return {
        type,
        props: {
            ...props,
            children: children
                .flat()
                .map(c =>
                    typeof c === 'object' ? c : createTextElement(c)
                )
        }
    }
}

const createTextElement = (text: string): VElement => {
    return {
        type: 'TEXT_ELEMENT',
        props: {
            nodeValue: text,
            children: []
        }
    }
}

const createDom = (fiber: VElement) => {
    const dom = fiber.type === 'TEXT_ELEMENT' ?
        document.createTextNode('') : document.createElement(fiber.type as string)
    updateDom(dom, {}, fiber.props)
    return dom
}

export { createElement, createDom }