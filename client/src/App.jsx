import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ResumeForm from './components/resume/ResumeForm';
import ResumeList from './components/resume/ResumeList';
import ResumePreview from './components/resume/ResumePreview';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<ResumeList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create-resume" element={<ResumeForm />} />
            <Route path="/edit-resume/:id" element={<ResumeForm />} />
            <Route path="/resume/:id" element={<ResumePreview />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;