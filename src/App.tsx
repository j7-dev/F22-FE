import { RouterProvider } from 'react-router-dom'
import router from '@/router'
import '@/assets/scss/index.scss'

function App() {
  return <RouterProvider router={router} />
}

export default App
