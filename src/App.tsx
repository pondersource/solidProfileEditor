

import { Routes, Route } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/blog/*" element={<BlogApp />} />
      </Route>
    </Routes>
  )
}

export default App



const Home = () => {
  return (
    <div>Home</div>
  )
}

const BlogApp = () => {
  return (
    <div>BlogApp</div>
  )
}

