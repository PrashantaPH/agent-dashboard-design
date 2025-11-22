import { useState } from 'react';
import { Search, Plus, Edit2, Trash2, X, MapPin, Phone, Mail } from 'lucide-react';
import { Navigation } from './Navigation';
import { Screen } from '../App';
import { mockAgents, Agent } from '../data/mockData';

interface AgentManagementProps {
  onNavigate: (screen: Screen) => void;
  onLogout: () => void;
}

export function AgentManagement({ onNavigate, onLogout }: AgentManagementProps) {
  const [agents, setAgents] = useState<Agent[]>(mockAgents);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRegion, setFilterRegion] = useState('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingAgent, setEditingAgent] = useState<Agent | null>(null);

  const regions = ['North', 'South', 'East', 'West'];

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         agent.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = filterRegion === 'all' || agent.region === filterRegion;
    const matchesStatus = filterStatus === 'all' || agent.status === filterStatus;
    return matchesSearch && matchesRegion && matchesStatus;
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const handleDeleteAgent = (agentId: string) => {
    if (confirm('Are you sure you want to delete this agent?')) {
      setAgents(agents.filter(a => a.id !== agentId));
    }
  };

  const AgentFormModal = ({ agent, onClose }: { agent?: Agent | null; onClose: () => void }) => {
    const [formData, setFormData] = useState<Partial<Agent>>(
      agent || {
        name: '',
        email: '',
        phone: '',
        region: 'North',
        salesTarget: 0,
        currentSales: 0,
        commission: 0,
        status: 'active',
      }
    );

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      
      if (agent) {
        // Update existing agent
        setAgents(agents.map(a => a.id === agent.id ? { ...a, ...formData } : a));
      } else {
        // Add new agent
        const newAgent: Agent = {
          id: `agent-${Date.now()}`,
          name: formData.name!,
          email: formData.email!,
          phone: formData.phone!,
          region: formData.region!,
          salesTarget: formData.salesTarget!,
          currentSales: formData.currentSales || 0,
          commission: formData.commission || 0,
          joinDate: new Date().toISOString().split('T')[0],
          status: formData.status as 'active' | 'inactive',
        };
        setAgents([...agents, newAgent]);
      }
      
      onClose();
    };

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
            <h2 className="text-slate-900">{agent ? 'Edit Agent' : 'Add New Agent'}</h2>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-slate-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-2">Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="john@insurance.com"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-2">Phone *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-2">Region *</label>
                <select
                  value={formData.region}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {regions.map(region => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-700 mb-2">Sales Target ($) *</label>
                <input
                  type="number"
                  required
                  value={formData.salesTarget}
                  onChange={(e) => setFormData({ ...formData, salesTarget: Number(e.target.value) })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="500000"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-2">Status *</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-3 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {agent ? 'Update Agent' : 'Add Agent'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Navigation 
        currentScreen="agent-management" 
        onNavigate={onNavigate}
        onLogout={onLogout}
        isAdmin={true}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-slate-900 mb-2">Agent Management</h1>
            <p className="text-slate-600">Manage agent profiles and performance targets</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Agent
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name or email..."
                className="w-full pl-11 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <select
              value={filterRegion}
              onChange={(e) => setFilterRegion(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Regions</option>
              {regions.map(region => (
                <option key={region} value={region}>{region} Region</option>
              ))}
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as 'all' | 'active' | 'inactive')}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Agents Table */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-6 py-4 text-slate-700">Agent</th>
                  <th className="text-left px-6 py-4 text-slate-700">Region</th>
                  <th className="text-left px-6 py-4 text-slate-700">Contact</th>
                  <th className="text-left px-6 py-4 text-slate-700">Sales Target</th>
                  <th className="text-left px-6 py-4 text-slate-700">Current Sales</th>
                  <th className="text-left px-6 py-4 text-slate-700">Achievement</th>
                  <th className="text-left px-6 py-4 text-slate-700">Status</th>
                  <th className="text-left px-6 py-4 text-slate-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAgents.map((agent) => {
                  const achievement = Math.round((agent.currentSales / agent.salesTarget) * 100);
                  return (
                    <tr key={agent.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="px-6 py-4">
                        <div className="text-slate-900">{agent.name}</div>
                        <div className="text-slate-500">ID: {agent.id}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-slate-700">
                          <MapPin className="w-4 h-4 text-slate-400" />
                          {agent.region}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-slate-700 mb-1">
                          <Mail className="w-4 h-4 text-slate-400" />
                          <span className="text-slate-600">{agent.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-700">
                          <Phone className="w-4 h-4 text-slate-400" />
                          <span className="text-slate-600">{agent.phone}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-700">
                        {formatCurrency(agent.salesTarget)}
                      </td>
                      <td className="px-6 py-4 text-slate-700">
                        {formatCurrency(agent.currentSales)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden max-w-[100px]">
                            <div 
                              className={`h-full rounded-full ${
                                achievement >= 100 ? 'bg-emerald-500' : 
                                achievement >= 75 ? 'bg-blue-500' : 
                                'bg-amber-500'
                              }`}
                              style={{ width: `${Math.min(achievement, 100)}%` }}
                            />
                          </div>
                          <span className={`${
                            achievement >= 100 ? 'text-emerald-600' : 'text-slate-700'
                          }`}>
                            {achievement}%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full ${
                          agent.status === 'active' 
                            ? 'bg-emerald-100 text-emerald-700' 
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {agent.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setEditingAgent(agent)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit agent"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteAgent(agent.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete agent"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredAgents.length === 0 && (
            <div className="text-center py-12 text-slate-500">
              No agents found matching your filters
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="mt-6 flex items-center justify-between text-slate-600">
          <div>
            Showing {filteredAgents.length} of {agents.length} agents
          </div>
          <div>
            {filteredAgents.filter(a => a.status === 'active').length} active agents
          </div>
        </div>
      </div>

      {/* Modals */}
      {showAddModal && (
        <AgentFormModal onClose={() => setShowAddModal(false)} />
      )}
      
      {editingAgent && (
        <AgentFormModal 
          agent={editingAgent} 
          onClose={() => setEditingAgent(null)} 
        />
      )}
    </div>
  );
}
