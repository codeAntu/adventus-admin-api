import { Loading } from '@/components/Loading'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import useStore from '@/store/store'
import { Label } from '@radix-ui/react-label'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router'

function Creator() {
  const [email, setEmail] = useState('codeantu@gmail.com')
  const [password, setPassword] = useState('12345678')
  const [isLoading, setIsLoading] = useState(false)
  const token = useStore((state) => state.token)  
  const setToken = useStore((state) => state.setToken)

  const navigate = useNavigate()

  async function login() {
    // https://adventus-admin-api.pdwap.store/api/backend/login
    setIsLoading(true)
    try {
      const response = await axios.post('https://adventus-admin-api.pdwap.store/api/backend/login', {
        email: email,
        password: password,
      })
      console.log(response.data)
      setToken(response.data.token)
      navigate('/')
    } catch (error: any) {
      console.error(error)
    }
    setIsLoading(false)
  }

  return (
    <>
      <Card className='w-[95%] max-w-[450px] gap-10 bg-black/60 px-10 pt-10 text-white'>
        <CardHeader>
          <CardTitle className='text-2xl'>
            <span className='font-semibold'>Creator Login</span>
          </CardTitle>
          <CardDescription className='font-medium'>Hello! Please login with your email and password.</CardDescription>
        </CardHeader>
        <CardContent className='space-y-2'>
          <div className='space-y-1'>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              placeholder='adminemail@gmail.com'
              type='email'
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              value={email}
            />
          </div>
          <div className='space-y-1'>
            <Label htmlFor='password'>Password</Label>
            <Input
              id='password'
              placeholder='Enter your password'
              type='password'
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              value={password}
            />
          </div>
        </CardContent>
        <CardFooter className='flex-col'>
          <Button
            className='w-full bg-white text-black hover:bg-white'
            onClick={() => {
              login()
            }}
          >
            Log In
          </Button>
          <Button className='mt-3 w-full text-blue-500' variant='link'>
            Forget Password?
          </Button>
        </CardFooter>
      </Card>
    </>
  )
}

export default function Login() {
  return (
    <div className='dark-gradient mx-auto min-h-[100dvh] bg-black text-white'>
      <div className='mx-auto max-w-[1000px] p-5'>
        <div className='flex w-full items-center justify-between'>
          <div className='text-3xl font-bold'>Logo </div>
          <div className='rounded-lg bg-white/20 px-5 py-2 text-sm font-semibold transition duration-200 hover:bg-white/70 hover:text-black'>
            Something{' '}
          </div>
        </div>
        <div className='flex h-screen flex-col items-center justify-center gap-5'>
          <Creator />
        </div>
      </div>
    </div>
  )


}
