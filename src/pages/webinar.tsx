import WebinarRegistration from '../components/WebinarRegistration'
import GlobalHeader from '../components/GlobalHeader'

const WebinarPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <GlobalHeader currentPage="webinar" />
      <WebinarRegistration />
    </div>
  )
}

export default WebinarPage 