import { Outlet } from 'react-router-dom'
import AuthViewModel from './core/viewmodel/AuthViewModel';

function App() {
	const { auth, setAuth } = AuthViewModel();

	return <Outlet context={{
		auth,
		setAuth,
	}} />
}

export default App
