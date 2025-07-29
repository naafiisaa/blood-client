import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: userRole, isLoading: isRoleLoading } = useQuery({
    queryKey: [user?.email, 'userRole'],
    queryFn: async () => {
      if (user && user.email) {
        const res = await axiosSecure.get(`/users/role/${user.email}`);
        return res.data?.role;
      }
      return null;
    },
    enabled: !!user?.email, // Only run the query if the user is logged in
  });

  return [userRole, isRoleLoading];
};

export default useRole;
