import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { requireAuth, AuthRequest } from './src/middleware/auth.ts';
import { getOrCreateUser, getUserByUid } from './src/db/users.ts';
import { getUserBookmarksByUid, addUserBookmark, removeUserBookmark } from './src/db/bookmarks.ts';
import { getUserQuizScoresByUid, saveUserQuizScore } from './src/db/quiz.ts';

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());
app.use(express.static('public'));

// Direct ZIP project download routes
app.get('/mideast-history-complete-project.zip', (_req, res) => {
  const zipPath = path.resolve('public/mideast-history-complete-project.zip');
  res.download(zipPath, 'mideast-history-complete-project.zip');
});

app.get('/arab-federations-project.zip', (_req, res) => {
  const zipPath = path.resolve('public/mideast-history-complete-project.zip');
  res.download(zipPath, 'mideast-history-complete-project.zip');
});

app.get('/middle-east-history-backup.zip', (_req, res) => {
  const zipPath = path.resolve('public/mideast-history-complete-project.zip');
  res.download(zipPath, 'mideast-history-complete-project.zip');
});

// API health endpoint (sanitized, no internal DB credentials or status)
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// Auth & User sync routes
app.post('/api/auth/sync', requireAuth, async (req: AuthRequest, res) => {
  try {
    const { email, name, picture } = req.body;
    const uid = req.user!.uid;
    const userEmail = email || req.user!.email || 'user@example.com';
    const user = await getOrCreateUser(uid, userEmail, name, picture);
    res.json(user);
  } catch (error: any) {
    console.error('Failed to sync user:', error);
    res.status(500).json({ error: 'Failed to sync user account' });
  }
});

app.get('/api/auth/me', requireAuth, async (req: AuthRequest, res) => {
  try {
    const uid = req.user!.uid;
    const user = await getUserByUid(uid);
    if (!user) {
      return res.status(404).json({ error: 'User profile not found' });
    }
    res.json(user);
  } catch (error: any) {
    console.error('Failed to get user profile:', error);
    res.status(500).json({ error: 'Failed to retrieve profile' });
  }
});

// Bookmarks endpoints
app.get('/api/bookmarks', requireAuth, async (req: AuthRequest, res) => {
  try {
    const uid = req.user!.uid;
    const bookmarks = await getUserBookmarksByUid(uid);
    res.json(bookmarks);
  } catch (error: any) {
    console.error('Failed to fetch bookmarks:', error);
    res.status(500).json({ error: 'Failed to fetch bookmarks' });
  }
});

app.post('/api/bookmarks', requireAuth, async (req: AuthRequest, res) => {
  try {
    const uid = req.user!.uid;
    const { itemType, itemId, title, notes } = req.body;
    if (!itemType || !itemId || !title) {
      return res.status(400).json({ error: 'Missing itemType, itemId or title' });
    }
    const bookmark = await addUserBookmark(uid, itemType, itemId, title, notes);
    res.json(bookmark);
  } catch (error: any) {
    console.error('Failed to create bookmark:', error);
    res.status(500).json({ error: 'Failed to create bookmark' });
  }
});

app.delete('/api/bookmarks/:id', requireAuth, async (req: AuthRequest, res) => {
  try {
    const uid = req.user!.uid;
    const bookmarkId = parseInt(req.params.id, 10);
    if (isNaN(bookmarkId)) {
      return res.status(400).json({ error: 'Invalid bookmark ID' });
    }
    const result = await removeUserBookmark(uid, bookmarkId);
    res.json({ success: true, result });
  } catch (error: any) {
    console.error('Failed to remove bookmark:', error);
    res.status(500).json({ error: 'Failed to remove bookmark' });
  }
});

// Quiz Scores endpoints
app.get('/api/quiz-scores', requireAuth, async (req: AuthRequest, res) => {
  try {
    const uid = req.user!.uid;
    const scores = await getUserQuizScoresByUid(uid);
    res.json(scores);
  } catch (error: any) {
    console.error('Failed to fetch quiz scores:', error);
    res.status(500).json({ error: 'Failed to fetch quiz scores' });
  }
});

app.post('/api/quiz-scores', requireAuth, async (req: AuthRequest, res) => {
  try {
    const uid = req.user!.uid;
    const { category, score, total } = req.body;
    if (category === undefined || score === undefined || total === undefined) {
      return res.status(400).json({ error: 'Missing required quiz fields' });
    }
    const saved = await saveUserQuizScore(uid, category, Number(score), Number(total));
    res.json(saved);
  } catch (error: any) {
    console.error('Failed to record score:', error);
    res.status(500).json({ error: 'Failed to record quiz score' });
  }
});

// Start Express server and mount Vite
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('dist'));
    app.get('*', (_req, res) => {
      res.sendFile('dist/index.html', { root: '.' });
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
