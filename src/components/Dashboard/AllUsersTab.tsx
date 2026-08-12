import React, { useState, useEffect } from 'react';
import { User } from '../../types';
import { fetchUsersFromFirestore, ADMIN_USER_ID } from '../../lib/firebase';
import { 
  Users, 
  Search, 
  ShieldCheck, 
  UserPlus, 
  Trash2, 
  Mail, 
  Phone, 
  Calendar, 
  AlertCircle, 
  CheckCircle2, 
  RefreshCw,
  UserCheck,
  ChevronDown,
  Download,
  Plus,
  MoreVertical,
  Shield,
  Crown,
  HeartPulse,
  User as UserIcon,
  Filter
} from 'lucide-react';

interface AllUsersTabProps {
  currentUser: User;
}

export const AllUsersTab: React.FC<AllUsersTabProps> = ({ currentUser }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [serviceFilter, setServiceFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [pageSize, setPageSize] = useState<number>(10);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);

  // New user form state
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState<'admin' | 'doctor' | 'patient'>('patient');
  const [newUserPhone, setNewUserPhone] = useState('');

  const loadAllUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const firestoreUsers = await fetchUsersFromFirestore();

      const res = await fetch('/api/users');
      let apiUsers: User[] = [];
      if (res.ok) {
        const data = await res.json();
        apiUsers = data.users || [];
      }

      const userMap = new Map<string, User>();

      const adminDefault: User = {
        id: ADMIN_USER_ID,
        email: 'alex@skymedthailand.com',
        name: 'Alex (SkyMed Admin)',
        role: 'admin',
        phone: '+66 2 123 4567',
        emergencyContact: 'SkyMed Operations HQ',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
        createdAt: new Date().toISOString()
      };
      userMap.set(ADMIN_USER_ID, adminDefault);

      apiUsers.forEach(u => userMap.set(u.id, u));
      firestoreUsers.forEach(u => {
        const existing = userMap.get(u.id);
        userMap.set(u.id, existing ? { ...existing, ...u } : u);
      });

      const mergedList = Array.from(userMap.values());
      setUsers(mergedList);
    } catch (err: any) {
      console.error('Failed to load users:', err);
      setError('Failed to fetch full user list. Please try refreshing.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllUsers();
  }, []);

  const handleDeleteUser = async (userId: string, name: string) => {
    if (userId === ADMIN_USER_ID) {
      alert('Cannot delete the primary System Administrator account.');
      return;
    }

    if (!window.confirm(`Are you sure you want to remove user "${name}"? This action cannot be undone.`)) {
      return;
    }

    setDeletingId(userId);
    try {
      const res = await fetch(`/api/users/${userId}`, { method: 'DELETE' });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to delete user');
      }

      setUsers(prev => prev.filter(u => u.id !== userId));
      setSuccessMsg(`User "${name}" was successfully removed.`);
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err: any) {
      setError(err.message || 'Failed to delete user.');
    } finally {
      setDeletingId(null);
    }
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName || !newUserEmail) return;

    const newUser: User = {
      id: `user_${Date.now()}`,
      name: newUserName,
      email: newUserEmail,
      role: newUserRole,
      phone: newUserPhone || '+66 8 0000 0000',
      createdAt: new Date().toISOString()
    };

    setUsers([newUser, ...users]);
    setSuccessMsg(`User "${newUserName}" added successfully.`);
    setShowAddModal(false);
    setNewUserName('');
    setNewUserEmail('');
    setNewUserRole('patient');
    setNewUserPhone('');
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const toggleSelectAll = () => {
    if (selectedUserIds.length === filteredUsers.length) {
      setSelectedUserIds([]);
    } else {
      setSelectedUserIds(filteredUsers.map(u => u.id));
    }
  };

  const toggleSelectUser = (id: string) => {
    if (selectedUserIds.includes(id)) {
      setSelectedUserIds(selectedUserIds.filter(i => i !== id));
    } else {
      setSelectedUserIds([...selectedUserIds, id]);
    }
  };

  const filteredUsers = users.filter(u => {
    const matchesSearch = 
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.phone && u.phone.includes(searchQuery));
    
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  const totalCount = users.length;

  return (
    <div className="space-y-6">
      
      {/* ================= 1. TOP 4 STAT CARDS (EXACT MATCH TO REFERENCE SCREENSHOT) ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Card 1: Session / Total Users */}
        <div className="bg-white rounded-xl p-5 border border-[#E6E5E8] shadow-[0_2px_6px_0_rgba(67,54,121,0.06)] flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-[#6F6B7D]">Session</span>
              <span className="text-xs font-bold text-[#28C76F]">(+29%)</span>
            </div>
            <div className="text-2xl font-extrabold text-[#4B465C] mt-1">{totalCount.toLocaleString()}</div>
            <div className="text-xs text-[#A5A3AE] font-medium mt-1">Total Users</div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-[#7367F0]/10 text-[#7367F0] flex items-center justify-center shrink-0">
            <Users className="w-5 h-5" />
          </div>
        </div>

        {/* Card 2: Paid Users */}
        <div className="bg-white rounded-xl p-5 border border-[#E6E5E8] shadow-[0_2px_6px_0_rgba(67,54,121,0.06)] flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-[#6F6B7D]">Paid Users</span>
              <span className="text-xs font-bold text-[#28C76F]">(+18%)</span>
            </div>
            <div className="text-2xl font-extrabold text-[#4B465C] mt-1">4,567</div>
            <div className="text-xs text-[#A5A3AE] font-medium mt-1">Last week analytics</div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-[#EA5455]/10 text-[#EA5455] flex items-center justify-center shrink-0">
            <UserPlus className="w-5 h-5" />
          </div>
        </div>

        {/* Card 3: Active Users */}
        <div className="bg-white rounded-xl p-5 border border-[#E6E5E8] shadow-[0_2px_6px_0_rgba(67,54,121,0.06)] flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-[#6F6B7D]">Active Users</span>
              <span className="text-xs font-bold text-[#EA5455]">(-14%)</span>
            </div>
            <div className="text-2xl font-extrabold text-[#4B465C] mt-1">19,860</div>
            <div className="text-xs text-[#A5A3AE] font-medium mt-1">Last week analytics</div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-[#28C76F]/10 text-[#28C76F] flex items-center justify-center shrink-0">
            <UserCheck className="w-5 h-5" />
          </div>
        </div>

        {/* Card 4: Pending Users */}
        <div className="bg-white rounded-xl p-5 border border-[#E6E5E8] shadow-[0_2px_6px_0_rgba(67,54,121,0.06)] flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-[#6F6B7D]">Pending Users</span>
              <span className="text-xs font-bold text-[#28C76F]">(+42%)</span>
            </div>
            <div className="text-2xl font-extrabold text-[#4B465C] mt-1">237</div>
            <div className="text-xs text-[#A5A3AE] font-medium mt-1">Last week analytics</div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-[#FF9F43]/10 text-[#FF9F43] flex items-center justify-center shrink-0">
            <UserIcon className="w-5 h-5" />
          </div>
        </div>

      </div>

      {/* Messages Alert Banner */}
      {error && (
        <div className="p-4 bg-[#FCE0E0] border border-[#EA5455]/20 text-[#EA5455] text-xs rounded-xl font-semibold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {successMsg && (
        <div className="p-4 bg-[#E8FADF] border border-[#28C76F]/20 text-[#28C76F] text-xs rounded-xl font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* ================= 2. FILTERS CARD (EXACT MATCH TO REFERENCE SCREENSHOT) ================= */}
      <div className="bg-white rounded-xl p-6 border border-[#E6E5E8] shadow-[0_2px_6px_0_rgba(67,54,121,0.06)] space-y-4">
        <h3 className="text-base font-bold text-[#4B465C]">Filters</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Select Role Dropdown */}
          <div className="relative">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full appearance-none bg-white border border-[#E6E5E8] rounded-lg px-4 py-2.5 text-xs font-semibold text-[#4B465C] focus:outline-none focus:border-[#7367F0] transition-colors cursor-pointer"
            >
              <option value="all">Select Role</option>
              <option value="admin">Administrator</option>
              <option value="doctor">Flight Doctor / Medical Staff</option>
              <option value="patient">Patient Account</option>
            </select>
            <ChevronDown className="w-4 h-4 text-[#A5A3AE] absolute right-3 top-3 pointer-events-none" />
          </div>

          {/* Select Plan / Medical Service Dropdown */}
          <div className="relative">
            <select
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
              className="w-full appearance-none bg-white border border-[#E6E5E8] rounded-lg px-4 py-2.5 text-xs font-semibold text-[#4B465C] focus:outline-none focus:border-[#7367F0] transition-colors cursor-pointer"
            >
              <option value="all">Select Plan</option>
              <option value="air-ambulance">Air Ambulance Evacuation</option>
              <option value="medical-consultation">Medical Consultation</option>
              <option value="ground-transport">Ground Transport</option>
            </select>
            <ChevronDown className="w-4 h-4 text-[#A5A3AE] absolute right-3 top-3 pointer-events-none" />
          </div>

          {/* Select Status Dropdown */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full appearance-none bg-white border border-[#E6E5E8] rounded-lg px-4 py-2.5 text-xs font-semibold text-[#4B465C] focus:outline-none focus:border-[#7367F0] transition-colors cursor-pointer"
            >
              <option value="all">Select Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="inactive">Inactive</option>
            </select>
            <ChevronDown className="w-4 h-4 text-[#A5A3AE] absolute right-3 top-3 pointer-events-none" />
          </div>

        </div>
      </div>

      {/* ================= 3. TABLE CARD & CONTROLS (EXACT MATCH TO REFERENCE SCREENSHOT) ================= */}
      <div className="bg-white rounded-xl border border-[#E6E5E8] shadow-[0_2px_6px_0_rgba(67,54,121,0.06)] overflow-hidden">
        
        {/* Table Top Controls Bar */}
        <div className="p-5 border-b border-[#E6E5E8] flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Entries Selector */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <select
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
                className="appearance-none bg-white border border-[#E6E5E8] rounded-lg pl-3 pr-8 py-2 text-xs font-semibold text-[#4B465C] focus:outline-none focus:border-[#7367F0]"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#A5A3AE] absolute right-2.5 top-2.5 pointer-events-none" />
            </div>
          </div>

          {/* Action Buttons & Search Input */}
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-end">
            
            {/* Search User Input */}
            <div className="relative flex-1 sm:w-56">
              <input
                type="text"
                placeholder="Search User"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-[#E6E5E8] rounded-lg px-3.5 py-2 text-xs text-[#4B465C] placeholder-[#A5A3AE] font-medium focus:outline-none focus:border-[#7367F0]"
              />
            </div>

            {/* Export Dropdown Button */}
            <button className="px-4 py-2 bg-[#F1F0F2] hover:bg-[#E6E5E8] text-[#6F6B7D] rounded-lg text-xs font-bold transition-colors flex items-center gap-2">
              <Download className="w-3.5 h-3.5" />
              <span>Export</span>
              <ChevronDown className="w-3 h-3 text-[#A5A3AE]" />
            </button>

            {/* Add New Record Button */}
            <button 
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-[#7367F0] hover:bg-[#685DD8] text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-2 shadow-[0_2px_6px_0_rgba(115,103,240,0.48)]"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Record</span>
            </button>

          </div>

        </div>

        {/* Data Table */}
        {loading ? (
          <div className="p-12 text-center text-[#A5A3AE]">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-3 text-[#7367F0]" />
            <p className="text-xs font-semibold">Loading user accounts...</p>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="p-12 text-center text-[#6F6B7D]">
            <Users className="w-10 h-10 mx-auto mb-3 text-[#A5A3AE]" />
            <p className="text-sm font-bold text-[#4B465C]">No matching users found</p>
            <p className="text-xs text-[#A5A3AE] mt-1">Try adjusting your search query or filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#FAF9FB] border-b border-[#E6E5E8] text-[11px] font-extrabold uppercase tracking-wider text-[#A5A3AE]">
                  <th className="py-3.5 px-4 w-10">
                    <input
                      type="checkbox"
                      checked={selectedUserIds.length === filteredUsers.length && filteredUsers.length > 0}
                      onChange={toggleSelectAll}
                      className="rounded border-[#E6E5E8] text-[#7367F0] focus:ring-[#7367F0] cursor-pointer"
                    />
                  </th>
                  <th className="py-3.5 px-4">USER</th>
                  <th className="py-3.5 px-4">ROLE</th>
                  <th className="py-3.5 px-4">PLAN</th>
                  <th className="py-3.5 px-4">BILLING</th>
                  <th className="py-3.5 px-4">STATUS</th>
                  <th className="py-3.5 px-4 text-center">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F0F2] text-xs">
                {filteredUsers.slice(0, pageSize).map((user) => {
                  const isAdmin = user.id === ADMIN_USER_ID || user.role === 'admin';
                  const isDoctor = user.role === 'doctor';
                  const isSelected = selectedUserIds.includes(user.id);

                  return (
                    <tr key={user.id} className={`hover:bg-[#FAF9FB] transition-colors ${isSelected ? 'bg-[#7367F0]/5' : ''}`}>
                      
                      {/* Checkbox */}
                      <td className="py-4 px-4">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSelectUser(user.id)}
                          className="rounded border-[#E6E5E8] text-[#7367F0] focus:ring-[#7367F0] cursor-pointer"
                        />
                      </td>

                      {/* USER Column (Avatar + Name + Email) */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={user.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
                            alt={user.name}
                            className="w-9 h-9 rounded-full object-cover border border-[#E6E5E8] shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <div className="font-bold text-[#4B465C] flex items-center gap-1.5">
                              <span>{user.name}</span>
                              {isAdmin && (
                                <span className="bg-[#FF9F43]/10 text-[#FF9F43] text-[9px] font-extrabold px-1.5 py-0.5 rounded">
                                  PRIMARY ADMIN
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-[#A5A3AE] font-medium">
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* ROLE Column */}
                      <td className="py-4 px-4">
                        {isAdmin ? (
                          <div className="flex items-center gap-2 text-[#FF9F43] font-semibold">
                            <Crown className="w-4 h-4 shrink-0" />
                            <span>Maintainer</span>
                          </div>
                        ) : isDoctor ? (
                          <div className="flex items-center gap-2 text-[#7367F0] font-semibold">
                            <HeartPulse className="w-4 h-4 shrink-0" />
                            <span>Flight Staff</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-[#28C76F] font-semibold">
                            <UserIcon className="w-4 h-4 shrink-0" />
                            <span>Subscriber</span>
                          </div>
                        )}
                      </td>

                      {/* PLAN Column */}
                      <td className="py-4 px-4 text-[#6F6B7D] font-semibold">
                        {isAdmin ? 'Enterprise' : isDoctor ? 'AirMed Pro' : 'Basic'}
                      </td>

                      {/* BILLING Column */}
                      <td className="py-4 px-4 text-[#6F6B7D] font-medium">
                        Auto Debit
                      </td>

                      {/* STATUS Column */}
                      <td className="py-4 px-4">
                        <span className="bg-[#E8FADF] text-[#28C76F] text-xs font-extrabold px-2.5 py-1 rounded-md inline-block">
                          Active
                        </span>
                      </td>

                      {/* ACTIONS Column */}
                      <td className="py-4 px-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          {user.id !== ADMIN_USER_ID && (
                            <button
                              onClick={() => handleDeleteUser(user.id, user.name)}
                              disabled={deletingId === user.id}
                              className="p-1.5 text-[#A5A3AE] hover:text-[#EA5455] hover:bg-[#EA5455]/10 rounded-lg transition-colors"
                              title="Delete User"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                          <button className="p-1.5 text-[#A5A3AE] hover:text-[#4B465C] hover:bg-[#F1F0F2] rounded-lg transition-colors">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-[#E6E5E8] space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#F1F0F2]">
              <h3 className="text-base font-bold text-[#4B465C]">Add New Record</h3>
              <button onClick={() => setShowAddModal(false)} className="text-[#A5A3AE] hover:text-[#4B465C] text-lg font-bold">×</button>
            </div>

            <form onSubmit={handleAddUser} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#4B465C] mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Zsazsa McCleverty"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  className="w-full border border-[#E6E5E8] rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:border-[#7367F0]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#4B465C] mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. user@domain.com"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  className="w-full border border-[#E6E5E8] rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:border-[#7367F0]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#4B465C] mb-1">Role</label>
                <select
                  value={newUserRole}
                  onChange={(e) => setNewUserRole(e.target.value as any)}
                  className="w-full border border-[#E6E5E8] rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:border-[#7367F0]"
                >
                  <option value="patient">Patient / Subscriber</option>
                  <option value="doctor">Flight Staff / Doctor</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#4B465C] mb-1">Phone Number</label>
                <input
                  type="text"
                  placeholder="+66 8 1234 5678"
                  value={newUserPhone}
                  onChange={(e) => setNewUserPhone(e.target.value)}
                  className="w-full border border-[#E6E5E8] rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:border-[#7367F0]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg text-xs font-bold text-[#6F6B7D] bg-[#F1F0F2] hover:bg-[#E6E5E8]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg text-xs font-bold text-white bg-[#7367F0] hover:bg-[#685DD8]"
                >
                  Save User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
