import { axiosInstance } from "@/lib/axios";
import { Events } from "@/types/events";
import { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";

interface AppliedDiscount {
  code: string;
  price: number;
}

interface DiscountFormInputs {
  voucherCode: string;
  couponCode: string;
}

const CheckoutSummary = () => {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const priceLocale = "id-ID";
  
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [usePoints, setUsePoints] = useState(false);
  const [voucherInput, setVoucherInput] = useState("");
  const [couponInput, setCouponInput] = useState("");
  const [appliedVoucher, setAppliedVoucher] = useState<AppliedDiscount | null>(
    null
  );
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedDiscount | null>(
    null
  );
  const [discountError, setDiscountError] = useState("");
  const [isApplyingDiscount, setIsApplyingDiscount] = useState(false);

  const { data: event, isLoading: isEventLoading } = useQuery({
    queryKey: ["event", id],
    queryFn: async () => {
      const event = await axiosInstance.get<Events>(`/events/${id}`);
      return event.data;
    },
  });

  const { data: currentUser, isLoading: isUserLoading } = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const user = await axiosInstance.get<User>("/users/me"); //cek ke javier untuk router
      return user.data;
    },
  });
  const isLoading = isEventLoading || isUserLoading;
  if (isLoading)
    return <div className="p-6 text-center">Loading payment summary...</div>;
  if (!event || !currentUser)
    return (
      <div className="p-6 text-center text-red-600">
        Data not found or user is not logged in.
      </div>
    );

  const isVoucherActive = !!appliedVoucher;
  const isCouponActive = !!appliedCoupon;
  const availableSeats = event?.availableSeats ?? 0;
  const pricePerQuantity = event.price || 0;
  const pointsAvailable = currentUser.point || 0;

  const handleIncrement = () => {
    if (ticketQuantity < availableSeats) setTicketQuantity(ticketQuantity + 1);
  };

  const handleDecrement = () => {
    if (ticketQuantity > 1) {
      setTicketQuantity(ticketQuantity - 1);
    }
  };

  const applyDiscount = async (code: string, type: "voucher" | "coupon") => {
    const isCurrentlyActive =
      (type === "voucher" && isVoucherActive) ||
      (type === "coupon" && isCouponActive);

    if (isCurrentlyActive) {
      if (type === "voucher") setAppliedVoucher(null);
      if (type === "coupon") setAppliedCoupon(null);
      setDiscountError("");
      return;
    }

    if (!code) return;
    setDiscountError("");
    setIsApplyingDiscount(true);

    if (type === "voucher") {
      setAppliedCoupon(null);
      setCouponInput(""); // Clear the other input field
    }
    if (type === "coupon") {
      setAppliedVoucher(null);
      setVoucherInput(""); // Clear the other input field
    }

    try {
      const response = await axiosInstance.post(`/vouchers/${id}/validate`, {
        code: code,
        type: type,
      });

      const discountDetails: AppliedDiscount = response.data.discountDetails;

      if (type === "voucher") {
        setAppliedVoucher(discountDetails);
      } else {
        setAppliedCoupon(discountDetails);
      }
    } catch (error) {
      setDiscountError(`Invalid or expired ${type} code.`);
      setAppliedVoucher(null);
      setAppliedCoupon(null);
    } finally {
      setIsApplyingDiscount(false);
    }
  };
  const handleUsePointsChange = (checked: boolean) => {
    setUsePoints(checked);
    setDiscountError("");
  };

  const { subtotal, total, pointsDiscount, voucherDiscount, couponDiscount } =
    useMemo(() => {
      const calculatedSubtotal = ticketQuantity * pricePerQuantity;

      let primaryDiscount = 0;
      let pointsDisc = 0;

      if (appliedVoucher) {
        primaryDiscount = appliedVoucher.price;
      } else if (appliedCoupon) {
        primaryDiscount = appliedCoupon.price;
      }

      if (usePoints) {
        const remainingSubtotal = calculatedSubtotal - primaryDiscount;
        const maxPointsDiscount = pointsAvailable;
        pointsDisc = Math.min(
          maxPointsDiscount,
          Math.max(0, remainingSubtotal)
        );
      }

      const calculatedTotal = Math.max(
        0,
        calculatedSubtotal - (primaryDiscount + pointsDisc)
      );

      return {
        subtotal: calculatedSubtotal,
        pointsDiscount: pointsDisc,
        voucherDiscount: appliedVoucher ? primaryDiscount : 0,
        couponDiscount: appliedCoupon ? primaryDiscount : 0,
        total: calculatedTotal,
      };
    }, [
      ticketQuantity,
      pricePerQuantity,
      appliedVoucher,
      appliedCoupon,
      usePoints,
      pointsAvailable,
    ]);

  return (
    <div className="flex flex-col lg:flex-row gap-8 w-full">
        {/* LEFT COLUMN: Combined Order Details (from CheckoutCard) */}
        <div className="lg:w-2/3">
            <div className="flex flex-col gap-6">
                <h2 className="text-xl font-bold">Order Summary</h2>
                <div className="p-4 rounded-lg border flex flex-col gap-4">
                    {/* Event Header Section */}
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                      <div className="flex flex-col gap-2 flex-[2_2_0px]">
                        <p className="text-lg font-bold">{event.title}</p>
                        <p className="text-sm">
                          {new Date(event.date).toLocaleDateString(priceLocale, {
                            year: 'numeric', month: 'short', day: 'numeric',
                            hour: '2-digit', minute: '2-digit',
                          })}
                        </p>
                        <p className="text-sm">{event.venue}</p>
                      </div>
                      {event.banner && (
                        <div
                          className="w-full sm:w-[200px] aspect-video bg-cover bg-center rounded-lg"
                          style={{ backgroundImage: `url(${event.banner})` }}
                          role="presentation"
                        />
                      )}
                    </div>

                    {/* Ticket Line Item Section */}
                    <div className="flex items-center justify-between py-3 border-t">
                      <div className="flex items-center gap-4">
                        <div className="rounded-lg flex items-center justify-center w-12 h-12 text-primary">
                          <span className="material-symbols-outlined">confirmation_number</span>
                        </div>
                        <div className="flex flex-col">
                          <p className="font-medium line-clamp-1">Regular Ticket</p>
                          <p className="text-sm">
                            {ticketQuantity} x Rp {pricePerQuantity.toLocaleString(priceLocale)}
                          </p>
                        </div>
                      </div>
                      <p className="font-normal">Rp {(ticketQuantity * pricePerQuantity).toLocaleString(priceLocale)}</p>
                    </div>

                    <p className="text-sm mt-2 text-gray-500">
                      Available Seats: {availableSeats}
                    </p>
                </div>
            </div>
        </div>

        {/* RIGHT COLUMN: Discount and Payment Summary */}
        <div className="lg:w-1/3">
            <div className="flex flex-col gap-6 rounded-lg border p-6 shadow-lg">
                <h2 className="text-xl font-bold">Payment Summary</h2>

                {/* Ticket Quantity Display/Control */}
                <div className="flex items-center justify-between">
                  <p className="text-base font-medium">Quantity Control</p>
                  <div className="flex items-center gap-2">
                      <button onClick={handleDecrement} disabled={ticketQuantity <= 1 || isApplyingDiscount} className="w-8 h-8 rounded-full border border-gray-300 text-lg hover:bg-gray-100 disabled:opacity-50">-</button>
                      <span className="font-semibold w-6 text-center">{ticketQuantity}</span>
                      <button onClick={handleIncrement} disabled={ticketQuantity >= availableSeats || isApplyingDiscount} className="w-8 h-8 rounded-full border border-gray-300 text-lg hover:bg-gray-100 disabled:opacity-50">+</button>
                  </div>
                </div>

                <div className="border-t my-2"></div>

                {/* VOUCHER Input */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="voucher-code" className="text-sm font-medium">Voucher Code</label>
                  <div className="flex gap-2">
                    <input
                      id="voucher-code"
                      type="text"
                      value={voucherInput}
                      onChange={(e) => setVoucherInput(e.target.value)}
                      placeholder="Enter voucher code"
                      disabled={isCouponActive || isApplyingDiscount}
                      className="grow rounded-md text-sm p-2 border focus:border-primary focus:ring focus:ring-primary/30 disabled:bg-gray-100"
                    />
                    <button 
                      onClick={() => applyDiscount(voucherInput, 'voucher')}
                      disabled={(!voucherInput && !isVoucherActive) || isCouponActive || isApplyingDiscount}
                      className="px-4 py-2 bg-primary/20 text-primary font-semibold rounded-md hover:bg-primary/30 disabled:opacity-50"
                    >
                      {isVoucherActive ? "Clear" : (isApplyingDiscount ? "..." : "Apply")}
                    </button>
                  </div>
                  {isVoucherActive && <p className="text-xs text-green-600">Voucher applied: {appliedVoucher?.code} (Rp {voucherDiscount.toLocaleString(priceLocale)})</p>}
                </div>
                
                {/* COUPON Input */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="coupon-code" className="text-sm font-medium">Coupon Code</label>
                  <div className="flex gap-2">
                    <input
                      id="coupon-code"
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="Enter coupon code"
                      disabled={isVoucherActive || isApplyingDiscount}
                      className="grow rounded-md text-sm p-2 border focus:border-primary focus:ring focus:ring-primary/30 disabled:bg-gray-100"
                    />
                    <button 
                      onClick={() => applyDiscount(couponInput, 'coupon')}
                      disabled={(!couponInput && !isCouponActive) || isVoucherActive || isApplyingDiscount}
                      className="px-4 py-2 bg-primary/20 text-primary font-semibold rounded-md hover:bg-primary/30 disabled:opacity-50"
                    >
                      {isCouponActive ? "Clear" : (isApplyingDiscount ? "..." : "Apply")}
                    </button>
                  </div>
                  {isCouponActive && <p className="text-xs text-green-600">Coupon applied: {appliedCoupon?.code} (Rp {couponDiscount.toLocaleString(priceLocale)})</p>}
                </div>

                {/* General Discount Error */}
                {discountError && <p className="text-sm text-red-600 font-medium">{discountError}</p>}
                
                <div className="border-t my-2"></div>

                {/* Points Toggle */}
                <div className="flex items-center justify-between">
                  <label htmlFor="use-points" className="text-sm font-medium">
                    Use My Points ({pointsAvailable.toLocaleString(priceLocale)} Available)
                  </label>
                  <input
                    type="checkbox"
                    id="use-points"
                    checked={usePoints}
                    disabled={pointsAvailable === 0 || isApplyingDiscount}
                    onChange={(e) => handleUsePointsChange(e.target.checked)}
                    className="w-5 h-5 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary"
                  />
                </div>
            
                <div className="border-t my-2"></div>

                {/* Summary Details */}
                <div className="flex flex-col gap-2 text-sm">
                  <div className="flex justify-between">
                    <p>Subtotal ({ticketQuantity} Tickets)</p>
                    <p className="font-medium">Rp {subtotal.toLocaleString(priceLocale)}</p>
                  </div>
                  
                  {voucherDiscount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <p>Voucher Discount ({appliedVoucher?.code})</p>
                      <p>- Rp {voucherDiscount.toLocaleString(priceLocale)}</p>
                    </div>
                  )}
                  {couponDiscount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <p>Coupon Discount ({appliedCoupon?.code})</p>
                      <p>- Rp {couponDiscount.toLocaleString(priceLocale)}</p>
                    </div>
                  )}
                  {pointsDiscount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <p>Points Applied</p>
                      <p>- Rp {pointsDiscount.toLocaleString(priceLocale)}</p>
                    </div>
                  )}
                </div>
            
                <div className="border-t my-2"></div>
            
                <div className="bg-primary/10 p-4 rounded-lg text-center">
                  <p className="text-sm font-medium text-primary">Total Payment</p>
                  <p className="text-3xl font-extrabold text-primary">Rp {total.toLocaleString(priceLocale)}</p>
                </div>
            
                <button 
                  disabled={isApplyingDiscount || ticketQuantity === 0}
                  className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary/90 transition-colors disabled:bg-gray-400"
                >
                  {isApplyingDiscount ? "Processing..." : "Proceed to Payment"}
                </button>
            </div>
        </div>
    </div>
  );
};

export default CheckoutSummary;
