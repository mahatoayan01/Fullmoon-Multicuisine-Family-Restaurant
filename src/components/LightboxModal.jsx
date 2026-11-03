import React, { useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function LightboxModal({ image, onClose, onPrev, onNext, hasPrev, hasNext }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && hasPrev) onPrev();
      if (e.key === "ArrowRight" && hasNext) onNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onPrev, onNext, hasPrev, hasNext]);

  if (!image) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        aria-label="Close Lightbox"
        className="absolute top-5 right-5 p-2 rounded-full bg-night-900/80 text-slate-300 hover:text-white border border-white/20 transition-colors z-20"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev button */}
      {hasPrev && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          aria-label="Previous image"
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-night-900/80 text-white hover:bg-brand-500 hover:text-night-950 transition-colors z-20 border border-white/10"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Next button */}
      {hasNext && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          aria-label="Next image"
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-night-900/80 text-white hover:bg-brand-500 hover:text-night-950 transition-colors z-20 border border-white/10"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Main Image and details container */}
      <div 
        className="max-w-4xl max-h-[85vh] w-full flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={image.url}
          alt={image.title}
          className="max-h-[75vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl border border-white/10"
        />
        {(image.title || image.category) && (
          <div className="mt-4 text-center">
            <h4 className="text-white font-serif text-lg font-semibold">{image.title}</h4>
            {image.category && (
              <span className="text-xs uppercase tracking-wider text-brand-400 font-semibold mt-1 inline-block">
                {image.category}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
