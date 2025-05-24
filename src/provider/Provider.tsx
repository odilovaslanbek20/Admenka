import type { PropsWithChildren } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

const Provider = ({ children }: PropsWithChildren) => {
	return (
		<Router> 
			{children}
		</Router>
	)
}

export default Provider