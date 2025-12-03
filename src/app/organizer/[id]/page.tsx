import Navbar from "@/app/components/Navbar"
import Introduction from "./components/Introduction"
import OrganizerDashboard from "./components/OrganizerPage"
import Footer from "@/app/components/Footer"

const OrganizerPage = () => {
  return (
    <div>
        <Navbar />
        <Introduction />
        <OrganizerDashboard />
        <Footer/>
    </div>
  )
}

export default OrganizerPage