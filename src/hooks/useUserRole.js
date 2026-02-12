import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUserRole = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [role, setRole] = useState(null);
  const [roleLoading, setRoleLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/users/${user.email}/role`)
        .then((res) => {
          setRole(res.data.role);
          setRoleLoading(false);
        })
        .catch(() => {
          setRole(null);
          setRoleLoading(false);
        });
    } else {
      setRole(null);
      setRoleLoading(false);
    }
  }, [user, axiosSecure]);

  return { role, roleLoading };
};

export default useUserRole;
