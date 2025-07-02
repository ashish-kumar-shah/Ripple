import React, { useContext, useState } from 'react';
import CaptionInput from '../Component/CreatePost/CaptionInput';
import MediaPreview from '../Component/CreatePost/MediaPreview';
import PostPreviewModal from '../Component/CreatePost/PostPreviewModal';
import PostContext from '../Context/CreateContext/PostContext';
import ServiceContext from '../Context/CreateContext/ServicesContext';

const CreatePost = () => {
  const {uploadPost} = useContext(PostContext)
  const {setuploadProgress} = useContext(ServiceContext)
  const [files, setFiles] = useState([]);
  const [caption, setCaption] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [canUpload, setCanUpload] = useState(false);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files).slice(0, 10);
    setFiles(selectedFiles);
    setCanUpload(true);
  };

const handleUpload = async () => {
  const formData = new FormData();
  files.forEach((file) => formData.append('files', file));
  formData.append('caption', caption);

  try {
    const res = await uploadPost(formData,setuploadProgress);

   
    setFiles([]);
    setCaption('');
    setCanUpload(false);
    setShowPreview(false);
  } catch (err) {
    console.log(err);
    
    
  }
};


  return (
    <div className="w-full max-w-xl mx-auto p-4 space-y-6 overflow-y-auto   h-full hide-scrollbar">
      <h2 className="text-2xl font-bold">Create Post</h2>

      <input
        type="file"
        multiple
        accept="image/*,video/*"
        placeholder="Upload Media"
        onChange={handleFileChange}
        className="file:px-4 file:py-2 file:border file:rounded-full file:bg-blue-50 file:text-blue-700 file:cursor-pointer text-sm"
      />

      <CaptionInput caption={caption} setCaption={setCaption} />

      <MediaPreview files={files} />

      <div className="flex gap-3">
        <button
          disabled={files.length === 0}
          onClick={() => setShowPreview(true)}
          className="px-6 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 disabled:opacity-50"
        >
          Preview Post
        </button>

        <button
          disabled={!canUpload}
          onClick={handleUpload}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          Upload
        </button>
      </div>

      {showPreview && (
        <PostPreviewModal
          files={files}
          caption={caption}
          onClose={() => {
            setShowPreview(false);
            setCanUpload(true);
          }}
        />
      )}
    </div>
  );
};

export default CreatePost;
