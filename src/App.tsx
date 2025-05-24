import { Route, Routes } from 'react-router-dom'
import RegisterPage from './pages/Auth/RegisterPage'
import OtpPage from './pages/Auth/Otp'

function App() {
	return (
		<>
			<Routes>
				<Route path='/' element={<RegisterPage />} />
				<Route path='/otp' element={<OtpPage />} />
			</Routes>
		</>
	)
}

export default App
