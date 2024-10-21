import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Home from './pages/Home';
import Events from './pages/Events';

import { Button } from '@/components/ui/button';
import About from './pages/About';

function App() {
  const { user, isAuthenticated, isLoading, logout, loginWithRedirect } =
    useAuth0();

  const handleSuggest = () => {
    const emailAddress = 'yhua0633@uni.sydus.ney.edu.au';
    const subject = 'Suggestion for Event Planner';
    const body = 'I would like to suggest...';

    window.location.href = `mailto:${emailAddress}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  console.log({ user, isAuthenticated });

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <div className='loader'></div>
      </div>
    );
  }

  return (
    <>
      <nav className='w-full px-8 py-6 flex justify-between items-center bg-[#cac9c957]'>
        <div className='text-lg font-bold hidden sm:block'>EventPlanner®</div>
        <div className='flex space-x-4 h-[28px] items-end'>
          <Link className='text-foreground hover:text-primary' to='/'>
            Home
          </Link>
          <Link className='text-foreground hover:text-primary' to='/about'>
            About Us
          </Link>
          <div
            onClick={handleSuggest}
            className='text-foreground hover:text-primary font-medium'
          >
            Suggest
          </div>
          {isAuthenticated && (
            <Link className='text-foreground hover:text-primary' to='/events'>
              Events
            </Link>
          )}
        </div>
        {/* User Registration Section */}
        {!isAuthenticated ? (
          <Button onClick={() => loginWithRedirect()}>Log In</Button>
        ) : (
          <div className='flex items-center gap-2'>
            <Button
              onClick={() =>
                logout({
                  logoutParams: {
                    returnTo: `${window.location.origin}/eventmaster`,
                  },
                })
              }
            >
              Log Out
            </Button>
          </div>
        )}
      </nav>

      <div className='pb-[148px]'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/events' element={<Events />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </div>

      <footer className='bg-background text-foreground fixed bottom-0 left-0 w-full'>
        <div className='container mx-auto px-4 py-8'>
          <p className='mb-1'>
            If you have any questions or need support, please reach out to us:
          </p>
          <div className='space-y-2'>
            <p>
              <i className='fas fa-envelope mr-2'></i> Email:
              yhua0633@uni.sydus.ney.edu.au
            </p>
            <p>
              <i className='fas fa-phone mr-2'></i> Phone: +61 0461368290
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
