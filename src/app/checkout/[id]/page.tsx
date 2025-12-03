// app/checkout/[eventid]/page.tsx

"use client";
// Mark as Client Component since it uses hooks (useParams, useQuery, useState, etc.)

import { useParams } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // Import TanStack Query components
import CheckoutSummary from "./components/CheckoutSummary";

const queryClient = new QueryClient();

const CheckoutContent = () => {
  const params = useParams();
  const eventId = params.eventId
  return (
    <div className="container mx-auto p-4 md:p-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Secure Checkout</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <p className="text-lg font-semibold text-gray-700 mb-4">
            Order Details will appear here, mirroring the inputs from the
            summary.
          </p>
        </div>

        <div className="lg:w-1/3">
          <CheckoutSummary />
        </div>
      </div>
    </div>
  );
};

const CheckoutPage = () => {
  // This provides the necessary context for the useQuery hook inside CheckoutSummary
  return (
    <QueryClientProvider client={queryClient}>
      <CheckoutContent />
    </QueryClientProvider>
  );
};

export default CheckoutPage;
