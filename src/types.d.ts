type Child = (Object | string)
interface VElement {
    type: string | 'TEXT_ELEMENT'
    props: Partial<HTMLProps>
}
interface HTMLProps extends Omit<HTMLElement, 'children'> {
    nodeValue: string | null
    children: VElement[] | Child[]
}
type EleKeys = Omit<keyof HTMLElement | keyof Text, 'children'>