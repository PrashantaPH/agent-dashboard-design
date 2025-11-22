import { useState } from 'react';
import { Plus, Edit2, Trash2, X, Shield, DollarSign, Clock } from 'lucide-react';
import { Navigation } from './Navigation';
import { Screen } from '../App';
import { mockCommissionRules, CommissionRule } from '../data/mockData';

interface CommissionRulesProps {
  onNavigate: (screen: Screen) => void;
  onLogout: () => void;
}

export function CommissionRules({ onNavigate, onLogout }: CommissionRulesProps) {
  const [rules, setRules] = useState<CommissionRule[]>(mockCommissionRules);
  const [filterPolicyType, setFilterPolicyType] = useState<'all' | 'Life' | 'Health' | 'Auto'>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingRule, setEditingRule] = useState<CommissionRule | null>(null);

  const policyTypes = ['Life', 'Health', 'Auto'] as const;

  const filteredRules = rules.filter(rule => 
    filterPolicyType === 'all' || rule.policyType === filterPolicyType
  );

  const formatCurrency = (value: number) => {
    if (value >= 999999999) return '∞';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const handleDeleteRule = (ruleId: string) => {
    if (confirm('Are you sure you want to delete this commission rule?')) {
      setRules(rules.filter(r => r.id !== ruleId));
    }
  };

  const RuleFormModal = ({ rule, onClose }: { rule?: CommissionRule | null; onClose: () => void }) => {
    const [formData, setFormData] = useState<Partial<CommissionRule>>(
      rule || {
        policyType: 'Life',
        premiumMin: 0,
        premiumMax: 50000,
        tenureMin: 0,
        tenureMax: 10,
        commissionRate: 5,
      }
    );

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      
      if (rule) {
        setRules(rules.map(r => r.id === rule.id ? { ...r, ...formData } : r));
      } else {
        const newRule: CommissionRule = {
          id: `rule-${Date.now()}`,
          policyType: formData.policyType as 'Life' | 'Health' | 'Auto',
          premiumMin: formData.premiumMin!,
          premiumMax: formData.premiumMax!,
          tenureMin: formData.tenureMin!,
          tenureMax: formData.tenureMax!,
          commissionRate: formData.commissionRate!,
        };
        setRules([...rules, newRule]);
      }
      
      onClose();
    };

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl max-w-2xl w-full">
          <div className="border-b border-slate-200 px-6 py-4 flex items-center justify-between">
            <h2 className="text-slate-900">{rule ? 'Edit Commission Rule' : 'Add New Rule'}</h2>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            <div className="space-y-6">
              <div>
                <label className="block text-slate-700 mb-2">Policy Type *</label>
                <select
                  value={formData.policyType}
                  onChange={(e) => setFormData({ ...formData, policyType: e.target.value as 'Life' | 'Health' | 'Auto' })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {policyTypes.map(type => (
                    <option key={type} value={type}>{type} Insurance</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 mb-2">Premium Range Min ($) *</label>
                  <input
                    type="number"
                    required
                    value={formData.premiumMin}
                    onChange={(e) => setFormData({ ...formData, premiumMin: Number(e.target.value) })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 mb-2">Premium Range Max ($) *</label>
                  <input
                    type="number"
                    required
                    value={formData.premiumMax}
                    onChange={(e) => setFormData({ ...formData, premiumMax: Number(e.target.value) })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="50000"
                    min="0"
                  />
                  <p className="text-slate-500 mt-1">Use 999999999 for unlimited</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 mb-2">Tenure Min (years) *</label>
                  <input
                    type="number"
                    required
                    value={formData.tenureMin}
                    onChange={(e) => setFormData({ ...formData, tenureMin: Number(e.target.value) })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 mb-2">Tenure Max (years) *</label>
                  <input
                    type="number"
                    required
                    value={formData.tenureMax}
                    onChange={(e) => setFormData({ ...formData, tenureMax: Number(e.target.value) })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="10"
                    min="0"
                  />
                  <p className="text-slate-500 mt-1">Use 999 for unlimited</p>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 mb-2">Commission Rate (%) *</label>
                <input
                  type="number"
                  required
                  step="0.1"
                  value={formData.commissionRate}
                  onChange={(e) => setFormData({ ...formData, commissionRate: Number(e.target.value) })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="5.0"
                  min="0"
                  max="100"
                />
                <p className="text-slate-500 mt-1">Enter percentage (e.g., 5 for 5%)</p>
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
                {rule ? 'Update Rule' : 'Add Rule'}
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
        currentScreen="commission-rules" 
        onNavigate={onNavigate}
        onLogout={onLogout}
        isAdmin={true}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-slate-900 mb-2">Commission Rules</h1>
            <p className="text-slate-600">Configure commission rates by policy type, premium, and tenure</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Rule
          </button>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div className="text-blue-900">Life Insurance</div>
            </div>
            <p className="text-blue-700">
              Higher commission rates for longer tenure policies
            </p>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl border border-emerald-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <div className="text-emerald-900">Health Insurance</div>
            </div>
            <p className="text-emerald-700">
              Competitive rates based on premium amount
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div className="text-purple-900">Auto Insurance</div>
            </div>
            <p className="text-purple-700">
              Short-term policies with flexible commission
            </p>
          </div>
        </div>

        {/* Filter */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6">
          <div className="flex items-center gap-4">
            <label className="text-slate-700">Filter by Policy Type:</label>
            <div className="flex gap-2">
              <button
                onClick={() => setFilterPolicyType('all')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filterPolicyType === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                All
              </button>
              {policyTypes.map(type => (
                <button
                  key={type}
                  onClick={() => setFilterPolicyType(type)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    filterPolicyType === type
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Rules Table */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-6 py-4 text-slate-700">Policy Type</th>
                  <th className="text-left px-6 py-4 text-slate-700">Premium Range</th>
                  <th className="text-left px-6 py-4 text-slate-700">Tenure Range (Years)</th>
                  <th className="text-left px-6 py-4 text-slate-700">Commission Rate</th>
                  <th className="text-left px-6 py-4 text-slate-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRules.map((rule) => (
                  <tr key={rule.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full ${
                        rule.policyType === 'Life' ? 'bg-blue-100 text-blue-700' :
                        rule.policyType === 'Health' ? 'bg-emerald-100 text-emerald-700' :
                        'bg-purple-100 text-purple-700'
                      }`}>
                        {rule.policyType}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-700">
                      {formatCurrency(rule.premiumMin)} - {formatCurrency(rule.premiumMax)}
                    </td>
                    <td className="px-6 py-4 text-slate-700">
                      {rule.tenureMin} - {rule.tenureMax >= 999 ? '∞' : rule.tenureMax} years
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="text-emerald-600">{rule.commissionRate}%</div>
                        <div className="text-slate-500">
                          ({formatCurrency(50000 * (rule.commissionRate / 100))} on $50k)
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditingRule(rule)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit rule"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteRule(rule.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete rule"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredRules.length === 0 && (
            <div className="text-center py-12 text-slate-500">
              No commission rules found for the selected filter
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="mt-6 text-slate-600">
          Showing {filteredRules.length} of {rules.length} commission rules
        </div>
      </div>

      {/* Modals */}
      {showAddModal && (
        <RuleFormModal onClose={() => setShowAddModal(false)} />
      )}
      
      {editingRule && (
        <RuleFormModal 
          rule={editingRule} 
          onClose={() => setEditingRule(null)} 
        />
      )}
    </div>
  );
}
