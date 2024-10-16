import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const teamMembers = [
  { name: 'Zheyu Feng', email: 'zfen0830@uni.sydney.edu.au', },
  { name: 'Xiaoqing Xiong', email: 'xxi00322@uni.sydney.edu.au', },
  { name: 'Yiheng Huang', email: 'yhua0633@uni.sydney.edu.au', },
  { name: 'Ruizi Xie', email: 'rxie0573@uni.sydney.edu.au', },
  { name: 'Songzhuo Li', email: 'soli0696@uni.sydney.edu.au'},
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
              <div className='flex flex-col items-left space-x-4'>
                    <span className='text-lg font-bold'>{member.name}</span>
                    <span className='text-sm text-muted-foreground'>{member.email}</span>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default About;
