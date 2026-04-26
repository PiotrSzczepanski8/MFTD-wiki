const STORAGE_KEY = "mftd-wiki-store";

const defaultStore = {
  currentUserId: null,
  users: [],
  posts: [],
  comments: [],
  likes: [],
};

const encodeUtf8 = (text) => new TextEncoder().encode(text);
const hexFromBuffer = (buffer) => Array.from(new Uint8Array(buffer)).map((b) => b.toString(16).padStart(2, "0")).join("");

async function hashText(text) {
  const buffer = encodeUtf8(text);
  const digest = await crypto.subtle.digest("SHA-256", buffer);
  return hexFromBuffer(digest);
}

function loadStore() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { ...defaultStore };
  } catch (error) {
    console.warn("Failed to load storage", error);
    return { ...defaultStore };
  }
}

function saveStore(store) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  return store;
}

function uniqueId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
}

function getAuthorName(store, userId) {
  return store.users.find((user) => user.id === userId)?.username || "unknown";
}

function getCommentCount(store, postId) {
  return store.comments.filter((comment) => comment.postId === postId).length;
}

function getLikeCount(store, postId) {
  return store.likes.filter((like) => like.postId === postId).length;
}

async function signUp({ email, password, username }) {
  const store = loadStore();
  const existing = store.users.find((user) => user.email === email.toLowerCase());
  if (existing) {
    throw new Error("That email is already registered.");
  }

  const passwordHash = await hashText(password);
  const user = {
    id: uniqueId(),
    email: email.toLowerCase(),
    username,
    bio: "",
    passwordHash,
  };

  store.users.push(user);
  store.currentUserId = user.id;
  saveStore(store);
  return { ...user, passwordHash: undefined };
}

async function signIn({ email, password }) {
  const store = loadStore();
  const passwordHash = await hashText(password);
  const user = store.users.find(
    (item) => item.email === email.toLowerCase() && item.passwordHash === passwordHash
  );
  if (!user) {
    throw new Error("Invalid email or password.");
  }
  store.currentUserId = user.id;
  saveStore(store);
  return { ...user, passwordHash: undefined };
}

function signOut() {
  const store = loadStore();
  store.currentUserId = null;
  saveStore(store);
}

function getCurrentUser() {
  const store = loadStore();
  const user = store.users.find((item) => item.id === store.currentUserId);
  if (!user) {
    return null;
  }
  const { passwordHash, ...safe } = user;
  return safe;
}

async function updateProfile({ username, bio }) {
  const store = loadStore();
  const user = store.users.find((item) => item.id === store.currentUserId);
  if (!user) {
    throw new Error("No signed-in user.");
  }
  user.username = username;
  user.bio = bio;
  saveStore(store);
  const { passwordHash, ...safe } = user;
  return safe;
}

function getPosts() {
  const store = loadStore();
  return store.posts
    .slice()
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .map((post) => ({
      ...post,
      username: getAuthorName(store, post.userId),
      likes_count: getLikeCount(store, post.id),
      comments_count: getCommentCount(store, post.id),
    }));
}

function getPostById(postId) {
  const store = loadStore();
  const post = store.posts.find((item) => item.id === postId);
  if (!post) return null;
  const comments = store.comments
    .filter((comment) => comment.postId === postId)
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    .map((comment) => ({
      ...comment,
      username: getAuthorName(store, comment.userId),
    }));

  return {
    ...post,
    username: getAuthorName(store, post.userId),
    likes_count: getLikeCount(store, post.id),
    liked: store.likes.some((like) => like.postId === postId && like.userId === store.currentUserId),
    comments,
  };
}

function hasLiked(postId) {
  const store = loadStore();
  return store.likes.some((like) => like.postId === postId && like.userId === store.currentUserId);
}

function getUserPosts(userId) {
  const store = loadStore();
  return store.posts
    .filter((post) => post.userId === userId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .map((post) => ({
      ...post,
      likes_count: getLikeCount(store, post.id),
    }));
}

function createPost({ title, content }) {
  const store = loadStore();
  const currentUser = store.users.find((item) => item.id === store.currentUserId);
  if (!currentUser) {
    throw new Error("Please sign in to create an idea.");
  }
  const post = {
    id: uniqueId(),
    title,
    content,
    userId: currentUser.id,
    createdAt: new Date().toISOString(),
  };
  store.posts.push(post);
  saveStore(store);
  return {
    ...post,
    username: currentUser.username,
    likes_count: 0,
    comments_count: 0,
  };
}

function toggleLike(postId) {
  const store = loadStore();
  const currentUser = store.users.find((item) => item.id === store.currentUserId);
  if (!currentUser) {
    throw new Error("Please sign in to like a post.");
  }
  const existingIndex = store.likes.findIndex(
    (item) => item.postId === postId && item.userId === currentUser.id
  );

  let liked = false;
  if (existingIndex >= 0) {
    store.likes.splice(existingIndex, 1);
  } else {
    store.likes.push({ id: uniqueId(), postId, userId: currentUser.id });
    liked = true;
  }
  saveStore(store);

  return {
    liked,
    likes_count: getLikeCount(store, postId),
  };
}

function addComment(postId, content) {
  const store = loadStore();
  const currentUser = store.users.find((item) => item.id === store.currentUserId);
  if (!currentUser) {
    throw new Error("Please sign in to comment.");
  }
  const comment = {
    id: uniqueId(),
    postId,
    userId: currentUser.id,
    content,
    createdAt: new Date().toISOString(),
  };
  store.comments.push(comment);
  saveStore(store);
  return {
    ...comment,
    username: currentUser.username,
  };
}

function deletePost(postId) {
  const store = loadStore();
  const currentUser = store.users.find((item) => item.id === store.currentUserId);
  const post = store.posts.find((item) => item.id === postId);
  if (!post || !currentUser || post.userId !== currentUser.id) {
    throw new Error("You are not allowed to delete this post.");
  }
  store.posts = store.posts.filter((item) => item.id !== postId);
  store.comments = store.comments.filter((comment) => comment.postId !== postId);
  store.likes = store.likes.filter((like) => like.postId !== postId);
  saveStore(store);
}

function deleteComment(commentId) {
  const store = loadStore();
  const currentUser = store.users.find((item) => item.id === store.currentUserId);
  const comment = store.comments.find((item) => item.id === commentId);
  if (!comment || !currentUser || comment.userId !== currentUser.id) {
    throw new Error("You are not allowed to delete this comment.");
  }
  store.comments = store.comments.filter((item) => item.id !== commentId);
  saveStore(store);
}

export default {
  hashText,
  signUp,
  signIn,
  signOut,
  getCurrentUser,
  updateProfile,
  getPosts,
  getPostById,
  hasLiked,
  getUserPosts,
  createPost,
  toggleLike,
  addComment,
  deletePost,
  deleteComment,
};
