import React, { useState, useEffect } from "react";
import axiosInstance from "../../axiosConfig/instance";
import { useTheme } from "../../ThemeProvider";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let countdown;
    if (isDisabled && timer > 0) {
      countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0 && isDisabled) {
      setIsDisabled(false);
    }
    return () => clearInterval(countdown);
  }, [isDisabled, timer]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axiosInstance.post("/users/forget", { email });
      setMessage(
        response.data.message ||
          "تحقق من بريدك الإلكتروني للحصول على رابط إعادة التعيين."
      );
      setIsDisabled(true);
      setTimer(120); // 2 minutes countdown
    } catch (error) {
      console.log(error);

      if (error.response && error.response.status === 404) {
        if (error.response.data.message === "Email not found") {
          toast.error("البريد الإلكتروني غير موجود، يرجى إدخال بريد صالح", {
            position: "top-center",
          });
        } else {
          toast.error("حدث خطأ أثناء إرسال البريد الإلكتروني، حاول مرة أخرى", {
            position: "top-center",
          });
        }
      } else {
        toast.error("حدث خطأ غير متوقع، يرجى المحاولة لاحقًا", {
          position: "top-center",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const { isDarkTheme } = useTheme();

  return (
    <div
      className={`flex items-center justify-center h-screen ${
        isDarkTheme ? "bg-gray-800" : "bg-gray-100"
      }`}
      style={{
        backgroundImage: "url('/images/patt2min.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className={`p-8 rounded shadow-md w-96 ${
          isDarkTheme ? "bg-gray-700" : "bg-gray-100"
        }`}
      >
        <h2
          className={`text-2xl font-bold mb-6 text-center ${
            isDarkTheme ? "text-secondaryBG" : "text-primaryBG"
          }`}
        >
          إعادة تعيين كلمة السر
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className={`block text-right text-gray-700 mb-2 ${
                isDarkTheme ? "text-white" : "text-primaryBG"
              }`}
              htmlFor="email"
            >
              البريد الإلكتروني
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded"
            />
          </div>
          <button
            type="submit"
            className={`w-full p-3 text-white bg-gradient-to-r from-secondaryBG to-GreidentColor2 rounded transition duration-200 ${
              (loading || isDisabled) && "opacity-50"
            }`}
            disabled={loading || isDisabled}
          >
            {loading
              ? "جاري التحميل..."
              : isDisabled
              ? `انتظر ${timer} ثانية`
              : "إرسال لينك التأكيد"}
          </button>
        </form>
        {message && (
          <p className="mt-4 text-center text-green-600">{message}</p>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default ForgotPassword;
