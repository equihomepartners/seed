import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalHeader from './GlobalHeader';
import SimplePDFViewer from './SimplePDFViewer';
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
  FaExternalLinkAlt,
  FaInfoCircle,
  FaPhone,
  FaArrowRight,
  FaUnlock
} from 'react-icons/fa';

interface Document {
  _id: string;
  title: string;
  description: string;
  category: string;
  fileUrl?: string;
  externalUrl?: string;
  pdfUrl?: string;
  iconType: string;
  isLocked: boolean;
  sortOrder: number;
  bookmark?: string;
  createdAt: string;
  updatedAt: string;
  isConverting?: boolean;
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
  financial: {
    id: 'financial',
    name: 'Financial Documents',
    description: 'Financial models and projections',
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
  presentation: {
    id: 'presentation',
    name: 'Presentations',
    description: 'Investor presentations and decks',
    icon: <FaFilePowerpoint />,
    color: 'blue'
  },
  technical: {
    id: 'technical',
    name: 'Technical Documentation',
    description: 'Technical architecture and documentation',
    icon: <FaFileAlt />,
    color: 'gray'
  },
  techdemo: {
    id: 'techdemo',
    name: 'Case Study (Tech)',
    description: 'Real work case study on a real transaction',
    icon: <FaGlobe />,
    color: 'cyan'
  },
  marketing: {
    id: 'marketing',
    name: 'Marketing Material',
    description: 'Marketing materials and investor presentations',
    icon: <FaFileAlt />,
    color: 'purple'
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
  const [selectedPdf, setSelectedPdf] = useState<{ url: string; title: string } | null>(null);

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
        const fileUrl = doc.fileUrl.toLowerCase();

        // If it's a PDF, show it in the viewer
        if (fileUrl.endsWith('.pdf')) {
          setSelectedPdf({
            url: doc.fileUrl,
            title: doc.title
          });
        }
        // If it's a Word document, Excel, or PowerPoint, open in a new tab
        // Note: In production, you should replace these with PDF versions
        else {
          window.open(doc.fileUrl, '_blank');
        }
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

      // Hardcoded permanent access for specific users
      const permanentAccessUsers = ['taurian@equihome.com.au', 'namb.jay@gmail.com', 'vmenon1309@yahoo.co.uk', 'ian@equihome.com.au', 'kaden@fundlaunchpartners.com', 'acquisitions@fundlaunchpartners.com', 'andrea@maincharactercapital.com'];
      if (permanentAccessUsers.includes(userEmail)) {
        console.log('Granting permanent access to deal room');
        setHasAccess(true);
        await loadDocuments();
        setIsLoading(false);
        trackActivity('view');
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
        console.log('DEVELOPMENT MODE: Using hardcoded documents');

        // Hardcoded documents for development - only the specified cards
        const docs = [
          // Case Study (Tech) - Featured at the top
          {
            _id: 'tech-demo',
            title: 'Case Study (Tech)',
            description: 'Real work case study on a real transaction that took place in 2019 and transacted 2023. This is a case study as if we underwrote that loan, this is a below market loan in a green suburb that we typically might not invest in. The case study walks you through how our technology assesses the deal at a high level from a unit to portfolio level risk lens.',
            category: 'techdemo',
            iconType: 'web',
            externalUrl: 'https://equihomepartners.github.io/case-study/',
            isLocked: false,
            sortOrder: 1,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          // Financial Documents
          {
            _id: 'investment-thesis',
            title: 'Investment Thesis',
            description: 'Comprehensive analysis of Equihome\'s investment opportunity, market positioning, and growth strategy. Includes detailed financial projections and risk assessment.',
            category: 'financial',
            iconType: 'file',
            fileUrl: 'https://drive.google.com/file/d/17iu1JqbVBNKi1lJX1Rt3DRWHNitWtmbT/view?usp=sharing',
            isLocked: false,
            sortOrder: 1,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            _id: 'fund-financial-model',
            title: 'Full Financial Model - $5M Raise',
            description: 'Financial model with detailed projections for the $5M raise. Includes cash flow projections, ROI analysis, and sensitivity testing.',
            category: 'financial',
            iconType: 'chart',
            fileUrl: 'https://docs.google.com/spreadsheets/d/1gnTgM65loefh437uMM0PfjK4Fj1EZTtk/edit?usp=sharing&ouid=114976098274719191879&rtpof=true&sd=true',
            isLocked: false,
            sortOrder: 2,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            _id: 'swot-analysis',
            title: 'SWOT Analysis',
            description: 'Detailed analysis of Equihome\'s strengths, weaknesses, opportunities, and threats in the current market landscape. Includes competitive positioning.',
            category: 'strategy',
            iconType: 'file',
            fileUrl: 'https://drive.google.com/file/d/1DrNL86SJVyZUCxIs3SIQyo8R3tEbW6zS/view?usp=sharing',
            isLocked: false,
            sortOrder: 1,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },

          // Market Research
          {
            _id: 'competitive-landscape',
            title: 'Competitive Landscape',
            description: 'In-depth analysis of the competitive environment, including direct and indirect competitors, market share, and Equihome\'s unique value proposition.',
            category: 'market',
            iconType: 'file',
            fileUrl: 'https://drive.google.com/file/d/1_gcOqsVVgNzgocEGzY5Mcnu6f2Xr80td/view?usp=sharing',
            isLocked: false,
            sortOrder: 1,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            _id: 'residential-mortgage-market',
            title: 'Residential Mortgage Market',
            description: 'Comprehensive overview of the residential mortgage market, including trends, challenges, and opportunities. Includes market size and growth projections.',
            category: 'market',
            iconType: 'file',
            fileUrl: 'https://drive.google.com/file/d/1G29PkuMyTgSrCMYsNhq0I1k8FNulB-m2/view?usp=sharing',
            isLocked: false,
            sortOrder: 2,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },

          // Strategy Documents
          {
            _id: 'go-to-market',
            title: 'Go to Market Strategy',
            description: 'Detailed plan for market entry and expansion, including target customer segments, marketing channels, and partnership strategies.',
            category: 'strategy',
            iconType: 'file',
            fileUrl: 'https://drive.google.com/file/d/1jVM-7cHmQOLlgZXXmJrnMX3AfcXLpzjK/view?usp=sharing',
            isLocked: false,
            sortOrder: 2,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            _id: 'market-fit',
            title: 'Market Fit Analysis',
            description: 'Analysis of Equihome\'s product-market fit, including customer validation, feedback, and iteration strategy. Includes adoption metrics and projections.',
            category: 'strategy',
            iconType: 'file',
            fileUrl: 'https://drive.google.com/file/d/1pNDGeWBviUbO6MvX6KmsuvRJ6pXsGbFd/view?usp=sharing',
            isLocked: false,
            sortOrder: 3,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },

          // Technical Documents
          {
            _id: 'platform-overview',
            title: 'Platform Overview',
            description: 'Detailed overview of Equihome\'s platform, including system design, infrastructure, and key features.',
            category: 'technical',
            iconType: 'file',
            fileUrl: 'https://drive.google.com/file/d/1v4a5iWvUNLvLBkdKPTNBo6COWhVkLpbV/view?usp=sharing',
            isLocked: false,
            sortOrder: 1,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },

          // Marketing Material
          {
            _id: 'finance-pack',
            title: 'Finance Pack',
            description: 'Outlines Financials and sensitivity testing for a $500m base case fund for our two products and investor returns (no terms structured and is based on negotiation).',
            category: 'marketing',
            iconType: 'file',
            fileUrl: 'https://drive.google.com/file/d/18VBEeORSQ_IzIBBqSV0oLsc5eTu2KOr_/view?usp=sharing',
            isLocked: false,
            sortOrder: 1,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            _id: 'one-pager',
            title: 'One Pager',
            description: 'One pager highlighting the overall business, investor opportunity, asset class, economics.',
            category: 'marketing',
            iconType: 'file',
            fileUrl: 'https://drive.google.com/file/d/1yf7x9NHqbGkfDhu0ZKeufsanalwU_Er7/view?usp=sharing',
            isLocked: false,
            sortOrder: 2,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            _id: 'market-tech-overview',
            title: 'Market and Tech Overview',
            description: 'Market and tech overview presentation summarizing the Australian market and how we leverage technology.',
            category: 'marketing',
            iconType: 'file',
            fileUrl: 'https://drive.google.com/file/d/1nr4vDrORZoUECFH2PvKDNCg6az_HOg8t/view?usp=sharing',
            isLocked: false,
            sortOrder: 3,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            _id: 'simple-introduction-deck',
            title: 'Simple Introduction Deck',
            description: 'Simple introduction deck highlighting Equihome, the problem, and solution.',
            category: 'marketing',
            iconType: 'file',
            fileUrl: 'https://drive.google.com/file/d/1cqlt46gyWXOUqGGBn-TsNcmfw83u1UHT/view?usp=sharing',
            isLocked: false,
            sortOrder: 4,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        ];

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

        // Set active category to Tech Demo if available, otherwise the first one
        if (!activeCategory && Object.keys(byCategory).length > 0) {
          if (byCategory['techdemo']) {
            setActiveCategory('techdemo');
          } else {
            setActiveCategory(Object.keys(byCategory)[0]);
          }
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
    <div className="min-h-screen bg-[#0B1121]">
      <GlobalHeader currentPage="deal-room" />

      {/* PDF Viewer Modal */}
      {selectedPdf && (
        <SimplePDFViewer
          pdfUrl={selectedPdf.url}
          title={selectedPdf.title}
          onClose={() => setSelectedPdf(null)}
        />
      )}

      <div className="pt-[72px] bg-gradient-to-br from-[#0B1121] via-[#0F172A] to-[#1E293B] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 right-0 overflow-hidden h-[500px] -z-10 opacity-20">
            <div className="absolute top-[100px] left-[10%] w-[300px] h-[300px] bg-blue-500/30 rounded-full filter blur-[80px]"></div>
            <div className="absolute top-[150px] right-[15%] w-[250px] h-[250px] bg-purple-500/20 rounded-full filter blur-[80px]"></div>
            <div className="absolute top-[250px] left-[40%] w-[350px] h-[350px] bg-cyan-500/20 rounded-full filter blur-[100px]"></div>
            <div className="grid grid-cols-12 gap-4 absolute inset-0 opacity-5">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="col-span-1 h-full border-r border-white/10"></div>
              ))}
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="col-span-12 w-full border-b border-white/10" style={{ top: `${i * 5}%` }}></div>
              ))}
            </div>
          </div>
          <div className="mb-8 sm:mb-12">
            <div className="flex items-center space-x-3 mb-2">
              <div className="h-8 w-1 bg-gradient-to-b from-blue-500 to-cyan-400 rounded-full"></div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Equihome Deal Room</h1>
            </div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-sm font-medium text-gray-400">Seed Round - $5M Raise</span>
            </div>
            <p className="text-lg text-gray-400 max-w-3xl">
              Welcome to the Equihome Partners Deal Room. This secure environment contains all due diligence materials for our $5M seed round. All documents are confidential and for qualified investors only.
            </p>
          </div>

          {/* Category Navigation */}
          <div className="mb-8 overflow-x-auto">
            <div className="flex space-x-2 pb-2">
              {Object.keys(documentsByCategory).map(categoryId => (
                <button
                  key={categoryId}
                  onClick={() => setActiveCategory(categoryId)}
                  className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                    categoryId === 'techdemo'
                      ? activeCategory === categoryId
                        ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/30 border border-cyan-400/50'
                        : 'bg-gradient-to-r from-cyan-900/30 to-blue-900/30 text-cyan-100 hover:from-cyan-800/40 hover:to-blue-800/40 border border-cyan-500/30'
                      : activeCategory === categoryId
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/20'
                        : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/70 border border-gray-700'
                  }`}
                >
                  {categoryId === 'techdemo' ? '✨ Case Study (Tech)' : categories[categoryId]?.name || categoryId}
                </button>
              ))}
            </div>
          </div>

          {/* No Recently Updated section */}

          {/* Active Category Documents */}
          {activeCategory && documentsByCategory[activeCategory] && (
            <div className="mb-12">
              <div className="flex items-center mb-8">
                <div className="h-6 w-1 bg-gradient-to-b from-blue-500 to-cyan-400 rounded-full mr-3"></div>
                <h2 className={`text-2xl font-semibold ${activeCategory === 'techdemo' ? 'bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent' : 'text-white'}`}>
                  {activeCategory === 'techdemo' ? '✨ Case Study (Tech)' : categories[activeCategory]?.name || activeCategory}
                </h2>
                {documentsByCategory[activeCategory][0]?.bookmark && (
                  <span className="ml-3 px-2 py-1 bg-gray-800 text-gray-300 text-sm rounded-md border border-gray-700">
                    {documentsByCategory[activeCategory][0].bookmark}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {documentsByCategory[activeCategory].map((doc) => {
                  // Define document descriptions based on title
                  let enhancedDescription = doc.description;
                  if (doc.title === "Investment Thesis") {
                    enhancedDescription = "Comprehensive analysis of Equihome's investment opportunity, market positioning, and growth strategy. Includes detailed financial projections and risk assessment.";
                  } else if (doc.title === "Full Financial Model - $5M Raise") {
                    enhancedDescription = "Financial model with detailed projections for the $5M raise. Includes cash flow projections, ROI analysis, and sensitivity testing.";
                  } else if (doc.title === "SWOT Analysis") {
                    enhancedDescription = "Detailed analysis of Equihome's strengths, weaknesses, opportunities, and threats in the current market landscape. Includes competitive positioning.";
                  } else if (doc.title === "Competitive Landscape") {
                    enhancedDescription = "In-depth analysis of the competitive environment, including direct and indirect competitors, market share, and Equihome's unique value proposition.";
                  } else if (doc.title === "Residential Mortgage Market") {
                    enhancedDescription = "Comprehensive overview of the residential mortgage market, including trends, challenges, and opportunities. Includes market size and growth projections.";
                  } else if (doc.title === "Go to Market Strategy") {
                    enhancedDescription = "Detailed plan for market entry and expansion, including target customer segments, marketing channels, and partnership strategies.";
                  } else if (doc.title === "Market Fit Analysis") {
                    enhancedDescription = "Analysis of Equihome's product-market fit, including customer validation, feedback, and iteration strategy. Includes adoption metrics and projections.";
                  } else if (doc.title === "Introduction Deck - Updated") {
                    enhancedDescription = "Latest investor presentation deck with updated financials, team information, and market analysis. Includes executive summary and investment highlights.";
                  }

                  // Special styling for Tech Demo card
                  const isTechDemo = doc.category === 'techdemo';

                  return (
                    <div
                      key={doc._id}
                      className={`${isTechDemo
                        ? 'bg-gradient-to-br from-blue-900/60 to-cyan-900/60 backdrop-blur-sm rounded-xl border border-cyan-500/50 p-6 hover:shadow-lg hover:shadow-cyan-500/30 hover:border-cyan-400/50 transition-all group'
                        : 'bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6 hover:shadow-lg hover:shadow-blue-900/20 hover:border-blue-900/30 transition-all group'
                      }`}
                    >
                      <div className="flex items-start">
                        <div className={`w-12 h-12 rounded-lg ${isTechDemo
                          ? 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center mr-4 text-cyan-400 group-hover:text-cyan-300 transition-colors'
                          : 'bg-gradient-to-br from-blue-500/10 to-cyan-500/10 flex items-center justify-center mr-4 text-blue-400 group-hover:text-blue-300 transition-colors'
                        }`}>
                          {getDocumentIcon(doc)}
                        </div>
                        <div className="flex-1">
                          <h3 className={`text-lg font-semibold mb-2 ${isTechDemo
                            ? 'text-cyan-100 group-hover:text-cyan-200 transition-colors'
                            : 'text-white group-hover:text-blue-300 transition-colors'
                          }`}>{doc.title}</h3>
                          <p className="text-gray-400 text-sm mb-4 line-clamp-3">{enhancedDescription}</p>

                          <div className="flex justify-between items-center">
                            <div>
                              {doc.isLocked ? (
                                <div className="flex items-center text-gray-500">
                                  <FaLock className="mr-2" />
                                  <span>Access Restricted</span>
                                </div>
                              ) : doc.externalUrl ? (
                                <button
                                  onClick={() => handleDocumentAction(doc, 'open')}
                                  className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                                >
                                  <FaExternalLinkAlt className="mr-2" />
                                  <span>Open Link</span>
                                </button>
                              ) : (
                                <div className="flex space-x-4">
                                  <button
                                    onClick={() => handleDocumentAction(doc, 'view')}
                                    className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                                  >
                                    <FaFileAlt className="mr-2" />
                                    <span>View</span>
                                  </button>
                                  <button
                                    onClick={() => handleDocumentAction(doc, 'download')}
                                    className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                                  >
                                    <FaDownload className="mr-2" />
                                    <span>Download</span>
                                  </button>
                                </div>
                              )}
                            </div>
                            <div className="text-xs text-gray-500">
                              {doc.updatedAt ? new Date(doc.updatedAt).toLocaleDateString() : ''}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
            <div className="relative z-10">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                <FaInfoCircle className="mr-2 text-blue-400" />
                Need Additional Information?
              </h2>
              <p className="text-gray-400 mb-6 max-w-3xl">
                If you require any additional documents or have questions about the materials provided,
                please don't hesitate to contact our investment team. We're here to provide you with all the information you need to make an informed decision.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="mailto:sujay@equihome.com.au"
                  className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-colors shadow-lg shadow-blue-500/20"
                >
                  <FaEnvelope className="mr-2" />
                  Contact Investment Team
                </a>
                <a
                  href="tel:+61400000000"
                  className="inline-flex items-center px-5 py-2.5 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors border border-gray-600"
                >
                  <FaPhone className="mr-2" />
                  Schedule a Call
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealRoom;
