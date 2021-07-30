type Child = (Object | string)
interface VElement {
    type: string
    props: {
        [k: string]: any
        nodeValue?: string
        children: Child[]
    }
}