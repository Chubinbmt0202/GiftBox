import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Package, LogIn, AlertCircle } from 'lucide-react';

export const Login = () => {
    const { loginWithGoogle, user, role } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Redirection logic when user is already logged in
        if (user) {
            if (role === 'admin') {
                navigate('/admin', { replace: true });
            } else if (role === 'client') {
                navigate('/', { replace: true });
            }
        }
    }, [user, role, navigate]);

    const handleGoogleLogin = async () => {
        setIsLoading(true);
        setError(null);
        try {
            await loginWithGoogle();
        } catch (err: any) {
            console.error('Login failed:', err);
            setError('Đăng nhập thất bại. Vui lòng thử lại.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f8f9fa] flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8 font-sans">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center">
                    <div className="w-16 h-16 bg-[#0066ff] rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                        <Package className="w-8 h-8 text-white" />
                    </div>
                </div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 tracking-tight">
                    Welcome to Vintage Gift
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600 font-medium">
                    Hãy đăng nhập để tiếp tục
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-10 px-6 shadow-xl shadow-gray-200/50 rounded-2xl sm:px-10 border border-gray-100">

                    {error && (
                        <div className="mb-6 rounded-xl bg-red-50 p-4 border border-red-100 flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                            <p className="text-sm font-medium text-red-800">{error}</p>
                        </div>
                    )}

                    <div>
                        <button
                            onClick={handleGoogleLogin}
                            disabled={isLoading}
                            className="w-full flex justify-center items-center gap-3 py-3 px-4 border border-gray-200 rounded-xl shadow-sm text-sm font-bold text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0066ff] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                                        <path
                                            fill="#EA4335"
                                            d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                                        />
                                        <path
                                            fill="#34A853"
                                            d="M12.545,22c5.005,0,8.328-2.928,9.426-11.748l-9.426,0v0h0v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748z"
                                        />
                                        <path
                                            fill="#4A90E2"
                                            d="M12.545,10.239v0h0v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10C22.547,22,22.547,22,22.547,22z"
                                        />
                                        <path
                                            fill="#FBBC05"
                                            d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2v0h0v0h0V2z"
                                        />
                                    </svg>
                                    Đăng nhập với Google
                                </>
                            )}
                        </button>
                    </div>

                    <div className="mt-8 flex items-center justify-center gap-2">
                        <LogIn className="w-4 h-4 text-gray-400" />
                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Secure Login</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
