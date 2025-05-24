import React, { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { usePostHooks } from '@/hooks/usePostHooks'

type FormData = {
  email: string
}

export default function Otp() {
  const url = import.meta.env.VITE_API_URL
  const { response, loading, error, postData } = usePostHooks()
  const {
    response: response1,
    loading: loading1,
    error: error1,
    postData: postData1,
  } = usePostHooks()

  const [formData, setFormData] = useState<FormData>({ email: '' })
  const [otpCode, setOtpCode] = useState('')
  const [showOtpInput, setShowOtpInput] = useState<boolean>(false)

  useEffect(() => {
    if (response) {
      setShowOtpInput(true)
    }
  }, [response])

  console.log(response1); 

  const handleChangeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await postData(`${url}/users/send-otp`, formData)
  }

  const handleVerifyOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await postData1(`${url}/users/verify-otp`, {
      email: formData.email,
      otp: otpCode,
    })

    if (response1?.message) {
      setVerifyMessage(response1.message)
    }
  }

  if (loading || loading1) {
    return (
      <div className='fixed w-full h-screen z-50 bg-white'>
        <div className='flex justify-center items-center h-full flex-col'>
          <div className='animate-spin rounded-full border-t-4 border-blue-500 border-8 w-16 h-16 mb-4'></div>
          <p className='text-lg text-gray-700'>Loading data...</p>
        </div>
      </div>
    )
  }

  if (error || error1) {
    return (
      <div className='fixed w-full h-screen bg-white z-50 px-5'>
        <div className='flex justify-center items-center h-[200px]'>
          <div className='bg-red-100 text-red-700 px-4 py-2 rounded-md shadow-md'>
            Maʼlumot topilmadi, iltimos keyinroq qayta urinib ko‘ring...
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='max-w-md mx-auto p-6'>
      {!showOtpInput ? (
        <form onSubmit={handleLogin} className='space-y-4 mt-4'>
          <div>
            <Label className='mb-1' htmlFor='email'>Email</Label>
            <Input
              id='email'
              name='email'
              type='email'
              placeholder='you@example.com'
              value={formData.email}
              onChange={handleChangeLogin}
              required
            />
          </div>
          <Button className='w-full' type='submit'>Send OTP</Button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp} className='space-y-4 mt-4'>
          <div>
            <Label className='mb-1' htmlFor='otp'>Enter OTP Code</Label>
            <Input
              id='otp'
              type='text'
              placeholder='123456'
              value={otpCode}
              onChange={e => setOtpCode(e.target.value)}
              required
            />
          </div>
          <Button className='w-full' type='submit'>Verify OTP</Button>
            <p className='text-green-600 text-sm mt-2'>{response1?.message}</p>
        </form>
      )}
    </div>
  )
}
