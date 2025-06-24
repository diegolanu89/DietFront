import { createContext, useContext, useState } from 'react'

//create a context
const SocketData = createContext({})
export default SocketData

//create a provider of that context that will provide values
//which can be used by all the children conponents
export const SocketDataProvider = ({ children }) => {
  const [socketData, setSocketData] = useState(null)
  return (
    <SocketData.Provider value={{ socketData,  setSocketData }}>
      {children}
    </SocketData.Provider>
  )
}

//create a helper custom hook to used by other components who
//wish to use the context values
export const useSocketDataContext = () => {
  const { socketData, setSocketData } = useContext(SocketData)
  return {
    socketData,
    setSocketData
  }
}