
import { Events } from "@/types/events";
import { notFound } from "next/navigation";

export const getEvent = async (id: string) => {
  const url = `http://localhost:8000/events/${id}`;
  const response = await fetch(url);
  if (!response.ok) return notFound();
  const event: Events = await response.json();
  return event;
};