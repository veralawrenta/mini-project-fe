import { getEvent } from "@/api/get-event";
import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface EventDetailProps {
  params: { id: string };
}

const EventDetail = async ({ params }: EventDetailProps) => {
  const { id } = await params;
  const event = await getEvent(id);
  return (
    <div className="bg-black">
      <Navbar />

      <div className="container mx-auto p-4 space-y-2">
        
        <div className="relative w-full h-[260px] mb-6">
          <Image
            src={event.banner}
            alt="thumbnail"
            className="object-cover rounded-xl border-2 border-primary"
            fill
          />
        </div>
        <h1 className="text-4xl font-bold text-secondary">{event.title}</h1>
        <h3 className="text-2xl font-semibold">{event.date ? new Date(event.date).toLocaleDateString() : "-"}</h3>
        <h4>
          {event.startTime} - {event.endTime}
        </h4>
        <p>{event.description}</p>
        <p>{event.venue}</p>
        <p>
          {event.address} - {event.city}
        </p>
        <p>Seat available: {event.availableSeats}</p>
        <p className="text-2xl font-semibold text-right">
          {event.price === 0 ? "FREE" : `IDR ${event.price.toLocaleString()}`}
        </p>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default EventDetail;
