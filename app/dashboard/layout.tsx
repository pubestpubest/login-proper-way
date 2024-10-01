import { UserProvider } from "./userContext";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
      <main>{children}</main>
    </UserProvider>
  );
}
