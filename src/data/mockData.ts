export interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  region: string;
  salesTarget: number;
  currentSales: number;
  commission: number;
  joinDate: string;
  status: 'active' | 'inactive';
}

export interface PolicySale {
  id: string;
  agentId: string;
  policyType: 'Life' | 'Health' | 'Auto';
  policyNumber: string;
  customerName: string;
  premiumAmount: number;
  tenure: number;
  commission: number;
  date: string;
  status: 'active' | 'pending' | 'cancelled';
}

export interface CommissionRule {
  id: string;
  policyType: 'Life' | 'Health' | 'Auto';
  premiumMin: number;
  premiumMax: number;
  tenureMin: number;
  tenureMax: number;
  commissionRate: number;
}

export interface Activity {
  id: string;
  type: 'sale' | 'agent_added' | 'commission_paid' | 'target_achieved';
  description: string;
  timestamp: string;
  agentName?: string;
}

export const mockAgents: Agent[] = [
  {
    id: 'agent-001',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@insurance.com',
    phone: '+1 (555) 123-4567',
    region: 'North',
    salesTarget: 500000,
    currentSales: 475000,
    commission: 28500,
    joinDate: '2023-01-15',
    status: 'active',
  },
  {
    id: 'agent-002',
    name: 'Michael Chen',
    email: 'michael.chen@insurance.com',
    phone: '+1 (555) 234-5678',
    region: 'South',
    salesTarget: 450000,
    currentSales: 520000,
    commission: 35100,
    joinDate: '2023-03-20',
    status: 'active',
  },
  {
    id: 'agent-003',
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@insurance.com',
    phone: '+1 (555) 345-6789',
    region: 'East',
    salesTarget: 400000,
    currentSales: 380000,
    commission: 22800,
    joinDate: '2023-06-10',
    status: 'active',
  },
  {
    id: 'agent-004',
    name: 'David Thompson',
    email: 'david.thompson@insurance.com',
    phone: '+1 (555) 456-7890',
    region: 'West',
    salesTarget: 550000,
    currentSales: 610000,
    commission: 42700,
    joinDate: '2022-11-05',
    status: 'active',
  },
  {
    id: 'agent-005',
    name: 'Jennifer Martinez',
    email: 'jennifer.martinez@insurance.com',
    phone: '+1 (555) 567-8901',
    region: 'North',
    salesTarget: 480000,
    currentSales: 495000,
    commission: 31350,
    joinDate: '2023-04-12',
    status: 'active',
  },
  {
    id: 'agent-006',
    name: 'Robert Anderson',
    email: 'robert.anderson@insurance.com',
    phone: '+1 (555) 678-9012',
    region: 'South',
    salesTarget: 420000,
    currentSales: 395000,
    commission: 23700,
    joinDate: '2023-07-22',
    status: 'active',
  },
  {
    id: 'agent-007',
    name: 'Lisa Williams',
    email: 'lisa.williams@insurance.com',
    phone: '+1 (555) 789-0123',
    region: 'East',
    salesTarget: 500000,
    currentSales: 450000,
    commission: 27000,
    joinDate: '2023-02-28',
    status: 'inactive',
  },
  {
    id: 'agent-008',
    name: 'James Taylor',
    email: 'james.taylor@insurance.com',
    phone: '+1 (555) 890-1234',
    region: 'West',
    salesTarget: 460000,
    currentSales: 485000,
    commission: 30375,
    joinDate: '2023-05-18',
    status: 'active',
  },
];

export const mockPolicySales: PolicySale[] = [
  {
    id: 'sale-001',
    agentId: 'agent-001',
    policyType: 'Life',
    policyNumber: 'LIFE-2025-001',
    customerName: 'John Anderson',
    premiumAmount: 50000,
    tenure: 20,
    commission: 3000,
    date: '2025-01-15',
    status: 'active',
  },
  {
    id: 'sale-002',
    agentId: 'agent-001',
    policyType: 'Health',
    policyNumber: 'HLTH-2025-045',
    customerName: 'Emma Wilson',
    premiumAmount: 25000,
    tenure: 5,
    commission: 1250,
    date: '2025-02-10',
    status: 'active',
  },
  {
    id: 'sale-003',
    agentId: 'agent-001',
    policyType: 'Auto',
    policyNumber: 'AUTO-2025-123',
    customerName: 'Robert Brown',
    premiumAmount: 15000,
    tenure: 1,
    commission: 600,
    date: '2025-03-05',
    status: 'active',
  },
  {
    id: 'sale-004',
    agentId: 'agent-001',
    policyType: 'Life',
    policyNumber: 'LIFE-2025-078',
    customerName: 'Maria Garcia',
    premiumAmount: 75000,
    tenure: 25,
    commission: 5250,
    date: '2025-04-12',
    status: 'active',
  },
  {
    id: 'sale-005',
    agentId: 'agent-002',
    policyType: 'Health',
    policyNumber: 'HLTH-2025-089',
    customerName: 'William Johnson',
    premiumAmount: 30000,
    tenure: 3,
    commission: 1500,
    date: '2025-01-20',
    status: 'active',
  },
  {
    id: 'sale-006',
    agentId: 'agent-002',
    policyType: 'Auto',
    policyNumber: 'AUTO-2025-156',
    customerName: 'Sophie Miller',
    premiumAmount: 12000,
    tenure: 1,
    commission: 480,
    date: '2025-02-28',
    status: 'active',
  },
  {
    id: 'sale-007',
    agentId: 'agent-003',
    policyType: 'Life',
    policyNumber: 'LIFE-2025-092',
    customerName: 'Daniel Davis',
    premiumAmount: 100000,
    tenure: 30,
    commission: 7500,
    date: '2025-03-15',
    status: 'active',
  },
  {
    id: 'sale-008',
    agentId: 'agent-004',
    policyType: 'Health',
    policyNumber: 'HLTH-2025-134',
    customerName: 'Olivia Martinez',
    premiumAmount: 40000,
    tenure: 10,
    commission: 2400,
    date: '2025-04-05',
    status: 'pending',
  },
];

export const mockCommissionRules: CommissionRule[] = [
  {
    id: 'rule-001',
    policyType: 'Life',
    premiumMin: 0,
    premiumMax: 50000,
    tenureMin: 0,
    tenureMax: 10,
    commissionRate: 5,
  },
  {
    id: 'rule-002',
    policyType: 'Life',
    premiumMin: 50001,
    premiumMax: 100000,
    tenureMin: 0,
    tenureMax: 10,
    commissionRate: 6,
  },
  {
    id: 'rule-003',
    policyType: 'Life',
    premiumMin: 0,
    premiumMax: 50000,
    tenureMin: 11,
    tenureMax: 20,
    commissionRate: 6,
  },
  {
    id: 'rule-004',
    policyType: 'Life',
    premiumMin: 50001,
    premiumMax: 100000,
    tenureMin: 11,
    tenureMax: 20,
    commissionRate: 7,
  },
  {
    id: 'rule-005',
    policyType: 'Life',
    premiumMin: 100001,
    premiumMax: 999999999,
    tenureMin: 20,
    tenureMax: 999,
    commissionRate: 8,
  },
  {
    id: 'rule-006',
    policyType: 'Health',
    premiumMin: 0,
    premiumMax: 30000,
    tenureMin: 0,
    tenureMax: 5,
    commissionRate: 4,
  },
  {
    id: 'rule-007',
    policyType: 'Health',
    premiumMin: 30001,
    premiumMax: 999999999,
    tenureMin: 0,
    tenureMax: 5,
    commissionRate: 5,
  },
  {
    id: 'rule-008',
    policyType: 'Health',
    premiumMin: 0,
    premiumMax: 30000,
    tenureMin: 6,
    tenureMax: 999,
    commissionRate: 5,
  },
  {
    id: 'rule-009',
    policyType: 'Health',
    premiumMin: 30001,
    premiumMax: 999999999,
    tenureMin: 6,
    tenureMax: 999,
    commissionRate: 6,
  },
  {
    id: 'rule-010',
    policyType: 'Auto',
    premiumMin: 0,
    premiumMax: 15000,
    tenureMin: 0,
    tenureMax: 1,
    commissionRate: 3,
  },
  {
    id: 'rule-011',
    policyType: 'Auto',
    premiumMin: 15001,
    premiumMax: 999999999,
    tenureMin: 0,
    tenureMax: 1,
    commissionRate: 4,
  },
  {
    id: 'rule-012',
    policyType: 'Auto',
    premiumMin: 0,
    premiumMax: 999999999,
    tenureMin: 2,
    tenureMax: 999,
    commissionRate: 5,
  },
];

export const mockActivities: Activity[] = [
  {
    id: 'act-001',
    type: 'sale',
    description: 'New Life Insurance policy sold - $100,000 premium',
    timestamp: '2025-11-21T10:30:00',
    agentName: 'Daniel Davis',
  },
  {
    id: 'act-002',
    type: 'target_achieved',
    description: 'Sales target achieved for Q4 2025',
    timestamp: '2025-11-21T09:15:00',
    agentName: 'David Thompson',
  },
  {
    id: 'act-003',
    type: 'commission_paid',
    description: 'Commission payment processed - $3,500',
    timestamp: '2025-11-20T16:45:00',
    agentName: 'Michael Chen',
  },
  {
    id: 'act-004',
    type: 'sale',
    description: 'New Health Insurance policy sold - $40,000 premium',
    timestamp: '2025-11-20T14:20:00',
    agentName: 'Olivia Martinez',
  },
  {
    id: 'act-005',
    type: 'agent_added',
    description: 'New agent onboarded to the system',
    timestamp: '2025-11-19T11:00:00',
    agentName: 'James Taylor',
  },
  {
    id: 'act-006',
    type: 'sale',
    description: 'Auto Insurance policy sold - $15,000 premium',
    timestamp: '2025-11-19T08:30:00',
    agentName: 'Sarah Johnson',
  },
];

// Helper functions
export function getAgentById(agentId: string): Agent | undefined {
  return mockAgents.find(agent => agent.id === agentId);
}

export function getSalesByAgentId(agentId: string): PolicySale[] {
  return mockPolicySales.filter(sale => sale.agentId === agentId);
}

export function calculateTotalSales(): number {
  return mockAgents.reduce((sum, agent) => sum + agent.currentSales, 0);
}

export function calculateTotalCommissions(): number {
  return mockAgents.reduce((sum, agent) => sum + agent.commission, 0);
}

export function getTopPerformers(limit: number = 5): Agent[] {
  return [...mockAgents]
    .sort((a, b) => b.currentSales - a.currentSales)
    .slice(0, limit);
}
