import React, { useContext, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import PostCard from './PostCard';
import Topbar from './Topbar';
import PostContext from '../../Context/CreateContext/PostContext';

const Content = () => {
  const { getPosts, postDispatch } = useContext(PostContext);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchPosts = () => {
    getPosts(page)
      .then((res) => {
        if (!res || !res.posts) return;

        // Combine old + new
        const combined = [...posts, ...res.posts];

        // ✅ Deduplicate by _id
        const uniqueMap = new Map();
        combined.forEach((p) => {
          uniqueMap.set(p._id, p);
        });
        const uniquePosts = Array.from(uniqueMap.values());

        setPosts(uniquePosts);

        // Update context too (using deduped list)
        postDispatch({ type: 'GET_POSTS_SUCCESS', payload: uniquePosts });

        setPage((prev) => prev + 1);
        setHasMore(res.hasMore);
      })
      .catch((err) => {
        console.error('Error fetching posts:', err.message);
        postDispatch({ type: 'GET_POSTS_FAILED' });
      });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="w-full h-full border flex flex-col">
      <Topbar />
      <div id="scrollableDiv" className="w-full h-full overflow-y-auto hide-scrollbar px-4">
        <InfiniteScroll
          className="w-full flex justify-start flex-col items-center gap-1 pt-4"
          dataLength={posts.length}
          next={fetchPosts}
          hasMore={hasMore}

          loader={<p className="text-center py-4">Loading...</p>}
          endMessage={<p className="text-center py-4">🎉 No more posts!</p>}
          scrollableTarget="scrollableDiv"
        >
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Content;
