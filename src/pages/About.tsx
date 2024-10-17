import React from "react";
import { Card, CardHeader } from "@/components/ui/card";

const teamMembers = [
  { name: "Zheyu Feng", email: "zfen0830@uni.sydney.edu.au" },
  { name: "Xiaoqing Xiong", email: "xxi00322@uni.sydney.edu.au" },
  { name: "Yiheng Huang", email: "yhua0633@uni.sydney.edu.au" },
  { name: "Ruizi Xie", email: "rxie0573@uni.sydney.edu.au" },
  { name: "Songzhuo Li", email: "soli0696@uni.sydney.edu.au" },
];

const About: React.FC = () => {
  return (
    <div className="container mx-auto py-12">
      <div className="font-bold text-[20px] mb-8 text-center">
        <h1>A start-up focused on</h1>
        <h1 className="mt-4">simplifying</h1>
        <h1 className="inline-block rounded-full px-3 bg-[#84def9] mt-4">
          event management
        </h1>
      </div>

      <p className="m-12">
        We've been operating as EventMaster for six months, building a small but
        loyal user base along the way. Now, we’re ready to expand our reach and
        offer even more to our community. To do this, we’re developing a new,
        user-friendly, and scalable event management platform designed to handle
        a wide range of events—from intimate community gatherings to large-scale
        international conferences. Our goal is to provide a comprehensive
        solution that makes event planning and management easier for everyone.
      </p>

      <h2 className="text-2xl font-semibold mb-6">Our Team</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member) => (
          <Card key={member.name}>
            <CardHeader>
              <div className="flex flex-col items-left space-x-4">
                <span className="text-lg font-bold">{member.name}</span>
                <span className="text-sm text-muted-foreground">
                  {member.email}
                </span>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default About;
