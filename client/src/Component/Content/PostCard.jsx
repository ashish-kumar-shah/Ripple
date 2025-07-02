import React, { useState, useEffect, useRef } from "react";
import Avtar from "../Basic/Avtar";
import Like from "../Activites/Like";
import Comment from "../Activites/Comment";
import CommnetField from "../Activites/CommnetField";

const PostCard = ({ post }) => {


  const { user, caption = "", content = [], createdAt } = post;
  const username = user?.username || "unknown";
  const uploadedAt = new Date(createdAt).toLocaleString();
  const files = content;

  const [index, setIndex] = useState(0);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef(null);

  const current = files[index] || {};
  const isVideo = current?.type?.startsWith("video");

  const next = () => setIndex((i) => (i + 1) % files.length);
  const prev = () => setIndex((i) => (i - 1 + files.length) % files.length);

  useEffect(() => {
    if (!isVideo || !videoRef.current) return;

    const videoEl = videoRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoEl.play().catch(() => {});
        } else {
          videoEl.pause();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(videoEl);

    return () => {
      observer.unobserve(videoEl);
    };
  }, [index, isVideo]);

  return (
    <div className="w-full max-w-md bg-white rounded-sm shadow  overflow-hidden mb-6 shrink-0">
      {/* Top: Avatar + Username */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <Avtar
            value={user?.avtar}
            piccss="w-10 h-10 rounded-full object-cover"
            design="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-medium text-gray-800">@{username}</p>
            <span className="text-xs text-gray-500">{uploadedAt}</span>
          </div>
        </div>
        <button className="text-gray-500 hover:text-gray-800 material-symbols-outlined">
          more_vert
        </button>
      </div>

      {/* Media Display */}
      <div className="relative w-full h-[400px] bg-black">
        {isVideo ? (
          <>
            <video
              ref={videoRef}
              src={current?.url}
              className="w-full h-full object-contain"
              loop
              muted={muted}
              playsInline
            />
            <button
              onClick={() => setMuted((m) => !m)}
              className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1 hover:bg-black w-10 h-10 aspect-square flex justify-center items-center"
            >
              <span className="material-symbols-outlined text-xl">
                {muted ? "volume_off" : "volume_up"}
              </span>
            </button>
          </>
        ) : (
          <img
            src={current?.url}
            alt="post"
            className="w-full h-full object-contain"
          />
        )}

        {/* Carousel controls */}
        {files.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1 w-10 h-10 aspect-square flex justify-center items-center"
            >
              <span className="material-symbols-outlined text-gray-800 text-lg">
                chevron_left
              </span>
            </button>
            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1 w-10 h-10 aspect-square flex justify-center items-center"
            >
              <span className="material-symbols-outlined text-gray-800 text-lg">
                chevron_right
              </span>
            </button>
          </>
        )}

        <CommnetField postid={post._id} />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex gap-4 text-gray-700">
          <button className="hover:text-red-500 transition p-2 flex justify-center items-center gap-2">
            <Like postid={post._id} />

            {post.likeCount > 0 && (
              <span className="text-xl  font-bold font-mono">
                {post.likeCount}
              </span>
            )}
          </button>
          <button className="hover:text-blue-500 transition  p-2 flex justify-center items-center gap-2">
            <Comment postid={post._id} />

            {post.commentCount > 0 && (
              <span className="text-xl  font-bold font-mono">
                {post.commentCount}
              </span>
            )}
          </button>
        </div>
        <button className="hover:text-yellow-500 transition">
          <span className="material-symbols-outlined text-xl">bookmark</span>
        </button>
      </div>

      {/* Caption */}
      <div className="px-4 pb-4">
        <p className="text-sm text-gray-800">
          <span className="font-medium">@{username}</span> {caption}
        </p>
      </div>
    </div>
  );
};

export default PostCard;
