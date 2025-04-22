import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Metrics {
  totalUsers: number;
  activeUsers: number;
  newsletterSubscribers: number;
}

// API URL is provided by Vite's define plugin

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [activities, setActivities] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [accessRequests, setAccessRequests] = useState<any[]>([]);
  const [dealRoomActivities, setDealRoomActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [manualEmail, setManualEmail] = useState('');
  const [manualName, setManualName] = useState('');
  const [manualRequestType, setManualRequestType] = useState('dealRoom');
  const [isGranting, setIsGranting] = useState(false);
  const [activeTab, setActiveTab] = useState('requests'); // 'requests' or 'activity'

  // Define fetchData outside useEffect so it can be called from other functions
  const fetchData = async () => {
    try {
      setLoading(true);
      setError('');

      // Use API URL from environment
      const apiBaseUrl = import.meta.env.VITE_API_URL;
      console.log(`Using API base URL: ${apiBaseUrl} for API calls`);

      // Fetch data from API
      const [metricsRes, activitiesRes, subscribersRes, accessRequestsRes, dealRoomActivitiesRes] = await Promise.all([
        fetch(`${apiBaseUrl}/api/admin/metrics`).catch((err) => {
          console.error('Error fetching metrics:', err);
          return { ok: false };
        }),
        fetch(`${apiBaseUrl}/api/admin/user-activity`).catch((err) => {
          console.error('Error fetching user activity:', err);
          return { ok: false };
        }),
        fetch(`${apiBaseUrl}/api/admin/newsletter-subscribers`).catch((err) => {
          console.error('Error fetching newsletter subscribers:', err);
          return { ok: false };
        }),
        fetch(`${apiBaseUrl}/api/access-requests`).catch((err) => {
          console.error('Error fetching access requests:', err);
          return { ok: false };
        }),
        fetch(`${apiBaseUrl}/api/deal-room-activity`).catch((err) => {
          console.error('Error fetching deal room activity:', err);
          return { ok: false };
        })
      ]);

      // Process metrics data (fallback to mock data if API fails)
      let metricsData = { totalUsers: 0, activeUsers: 0, newsletterSubscribers: 0 };
      if (metricsRes.ok) {
        metricsData = await metricsRes.json();
      } else {
        console.warn('Failed to fetch metrics from API, using mock data');
        // Mock data for development
        metricsData = {
          totalUsers: 12,
          activeUsers: 5,
          newsletterSubscribers: 8
        };
      }

      // Process activities data (fallback to mock data if API fails)
      let activitiesData = [];
      if (activitiesRes.ok) {
        activitiesData = await activitiesRes.json();
      } else {
        console.warn('Failed to fetch user activity from API, using mock data');
        // Mock data for development
        activitiesData = [
          { _id: '1', email: 'user1@example.com', lastActive: new Date().toISOString() },
          { _id: '2', email: 'user2@example.com', lastActive: new Date(Date.now() - 86400000).toISOString() }
        ];
      }

      // Process subscribers data (fallback to mock data if API fails)
      let subscribersData = [];
      if (subscribersRes.ok) {
        subscribersData = await subscribersRes.json();
      } else {
        console.warn('Failed to fetch newsletter subscribers from API, using mock data');
        // Mock data for development
        subscribersData = [
          { _id: '1', email: 'subscriber1@example.com', subscribedAt: new Date().toISOString() },
          { _id: '2', email: 'subscriber2@example.com', subscribedAt: new Date(Date.now() - 86400000).toISOString() }
        ];
      }

      // Process access requests
      let accessRequestsData = [];
      if (accessRequestsRes.ok) {
        accessRequestsData = await accessRequestsRes.json();
      } else {
        // Fallback to localStorage if API fails
        console.warn('Failed to fetch access requests from API, falling back to localStorage');
        accessRequestsData = JSON.parse(localStorage.getItem('accessRequests') || '[]');
      }

      // Process Deal Room activity
      let dealRoomActivityData = [];
      if (dealRoomActivitiesRes.ok) {
        dealRoomActivityData = await dealRoomActivitiesRes.json();
      } else {
        console.warn('Failed to fetch Deal Room activity');
      }

      setMetrics(metricsData);
      setActivities(activitiesData);
      setSubscribers(subscribersData);
      setAccessRequests(accessRequestsData);
      setDealRoomActivities(dealRoomActivityData);
    } catch (err) {
      setError('Failed to load dashboard data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const adminEmail = localStorage.getItem('adminEmail');
    if (!adminEmail || adminEmail !== 'sujay@equihome.com.au') {
      navigate('/admin/login');
      return;
    }

    // Call the fetchData function
    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminEmail');
    navigate('/admin/login');
  };

  const handleAccessRequest = async (index: number, action: 'approve' | 'deny') => {
    const request = accessRequests[index];
    const requestId = request._id;
    const status = action === 'approve' ? 'approved' : 'denied';

    // Check if requestId is valid
    if (!requestId) {
      console.error('Invalid request ID: undefined or null');
      alert('Error: This access request has an invalid ID. Please refresh the page and try again.');
      return;
    }

    console.log(`Updating access request: ${requestId} to ${status}`);

    try {
      // Use API URL from environment
      const apiBaseUrl = import.meta.env.VITE_API_URL;
      const apiUrl = `${apiBaseUrl}/api/access-requests/${requestId}`;
      console.log(`Sending access request update to: ${apiUrl}`);

      // Update request status via API - use POST instead of PUT to avoid proxy issues
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          status,
          adminEmail: localStorage.getItem('adminEmail')
        })
      });

      // Get response text for error handling
      const responseText = await response.text();
      let responseData;
      try {
        // Check if the response is HTML (contains HTML tags)
        if (responseText.includes('<html>') || responseText.includes('<!DOCTYPE html>')) {
          console.error('Server returned HTML instead of JSON:', responseText);
          throw new Error('Server returned HTML instead of JSON. This might be due to a proxy or CORS issue.');
        }

        responseData = JSON.parse(responseText);
      } catch (e) {
        console.error('Failed to parse response as JSON:', responseText);
        throw new Error(`Failed to parse server response: ${responseText.substring(0, 100)}${responseText.length > 100 ? '...' : ''}`);
      }

      if (!response.ok) {
        const errorMessage = responseData?.message || 'Failed to update access request';
        console.error(`Error updating access request: ${errorMessage}`);
        throw new Error(errorMessage);
      }

      // Update local state
      const updatedRequests = [...accessRequests];
      updatedRequests[index] = {
        ...request,
        status,
        approvedAt: status === 'approved' ? new Date().toISOString() : null,
        approvedBy: status === 'approved' ? localStorage.getItem('adminEmail') : null
      };

      // Fallback: Update localStorage for offline functionality
      const localRequests = JSON.parse(localStorage.getItem('accessRequests') || '[]');
      const localIndex = localRequests.findIndex((req: any) =>
        req.email === request.email && req.requestType === request.requestType
      );

      if (localIndex !== -1) {
        localRequests[localIndex].status = status;
        localStorage.setItem('accessRequests', JSON.stringify(localRequests));
      }

      // If approved, also update approvedUsers in localStorage for client-side checks
      if (status === 'approved') {
        const approvedUsers = JSON.parse(localStorage.getItem('approvedUsers') || '[]');
        approvedUsers.push({
          email: request.email,
          name: request.name,
          accessType: request.requestType,
          approvedAt: new Date().toISOString()
        });
        localStorage.setItem('approvedUsers', JSON.stringify(approvedUsers));
      }

      // Update state
      setAccessRequests(updatedRequests);

      // Show success message
      alert(`Access request ${status} for ${request.email}`);
    } catch (error) {
      console.error('Error updating access request:', error);
      alert(`Failed to update access request: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again.`);
    }
  };

  const handleManualGrant = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!manualEmail) {
      alert('Email is required');
      return;
    }

    setIsGranting(true);

    try {
      // Use API URL from environment
      const apiBaseUrl = import.meta.env.VITE_API_URL;
      const apiUrl = `${apiBaseUrl}/api/grant-access`;
      console.log(`Sending grant access request to: ${apiUrl}`);

      const requestData = {
        email: manualEmail,
        name: manualName,
        requestType: manualRequestType,
        adminEmail: localStorage.getItem('adminEmail')
      };

      console.log('Request data:', requestData);

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });

      // Get response text for error handling
      const responseText = await response.text();
      console.log(`Grant access response: ${responseText}`);

      let data;
      try {
        // Check if the response is HTML (contains HTML tags)
        if (responseText.includes('<html>') || responseText.includes('<!DOCTYPE html>')) {
          console.error('Server returned HTML instead of JSON:', responseText);
          throw new Error('Server returned HTML instead of JSON. This might be due to a proxy or CORS issue.');
        }

        data = JSON.parse(responseText);
      } catch (e) {
        console.error('Failed to parse response as JSON:', responseText);
        throw new Error(`Failed to parse server response: ${responseText.substring(0, 100)}${responseText.length > 100 ? '...' : ''}`);
      }

      if (!response.ok) {
        const errorMessage = data?.message || 'Failed to grant access';
        console.error(`Error granting access: ${errorMessage}`);
        throw new Error(errorMessage);
      }

      // Update approvedUsers in localStorage for client-side checks
      const approvedUsers = JSON.parse(localStorage.getItem('approvedUsers') || '[]');
      approvedUsers.push({
        email: manualEmail,
        name: manualName || manualEmail.split('@')[0],
        accessType: manualRequestType,
        approvedAt: new Date().toISOString()
      });
      localStorage.setItem('approvedUsers', JSON.stringify(approvedUsers));

      // Refresh access requests
      fetchData();

      // Reset form
      setManualEmail('');
      setManualName('');

      // Show success message
      alert(`Access granted to ${manualEmail} for ${manualRequestType}`);
    } catch (error) {
      console.error('Error granting access:', error);
      alert(`Failed to grant access: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again.`);
    } finally {
      setIsGranting(false);
    }
  };

  const handleRevokeAccess = async (email: string, requestType: string) => {
    if (!confirm(`Are you sure you want to revoke ${requestType} access from ${email}?`)) {
      return;
    }

    try {
      // Use API URL from environment
      const apiBaseUrl = import.meta.env.VITE_API_URL;
      const apiUrl = `${apiBaseUrl}/api/revoke-access`;
      console.log(`Sending revoke access request to: ${apiUrl}`);

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          requestType,
          adminEmail: localStorage.getItem('adminEmail')
        })
      });

      // Get response text for error handling
      const responseText = await response.text();
      console.log(`Revoke access response: ${responseText}`);

      let responseData;
      try {
        // Check if the response is HTML (contains HTML tags)
        if (responseText.includes('<html>') || responseText.includes('<!DOCTYPE html>')) {
          console.error('Server returned HTML instead of JSON:', responseText);
          throw new Error('Server returned HTML instead of JSON. This might be due to a proxy or CORS issue.');
        }

        responseData = JSON.parse(responseText);
      } catch (e) {
        console.error('Failed to parse response as JSON:', responseText);
        throw new Error(`Failed to parse server response: ${responseText.substring(0, 100)}${responseText.length > 100 ? '...' : ''}`);
      }

      if (!response.ok) {
        const errorMessage = responseData?.message || 'Failed to revoke access';
        console.error(`Error revoking access: ${errorMessage}`);
        throw new Error(errorMessage);
      }

      // Update approvedUsers in localStorage
      const approvedUsers = JSON.parse(localStorage.getItem('approvedUsers') || '[]');
      const updatedApprovedUsers = approvedUsers.filter((user: any) =>
        !(user.email === email && user.accessType === requestType)
      );
      localStorage.setItem('approvedUsers', JSON.stringify(updatedApprovedUsers));

      // Refresh access requests
      fetchData();

      // Show success message
      alert(`Access revoked from ${email} for ${requestType}`);
    } catch (error) {
      console.error('Error revoking access:', error);
      alert(`Failed to revoke access: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again.`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B1121] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        {metrics && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-lg font-medium text-gray-600">Total Users</h3>
              <p className="text-3xl font-bold text-gray-900 mt-2">{metrics.totalUsers}</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-lg font-medium text-gray-600">Active Users (24h)</h3>
              <p className="text-3xl font-bold text-gray-900 mt-2">{metrics.activeUsers}</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-lg font-medium text-gray-600">Newsletter Subscribers</h3>
              <p className="text-3xl font-bold text-gray-900 mt-2">{metrics.newsletterSubscribers}</p>
            </div>
          </div>
        )}

        <div className="mb-6">
          <div className="flex border-b border-gray-700 mb-4">
            <button
              className={`px-4 py-2 font-medium ${activeTab === 'requests' ? 'text-white border-b-2 border-blue-500' : 'text-gray-400 hover:text-gray-300'}`}
              onClick={() => setActiveTab('requests')}
            >
              Access Requests
            </button>
            <button
              className={`px-4 py-2 font-medium ${activeTab === 'activity' ? 'text-white border-b-2 border-blue-500' : 'text-gray-400 hover:text-gray-300'}`}
              onClick={() => setActiveTab('activity')}
            >
              Deal Room Activity
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8" style={{ display: activeTab === 'requests' ? 'grid' : 'none' }}>
          <div className="bg-[#111827] p-6 rounded-xl lg:col-span-2">
            <h2 className="text-xl font-bold text-white mb-4">Access Requests</h2>
            {accessRequests.length === 0 ? (
              <p className="text-gray-300 text-center py-4">No access requests found</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Request Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Timestamp</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {accessRequests.map((request: any, index: number) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{request.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{request.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{request.requestType}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {new Date(request.timestamp).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${request.status === 'pending' ? 'bg-yellow-200 text-yellow-800' : request.status === 'approved' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {request.status === 'pending' && (
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleAccessRequest(index, 'approve')}
                                className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-xs"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => handleAccessRequest(index, 'deny')}
                                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs"
                              >
                                Deny
                              </button>
                            </div>
                          )}
                          {request.status === 'approved' && (
                            <button
                              onClick={() => handleRevokeAccess(request.email, request.requestType)}
                              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs"
                            >
                              Revoke
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="bg-[#111827] p-6 rounded-xl">
            <h2 className="text-xl font-bold text-white mb-4">Grant Access Manually</h2>
            <form onSubmit={handleManualGrant} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={manualEmail}
                  onChange={(e) => setManualEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="user@example.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Name (Optional)</label>
                <input
                  type="text"
                  id="name"
                  value={manualName}
                  onChange={(e) => setManualName(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="User's name"
                />
              </div>
              <div>
                <label htmlFor="requestType" className="block text-sm font-medium text-gray-300 mb-1">Access Type</label>
                <select
                  id="requestType"
                  value={manualRequestType}
                  onChange={(e) => setManualRequestType(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="dealRoom">Deal Room</option>
                  <option value="portfolioOS">Portfolio OS</option>
                  <option value="techDemo">Tech Demo</option>
                </select>
              </div>
              <button
                type="submit"
                disabled={isGranting || !manualEmail}
                className={`w-full px-4 py-2 text-white rounded-md ${isGranting || !manualEmail ? 'bg-blue-700 opacity-70 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
              >
                {isGranting ? 'Granting Access...' : 'Grant Access'}
              </button>
            </form>
            <div className="mt-6 border-t border-gray-700 pt-4">
              <h3 className="text-md font-medium text-white mb-2">Instructions</h3>
              <ul className="text-sm text-gray-400 list-disc pl-5 space-y-1">
                <li>Use this form to manually grant access to users without requiring them to request it first.</li>
                <li>The user will have immediate access to the selected resource.</li>
                <li>You can revoke access at any time using the "Revoke" button in the access requests table.</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 mb-8" style={{ display: activeTab === 'activity' ? 'grid' : 'none' }}>
          <div className="bg-[#111827] p-6 rounded-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Deal Room Activity</h2>
              <button
                onClick={fetchData}
                className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600 text-xs flex items-center"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </button>
            </div>
            {dealRoomActivities.length === 0 ? (
              <p className="text-gray-300 text-center py-4">No activity recorded yet</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">User</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Action</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Document</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {dealRoomActivities.map((activity: any, index: number) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-8 w-8 bg-gray-700 rounded-full flex items-center justify-center text-white font-medium">
                              {activity.name ? activity.name.charAt(0).toUpperCase() : 'U'}
                            </div>
                            <div className="ml-3">
                              <div className="text-sm font-medium text-white">{activity.name}</div>
                              <div className="text-xs text-gray-400">{activity.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${activity.action === 'view' ? 'bg-blue-200 text-blue-800' : activity.action === 'download' ? 'bg-green-200 text-green-800' : activity.action === 'exit' ? 'bg-gray-200 text-gray-800' : 'bg-purple-200 text-purple-800'}`}>
                            {activity.action.charAt(0).toUpperCase() + activity.action.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {activity.documentName || (activity.action === 'view' && !activity.documentId ? 'Deal Room' : activity.action === 'exit' ? 'Deal Room' : '-')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {new Date(activity.timestamp).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-[#111827] p-6 rounded-xl">
            <h2 className="text-xl font-bold text-white mb-4">Recent User Activity</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Last Active</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {activities.map((activity: any) => (
                    <tr key={activity._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{activity.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {new Date(activity.lastActive).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-[#111827] p-6 rounded-xl">
            <h2 className="text-xl font-bold text-white mb-4">Newsletter Subscribers</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Subscribed At</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {subscribers.map((subscriber: any) => (
                    <tr key={subscriber._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{subscriber.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {new Date(subscriber.subscribedAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;