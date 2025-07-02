import React, { useState } from 'react';

const PostPreviewModal = ({ files, caption, onClose }) => {
  const [index, setIndex] = useState(0);
  const current = files[index];
  const url = URL.createObjectURL(current);
  const isVideo = current.type.startsWith("video");

  const next = () => setIndex((i) => (i + 1) % files.length);
  const prev = () => setIndex((i) => (i - 1 + files.length) % files.length);

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4">
      <div className="relative bg-white rounded-2xl shadow-lg w-full max-w-md overflow-hidden">

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-white hover:bg-red-100 rounded-full p-1 z-10 w-10 h-10 aspect-square flex justify-center items-center"
        >
          <span className="material-symbols-outlined text-red-500">close</span>
        </button>

        {/* Media container */}
        <div className="relative h-[380px] bg-black rounded-t-2xl overflow-hidden flex items-center justify-center">
          {isVideo ? (
            <video
              src={url}
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              controls
            />
          ) : (
            <img
              src={url}
              alt="preview"
              className="w-full h-full object-cover"
            />
          )}

          {files.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-gray-200 rounded-full p-1 w-10 h-10 aspect-square flex justify-center items-center"
              >
                <span className="material-symbols-outlined text-gray-800 text-xl">
                  chevron_left
                </span>
              </button>
              <button
                onClick={next}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-gray-200 rounded-full p-1 w-10 h-10 aspect-square flex justify-center items-center"
              >
                <span className="material-symbols-outlined text-gray-800 text-xl">
                  chevron_right
                </span>
              </button>
            </>
          )}
        </div>

        {/* Caption Section */}
        <div className="p-4">
          <h3 className="text-sm text-gray-900 font-semibold mb-1">Caption</h3>
          <p className="text-sm text-gray-700 max-h-28 overflow-y-auto whitespace-pre-wrap">
            {caption}
          </p>
          {files.length > 1 && (
            <div className="text-center text-xs text-gray-400 mt-3">
              {index + 1} / {files.length}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostPreviewModal;
