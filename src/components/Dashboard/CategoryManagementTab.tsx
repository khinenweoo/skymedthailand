import React, { useState, useEffect } from 'react';
import { Category } from '../../types';
import { Plus, Trash2, Tag, AlertCircle, CheckCircle2 } from 'lucide-react';

export const CategoryManagementTab: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/categories');
      const data = await res.json();
      if (data.categories) setCategories(data.categories);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setError('');
    setSuccess('');
    setSubmitting(true);

    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to add category');

      setSuccess(`Category "${data.category.name}" added successfully!`);
      setName('');
      setDescription('');
      fetchCategories();
    } catch (err: any) {
      setError(err.message || 'Error adding category');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteCategory = async (id: string, catName: string) => {
    if (!confirm(`Are you sure you want to delete category "${catName}"?`)) return;

    try {
      const res = await fetch(`/api/categories/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete category');

      setCategories(categories.filter(c => c.id !== id));
      setSuccess(`Deleted category "${catName}".`);
    } catch (err: any) {
      setError(err.message || 'Error deleting category');
    }
  };

  return (
    <div className="space-y-8">
      
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Blog Category Management</h2>
        <p className="text-sm text-slate-500 mt-1">
          Define categories (e.g. Helicopter Rescue, Health Tips, Air Medevac) to organize posts on the landing page.
        </p>
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

      {/* Add New Category Form */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Plus className="w-5 h-5 text-indigo-600" />
          <span>Create New Blog Category</span>
        </h3>

        <form onSubmit={handleAddCategory} className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
          <div className="sm:col-span-5">
            <label className="block text-xs font-semibold text-slate-700 mb-1">Category Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Critical Care Equipment"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="sm:col-span-5">
            <label className="block text-xs font-semibold text-slate-700 mb-1">Description (Optional)</label>
            <input
              type="text"
              placeholder="Brief summary of category topics..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-4 rounded-xl transition-all shadow-md shadow-indigo-200 disabled:opacity-50"
            >
              {submitting ? 'Adding...' : 'Add Category'}
            </button>
          </div>
        </form>
      </div>

      {/* Categories Grid List */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center justify-between">
          <span>Active Categories ({categories.length})</span>
          <Tag className="w-5 h-5 text-indigo-600" />
        </h3>

        {loading ? (
          <div className="text-center py-8 text-slate-400">Loading categories...</div>
        ) : categories.length === 0 ? (
          <div className="text-center py-8 text-slate-400">No categories found. Create one above!</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 flex items-start justify-between group hover:border-indigo-300 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-600" />
                    <h4 className="font-bold text-slate-900 text-base">{cat.name}</h4>
                  </div>
                  {cat.description && (
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">{cat.description}</p>
                  )}
                  <span className="inline-block mt-2 text-[10px] text-slate-400 font-mono bg-white px-2 py-0.5 rounded border border-slate-200">
                    slug: {cat.slug}
                  </span>
                </div>

                <button
                  onClick={() => handleDeleteCategory(cat.id, cat.name)}
                  title="Delete Category"
                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
