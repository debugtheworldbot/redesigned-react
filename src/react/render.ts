type EleKeys = keyof HTMLProps
type OmitChildren = keyof Omit<HTMLProps, 'children'>
export const render = (element: VElement, container: HTMLElement) => {
    const dom = element.type === "TEXT_ELEMENT" ?
        document.createTextNode('') : document.createElement(element.type)

    const isProperty = (key: EleKeys) => key !== 'children'
    const keys = Object.keys(element.props) as EleKeys[]
    (keys.filter(isProperty) as OmitChildren[])
        .forEach((key: OmitChildren) => {
            // @ts-ignore
            dom[key] = element.props[key]
        })
    if (element.type !== "TEXT_ELEMENT") {
        element.props.children?.map((c) => render(c, dom as HTMLElement))
    }
    container.appendChild(dom)

}
