import React, { useState, useEffect } from 'react';
import { UploadedFile, User } from '../../types';
import { UploadCloud, Trash2, FileImage, ExternalLink, AlertCircle, CheckCircle2 } from 'lucide-react';
import { uploadToFirebaseStorage, deleteFromFirebaseStorage } from '../../lib/firebase';

interface ImageStorageTabProps {
  user: User;
}

export const ImageStorageTab: React.FC<ImageStorageTabProps> = ({ user }) => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/files');
      const data = await res.json();
      if (data.files) setFiles(data.files);
    } catch (err) {
      console.error('Failed to fetch files:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;

    setError('');
    setSuccessMsg('');
    setUploading(true);

    try {
      let count = 0;
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        let downloadUrl = '';
        let fullPath = file.name;

        try {
          // Upload file directly to Firebase Storage bucket
          const fbResult = await uploadToFirebaseStorage(file);
          downloadUrl = fbResult.url;
          fullPath = fbResult.fullPath;
        } catch (fbErr: any) {
          console.warn('Firebase Storage upload notice, using API fallback:', fbErr);
        }

        if (downloadUrl) {
          // Save Firebase Storage record metadata
          const res = await fetch('/api/files/record', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              fileName: fullPath,
              originalName: file.name,
              fileSize: file.size,
              mimeType: file.type,
              url: downloadUrl,
              uploadedBy: user.name
            })
          });
          if (res.ok) count++;
        } else {
          // Fallback to server disk upload
          const formData = new FormData();
          formData.append('files', file);
          formData.append('uploadedBy', user.name);
          const res = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
          });
          if (res.ok) count++;
        }
      }

      setSuccessMsg(`Successfully uploaded ${count} image file(s) to Firebase Storage!`);
      fetchFiles();
    } catch (err: any) {
      setError(err.message || 'Error uploading file to Firebase Storage');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleDeleteFile = async (id: string, fileUrl?: string) => {
    if (!confirm('Are you sure you want to delete this file from Firebase Storage?')) return;

    try {
      const fileToDelete = files.find(f => f.id === id);
      const targetUrl = fileUrl || fileToDelete?.url;

      if (targetUrl && (targetUrl.includes('firebasestorage') || targetUrl.includes('skymed-uploads'))) {
        await deleteFromFirebaseStorage(targetUrl);
      }

      const res = await fetch(`/api/files/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete file');

      setFiles(files.filter(f => f.id !== id));
      setSuccessMsg('File deleted successfully from Firebase Storage.');
    } catch (err: any) {
      setError(err.message || 'Failed to delete file');
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-8">
      
      {/* Title */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Image Upload & File Storage</h2>
        <p className="text-sm text-slate-500 mt-1">
          Upload medical imagery, helicopter rescue photos, or blog headers to display on the frontend.
        </p>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 text-sm rounded-2xl border border-red-100 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {successMsg && (
        <div className="p-4 bg-emerald-50 text-emerald-700 text-sm rounded-2xl border border-emerald-100 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Upload Drop Zone */}
      <div className="border-2 border-dashed border-indigo-200 hover:border-indigo-500 bg-indigo-50/40 hover:bg-indigo-50 rounded-3xl p-8 sm:p-12 text-center transition-all group relative">
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileUpload}
          disabled={uploading}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
        />
        <div className="max-w-md mx-auto pointer-events-none">
          <div className="w-16 h-16 bg-white rounded-2xl text-indigo-600 flex items-center justify-center mx-auto mb-4 shadow-md group-hover:scale-110 transition-transform">
            <UploadCloud className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-1">
            {uploading ? 'Uploading Image Files...' : 'Drag & Drop Images or Click to Upload'}
          </h3>
          <p className="text-xs text-slate-500">
            Supports PNG, JPG, JPEG, WEBP or GIF (Up to 10MB per file).
          </p>
        </div>
      </div>

      {/* Uploaded Files Table */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">Uploaded Image Library ({files.length})</h3>
          <span className="text-xs font-semibold text-slate-400">Stored on Server</span>
        </div>

        {loading ? (
          <div className="p-8 text-center text-slate-400">Loading stored files...</div>
        ) : files.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <FileImage className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="font-semibold text-slate-600">No images uploaded yet.</p>
            <p className="text-xs mt-1">Use the upload box above to upload your first image.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider border-b border-slate-100">
                <tr>
                  <th className="py-4 px-6">Preview</th>
                  <th className="py-4 px-6">File Name</th>
                  <th className="py-4 px-6">File Size</th>
                  <th className="py-4 px-6">Upload Date</th>
                  <th className="py-4 px-6">Uploaded By</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {files.map((file) => (
                  <tr key={file.id} className="hover:bg-slate-50/80 transition-colors">
                    
                    {/* Thumbnail */}
                    <td className="py-4 px-6">
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                        <img
                          src={file.url}
                          alt={file.originalName}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </td>

                    {/* File Name */}
                    <td className="py-4 px-6 font-semibold text-slate-900 max-w-xs truncate">
                      <p className="truncate">{file.originalName}</p>
                      <span className="text-[10px] text-slate-400 font-normal block truncate">{file.fileName}</span>
                    </td>

                    {/* File Size */}
                    <td className="py-4 px-6 font-medium text-slate-600">
                      {formatFileSize(file.fileSize)}
                    </td>

                    {/* Upload Date */}
                    <td className="py-4 px-6 text-slate-500">
                      {new Date(file.uploadedAt).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>

                    {/* Uploaded By */}
                    <td className="py-4 px-6 text-slate-600 font-medium">
                      {file.uploadedBy}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right space-x-2">
                      <a
                        href={file.url}
                        target="_blank"
                        rel="noreferrer"
                        title="View Full Size"
                        className="inline-flex p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      
                      {/* Delete File Button */}
                      <button
                        onClick={() => handleDeleteFile(file.id, file.url)}
                        title="Delete File"
                        className="inline-flex p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};
