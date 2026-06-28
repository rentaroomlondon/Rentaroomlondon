import { AdminAuthProvider } from "../Context/AdminAuthContext";

export default function AdminLayout({ children }) {
  return (
    <AdminAuthProvider>
      {children}
    </AdminAuthProvider>
  );
}