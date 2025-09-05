
import './App.css'
import UserContextProvider from './Context/UserContextProvider'

function App() {

  return (
    <UserContextProvider>
      <Login />
      <Profile />
    </UserContextProvider>
  )
}

export default App
