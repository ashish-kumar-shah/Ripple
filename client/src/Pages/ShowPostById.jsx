import React, { useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import ServiceContext from '../Context/CreateContext/ServicesContext';
import PostCard from '../Component/Content/PostCard';

const ShowPostById = () => {
  const { getPostById } = useContext(ServiceContext);
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!postId) return;

    setLoading(true);

    getPostById(postId)
      .then((res) => {
        if (res.success) {
          setPost(res.post);
        } else {
          console.error('❌ Failed:', res.message);
          setPost(null);
        }
      })
      .catch((err) => {
        console.error('❌ Error:', err);
        setPost(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [postId, getPostById]);

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (!post) {
    return <div className="p-4 text-red-500">Post not found.</div>;
  }

  return (
    <div className="w-full h-screen flex justify-center items-start pt-4">
        <PostCard  post={post} />
    </div>
  );
};

export default ShowPostById;
