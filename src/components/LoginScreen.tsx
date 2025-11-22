import { useState } from 'react';
import { Shield, User, Lock, AlertCircle } from 'lucide-react';
import { UserRole } from '../App';

interface LoginScreenProps {
  onLogin: (role: UserRole, agentId?: string) => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [selectedRole, setSelectedRole] = useState<UserRole>('admin');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - in production, this would validate credentials
    if (selectedRole === 'agent') {
      onLogin(selectedRole, 'agent-001');
    } else {
      onLogin(selectedRole);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-slate-900 mb-2">Insurance Performance Tracker</h1>
          <p className="text-slate-600">Sign in to access your dashboard</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
          {showForgotPassword ? (
            <div>
              <h2 className="text-slate-900 mb-2">Reset Password</h2>
              <p className="text-slate-600 mb-6">
                Enter your email address and we'll send you a password reset link.
              </p>
              <div className="space-y-4">
                <div>
                  <label className="block text-slate-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="you@company.com"
                  />
                </div>
                <button
                  type="button"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Send Reset Link
                </button>
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(false)}
                  className="w-full text-blue-600 hover:text-blue-700"
                >
                  Back to Login
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Role Selection */}
              <div className="mb-6">
                <label className="block text-slate-700 mb-3">Select Role</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedRole('admin')}
                    className={`p-4 border-2 rounded-lg transition-all ${
                      selectedRole === 'admin'
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <Shield className={`w-6 h-6 mx-auto mb-2 ${
                      selectedRole === 'admin' ? 'text-blue-600' : 'text-slate-400'
                    }`} />
                    <div className={selectedRole === 'admin' ? 'text-blue-600' : 'text-slate-600'}>
                      Administrator
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedRole('agent')}
                    className={`p-4 border-2 rounded-lg transition-all ${
                      selectedRole === 'agent'
                        ? 'border-emerald-600 bg-emerald-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <User className={`w-6 h-6 mx-auto mb-2 ${
                      selectedRole === 'agent' ? 'text-emerald-600' : 'text-slate-400'
                    }`} />
                    <div className={selectedRole === 'agent' ? 'text-emerald-600' : 'text-slate-600'}>
                      Agent
                    </div>
                  </button>
                </div>
              </div>

              {/* Username Field */}
              <div className="mb-4">
                <label className="block text-slate-700 mb-2">Username</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your username"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="mb-6">
                <label className="block text-slate-700 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              {/* Forgot Password Link */}
              <div className="flex items-center justify-end mb-6">
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-blue-600 hover:text-blue-700"
                >
                  Forgot password?
                </button>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className={`w-full py-3 rounded-lg text-white transition-colors ${
                  selectedRole === 'admin'
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-emerald-600 hover:bg-emerald-700'
                }`}
              >
                Sign In as {selectedRole === 'admin' ? 'Administrator' : 'Agent'}
              </button>

              {/* Demo Credentials Info */}
              <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg flex gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="text-slate-700">
                  <div>Demo Mode - Use any credentials to login</div>
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-slate-600">
          <p>© 2025 Insurance Performance Tracker. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
