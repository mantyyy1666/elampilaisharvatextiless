import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User } from 'lucide-react';

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (password === 'admin123') { // Simple hardcoded password for now
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('Invalid password. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF7] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#F5E6C8]/40 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#0F3D2E]/5 rounded-full blur-3xl -z-10"></div>
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center text-[#0F3D2E] mb-6">
          <div className="h-20 w-20 bg-[#F5E6C8] rounded-full flex items-center justify-center shadow-inner border-2 border-[#C9A44C]">
            <Lock size={36} className="text-[#0F3D2E]" />
          </div>
        </div>
        <h2 className="text-center text-3xl font-heading font-bold text-[#0F3D2E]">
          Admin Access
        </h2>
        <p className="mt-2 text-center text-sm text-[#0F3D2E]/70 font-body">
          Secure portal for Sharvatex management
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl shadow-[#0F3D2E]/5 sm:rounded-2xl sm:px-10 border border-[#F5E6C8]">
          <form className="space-y-6" onSubmit={handleLogin}>
            
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
                <div className="flex">
                  <div className="ml-3">
                    <p className="text-sm text-red-700 font-medium">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#0F3D2E] font-body">
                Master Password
              </label>
              <div className="mt-2 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-[#0F3D2E]/40" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full pl-10 pr-3 py-3 border border-[#F5E6C8] rounded-xl shadow-sm placeholder-[#0F3D2E]/40 focus:outline-none focus:ring-2 focus:ring-[#C9A44C] focus:border-transparent sm:text-sm font-body transition-all"
                  placeholder="Enter password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-md text-sm font-medium text-[#FFFDF7] bg-[#0F3D2E] hover:bg-[#C9A44C] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0F3D2E] transition-all font-body disabled:opacity-70 disabled:cursor-not-allowed group relative overflow-hidden"
              >
                {!isLoading ? (
                  <>
                    <span className="relative z-10 flex items-center gap-2">
                      Unlock Dashboard <Lock size={16} className="group-hover:unlock" />
                    </span>
                  </>
                ) : (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Authenticating...
                  </span>
                )}
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-center">
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
