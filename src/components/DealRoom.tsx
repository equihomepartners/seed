import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalHeader from './GlobalHeader';
import {
  FaFileAlt,
  FaDownload,
  FaChartLine,
  FaTable,
  FaLock,
  FaFolder,
  FaEnvelope,
  FaGlobe,
  FaFilePdf,
  FaFileExcel,
  FaFilePowerpoint,
  FaFileWord,
  FaFileImage,
  FaExternalLinkAlt
} from 'react-icons/fa';

interface Document {
  _id: string;
  title: string;
  description: string;
  category: string;
  fileUrl?: string;
  externalUrl?: string;
  iconType: string;
  isLocked: boolean;
  sortOrder: number;
  bookmark?: string;
  createdAt: string;
  updatedAt: string;
}

// Category definitions
interface CategoryInfo {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const categories: Record<string, CategoryInfo> = {
  company: {
    id: 'company',
    name: 'Company Documentation',
    description: 'Core company documents and information',
    icon: <FaFileAlt />,
    color: 'blue'
  },
  financial: {
    id: 'financial',
    name: 'Financial Models',
    description: 'Financial projections and models',
    icon: <FaChartLine />,
    color: 'green'
  },
  market: {
    id: 'market',
    name: 'Market Research',
    description: 'Market analysis and research',
    icon: <FaChartLine />,
    color: 'purple'
  },
  strategy: {
    id: 'strategy',
    name: 'Strategy',
    description: 'Business and go-to-market strategy',
    icon: <FaFileAlt />,
    color: 'orange'
  },
  technical: {
    id: 'technical',
    name: 'Technical Documentation',
    description: 'Technical architecture and documentation',
    icon: <FaFileAlt />,
    color: 'gray'
  },
  email: {
    id: 'email',
    name: 'Email Documents',
    description: 'Email communications and summaries',
    icon: <FaFileAlt />,
    color: 'teal'
  },
  updated: {
    id: 'updated',
    name: 'Updated Documents',
    description: 'Recently updated documents',
    icon: <FaFileAlt />,
    color: 'red'
  }
};

const DealRoom = () => {
  const navigate = useNavigate();
  const [hasAccess, setHasAccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [documentsByCategory, setDocumentsByCategory] = useState<Record<string, Document[]>>({});
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(false);

  // Track user activity in the Deal Room
  const trackActivity = async (action: string, documentId?: string, documentName?: string) => {
    const userEmail = localStorage.getItem('userEmail');
    const userName = localStorage.getItem('userName');

    if (!userEmail) return;

    try {
      await fetch('/api/track-activity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: userEmail,
          name: userName || userEmail.split('@')[0],
          action,
          documentId,
          documentName
        })
      });
    } catch (error) {
      console.error('Error tracking activity:', error);
    }
  };

  // Handle document download/view
  const handleDocumentAction = (doc: Document, action: 'view' | 'download' | 'open') => {
    // Track the activity
    trackActivity(action, doc._id, doc.title);

    // Handle external URLs
    if (doc.externalUrl && action === 'open') {
      window.open(doc.externalUrl, '_blank');
      return;
    }

    // In a real app, this would either download the file or open it in a viewer
    if (action === 'download') {
      if (doc.fileUrl) {
        // If we have a real file URL, use it
        window.open(doc.fileUrl, '_blank');
      } else {
        // Placeholder for demo
        alert(`Downloading ${doc.title}...`);
      }
    } else if (action === 'view') {
      if (doc.fileUrl) {
        // If we have a real file URL, open it in a new tab
        window.open(doc.fileUrl, '_blank');
      } else {
        // Placeholder for demo
        alert(`Viewing ${doc.title}...`);
      }
    }
  };

  // Get icon for document based on iconType
  const getDocumentIcon = (doc: Document) => {
    // Check if the document has a fileUrl and determine file type from extension
    if (doc.fileUrl) {
      const fileUrl = doc.fileUrl.toLowerCase();
      if (fileUrl.endsWith('.pdf')) {
        return <FaFilePdf className="text-red-600" />;
      } else if (fileUrl.endsWith('.xlsx') || fileUrl.endsWith('.xls') || fileUrl.endsWith('.csv')) {
        return <FaFileExcel className="text-green-600" />;
      } else if (fileUrl.endsWith('.pptx') || fileUrl.endsWith('.ppt')) {
        return <FaFilePowerpoint className="text-orange-600" />;
      } else if (fileUrl.endsWith('.docx') || fileUrl.endsWith('.doc')) {
        return <FaFileWord className="text-blue-600" />;
      } else if (fileUrl.endsWith('.jpg') || fileUrl.endsWith('.png') || fileUrl.endsWith('.gif')) {
        return <FaFileImage className="text-purple-600" />;
      }
    }

    // If no fileUrl or unrecognized extension, use iconType
    switch (doc.iconType) {
      case 'chart':
        return <FaChartLine className="text-green-600" />;
      case 'table':
        return <FaTable className="text-purple-600" />;
      case 'presentation':
        return <FaFilePowerpoint className="text-orange-600" />;
      case 'folder':
        return <FaFolder className="text-yellow-600" />;
      case 'email':
        return <FaEnvelope className="text-blue-600" />;
      case 'web':
        return <FaGlobe className="text-teal-600" />;
      case 'file':
      default:
        return <FaFileAlt className="text-gray-600" />;
    }
  };

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

          // Load documents
          await loadDocuments();
          setIsLoading(false);

          // Track page view
          trackActivity('view');
          return;
        }

        // Then check with the server
        const response = await fetch(`/api/check-access?email=${encodeURIComponent(userEmail)}&resourceType=dealRoom`);

        if (response.ok) {
          const data = await response.json();

          if (data.hasAccess) {
            setHasAccess(true);

            // Load documents
            await loadDocuments();

            // Track page view
            trackActivity('view');

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

    const loadDocuments = async () => {
      try {
        // Check if documents exist, if not initialize
        const docsResponse = await fetch('/api/deal-room/documents');
        let docs = [];

        if (docsResponse.ok) {
          docs = await docsResponse.json();
        }

        // If no documents, initialize the Deal Room
        if (docs.length === 0 && !isInitializing) {
          setIsInitializing(true);
          try {
            const initResponse = await fetch('/api/deal-room/initialize', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              }
            });

            if (initResponse.ok) {
              console.log('Deal Room initialized successfully');
              // Fetch documents again after initialization
              const newDocsResponse = await fetch('/api/deal-room/documents');
              if (newDocsResponse.ok) {
                docs = await newDocsResponse.json();
              }
            } else {
              console.error('Failed to initialize Deal Room');
            }
          } catch (error) {
            console.error('Error initializing Deal Room:', error);
          } finally {
            setIsInitializing(false);
          }
        }

        // Set all documents
        setDocuments(docs);

        // Organize documents by category
        const byCategory: Record<string, Document[]> = {};

        docs.forEach((doc: Document) => {
          if (!byCategory[doc.category]) {
            byCategory[doc.category] = [];
          }
          byCategory[doc.category].push(doc);
        });

        setDocumentsByCategory(byCategory);

        // Set active category to the first one if not set
        if (!activeCategory && Object.keys(byCategory).length > 0) {
          setActiveCategory(Object.keys(byCategory)[0]);
        }
      } catch (error) {
        console.error('Error loading documents:', error);
      }
    };

    checkAccess();

    // Track when user leaves the page
    return () => {
      const userEmail = localStorage.getItem('userEmail');
      if (userEmail && hasAccess) {
        // We can't use the trackActivity function directly here because
        // the fetch might not complete before the component unmounts
        fetch('/api/track-activity', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: userEmail,
            name: localStorage.getItem('userName') || userEmail.split('@')[0],
            action: 'exit',
            timestamp: new Date().toISOString()
          })
        }).catch(err => console.error('Error tracking exit:', err));
      }
    };
  }, [navigate, hasAccess]);

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <div className="mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Deal Room</h1>
            <p className="text-lg sm:text-xl text-gray-600">
              Access confidential financial documents and investment materials for the Equihome seed round.
            </p>
          </div>

          {/* Category Navigation */}
          <div className="mb-8 overflow-x-auto">
            <div className="flex space-x-2 pb-2">
              {Object.keys(documentsByCategory).map(categoryId => (
                <button
                  key={categoryId}
                  onClick={() => setActiveCategory(categoryId)}
                  className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${activeCategory === categoryId ? 'bg-sky-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                >
                  {categories[categoryId]?.name || categoryId}
                </button>
              ))}
            </div>
          </div>

          {/* Updated Documents Section */}
          {documentsByCategory['updated'] && documentsByCategory['updated'].length > 0 && activeCategory !== 'updated' && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                  Updated Documents
                  <span className="ml-2 text-sm font-normal text-gray-500">{documentsByCategory['updated'][0].bookmark}</span>
                </h2>
                <button
                  onClick={() => setActiveCategory('updated')}
                  className="text-sm text-sky-600 hover:text-sky-700"
                >
                  View All
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {documentsByCategory['updated'].slice(0, 3).map((doc) => (
                  <div key={doc._id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center mr-3">
                        {getDocumentIcon(doc)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-semibold text-gray-900 mb-1 truncate">{doc.title}</h3>
                        <p className="text-gray-600 text-xs mb-3 line-clamp-2">{doc.description}</p>

                        {doc.isLocked ? (
                          <div className="flex items-center text-gray-400 text-xs">
                            <FaLock className="mr-1" />
                            <span>Access Restricted</span>
                          </div>
                        ) : doc.externalUrl ? (
                          <button
                            onClick={() => handleDocumentAction(doc, 'open')}
                            className="inline-flex items-center text-xs text-sky-600 hover:text-sky-700"
                          >
                            <FaExternalLinkAlt className="mr-1" />
                            <span>Open Link</span>
                          </button>
                        ) : (
                          <div className="flex space-x-3">
                            <button
                              onClick={() => handleDocumentAction(doc, 'view')}
                              className="inline-flex items-center text-xs text-sky-600 hover:text-sky-700"
                            >
                              <FaFileAlt className="mr-1" />
                              <span>View</span>
                            </button>
                            <button
                              onClick={() => handleDocumentAction(doc, 'download')}
                              className="inline-flex items-center text-xs text-sky-600 hover:text-sky-700"
                            >
                              <FaDownload className="mr-1" />
                              <span>Download</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Active Category Documents */}
          {activeCategory && documentsByCategory[activeCategory] && (
            <div className="mb-8">
              <div className="flex items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">
                  {categories[activeCategory]?.name || activeCategory}
                </h2>
                {documentsByCategory[activeCategory][0]?.bookmark && (
                  <span className="ml-3 px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded">
                    {documentsByCategory[activeCategory][0].bookmark}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {documentsByCategory[activeCategory].map((doc) => (
                  <div key={doc._id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start">
                      <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center mr-4">
                        {getDocumentIcon(doc)}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{doc.title}</h3>
                        <p className="text-gray-600 text-sm mb-4">{doc.description}</p>

                        {doc.isLocked ? (
                          <div className="flex items-center text-gray-400">
                            <FaLock className="mr-2" />
                            <span>Access Restricted</span>
                          </div>
                        ) : doc.externalUrl ? (
                          <button
                            onClick={() => handleDocumentAction(doc, 'open')}
                            className="inline-flex items-center text-sky-600 hover:text-sky-700"
                          >
                            <FaExternalLinkAlt className="mr-2" />
                            <span>Open Link</span>
                          </button>
                        ) : (
                          <div className="flex space-x-4">
                            <button
                              onClick={() => handleDocumentAction(doc, 'view')}
                              className="inline-flex items-center text-sky-600 hover:text-sky-700"
                            >
                              <FaFileAlt className="mr-2" />
                              <span>View</span>
                            </button>
                            <button
                              onClick={() => handleDocumentAction(doc, 'download')}
                              className="inline-flex items-center text-sky-600 hover:text-sky-700"
                            >
                              <FaDownload className="mr-2" />
                              <span>Download</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

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
