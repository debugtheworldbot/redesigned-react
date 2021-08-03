interface VElement {
    type?: string | 'TEXT_ELEMENT'
    props: HTMLProps

    dom?: HTMLElement | Text | null
    parent?: VElement
    child?: VElement
    sibling?: VElement
}
interface HTMLProps extends Partial<Omit<HTMLElement | Text, 'children'>> {
    nodeValue?: string | null
    children: VElement[]
}

interface TimeRemaining {
    timeRemaining: () => number
}