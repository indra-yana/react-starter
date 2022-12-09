import { Outlet } from 'react-router-dom'
import AuthService from './core/service/AuthService';

function App() {
	const { auth, setAuth } = AuthService();

	return <Outlet context={{
		auth,
		setAuth,
	}} />
}

export default App
