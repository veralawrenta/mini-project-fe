'use client'
import { Button } from "@/components/ui/button";
import { axiosInstance } from "@/lib/axios";
import { Edit3, Loader2, UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface User {
  id: number;
  email: string;
  name: string;
  referralCode: string;
}

const Introduction = () => {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDataUser = async () => {
        try {
            const response = await axiosInstance.get("users")//cek javier
            const { data } = response.data;
            setUser(data)
        } catch (error) {
            console.log ("error fetching data", error)
            setError("Failed to load user profile. Please try refreshing.");
        } finally {
            setLoading(false)
        }
    };
    fetchDataUser();
  }, [])

  return (
<div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      {loading && (
        <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl shadow-lg">
          <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
          <p className="mt-4 text-xl text-gray-600">Loading profile data...</p>
        </div>
      )}

      {!loading && error && (
        <div className="p-8 bg-red-50 border border-red-300 rounded-xl shadow-lg text-center">
          <p className="text-xl text-red-700 font-semibold">{error}</p>
        </div>
      )}

      {!loading && !error && user && (
        <div className="bg-white shadow-2xl rounded-xl overflow-hidden border border-gray-100">
          
          {/* Header and Actions */}
          <div className="p-6 sm:p-8 bg-gray-50 flex justify-between items-center border-b border-gray-200">
            <div className="flex items-center space-x-4">
              <UserIcon className="w-8 h-8 text-indigo-600" />
              <div>
                <h3 className="text-2xl font-extrabold text-gray-900">
                  Seller Profile
                </h3>
                <p className="text-sm text-gray-500">
                  Manage your personal and contact information.
                </p>
              </div>
            </div>
            <Button 
              variant="outline" 
              className="flex items-center space-x-2 text-indigo-600 border-indigo-200 hover:bg-indigo-50"
              onClick={() => router.push('/seller/edit-profile')} 
            >
              <Edit3 className="w-4 h-4" />
              <span>Edit Profile</span>
            </Button>
          </div>

          <div className="p-6 sm:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
              <div className="sm:col-span-1">
                <div className="text-sm font-medium text-gray-500">Full Name</div>
                <div className="mt-1 text-lg font-semibold text-gray-900">
                  {user.name} 
                </div>
              </div>
 
              <div className="sm:col-span-1">
                <div className="text-sm font-medium ">Email Address</div>
                <div className="mt-1 text-lg font-semibold ">
                  {user.email}
                </div>
              </div>
            </div>
          </div>
          <div className="px-6 py-5 sm:px-8 border-t">
              <h4 className="text-base font-semibold text-indigo-800 mb-2">
                  Share Your Referral Code
              </h4>
              <div className="flex items-center space-x-3">
                  <input
                      id="refcode"
                      type="text"
                      readOnly
                      value={user.referralCode || 'N/A'}
                      className="grow p-3 text-lg font-mono tracking-wider rounded-lg shadow-inner focus:ring-2 outline-none"
                  />
              </div>
              <p className="mt-2 text-sm text-indigo-600">
                  Invite friends and earn points when they sign up!
              </p>
          </div>
        </div>
      )}
    </div>
  );
}
export default Introduction;