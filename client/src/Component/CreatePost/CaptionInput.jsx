import React from 'react';

const CaptionInput = ({ caption, setCaption }) => {
  return (
    <div>
      <label className="text-sm font-medium mb-1 block">Caption</label>
      <textarea
        value={caption}
        onChange={(e) =>
          e.target.value.length <= 100 && setCaption(e.target.value)
        }
        placeholder="Write your caption (max 100 characters)..."
        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        rows={3}
      />
      <div className="text-right text-xs text-gray-500 mt-1">
        {caption.length}/100
      </div>
    </div>
  );
};

export default CaptionInput;
