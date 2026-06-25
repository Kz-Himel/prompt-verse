"use client";
import { useState } from "react";
import { FiStar } from "react-icons/fi";

export default function ReviewSection({ reviews = [], hasAccess, onReviewSubmit }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    onReviewSubmit({ rating, comment });
    setComment("");
    setRating(5);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
      <h3 className="font-bold text-base text-slate-800">Reviews & Ratings</h3>
      
      {hasAccess ? (
        <form onSubmit={handleSubmit} className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
          <p className="text-xs font-semibold text-slate-600">Leave a Review</p>
          <div className="flex gap-2 items-center">
            <span className="text-xs text-slate-500">Rating:</span>
            <div className="flex text-amber-500 gap-0.5">
              {[1, 2, 3, 4, 5].map((num) => (
                <FiStar 
                  key={num} 
                  className={`cursor-pointer text-sm ${num <= rating ? "fill-current" : ""}`} 
                  onClick={() => setRating(num)}
                />
              ))}
            </div>
          </div>
          <textarea 
            rows={3} 
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience using this prompt..." 
            className="w-full text-xs p-3 border rounded-xl outline-none focus:border-violet-500 bg-white resize-none shadow-xs" 
            required
          />
          <button type="submit" className="bg-violet-600 text-white text-xs font-semibold px-4 py-2 rounded-xl hover:bg-violet-500">Submit Review</button>
        </form>
      ) : (
        <p className="text-xs text-amber-600 bg-amber-50 border border-amber-100 p-3 rounded-xl">Unlock premium content to participate in the review system.</p>
      )}

      <div className="space-y-4">
        {reviews.map((rev, index) => (
          <div key={index} className="border-b border-slate-100 pb-4 last:border-0 last:pb-0">
            <div className="flex justify-between items-start text-xs mb-1">
              <div>
                <span className="font-bold text-slate-700">{rev.name}</span>
                <span className="text-slate-400 ml-2 text-[10px]">{rev.email}</span>
              </div>
              <span className="text-slate-400 text-[10px]">{rev.date}</span>
            </div>
            <div className="flex text-amber-500 mb-1 text-[11px]">
              {[...Array(rev.rating)].map((_, i) => <FiStar key={i} className="fill-current" />)}
            </div>
            <p className="text-slate-600 text-xs bg-slate-50/50 p-3 rounded-xl">{rev.comment}</p>
          </div>
        ))}
        {reviews.length === 0 && <p className="text-xs text-slate-400 text-center py-2">No reviews yet.</p>}
      </div>
    </div>
  );
}