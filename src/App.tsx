import { useState } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { AdminDashboard } from './components/AdminDashboard';
import { AgentManagement } from './components/AgentManagement';
import { AgentDashboard } from './components/AgentDashboard';
import { CommissionRules } from './components/CommissionRules';
import { Reports } from './components/Reports';

export type UserRole = 'admin' | 'agent';
export type Screen = 'login' | 'admin-dashboard' | 'agent-management' | 'agent-dashboard' | 'commission-rules' | 'reports';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [currentAgentId, setCurrentAgentId] = useState<string | null>(null);

  const handleLogin = (role: UserRole, agentId?: string) => {
    setUserRole(role);
    setCurrentAgentId(agentId || null);
    if (role === 'admin') {
      setCurrentScreen('admin-dashboard');
    } else {
      setCurrentScreen('agent-dashboard');
    }
  };

  const handleLogout = () => {
    setUserRole(null);
    setCurrentAgentId(null);
    setCurrentScreen('login');
  };

  const handleNavigate = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  if (currentScreen === 'login') {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {currentScreen === 'admin-dashboard' && (
        <AdminDashboard 
          onNavigate={handleNavigate} 
          onLogout={handleLogout}
        />
      )}
      {currentScreen === 'agent-management' && (
        <AgentManagement 
          onNavigate={handleNavigate} 
          onLogout={handleLogout}
        />
      )}
      {currentScreen === 'agent-dashboard' && (
        <AgentDashboard 
          agentId={currentAgentId!}
          onNavigate={handleNavigate} 
          onLogout={handleLogout}
        />
      )}
      {currentScreen === 'commission-rules' && (
        <CommissionRules 
          onNavigate={handleNavigate} 
          onLogout={handleLogout}
        />
      )}
      {currentScreen === 'reports' && (
        <Reports 
          onNavigate={handleNavigate} 
          onLogout={handleLogout}
          userRole={userRole!}
          agentId={currentAgentId}
        />
      )}
    </div>
  );
}

export default App;