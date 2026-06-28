import { StaffAuthProvider } from "../Context/StaffAuthContext";

export default function StaffLayout({ children }) {
  return (
    <StaffAuthProvider>
      {children}
    </StaffAuthProvider>
  );
}