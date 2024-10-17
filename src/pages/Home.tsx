import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loginWithRedirect, user } = useAuth0();

  return (
    <div className='container mx-auto px-4 py-8'>
      <header className='text-center mb-12'>
        
        <div>
        <p className='text-4xl font-semibold'>
          Create your event management
        </p>
        <p className='text-4xl font-semibold'>more effectively</p>
        </div>
      </header>

      
      <main className='space-y-12'>
      <h1 className='text-4xl font-bold tracking-tight'>
          Hi, {user?.name || 'Friend'}! <span className='text-6xl'>👋</span>
        </h1>
        <h2 className='text-3xl font-semibold'>Welcome to EventPlanner</h2>
        
        <section className='text-center'>
          <p className='text-lg'>
            Your one-stop destination for finding and planning unforgettable
            events!
          </p>
          <Button
            className='mt-8'
            onClick={() => {
              if (isAuthenticated) {
                navigate('/events');
              } else {
                loginWithRedirect();
              }
            }}
          >
            Get Started
          </Button>
        </section>
        <section className='text-card-foreground p-6'>
          <h2 className='text-2xl font-semibold mb-4'>
            About Our Event Planner
          </h2>
          <p className='mb-4'>
            EventMaster is a powerful and user-friendly event planning platform
            designed to help you:
          </p>
          <div className='flex flex-col gap-4 mb-6 items-center'>
            {[
              'Simplifying the process of organizing and managing events',
              'Customizable templates for various types of events',
              'Create and promote your own events',
              'Integration with popular marketing platforms to boost event visibility',
            ].map((item, index) => (
              <div key={index} className='flex items-center'>
                <span className='text-sm'>{item}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
