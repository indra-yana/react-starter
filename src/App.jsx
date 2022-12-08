import { Outlet } from 'react-router-dom'
import { useAuth } from './hooks/useAuth';

function App() {
	const [auth, setAuth] = useAuth();

	return <Outlet context={{
		auth,
		setAuth,
	}} />
}

export default App
