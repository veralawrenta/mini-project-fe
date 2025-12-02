import Link from "next/link";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function OrganizerDashboard() {
  const [reviews, setReviews] = useState([]);

  const [events, setEvents] = useState([]);

  // Fetch data from backend
  useEffect(() => {
    async function fetchData() {
      try {
        const reviewRes = await fetch('/api/organizer/reviews');
        const eventRes = await fetch('/api/organizer/events');

        setReviews(await reviewRes.json());
        setEvents(await eventRes.json());
      } catch (err) {
        console.error('Failed to load organizer data', err);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="px-4 md:px-10 lg:px-20 py-10 grid gap-10">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Organizer Dashboard</h1>
        <Button asChild className="rounded-2xl shadow-md px-6 py-2 text-lg">
          <Link href="/organizer/events/create">Create Event</Link>
        </Button>
      </div>

      {/* Review Section */}
      <section className="grid gap-4">
        <h2 className="text-2xl font-semibold">Reviews</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {reviews.map((r) => (
            <Card key={r.id} className="rounded-2xl shadow-md p-4">
              <CardContent>
                <p className="font-semibold">{r.user}</p>
                <p className="text-yellow-500">{"★".repeat(r.rating)}</p>
                <p className="text-gray-700 mt-1">{r.comment}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Events Section */}
      <section className="grid gap-4">
        <h2 className="text-2xl font-semibold">Your Events</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {events.map((e) => (
            <Card key={e.id} className="rounded-2xl shadow-md p-4">
              <CardContent className="flex flex-col gap-2">
                <h3 className="text-xl font-medium">{e.title}</h3>
                <p className="text-gray-600">Date: {e.date}</p>
                <Button asChild variant="outline" className="rounded-xl mt-2">
                  <Link href={`/organizer/events/${e.id}`}>View Event</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
