export type AppRole = "super_admin" | "admin" | "editor";

export function hasPermission(role: AppRole, action: "manage_users" | "manage_content" | "view_analytics") {
  if (role === "super_admin") return true;
  if (role === "admin") return action !== "manage_users";
  if (role === "editor") return action === "manage_content";
  return false;
}
