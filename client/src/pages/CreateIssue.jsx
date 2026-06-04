import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { issuesService } from '../services/auth';
import { ISSUE_CATEGORIES } from '../utils/constants';
import { FiAlertCircle, FiUploadCloud, FiX } from 'react-icons/fi';

// Read an image file and downscale/compress it to a data URL to keep payloads small
const compressImage = (file, maxDim = 1200, quality = 0.8) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > height && width > maxDim) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        } else if (height >= width && height > maxDim) {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

export default function CreateIssue() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: ISSUE_CATEGORIES[0],
    city: '',
    location: '',
    imageUrl: ''
  });
  const [imagePreview, setImagePreview] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('Image must be smaller than 10MB');
      return;
    }

    setError('');
    try {
      const dataUrl = await compressImage(file);
      setImagePreview(dataUrl);
      setFormData(prev => ({ ...prev, imageUrl: dataUrl }));
    } catch (err) {
      console.error('Failed to read image:', err);
      setError('Failed to process image');
    }
  };

  const handleRemoveImage = () => {
    setImagePreview('');
    setFormData(prev => ({ ...prev, imageUrl: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await issuesService.createIssue(formData);
      navigate('/issues');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create issue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <div className="form-container card" style={{ maxWidth: '700px', margin: '0 auto' }}>
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <FiAlertCircle color="var(--primary)" />
          Report an Issue
        </h1>
        <p style={{ color: 'var(--gray-600)', marginBottom: '2rem' }}>
          Help your community by reporting local civic issues
        </p>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Brief title of the issue"
              required
              style={{ width: '100%' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Detailed description of the issue"
              required
              style={{ width: '100%', minHeight: '150px' }}
            />
          </div>

          <div className="grid-2col" style={{ gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                style={{ width: '100%' }}
              >
                {ISSUE_CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>City *</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City name"
                required
                style={{ width: '100%' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Exact Location *</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g., Main St & 5th Ave"
              required
              style={{ width: '100%' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Image (optional)</label>

            {imagePreview ? (
              <div style={{ position: 'relative', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--gray-200)' }}>
                <img src={imagePreview} alt="Preview" style={{ width: '100%', maxHeight: '300px', objectFit: 'cover', display: 'block' }} />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  aria-label="Remove image"
                  style={{
                    position: 'absolute', top: '0.5rem', right: '0.5rem',
                    background: 'rgba(0,0,0,0.6)', color: 'var(--white)',
                    border: 'none', borderRadius: 'var(--radius-full)',
                    width: '32px', height: '32px', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
                  }}
                >
                  <FiX size={18} />
                </button>
              </div>
            ) : (
              <label
                htmlFor="image-upload"
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  justifyContent: 'center', gap: '0.5rem', padding: '2rem',
                  border: '2px dashed var(--gray-300)', borderRadius: 'var(--radius-lg)',
                  cursor: 'pointer', color: 'var(--gray-600)', textAlign: 'center'
                }}
              >
                <FiUploadCloud size={28} />
                <span style={{ fontWeight: '500' }}>Click to upload an image</span>
                <span style={{ fontSize: '0.875rem', color: 'var(--gray-500)' }}>PNG, JPG or GIF up to 10MB</span>
              </label>
            )}

            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
          </div>

          <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%' }}>
            {loading ? 'Submitting...' : 'Submit Issue'}
          </button>
        </form>
      </div>
    </div>
  );
}
