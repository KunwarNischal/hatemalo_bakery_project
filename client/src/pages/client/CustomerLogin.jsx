import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { User, Lock, Eye, EyeOff } from 'lucide-react';
import { loginCustomer } from '../../services/authService';
import { useForm } from '../../hooks/useForm';

const CustomerLogin = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [authError, setAuthError] = useState('');

    const form = useForm({
        initialValues: {
            email: '',
            password: ''
        },
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
                await loginCustomer(values.email, values.password);
                window.dispatchEvent(new Event('authchange'));
                toast.success('Welcome back!');
                navigate('/my-orders');
            } catch (error) {
                const msg = error || 'Login failed';
                setAuthError(msg);
                toast.error(msg);
            }
        }
    });

    return (
        <div className="min-h-screen bg-cream flex flex-col items-center justify-center py-3 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-6">
                <div className="text-center mb-6">
                    <div className="mx-auto h-12 w-12 bg-light-brown/10 rounded-full flex items-center justify-center mb-2 text-light-brown">
                        <User size={24} />
                    </div>
                    <h2 className="text-2xl font-extrabold text-dark-brown">Login</h2>
                    <p className="mt-1 text-xs text-gray-500">Welcome back to our bakery family!</p>
                </div>

                <form className="space-y-4" onSubmit={form.handleSubmit}>
                    {authError && (
                        <div className="bg-red-50 text-red-600 p-2 rounded-xl text-xs font-medium">
                            {authError}
                        </div>
                    )}

                    {/* Email Field */}
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            required
                            value={form.values.email}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                            className={`w-full px-3 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-light-brown bg-white text-dark-brown text-sm ${
                                form.touched.email && form.errors.email ? 'border-red-500' : 'border-gray-200'
                            }`}
                            placeholder="your@email.com"
                        />
                        {form.touched.email && form.errors.email && (
                            <p className="text-red-500 text-xs mt-1">{form.errors.email}</p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                required
                                value={form.values.password}
                                onChange={form.handleChange}
                                onBlur={form.handleBlur}
                                className={`w-full px-3 py-2 pr-10 rounded-xl border focus:outline-none focus:ring-2 focus:ring-light-brown bg-white text-dark-brown text-sm ${
                                    form.touched.password && form.errors.password ? 'border-red-500' : 'border-gray-200'
                                }`}
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-light-brown transition-colors"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                        {form.touched.password && form.errors.password && (
                            <p className="text-red-500 text-xs mt-1">{form.errors.password}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={form.isSubmitting}
                        className="btn-primary w-full py-2 text-sm mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {form.isSubmitting ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>

                {/* Link to Register */}
                <div className="mt-4 text-center border-t border-gray-200 pt-4">
                    <p className="text-gray-700 text-xs mb-2">Don't have an account?</p>
                    <Link
                        to="/register"
                        className="text-light-brown hover:text-dark-brown font-bold transition-colors text-xs"
                    >
                        Create one now
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CustomerLogin;
