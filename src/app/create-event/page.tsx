import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import FillEventForm from "./components/CreateEventForm";

const CreateEvent = async () => {
    //const session = await auth();
  
    //if (!session?.user.email) return redirect("/login");
  
    return (
      <div>
        <Navbar />
        <FillEventForm />
        <Footer />
      </div>
    );
  };
  
  export default CreateEvent;