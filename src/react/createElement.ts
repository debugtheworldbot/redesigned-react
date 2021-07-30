const createElement = (type: string, props?: Partial<HTMLProps>, ...children: Child[]): VElement => {
    return {
        type,
        props: {
            ...props,
            children: children.map(c =>
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
        document.createTextNode('') : document.createElement(fiber.type)
    return dom
}

export { createElement, createDom }