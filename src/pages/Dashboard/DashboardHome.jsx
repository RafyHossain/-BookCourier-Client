import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useUserRole from "../../hooks/useUserRole";
import useAuth from "../../hooks/useAuth";
import { motion } from "framer-motion";

const DashboardHome = () => {
  const { role, roleLoading } = useUserRole();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [stats, setStats] = useState({});
  const [chartData, setChartData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    if (roleLoading || !role) return;

    const fetchData = async () => {
      try {

        setLoading(true);

        // ================= USER =================
        if (role === "user") {

          const { data: orders } =
            await axiosSecure.get("/orders/my-orders");

          console.log("User Orders:", orders);

          setStats({
            "Total Orders": orders?.length || 0
          });

          const monthly = {};

          orders?.forEach(order => {
            if (!order.createdAt) return;

            const month = new Date(order.createdAt)
              .toLocaleString("default", { month: "short" });

            monthly[month] = (monthly[month] || 0) + 1;
          });

          setChartData(
            Object.entries(monthly).map(([month, value]) => ({
              month,
              value
            }))
          );
        }

        // ================= LIBRARIAN =================
        if (role === "librarian") {

          const { data: books } =
            await axiosSecure.get("/books/my-books");

          const { data: orders } =
            await axiosSecure.get("/orders/librarian-orders");

          console.log("Librarian Books:", books);
          console.log("Librarian Orders:", orders);

          setStats({
            "Total Books": books?.length || 0,
            "Total Orders": orders?.length || 0
          });

          const statusCount = {};

          orders?.forEach(order => {
            statusCount[order.status] =
              (statusCount[order.status] || 0) + 1;
          });

          setPieData(
            Object.entries(statusCount).map(([name, value]) => ({
              name,
              value
            }))
          );
        }

        // ================= ADMIN =================
        if (role === "admin") {

          const { data: users } =
            await axiosSecure.get("/users");

          const { data: books } =
            await axiosSecure.get("/books/admin");

          console.log("Admin Users:", users);
          console.log("Admin Books:", books);

          setStats({
            "Total Users": users?.length || 0,
            "Total Books": books?.length || 0
          });

          const roleCount = {};

          users?.forEach(user => {
            const r = user.role || "user";
            roleCount[r] = (roleCount[r] || 0) + 1;
          });

          setPieData(
            Object.entries(roleCount).map(([name, value]) => ({
              name,
              value
            }))
          );
        }

      } catch (error) {
        console.log("Dashboard Error:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

  }, [role, roleLoading, axiosSecure]);

  if (loading) {
    return (
      <div className="text-center py-20 font-semibold">
        Loading Dashboard...
      </div>
    );
  }

  const COLORS = ["#16a34a", "#f59e0b", "#dc2626", "#2563eb"];

  return (
    <div className="space-y-10">

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-slate-800 to-slate-900 text-white p-6 rounded-2xl shadow-lg"
      >
        <h2 className="text-2xl font-bold">
          Welcome, {user?.displayName}
        </h2>
        <p className="capitalize text-slate-300">
          {role} Dashboard Overview
        </p>
      </motion.div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(stats).map(([key, value], index) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-2xl shadow-md"
          >
            <h3 className="text-gray-500 text-sm">
              {key}
            </h3>
            <p className="text-3xl font-bold text-red-600 mt-2">
              {value}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Bar Chart */}
      {chartData.length > 0 && (
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#dc2626" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Pie Chart */}
      {pieData.length > 0 && (
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie data={pieData} dataKey="value" outerRadius={120} label>
                {pieData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

    </div>
  );
};

export default DashboardHome;
