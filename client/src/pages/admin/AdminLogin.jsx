import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff } from 'lucide-react';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { useForm } from '../../hooks/useForm';

const AdminLogin = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [authError, setAuthError] = useState('');

    const form = useForm({
        initialValues: { email: '', password: '' },
        validations: {
            email: (val) => {
                if (!val) return 'Email is required';
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return 'Invalid email format';
                return '';
            },
            password: (val) => {
                if (!val) return 'Password is required';
                if (val.length < 6) return 'Password must be at least 6 characters';
                return '';
            }
        },
        onSubmit: async (values) => {
            setAuthError('');
            try {
                const { data } = await api.post('/auth/login', values);

                if (data.isAdmin) {
                    localStorage.setItem('userInfo', JSON.stringify(data));
                    toast.success(`Welcome back, ${data.name}!`);
                    navigate('/admin/dashboard');
                } else {
                    const msg = 'Not authorized as an admin';
                    setAuthError(msg);
                    toast.error(msg);
                }
            } catch (err) {
                const msg = err.response?.data?.message || 'Invalid credentials';
                setAuthError(msg);
                toast.error(msg);
            }
        }
    });

    return (
        <div className="min-h-screen bg-cream flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center gap-4 mb-10">
                <img src="/logo.png" alt="HateMalo Bakery" className="h-20 w-auto rounded-full shadow-md" />
                <h1 className="text-4xl md:text-5xl font-black text-dark-brown tracking-tighter">
                    HateMalo <span className="text-light-brown">Bakery</span>
                </h1>
            </div>

            <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-10">
                <div className="text-center mb-10">
                    <div className="mx-auto h-16 w-16 bg-light-brown/10 rounded-full flex items-center justify-center mb-4 text-light-brown">
                        <Lock size={32} />
                    </div>
                    <h2 className="text-3xl font-extrabold text-dark-brown">
                        Admin Portal
                    </h2>
                    <p className="mt-2 text-sm text-gray-500">
                        Sign in to manage your bakery
                    </p>
                </div>
                <form className="space-y-6" onSubmit={form.handleSubmit}>
                    {authError && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium">
                            {authError}
                        </div>
                    )}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                        <input
                            type="email"
                            required
                            name="email"
                            value={form.values.email}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                            className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-light-brown bg-white text-dark-brown ${
                                form.touched.email && form.errors.email ? 'border-red-500' : 'border-gray-200'
                            }`}
                            placeholder="admin@hatemalo.com"
                        />
                        {form.touched.email && form.errors.email && (
                            <p className="text-red-500 text-sm mt-1">{form.errors.email}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                required
                                name="password"
                                value={form.values.password}
                                onChange={form.handleChange}
                                onBlur={form.handleBlur}
                                className={`w-full px-4 py-3 pr-12 rounded-xl border focus:outline-none focus:ring-2 focus:ring-light-brown bg-white text-dark-brown ${
                                    form.touched.password && form.errors.password ? 'border-red-500' : 'border-gray-200'
                                }`}
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-light-brown transition-colors"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                        {form.touched.password && form.errors.password && (
                            <p className="text-red-500 text-sm mt-1">{form.errors.password}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={form.isSubmitting}
                        className="btn-primary w-full py-3 text-lg mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {form.isSubmitting ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
