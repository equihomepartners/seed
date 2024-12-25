import WebinarRegistration from '../components/WebinarRegistration'
import GlobalHeader from '../components/GlobalHeader'

const WebinarPage = () => {
  return (
    <div className="min-h-screen bg-[#0B1121]">
      <GlobalHeader currentPage="webinar" />
      <WebinarRegistration />
    </div>
  )
}

export default WebinarPage 