import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface ToolCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  accentColor: string;
  comingSoon?: boolean;
}

export default function ToolCard({ 
  icon: Icon, 
  title, 
  description, 
  href, 
  accentColor, 
  comingSoon = false
}: ToolCardProps) {
  const cardContent = (
    <Card className="h-full flex flex-col hover:shadow-lg transition-all duration-200 hover:-translate-y-1 rounded-xl border relative overflow-hidden">
      {comingSoon && (
        <div className="absolute top-4 right-4 z-10">
          <span className="bg-gradient-to-r from-orange-400 to-orange-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
            Coming Soon
          </span>
        </div>
      )}
      
      <CardHeader>
        <div className="flex items-center space-x-3 mb-2">
          <div 
            className="rounded-full p-3 flex items-center justify-center"
            style={{ backgroundColor: `${accentColor}15` }}
          >
            <Icon className={`h-6 w-6`} style={{ color: accentColor }} />
          </div>
        </div>
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        <CardDescription className="text-base text-gray-600">
          {description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col justify-end">
        <Button 
          asChild={!comingSoon} 
          className="w-full mt-auto" 
          disabled={comingSoon}
          variant={comingSoon ? "secondary" : "default"}
        >
          {comingSoon ? (
            <span>Coming Soon</span>
          ) : (
            <Link href={href}>Use Tool</Link>
          )}
        </Button>
      </CardContent>
    </Card>
  );

  return cardContent;
}
