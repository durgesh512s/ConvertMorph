import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  LucideIcon,
  Archive, 
  GitMerge, 
  Scissors, 
  Image, 
  Download,
  Move3D,
  Type,
  Hash,
  PenTool,
  Eraser,
  Minimize2,
  CheckCircle,
  Copy,
  FileText,
  Calculator,
  Home,
  CreditCard,
  PiggyBank,
  Crop,
  GitCompare
} from 'lucide-react';

// Icon mapping for string to component conversion
const iconMap: Record<string, LucideIcon> = {
  Archive,
  GitMerge,
  Scissors,
  Image,
  Download,
  Move3D,
  Type,
  Hash,
  PenTool,
  Eraser,
  Minimize2,
  CheckCircle,
  Copy,
  FileText,
  Calculator,
  Home,
  CreditCard,
  PiggyBank,
  Crop,
  GitCompare,
};

interface ToolCardProps {
  icon: LucideIcon | string;
  title: string;
  description: string;
  href: string;
  accentColor: string;
  comingSoon?: boolean;
  categoryId?: string;
}

// Helper function to get category gradient classes
const getCategoryGradient = (categoryId?: string) => {
  switch (categoryId) {
    case 'pdf':
      return 'from-blue-50 to-blue-100 dark:from-blue-900/40 dark:to-blue-800/40';
    case 'image':
      return 'from-purple-50 to-purple-100 dark:from-purple-900/40 dark:to-purple-800/40';
    case 'text':
      return 'from-emerald-50 to-emerald-100 dark:from-emerald-900/40 dark:to-emerald-800/40';
    case 'finance':
      return 'from-amber-50 to-amber-100 dark:from-amber-900/40 dark:to-amber-800/40';
    default:
      return 'from-gray-50 to-gray-100 dark:from-gray-900/40 dark:to-gray-800/40';
  }
};

// Helper function to determine badge type
const getBadgeInfo = (comingSoon: boolean, title: string) => {
  if (comingSoon) {
    return {
      text: 'Coming Soon',
      className: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300'
    };
  }
  
  // Add "Popular" badge for certain tools
  const popularTools = ['PDF Compress', 'PDF Merge', 'PDF Split', 'Images to PDF'];
  if (popularTools.includes(title)) {
    return {
      text: 'Popular',
      className: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300'
    };
  }
  
  return null;
};

export default function ToolCard({ 
  icon, 
  title, 
  description, 
  href, 
  accentColor, 
  comingSoon = false,
  categoryId
}: ToolCardProps) {
  const gradientClasses = getCategoryGradient(categoryId);
  const badgeInfo = getBadgeInfo(comingSoon, title);

  // Get the icon component - handle both string and component types
  const IconComponent = typeof icon === 'string' ? iconMap[icon] || FileText : icon;

  const cardContent = (
    <Card className="h-full flex flex-col border rounded-2xl p-4 transition hover:-translate-y-0.5 hover:shadow-lg relative overflow-hidden bg-white dark:bg-gray-900">
      {badgeInfo && (
        <div className="absolute right-3 top-3 z-10">
          <span className={`rounded-full text-[10px] px-2 py-0.5 font-medium ${badgeInfo.className}`}>
            {badgeInfo.text}
          </span>
        </div>
      )}
      
      <CardHeader className="p-0 pb-4">
        <div className="flex items-center space-x-3 mb-3">
          <div className={`rounded-2xl p-3 flex items-center justify-center bg-gradient-to-br ${gradientClasses}`}>
            <IconComponent className="h-6 w-6" style={{ color: accentColor }} />
          </div>
        </div>
        <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">{title}</CardTitle>
        <CardDescription className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          {description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col justify-end p-0">
        <Button 
          asChild={!comingSoon} 
          className="w-full mt-auto font-medium" 
          disabled={comingSoon}
          style={{
            backgroundColor: comingSoon ? undefined : accentColor,
            borderColor: comingSoon ? undefined : accentColor,
          }}
          variant={comingSoon ? "secondary" : "default"}
        >
          {comingSoon ? (
            <span>Coming Soon</span>
          ) : (
            <Link href={href} className="flex items-center justify-center">
              Use Tool
            </Link>
          )}
        </Button>
      </CardContent>
    </Card>
  );

  return cardContent;
}
