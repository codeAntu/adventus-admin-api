import { useEffect, useState } from 'react'
import { Button } from './components/ui/button'
import { useNavigate } from 'react-router'
import useStore from './store/store'
import PropertyList from './components/PropertyList'

function App() {
  const navigate = useNavigate()
  const token = useStore((state) => state.token)
  const setToken = useStore((state) => state.setToken)

  useEffect(() => {
    if (!token) navigate('/login')
    // console.log('token', token)
  }, [token]) // eslint-disable-line

  return (
    <div className='dark-gradient mx-auto h-screen bg-black text-white'>
      <div className='mx-auto h-[100dvh] max-w-[1000px] p-5 space-y-5'>
        <div className='flex w-full items-center justify-between'>
          <div className='text-3xl font-bold'>Logo </div>
          {token ? (
            <Button
              onClick={() => {
                setToken('')
              }}
              className='rounded-lg bg-white/20 px-5 py-2 text-sm font-semibold transition duration-200 hover:bg-white/70 hover:text-black'
            >
              Log out
            </Button>
          ) : (
            <Button
              onClick={() => {
                navigate('/login')
              }}
              className='rounded-lg bg-white/20 px-5 py-2 text-sm font-semibold transition duration-200 hover:bg-white/70 hover:text-black'
            >
              Log In 
            </Button>
          )}
        </div>

        <PropertyList />
      </div>
    </div>
  )
}

export default App
