import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Metrics {
  totalUsers: number;
  activeUsers: number;
  newsletterSubscribers: number;
}

const API_URL = import.meta.env.VITE_API_URL || 'https://equihome-seed-api-pnk9i.ondigitalocean.app/api';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [activities, setActivities] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [accessRequests, setAccessRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const adminEmail = localStorage.getItem('adminEmail');
    if (!adminEmail || adminEmail !== 'sujay@equihome.com.au') {
      navigate('/admin/login');
      return;
    }

    const fetchData = async () => {
      try {
        // Fetch data from API
        const [metricsRes, activitiesRes, subscribersRes, accessRequestsRes] = await Promise.all([
          fetch(`${API_URL}/admin/metrics`),
          fetch(`${API_URL}/admin/user-activity`),
          fetch(`${API_URL}/admin/newsletter-subscribers`),
          fetch('/api/access-requests')
        ]);

        if (!metricsRes.ok || !activitiesRes.ok || !subscribersRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const [metricsData, activitiesData, subscribersData] = await Promise.all([
          metricsRes.json(),
          activitiesRes.json(),
          subscribersRes.json()
        ]);

        // Process access requests
        let accessRequestsData = [];
        if (accessRequestsRes.ok) {
          accessRequestsData = await accessRequestsRes.json();
        } else {
          // Fallback to localStorage if API fails
          console.warn('Failed to fetch access requests from API, falling back to localStorage');
          accessRequestsData = JSON.parse(localStorage.getItem('accessRequests') || '[]');
        }

        setMetrics(metricsData);
        setActivities(activitiesData);
        setSubscribers(subscribersData);
        setAccessRequests(accessRequestsData);
      } catch (err) {
        setError('Failed to load dashboard data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

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

    try {
      // Update request status via API
      const response = await fetch(`/api/access-requests/${requestId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          status,
          adminEmail: localStorage.getItem('adminEmail')
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update access request');
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
      alert('Failed to update access request. Please try again.');
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

        <div className="grid grid-cols-1 gap-8 mb-8">
          <div className="bg-[#111827] p-6 rounded-xl">
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