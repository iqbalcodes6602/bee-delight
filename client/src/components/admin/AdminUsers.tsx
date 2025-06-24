
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useOrderStore } from "@/stores/orderStore";
import { UserCheck, UserX } from "lucide-react";

const AdminUsers = () => {
  const orders = useOrderStore((state) => state.orders);
  
  // Mock users data based on orders
  const users = [
    {
      id: '1',
      name: 'Admin User',
      email: 'admin@goldenhive.com',
      role: 'admin',
      status: 'active',
      joinDate: '2024-01-01',
      totalOrders: 0,
      totalSpent: 0
    },
    {
      id: '2',
      name: 'John Doe',
      email: 'user@example.com',
      role: 'user',
      status: 'active',
      joinDate: '2024-05-15',
      totalOrders: orders.filter(order => order.userId === '2').length,
      totalSpent: orders.filter(order => order.userId === '2').reduce((sum, order) => sum + order.total, 0)
    }
  ];

  const handleStatusToggle = (userId: string) => {
    console.log(`Toggle status for user ${userId}`);
    // In a real app, this would call an API
  };

  const getRoleColor = (role: string) => {
    return role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800';
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Users</h3>
      </div>

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
            {users.map((user) => (
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
                  <Badge className={getStatusColor(user.status)}>
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(user.joinDate).toLocaleDateString()}
                </TableCell>
                <TableCell>{user.totalOrders}</TableCell>
                <TableCell>${user.totalSpent.toFixed(2)}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    {user.role !== 'admin' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleStatusToggle(user.id)}
                      >
                        {user.status === 'active' ? (
                          <UserX className="h-4 w-4" />
                        ) : (
                          <UserCheck className="h-4 w-4" />
                        )}
                      </Button>
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
            <p className="text-2xl font-bold text-amber-800">{users.filter(u => u.status === 'active').length}</p>
            <p className="text-sm text-amber-600">Active Users</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-amber-800">{users.filter(u => u.role === 'admin').length}</p>
            <p className="text-sm text-amber-600">Admins</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-amber-800">
              {users.reduce((sum, user) => sum + user.totalOrders, 0)}
            </p>
            <p className="text-sm text-amber-600">Total Orders</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
