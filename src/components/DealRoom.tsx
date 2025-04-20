import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalHeader from './GlobalHeader';
import { FaFileAlt, FaDownload, FaChartLine, FaTable, FaLock } from 'react-icons/fa';

interface Document {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  downloadUrl: string;
  isLocked: boolean;
}

const DealRoom = () => {
  const navigate = useNavigate();
  const [hasAccess, setHasAccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [documents, setDocuments] = useState<Document[]>([]);

  useEffect(() => {
    const checkAccess = async () => {
      setIsLoading(true);
      const userEmail = localStorage.getItem('userEmail');
      
      if (!userEmail) {
        setHasAccess(false);
        setIsLoading(false);
        navigate('/login', { state: { from: '/deal-room' } });
        return;
      }
      
      try {
        // First check localStorage for offline functionality
        const approvedUsers = JSON.parse(localStorage.getItem('approvedUsers') || '[]');
        const hasLocalAccess = approvedUsers.some((user: any) => 
          user.email === userEmail && user.accessType === 'dealRoom'
        );
        
        if (hasLocalAccess) {
          setHasAccess(true);
          setIsLoading(false);
          loadDocuments();
          return;
        }
        
        // Then check with the server
        const response = await fetch(`/api/check-access?email=${encodeURIComponent(userEmail)}&resourceType=dealRoom`);
        
        if (response.ok) {
          const data = await response.json();
          
          if (data.hasAccess) {
            setHasAccess(true);
            loadDocuments();
            
            // Update localStorage for offline functionality
            if (!approvedUsers.some((user: any) => user.email === userEmail && user.accessType === 'dealRoom')) {
              approvedUsers.push({
                email: userEmail,
                name: localStorage.getItem('userName') || 'User',
                accessType: 'dealRoom',
                approvedAt: data.since || new Date().toISOString()
              });
              localStorage.setItem('approvedUsers', JSON.stringify(approvedUsers));
            }
          } else {
            setHasAccess(false);
            navigate('/launchpad');
          }
        } else {
          // If API fails, check if we have a pending request
          const accessRequests = JSON.parse(localStorage.getItem('accessRequests') || '[]');
          const hasPendingRequest = accessRequests.some((req: any) => 
            req.email === userEmail && req.requestType === 'dealRoom' && req.status === 'pending'
          );
          
          if (hasPendingRequest) {
            alert('Your access request is still pending. You will be notified when access is granted.');
          } else {
            alert('You do not have access to the Deal Room. Please request access from the Launchpad.');
          }
          
          navigate('/launchpad');
        }
      } catch (error) {
        console.error('Error checking access:', error);
        setHasAccess(false);
        navigate('/launchpad');
      } finally {
        setIsLoading(false);
      }
    };
    
    const loadDocuments = () => {
      // In a real app, these would be loaded from an API
      setDocuments([
        {
          id: 'financial-model',
          title: 'Financial Model',
          description: 'Detailed financial projections and investment returns analysis',
          icon: <FaChartLine className="text-green-600" />,
          downloadUrl: '#',
          isLocked: false
        },
        {
          id: 'term-sheet',
          title: 'Term Sheet',
          description: 'Investment terms and conditions for the seed round',
          icon: <FaFileAlt className="text-blue-600" />,
          downloadUrl: '#',
          isLocked: false
        },
        {
          id: 'due-diligence',
          title: 'Due Diligence Pack',
          description: 'Comprehensive business and legal documentation',
          icon: <FaTable className="text-purple-600" />,
          downloadUrl: '#',
          isLocked: false
        },
        {
          id: 'investor-deck',
          title: 'Investor Presentation',
          description: 'Detailed pitch deck with market analysis and growth strategy',
          icon: <FaFileAlt className="text-orange-600" />,
          downloadUrl: '#',
          isLocked: false
        }
      ]);
    };
    
    checkAccess();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <GlobalHeader currentPage="deal-room" />
        <div className="pt-[72px] min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-600 mb-4"></div>
            <p className="text-gray-600">Loading Deal Room...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!hasAccess) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-white">
      <GlobalHeader currentPage="deal-room" />
      
      <div className="pt-[72px] bg-gradient-to-br from-sky-50 via-white to-indigo-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-8 py-16">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Deal Room</h1>
            <p className="text-xl text-gray-600">
              Access confidential financial documents and investment materials for the Equihome seed round.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {documents.map((doc) => (
              <div key={doc.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center mr-4">
                    {doc.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{doc.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{doc.description}</p>
                    
                    {doc.isLocked ? (
                      <div className="flex items-center text-gray-400">
                        <FaLock className="mr-2" />
                        <span>Access Restricted</span>
                      </div>
                    ) : (
                      <a 
                        href={doc.downloadUrl} 
                        className="inline-flex items-center text-sky-600 hover:text-sky-700"
                      >
                        <FaDownload className="mr-2" />
                        <span>Download</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-sky-50 rounded-xl p-6 border border-sky-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Need Additional Information?</h2>
            <p className="text-gray-600 mb-4">
              If you require any additional documents or have questions about the materials provided, 
              please don't hesitate to contact our team.
            </p>
            <a 
              href="mailto:sujay@equihome.com.au" 
              className="inline-flex items-center px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors"
            >
              Contact Investment Team
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealRoom;
