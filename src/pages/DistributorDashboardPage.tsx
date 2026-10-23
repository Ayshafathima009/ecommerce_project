import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  Building,
  FileSpreadsheet,
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  Truck,
  Phone,
  Calendar,
  Layers,
  Download
} from 'lucide-react';

export const DistributorDashboardPage: React.FC = () => {
  const { orders, products, addToast, t } = useStore();

  const [smtpStatus, setSmtpStatus] = useState<'configured_simulated' | 'testing' | 'ready'>('configured_simulated');
  const [selectedOrderEmail, setSelectedOrderEmail] = useState<string>('');
  const [emailStatusMessage, setEmailStatusMessage] = useState<string>('');

  // Bulk calculator state
  const [bulkUnits, setBulkUnits] = useState(10);
  const unitPrice = 10000;
  const discountRate = bulkUnits >= 50 ? 0.25 : bulkUnits >= 20 ? 0.20 : 0.15;
  const bulkTotal = bulkUnits * unitPrice * (1 - discountRate);

  const handleExportCSV = () => {
    const headers = [
      'Order ID',
      'Order Date',
      'Customer Name',
      'Customer Email',
      'Customer Phone',
      'Product Name',
      'Quantity',
      'Order Amount (INR)',
      'Payment Method',
      'Order Status'
    ];

    const rows = orders.map((o) => {
      const productNames = o.items.map((i) => `${i.productName} (x${i.quantity})`).join('; ');
      const totalQty = o.items.reduce((s, i) => s + i.quantity, 0);
      return [
        o.id,
        new Date(o.createdAt).toISOString().split('T')[0],
        `"${o.customer.fullName}"`,
        o.customer.email,
        o.customer.phone,
        `"${productNames}"`,
        totalQty,
        o.total,
        o.paymentMethod,
        o.status
      ];
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `SIEME_MERAI_Dispatch_Manifest_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast('Dispatch manifest exported successfully to CSV', 'success');
  };

  const handleTestNotification = (orderId: string, email: string) => {
    setSelectedOrderEmail(email);
    setEmailStatusMessage('Dispatch notification simulated via SIEME dealer SMTP relay.');
    addToast(`Dispatch notification queued for ${email}`, 'info');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8 bg-[#FAF9F6]">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E2DC] pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#B8860B] font-bold">
            <Building className="w-3.5 h-3.5" />
            <span>SIEME DRIVE FRANCHISE & DEALER NETWORK</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-display mt-1">
            Distributor Order Management
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Dispatch queue, customer contact records, and dealer bulk shipment allocations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="btn-gold-primary flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold shadow-md"
          >
            <Download className="w-4 h-4" />
            <span>{t.exportCsv}</span>
          </button>
        </div>
      </div>

      {/* SMTP & Dispatch Relay Banner */}
      <div className="p-4 rounded-xl pearl-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-white border border-[#D4AF37] flex items-center justify-center text-[#B8860B] shrink-0 shadow-sm">
            <Mail className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-stone-900">SMTP Notification Service Status</div>
            <div className="text-stone-500 text-[11px]">
              Configured via <code className="text-[#996515] font-semibold">server/services/email_service.py</code>. Dealer dispatch notifications are simulated in dev mode without spamming external inboxes.
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <span className="px-2.5 py-1 rounded-lg bg-white border border-[#E5E2DC] text-[11px] font-mono text-emerald-800 font-bold flex items-center gap-1.5 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Simulated SMTP Active</span>
          </span>
        </div>
      </div>

      {emailStatusMessage && (
        <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs flex items-center gap-2 font-medium">
          <CheckCircle2 className="w-4 h-4 text-[#B8860B]" />
          <span>{emailStatusMessage} (Recipient: {selectedOrderEmail})</span>
        </div>
      )}

      {/* Main Distributor Table View */}
      <div className="rounded-2xl pearl-card overflow-hidden shadow-md">
        <div className="p-5 border-b border-[#E5E2DC] bg-white flex items-center justify-between">
          <h2 className="text-base font-bold text-stone-900 font-display">
            Customer Shipments for Fitment & Dispatch ({orders.length})
          </h2>
          <span className="text-xs text-stone-500 font-medium">
            Real-time sync with Driver.MERAI e-commerce orders
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-700">
            <thead className="bg-[#FAF9F6] text-stone-600 font-bold border-b border-[#E5E2DC] uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-4">Order ID</th>
                <th className="py-3.5 px-4">Customer Name</th>
                <th className="py-3.5 px-4">Email & Phone</th>
                <th className="py-3.5 px-4">Product Name</th>
                <th className="py-3.5 px-4">Qty</th>
                <th className="py-3.5 px-4">Amount</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Notification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E2DC]">
              {orders.map((o) => (
                <tr key={o.id} className="hover:bg-white transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-stone-900">
                    {o.id}
                  </td>

                  <td className="py-3.5 px-4 font-bold text-stone-900">
                    {o.customer.fullName}
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="text-stone-800">{o.customer.email}</div>
                    <div className="text-[11px] text-stone-500 font-mono">{o.customer.phone}</div>
                  </td>

                  <td className="py-3.5 px-4">
                    {o.items.map((i, idx) => (
                      <div key={idx} className="truncate max-w-xs text-stone-800 font-medium">
                        {i.displayLabel || i.productName}
                      </div>
                    ))}
                  </td>

                  <td className="py-3.5 px-4 font-mono font-bold text-stone-900">
                    {o.items.reduce((s, i) => s + i.quantity, 0)}
                  </td>

                  <td className="py-3.5 px-4 font-bold text-stone-900 font-mono-tabular">
                    ₹{o.total.toLocaleString('en-IN')}
                  </td>

                  <td className="py-3.5 px-4 text-stone-500">
                    {new Date(o.createdAt).toLocaleDateString()}
                  </td>

                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${
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
                    <button
                      onClick={() => handleTestNotification(o.id, o.customer.email)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white hover:bg-amber-50 text-stone-700 hover:text-[#996515] text-[11px] font-bold border border-[#E5E2DC] hover:border-[#D4AF37] transition-colors shadow-sm"
                      title="Trigger Dispatch Update Email"
                    >
                      <Send className="w-3 h-3 text-[#B8860B]" />
                      <span>Email</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dealer Bulk Order Matrix & Margin Calculator */}
      <div className="p-6 sm:p-8 rounded-2xl pearl-card border border-[#E5E2DC] space-y-5 shadow-md">
        <div>
          <span className="text-xs font-bold text-[#B8860B] uppercase tracking-wider font-mono">
            B2B WHOLESALE ALLOCATION
          </span>
          <h3 className="text-lg font-bold text-stone-900 font-display mt-1">
            Driver.MERAI Dealer Bulk Pricing Matrix
          </h3>
          <p className="text-xs text-stone-500 mt-1">
            Direct consignment tiers for car accessory shops, automotive tuning garages, and fleet operators.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-white border border-[#E5E2DC] space-y-1 shadow-sm">
            <div className="text-stone-500">Tier 1: 10 – 19 Units</div>
            <div className="text-lg font-bold text-stone-900">15% Wholesale Discount</div>
            <div className="text-[#B8860B] font-mono font-bold">₹8,500 / unit (M.R.P. ₹14,999)</div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#E5E2DC] space-y-1 shadow-sm">
            <div className="text-stone-500">Tier 2: 20 – 49 Units</div>
            <div className="text-lg font-bold text-stone-900">20% Wholesale Discount</div>
            <div className="text-[#B8860B] font-mono font-bold">₹8,000 / unit (M.R.P. ₹14,999)</div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#E5E2DC] space-y-1 shadow-sm">
            <div className="text-stone-500">Tier 3: 50+ Units</div>
            <div className="text-lg font-bold text-stone-900">25% Master Dealer Discount</div>
            <div className="text-emerald-700 font-mono font-bold">₹7,500 / unit (M.R.P. ₹14,999)</div>
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-[#E5E2DC]">
          <div className="flex items-center gap-3 text-xs">
            <span className="text-stone-600 font-medium">Calculate Batch:</span>
            <input
              type="number"
              min={10}
              max={500}
              step={5}
              value={bulkUnits}
              onChange={(e) => setBulkUnits(Math.max(10, Number(e.target.value)))}
              className="w-20 px-2 py-1.5 rounded-lg bg-white border border-stone-300 text-stone-900 font-mono shadow-sm"
            />
            <span className="text-stone-600 font-medium">Units = Total Consignment:</span>
            <strong className="text-emerald-700 font-mono text-sm font-black">
              ₹{bulkTotal.toLocaleString('en-IN')}
            </strong>
          </div>

          <button
            onClick={() => addToast('Distributor inquiry draft saved. Consignment desk notified.', 'success')}
            className="btn-gold-primary px-4 py-2 rounded-xl text-xs font-bold shadow"
          >
            Submit Dealer PO Request
          </button>
        </div>
      </div>

    </div>
  );
};
