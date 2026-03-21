import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useOutletContext } from 'react-router-dom';
import { ArrowLeft, Save, Upload, XCircle, Loader2 } from 'lucide-react';
import api, { getImageUrl } from '../../services/api';
import toast from 'react-hot-toast';
import { useAuthCheck } from '../../hooks/useAuthCheck';
import { useFetchData } from '../../hooks/useFetchData';

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated } = useAuthCheck('admin', { redirectTo: '/admin' });
    const { refetchProducts } = useOutletContext();

    // UI states
    const [uploading, setUploading] = useState(false);

    // Form state
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [stock, setStock] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    // Fetch categories using custom hook
    const { data: categories = [], loading: categoriesLoading } = useFetchData(
        () => api.get('/categories').then(res => res.data),
        [],
        (error) => toast.error('Failed to load categories'),
        { initialData: [] }
    );

    // Fetch product details using custom hook
    const { data: productData, loading: productLoading, error: productError } = useFetchData(
        () => api.get(`/products/${id}`).then(res => res.data),
        [id],
        (error) => toast.error('Failed to load product details'),
        { initialData: null }
    );

    // Update form state when product data loads
    useEffect(() => {
        if (productData) {
            setName(productData.name);
            setPrice(productData.price);
            // Handle both categoryId and category name from backend
            if (productData.categoryId) {
                setCategoryId(productData.categoryId);
            } else if (productData.category) {
                // If backend returns category name, find the matching ID
                const foundCategory = categories.find(cat => cat.name === productData.category);
                if (foundCategory) {
                    setCategoryId(foundCategory._id);
                }
            }
            setStock(productData.stock);
            setDescription(productData.description);
            if (productData.image) {
                setImagePreview(getImageUrl(productData.image));
            }
        }
    }, [productData, categories]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        setUploading(true);
        
        // Find the selected category object to get its name
        const selectedCategory = categories.find(cat => cat._id === categoryId);
        const categoryName = selectedCategory?.name || '';
        
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('categoryId', categoryId);
        formData.append('category', categoryName);
        formData.append('stock', stock);
        formData.append('description', description);
        if (image) {
            formData.append('image', image);
        }

        try {
            await api.put(`/products/${id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            toast.success(`${name} updated successfully!`, {
                style: { borderRadius: '16px', background: '#3d2b1f', color: '#fff' }
            });
            // Refetch products to update the list
            await refetchProducts();
            navigate('/admin/products');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to update product');
        } finally {
            setUploading(false);
        }
    };

    if (productLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 size={48} className="animate-spin text-light-brown" />
                    <p className="text-gray-500 font-medium">Loading treat details...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate('/admin/products')} className="p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-all text-gray-500 hover:text-dark-brown cursor-pointer">
                            <ArrowLeft size={24} />
                        </button>
                        <div>
                            <h1 className="text-3xl font-bold text-dark-brown">Edit Treat</h1>
                            <p className="text-gray-500">Refine your delicious creation: {name}</p>
                        </div>
                    </div>
                </div>

                {productError && (
                    <div className="mb-6 bg-red-50 text-red-600 p-4 rounded-2xl flex items-center gap-2">
                        <XCircle size={20} />
                        {productError}
                    </div>
                )}

                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                    <form onSubmit={handleUpdateProduct} className="p-8 md:p-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Left Column: Details */}
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Product Name</label>
                                    <input
                                        type="text" required value={name} onChange={(e) => setName(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-light-brown"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Price (Rs.)</label>
                                        <input
                                            type="number" required value={price} onChange={(e) => setPrice(e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-light-brown"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Stock</label>
                                        <input
                                            type="number" required value={stock} onChange={(e) => setStock(e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-light-brown"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Category</label>
                                    <select
                                        value={categoryId} onChange={(e) => setCategoryId(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-light-brown bg-white"
                                    >
                                        {categories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Description</label>
                                    <textarea
                                        required rows="4" value={description} onChange={(e) => setDescription(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-light-brown resize-none"
                                    ></textarea>
                                </div>
                            </div>

                            {/* Right Column: Image Upload */}
                            <div className="space-y-6">
                                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Product Image</label>
                                <div
                                    className={`relative aspect-square rounded-3xl border-2 border-dashed flex flex-col items-center justify-center overflow-hidden transition-all ${imagePreview ? 'border-light-brown' : 'border-gray-200 bg-gray-50'}`}
                                >
                                    {imagePreview ? (
                                        <>
                                            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <input
                                                    type="file"
                                                    id="image-upload"
                                                    className="hidden"
                                                    onChange={handleImageChange}
                                                    accept="image/*"
                                                />
                                                <label
                                                    htmlFor="image-upload"
                                                    className="px-6 py-2 bg-white text-dark-brown rounded-full font-bold cursor-pointer hover:bg-cream transition-all inline-block shadow-lg"
                                                >
                                                    Change Image
                                                </label>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="text-center p-8">
                                            <div className="mx-auto h-16 w-16 bg-light-brown/10 rounded-full flex items-center justify-center mb-4 text-light-brown">
                                                <Upload size={32} />
                                            </div>
                                            <p className="text-gray-500 font-medium mb-4">Click below to upload a photo</p>
                                            <input
                                                type="file"
                                                id="image-upload-empty"
                                                className="hidden"
                                                onChange={handleImageChange}
                                                accept="image/*"
                                            />
                                            <label
                                                htmlFor="image-upload-empty"
                                                className="px-6 py-2 bg-light-brown text-white rounded-full font-bold cursor-pointer hover:bg-dark-brown transition-all inline-block"
                                            >
                                                Select File
                                            </label>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 pt-8 border-t border-gray-100 flex gap-4">
                            <button type="button" onClick={() => navigate('/admin/dashboard', { state: { activeTab: 'products' } })} className="flex-1 py-4 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-all border border-gray-200 text-center cursor-pointer">
                                Cancel Updates
                            </button>
                            <button
                                type="submit" disabled={uploading}
                                className="flex-1 bg-light-brown text-white py-4 rounded-xl font-bold hover:bg-dark-brown transition-all shadow-lg shadow-light-brown/20 flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                <Save size={20} />
                                {uploading ? 'Updating Treat...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProduct;
