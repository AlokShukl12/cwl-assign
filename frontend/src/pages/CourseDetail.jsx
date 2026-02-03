import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";
import { toast } from "react-toastify";

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [promoCode, setPromoCode] = useState("");
  const [promoValid, setPromoValid] = useState(false);
  const [subscribing, setSubscribing] = useState(false);
  const [discountedPrice, setDiscountedPrice] = useState(null);

  useEffect(() => {
    fetchCourse();
  }, [id]);

  const fetchCourse = async () => {
    try {
      const response = await api.get(`/courses/${id}`);
      setCourse(response.data);
    } catch (error) {
      toast.error("Failed to fetch course details");
      console.error("Error fetching course:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePromoApply = () => {
    if (promoCode.trim() === "") {
      toast.error("Please enter a promo code");
      return;
    }

    if (promoCode === "BFSALE25") {
      setPromoValid(true);
      const discount = course.price * 0.5;
      setDiscountedPrice(course.price - discount);
      toast.success("Promo code applied! 50% discount applied.");
    } else {
      setPromoValid(false);
      setDiscountedPrice(null);
      toast.error("Invalid promo code");
    }
  };

  const handleSubscribe = async () => {
    if (course.price === 0) {
      // Free course - subscribe directly
      await subscribeToCourse();
    } else {
      // Paid course - check promo
      if (!promoValid) {
        toast.error("Please apply a valid promo code first");
        return;
      }
      await subscribeToCourse();
    }
  };

  const subscribeToCourse = async () => {
    setSubscribing(true);
    try {
      const payload = {
        courseId: id,
      };

      if (course.price > 0) {
        payload.promoCode = promoCode;
      }

      await api.post("/subscribe", payload);
      toast.success("Successfully subscribed to course!");
      navigate("/my-courses");
    } catch (error) {
      toast.error(
        error.response?.data?.error || "Failed to subscribe to course"
      );
    } finally {
      setSubscribing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading course details...</div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-red-600">Course not found</div>
      </div>
    );
  }

  const isFree = course.price === 0;
  const finalPrice = isFree ? 0 : discountedPrice || course.price;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-indigo-600 hover:text-indigo-800"
        >
          ← Back to Courses
        </button>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {course.image && (
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-64 md:h-96 object-cover"
            />
          )}
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {course.title}
            </h1>
            <p className="text-gray-600 mb-6 text-lg">{course.description}</p>

            <div className="border-t pt-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Price</p>
                  {isFree ? (
                    <p className="text-3xl font-bold text-green-600">Free</p>
                  ) : (
                    <div>
                      {discountedPrice && (
                        <p className="text-lg text-gray-400 line-through">
                          ₹{course.price.toFixed(2)}
                        </p>
                      )}
                      <p className="text-3xl font-bold text-indigo-600">
                        ₹{finalPrice.toFixed(2)}
                      </p>
                      {promoValid && (
                        <p className="text-sm text-green-600 mt-1">
                          50% discount applied
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {!isFree && (
                <div className="mb-6">
                  <label
                    htmlFor="promoCode"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Promo Code
                  </label>
                  <div className="flex gap-2">
                    <input
                      id="promoCode"
                      type="text"
                      value={promoCode}
                      onChange={(e) => {
                        setPromoCode(e.target.value);
                        setPromoValid(false);
                        setDiscountedPrice(null);
                      }}
                      placeholder="Enter promo code"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                      onClick={handlePromoApply}
                      disabled={promoValid}
                      className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {promoValid ? "Applied" : "Apply"}
                    </button>
                  </div>
                  {promoValid && (
                    <p className="mt-2 text-sm text-green-600">
                      ✓ Promo code applied successfully
                    </p>
                  )}
                </div>
              )}

              <button
                onClick={handleSubscribe}
                disabled={
                  subscribing || (!isFree && !promoValid) || (isFree && false)
                }
                className="w-full py-3 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-lg"
              >
                {subscribing
                  ? "Subscribing..."
                  : isFree
                    ? "Subscribe (Free)"
                    : "Subscribe"}
              </button>

              {!isFree && !promoValid && (
                <p className="mt-2 text-sm text-gray-500 text-center">
                  Please apply a valid promo code to subscribe
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
