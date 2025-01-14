import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Metrics {
  totalUsers: number;
  activeUsers: number;
  newsletterSubscribers: number;
}

const API_URL = process.env.REACT_APP_API_URL || 'https://equihome-seed-api-pnk9i.ondigitalocean.app/api';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [activities, setActivities] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
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
        const [metricsRes, activitiesRes, subscribersRes] = await Promise.all([
          fetch(`${API_URL}/admin/metrics`),
          fetch(`${API_URL}/admin/user-activity`),
          fetch(`${API_URL}/admin/newsletter-subscribers`)
        ]);

        if (!metricsRes.ok || !activitiesRes.ok || !subscribersRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const [metricsData, activitiesData, subscribersData] = await Promise.all([
          metricsRes.json(),
          activitiesRes.json(),
          subscribersRes.json()
        ]);

        setMetrics(metricsData);
        setActivities(activitiesData);
        setSubscribers(subscribersData);
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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B1121] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0B1121] flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B1121] p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        {metrics && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-[#111827] p-6 rounded-xl">
              <h3 className="text-lg font-medium text-gray-400">Total Users</h3>
              <p className="text-3xl font-bold text-white mt-2">{metrics.totalUsers}</p>
            </div>
            <div className="bg-[#111827] p-6 rounded-xl">
              <h3 className="text-lg font-medium text-gray-400">Active Users (24h)</h3>
              <p className="text-3xl font-bold text-white mt-2">{metrics.activeUsers}</p>
            </div>
            <div className="bg-[#111827] p-6 rounded-xl">
              <h3 className="text-lg font-medium text-gray-400">Newsletter Subscribers</h3>
              <p className="text-3xl font-bold text-white mt-2">{metrics.newsletterSubscribers}</p>
            </div>
          </div>
        )}

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