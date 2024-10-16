import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const teamMembers = [
  { name: 'John Doe', role: 'CEO', image: '/john-doe.jpg' },
  { name: 'Jane Smith', role: 'CTO', image: '/jane-smith.jpg' },
  { name: 'Mike Johnson', role: 'Lead Developer', image: '/mike-johnson.jpg' },
];

const About: React.FC = () => {
  return (
    <div className='container mx-auto py-12'>
      <h1 className='text-4xl font-bold mb-8 text-center'>About Us</h1>

      <Card className='mb-12'>
        <CardHeader>
          <CardTitle>Our Mission</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            At our company, we strive to create innovative solutions that make a
            positive impact on people's lives. Our team is dedicated to pushing
            the boundaries of technology while maintaining a strong focus on
            user experience and accessibility.
          </p>
        </CardContent>
      </Card>

      <h2 className='text-2xl font-semibold mb-6'>Our Team</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {teamMembers.map((member) => (
          <Card key={member.name}>
            <CardHeader>
              <div className='flex items-center space-x-4'>
                <div>
                  <CardTitle>{member.name}</CardTitle>
                  <p className='text-sm text-muted-foreground'>{member.role}</p>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default About;
