export const render = (element: VElement, container: HTMLElement) => {
    const dom = element.type === "TEXT_ELEMENT" ?
        document.createTextNode('') : document.createElement(element.type)

    const isProperty = (key: EleKeys) => key !== 'children'
    Object.keys(element.props)
        // @ts-ignore
        .filter(isProperty)
        // @ts-ignore
        .forEach((key: EleKeys) => {
            // @ts-ignore
            dom[key] = element.props[key]
        })
    // @ts-ignore
    element.props.children?.map((c) => render(c, dom))

    container.appendChild(dom)

}
