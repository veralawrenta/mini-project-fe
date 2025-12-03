'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { axiosInstance } from "@/lib/axios";
import { Events } from "@/types/events";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Review {
  id: number;
  transactionId: number;
  rating: number;
  comment: string;
  userId: number
}

export default function OrganizerDashboard() {
  const router = useRouter();
  const id  = router.push
  
  const [reviews, setReviews] = useState<Review[]>([]);
  const [events, setEvents] = useState<Events[]>([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return;

    async function fetchData() {
      try {
        const reviewRes = await axiosInstance.get(`/reviews/organizer/${id}`);
        const eventRes = await axiosInstance.get(`/events/organizer/${id}`);

        setReviews(reviewRes.data);
        setEvents(eventRes.data);
      } catch (err) {
        console.error('Failed to load organizer data', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  return (
    <div className="px-4 md:px-10 lg:px-20 py-10 grid gap-10">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Organizer Dashboard</h1>
        <Button asChild className="rounded-2xl shadow-md px-6 py-2 text-lg">
          <Link href="/create-event">Create Event</Link>
        </Button>
      </div>

      <section className="grid gap-4">
        <h2 className="text-2xl font-semibold">Reviews Received</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {reviews.map((r) => (
            <Card key={r.id} className="rounded-2xl shadow-md p-4">
              <CardContent>
                <p className="font-semibold">{r.userId}</p>
                <p className="text-yellow-500">{"★".repeat(r.rating)}</p>
                <p className="text-gray-700 mt-1">{r.comment}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid gap-4">
        <h2 className="text-2xl font-semibold">Your Events</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {events.map((e) => (
            <Card key={e.id} className="rounded-2xl shadow-md p-4">
              <CardContent className="flex flex-col gap-2">
                <h3 className="text-xl font-medium">{e.title}</h3>
                <p className="text-gray-600">Date: {e.venue}</p>
                <Button asChild variant="outline" className="rounded-xl mt-2">
                  <Link href={`/events/organizer/${e.id}`}>View Event</Link> {/*Jav nanti tolong benerin ini bagian kamu soalnya*/}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <section>
        <Button>View Dashboard </Button>
      </section>
    </div>
  );
}
