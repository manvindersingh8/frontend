import Sidebar from "./Sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1">{children}</div>

      {/* Right Panel (optional) */}
      <div className="hidden lg:block w-72 border-l p-4">
        <h2 className="font-semibold mb-4">🔥 Trending Jobs</h2>
        <p className="text-sm text-muted-foreground">Coming soon...</p>
      </div>
    </div>
  );
};

export default DashboardLayout;
