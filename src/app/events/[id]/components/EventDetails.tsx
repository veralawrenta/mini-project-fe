import { Events } from "@/types/events";
import { format } from "date-fns";
import { Calendar, MapPin, Ticket } from "lucide-react";

interface EventDetailMainProps {
  event: Events;
}

const EventDetailMain = ({ event }: EventDetailMainProps) => {
  return (
    <div className="container mx-auto flex flex-col gap-6 space-y-12 py-10">
      {event.banner && (
        <div className="relative w-full overflow-hidden rounded-2xl shadow-2xl">
        <div
          className="w-full h-96 lg:h-[400px] bg-center bg-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
          style={{ backgroundImage: `url(${event.banner})` }}
        ></div>
        </div>
      )}

      {/* Title & Info */}
      <div className="container mx-auto max-w-4xl md:max-w-full ">
      <p className="text-accent-foreground font-semibold text-lg mb-2 uppercase tracking-wider">{event.category}</p>
        <h1 className="text-4xl font-extrabold md:text-5xl lg:text-6xl tracking-tight text-foreground">{event.title}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            <div className="flex items-center gap-4 rounded-lg p-4 bg-secondary border border-gray-100 shadow-lg">
              <Calendar className="text-purple-600 w-6 h-6" />
              <div>
                <h3 className="font-bold text-base">Date & Time</h3>
                <p className="text-sm text-gray-600">
                  {event.date ? format(new Date(event.date), "dd MMM yyyy") : "-"}{" "}
                  {event.startTime && event.endTime ? `(${event.startTime} - ${event.endTime})` : ""}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-lg p-4 bg-secondary border border-gray-100 shadow-lg">
              <MapPin className="text-purple-600 w-6 h-6" />
              <div>
                <h3 className="font-bold text-base">Location</h3>
                <p className="text-sm text-gray-600">{event.venue}, {event.address}, {event.city}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-lg p-4 bg-secondary border border-gray-100 shadow-lg">
              <Ticket className="text-purple-600 w-6 h-6" />
              <div>
                <h3 className="font-bold text-base">Tickets Left</h3>
                <p className="text-sm text-gray-600">{event.availableSeats}</p>
              </div>
            </div>
        </div>
      </div>

      {/* Description */}
      <div className="prose max-w-none">
        <h2 className="text-xl font-bold mb-2 text-primary">About this Event</h2>
        <p className="text-base text-justify text-foreground">{event.description}</p>
      </div>
    </div>
  );
};

export default EventDetailMain;
