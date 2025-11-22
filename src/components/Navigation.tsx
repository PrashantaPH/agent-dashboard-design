import { LayoutDashboard, Users, Settings, FileText, LogOut, Shield, TrendingUp } from 'lucide-react';
import { Screen } from '../App';

interface NavigationProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  onLogout: () => void;
  isAdmin?: boolean;
}

export function Navigation({ currentScreen, onNavigate, onLogout, isAdmin = true }: NavigationProps) {
  const adminMenuItems = [
    { id: 'admin-dashboard' as Screen, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'agent-management' as Screen, label: 'Agent Management', icon: Users },
    { id: 'commission-rules' as Screen, label: 'Commission Rules', icon: Settings },
    { id: 'reports' as Screen, label: 'Reports', icon: FileText },
  ];

  const agentMenuItems = [
    { id: 'agent-dashboard' as Screen, label: 'My Dashboard', icon: TrendingUp },
    { id: 'reports' as Screen, label: 'My Reports', icon: FileText },
  ];

  const menuItems = isAdmin ? adminMenuItems : agentMenuItems;

  return (
    <nav className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-slate-900">Insurance Tracker</div>
              <div className="text-slate-500">{isAdmin ? 'Administrator' : 'Agent Portal'}</div>
            </div>
          </div>

          {/* Navigation Menu */}
          <div className="flex items-center gap-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentScreen === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
            
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 ml-2 text-slate-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
