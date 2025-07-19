import { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAdminStore } from "@/stores/adminStore";
import { UserCheck, UserX, Trash2 } from "lucide-react";

const AdminUsers = () => {
  const { users, fetchUsers, stats, updateUser, deleteUser } = useAdminStore();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  if (!users || !stats) return null;

  const userData = users.map((user) => {
    const userOrders = stats.totalOrders.filter(
      (order: any) => order.user._id === user.id
    );
    const totalOrders = userOrders.length;
    const totalSpent = userOrders.reduce(
      (sum: number, order: any) => sum + (order.total || 0),
      0
    );

    return {
      ...user,
      totalOrders,
      totalSpent,
    };
  });

  const getRoleColor = (role: string) =>
    role === "admin"
      ? "bg-purple-100 text-purple-800"
      : "bg-blue-100 text-blue-800";

  const getStatusColor = (isActive: boolean) =>
    isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";

  const handleToggleStatus = (user: any) => {
    updateUser(user.id, {
      role: user.role,
      isActive: !user.isActive,
    });
  };

  const handleDeleteUser = (userId: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteUser(userId);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Users</h3>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead>Orders</TableHead>
              <TableHead>Total Spent</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userData.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getRoleColor(user.role)}>
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(user.isActive)}>
                    {user.isActive ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(user.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>{user.totalOrders}</TableCell>
                <TableCell>${user.totalSpent.toFixed(2)}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    {user.role !== "admin" && (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleToggleStatus(user)}
                        >
                          {user.isActive ? (
                            <UserX className="h-4 w-4" />
                          ) : (
                            <UserCheck className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-6 p-4 bg-amber-50 rounded-lg">
        <h4 className="font-semibold text-amber-900 mb-2">User Statistics</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-2xl font-bold text-amber-800">{users.length}</p>
            <p className="text-sm text-amber-600">Total Users</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-amber-800">
              {users.filter((u) => u.isActive).length}
            </p>
            <p className="text-sm text-amber-600">Active Users</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-amber-800">
              {users.filter((u) => u.role === "admin").length}
            </p>
            <p className="text-sm text-amber-600">Admins</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-amber-800">
              {userData.reduce((sum, user) => sum + user.totalOrders, 0)}
            </p>
            <p className="text-sm text-amber-600">Total Orders</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
