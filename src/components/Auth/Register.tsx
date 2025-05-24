import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { usePostHooks } from '@/hooks/usePostHooks'
import OtpPage from '@/pages/Auth/Otp'

type FormData = {
	firstName: string
	lastName: string
	phone: string
	role: string
	image: string
	email: string
	password: string
}

type FormData1 = {
	email: string
	password: string
}

export default function Register() {
	const url = import.meta.env.VITE_API_URL
	const { response, loading, error, postData } = usePostHooks()
	const {
		response: responseLogin,
		loading: loadingLogin,
		error: errorLogin,
		postData: postDataLogin,
	} = usePostHooks()

	const [formData, setFormData] = useState<FormData>({
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		password: '',
		role: '',
		image: '',
	})

	const [formData1, setFormData1] = useState<FormData1>({
		email: '',
		password: '',
	})

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		e.preventDefault()
		const { id, value } = e.target
		setFormData(prev => ({
			...prev,
			[id]: value,
		}))
	}

	const handleChangeLogin = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		e.preventDefault()
		const { id, value } = e.target
		setFormData1(prev => ({
			...prev,
			[id]: value,
		}))
	}

	const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const validRoles = ['USER', 'CEO']
		if (!validRoles.includes(formData.role.toUpperCase())) {
			alert('Role must be USER or CEO')
			return
		}
		const dataRegister = {
			...formData,
			role: formData.role.toUpperCase(),
		}

		await postData(`${url}/users/register`, dataRegister)
	}

	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		await postDataLogin(`${url}/users/login`, formData1)
	}

	if (loading || loadingLogin) {
		return (
			<div className='fixed w-full h-screen z-50 bg-[#fff]'>
				<div className='flex justify-center items-center h-screen flex-col'>
					<div className='animate-spin rounded-full border-t-4 border-blue-500 border-8 w-16 h-16 mb-4'></div>
					<p className='text-lg text-gray-700'>Loading data...</p>
				</div>
			</div>
		)
	}

	if (error || errorLogin) {
		return (
			<div className='fixed w-full h-screen bg-[#fff] z-50 px-[20px]'>
				<div className='flex justify-center items-center h-[200px]'>
					<div className='bg-red-100 text-red-700 px-4 py-2 rounded-md shadow-md'>
						Malumot topilmadi iltimos keyinroq qayta urinib ko'ring...
					</div>
				</div>
			</div>
		)
	}

	console.log(response || responseLogin)

  if (responseLogin) {
    JSON.stringify(localStorage.setItem('token', responseLogin.accessToken))
    JSON.stringify(localStorage.setItem('refreshToken', responseLogin.refreshToken))
  }

  
	return (
		<div className='max-w-md mx-auto mt-10 p-6 border rounded-2xl shadow-lg bg-white dark:bg-zinc-900'>
			<Tabs defaultValue='login' className='w-full'>
				<TabsList className='grid w-full grid-cols-3'>
					<TabsTrigger value='login'>Login</TabsTrigger>
					<TabsTrigger value='register'>Register</TabsTrigger>
					<TabsTrigger value='otp'>OTP</TabsTrigger>
				</TabsList>

				<TabsContent value='login'>
					<TabsContent value='login'>
						<form onSubmit={handleLogin} className='space-y-4 mt-4'>
							<div>
								<Label className='mb-[5px]' htmlFor='email'>
									Email
								</Label>
								<Input
									onChange={handleChangeLogin}
									id='email'
									type='email'
									placeholder='you@example.com'
									required
								/>
							</div>
							<div>
								<Label className='mb-[5px]' htmlFor='password'>
									Password
								</Label>
								<Input
									onChange={handleChangeLogin}
									id='password'
									type='password'
									placeholder='••••••••'
									required
								/>
							</div>
							<Button className='w-full' type='submit'>
								Login
							</Button>
						</form>
					</TabsContent>
				</TabsContent>
				<TabsContent value='register'>
					<TabsContent value='register'>
						<form onSubmit={handleRegister} className='space-y-4 mt-4'>
							<div>
								<Label className='mb-[5px]' htmlFor='firstName'>
									First Name
								</Label>
								<Input
									id='firstName'
									type='text'
									placeholder='First Name'
									value={formData.firstName}
									onChange={handleChange}
									required
								/>
							</div>
							<div>
								<Label className='mb-[5px]' htmlFor='lastName'>
									Last Name
								</Label>
								<Input
									id='lastName'
									type='text'
									placeholder='Last Name'
									value={formData.lastName}
									onChange={handleChange}
									required
								/>
							</div>
							<div>
								<Label className='mb-[5px]' htmlFor='email'>
									Email
								</Label>
								<Input
									id='email'
									type='email'
									placeholder='you@example.com'
									value={formData.email}
									onChange={handleChange}
									required
								/>
							</div>
							<div>
								<Label className='mb-[5px]' htmlFor='phone'>
									Phone
								</Label>
								<Input
									id='phone'
									type='tel'
									placeholder='+99890...'
									value={formData.phone}
									onChange={handleChange}
									required
								/>
							</div>
							<div>
								<Label className='mb-[5px]' htmlFor='password'>
									Password
								</Label>
								<Input
									id='password'
									type='password'
									placeholder='••••••••'
									value={formData.password}
									onChange={handleChange}
									required
								/>
							</div>
							<div>
								<Label className='mb-[5px]' htmlFor='role'>
									Role
								</Label>
								<select
									id='role'
									value={formData.role}
									onChange={handleChange}
									required
									className='w-full p-2 border rounded'
								>
									<option value='' disabled>
										Select Role
									</option>
									<option value='USER'>USER</option>
									<option value='CEO'>CEO</option>
								</select>
							</div>
							<div>
								<Label className='mb-[5px]' htmlFor='image'>
									Image URL
								</Label>
								<Input
									id='image'
									type='url'
									placeholder='https://...'
									value={formData.image}
									onChange={handleChange}
									required
								/>
							</div>
							<Button className='w-full' type='submit'>
								Register
							</Button>
						</form>
					</TabsContent>
				</TabsContent>
				<TabsContent value='otp'>
					<OtpPage/>
				</TabsContent>
			</Tabs>
		</div>
	)
}
