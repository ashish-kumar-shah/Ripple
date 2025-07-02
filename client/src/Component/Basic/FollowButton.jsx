import React, { useState, useEffect, useContext } from 'react';
import ServiceContext from '../../Context/CreateContext/ServicesContext';

const FollowButton = ({ following }) => {
  const { friendRequest, getFriendLists } = useContext(ServiceContext);

  const [value, setValue] = useState('Follow');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const res = await getFriendLists();

        if (res.success) {
          const { followers, following: myFollowing } = res;

          // Make sure all IDs are strings for comparison
          const followerIds = followers.map(id => id.toString());
          const followingIds = myFollowing.map(id => id.toString());

          const isFollowing = followingIds.includes(following.toString());
          const isFollowedBy = followerIds.includes(following.toString());

          if (isFollowing) {
            setValue('Following');
          } else if (isFollowedBy) {
            setValue('Follow Back');
          } else {
            setValue('Follow');
          }
        } else {
          console.error('Could not get friend lists:', res.message);
        }
      } catch (err) {
        console.error('Error checking follow status:', err);
      }
    };

    if (following) {
      checkStatus();
    }
  }, [following, getFriendLists]);

  const handleFollow = async () => {
    if (loading || value === 'Following') return;

    setLoading(true);

    try {
      const res = await friendRequest(following);
      if (res.success) {
        setValue('Following');
      } else {
        alert(res.message || 'Something went wrong.');
      }
    } catch (err) {
      console.error('Follow request failed:', err);
      alert(err.message || 'Failed to follow.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleFollow}
      disabled={loading || value === 'Following'}
      className="w-fit h-fit p-0.5 px-4 bg-black text-white rounded-lg font-serif disabled:opacity-50"
    >
      {loading ? '...' : value}
    </button>
  );
};

export default FollowButton;
