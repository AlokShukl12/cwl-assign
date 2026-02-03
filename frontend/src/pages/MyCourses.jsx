import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";
import { toast } from "react-toastify";

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyCourses();
  }, []);

  const fetchMyCourses = async () => {
    try {
      const response = await api.get("/my-courses");
      setCourses(response.data);
    } catch (error) {
      toast.error("Failed to fetch your courses");
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading your courses...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Courses</h1>
        {courses.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">You haven't subscribed to any courses yet.</p>
            <Link
              to="/"
              className="text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Browse available courses →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((subscription) => (
              <div
                key={subscription.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                {subscription.image && (
                  <img
                    src={subscription.image}
                    alt={subscription.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    {subscription.title}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {subscription.description}
                  </p>
                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">Price Paid:</span>
                      <span className="font-semibold text-indigo-600">
                        {subscription.pricePaid === 0 ? (
                          <span className="text-green-600">Free</span>
                        ) : (
                          `₹${subscription.pricePaid.toFixed(2)}`
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm mt-2">
                      <span className="text-gray-500">Subscribed:</span>
                      <span className="text-gray-700">
                        {new Date(subscription.subscribedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCourses;
