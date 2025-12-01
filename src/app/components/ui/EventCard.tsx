
import { Events } from "@/types/events";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";


interface EventCardProps {
  event: Events;
}

const EventCard = ({ event }: EventCardProps) => {
  return (
    <Link href={`/events/${event.id}`}>
      <div className="border-2 border-muted-foreground bg-muted hover:bg-input rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-[420px]">
        {event.banner && (
          <Image
            width={500}
            height={300}
            src={event.banner}
            alt={event.title}
            className="p-2 w-full h-48 object-cover"
          />
        )}
        <div className="p-6 flex flex-col grow">
          <h2 className="text-l md:text-xl font-semibold mb-2 text-primary text-justify line-clamp-2">
            {event.title}
          </h2>
          <p className="text-accent-foreground mb-1 font-semibold">
            {format(new Date(event.date), "dd MMM yyyy")}
          </p>
          <p className="mb-1">
            {event.startTime || "-"} - {event.endTime || "-"}
          </p>
          <p className="text-accent-foreground mb-2 line-clamp-1">{event.venue}</p>
          <div className="mt-auto flex justify-end">
            <p className="font-bold text-lg text-accent-foreground">
              IDR {event.price.toLocaleString("id-ID")}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
