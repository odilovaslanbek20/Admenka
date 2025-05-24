import { useState } from 'react'
import axios from 'axios'

type FormData = {
	firstName: string,
	lastName: string,
	email: string,
	phone: string,
	password: string,
	role: string,
	image: string,
}

export function usePostHooks() {
	const [response, setResponse] = useState('')
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string>("")

	const postData = async (url: string, formData: FormData) => {
		setLoading(true)
		try {
			const res = await axios.post(url, formData)
			setResponse(res.data)
			setError("")
		} catch (error: unknown) {
			if (error instanceof Error) {
				setError(error.message)
			}
		} finally {
			setLoading(false)
		}
	}

	return { response, loading, error, postData }
}
