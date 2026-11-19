"use client";

import { useState } from "react";
import { FiStar, FiLock, FiMessageSquare } from "react-icons/fi";

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
    <div className="neu-card p-6 sm:p-7 space-y-6">
      <div className="flex items-center gap-2">
        <FiMessageSquare className="text-[var(--primary)] text-base" />
        <h3 className="font-bold text-base sm:text-lg text-[var(--text)]">
          Reviews & Ratings
        </h3>
        <span className="text-xs text-[var(--text-muted)] font-semibold">
          ({reviews.length})
        </span>
      </div>

      {hasAccess ? (
        <form onSubmit={handleSubmit} className="neu-card-inset p-4 sm:p-5 space-y-3.5">
          <p className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
            Leave a Review
          </p>

          <div className="flex gap-2 items-center">
            <span className="text-xs text-[var(--text-muted)] font-medium">Your Rating:</span>
            <div className="flex text-amber-500 gap-1">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  type="button"
                  key={num}
                  onClick={() => setRating(num)}
                  className="cursor-pointer focus:outline-none transition-transform hover:scale-110"
                >
                  <FiStar
                    className={`text-base ${num <= rating ? "fill-current" : ""}`}
                  />
                </button>
              ))}
            </div>
          </div>

          <textarea
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience using this prompt..."
            className="w-full text-xs sm:text-sm p-3 neu-input resize-none"
            required
          />

          <div className="flex justify-end pt-1">
            <button
              type="submit"
              className="neu-button-primary px-5 py-2.5 text-xs font-bold"
            >
              Submit Review
            </button>
          </div>
        </form>
      ) : (
        <div className="neu-card-inset p-4 flex items-center gap-2 text-xs font-medium text-amber-600 dark:text-amber-400">
          <FiLock className="shrink-0" />
          <span>Unlock premium content to participate in the review system.</span>
        </div>
      )}

      <div className="space-y-4">
        {reviews.map((rev, index) => (
          <div
            key={index}
            className="border-b border-[var(--border)] pb-4 last:border-0 last:pb-0 space-y-2"
          >
            <div className="flex justify-between items-start text-xs">
              <div>
                <span className="font-bold text-[var(--text)]">{rev.name || "Community Member"}</span>
                {rev.email && (
                  <span className="text-[var(--text-muted)] ml-2 text-[10px]">
                    {rev.email}
                  </span>
                )}
              </div>
              <span className="text-[var(--text-muted)] text-[10px]">{rev.date}</span>
            </div>

            <div className="flex text-amber-500 text-xs gap-0.5">
              {[...Array(rev.rating || 5)].map((_, i) => (
                <FiStar key={i} className="fill-current" />
              ))}
            </div>

            <p className="text-[var(--text-muted)] text-xs sm:text-sm leading-relaxed neu-card-inset p-3 rounded-xl">
              {rev.comment}
            </p>
          </div>
        ))}

        {reviews.length === 0 && (
          <p className="text-xs text-[var(--text-muted)] text-center py-4 font-medium">
            No reviews yet. Be the first to try this prompt!
          </p>
        )}
      </div>
    </div>
  );
}
