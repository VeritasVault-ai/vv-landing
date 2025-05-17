import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { 
  Menu, 
  X, 
  Home, 
  BarChart2, 
  Settings, 
  Users, 
  HelpCircle,
  LogOut
} from 'lucide-react';

/**
 * Corporate Mobile Header Component
 * Mobile navigation header for corporate dashboard
 */
export function CorporateMobileHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  const closeMenu = () => {
    setIsOpen(false);
  };
  
  const isActive = (path: string) => {
    return router.pathname === path;
  };
  
  return (
    <div className="md:hidden">
      <div className="flex items-center justify-between p-4 border-b">
        <Link href="/corporate/dashboard" className="flex items-center space-x-2">
          <div className="font-bold text-xl">VV</div>
          <div className="text-sm text-muted-foreground">Corporate</div>
        </Link>
        
        <Button variant="ghost" size="icon" onClick={toggleMenu}>
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>
      
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-background pt-16">
          <nav className="p-4 space-y-4">
            <Link 
              href="/corporate/dashboard" 
              className={`flex items-center space-x-2 p-2 rounded-md ${isActive('/corporate/dashboard') ? 'bg-muted' : 'hover:bg-muted'}`}
              onClick={closeMenu}
            >
              <Home className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
            
            <Link 
              href="/corporate/analytics" 
              className={`flex items-center space-x-2 p-2 rounded-md ${isActive('/corporate/analytics') ? 'bg-muted' : 'hover:bg-muted'}`}
              onClick={closeMenu}
            >
              <BarChart2 className="h-5 w-5" />
              <span>Analytics</span>
            </Link>
            
            <Link 
              href="/corporate/team" 
              className={`flex items-center space-x-2 p-2 rounded-md ${isActive('/corporate/team') ? 'bg-muted' : 'hover:bg-muted'}`}
              onClick={closeMenu}
            >
              <Users className="h-5 w-5" />
              <span>Team</span>
            </Link>
            
            <Link 
              href="/corporate/settings" 
              className={`flex items-center space-x-2 p-2 rounded-md ${isActive('/corporate/settings') ? 'bg-muted' : 'hover:bg-muted'}`}
              onClick={closeMenu}
            >
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </Link>
            
            <Link 
              href="/corporate/support" 
              className={`flex items-center space-x-2 p-2 rounded-md ${isActive('/corporate/support') ? 'bg-muted' : 'hover:bg-muted'}`}
              onClick={closeMenu}
            >
              <HelpCircle className="h-5 w-5" />
              <span>Support</span>
            </Link>
            
            <div className="pt-4 border-t">
              <Button variant="ghost" className="w-full justify-start text-red-600" onClick={closeMenu}>
                <LogOut className="h-5 w-5 mr-2" />
                Sign Out
              </Button>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}