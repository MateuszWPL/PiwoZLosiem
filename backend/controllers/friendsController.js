import FriendRequest from "../models/FriendRequest.js";
import User from "../models/User.js";
import { checkAchievements } from "../utils/checkAchievements.js";

const formatUser = (user) => ({
  id: user._id,
  name: `${user.imie || ''} ${user.nazwisko || ''}`.trim(),
  firstName: user.imie || '',
  lastName: user.nazwisko || '',
  age: user.wiek || '',
  gender: user.plec || '',
  location: user.miasto || '',
  bio: user.bio || '',
  status: user.status || '🍺 wolny na piwo',
  photo: user.photoUrl || null,
  favoriteBeers: user.favoriteBeers || []
});

const formatRequest = (request, user) => ({
  ...formatUser(user),
  requestId: request._id,
  createdAt: request.createdAt
});

export const getFriends = async (req, res) => {
  try {
    const userId = req.user._id;
    
    const user = await User.findById(userId).populate("friends");
    
    const formatted = user.friends.map(friend => formatUser(friend));
    res.json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Błąd serwera' });
  }
};

export const getFriendRequests = async (req, res) => {
  try {
    const userId = req.user._id;
    
    const receivedRequests = await FriendRequest.find({ owner: userId }).populate("user");
    
    const sentRequests = await FriendRequest.find({ user: userId }).populate("owner");
    
    const formatted = {
      received: receivedRequests.map(r => formatRequest(r, r.user)),
      sent: sentRequests.map(r => formatRequest(r, r.owner))
    };
    
    res.json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Błąd serwera' });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const userId = req.user._id;
    
    const currentUser = await User.findById(userId).populate("friends");
    const friendIds = currentUser.friends.map(friend => friend._id.toString());
    
    const sentRequests = await FriendRequest.find({ user: userId });
    const receivedRequests = await FriendRequest.find({ owner: userId });
    
    const requestUserIds = [
      ...sentRequests.map(r => r.owner.toString()),
      ...receivedRequests.map(r => r.user.toString())
    ];
    
    const excludedUserIds = [...new Set([...friendIds, ...requestUserIds, userId.toString()])];
    
    const users = await User.find({ 
      _id: { $nin: excludedUserIds } 
    });
    
    const formatted = users.map(u => formatUser(u));
    res.json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Błąd serwera' });
  }
};

export const sendFriendRequest = async (req, res) => {
  try {
    const userId = req.user._id;
    const targetId = req.params.id;

    const targetUser = await User.findById(targetId);
    if (!targetUser) {
      return res.status(404).json({ error: "Użytkownik nie znaleziony" });
    }

    if (userId.toString() === targetId) {
      return res.status(400).json({ error: "Nie możesz wysłać zaproszenia do siebie" });
    }

    const existingRequest = await FriendRequest.findOne({
      $or: [
        { owner: targetId, user: userId },
        { owner: userId, user: targetId }
      ]
    });
    
    if (existingRequest) {
      return res.status(400).json({ error: "Zaproszenie już istnieje" });
    }

    const currentUser = await User.findById(userId);
    if (currentUser.friends.includes(targetId)) {
      return res.status(400).json({ error: "Użytkownik jest już Twoim znajomym" });
    }

    const request = await FriendRequest.create({ 
      owner: targetId, 
      user: userId 
    });
    
    res.json({ message: "Zaproszenie wysłane", request });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Błąd serwera' });
  }
};

export const acceptFriendRequest = async (req, res) => {
  try {
    const userId = req.user._id;
    const requestId = req.params.id;

    const request = await FriendRequest.findById(requestId);
    if (!request) {
      return res.status(404).json({ error: "Zaproszenie nie znalezione" });
    }

    if (request.owner.toString() !== userId.toString()) {
      return res.status(403).json({ error: "Brak uprawnień do zaakceptowania tego zaproszenia" });
    }

    const senderId = request.user;
    
    await User.findByIdAndUpdate(userId, { 
      $addToSet: { friends: senderId } 
    });
    
    await User.findByIdAndUpdate(senderId, { 
      $addToSet: { friends: userId } 
    });
    
    await FriendRequest.findByIdAndDelete(requestId);

    await checkAchievements(userId);
    await checkAchievements(senderId);

    res.json({ message: "Zaproszenie zaakceptowane" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Błąd serwera' });
  }
};

export const rejectFriendRequest = async (req, res) => {
  try {
    const userId = req.user._id;
    const requestId = req.params.id;

    const request = await FriendRequest.findById(requestId);
    if (!request) {
      return res.status(404).json({ error: "Zaproszenie nie znalezione" });
    }

    if (request.owner.toString() !== userId.toString() && request.user.toString() !== userId.toString()) {
      return res.status(403).json({ error: "Brak uprawnień do odrzucenia tego zaproszenia" });
    }

    await FriendRequest.findByIdAndDelete(requestId);
    res.json({ message: "Zaproszenie odrzucone" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Błąd serwera' });
  }
};

export const removeFriend = async (req, res) => {
  try {
    const userId = req.user._id;
    const friendId = req.params.id;

    await User.findByIdAndUpdate(userId, { 
      $pull: { friends: friendId } 
    });
    
    await User.findByIdAndUpdate(friendId, { 
      $pull: { friends: userId } 
    });
    
    res.json({ message: "Znajomy usunięty" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Błąd serwera' });
  }
};

export const getFriendsCount = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).populate("friends");
    const friendsCount = user.friends.length;
    
    res.json({ count: friendsCount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Błąd serwera' });
  }
};