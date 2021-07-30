export const render = (element: VElement, container: HTMLElement) => {
    const dom = element.type === "TEXT_ELEMENT" ?
        document.createTextNode('') : document.createElement(element.type)

    const isProperty = (key: string) => key !== 'children'

    Object.keys(element.props)
        .filter(isProperty)
        .forEach((key: any) => {
            // @ts-ignore
            dom[key] = element.props[key]
        })
    // @ts-ignore
    element.props.children?.map((c) => render(c, dom))

    container.appendChild(dom)

}
