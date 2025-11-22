import { Users, DollarSign, TrendingUp, Award, Sparkles, AlertTriangle, Target, Zap, Brain } from 'lucide-react';
import { Navigation } from './Navigation';
import { Screen } from '../App';
import { mockAgents, mockActivities, calculateTotalSales, calculateTotalCommissions } from '../data/mockData';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface AdminDashboardProps {
  onNavigate: (screen: Screen) => void;
  onLogout: () => void;
}

export function AdminDashboard({ onNavigate, onLogout }: AdminDashboardProps) {
  const totalAgents = mockAgents.filter(a => a.status === 'active').length;
  const totalSales = calculateTotalSales();
  const totalCommissions = calculateTotalCommissions();
  
  const targetAchievement = mockAgents.filter(
    a => a.currentSales >= a.salesTarget && a.status === 'active'
  ).length;

  // Sales data by month
  const salesByMonth = [
    { month: 'Jan', sales: 850000, target: 800000 },
    { month: 'Feb', sales: 920000, target: 850000 },
    { month: 'Mar', sales: 1050000, target: 900000 },
    { month: 'Apr', sales: 1180000, target: 950000 },
    { month: 'May', sales: 1350000, target: 1000000 },
    { month: 'Jun', sales: 1420000, target: 1050000 },
  ];

  // Performance by region
  const performanceByRegion = [
    { region: 'North', sales: 970000, commission: 59850 },
    { region: 'South', sales: 915000, commission: 58800 },
    { region: 'East', sales: 830000, commission: 49800 },
    { region: 'West', sales: 1095000, commission: 73075 },
  ];

  const topPerformers = [...mockAgents]
    .filter(a => a.status === 'active')
    .sort((a, b) => b.currentSales - a.currentSales)
    .slice(0, 5);

  // AI Predictions and Insights
  const aiInsights = [
    {
      id: 'insight-1',
      type: 'prediction',
      icon: Target,
      title: 'Sarah Johnson likely to exceed target by 15%',
      description: 'Based on current trajectory and historical performance patterns',
      confidence: 92,
      trend: 'positive',
    },
    {
      id: 'insight-2',
      type: 'trend',
      icon: TrendingUp,
      title: 'North region trending +20% this quarter',
      description: 'Strong momentum in Life Insurance policies',
      confidence: 88,
      trend: 'positive',
    },
    {
      id: 'insight-3',
      type: 'forecast',
      icon: DollarSign,
      title: 'Commission payout estimate: $285,000',
      description: 'Projected for end of quarter based on current sales pipeline',
      confidence: 85,
      trend: 'neutral',
    },
  ];

  const aiAlerts = [
    {
      id: 'alert-1',
      severity: 'warning',
      title: 'East Region Underperforming',
      description: 'Sales 18% below target. AI recommends increasing commission by 2% for Q3 to boost motivation.',
      action: 'Adjust Commission Rules',
      impact: 'High',
    },
    {
      id: 'alert-2',
      severity: 'info',
      title: 'Optimal Time for Health Insurance Push',
      description: 'Historical data shows 35% higher conversion rates for Health Insurance in the next 2 weeks.',
      action: 'View Campaign Details',
      impact: 'Medium',
    },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const formatActivityTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    
    if (diffMins < 60) {
      return `${diffMins} minutes ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hours ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div>
      <Navigation 
        currentScreen="admin-dashboard" 
        onNavigate={onNavigate}
        onLogout={onLogout}
        isAdmin={true}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-slate-900 mb-2">Admin Dashboard</h1>
          <p className="text-slate-600">Overview of agent performance and sales metrics</p>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-emerald-600">+3 this month</span>
            </div>
            <div className="text-slate-900 mb-1">{totalAgents}</div>
            <div className="text-slate-600">Active Agents</div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-emerald-600" />
              </div>
              <span className="text-emerald-600">+12.5%</span>
            </div>
            <div className="text-slate-900 mb-1">{formatCurrency(totalSales)}</div>
            <div className="text-slate-600">Total Sales</div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-emerald-600">+8.3%</span>
            </div>
            <div className="text-slate-900 mb-1">{formatCurrency(totalCommissions)}</div>
            <div className="text-slate-600">Total Commissions</div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-amber-600" />
              </div>
              <span className="text-slate-600">{targetAchievement} of {totalAgents}</span>
            </div>
            <div className="text-slate-900 mb-1">
              {Math.round((targetAchievement / totalAgents) * 100)}%
            </div>
            <div className="text-slate-600">Target Achievement</div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Sales Trends */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-slate-900 mb-6">Sales Trends</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesByMonth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2} name="Sales" />
                <Line type="monotone" dataKey="target" stroke="#10b981" strokeWidth={2} strokeDasharray="5 5" name="Target" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Regional Performance */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-slate-900 mb-6">Performance by Region</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceByRegion}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="region" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                />
                <Legend />
                <Bar dataKey="sales" fill="#3b82f6" name="Sales" />
                <Bar dataKey="commission" fill="#10b981" name="Commission" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Performers and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Top Performers */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-slate-900 mb-6">Top Performers</h2>
            <div className="space-y-4">
              {topPerformers.map((agent, index) => {
                const achievementPercent = Math.round((agent.currentSales / agent.salesTarget) * 100);
                return (
                  <div key={agent.id} className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      index === 0 ? 'bg-amber-100 text-amber-600' :
                      index === 1 ? 'bg-slate-200 text-slate-600' :
                      index === 2 ? 'bg-orange-100 text-orange-600' :
                      'bg-slate-100 text-slate-500'
                    }`}>
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="text-slate-900 mb-1">{agent.name}</div>
                      <div className="text-slate-600">{agent.region} Region</div>
                    </div>
                    <div className="text-right">
                      <div className="text-slate-900 mb-1">{formatCurrency(agent.currentSales)}</div>
                      <div className={`${
                        achievementPercent >= 100 ? 'text-emerald-600' : 'text-slate-600'
                      }`}>
                        {achievementPercent}% of target
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <button
              onClick={() => onNavigate('agent-management')}
              className="w-full mt-6 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
            >
              View All Agents
            </button>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-slate-900 mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {mockActivities.map((activity) => {
                const getActivityIcon = () => {
                  switch (activity.type) {
                    case 'sale':
                      return <DollarSign className="w-5 h-5 text-emerald-600" />;
                    case 'target_achieved':
                      return <Award className="w-5 h-5 text-amber-600" />;
                    case 'commission_paid':
                      return <TrendingUp className="w-5 h-5 text-blue-600" />;
                    case 'agent_added':
                      return <Users className="w-5 h-5 text-purple-600" />;
                    default:
                      return null;
                  }
                };

                return (
                  <div key={activity.id} className="flex gap-4 pb-4 border-b border-slate-100 last:border-0">
                    <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center flex-shrink-0">
                      {getActivityIcon()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-slate-900 mb-1">{activity.description}</p>
                      <p className="text-slate-500">{activity.agentName}</p>
                    </div>
                    <div className="text-slate-500 flex-shrink-0">
                      {formatActivityTime(activity.timestamp)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* AI Insights Panel */}
        <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl border-2 border-violet-200 p-6 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-violet-600 rounded-lg flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-slate-900 flex items-center gap-2">
                AI-Powered Insights
                <span className="px-2 py-1 bg-violet-600 text-white rounded-md text-xs">BETA</span>
              </h2>
              <p className="text-slate-600">Predictions based on historical data and current trends</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {aiInsights.map((insight) => {
              const IconComponent = insight.icon;
              return (
                <div key={insight.id} className="bg-white rounded-lg border border-violet-200 p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-8 h-8 bg-violet-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-5 h-5 text-violet-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-slate-900 mb-1">{insight.title}</div>
                      <div className="text-slate-600">{insight.description}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-violet-600" />
                      <span className="text-violet-600">{insight.confidence}% confidence</span>
                    </div>
                    {insight.trend === 'positive' && (
                      <TrendingUp className="w-4 h-4 text-emerald-600" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* AI Alerts */}
        <div className="space-y-4 mb-8">
          {aiAlerts.map((alert) => (
            <div 
              key={alert.id} 
              className={`rounded-xl border-2 p-6 ${
                alert.severity === 'warning' 
                  ? 'bg-amber-50 border-amber-300' 
                  : 'bg-blue-50 border-blue-300'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  alert.severity === 'warning' 
                    ? 'bg-amber-500' 
                    : 'bg-blue-500'
                }`}>
                  {alert.severity === 'warning' ? (
                    <AlertTriangle className="w-6 h-6 text-white" />
                  ) : (
                    <Zap className="w-6 h-6 text-white" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-slate-900">
                      {alert.severity === 'warning' ? '⚡ AI Alert: ' : '💡 AI Recommendation: '}
                      {alert.title}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      alert.impact === 'High' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {alert.impact} Impact
                    </span>
                  </div>
                  <p className="text-slate-700 mb-4">{alert.description}</p>
                  <button
                    onClick={() => alert.action === 'Adjust Commission Rules' 
                      ? onNavigate('commission-rules') 
                      : null
                    }
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      alert.severity === 'warning'
                        ? 'bg-amber-600 hover:bg-amber-700 text-white'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    {alert.action}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}