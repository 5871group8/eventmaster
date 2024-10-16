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
        <h1 className='text-4xl font-bold tracking-tight'>
          Hi, {user?.name || 'Friend'}!
        </h1>
        <h2 className='text-3xl font-semibold'>Welcome to EventMaster</h2>
        <p className='text-xl text-muted-foreground mt-2'>
          Discover and register for exciting events happening near you!
        </p>
      </header>
      <main className='space-y-12'>
        <section className='text-center'>
          <p className='text-lg text-muted-foreground'>
            Your one-stop destination for finding and planning unforgettable
            events!
          </p>
          <Button
            className='mt-4'
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
        <section className='bg-card text-card-foreground rounded-lg p-6 shadow-sm'>
          <h2 className='text-2xl font-semibold mb-4'>
            About Our Event Planner
          </h2>
          <p className='mb-4'>
            EventMaster is a powerful and user-friendly event planning platform
            designed to help you:
          </p>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
            {[
              'Discover a wide range of events in your area',
              'Easily register and manage your event attendance',
              'Create and promote your own events',
              'Connect with like-minded individuals and expand your network',
            ].map((item, index) => (
              <div key={index} className='flex items-start space-x-2'>
                <span className='text-sm'>{item}</span>
              </div>
            ))}
          </div>
          <p>
            Whether you're looking for concerts, workshops, conferences, or
            social gatherings, EventMaster has got you covered. Start exploring
            today and make every moment count!
          </p>
        </section>
      </main>
    </div>
  );
};

export default Home;
