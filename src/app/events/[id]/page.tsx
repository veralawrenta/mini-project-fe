"use client";

import { axiosInstance } from "@/lib/axios";
import { Events } from "@/types/events";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import EventDetailMain from "./components/EventDetails";
import EventTicketCard from "./components/TicketCard";

const EventDetailPage = () => {
  const params = useParams();
  const eventId = params.id;

  const { data: event, isLoading } = useQuery<Events>({
    queryKey: ["event", eventId],
    queryFn: async () => {
      const res = await axiosInstance.get<Events>(`/events/${eventId}`);
      return res.data;
    },
  });

  if (isLoading || !event) {
    return <div className="text-center py-20 text-primary font-bold">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12 lg:flex lg:gap-12">

      <div className="lg:flex-1">
        <EventDetailMain event={event} />
      </div>

      <div className="lg:w-96 mt-8 lg:mt-0">
        <EventTicketCard price={event.price} availableSeats={event.availableSeats} />
      </div>
    </div>
  );
};

export default EventDetailPage;
