/*"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"; 
import { Star } from 'lucide-react'; 
import { axiosInstance } from '@/lib/axios';

interface ReviewCardProps {
  eventId: number;
  eventName: string;
  isEventOver: boolean; 
}

const ReviewCard: React.FC<ReviewCardProps> = ({ eventId, eventName, isEventOver }) => {
  const [hasPurchased, setHasPurchased] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [rating, setRating] = useState(0);


  useEffect(() => {
    const checkPurchaseStatus = async () => {
    if (typeof window !== 'undefined') {
        try {
            //const response = await axiosInstance.get()
        }
    }
}
    })
    return (
      <div className="p-6 border-l-4 border-green-500 bg-green-50 rounded-lg shadow-md mt-6">
        <h3 className="text-xl font-bold text-green-700">✅ Review Submitted!</h3>
        <p className="text-gray-600 mt-1">Thank you for sharing your feedback on **{eventName}**.</p>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (rating === 0) {
      alert("Please select a star rating.");
      return;
    }

    const formData = new FormData(e.currentTarget);
    const comment = formData.get('comment');

    try {
      const response = await fetch('/api/reviews', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId, rating, comment }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        
      } else {
        alert('Failed to submit review. Please try again.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('An error occurred during submission.');
    }
  };

  return (
    <div className="review-card max-w-xl p-6 border-l-4 border-purple-600 bg-white rounded-xl shadow-lg mt-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-2">⭐ Rate Your Experience</h3>
      <p className="text-gray-600 mb-4">
        We'd love your feedback on **{eventName}** and the organizer.
      </p>

      <form onSubmit={handleSubmit}>
        <input type="hidden" name="eventId" value={eventId} />
        <input type="hidden" name="rating" value={rating} />
        

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Overall Rating:</label>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((starValue) => (
              <Star
                key={starValue}
                className={`w-8 h-8 cursor-pointer transition-colors ${
                  starValue <= rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
                }`}
                onClick={() => setRating(starValue)}
              />
            ))}
          </div>
        </div>


        <div className="mb-6">
          <label htmlFor="comment" className="block text-gray-700 font-medium mb-1">Your Feedback:</label>
          <textarea
            name="comment"
            id="comment"
            rows={4}
            placeholder="Share your honest thoughts about the event, venue, or organizer (optional)..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 resize-y"
          ></textarea>
        </div>

        <Button
          type="submit"
          className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold transition-colors"
          disabled={rating === 0}
        >
          Submit Review
        </Button>
      </form>
    </div>
  );
};

export default ReviewCard*/