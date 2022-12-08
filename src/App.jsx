import { Outlet } from 'react-router-dom'
import { useLocalStorage } from './hooks/useLocalStorage';

function App() {
	const [auth, setAuth] = useLocalStorage('auth', {});

	return <Outlet context={{
		auth,
		setAuth,
	}} />
}

export default App
