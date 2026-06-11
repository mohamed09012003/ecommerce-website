import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import LogoutButton from "@/components/LogoutButton";
import { admins } from "@/lib/page-data";

export default function SettingsPage() {
  const adminColumns = ["Name", "Email", "Role", "Status", "Joined Date"];
  const adminData = admins.map(({ id, name, email, role, status, joinedDate }) => ({
    name,
    email,
    role,
    status,
    joinedDate,
  }));

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto flex min-h-screen max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 md:px-8">
        <PageHeader
          title="Settings"
          description="Manage store settings, preferences, and account information."
          buttonText="Save Changes"
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Store Information */}
          <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-sm shadow-slate-800/5 sm:p-7">
            <h2 className="text-lg font-semibold text-slate-950">Store Information</h2>
            <div className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-600">Store Name</label>
                <input
                  type="text"
                  defaultValue="My Awesome Store"
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-slate-950 placeholder-slate-400 focus:border-slate-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600">Email</label>
                <input
                  type="email"
                  defaultValue="admin@store.com"
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-slate-950 placeholder-slate-400 focus:border-slate-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600">Phone</label>
                <input
                  type="tel"
                  defaultValue="+1-555-0100"
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-slate-950 placeholder-slate-400 focus:border-slate-400 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Payment Settings */}
          <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-sm shadow-slate-800/5 sm:p-7">
            <h2 className="text-lg font-semibold text-slate-950">Payment Settings</h2>
            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3">
                <input type="checkbox" id="stripe" defaultChecked className="rounded" />
                <label htmlFor="stripe" className="text-sm text-slate-600">Stripe Enabled</label>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="paypal" defaultChecked className="rounded" />
                <label htmlFor="paypal" className="text-sm text-slate-600">PayPal Enabled</label>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="apple" className="rounded" />
                <label htmlFor="apple" className="text-sm text-slate-600">Apple Pay Enabled</label>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-sm shadow-slate-800/5 sm:p-7">
            <h2 className="text-lg font-semibold text-slate-950">Notifications</h2>
            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3">
                <input type="checkbox" id="neworder" defaultChecked className="rounded" />
                <label htmlFor="neworder" className="text-sm text-slate-600">Email on new orders</label>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="lowstock" defaultChecked className="rounded" />
                <label htmlFor="lowstock" className="text-sm text-slate-600">Alert on low stock</label>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="reviews" className="rounded" />
                <label htmlFor="reviews" className="text-sm text-slate-600">New customer reviews</label>
              </div>
            </div>
          </div>

          {/* Shipping Settings */}
          <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-sm shadow-slate-800/5 sm:p-7">
            <h2 className="text-lg font-semibold text-slate-950">Shipping</h2>
            <div className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-600">Default Carrier</label>
                <select className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-slate-950 focus:border-slate-400 focus:outline-none">
                  <option>FedEx</option>
                  <option>UPS</option>
                  <option>USPS</option>
                </select>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="trackingno" defaultChecked className="rounded" />
                <label htmlFor="trackingno" className="text-sm text-slate-600">Send tracking numbers</label>
              </div>
            </div>
          </div>
        </div>

        {/* Admins Management */}
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-slate-950">Admin Management</h2>
            <p className="mt-2 text-sm text-slate-600">Manage team members and their roles.</p>
          </div>
          <DataTable
            title="Administrators"
            description="All admin users with access to this store"
            columns={adminColumns}
            data={adminData}
            actions={true}
          />
        </div>

        {/* Account & Logout */}
        <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-sm shadow-slate-800/5 sm:p-7">
          <h2 className="text-lg font-semibold text-slate-950">Account</h2>
          <div className="mt-6 space-y-4">
            <div>
              <p className="text-sm text-slate-600">Logged in as: <span className="font-medium text-slate-950">admin@store.com</span></p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <LogoutButton />
            <button className="inline-flex h-12 items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-950 transition hover:border-slate-300 hover:bg-slate-50">
              Change Password
            </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
