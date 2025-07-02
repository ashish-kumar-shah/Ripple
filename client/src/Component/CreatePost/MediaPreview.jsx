import React from 'react';

const MediaPreview = ({ files }) => {
  if (files.length === 0) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {files.map((file, index) => {
        const url = URL.createObjectURL(file);
        const isVideo = file.type.startsWith('video');

        return (
          <div key={index} className="h-40 rounded overflow-y-auto  border">
            {isVideo ? (
              <video src={url} className="w-full h-full object-cover" controls muted />
            ) : (
              <img src={url} className="w-full h-full object-cover" alt={`preview-${index}`} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MediaPreview;
