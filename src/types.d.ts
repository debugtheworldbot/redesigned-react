interface VElement {
    type?: string | 'TEXT_ELEMENT'
    props: HTMLProps

    dom?: HTMLElement | Text | null
    parent?: VElement | null
    child?: VElement | null
    sibling?: VElement | null
    alternate?: VElement | null
    effectTag?: 'UPDATE' | 'PLACEMENT' | 'DELETION'
}
interface HTMLProps extends Partial<Omit<HTMLElement | Text, 'children'>> {
    nodeValue?: string | null
    children: VElement[]
}

interface TimeRemaining {
    timeRemaining: () => number
}