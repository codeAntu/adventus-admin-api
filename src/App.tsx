import { useState } from 'react'
import { Button } from './components/ui/button'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='bg-red-300 p-3'>Hello Vite + React!</div>
      <Button onClick={() => setCount((count) => count + 1)}>count is: {count}</Button>
    </>
  )
}

export default App
