import './style.css'
import IMAGE from './react.png'
import LOGO from './react-svg.svg'
import { ClickCounter } from './ClickCounter'

export const App = () => {
  return (
    <>
      <h1>
        React Webpack TypeScript - Experiment - Environment {process.env.name}
      </h1>
      <img src={IMAGE} alt="React logo" width="300" height="200" />
      <img src={LOGO} alt="React logo" width="300" height="200" />
      <ClickCounter />
    </>
  )
}
