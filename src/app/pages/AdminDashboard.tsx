import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Package, DollarSign, TrendingUp, Clock, 
  LogOut, Eye, Check, X, RefreshCw,
  ShoppingBag, Truck, Shield, Mail
} from 'lucide-react';
import { getOrders, getAdminStats, updateOrderStatus, Order } from '@/app/services/api';
import { adminLogin } from '@/app/services/api';

const ADMIN_EMAIL = 'abhikbangera@gmail.com';
const ADMIN_PASSWORD = 'admin@123';

export function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [stats, setStats] = useState<any>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const adminToken = localStorage.getItem('admin_token');
    if (adminToken) {
      setIsAuthenticated(true);
      loadData();
    }
  }, []);

  const loadData = async () => {
    try {
      const [statsData, ordersData] = await Promise.all([
        getAdminStats(),
        getOrders()
      ]);
      setStats(statsData);
      setOrders(ordersData);
    } catch (error) {
      console.error('Failed to load data:', error);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await adminLogin(email, password);
      if (response.success) {
        localStorage.setItem('admin_token', response.token);
        setIsAuthenticated(true);
        await loadData();
      }
    } catch (err: any) {
      setError(err.message || 'Invalid credentials');
    }
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setIsAuthenticated(false);
    setEmail('');
    setPassword('');
  };

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    setUpdatingStatus(orderId);
    try {
      await updateOrderStatus(orderId, newStatus);
      await loadData();
      if (selectedOrder && selectedOrder.orderId === orderId) {
        setSelectedOrder({ ...selectedOrder, status: newStatus });
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    }
    setUpdatingStatus(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-[#00ff9d]/20 text-[#00ff9d]';
      case 'processing': return 'bg-[#00d9ff]/20 text-[#00d9ff]';
      case 'shipped': return 'bg-[#ffd600]/20 text-[#ffd600]';
      case 'delivered': return 'bg-green-500/20 text-green-400';
      case 'cancelled': return 'bg-red-500/20 text-red-400';
      default: return 'bg-white/10 text-white';
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] pt-32 pb-20 px-4 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <h1
              className="text-5xl md:text-6xl mb-4 bg-gradient-to-r from-[#ff0055] to-[#00d9ff] bg-clip-text text-transparent"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              ADMIN PANEL
            </h1>
            <p className="text-white/70">RetroKick Management System</p>
          </div>

          <div className="p-8 rounded-2xl bg-[#1a1a2e] border border-white/10 backdrop-blur-sm">
            <form onSubmit={handleLogin} className="space-y-6">
              {error && (
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-white/70 mb-2 text-sm">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-4 bg-[#0a0a0f] border border-white/10 rounded-lg text-white focus:border-[#ff0055] focus:outline-none transition-colors"
                  placeholder="admin@example.com"
                />
              </div>

              <div>
                <label className="block text-white/70 mb-2 text-sm">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-4 bg-[#0a0a0f] border border-white/10 rounded-lg text-white focus:border-[#ff0055] focus:outline-none transition-colors"
                  placeholder="••••••••"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-[#ff0055] to-[#00d9ff] text-white font-bold rounded-lg disabled:opacity-50"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                {loading ? 'Signing in...' : 'ADMIN LOGIN'}
              </motion.button>
            </form>

            <div className="mt-6 p-4 rounded-lg bg-[#0a0a0f] border border-white/10">
              <p className="text-white/50 text-xs text-center">
                Admin access only. Use credentials provided by the owner.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-32 pb-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1
              className="text-5xl md:text-6xl mb-2 text-white"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              ADMIN DASHBOARD
            </h1>
            <p className="text-white/70">Manage orders and track performance</p>
          </div>
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={loadData}
              className="p-3 bg-[#1a1a2e] border border-white/10 rounded-lg hover:border-[#00ff9d] transition-colors"
            >
              <RefreshCw className="w-5 h-5 text-white" />
            </motion.button>
            <Link to="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="px-4 py-2 bg-[#1a1a2e] border border-white/10 rounded-lg text-white hover:text-[#ff0055] hover:border-[#ff0055] transition-colors flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </motion.button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-2xl bg-[#1a1a2e] border border-white/10"
          >
            <div className="flex items-center justify-between mb-4">
              <Package className="w-10 h-10 text-[#00ff9d]" />
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <h3 className="text-3xl font-black text-white" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              {stats?.totalOrders || 0}
            </h3>
            <p className="text-white/50 text-sm">Total Orders</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-6 rounded-2xl bg-[#1a1a2e] border border-white/10"
          >
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-10 h-10 text-[#00d9ff]" />
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <h3 className="text-3xl font-black text-white" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              ₹{(stats?.totalRevenue || 0).toLocaleString('en-IN')}
            </h3>
            <p className="text-white/50 text-sm">Total Revenue</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-6 rounded-2xl bg-[#1a1a2e] border border-white/10"
          >
            <div className="flex items-center justify-between mb-4">
              <Clock className="w-10 h-10 text-[#ffd600]" />
              <span className="text-xs text-[#ffd600] bg-[#ffd600]/10 px-2 py-1 rounded">Pending</span>
            </div>
            <h3 className="text-3xl font-black text-white" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              {stats?.pendingOrders || 0}
            </h3>
            <p className="text-white/50 text-sm">Pending Orders</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-6 rounded-2xl bg-[#1a1a2e] border border-white/10"
          >
            <div className="flex items-center justify-between mb-4">
              <Check className="w-10 h-10 text-green-400" />
              <span className="text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded">Completed</span>
            </div>
            <h3 className="text-3xl font-black text-white" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              {stats?.completedOrders || 0}
            </h3>
            <p className="text-white/50 text-sm">Completed Orders</p>
          </motion.div>
        </div>

        {/* Orders Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-6 rounded-2xl bg-[#1a1a2e] border border-white/10"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl text-white font-bold uppercase" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Recent Orders
            </h2>
            <span className="text-white/50 text-sm">{orders.length} total orders</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 px-4 text-white/70 font-medium">Order ID</th>
                  <th className="text-left py-4 px-4 text-white/70 font-medium">Customer</th>
                  <th className="text-left py-4 px-4 text-white/70 font-medium">Items</th>
                  <th className="text-left py-4 px-4 text-white/70 font-medium">Total</th>
                  <th className="text-left py-4 px-4 text-white/70 font-medium">Status</th>
                  <th className="text-left py-4 px-4 text-white/70 font-medium">Date</th>
                  <th className="text-left py-4 px-4 text-white/70 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.orderId} className="border-b border-white/5 hover:bg-white/5">
                    <td className="py-4 px-4">
                      <span className="text-[#00ff9d] font-mono text-sm">{order.orderId}</span>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <p className="text-white font-bold">{order.shippingInfo?.firstName} {order.shippingInfo?.lastName}</p>
                        <p className="text-white/50 text-sm">{order.shippingInfo?.email}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-white/70">
                      {order.items?.length || 0} item(s)
                    </td>
                    <td className="py-4 px-4 text-[#00ff9d] font-bold">
                      ₹{order.grandTotal?.toLocaleString('en-IN') || 0}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}>
                        {order.status?.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-white/50 text-sm">
                      {order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-IN') : '-'}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedOrder(order)}
                          className="p-2 bg-white/10 rounded-lg hover:bg-[#00d9ff]/20 transition-colors"
                        >
                          <Eye className="w-4 h-4 text-white" />
                        </motion.button>
                        {order.status === 'confirmed' && (
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleStatusUpdate(order.orderId, 'processing')}
                            disabled={updatingStatus === order.orderId}
                            className="p-2 bg-white/10 rounded-lg hover:bg-[#ffd600]/20 transition-colors disabled:opacity-50"
                          >
                            <Truck className="w-4 h-4 text-[#ffd600]" />
                          </motion.button>
                        )}
                        {order.status === 'processing' && (
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleStatusUpdate(order.orderId, 'shipped')}
                            disabled={updatingStatus === order.orderId}
                            className="p-2 bg-white/10 rounded-lg hover:bg-green-500/20 transition-colors disabled:opacity-50"
                          >
                            <Check className="w-4 h-4 text-green-400" />
                          </motion.button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {orders.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-white/20 mx-auto mb-4" />
              <p className="text-white/50">No orders yet</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Order Detail Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
            onClick={() => setSelectedOrder(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-2xl rounded-2xl bg-[#1a1a2e] border border-white/10 p-6 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl text-white font-bold uppercase" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  Order Details
                </h2>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Order Info */}
                <div className="p-4 rounded-xl bg-[#0a0a0f]">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[#00ff9d] font-mono">{selectedOrder.orderId}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(selectedOrder.status)}`}>
                      {selectedOrder.status?.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-white/50 text-sm">
                    Placed on {selectedOrder.createdAt ? new Date(selectedOrder.createdAt).toLocaleString('en-IN') : '-'}
                  </p>
                </div>

                {/* Customer Info */}
                <div>
                  <h3 className="text-white font-bold mb-3">Customer Information</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-white/50">Name</p>
                      <p className="text-white">{selectedOrder.shippingInfo?.firstName} {selectedOrder.shippingInfo?.lastName}</p>
                    </div>
                    <div>
                      <p className="text-white/50">Email</p>
                      <p className="text-white">{selectedOrder.shippingInfo?.email}</p>
                    </div>
                    <div>
                      <p className="text-white/50">Phone</p>
                      <p className="text-white">{selectedOrder.shippingInfo?.phone}</p>
                    </div>
                    <div>
                      <p className="text-white/50">Payment</p>
                      <p className="text-white">{selectedOrder.paymentMethod || 'Razorpay'}</p>
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div>
                  <h3 className="text-white font-bold mb-3">Shipping Address</h3>
                  <p className="text-white/70 text-sm">
                    {selectedOrder.shippingInfo?.address}<br />
                    {selectedOrder.shippingInfo?.city}, {selectedOrder.shippingInfo?.state} - {selectedOrder.shippingInfo?.pincode}
                  </p>
                </div>

                {/* Order Items */}
                <div>
                  <h3 className="text-white font-bold mb-3">Items</h3>
                  <div className="space-y-3">
                    {selectedOrder.items?.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-[#0a0a0f]">
                        <div className="flex items-center space-x-3">
                          <img
                            src={item.product?.image}
                            alt={item.product?.name}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <p className="text-white font-bold text-sm">{item.product?.name}</p>
                            <p className="text-white/50 text-xs">Size: {item.selectedSize} × {item.quantity}</p>
                          </div>
                        </div>
                        <p className="text-[#00ff9d] font-bold">
                          ₹{((item.product?.price || 0) * item.quantity).toLocaleString('en-IN')}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Summary */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-[#00ff9d]/10 to-[#00d9ff]/10 border border-white/10">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-white/70">
                      <span>Subtotal</span>
                      <span>₹{selectedOrder.subtotal?.toLocaleString('en-IN') || 0}</span>
                    </div>
                    <div className="flex justify-between text-white/70">
                      <span>Shipping</span>
                      <span>₹{selectedOrder.shippingCost?.toLocaleString('en-IN') || 0}</span>
                    </div>
                    <div className="flex justify-between text-white/70">
                      <span>Tax</span>
                      <span>₹{selectedOrder.tax?.toLocaleString('en-IN') || 0}</span>
                    </div>
                    <div className="flex justify-between text-white text-xl font-bold pt-2 border-t border-white/10">
                      <span>Total</span>
                      <span className="text-[#00ff9d]">₹{selectedOrder.grandTotal?.toLocaleString('en-IN') || 0}</span>
                    </div>
                  </div>
                </div>

                {/* Status Actions */}
                <div className="flex space-x-4">
                  {selectedOrder.status === 'confirmed' && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        handleStatusUpdate(selectedOrder.orderId, 'processing');
                        setSelectedOrder(null);
                      }}
                      disabled={updatingStatus === selectedOrder.orderId}
                      className="flex-1 py-3 bg-gradient-to-r from-[#00d9ff] to-[#00ff9d] text-black font-bold rounded-lg disabled:opacity-50"
                    >
                      Mark as Processing
                    </motion.button>
                  )}
                  {selectedOrder.status === 'processing' && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        handleStatusUpdate(selectedOrder.orderId, 'shipped');
                        setSelectedOrder(null);
                      }}
                      disabled={updatingStatus === selectedOrder.orderId}
                      className="flex-1 py-3 bg-gradient-to-r from-[#00ff9d] to-[#00d9ff] text-black font-bold rounded-lg disabled:opacity-50"
                    >
                      Mark as Shipped
                    </motion.button>
                  )}
                  {selectedOrder.status === 'shipped' && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        handleStatusUpdate(selectedOrder.orderId, 'delivered');
                        setSelectedOrder(null);
                      }}
                      disabled={updatingStatus === selectedOrder.orderId}
                      className="flex-1 py-3 bg-gradient-to-r from-green-400 to-green-600 text-black font-bold rounded-lg disabled:opacity-50"
                    >
                      Mark as Delivered
                    </motion.button>
                  )}
                  {selectedOrder.status !== 'cancelled' && selectedOrder.status !== 'delivered' && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        handleStatusUpdate(selectedOrder.orderId, 'cancelled');
                        setSelectedOrder(null);
                      }}
                      disabled={updatingStatus === selectedOrder.orderId}
                      className="py-3 px-6 bg-red-500/20 text-red-400 font-bold rounded-lg border border-red-500/30 disabled:opacity-50"
                    >
                      Cancel Order
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

