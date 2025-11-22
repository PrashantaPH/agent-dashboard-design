import { Target, DollarSign, TrendingUp, Award, Calendar, Sparkles, Brain, Lightbulb, Plus, Upload, RefreshCw, X, Download } from 'lucide-react';
import { Navigation } from './Navigation';
import { Screen } from '../App';
import { getAgentById, getSalesByAgentId } from '../data/mockData';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState } from 'react';

interface AgentDashboardProps {
  agentId: string;
  onNavigate: (screen: Screen) => void;
  onLogout: () => void;
}

export function AgentDashboard({ agentId, onNavigate, onLogout }: AgentDashboardProps) {
  const agent = getAgentById(agentId);
  const initialSales = getSalesByAgentId(agentId);
  
  const [sales, setSales] = useState(initialSales);
  const [showAddPolicyModal, setShowAddPolicyModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importFile, setImportFile] = useState<File | null>(null);
  const [newPolicy, setNewPolicy] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    policyType: 'Life' as 'Life' | 'Health' | 'Auto',
    premiumAmount: '',
    tenure: '',
    startDate: new Date().toISOString().split('T')[0],
  });

  if (!agent) {
    return <div>Agent not found</div>;
  }

  const achievement = Math.round((agent.currentSales / agent.salesTarget) * 100);
  const totalPolicies = sales.length;
  const activePolicies = sales.filter(s => s.status === 'active').length;

  // Monthly performance data
  const monthlyPerformance = [
    { month: 'Jan', sales: 85000, commission: 5100 },
    { month: 'Feb', sales: 92000, commission: 5520 },
    { month: 'Mar', sales: 88000, commission: 5280 },
    { month: 'Apr', sales: 105000, commission: 6300 },
    { month: 'May', sales: 98000, commission: 5880 },
    { month: 'Jun', sales: 107000, commission: 6420 },
  ];

  // Sales by policy type
  const salesByType = [
    { type: 'Life', count: 12, value: 280000 },
    { type: 'Health', count: 18, value: 135000 },
    { type: 'Auto', count: 15, value: 60000 },
  ];

  // AI-powered personalized insights for the agent
  const aiPersonalInsights = [
    {
      id: 'ai-1',
      title: 'You\'re on track to exceed your target by 15%!',
      description: 'Keep up the great work. At this pace, you\'ll finish the quarter strong.',
      type: 'success',
    },
    {
      id: 'ai-2',
      title: 'Best time to contact leads: 2-4 PM',
      description: 'Your historical data shows 45% higher conversion rates during this window.',
      type: 'tip',
    },
    {
      id: 'ai-3',
      title: 'Life Insurance policies trending high',
      description: 'Consider focusing on Life Insurance this week - 23% higher demand predicted.',
      type: 'opportunity',
    },
  ];

  // AI Performance Coach Insights
  const aiCoachInsights = [
    {
      id: 'coach-1',
      icon: '🎯',
      message: "You're 95% to target - on track for bonus!",
      type: 'achievement',
    },
    {
      id: 'coach-2',
      icon: '💡',
      message: 'Try focusing on Health Insurance - 35% higher conversion in your region',
      type: 'recommendation',
    },
    {
      id: 'coach-3',
      icon: '👍',
      message: 'Your Life Insurance sales are 20% above team average',
      type: 'praise',
    },
  ];

  // AI Smart Goal Setting
  const aiGoals = {
    currentMonth: { target: 55000, confidence: 92 },
    nextMonth: { target: 58000, confidence: 87 },
    quarterEnd: { target: 175000, confidence: 85 },
  };

  // AI Predictive Commission
  const aiCommissionForecast = {
    thisMonth: { amount: 4200, status: 'confirmed' },
    nextMonth: { amount: 4800, status: 'projected' },
    quarterEnd: { amount: 14500, status: 'total' },
  };

  // AI Sales Tips
  const aiSalesTips = [
    {
      id: 'tip-1',
      icon: '📞',
      tip: 'Contact leads from Q2 - 45% conversion potential',
      priority: 'high',
    },
    {
      id: 'tip-2',
      icon: '🔄',
      tip: 'Upsell Auto to your Life clients - 60% success rate',
      priority: 'medium',
    },
    {
      id: 'tip-3',
      icon: '⏰',
      tip: 'Avoid cold calls on Wednesdays - low response days',
      priority: 'low',
    },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleAddPolicy = () => {
    const newSale = {
      id: `policy-${sales.length + 1}`,
      policyNumber: `POL-${sales.length + 1}`,
      customerName: `${newPolicy.firstName} ${newPolicy.lastName}`,
      policyType: newPolicy.policyType,
      premiumAmount: parseFloat(newPolicy.premiumAmount),
      tenure: parseInt(newPolicy.tenure),
      commission: parseFloat(newPolicy.premiumAmount) * 0.15,
      date: newPolicy.startDate,
      status: 'active',
    };
    setSales([...sales, newSale]);
    setShowAddPolicyModal(false);
    setNewPolicy({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      policyType: 'Life' as 'Life' | 'Health' | 'Auto',
      premiumAmount: '',
      tenure: '',
      startDate: new Date().toISOString().split('T')[0],
    });
  };

  return (
    <div>
      <Navigation 
        currentScreen="agent-dashboard" 
        onNavigate={onNavigate}
        onLogout={onLogout}
        isAdmin={false}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-slate-900 mb-2">Welcome back, {agent.name.split(' ')[0]}!</h1>
          <p className="text-slate-600">Here's your performance overview for this period</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="text-slate-900 mb-1">{formatCurrency(agent.salesTarget)}</div>
            <div className="text-slate-600">Sales Target</div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-emerald-600" />
              </div>
              <span className={achievement >= 100 ? 'text-emerald-600' : 'text-slate-600'}>
                {achievement}%
              </span>
            </div>
            <div className="text-slate-900 mb-1">{formatCurrency(agent.currentSales)}</div>
            <div className="text-slate-600">Current Sales</div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="text-slate-900 mb-1">{formatCurrency(agent.commission)}</div>
            <div className="text-slate-600">Total Commission</div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-amber-600" />
              </div>
              <span className="text-slate-600">{activePolicies} active</span>
            </div>
            <div className="text-slate-900 mb-1">{totalPolicies}</div>
            <div className="text-slate-600">Policies Sold</div>
          </div>
        </div>

        {/* Target Progress */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-8">
          <h2 className="text-slate-900 mb-4">Target Achievement</h2>
          <div className="flex items-center gap-4 mb-2">
            <div className="flex-1 h-4 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all ${
                  achievement >= 100 ? 'bg-emerald-500' : 
                  achievement >= 75 ? 'bg-blue-500' : 
                  'bg-amber-500'
                }`}
                style={{ width: `${Math.min(achievement, 100)}%` }}
              />
            </div>
            <div className={`${achievement >= 100 ? 'text-emerald-600' : 'text-slate-900'}`}>
              {achievement}%
            </div>
          </div>
          <div className="flex items-center justify-between text-slate-600">
            <span>{formatCurrency(agent.currentSales)} of {formatCurrency(agent.salesTarget)}</span>
            <span className={achievement >= 100 ? 'text-emerald-600' : ''}>
              {achievement >= 100 
                ? `🎉 Target Exceeded by ${formatCurrency(agent.currentSales - agent.salesTarget)}` 
                : `${formatCurrency(agent.salesTarget - agent.currentSales)} remaining`
              }
            </span>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Monthly Performance */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-slate-900 mb-6">Monthly Performance</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                />
                <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2} name="Sales" />
                <Line type="monotone" dataKey="commission" stroke="#10b981" strokeWidth={2} name="Commission" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Sales by Policy Type */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-slate-900 mb-6">Sales by Policy Type</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesByType}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="type" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                />
                <Bar dataKey="value" fill="#3b82f6" name="Sales Value" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI-Powered Personalized Insights */}
        <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl border-2 border-violet-200 p-6 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-violet-600 rounded-lg flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-slate-900 flex items-center gap-2">
                🤖 Your AI Performance Coach
                <span className="px-2 py-1 bg-violet-600 text-white rounded-md text-xs">PERSONALIZED</span>
              </h2>
              <p className="text-slate-600">Smart recommendations based on your performance data</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {aiCoachInsights.map(insight => (
              <div key={insight.id} className="bg-white rounded-lg border border-violet-200 p-4">
                <div className="flex items-start gap-3">
                  <div className={`text-3xl ${
                    insight.type === 'achievement' ? '' : 
                    insight.type === 'recommendation' ? '' : 
                    ''
                  }`}>
                    {insight.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-slate-900">{insight.message}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Smart Goal Setting & Commission Forecast Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* AI Smart Goal Setting */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-slate-900">🎯 AI-Recommended Targets</h3>
                <p className="text-slate-600">Based on your performance history and market trends</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-white rounded-lg border border-blue-200 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-600">This Month</span>
                  <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-md text-xs">{aiGoals.currentMonth.confidence}% confidence</span>
                </div>
                <div className="text-slate-900 flex items-center gap-2">
                  {formatCurrency(aiGoals.currentMonth.target)}
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                </div>
              </div>
              <div className="bg-white rounded-lg border border-blue-200 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-600">Next Month (AI Suggested)</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-xs">{aiGoals.nextMonth.confidence}% confidence</span>
                </div>
                <div className="text-slate-900 flex items-center gap-2">
                  {formatCurrency(aiGoals.nextMonth.target)}
                  <Sparkles className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <div className="bg-white rounded-lg border border-blue-200 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-600">Quarter End</span>
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-md text-xs">{aiGoals.quarterEnd.confidence}% confidence</span>
                </div>
                <div className="text-slate-900">{formatCurrency(aiGoals.quarterEnd.target)}</div>
              </div>
            </div>
          </div>

          {/* AI Predictive Commission Calculator */}
          <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl border-2 border-emerald-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-slate-900">💰 Commission Forecast</h3>
                <p className="text-slate-600">AI-powered earnings predictions</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-white rounded-lg border border-emerald-200 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-600">This Month</span>
                  <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-md text-xs">✅ {aiCommissionForecast.thisMonth.status}</span>
                </div>
                <div className="text-emerald-600">{formatCurrency(aiCommissionForecast.thisMonth.amount)}</div>
              </div>
              <div className="bg-white rounded-lg border border-emerald-200 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-600">Next Month (Projected)</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-xs">{aiCommissionForecast.nextMonth.status}</span>
                </div>
                <div className="text-slate-900 flex items-center gap-2">
                  {formatCurrency(aiCommissionForecast.nextMonth.amount)}
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                </div>
              </div>
              <div className="bg-white rounded-lg border border-emerald-200 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-600">Quarter End Total</span>
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-md text-xs">{aiCommissionForecast.quarterEnd.status}</span>
                </div>
                <div className="text-slate-900">{formatCurrency(aiCommissionForecast.quarterEnd.amount)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Intelligent Sales Tips */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border-2 border-amber-200 p-6 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-amber-600 rounded-lg flex items-center justify-center">
              <Lightbulb className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-slate-900">💡 AI Sales Suggestions</h3>
              <p className="text-slate-600">Intelligent tips to boost your performance</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {aiSalesTips.map(tip => (
              <div key={tip.id} className={`bg-white rounded-lg border-2 p-4 ${
                tip.priority === 'high' ? 'border-red-300' :
                tip.priority === 'medium' ? 'border-amber-300' :
                'border-green-300'
              }`}>
                <div className="flex items-start gap-3">
                  <div className="text-3xl">{tip.icon}</div>
                  <div className="flex-1">
                    <div className={`px-2 py-1 rounded-md text-xs mb-2 inline-block ${
                      tip.priority === 'high' ? 'bg-red-100 text-red-700' :
                      tip.priority === 'medium' ? 'bg-amber-100 text-amber-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {tip.priority.toUpperCase()} PRIORITY
                    </div>
                    <div className="text-slate-900">{tip.tip}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Quick Actions */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-8">
          <h3 className="text-slate-900 mb-4">🚀 AI-Powered Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center gap-3 p-4 bg-violet-50 border border-violet-200 rounded-lg hover:bg-violet-100 transition-colors">
              <Sparkles className="w-6 h-6 text-violet-600" />
              <div className="text-left">
                <div className="text-slate-900">AI-Suggested Leads</div>
                <div className="text-slate-600">12 high-value prospects</div>
              </div>
            </button>
            <button className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors">
              <Calendar className="w-6 h-6 text-blue-600" />
              <div className="text-left">
                <div className="text-slate-900">Best Time to Call</div>
                <div className="text-slate-600">Today: 2:00 PM - 4:00 PM</div>
              </div>
            </button>
            <button className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-lg hover:bg-emerald-100 transition-colors">
              <DollarSign className="w-6 h-6 text-emerald-600" />
              <div className="text-left">
                <div className="text-slate-900">Commission Optimizer</div>
                <div className="text-slate-600">Maximize your earnings</div>
              </div>
            </button>
          </div>
        </div>

        {/* Recent Policy Sales */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-slate-900">Recent Policy Sales</h2>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowAddPolicyModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Add New Policy
              </button>
              <button
                onClick={() => setShowImportModal(true)}
                className="flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <Upload className="w-5 h-5" />
                Import Customers
              </button>
              <button 
                onClick={() => setSales(getSalesByAgentId(agentId))}
                className="flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <RefreshCw className="w-5 h-5" />
                Refresh
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-slate-200">
                <tr>
                  <th className="text-left px-4 py-3 text-slate-700">Policy Number</th>
                  <th className="text-left px-4 py-3 text-slate-700">Customer</th>
                  <th className="text-left px-4 py-3 text-slate-700">Type</th>
                  <th className="text-left px-4 py-3 text-slate-700">Premium</th>
                  <th className="text-left px-4 py-3 text-slate-700">Tenure</th>
                  <th className="text-left px-4 py-3 text-slate-700">Commission</th>
                  <th className="text-left px-4 py-3 text-slate-700">Date</th>
                  <th className="text-left px-4 py-3 text-slate-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {sales.map((sale) => (
                  <tr key={sale.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-4 py-4 text-slate-900">{sale.policyNumber}</td>
                    <td className="px-4 py-4 text-slate-700">{sale.customerName}</td>
                    <td className="px-4 py-4">
                      <span className={`px-3 py-1 rounded-full ${
                        sale.policyType === 'Life' ? 'bg-blue-100 text-blue-700' :
                        sale.policyType === 'Health' ? 'bg-emerald-100 text-emerald-700' :
                        'bg-purple-100 text-purple-700'
                      }`}>
                        {sale.policyType}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-slate-700">{formatCurrency(sale.premiumAmount)}</td>
                    <td className="px-4 py-4 text-slate-700">{sale.tenure} years</td>
                    <td className="px-4 py-4 text-emerald-600">{formatCurrency(sale.commission)}</td>
                    <td className="px-4 py-4 text-slate-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {formatDate(sale.date)}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`px-3 py-1 rounded-full ${
                        sale.status === 'active' ? 'bg-emerald-100 text-emerald-700' :
                        sale.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                        'bg-slate-100 text-slate-600'
                      }`}>
                        {sale.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {sales.length === 0 && (
            <div className="text-center py-12 text-slate-500">
              No policy sales recorded yet
            </div>
          )}
        </div>

        {/* Add Policy Modal */}
        {showAddPolicyModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-slate-900 mb-1">Add New Policy</h3>
                  <p className="text-slate-600">Create a new policy record for your customer</p>
                </div>
                <button 
                  className="text-slate-500 hover:text-slate-900 transition-colors" 
                  onClick={() => setShowAddPolicyModal(false)}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <form onSubmit={(e) => e.preventDefault()}>
                {/* Customer Information Section */}
                <div className="mb-6">
                  <h4 className="text-slate-900 mb-4 pb-2 border-b border-slate-200">Customer Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 mb-2">First Name *</label>
                      <input
                        type="text"
                        required
                        value={newPolicy.firstName}
                        onChange={(e) => setNewPolicy({ ...newPolicy, firstName: e.target.value })}
                        placeholder="Enter first name"
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 mb-2">Last Name *</label>
                      <input
                        type="text"
                        required
                        value={newPolicy.lastName}
                        onChange={(e) => setNewPolicy({ ...newPolicy, lastName: e.target.value })}
                        placeholder="Enter last name"
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-slate-700 mb-2">Email</label>
                      <input
                        type="email"
                        value={newPolicy.email}
                        onChange={(e) => setNewPolicy({ ...newPolicy, email: e.target.value })}
                        placeholder="customer@example.com"
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 mb-2">Phone</label>
                      <input
                        type="tel"
                        value={newPolicy.phone}
                        onChange={(e) => setNewPolicy({ ...newPolicy, phone: e.target.value })}
                        placeholder="(555) 123-4567"
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <label className="block text-slate-700 mb-2">Address</label>
                    <input
                      type="text"
                      value={newPolicy.address}
                      onChange={(e) => setNewPolicy({ ...newPolicy, address: e.target.value })}
                      placeholder="123 Main Street, City, State ZIP"
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Policy Details Section */}
                <div className="mb-6">
                  <h4 className="text-slate-900 mb-4 pb-2 border-b border-slate-200">Policy Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 mb-2">Policy Type *</label>
                      <select
                        required
                        value={newPolicy.policyType}
                        onChange={(e) => setNewPolicy({ ...newPolicy, policyType: e.target.value as 'Life' | 'Health' | 'Auto' })}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="Life">Life Insurance</option>
                        <option value="Health">Health Insurance</option>
                        <option value="Auto">Auto Insurance</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-700 mb-2">Start Date *</label>
                      <input
                        type="date"
                        required
                        value={newPolicy.startDate}
                        onChange={(e) => setNewPolicy({ ...newPolicy, startDate: e.target.value })}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-slate-700 mb-2">Premium Amount ($) *</label>
                      <input
                        type="number"
                        required
                        min="0"
                        step="0.01"
                        value={newPolicy.premiumAmount}
                        onChange={(e) => setNewPolicy({ ...newPolicy, premiumAmount: e.target.value })}
                        placeholder="25000"
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 mb-2">Tenure (years) *</label>
                      <input
                        type="number"
                        required
                        min="1"
                        max="30"
                        value={newPolicy.tenure}
                        onChange={(e) => setNewPolicy({ ...newPolicy, tenure: e.target.value })}
                        placeholder="10"
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Commission Preview */}
                  {newPolicy.premiumAmount && (
                    <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-700">Estimated Commission (15%):</span>
                        <span className="text-emerald-600">
                          {formatCurrency(parseFloat(newPolicy.premiumAmount) * 0.15)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => setShowAddPolicyModal(false)}
                    className="flex-1 px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleAddPolicy}
                    disabled={!newPolicy.firstName || !newPolicy.lastName || !newPolicy.premiumAmount || !newPolicy.tenure}
                    className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Save Policy
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Import Modal */}
        {showImportModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-slate-900 mb-1">Import Customers</h3>
                  <p className="text-slate-600">Upload a CSV file to import customer data</p>
                </div>
                <button 
                  className="text-slate-500 hover:text-slate-900 transition-colors" 
                  onClick={() => setShowImportModal(false)}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <form onSubmit={(e) => e.preventDefault()}>
                {/* File Upload Section */}
                <div className="mb-6">
                  <h4 className="text-slate-900 mb-4 pb-2 border-b border-slate-200">Upload CSV File</h4>
                  
                  {/* Download Template */}
                  <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <div className="text-slate-900 mb-1">📄 Sample CSV Format</div>
                        <div className="text-slate-600">Download our template to ensure proper formatting</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const csvContent = `First Name,Last Name,Email,Phone,Address,Policy Type,Premium Amount,Tenure,Start Date\nJohn,Doe,john.doe@email.com,(555) 123-4567,123 Main St City State 12345,Life,25000,10,2024-01-15\nJane,Smith,jane.smith@email.com,(555) 987-6543,456 Oak Ave City State 67890,Health,15000,5,2024-02-20\nRobert,Johnson,robert.j@email.com,(555) 456-7890,789 Pine Rd City State 11111,Auto,8000,3,2024-03-10`;
                          const blob = new Blob([csvContent], { type: 'text/csv' });
                          const url = window.URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = 'customer_import_template.csv';
                          a.click();
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Download className="w-5 h-5" />
                        Download Template
                      </button>
                    </div>
                  </div>

                  {/* Format Guide */}
                  <div className="mb-4 p-4 bg-slate-50 border border-slate-200 rounded-lg">
                    <div className="text-slate-900 mb-2">Required CSV Format:</div>
                    <div className="text-slate-600 font-mono bg-white p-3 rounded border border-slate-200 overflow-x-auto">
                      First Name,Last Name,Email,Phone,Address,Policy Type,Premium Amount,Tenure,Start Date
                    </div>
                    <div className="mt-3 space-y-1 text-slate-600">
                      <div>• <strong>Policy Type:</strong> Life, Health, or Auto</div>
                      <div>• <strong>Premium Amount:</strong> Numeric value (e.g., 25000)</div>
                      <div>• <strong>Tenure:</strong> Number of years (e.g., 10)</div>
                      <div>• <strong>Start Date:</strong> Format YYYY-MM-DD (e.g., 2024-01-15)</div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 mb-2">Select CSV File *</label>
                    <input
                      type="file"
                      required
                      accept=".csv"
                      onChange={(e) => setImportFile(e.target.files ? e.target.files[0] : null)}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {importFile && (
                      <div className="mt-2 text-emerald-600 flex items-center gap-2">
                        ✅ File selected: {importFile.name}
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => setShowImportModal(false)}
                    className="flex-1 px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (importFile) {
                        alert(`Importing ${importFile.name}... 5 customers added successfully!`);
                        setShowImportModal(false);
                        setImportFile(null);
                      }
                    }}
                    disabled={!importFile}
                    className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Import Customers
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}