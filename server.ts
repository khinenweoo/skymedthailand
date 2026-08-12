import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import multer from 'multer';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Ensure storage directories exist
const UPLOADS_DIR = path.join(__dirname, 'uploads');
const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname) || '.jpg';
    cb(null, 'skymed-' + uniqueSuffix + ext);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  }
});

// Middleware
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// Serve static uploads
app.use('/uploads', express.static(UPLOADS_DIR));

// Default JSON DB Initial State
interface DBData {
  users: Array<{
    id: string;
    email: string;
    password: string; // hashed/plain for demo
    name: string;
    role: 'admin' | 'patient' | 'doctor';
    phone: string;
    emergencyContact: string;
    avatarUrl: string;
    createdAt: string;
  }>;
  files: Array<{
    id: string;
    fileName: string;
    originalName: string;
    fileSize: number;
    mimeType: string;
    url: string;
    uploadedAt: string;
    uploadedBy: string;
  }>;
  categories: Array<{
    id: string;
    name: string;
    slug: string;
    description: string;
  }>;
  posts: Array<{
    id: string;
    title: string;
    slug: string;
    categoryId: string;
    categoryName: string;
    content: string;
    excerpt: string;
    imageUrl: string;
    authorName: string;
    authorRole: string;
    createdAt: string;
    updatedAt: string;
  }>;
  appointments: Array<{
    id: string;
    userId?: string;
    patientName: string;
    patientEmail: string;
    patientPhone: string;
    serviceType: string;
    preferredDate: string;
    preferredTime: string;
    emergencyLevel: 'normal' | 'urgent' | 'critical';
    notes: string;
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
    createdAt: string;
  }>;
}

function loadDB(): DBData {
  if (fs.existsSync(DB_FILE)) {
    try {
      const data = fs.readFileSync(DB_FILE, 'utf-8');
      const parsed: DBData = JSON.parse(data);
      // Ensure quick demo credentials are removed from users table
      parsed.users = parsed.users.filter(
        u => u.email.toLowerCase() !== 'doctor@skymed.com' && u.email.toLowerCase() !== 'patient@skymed.com'
      );
      return parsed;
    } catch (e) {
      console.error('Failed to parse db.json, reinitializing:', e);
    }
  }

  // Initial Seed
  const initial: DBData = {
    users: [
      {
        id: 'S3XGP2Q58rYulbHQQ1yPgLQraGI3',
        email: 'alex@skymedthailand.com',
        password: 'password123',
        name: 'Alex (SkyMed Admin)',
        role: 'admin',
        phone: '+66 2 123 4567',
        emergencyContact: 'SkyMed Medical Operations HQ',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
        createdAt: new Date().toISOString()
      }
    ],
    files: [
      {
        id: 'f1',
        fileName: 'skymed-hero-medevac.jpg',
        originalName: 'Eurocopter-EC135-Medical.jpg',
        fileSize: 1048576,
        mimeType: 'image/jpeg',
        url: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800',
        uploadedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
        uploadedBy: 'Dr. Sarah Lin'
      },
      {
        id: 'f2',
        fileName: 'flight-trauma-icu.jpg',
        originalName: 'Air-Ambulance-Equipment.jpg',
        fileSize: 2097152,
        mimeType: 'image/jpeg',
        url: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800',
        uploadedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
        uploadedBy: 'Dr. Sarah Lin'
      }
    ],
    categories: [
      { id: 'c1', name: 'Emergency Rescue', slug: 'emergency-rescue', description: 'Air ambulance and remote triage operational updates.' },
      { id: 'c2', name: 'Air Medevac', slug: 'air-medevac', description: 'Helicopter rescue technology and flight medical standards.' },
      { id: 'c3', name: 'Health & Safety', slug: 'health-safety', description: 'Trauma response tips and immediate first aid guides.' },
      { id: 'c4', name: 'Patient Stories', slug: 'patient-stories', description: 'Inspirational journeys of recovery and rescue.' }
    ],
    posts: [
      {
        id: 'p1',
        title: 'How SkyMed Air Helicopters Reach Critical Patients in Under 15 Minutes',
        slug: 'how-skymed-helicopters-reach-critical-patients',
        categoryId: 'c1',
        categoryName: 'Emergency Rescue',
        excerpt: 'Explore the satellite positioning systems, pre-flight protocols, and urban helipad networks that make rapid air medical response possible.',
        content: 'When minutes mean the difference between life and death, SkyMed’s rapid dispatch network activates in seconds. Our state-of-the-art Eurocopter and AgustaWestland medical fleet stays staged at high-readiness helipads equipped with satellite telemetry.\n\nUpon receiving an emergency signal, our trauma dispatch team analyzes real-time weather, air space clearance, and hospital landing zones while the flight crew boards. Within 12 to 15 minutes, our flying ICU arrives at the scene to deliver life-saving resuscitation.',
        imageUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800',
        authorName: 'Capt. James Miller',
        authorRole: 'Head of Aviation Operations',
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        updatedAt: new Date(Date.now() - 86400000 * 2).toISOString()
      },
      {
        id: 'p2',
        title: 'Inside the SkyMed Flying ICU: Advanced Life Support in the Clouds',
        slug: 'inside-the-skymed-flying-icu',
        categoryId: 'c2',
        categoryName: 'Air Medevac',
        excerpt: 'Take a virtual tour of our medical helicopters equipped with ECMO machines, ventilators, and real-time vital telemetry systems.',
        content: 'Transporting critical patients by air requires portable medical technology engineered for high-altitude stabilization. Each SkyMed aircraft functions as a complete ICU suite including blood gas analyzers, syringe pumps, invasive arterial monitoring, and portable ECMO circuits.\n\nOur onboard telemetry directly relays real-time cardiac graphs and blood chemistry directly to receiving trauma surgery centers before landing.',
        imageUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800',
        authorName: 'Dr. Sarah Lin',
        authorRole: 'Flight Medical Director',
        createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
        updatedAt: new Date(Date.now() - 86400000 * 5).toISOString()
      },
      {
        id: 'p3',
        title: 'Wilderness & Alpine Emergency Preparation: What to Do While Flight Arrives',
        slug: 'wilderness-alpine-emergency-prep',
        categoryId: 'c3',
        categoryName: 'Health & Safety',
        excerpt: 'Essential steps for outdoor enthusiasts to signal rescue aircraft, prepare landing clearings, and maintain thermal protection.',
        content: 'If an emergency occurs in remote alpine or off-grid environments, knowing how to communicate with air rescue teams is vital. Signal with high-contrast gear or strobe lights, identify wind direction, and keep clear of rotor zones until signaled by flight paramedics.',
        imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
        authorName: 'Mark Sterling',
        authorRole: 'Senior Rescue Paramedic',
        createdAt: new Date(Date.now() - 86400000 * 9).toISOString(),
        updatedAt: new Date(Date.now() - 86400000 * 9).toISOString()
      }
    ],
    appointments: [
      {
        id: 'a1',
        userId: 'u2',
        patientName: 'Marcus Vandergrift',
        patientEmail: 'patient@skymed.com',
        patientPhone: '+1 (555) 987-6543',
        serviceType: 'Urgent Video & Phone Consultation',
        preferredDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
        preferredTime: '10:00 AM',
        emergencyLevel: 'urgent',
        notes: 'Follow up post-hospital discharge for flight trauma evaluation.',
        status: 'confirmed',
        createdAt: new Date().toISOString()
      }
    ]
  };

  saveDB(initial);
  return initial;
}

function saveDB(data: DBData) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (e) {
    console.error('Failed to save db.json:', e);
  }
}

// In-Memory active DB state
let db = loadDB();

// Helper for auth tokens
function generateToken(userId: string) {
  return `skymed_tok_${userId}_${Date.now()}`;
}

function getUserIdFromToken(token: string) {
  if (!token) return null;
  const cleanToken = token.replace('Bearer ', '').trim();
  
  if (cleanToken.startsWith('skymed_tok_')) {
    const parts = cleanToken.split('_');
    if (parts.length >= 4) {
      return parts.slice(2, parts.length - 1).join('_');
    }
  }

  if (cleanToken.startsWith('token_')) {
    const parts = cleanToken.split('_');
    if (parts.length >= 3) {
      return parts.slice(1, parts.length - 1).join('_');
    }
  }

  return cleanToken;
}

// API ROUTES

// --- Authentication ---
app.post('/api/auth/register', (req, res) => {
  const { email, password, name, phone, emergencyContact } = req.body;
  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Email, password, and name are required.' });
  }

  const cleanEmail = email.trim().toLowerCase();
  const isAdminEmail = cleanEmail === 'alex@skymedthailand.com';

  const existing = db.users.find(u => u.email.toLowerCase() === cleanEmail);
  if (existing && !isAdminEmail) {
    return res.status(400).json({ error: 'An account with this email already exists.' });
  }

  let newUser;
  if (isAdminEmail) {
    if (existing) {
      existing.password = password;
      existing.name = name || existing.name;
      existing.role = 'admin';
      saveDB(db);
      const { password: _, ...userWithoutPassword } = existing;
      const token = generateToken(existing.id);
      return res.json({ user: userWithoutPassword, token });
    }
    newUser = {
      id: 'S3XGP2Q58rYulbHQQ1yPgLQraGI3',
      email: 'alex@skymedthailand.com',
      password,
      name: name.trim() || 'Alex (SkyMed Admin)',
      role: 'admin' as const,
      phone: phone || '+66 2 123 4567',
      emergencyContact: emergencyContact || 'SkyMed Medical Operations HQ',
      avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=AlexSkyMed`,
      createdAt: new Date().toISOString()
    };
  } else {
    newUser = {
      id: 'u_' + Date.now(),
      email: email.trim(),
      password,
      name: name.trim(),
      role: 'patient' as const,
      phone: phone || '',
      emergencyContact: emergencyContact || '',
      avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name.trim())}`,
      createdAt: new Date().toISOString()
    };
  }

  if (!existing) {
    db.users.push(newUser);
  }
  saveDB(db);

  // Return user without password
  const { password: _, ...userWithoutPassword } = newUser;
  const token = generateToken(newUser.id);
  return res.json({ user: userWithoutPassword, token });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  const cleanEmail = email.trim().toLowerCase();

  // If logging in as the Admin
  if (cleanEmail === 'alex@skymedthailand.com') {
    let adminUser = db.users.find(u => u.id === 'S3XGP2Q58rYulbHQQ1yPgLQraGI3' || u.email.toLowerCase() === 'alex@skymedthailand.com');
    if (!adminUser) {
      adminUser = {
        id: 'S3XGP2Q58rYulbHQQ1yPgLQraGI3',
        email: 'alex@skymedthailand.com',
        password: password,
        name: 'Alex (SkyMed Admin)',
        role: 'admin',
        phone: '+66 2 123 4567',
        emergencyContact: 'SkyMed Executive HQ',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
        createdAt: new Date().toISOString()
      };
      db.users.push(adminUser);
    } else {
      adminUser.email = 'alex@skymedthailand.com';
      adminUser.password = password; // Ensure password entered works
      adminUser.role = 'admin';
    }
    saveDB(db);

    const { password: _, ...userWithoutPassword } = adminUser;
    const token = generateToken(adminUser.id);
    return res.json({ user: userWithoutPassword, token });
  }

  let user = db.users.find(u => u.email.toLowerCase() === cleanEmail);
  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password.' });
  }

  if (user.password !== password) {
    return res.status(401).json({ error: 'Invalid email or password.' });
  }

  const { password: _, ...userWithoutPassword } = user;
  const token = generateToken(user.id);
  return res.json({ user: userWithoutPassword, token });
});

app.get('/api/auth/me', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = authHeader.replace('Bearer ', '').trim();
  const userId = getUserIdFromToken(token);

  let user = db.users.find(u => u.id === userId || u.id === token || u.email.toLowerCase() === token.toLowerCase());

  if (!user) {
    return res.status(401).json({ error: 'User not found' });
  }

  const { password: _, ...userWithoutPassword } = user;
  return res.json({ user: userWithoutPassword });
});

app.put('/api/auth/profile', (req, res) => {
  const { id, name, phone, emergencyContact, avatarUrl } = req.body;
  const userIndex = db.users.findIndex(u => u.id === id);
  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }

  db.users[userIndex] = {
    ...db.users[userIndex],
    ...(name && { name }),
    ...(phone !== undefined && { phone }),
    ...(emergencyContact !== undefined && { emergencyContact }),
    ...(avatarUrl !== undefined && { avatarUrl })
  };

  saveDB(db);
  const { password: _, ...userWithoutPassword } = db.users[userIndex];
  return res.json({ user: userWithoutPassword });
});

// --- Admin Users API ---
app.get('/api/users', (_req, res) => {
  const usersWithoutPassword = db.users.map(({ password, ...u }) => u);
  return res.json({ users: usersWithoutPassword });
});

app.delete('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  if (userId === 'S3XGP2Q58rYulbHQQ1yPgLQraGI3') {
    return res.status(400).json({ error: 'Cannot delete primary system administrator account.' });
  }

  const index = db.users.findIndex(u => u.id === userId);
  if (index === -1) {
    return res.status(404).json({ error: 'User not found.' });
  }

  db.users.splice(index, 1);
  saveDB(db);
  return res.json({ success: true, message: 'User deleted successfully.' });
});

// --- File Storage API ---
app.post('/api/files/record', (req, res) => {
  const { fileName, originalName, fileSize, mimeType, url, uploadedBy } = req.body;
  if (!url) {
    return res.status(400).json({ error: 'File URL is required.' });
  }

  const fileRecord = {
    id: 'f_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
    fileName: fileName || originalName || 'firebase-upload',
    originalName: originalName || 'Firebase Storage File',
    fileSize: fileSize || 0,
    mimeType: mimeType || 'image/jpeg',
    url: url,
    uploadedAt: new Date().toISOString(),
    uploadedBy: uploadedBy || 'User'
  };

  db.files.unshift(fileRecord);
  saveDB(db);
  return res.json({ file: fileRecord });
});

app.post('/api/upload', upload.array('files', 5), (req, res) => {
  const uploadedFiles = req.files as Express.Multer.File[];
  const uploaderName = req.body.uploadedBy || 'User';

  if (!uploadedFiles || uploadedFiles.length === 0) {
    return res.status(400).json({ error: 'No image files uploaded.' });
  }

  const newRecords = uploadedFiles.map(file => {
    const fileRecord = {
      id: 'f_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
      fileName: file.filename,
      originalName: file.originalname,
      fileSize: file.size,
      mimeType: file.mimetype,
      url: `/uploads/${file.filename}`,
      uploadedAt: new Date().toISOString(),
      uploadedBy: uploaderName
    };
    db.files.unshift(fileRecord);
    return fileRecord;
  });

  saveDB(db);
  return res.json({ files: newRecords });
});

app.get('/api/files', (_req, res) => {
  return res.json({ files: db.files });
});

app.delete('/api/files/:id', (req, res) => {
  const fileId = req.params.id;
  const fileIndex = db.files.findIndex(f => f.id === fileId);
  if (fileIndex === -1) {
    return res.status(404).json({ error: 'File not found.' });
  }

  const fileRecord = db.files[fileIndex];
  // Attempt disk removal if file is local
  if (fileRecord.url.startsWith('/uploads/')) {
    const diskPath = path.join(UPLOADS_DIR, fileRecord.fileName);
    if (fs.existsSync(diskPath)) {
      try {
        fs.unlinkSync(diskPath);
      } catch (err) {
        console.error('Failed to delete file from disk:', err);
      }
    }
  }

  db.files.splice(fileIndex, 1);
  saveDB(db);
  return res.json({ success: true, message: 'File deleted successfully.' });
});

// --- Categories API ---
app.get('/api/categories', (_req, res) => {
  return res.json({ categories: db.categories });
});

app.post('/api/categories', (req, res) => {
  const { name, description } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Category name is required.' });
  }

  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  const newCat = {
    id: 'c_' + Date.now(),
    name,
    slug,
    description: description || ''
  };

  db.categories.push(newCat);
  saveDB(db);
  return res.json({ category: newCat });
});

app.delete('/api/categories/:id', (req, res) => {
  const catId = req.params.id;
  const index = db.categories.findIndex(c => c.id === catId);
  if (index === -1) {
    return res.status(404).json({ error: 'Category not found.' });
  }

  db.categories.splice(index, 1);
  saveDB(db);
  return res.json({ success: true });
});

// --- Blog Posts API ---
app.get('/api/posts', (_req, res) => {
  return res.json({ posts: db.posts });
});

app.post('/api/posts', (req, res) => {
  const { title, categoryId, content, excerpt, imageUrl, authorName, authorRole } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required.' });
  }

  const category = db.categories.find(c => c.id === categoryId) || db.categories[0];
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  const newPost = {
    id: 'p_' + Date.now(),
    title,
    slug,
    categoryId: category ? category.id : 'c1',
    categoryName: category ? category.name : 'General',
    content,
    excerpt: excerpt || content.substring(0, 150) + '...',
    imageUrl: imageUrl || 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800',
    authorName: authorName || 'SkyMed Medical Staff',
    authorRole: authorRole || 'Emergency Specialist',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  db.posts.unshift(newPost);
  saveDB(db);
  return res.json({ post: newPost });
});

app.put('/api/posts/:id', (req, res) => {
  const postId = req.params.id;
  const postIndex = db.posts.findIndex(p => p.id === postId);
  if (postIndex === -1) {
    return res.status(404).json({ error: 'Post not found.' });
  }

  const { title, categoryId, content, excerpt, imageUrl, authorName, authorRole } = req.body;
  const category = db.categories.find(c => c.id === categoryId);

  db.posts[postIndex] = {
    ...db.posts[postIndex],
    ...(title && { title, slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') }),
    ...(categoryId && { categoryId, categoryName: category ? category.name : db.posts[postIndex].categoryName }),
    ...(content && { content }),
    ...(excerpt && { excerpt }),
    ...(imageUrl && { imageUrl }),
    ...(authorName && { authorName }),
    ...(authorRole && { authorRole }),
    updatedAt: new Date().toISOString()
  };

  saveDB(db);
  return res.json({ post: db.posts[postIndex] });
});

app.delete('/api/posts/:id', (req, res) => {
  const postId = req.params.id;
  const index = db.posts.findIndex(p => p.id === postId);
  if (index === -1) {
    return res.status(404).json({ error: 'Post not found.' });
  }

  db.posts.splice(index, 1);
  saveDB(db);
  return res.json({ success: true });
});

// --- Appointments API ---
app.get('/api/appointments', (req, res) => {
  const userId = req.query.userId as string;
  if (userId) {
    const userAppts = db.appointments.filter(a => a.userId === userId || a.patientEmail === userId);
    return res.json({ appointments: userAppts });
  }
  return res.json({ appointments: db.appointments });
});

app.post('/api/appointments', (req, res) => {
  const { userId, patientName, patientEmail, patientPhone, serviceType, preferredDate, preferredTime, emergencyLevel, notes } = req.body;

  if (!patientName || !patientEmail || !patientPhone) {
    return res.status(400).json({ error: 'Name, email, and phone are required for booking.' });
  }

  const newAppt = {
    id: 'a_' + Date.now(),
    userId: userId || '',
    patientName,
    patientEmail,
    patientPhone,
    serviceType: serviceType || 'Air Ambulance & Helicopter Rescue',
    preferredDate: preferredDate || new Date().toISOString().split('T')[0],
    preferredTime: preferredTime || '12:00 PM',
    emergencyLevel: emergencyLevel || 'normal',
    notes: notes || '',
    status: 'pending' as const,
    createdAt: new Date().toISOString()
  };

  db.appointments.unshift(newAppt);
  saveDB(db);
  return res.json({ appointment: newAppt });
});

app.put('/api/appointments/:id', (req, res) => {
  const id = req.params.id;
  const index = db.appointments.findIndex(a => a.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Appointment not found' });
  }

  db.appointments[index] = {
    ...db.appointments[index],
    ...req.body
  };

  saveDB(db);
  return res.json({ appointment: db.appointments[index] });
});

// START SERVER (Vite dev or production static serving)
async function start() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`SkyMed Express Server running on http://0.0.0.0:${PORT}`);
  });
}

start();
