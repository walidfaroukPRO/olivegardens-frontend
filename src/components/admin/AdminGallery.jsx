import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { FaPlus, FaTrash, FaImage } from 'react-icons/fa';

const AdminGallery = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/gallery', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setGallery(response.data);
    } catch (error) {
      console.error('Failed to fetch gallery:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const formData = new FormData();
    
    Array.from(files).forEach(file => {
      formData.append('images', file);
    });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('/api/gallery', formData, {
        headers: { 
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.data.success) {
        alert(lang === 'ar' 
          ? `تم رفع ${response.data.items.length} صورة بنجاح` 
          : `${response.data.items.length} image(s) uploaded successfully`
        );
        fetchGallery();
      }
    } catch (error) {
      console.error('Failed to upload:', error);
      alert(lang === 'ar' 
        ? 'فشل رفع الصور. تأكد من تسجيل الدخول كمسؤول.' 
        : 'Failed to upload images. Make sure you are logged in as admin.'
      );
    } finally {
      setUploading(false);
      e.target.value = ''; // Reset file input
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm(lang === 'ar' ? 'هل أنت متأكد من الحذف؟' : 'Delete this image?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`/api/gallery/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert(lang === 'ar' ? 'تم الحذف بنجاح' : 'Deleted successfully');
        fetchGallery();
      } catch (error) {
        console.error('Failed to delete:', error);
        alert(lang === 'ar' ? 'فشل الحذف' : 'Failed to delete');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="inline-block w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <div className="bg-gradient-to-r from-primary to-dark rounded-xl p-8 text-white">
        <h3 className="text-2xl font-bold mb-4">
          {lang === 'ar' ? 'رفع صور جديدة' : 'Upload New Images'}
        </h3>
        <p className="text-gray-200 mb-4">
          {lang === 'ar' 
            ? 'يمكنك رفع حتى 10 صور في المرة الواحدة (الحد الأقصى 5 ميجابايت لكل صورة)'
            : 'You can upload up to 10 images at once (Max 5MB per image)'}
        </p>
        <label className="flex items-center justify-center gap-3 px-6 py-4 bg-white/20 hover:bg-white/30 rounded-xl cursor-pointer transition-all border-2 border-dashed border-white/50">
          <FaPlus className="text-2xl" />
          <span className="font-semibold">
            {uploading 
              ? (lang === 'ar' ? 'جاري الرفع...' : 'Uploading...')
              : (lang === 'ar' ? 'اختر الصور (حتى 10)' : 'Choose Images (up to 10)')}
          </span>
          <input
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
            multiple
            onChange={handleUpload}
            disabled={uploading}
            className="hidden"
          />
        </label>
      </div>

      {/* Stats */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-600">
              {lang === 'ar' ? 'إجمالي الصور' : 'Total Images'}
            </div>
            <div className="text-3xl font-bold text-primary">{gallery.length}</div>
          </div>
          <FaImage className="text-5xl text-primary/20" />
        </div>
      </div>

      {/* Gallery Grid */}
      {gallery.length === 0 ? (
        <div className="text-center py-20 text-gray-400 bg-white rounded-xl">
          <FaImage className="text-6xl mx-auto mb-4 opacity-30" />
          <p className="text-lg">
            {lang === 'ar' ? 'لا توجد صور في المعرض' : 'No images in gallery'}
          </p>
          <p className="text-sm mt-2">
            {lang === 'ar' ? 'ابدأ برفع الصور الآن!' : 'Start uploading images now!'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {gallery.map((item) => (
            <div key={item._id} className="group relative aspect-square rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all">
              <img
                src={item.imageUrl}
                alt={item.title?.[lang] || 'Gallery'}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-4 left-4 right-4">
                  {item.title?.[lang] && (
                    <p className="text-white text-sm mb-2 font-semibold">
                      {item.title[lang]}
                    </p>
                  )}
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                  >
                    <FaTrash />
                    {lang === 'ar' ? 'حذف' : 'Delete'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminGallery;