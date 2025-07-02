import React, { useRef, useState, useEffect } from "react";
import Avtar from "../Basic/Avtar";
import Like from "../Activites/Like";
import Comment from "../Activites/Comment";
import CommnentField from "../Activites/CommnetField";

const FeedCard = ({
  muted,
  toggleMute,
  posturl,
  username,
  avatarUrl,
  caption,
  postId,
  likes,
  commentCount,
}) => {
  const videoRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showFullCaption, setShowFullCaption] = useState(false);

  const toggleCaption = () => setShowFullCaption((prev) => !prev);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.6 }
    );

    const videoEl = videoRef.current;
    if (videoEl) observer.observe(videoEl);

    return () => {
      if (videoEl) observer.unobserve(videoEl);
    };
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      if (isVisible) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isVisible]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = muted;
    }
  }, [muted]);

  return (
    <div className="w-full sm:max-w-[350px] h-[80vh] rounded-xl    relative  shrink-0 overflow-hidden">
      {/* Video */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        src={posturl}
        loop
        playsInline
      />

      {/* Top Left: Avatar + Username + Follow */}
      <div className="absolute top-3 left-3 z-20 flex items-center gap-2">
        <Avtar
          piccss="w-10 h-10 rounded-full object-cover"
          design="w-10 h-10 rounded-full object-cover"
          value={avatarUrl}
        />
        <div className="flex flex-col">
          <span className="text-white text-sm font-semibold">@{username}</span>
          <button className="text-blue-500 text-xs font-medium">Follow</button>
        </div>
      </div>

      {/* Mute Button */}
      <button
        onClick={toggleMute}
        className="absolute top-3 right-3 text-white bg-black/50 hover:bg-black/70 h-10 w-10 rounded-full p-2 aspect-square"
      >
        <span className="material-symbols-outlined text-lg">
          {muted ? "volume_off" : "volume_up"}
        </span>
      </button>

      {/* Caption */}
      <CommnentField postid={postId} />
      <div className="absolute bottom-4 left-3 right-16 z-10 text-white text-sm">
        <p className={`leading-snug ${showFullCaption ? "" : "line-clamp-2"}`}>
          {caption || "No caption"}
        </p>
        {caption.length > 100 && (
          <button
            className="text-blue-400 text-xs font-medium mt-1"
            onClick={toggleCaption}
          >
            {showFullCaption ? "Show less" : "Show more"}
          </button>
        )}
      </div>

      {/* Bottom Right Actions */}
      <div className="absolute right-3 bottom-8 flex flex-col items-center gap-4 text-white">
        <button className="hover:scale-110 transition flex flex-col  justify-center items-center">
          <Like postid={postId} />
          {likes > 0 && (
            <span className="text-xl  font-bold font-mono">{likes}</span>
          )}
        </button>

        <button className="hover:scale-110 transition flex flex-col justify-center items-center">
          <Comment postid={postId} />
          {
            commentCount>0 && (
            <span className="text-xl  font-bold font-mono">{commentCount}</span>

            )
          }
        </button>
      </div>
    </div>
  );
};

export default FeedCard;
