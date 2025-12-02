"use client";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { axiosInstance } from "@/lib/axios";
import { Category, Events } from "@/types/events";
import { PageableResponse, PaginationQueryParams } from "@/types/pagination";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import EventCard from "./ui/EventCard";
import PaginationSection from "./ui/PaginationSection";

const categoryOptions: { id: string; label: string }[] = [
  { id: "all", label: "All Categories" },
  { id: Category.ENTERTAINMENT, label: "Entertainment" },
  { id: Category.BUSINESS, label: "Business" },
  { id: Category.SPORT, label: "Sport" },
  { id: Category.ART, label: "Art" },
  { id: Category.EDUCATION, label: "Education" },
];
const EventList = () => {
  const [category, setCategory] = useState<string>("");
  const [input, setInput] = useState<string>("");
  const [debouncedValue] = useDebounceValue(input, 500);
  const [queries, setQueries] = useState<PaginationQueryParams>({ page: 1 });
  
  const { data: events, isPending } = useQuery({
    queryKey: ["events", queries, debouncedValue, category],
    queryFn: async () => {
      const events = await axiosInstance.get<PageableResponse<Events>>(
        "/events",
        {
          params: { ...queries, search: debouncedValue, category: category === "all" ? undefined : category, },
        }
      );
      return events.data;
    },
  });

  const onClickPagination = (page: number) => {
    setQueries((prev) => ({ ...prev, page }));
  };

  useEffect(() => {
    setQueries({ page: 1 });
  }, [debouncedValue, category]);

  return (
    <div className="container mx-auto px-4 mt-20">
      <div className="mb-12 flex flex-col md:flex-row items-center justify-center gap-4">
        <div className="w-full max-w-3xl">
          <Input
            placeholder="Search events ..."
            className="max-w-3xl"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div className="w-full max-w-xs">
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              {categoryOptions.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <h3
          id="upcoming-events"
          className="font-bold text-3xl mb-4"
        >
          Upcoming Events
        </h3>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 ">
        {isPending && (
          <div className="col-span-3 text-center h-[200px]">
            <p className="text-primary">Loading...</p>
          </div>
        )}

        {events?.data.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
      {!!events?.meta && (
        <PaginationSection meta={events.meta} onClick={onClickPagination} />
      )}
    </div>
  );
};

export default EventList;
