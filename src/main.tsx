import { createElement } from './react/createElement'
import { render } from './react/render'

const ele = createElement('div',{innerText:'hi div'}) 
render(ele,document.getElementById('root')!)
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// )
