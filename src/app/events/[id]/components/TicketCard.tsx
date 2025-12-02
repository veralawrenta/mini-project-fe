import { Events } from "@/types/events";

interface EventTicketPreviewProps {
  price: number;
  availableSeats: number;
}

const EventTicketCard = ({ price, availableSeats }: EventTicketPreviewProps) => {
    const isSoldOut = availableSeats === 0;

    return (
    <div className="border border-gray-300 rounded-xl p-4 mb-6">
      <h3 className="font-bold text-lg mb-2">Regular Ticket</h3>
      <p className="text-primary font-bold text-xl mb-2">IDR {price.toLocaleString("id-ID")}</p>
      <p className="text-sm text-gray-600 mb-2">Available Seats: {availableSeats}</p>
      <p className="text-sm text-gray-600 mb-4">Access to all general areas</p>
      <button
        className={`w-full py-3 rounded-lg text-white font-bold transition-colors ${
          isSoldOut ? "bg-gray-400 cursor-not-allowed" : "bg-primary hover:bg-purple-600"
        }`}
        disabled={isSoldOut}
      >
        {isSoldOut ? "Sold Out" : "Get Tickets"}
      </button>
    </div>
  );
};

export default EventTicketCard;
