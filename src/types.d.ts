type Child = (Object | string)
interface VElement {
    type: string | 'TEXT_ELEMENT'
    props: Partial<HTMLProps>
    dom?: HTMLElement | Text
}
interface HTMLProps extends Omit<HTMLElement, 'children'> {
    nodeValue: string | null
    children: VElement[] | Child[]
}
type EleKeys = keyof HTMLElement | keyof Text

interface TimeRemaining {
    timeRemaining: () => number
}

interface Fiber {
    dom: HTMLElement
}