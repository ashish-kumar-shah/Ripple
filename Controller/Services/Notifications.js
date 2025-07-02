const Notification = require('../../Models/Notification');

// ✅ 1. Save notification
const saveNotification = async ({ from, to, type, message, post = null }) => {
  try {
    const notification = new Notification({
      from,
      to,
      type,
      message,
      post: post || undefined,
    });
    await notification.save();
    console.log(`✅ Notification saved for user ${to}`);
    return notification;
  } catch (error) {
    console.error('❌ Error saving notification:', error.message);
    throw error;
  }
};

// ✅ 2. Get unread notifications for a user
const getUnreadNotifications = async (req, res) => {
  try {
    const userId = req.userId;

    const notifications = await Notification.find({
      to: userId,
      isRead: false,
    })
      .populate('from', 'username') // or other fields you want
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, notifications });
  } catch (error) {
    console.error('❌ Error getting notifications:', error.message);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

// ✅ 3. Mark notification as read by ID
const markNotificationRead = async (req, res) => {
  try {
    const notificationId = req.params.id;

    const notification = await Notification.findByIdAndUpdate(
      notificationId,
      { isRead: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ success: false, message: 'Not found' });
    }

    return res.status(200).json({ success: true, notification });
  } catch (error) {
    console.error('❌ Error marking notification as read:', error.message);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = {
  saveNotification,
  getUnreadNotifications,
  markNotificationRead,
};
