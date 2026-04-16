import { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "admin" | "student" | "faculty";

interface RoleContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  userName: string;
}

const roleNames: Record<UserRole, string> = {
  admin: "Admin User",
  student: "John Doe",
  faculty: "Dr. Kumar",
};

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<UserRole>("student");
  return (
    <RoleContext.Provider value={{ role, setRole, userName: roleNames[role] }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const ctx = useContext(RoleContext);
  if (!ctx) throw new Error("useRole must be used within RoleProvider");
  return ctx;
}
