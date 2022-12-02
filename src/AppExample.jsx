import './App.css'
import { useContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import Clock from './components/example/Clock'
import Counter from './components/example/Counter'
import LoginControl from './components/example/LoginControl'
import Toggle from './components/example/Toggle'
import NumberList from './components/example/NumberList'
import TextForm from './components/example/TextForm'
import TextAreaForm from './components/example/TextAreaForm'
import SelectForm from './components/example/SelectForm'
import MultiInputForm from './components/example/MultiInputForm'
import TemperatureCalculator from './components/example/TemperatureCalculator'
import { AuthContext, auth } from './utils/AuthContext'
import Greeting from './components/example/Greeting'

function App() {
  const [
    increment,
    setIncrement,
  ] = useState(1);

  const [
    toggle,
    setToggle,
  ] = useState(true);

  const [
    authenticated,
    setAuthenticated,
  ] = useState(auth.authenticated);

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <Clock />

      <div className="card">
        <Counter increment={increment}/>
        {[...Array(1)].map((x, i) =>
          <Counter increment={++i} key={i}/>
        )}
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <div>
        <p>Toggle is: {toggle ? 'ON' : 'OFF'}</p>

        <Toggle onToggleChanged={(toggle) => setToggle(toggle)} initialToggle={toggle}/>
      </div>
      <div>
        <AuthContext.Provider value={{authenticated, setAuthenticated}}>
          <LoginControl onAuthChanged={(isLogin) => setAuthenticated(isLogin) } />
          <Greeting isLoggedIn={authenticated}/>
          <NumberList numbers={[1,2,3]}/>
        </AuthContext.Provider>
      </div>
      <div>
        {/* <NumberList numbers={[1,2,3]}/> */}
      </div>
      <div>
        <TextForm/>
        <br />
        <TextAreaForm/>
        <br />
        <SelectForm/>
        <br />
        <MultiInputForm/>
        <br />
        <TemperatureCalculator/>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
