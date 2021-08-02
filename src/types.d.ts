interface VElement {
    type: string | 'TEXT_ELEMENT'
    props: Partial<HTMLProps>
    dom?: HTMLElement | Text
}
interface HTMLProps extends Omit<HTMLElement | Text, 'children'> {
    nodeValue: string | null
    children: VElement[]
}
type EleKeys = keyof HTMLProps

interface TimeRemaining {
    timeRemaining: () => number
}

interface Fiber {
    dom: HTMLElement
}