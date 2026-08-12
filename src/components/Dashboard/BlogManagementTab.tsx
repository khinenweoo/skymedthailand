import React, { useState, useEffect } from 'react';
import { BlogPost, Category, User, UploadedFile } from '../../types';
import { Plus, Edit2, Trash2, BookOpen, AlertCircle, CheckCircle2, Image as ImageIcon, X } from 'lucide-react';

interface BlogManagementTabProps {
  user: User;
}

export const BlogManagementTab: React.FC<BlogManagementTabProps> = ({ user }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Editor state
  const [isEditing, setIsEditing] = useState(false);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  
  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [authorName, setAuthorName] = useState(user.name || 'SkyMed Medical Staff');
  const [authorRole, setAuthorRole] = useState(user.role === 'doctor' ? 'Flight Medical Director' : 'Flight Specialist');

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [postsRes, catRes, filesRes] = await Promise.all([
        fetch('/api/posts'),
        fetch('/api/categories'),
        fetch('/api/files')
      ]);

      const pData = await postsRes.json();
      const cData = await catRes.json();
      const fData = await filesRes.json();

      if (pData.posts) setPosts(pData.posts);
      if (cData.categories) {
        setCategories(cData.categories);
        if (cData.categories.length > 0 && !categoryId) {
          setCategoryId(cData.categories[0].id);
        }
      }
      if (fData.files) setUploadedFiles(fData.files);
    } catch (err) {
      console.error('Failed to load blog management data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setIsEditing(true);
    setEditingPostId(null);
    setTitle('');
    setExcerpt('');
    setContent('');
    setImageUrl('');
    setAuthorName(user.name || 'SkyMed Flight Doctor');
    setAuthorRole('Senior Specialist');
    if (categories.length > 0) setCategoryId(categories[0].id);
    setError('');
    setSuccess('');
  };

  const handleOpenEdit = (post: BlogPost) => {
    setIsEditing(true);
    setEditingPostId(post.id);
    setTitle(post.title);
    setCategoryId(post.categoryId);
    setExcerpt(post.excerpt);
    setContent(post.content);
    setImageUrl(post.imageUrl);
    setAuthorName(post.authorName);
    setAuthorRole(post.authorRole);
    setError('');
    setSuccess('');
  };

  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setError('');
    setSuccess('');
    setSubmitting(true);

    const payload = {
      title,
      categoryId,
      excerpt,
      content,
      imageUrl: imageUrl || 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800',
      authorName,
      authorRole
    };

    try {
      const endpoint = editingPostId ? `/api/posts/${editingPostId}` : '/api/posts';
      const method = editingPostId ? 'PUT' : 'POST';

      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save blog post');

      setSuccess(`Post "${data.post.title}" ${editingPostId ? 'updated' : 'published'} successfully!`);
      setIsEditing(false);
      fetchData();
    } catch (err: any) {
      setError(err.message || 'Error saving post');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeletePost = async (id: string, postTitle: string) => {
    if (!confirm(`Are you sure you want to delete post "${postTitle}"?`)) return;

    try {
      const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete post');

      setPosts(posts.filter(p => p.id !== id));
      setSuccess(`Post "${postTitle}" deleted.`);
    } catch (err: any) {
      setError(err.message || 'Error deleting post');
    }
  };

  return (
    <div className="space-y-8">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Blog Posts & Articles Manager</h2>
          <p className="text-sm text-slate-500 mt-1">
            Create, edit, and publish updates so landing page visitors see live medical articles.
          </p>
        </div>

        {!isEditing && (
          <button
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2.5 rounded-2xl shadow-md shadow-indigo-200 transition-all hover:shadow-lg active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Article</span>
          </button>
        )}
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 text-sm rounded-2xl flex items-center gap-2">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="p-4 bg-emerald-50 text-emerald-700 text-sm rounded-2xl flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {/* Editor Panel */}
      {isEditing && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-indigo-200 shadow-lg relative">
          <button
            onClick={() => setIsEditing(false)}
            className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <h3 className="text-xl font-bold text-slate-900 mb-6">
            {editingPostId ? 'Edit Blog Article' : 'Publish New Blog Article'}
          </h3>

          <form onSubmit={handleSavePost} className="space-y-5">
            
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
              <div className="sm:col-span-8">
                <label className="block text-xs font-semibold text-slate-700 mb-1">Article Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. New Helipad Guidance Protocols Released"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="sm:col-span-4">
                <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Author Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Author Name</label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Author Title / Role</label>
                <input
                  type="text"
                  value={authorRole}
                  onChange={(e) => setAuthorRole(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Image URL & File Picker */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Cover Image URL</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="https://images.unsplash.com/... or /uploads/filename.jpg"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Quick Pick From Uploaded Files */}
              {uploadedFiles.length > 0 && (
                <div className="mt-3">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                    Or select from your uploaded storage images:
                  </span>
                  <div className="flex items-center gap-2 overflow-x-auto pb-2">
                    {uploadedFiles.map((f) => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => setImageUrl(f.url)}
                        className={`w-14 h-14 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                          imageUrl === f.url ? 'border-indigo-600 scale-105 ring-2 ring-indigo-200' : 'border-slate-200'
                        }`}
                      >
                        <img src={f.url} alt={f.originalName} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Short Summary Excerpt</label>
              <input
                type="text"
                placeholder="Brief 1-2 sentence preview for landing page card..."
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Full Article Content</label>
              <textarea
                rows={6}
                required
                placeholder="Write the full medical update or health guide content..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full p-4 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-2.5 rounded-xl font-semibold text-sm shadow-md shadow-indigo-200 disabled:opacity-50"
              >
                {submitting ? 'Saving...' : editingPostId ? 'Update Article' : 'Publish Article'}
              </button>
            </div>

          </form>
        </div>
      )}

      {/* Posts List */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center justify-between">
          <span>Published Articles ({posts.length})</span>
          <BookOpen className="w-5 h-5 text-indigo-600" />
        </h3>

        {loading ? (
          <div className="text-center py-8 text-slate-400">Loading articles...</div>
        ) : posts.length === 0 ? (
          <div className="text-center py-8 text-slate-400">No blog posts yet. Click "Create New Article" above!</div>
        ) : (
          <div className="divide-y divide-slate-100">
            {posts.map((post) => (
              <div key={post.id} className="py-6 first:pt-0 last:pb-0 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                
                <div className="flex items-center gap-4">
                  <div className="w-20 h-16 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                    <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">
                      {post.categoryName}
                    </span>
                    <h4 className="text-base font-bold text-slate-900 mt-1 line-clamp-1">{post.title}</h4>
                    <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{post.excerpt}</p>
                    <span className="text-[11px] text-slate-400 mt-1 block">By {post.authorName} • {new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end md:self-center">
                  <button
                    onClick={() => handleOpenEdit(post)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDeletePost(post.id, post.title)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold rounded-xl transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
