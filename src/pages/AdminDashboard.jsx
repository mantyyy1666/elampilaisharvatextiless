import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabase';
import { 
  LogOut, Plus, Edit2, Trash2, Settings, 
  Package, LayoutDashboard, Download, TrendingUp, AlertCircle
} from 'lucide-react';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState('919994466665');
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    category: 'Elampillai Soft Silk',
    price: '',
    badge: '',
    description: '',
    emoji: '🥻',
    specs: '{\n  "Fabric": "",\n  "Wash": "Dry Clean"\n}'
  });

  useEffect(() => {
    // Check auth
    if (localStorage.getItem('isAuthenticated') !== 'true') {
      navigate('/admin');
      return;
    }

    fetchProducts();
  }, [navigate]);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      if (data) {
        setProducts(data);
      }
    } catch (error) {
      console.error('Error fetching products, using dummy data', error);
      // Dummy data for visual presentation if DB is unlinked
      setProducts([
        {
          id: '1',
          name: 'Pachai Kilimooku Soft Silk Saree',
          category: 'Elampillai Soft Silk',
          price: '2499',
          badge: 'Bestseller',
          description: 'Authentic Elampillai soft silk saree in parrot green with rich zari borders.',
          emoji: '🥻',
          created_at: new Date().toISOString()
        },
        {
          id: '2',
          name: 'Midnight Blue Arani Silk',
          category: 'Arani Silk',
          price: '3999',
          badge: 'Premium',
          description: 'Deep midnight blue pure Arani silk with contrast pink borders. Perfect for weddings.',
          emoji: '✨',
          created_at: new Date(Date.now() - 86400000).toISOString()
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/admin');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Basic validation for JSON specs
      try {
        JSON.parse(formData.specs);
      } catch {
        alert("Invalid JSON in Specs field. Please correct it.");
        return;
      }

      const newProduct = {
        name: formData.name,
        category: formData.category,
        price: parseFloat(formData.price),
        badge: formData.badge,
        description: formData.description,
        emoji: formData.emoji,
        specs: formData.specs // Store as string if your DB expects text, or object if jsonb
      };

      const { error } = await supabase
        .from('products')
        .insert([newProduct])
        .select();

      if (error) throw error;

      alert("Product added successfully!");
      setShowAddModal(false);
      
      // Reset form
      setFormData({
        name: '',
        category: 'Elampillai Soft Silk',
        price: '',
        badge: '',
        description: '',
        emoji: '🥻',
        specs: '{\n  "Fabric": "",\n  "Wash": "Dry Clean"\n}'
      });
      
      fetchProducts();
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Error adding product OR using dummy mode (Supabase not deployed). Creating local mock item.');
      
      // Mock update for presentation
      const newMockProduct = {
        id: Date.now().toString(),
        ...formData,
        price: formData.price,
        created_at: new Date().toISOString()
      };
      setProducts([newMockProduct, ...products]);
      setShowAddModal(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
       // Mock delete for presentation
       setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(products, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = `sharvatex_products_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  // Stats calculation
  const totalProducts = products.length;
  const newItems = products.filter(p => {
    const date = new Date(p.created_at);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    return diffDays <= 7;
  }).length;
  const hotItems = products.filter(p => p.badge?.toLowerCase().includes('best')).length;

  return (
    <div className="min-h-screen bg-[#FFFDF7] flex pt-20">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0F3D2E] text-[#FFFDF7] fixed h-full flex flex-col shadow-2xl z-10 transition-transform transform md:translate-x-0 -translate-x-full">
        <div className="p-6 border-b border-[#FFFDF7]/10 flex items-center justify-between">
          <h2 className="text-2xl font-heading font-bold text-[#C9A44C]">Admin</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setShowSettings(false)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-body ${!showSettings ? 'bg-[#C9A44C] text-[#0F3D2E] font-bold' : 'hover:bg-[#FFFDF7]/10'}`}
          >
            <LayoutDashboard size={20} />
            Dashboard
          </button>
          <button 
            onClick={() => setShowSettings(true)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-body ${showSettings ? 'bg-[#C9A44C] text-[#0F3D2E] font-bold' : 'hover:bg-[#FFFDF7]/10'}`}
          >
            <Settings size={20} />
            Settings
          </button>
        </nav>
        <div className="p-4 border-t border-[#FFFDF7]/10">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-[#FFFDF7]/10 hover:bg-red-500 hover:text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-8 relative min-h-screen">
        <div className="max-w-6xl mx-auto space-y-8">
          
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-heading font-bold text-[#0F3D2E]">
                {showSettings ? 'Store Settings' : 'Dashboard Overview'}
              </h1>
              <p className="text-[#0F3D2E]/60 font-body text-sm mt-1">
                Manage your Sharvatex catalogue and settings.
              </p>
            </div>
            
            {!showSettings && (
              <div className="flex items-center gap-3">
                <button 
                  onClick={handleExport}
                  className="flex items-center gap-2 bg-white text-[#0F3D2E] border border-[#F5E6C8] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#F5E6C8]/30 transition-colors shadow-sm"
                >
                  <Download size={16} />
                  Export JSON
                </button>
                <button 
                  onClick={() => setShowAddModal(true)}
                  className="flex items-center gap-2 bg-[#0F3D2E] text-[#FFFDF7] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#C9A44C] transition-colors shadow-md"
                >
                  <Plus size={16} />
                  Add Product
                </button>
              </div>
            )}
          </header>

          {showSettings ? (
            /* Settings View */
            <div className="bg-white rounded-2xl shadow-sm border border-[#F5E6C8] p-6 max-w-2xl">
              <h3 className="text-xl font-heading font-bold text-[#0F3D2E] mb-6 border-b border-[#F5E6C8] pb-4">General Settings</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-[#0F3D2E] mb-2">WhatsApp Number (For Enquiries)</label>
                  <div className="flex gap-2">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-[#F5E6C8] bg-[#F5E6C8]/30 text-[#0F3D2E]/60 sm:text-sm">
                      +
                    </span>
                    <input 
                      type="text" 
                      value={whatsappNumber}
                      onChange={(e) => setWhatsappNumber(e.target.value)}
                      className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-[#C9A44C] focus:border-[#C9A44C] sm:text-sm border-[#F5E6C8] border bg-white text-[#0F3D2E]"
                    />
                  </div>
                  <p className="mt-1 text-xs text-[#0F3D2E]/50">Include country code without '+' (e.g., 919994466665)</p>
                </div>
                
                <div className="pt-4 border-t border-[#F5E6C8]">
                  <label className="block text-sm font-medium text-[#0F3D2E] mb-2">Change Admin Password</label>
                  <input 
                    type="password" 
                    placeholder="New Password"
                    className="block w-full px-3 py-2 border border-[#F5E6C8] rounded-md shadow-sm focus:ring-[#C9A44C] focus:border-[#C9A44C] sm:text-sm bg-white mb-3"
                  />
                  <input 
                    type="password" 
                    placeholder="Confirm New Password"
                    className="block w-full px-3 py-2 border border-[#F5E6C8] rounded-md shadow-sm focus:ring-[#C9A44C] focus:border-[#C9A44C] sm:text-sm bg-white"
                  />
                </div>
                
                <div className="pt-4 flex justify-end">
                  <button className="bg-[#0F3D2E] text-[#FFFDF7] px-6 py-2 rounded-lg font-medium hover:bg-[#C9A44C] transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Dashboard View */
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl shadow-sm border border-[#F5E6C8] p-6 flex items-start gap-4 hover:shadow-md transition-shadow">
                  <div className="bg-[#E8F3EF] text-[#0F3D2E] p-3 rounded-lg"><Package size={24} /></div>
                  <div>
                    <p className="text-sm font-medium text-[#0F3D2E]/60 uppercase tracking-wider mb-1">Total Products</p>
                    <p className="text-3xl font-heading font-bold text-[#0F3D2E]">{totalProducts}</p>
                  </div>
                </div>
                <div className="bg-white rounded-2xl shadow-sm border border-[#F5E6C8] p-6 flex items-start gap-4 hover:shadow-md transition-shadow">
                  <div className="bg-[#FEF6E5] text-[#C9A44C] p-3 rounded-lg"><TrendingUp size={24} /></div>
                  <div>
                    <p className="text-sm font-medium text-[#0F3D2E]/60 uppercase tracking-wider mb-1">New Arrivals</p>
                    <p className="text-3xl font-heading font-bold text-[#0F3D2E]">{newItems}</p>
                    <p className="text-xs text-[#0F3D2E]/50 mt-1">Added in last 7 days</p>
                  </div>
                </div>
                <div className="bg-white rounded-2xl shadow-sm border border-[#F5E6C8] p-6 flex items-start gap-4 hover:shadow-md transition-shadow">
                  <div className="bg-[#FFF0ED] text-red-500 p-3 rounded-lg"><AlertCircle size={24} /></div>
                  <div>
                    <p className="text-sm font-medium text-[#0F3D2E]/60 uppercase tracking-wider mb-1">Hot Items</p>
                    <p className="text-3xl font-heading font-bold text-[#0F3D2E]">{hotItems}</p>
                  </div>
                </div>
              </div>

              {/* Product Table */}
              <div className="bg-white rounded-2xl shadow-sm border border-[#F5E6C8] overflow-hidden">
                <div className="px-6 py-4 border-b border-[#F5E6C8] bg-[#F5E6C8]/10 flex justify-between items-center">
                  <h3 className="text-lg font-heading font-bold text-[#0F3D2E]">Product Inventory</h3>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-[#F5E6C8]">
                    <thead className="bg-gray-50/50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#0F3D2E]/60 uppercase tracking-wider">Product</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#0F3D2E]/60 uppercase tracking-wider">Category</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#0F3D2E]/60 uppercase tracking-wider">Price (₹)</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#0F3D2E]/60 uppercase tracking-wider">Badge</th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-[#0F3D2E]/60 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-[#F5E6C8]">
                      {isLoading ? (
                        <tr>
                          <td colSpan="5" className="px-6 py-12 text-center text-[#0F3D2E]/50">Loading products...</td>
                        </tr>
                      ) : products.length === 0 ? (
                        <tr>
                          <td colSpan="5" className="px-6 py-12 text-center text-[#0F3D2E]/50">No products found. Add one above.</td>
                        </tr>
                      ) : (
                        products.map((product) => (
                          <tr key={product.id} className="hover:bg-[#F5E6C8]/5 transition-colors group">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10 bg-[#F5E6C8]/30 rounded-lg flex items-center justify-center text-xl">
                                  {product.emoji || '🥻'}
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-[#0F3D2E]">{product.name}</div>
                                  <div className="text-xs text-[#0F3D2E]/50 truncate max-w-[200px]">{product.description}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-[#0F3D2E]/5 text-[#0F3D2E]">
                                {product.category}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-[#0F3D2E] font-medium font-heading tabular-nums">
                              {product.price}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {product.badge ? (
                                <span className="bg-[#C9A44C]/20 text-[#0F3D2E] text-xs px-2 py-1 rounded-md font-medium">
                                  {product.badge}
                                </span>
                              ) : '-'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button className="text-[#0F3D2E]/60 hover:text-[#0F3D2E] mr-3 transition-colors" title="Edit">
                                <Edit2 size={16} />
                              </button>
                              <button 
                                onClick={() => handleDelete(product.id)}
                                className="text-red-400 hover:text-red-600 transition-colors" 
                                title="Delete"
                              >
                                <Trash2 size={16} />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

        </div>
      </main>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-[#0F3D2E]/80 backdrop-blur-sm transition-opacity" onClick={() => setShowAddModal(false)}></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full border border-[#F5E6C8]">
              <div className="bg-[#FFFDF7] px-4 pt-5 pb-4 sm:p-6 sm:pb-4 border-b border-[#F5E6C8]">
                <h3 className="text-2xl font-heading font-bold text-[#0F3D2E]" id="modal-title">
                  Add New Product
                </h3>
                <p className="text-sm text-[#0F3D2E]/60 mt-1">Fill out the details below to add a new saree to your catalogue.</p>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="px-4 py-5 sm:p-6 bg-white space-y-4">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label htmlFor="name" className="block text-sm font-medium text-[#0F3D2E]">Product Name *</label>
                      <input type="text" name="name" id="name" required value={formData.name} onChange={handleInputChange} className="mt-1 block w-full border border-[#F5E6C8] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#C9A44C] focus:border-[#C9A44C] sm:text-sm" />
                    </div>

                    <div>
                      <label htmlFor="category" className="block text-sm font-medium text-[#0F3D2E]">Category *</label>
                      <select name="category" id="category" value={formData.category} onChange={handleInputChange} className="mt-1 block w-full bg-white border border-[#F5E6C8] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#C9A44C] focus:border-[#C9A44C] sm:text-sm">
                        <option>Elampillai Soft Silk</option>
                        <option>Arani Silk</option>
                        <option>Kalyani Cotton</option>
                        <option>Maheswari Cotton</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="price" className="block text-sm font-medium text-[#0F3D2E]">Price (₹) *</label>
                      <input type="number" name="price" id="price" required value={formData.price} onChange={handleInputChange} className="mt-1 block w-full border border-[#F5E6C8] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#C9A44C] focus:border-[#C9A44C] sm:text-sm" />
                    </div>

                    <div>
                      <label htmlFor="badge" className="block text-sm font-medium text-[#0F3D2E]">Badge (Optional)</label>
                      <input type="text" name="badge" id="badge" placeholder="e.g. Bestseller, New" value={formData.badge} onChange={handleInputChange} className="mt-1 block w-full border border-[#F5E6C8] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#C9A44C] focus:border-[#C9A44C] sm:text-sm" />
                    </div>
                    
                    <div>
                      <label htmlFor="emoji" className="block text-sm font-medium text-[#0F3D2E]">Emoji Icon *</label>
                      <input type="text" name="emoji" id="emoji" maxLength="2" required value={formData.emoji} onChange={handleInputChange} className="mt-1 block w-full border border-[#F5E6C8] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#C9A44C] focus:border-[#C9A44C] text-xl text-center" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-[#0F3D2E]">Description *</label>
                    <textarea id="description" name="description" rows="3" required value={formData.description} onChange={handleInputChange} className="mt-1 block w-full border border-[#F5E6C8] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#C9A44C] focus:border-[#C9A44C] sm:text-sm"></textarea>
                  </div>

                  <div>
                    <label htmlFor="specs" className="block text-sm font-medium text-[#0F3D2E]">Specifications (JSON format)</label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <textarea id="specs" name="specs" rows="4" value={formData.specs} onChange={handleInputChange} className="focus:ring-[#C9A44C] focus:border-[#C9A44C] flex-1 block w-full rounded-md sm:text-sm border-[#F5E6C8] font-mono text-xs bg-gray-50"></textarea>
                    </div>
                    <p className="mt-2 text-xs text-gray-500">Key-value pairs to show as tags on the product card.</p>
                  </div>

                </div>
                <div className="bg-[#FFFDF7] px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse border-t border-[#F5E6C8]">
                  <button type="submit" className="w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-[#0F3D2E] text-base font-medium text-white hover:bg-[#C9A44C] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0F3D2E] sm:ml-3 sm:w-auto sm:text-sm transition-colors">
                    Save Product
                  </button>
                  <button type="button" onClick={() => setShowAddModal(false)} className="mt-3 w-full inline-flex justify-center rounded-lg border border-[#F5E6C8] shadow-sm px-4 py-2 bg-white text-base font-medium text-[#0F3D2E] hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C9A44C] sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;
