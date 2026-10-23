import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { IMAGES } from '../assets/images';
import { Product, OrderFulfillmentStatus } from '../types';
import {
  Package,
  DollarSign,
  Users,
  ShoppingCart,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Edit2,
  Save,
  Plus,
  RefreshCw,
  Lock,
  Eye,
  ShieldAlert
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const {
    products,
    orders,
    currentUser,
    login,
    updateProductStock,
    updateProductPrice,
    toggleProductStatus,
    updateOrderStatus,
    addToast,
    t
  } = useStore();

  const [adminEmail, setAdminEmail] = useState('admin@sieme.in');
  const [adminPassword, setAdminPassword] = useState('');
  const [editingStockId, setEditingStockId] = useState<string | null>(null);
  const [tempStockValue, setTempStockValue] = useState<number>(0);
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [tempPriceValue, setTempPriceValue] = useState<number>(0);

  const isAdmin = currentUser?.role === 'admin';

  if (!isAdmin) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 space-y-6 bg-[#FAF9F6]">
        <div className="text-center space-y-3">
          <div className="h-20 w-auto p-1 mx-auto flex items-center justify-center">
            <img
              src={IMAGES.msLogo}
              alt="MERAI SIEME"
              className="h-16 w-auto max-w-[240px] object-contain drop-shadow-sm"
              referrerPolicy="no-referrer"
            />
          </div>
          <h1 className="text-2xl font-bold text-stone-900 font-display">
            Admin Authentication
          </h1>
          <p className="text-xs text-stone-500">
            Authorized SIEME operations personnel only. Restricted access.
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            login(adminEmail, adminPassword || 'Admin@2026', 'admin');
          }}
          className="p-6 rounded-2xl pearl-card space-y-4 text-xs shadow-md border border-[#E5E2DC]"
        >
          <div>
            <label className="block text-stone-600 mb-1 font-bold">Administrator Email</label>
            <input
              type="email"
              required
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#E5E2DC] focus:border-[#D4AF37] text-stone-900 focus:outline-none shadow-sm"
            />
          </div>

          <div>
            <label className="block text-stone-600 mb-1 font-bold">Password</label>
            <input
              type="password"
              required
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              placeholder="Enter secure master key"
              className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#E5E2DC] focus:border-[#D4AF37] text-stone-900 focus:outline-none font-mono shadow-sm"
            />
          </div>

          <button
            type="submit"
            className="btn-gold-primary w-full py-3.5 rounded-xl font-bold text-sm shadow-md"
          >
            Authenticate & Access Dashboard
          </button>

          <p className="text-[11px] text-stone-500 text-center pt-2">
            Tip: Click authenticate to access the admin portal with pre-configured developer credentials.
          </p>
        </form>
      </div>
    );
  }

  // Calculate KPIs
  const totalRevenue = orders.reduce((acc, o) => acc + o.total, 0);
  const totalUnitsOrdered = orders.reduce((acc, o) => acc + o.items.reduce((sum, item) => sum + item.quantity, 0), 0);
  const availableProducts = products.filter((p) => p.stock > 0 && p.status === 'available');
  const outOfStockProducts = products.filter((p) => p.stock === 0 || p.status === 'out_of_stock');

  const handleSaveStock = (productId: string) => {
    updateProductStock(productId, tempStockValue);
    setEditingStockId(null);
  };

  const handleSavePrice = (productId: string) => {
    updateProductPrice(productId, tempPriceValue);
    setEditingPriceId(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8 bg-[#FAF9F6]">
      
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E2DC] pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#996515] font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>OPERATIONAL · SECURE ADMIN PROTOCOL</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-display mt-1">
            SIEME DRIVE Admin Command Center
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Real-time inventory management, stock allocation, and order fulfillment.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-stone-700 bg-white border border-[#E5E2DC] px-3 py-1.5 rounded-lg shadow-sm">
            Signed in as: <strong className="text-stone-900">{currentUser?.email}</strong>
          </span>
        </div>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl pearl-card space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-stone-500 text-xs font-medium">
            <span>Total Gross Revenue</span>
            <DollarSign className="w-4 h-4 text-[#B8860B]" />
          </div>
          <div className="text-2xl font-black text-stone-900 font-mono-tabular">
            ₹{totalRevenue.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-emerald-700 font-bold">Across {orders.length} orders</div>
        </div>

        <div className="p-5 rounded-2xl pearl-card space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-stone-500 text-xs font-medium">
            <span>Total Customer Orders</span>
            <ShoppingCart className="w-4 h-4 text-[#B8860B]" />
          </div>
          <div className="text-2xl font-black text-stone-900 font-mono-tabular">
            {orders.length}
          </div>
          <div className="text-[11px] text-[#996515] font-bold">{totalUnitsOrdered} units purchased</div>
        </div>

        <div className="p-5 rounded-2xl pearl-card space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-stone-500 text-xs font-medium">
            <span>Available In-Stock SKUs</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-stone-900 font-mono-tabular">
            {availableProducts.length}
          </div>
          <div className="text-[11px] text-stone-500 font-medium">Ready for instant sale</div>
        </div>

        <div className="p-5 rounded-2xl pearl-card space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-stone-500 text-xs font-medium">
            <span>Out of Stock SKUs</span>
            <AlertTriangle className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-stone-900 font-mono-tabular">
            {outOfStockProducts.length}
          </div>
          <div className="text-[11px] text-amber-700 font-bold">Can be updated below</div>
        </div>
      </div>

      {/* Section 1: Product Inventory & Stock / Price Updater */}
      <div className="rounded-2xl pearl-card overflow-hidden shadow-md">
        <div className="p-5 border-b border-[#E5E2DC] bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-stone-900 font-display">
              Product Catalogue & Inventory Control
            </h2>
            <p className="text-xs text-stone-500">
              Update real-time stock counts and customer pricing. Safe stock concurrency protection enabled.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-700">
            <thead className="bg-[#FAF9F6] text-stone-600 font-bold border-b border-[#E5E2DC] uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-4">Product Details</th>
                <th className="py-3.5 px-4">Model Label</th>
                <th className="py-3.5 px-4">Price (₹)</th>
                <th className="py-3.5 px-4">Stock (Units)</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E2DC]">
              {products.map((prod) => (
                <tr key={prod.id} className="hover:bg-white transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={prod.images[0]}
                        alt=""
                        className="w-10 h-10 rounded-lg object-cover bg-white border border-[#E5E2DC] shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <strong className="text-stone-900 block">{prod.name}</strong>
                        <span className="text-[11px] text-stone-500">{prod.category}</span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 font-mono font-bold text-[#B8860B]">
                    {prod.displayLabel || '—'}
                  </td>

                  {/* Price edit */}
                  <td className="py-3.5 px-4">
                    {editingPriceId === prod.id ? (
                      <div className="flex items-center gap-1.5">
                        <input
                          type="number"
                          value={tempPriceValue}
                          onChange={(e) => setTempPriceValue(Number(e.target.value))}
                          className="w-24 px-2 py-1 rounded bg-white border border-[#D4AF37] text-stone-900 font-mono"
                        />
                        <button
                          onClick={() => handleSavePrice(prod.id)}
                          className="p-1 rounded btn-gold-primary text-stone-950"
                          title="Save Price"
                        >
                          <Save className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-stone-900 font-mono-tabular">
                          ₹{prod.price.toLocaleString('en-IN')}
                        </span>
                        <button
                          onClick={() => {
                            setEditingPriceId(prod.id);
                            setTempPriceValue(prod.price);
                          }}
                          className="text-stone-400 hover:text-[#B8860B] p-1"
                          title="Edit Price"
                        >
                          <Edit2 className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </td>

                  {/* Stock edit */}
                  <td className="py-3.5 px-4">
                    {editingStockId === prod.id ? (
                      <div className="flex items-center gap-1.5">
                        <input
                          type="number"
                          value={tempStockValue}
                          onChange={(e) => setTempStockValue(Number(e.target.value))}
                          className="w-20 px-2 py-1 rounded bg-white border border-[#D4AF37] text-stone-900 font-mono"
                        />
                        <button
                          onClick={() => handleSaveStock(prod.id)}
                          className="p-1 rounded btn-gold-primary text-stone-950"
                          title="Save Stock"
                        >
                          <Save className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className={`font-mono font-bold ${prod.stock > 0 ? 'text-emerald-700' : 'text-stone-400'}`}>
                          {prod.stock} units
                        </span>
                        <button
                          onClick={() => {
                            setEditingStockId(prod.id);
                            setTempStockValue(prod.stock);
                          }}
                          className="text-stone-400 hover:text-[#B8860B] p-1"
                          title="Edit Stock"
                        >
                          <Edit2 className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </td>

                  {/* Status Toggle */}
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-bold uppercase border ${
                        prod.status === 'available' && prod.stock > 0
                          ? 'bg-emerald-100 border-emerald-300 text-emerald-800'
                          : 'bg-stone-100 border-stone-300 text-stone-500'
                      }`}
                    >
                      {prod.status === 'available' && prod.stock > 0 ? 'Available' : 'Out of Stock'}
                    </span>
                  </td>

                  {/* Quick Toggle Actions */}
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {prod.stock === 0 ? (
                        <button
                          onClick={() => updateProductStock(prod.id, 50)}
                          className="btn-gold-primary px-2.5 py-1 rounded-md text-[11px] font-bold"
                        >
                          +50 Stock (Restock)
                        </button>
                      ) : (
                        <button
                          onClick={() => updateProductStock(prod.id, 0)}
                          className="px-2.5 py-1 rounded-md bg-stone-100 hover:bg-rose-50 hover:text-rose-700 text-stone-600 text-[11px] border border-stone-300 font-semibold"
                        >
                          Zero Stock
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Section 2: Order Management & Status Updater */}
      <div className="rounded-2xl pearl-card overflow-hidden shadow-md">
        <div className="p-5 border-b border-[#E5E2DC] bg-white">
          <h2 className="text-base font-bold text-stone-900 font-display">
            Live Customer Orders & Dispatch Fulfillment
          </h2>
          <p className="text-xs text-stone-500">
            Update shipment tracking states to notify customers in real-time.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-700">
            <thead className="bg-[#FAF9F6] text-stone-600 font-bold border-b border-[#E5E2DC] uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-4">Order ID & Date</th>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Items Ordered</th>
                <th className="py-3.5 px-4">Amount</th>
                <th className="py-3.5 px-4">Payment</th>
                <th className="py-3.5 px-4">Current Status</th>
                <th className="py-3.5 px-4 text-right">Update Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E2DC]">
              {orders.map((o) => (
                <tr key={o.id} className="hover:bg-white transition-colors">
                  <td className="py-3.5 px-4">
                    <strong className="text-stone-900 font-mono block">{o.id}</strong>
                    <span className="text-[11px] text-stone-500">
                      {new Date(o.createdAt).toLocaleDateString()}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-bold text-stone-900">{o.customer.fullName}</div>
                    <div className="text-[11px] text-stone-500">{o.customer.phone}</div>
                    <div className="text-[11px] text-stone-400">{o.customer.city}, {o.customer.state}</div>
                  </td>

                  <td className="py-3.5 px-4">
                    {o.items.map((item, idx) => (
                      <div key={idx} className="text-[11px]">
                        <strong>{item.quantity}x</strong> {item.displayLabel || item.productName}
                      </div>
                    ))}
                  </td>

                  <td className="py-3.5 px-4 font-bold text-stone-900 font-mono-tabular">
                    ₹{o.total.toLocaleString('en-IN')}
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="uppercase text-[11px] text-stone-800 font-bold">
                      {o.paymentMethod}
                    </span>
                    <div className="text-[10px] text-emerald-700 font-mono font-semibold">
                      {o.paymentStatus}
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-bold uppercase border ${
                        o.status === 'delivered'
                          ? 'bg-emerald-100 border-emerald-300 text-emerald-800'
                          : o.status === 'shipped'
                          ? 'bg-blue-100 border-blue-300 text-blue-800'
                          : 'bg-amber-100 border-amber-300 text-amber-800'
                      }`}
                    >
                      {o.status}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <select
                      value={o.status}
                      onChange={(e) => updateOrderStatus(o.id, e.target.value as OrderFulfillmentStatus)}
                      className="px-2.5 py-1.5 rounded-lg bg-white border border-stone-300 text-stone-800 text-xs font-semibold focus:outline-none focus:border-[#D4AF37] shadow-sm"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
