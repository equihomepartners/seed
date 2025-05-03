import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalHeader from './GlobalHeader';
import { FaArrowLeft, FaExternalLinkAlt } from 'react-icons/fa';

interface TechDemoViewerProps {
  onClose?: () => void;
}

const TechDemoViewer: React.FC<TechDemoViewerProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    const checkAccess = async () => {
      const userEmail = localStorage.getItem('userEmail');

      if (!userEmail) {
        navigate('/login', { state: { from: '/tech-demo' } });
        return;
      }

      // Hardcoded permanent access for specific users
      const permanentAccessUsers = ['taurian@equihome.com.au', 'namb.jay@gmail.com', 'vmenon1309@yahoo.co.uk'];
      if (permanentAccessUsers.includes(userEmail)) {
        console.log('Granting permanent access to tech demo');
        setHasAccess(true);
        setIsLoading(false);
        return;
      }

      try {
        // Check with the server
        const response = await fetch(`/api/check-access?email=${encodeURIComponent(userEmail)}&resourceType=dealRoom`);

        if (response.ok) {
          const data = await response.json();

          if (data.hasAccess) {
            setHasAccess(true);
          } else {
            navigate('/launchpad');
          }
        } else {
          navigate('/launchpad');
        }
      } catch (error) {
        console.error('Error checking access:', error);
        navigate('/launchpad');
      } finally {
        setIsLoading(false);
      }
    };

    checkAccess();

    // Track activity
    const trackActivity = async () => {
      const userEmail = localStorage.getItem('userEmail');
      const userName = localStorage.getItem('userName');

      if (!userEmail) return;

      try {
        // First try the API endpoint
        try {
          await fetch('/api/track-activity', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: userEmail,
              name: userName || userEmail.split('@')[0],
              action: 'view',
              documentName: 'Tech Demo'
            })
          });
          console.log('Activity tracked successfully');
        } catch (apiError) {
          console.log('Activity tracking via API failed, but continuing execution');
        }
      } catch (error) {
        // Silently fail - don't let tracking errors affect the user experience
        console.log('Activity tracking failed, but continuing execution');
      }
    };

    // Try to track activity but don't block on it
    trackActivity().catch(() => {
      console.log('Activity tracking failed, but continuing execution');
    });
  }, [navigate]);

  const handleBack = () => {
    if (onClose) {
      onClose();
    } else {
      navigate('/deal-room');
    }
  };

  const handleOpenInNewTab = () => {
    window.open('https://equihomepartners.github.io/eq-demo/', '_blank');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <GlobalHeader currentPage="tech-demo" />
        <div className="pt-[72px] min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-600 mb-4"></div>
            <p className="text-gray-600">Loading Tech Demo...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!hasAccess) {
    return null; // Will redirect in useEffect
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'hidden'
    }}>
      <GlobalHeader currentPage="tech-demo" />

      <div style={{
        paddingTop: '72px',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        overflow: 'hidden'
      }}>
        <div style={{
          backgroundColor: '#1f2937',
          padding: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <button
            onClick={handleBack}
            style={{
              display: 'flex',
              alignItems: 'center',
              color: '#60a5fa',
              background: 'none',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <FaArrowLeft style={{ marginRight: '8px' }} />
            <span>Back to Deal Room</span>
          </button>

          <button
            onClick={handleOpenInNewTab}
            style={{
              display: 'flex',
              alignItems: 'center',
              color: '#60a5fa',
              background: 'none',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <span>Open in New Tab</span>
            <FaExternalLinkAlt style={{ marginLeft: '8px' }} />
          </button>
        </div>

        <div style={{
          position: 'absolute',
          top: '136px',
          left: 0,
          right: 0,
          bottom: 0,
          overflow: 'hidden'
        }}>
          <iframe
            src="https://equihomepartners.github.io/eq-demo/"
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              display: 'block'
            }}
            title="Equihome Platform Demo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};

export default TechDemoViewer;
