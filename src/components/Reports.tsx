import { useState } from 'react';
import { Download, Calendar, Filter, TrendingUp, Users, DollarSign, Sparkles, Send, Brain, Zap } from 'lucide-react';
import { Navigation } from './Navigation';
import { Screen, UserRole } from '../App';
import { mockAgents, mockPolicySales, getAgentById, getSalesByAgentId } from '../data/mockData';
import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ReportsProps {
  onNavigate: (screen: Screen) => void;
  onLogout: () => void;
  userRole: UserRole;
  agentId: string | null;
}

export function Reports({ onNavigate, onLogout, userRole, agentId }: ReportsProps) {
  const [dateRange, setDateRange] = useState('last-6-months');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedAgent, setSelectedAgent] = useState('all');
  const [naturalQuery, setNaturalQuery] = useState('');
  const [showAIReport, setShowAIReport] = useState(false);
  const [aiReportData, setAIReportData] = useState<any>(null);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);

  const regions = ['all', 'North', 'South', 'East', 'West'];
  
  // Get agent-specific data if user is an agent
  const isAgent = userRole === 'agent';
  const currentAgent = isAgent && agentId ? getAgentById(agentId) : null;
  const agentSales = isAgent && agentId ? getSalesByAgentId(agentId) : mockPolicySales;
  
  // Filter data based on user role
  const displayAgents = isAgent && currentAgent ? [currentAgent] : mockAgents.filter(a => a.status === 'active');

  // Sales by Policy Type
  const salesByPolicyType = [
    { name: 'Life Insurance', value: 1450000, count: 45, color: '#3b82f6' },
    { name: 'Health Insurance', value: 850000, count: 68, color: '#10b981' },
    { name: 'Auto Insurance', value: 420000, count: 52, color: '#8b5cf6' },
  ];

  // Monthly Revenue
  const monthlyRevenue = [
    { month: 'Jan', revenue: 385000, target: 350000, policies: 25 },
    { month: 'Feb', revenue: 420000, target: 380000, policies: 28 },
    { month: 'Mar', revenue: 465000, target: 400000, policies: 32 },
    { month: 'Apr', revenue: 510000, target: 450000, policies: 35 },
    { month: 'May', revenue: 545000, target: 480000, policies: 38 },
    { month: 'Jun', revenue: 595000, target: 520000, policies: 42 },
  ];

  // Regional Performance
  const regionalPerformance = [
    { region: 'North', revenue: 970000, agents: 2, avgPerAgent: 485000 },
    { region: 'South', revenue: 915000, agents: 2, avgPerAgent: 457500 },
    { region: 'East', revenue: 830000, agents: 2, avgPerAgent: 415000 },
    { region: 'West', revenue: 1095000, agents: 2, avgPerAgent: 547500 },
  ];

  // Agent Performance Comparison
  const agentComparison = displayAgents
    .slice(0, 6)
    .map(agent => ({
      name: agent.name.split(' ')[0],
      sales: agent.currentSales,
      target: agent.salesTarget,
      commission: agent.commission,
    }));

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const handleExport = (format: 'csv' | 'excel') => {
    alert(`Exporting report as ${format.toUpperCase()}...`);
  };

  const handleGenerateAIReport = async () => {
    setIsGeneratingReport(true);
    // Simulate AI report generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate different reports based on the query
    let reportData;
    const query = naturalQuery.toLowerCase();
    
    if (query.includes('growth potential') || query.includes('top 3') || query.includes('top agents')) {
      reportData = {
        title: 'Top 3 Agents by Growth Potential',
        query: naturalQuery || 'Show me top 3 agents by growth potential',
        insights: [
          {
            agent: 'David Thompson',
            score: 95,
            reason: 'Exceeded target by 11% with strong momentum in West region. Historical data shows 28% quarter-over-quarter growth.',
            growthPotential: '+35%',
            recommendation: 'Increase sales target by 15% and provide mentorship opportunities.',
          },
          {
            agent: 'Jennifer Martinez',
            score: 88,
            reason: 'Consistently meeting targets with 103% achievement. Strong performance in Life Insurance segment.',
            growthPotential: '+22%',
            recommendation: 'Cross-train in Health Insurance to diversify portfolio.',
          },
          {
            agent: 'Michael Chen',
            score: 85,
            reason: 'Outstanding 116% target achievement. Leader in South region with excellent customer retention.',
            growthPotential: '+18%',
            recommendation: 'Consider for team lead role to scale expertise.',
          },
        ],
        summary: 'Based on performance trends, sales velocity, and market conditions, these three agents show the highest potential for continued growth in the next quarter.',
      };
    } else if (query.includes('underperforming') || query.includes('struggling')) {
      reportData = {
        title: 'Underperforming Agents Analysis',
        query: naturalQuery,
        insights: [
          {
            agent: 'Emily Rodriguez',
            score: 45,
            reason: 'Currently at 95% of target. Recent 2-month slowdown detected.',
            growthPotential: 'Needs Support',
            recommendation: 'Provide additional training and adjust territory coverage.',
          },
          {
            agent: 'Robert Anderson',
            score: 52,
            reason: 'At 94% of target with declining monthly trends.',
            growthPotential: 'Needs Support',
            recommendation: 'Review commission structure and provide coaching.',
          },
        ],
        summary: 'Two agents require immediate attention and support to get back on track with their targets.',
      };
    } else {
      reportData = {
        title: 'AI-Generated Performance Report',
        query: naturalQuery || 'General performance overview',
        insights: [
          {
            metric: 'Overall Performance',
            value: '87%',
            trend: 'up',
            description: 'Company-wide target achievement is strong at 87%, up 5% from last quarter.',
          },
          {
            metric: 'Revenue Growth',
            value: '+15.3%',
            trend: 'up',
            description: 'Total revenue increased by 15.3% compared to previous period, driven by Life Insurance sales.',
          },
          {
            metric: 'Agent Productivity',
            value: '20.6 policies/agent',
            trend: 'up',
            description: 'Average productivity per agent increased, indicating improved efficiency.',
          },
        ],
        summary: 'Overall company performance is strong with positive trends across all key metrics. Focus areas identified for East region.',
      };
    }
    
    setAIReportData(reportData);
    setShowAIReport(true);
    setIsGeneratingReport(false);
  };

  const suggestedQueries = [
    'Show me top 3 agents by growth potential',
    'Which regions are underperforming?',
    'Analyze Life Insurance policy trends',
    'Compare North vs South region performance',
    'Predict next quarter commission payouts',
    'Identify agents who need additional support',
  ];

  return (
    <div>
      <Navigation 
        currentScreen="reports" 
        onNavigate={onNavigate}
        onLogout={onLogout}
        isAdmin={true}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-slate-900 mb-2">Reports & Analytics</h1>
            <p className="text-slate-600">Comprehensive sales and performance insights</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => handleExport('csv')}
              className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <Download className="w-5 h-5" />
              Export CSV
            </button>
            <button
              onClick={() => handleExport('excel')}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              <Download className="w-5 h-5" />
              Export Excel
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Filter className="w-5 h-5 text-slate-600" />
            <h2 className="text-slate-900">Filters</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-slate-700 mb-2">Date Range</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="w-full pl-11 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="last-month">Last Month</option>
                  <option value="last-3-months">Last 3 Months</option>
                  <option value="last-6-months">Last 6 Months</option>
                  <option value="last-year">Last Year</option>
                  <option value="custom">Custom Range</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-slate-700 mb-2">Region</label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Regions</option>
                {regions.slice(1).map(region => (
                  <option key={region} value={region}>{region} Region</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-700 mb-2">Agent</label>
              <select
                value={selectedAgent}
                onChange={(e) => setSelectedAgent(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Agents</option>
                {mockAgents.filter(a => a.status === 'active').map(agent => (
                  <option key={agent.id} value={agent.id}>{agent.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-slate-600">Total Revenue</div>
                <div className="text-slate-900">{formatCurrency(2920000)}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-emerald-600">
              <TrendingUp className="w-4 h-4" />
              <span>+15.3% from last period</span>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <div className="text-slate-600">Policies Sold</div>
                <div className="text-slate-900">165</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-emerald-600">
              <TrendingUp className="w-4 h-4" />
              <span>+22 from last period</span>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <div className="text-slate-600">Avg Policy Value</div>
                <div className="text-slate-900">{formatCurrency(17697)}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-emerald-600">
              <TrendingUp className="w-4 h-4" />
              <span>+8.1% from last period</span>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Sales by Policy Type */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-slate-900 mb-6">Sales Distribution by Policy Type</h2>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={salesByPolicyType}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name.split(' ')[0]} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {salesByPolicyType.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-6">
              {salesByPolicyType.map((item) => (
                <div key={item.name} className="text-center">
                  <div 
                    className="w-4 h-4 rounded-full mx-auto mb-2" 
                    style={{ backgroundColor: item.color }}
                  />
                  <div className="text-slate-700">{formatCurrency(item.value)}</div>
                  <div className="text-slate-500">{item.count} policies</div>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly Revenue Trend */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-slate-900 mb-6">Monthly Revenue Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} name="Revenue" />
                <Line type="monotone" dataKey="target" stroke="#10b981" strokeWidth={2} strokeDasharray="5 5" name="Target" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Regional Performance */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-8">
          <h2 className="text-slate-900 mb-6">Regional Performance Analysis</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={regionalPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="region" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                formatter={(value: number) => formatCurrency(value)}
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
              />
              <Legend />
              <Bar dataKey="revenue" fill="#3b82f6" name="Total Revenue" />
              <Bar dataKey="avgPerAgent" fill="#10b981" name="Avg per Agent" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Agent Performance Comparison */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-8">
          <h2 className="text-slate-900 mb-6">Agent Performance Comparison</h2>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={agentComparison}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                formatter={(value: number) => formatCurrency(value)}
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
              />
              <Legend />
              <Bar dataKey="sales" fill="#3b82f6" name="Current Sales" />
              <Bar dataKey="target" fill="#e2e8f0" name="Target" />
              <Bar dataKey="commission" fill="#10b981" name="Commission Earned" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Detailed Statistics Table */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-8">
          <h2 className="text-slate-900 mb-6">Detailed Performance Statistics</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-slate-200">
                <tr>
                  <th className="text-left px-4 py-3 text-slate-700">Agent</th>
                  <th className="text-left px-4 py-3 text-slate-700">Region</th>
                  <th className="text-left px-4 py-3 text-slate-700">Policies Sold</th>
                  <th className="text-left px-4 py-3 text-slate-700">Total Sales</th>
                  <th className="text-left px-4 py-3 text-slate-700">Target</th>
                  <th className="text-left px-4 py-3 text-slate-700">Achievement</th>
                  <th className="text-left px-4 py-3 text-slate-700">Commission</th>
                </tr>
              </thead>
              <tbody>
                {mockAgents.filter(a => a.status === 'active').map((agent) => {
                  const achievement = Math.round((agent.currentSales / agent.salesTarget) * 100);
                  const policiesSold = mockPolicySales.filter(s => s.agentId === agent.id).length;
                  return (
                    <tr key={agent.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="px-4 py-4 text-slate-900">{agent.name}</td>
                      <td className="px-4 py-4 text-slate-700">{agent.region}</td>
                      <td className="px-4 py-4 text-slate-700">{policiesSold}</td>
                      <td className="px-4 py-4 text-slate-700">{formatCurrency(agent.currentSales)}</td>
                      <td className="px-4 py-4 text-slate-700">{formatCurrency(agent.salesTarget)}</td>
                      <td className="px-4 py-4">
                        <span className={achievement >= 100 ? 'text-emerald-600' : 'text-slate-700'}>
                          {achievement}%
                        </span>
                      </td>
                      <td className="px-4 py-4 text-emerald-600">{formatCurrency(agent.commission)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Smart Report Generator */}
        <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl border-2 border-violet-200 p-6 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-violet-600 rounded-lg flex items-center justify-center">
              <Brain className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-slate-900 flex items-center gap-2">
                🤖 AI Smart Report Generator
                <span className="px-2 py-1 bg-violet-600 text-white rounded-md text-xs">POWERED BY AI</span>
              </h2>
              <p className="text-slate-600">Ask questions in natural language and get instant insights</p>
            </div>
          </div>

          {/* Natural Language Query Input */}
          <div className="mb-4">
            <label className="block text-slate-700 mb-2">Ask a question about your data</label>
            <div className="relative">
              <input
                type="text"
                value={naturalQuery}
                onChange={(e) => setNaturalQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleGenerateAIReport()}
                placeholder="e.g., Show me top 3 agents by growth potential"
                className="w-full pl-4 pr-32 py-3 border-2 border-violet-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              />
              <button
                onClick={handleGenerateAIReport}
                disabled={isGeneratingReport}
                className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2 px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors disabled:opacity-50"
              >
                {isGeneratingReport ? (
                  <>
                    <Sparkles className="w-5 h-5 animate-pulse" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Generate
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Suggested Queries */}
          <div className="mb-6">
            <div className="text-slate-600 mb-2">Try these examples:</div>
            <div className="flex flex-wrap gap-2">
              {suggestedQueries.map((query, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setNaturalQuery(query);
                    setShowAIReport(false);
                  }}
                  className="px-3 py-1 bg-white border border-violet-300 rounded-full text-slate-700 hover:bg-violet-100 hover:border-violet-400 transition-colors"
                >
                  {query}
                </button>
              ))}
            </div>
          </div>

          {/* AI Generated Report Results */}
          {showAIReport && aiReportData && (
            <div className="bg-white rounded-lg border border-violet-300 p-6 mt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-6 h-6 text-violet-600" />
                  <h3 className="text-slate-900">{aiReportData.title}</h3>
                </div>
                <button
                  onClick={() => handleExport('excel')}
                  className="flex items-center gap-2 px-3 py-1 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>
              
              <div className="mb-4 p-3 bg-violet-50 border border-violet-200 rounded-lg">
                <div className="text-slate-600">Query: "{aiReportData.query}"</div>
              </div>

              <div className="mb-6">
                <h4 className="text-slate-900 mb-2">Summary</h4>
                <p className="text-slate-700">{aiReportData.summary}</p>
              </div>

              {aiReportData.insights && aiReportData.insights[0]?.agent && (
                <div>
                  <h4 className="text-slate-900 mb-4">Detailed Analysis</h4>
                  <div className="space-y-4">
                    {aiReportData.insights.map((insight: any, index: number) => (
                      <div key={index} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              index === 0 ? 'bg-amber-100 text-amber-600' :
                              index === 1 ? 'bg-slate-200 text-slate-600' :
                              'bg-orange-100 text-orange-600'
                            }`}>
                              {index + 1}
                            </div>
                            <div>
                              <div className="text-slate-900">{insight.agent}</div>
                              <div className="text-slate-600">AI Score: {insight.score}/100</div>
                            </div>
                          </div>
                          <div className={`px-3 py-1 rounded-full ${
                            insight.growthPotential.includes('+') 
                              ? 'bg-emerald-100 text-emerald-700' 
                              : 'bg-amber-100 text-amber-700'
                          }`}>
                            {insight.growthPotential}
                          </div>
                        </div>
                        <div className="text-slate-700 mb-2">{insight.reason}</div>
                        <div className="flex items-start gap-2 p-2 bg-blue-50 border border-blue-200 rounded">
                          <Zap className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                          <div className="text-blue-800">
                            <span className="font-medium">Recommendation:</span> {insight.recommendation}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {aiReportData.insights && aiReportData.insights[0]?.metric && (
                <div>
                  <h4 className="text-slate-900 mb-4">Key Metrics</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {aiReportData.insights.map((insight: any, index: number) => (
                      <div key={index} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                        <div className="text-slate-600 mb-1">{insight.metric}</div>
                        <div className="text-slate-900 mb-2 flex items-center gap-2">
                          {insight.value}
                          {insight.trend === 'up' && <TrendingUp className="w-4 h-4 text-emerald-600" />}
                        </div>
                        <div className="text-slate-600">{insight.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}