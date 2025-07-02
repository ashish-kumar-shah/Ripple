import React, { useContext, useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import FeedCard from '../Component/Feed/FeedCard';
import PostContext from '../Context/CreateContext/PostContext';

const Feed = () => {
  const { getPosts } = useContext(PostContext);

  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [muted, setMuted] = useState(true);

  const toggleMute = () => setMuted((prev) => !prev);

  const fetchPosts = () => {
    getPosts(page)
      .then((res) => {
        if (!res || !res.posts) return;

        // ✅ Only keep posts that have at least 1 video
        const videoPosts = res.posts.filter((p) =>
          p.content.some((c) => c.type === 'video')
        );

        // ✅ Combine old + new, then remove duplicates by _id
        setPosts((prev) => {
          const combined = [...prev, ...videoPosts];
          const uniqueMap = new Map();
          combined.forEach((p) => {
            uniqueMap.set(p._id, p);
          });
          return Array.from(uniqueMap.values());
        });

        setPage((prev) => prev + 1);
        setHasMore(res.hasMore);
      })
      .catch((err) => {
        console.error('Error fetching posts:', err.message);
      });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center pt-1 sm:pt-10 p-0 overflow-y-auto gap-4 hide-scrollbar pb-10">
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchPosts}
        hasMore={hasMore}
        className='flex flex-col w-full h-full gap-1'
        loader={<p className="text-gray-500 text-sm mt-4">Loading more...</p>}
        endMessage={
          <p className="text-gray-400 text-sm mt-4">You&apos;ve reached the end!</p>
        }
      >
        {posts.map((post) => {
          const videoContent = post.content.find((c) => c.type === 'video');
          if (!videoContent) return null;

          return (
            <FeedCard
              key={post._id}
              muted={muted}
              toggleMute={toggleMute}
              posturl={videoContent.url}
              username={post.user?.username || 'Unknown'}
              avatarUrl={post.user?.avtar || ''}
              caption={post.caption || ''}
              postId = {post._id}
         
            likes={post.likeCount}
            commentCount={post.commentCount}
           

            />
          );
        })}
      </InfiniteScroll>
    </div>
  );
};

export default Feed;
