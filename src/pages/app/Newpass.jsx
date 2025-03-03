import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axiosInstance from "../../axiosConfig/instance";
import { toast, ToastContainer } from "react-toastify";
import { useTheme } from "../../ThemeProvider";

const NewPassword = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      localStorage.setItem("resetToken", token);
    }
  }, [token]);

  const storedToken = localStorage.getItem("resetToken");

  const validationSchema = Yup.object().shape({
    newPassword: Yup.string()
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        "يجب أن تحتوي كلمة السر على 8 أحرف على الأقل، حرف كبير، حرف صغير، ورقم."
      )
      .required("هذا الحقل مطلوب"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "كلمات المرور غير متطابقة.")
      .required("هذا الحقل مطلوب"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setLoading(true);
    setMessage("");
    const tokenToUse = token || localStorage.getItem("resetToken");

    try {
      const response = await axiosInstance.post(
        `users/reset/${tokenToUse}`,
        {
          password: values.newPassword,
          confirmPassword: values.confirmPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("تم إعادة تعيين كلمة السر بنجاح.");
      resetForm();
      navigate("/login", { replace: true });

      // setMessage(response.data.message || "تم إعادة تعيين كلمة السر بنجاح.");
      localStorage.removeItem("resetToken");
    } catch (error) {
      console.log(error);
      setMessage("خطأ في إعادة تعيين كلمة السر. يرجى المحاولة مرة أخرى.");
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };
  const { isDarkTheme } = useTheme();
  return (
    <div
      className={`flex items-center justify-center h-screen ${
        isDarkTheme ? "bg-gray-800" : "bg-gray-100"
      }`}
      style={{
        backgroundImage: "url('/images/screen back patt2-min.png')",
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
        <Formik
          initialValues={{ newPassword: "", confirmPassword: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label
                  className={`block text-right text-gray-700 mb-2 ${
                    isDarkTheme ? "text-white" : "text-primaryBG"
                  }`}
                  htmlFor="newPassword"
                >
                  كلمة السر الجديدة
                </label>
                <Field
                  type="password"
                  name="newPassword"
                  id="newPassword"
                  className="w-full p-3 border border-gray-300 rounded"
                />
                <ErrorMessage
                  name="newPassword"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="mb-4">
                <label
                  className={`block text-right text-gray-700 mb-2 ${
                    isDarkTheme ? "text-white" : "text-primaryBG"
                  }`}
                  htmlFor="confirmPassword"
                >
                  تأكيد كلمة السر
                </label>
                <Field
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  className="w-full p-3 border border-gray-300 rounded"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <button
                type="submit"
                className={`w-full p-3 text-white bg-gradient-to-r from-secondaryBG to-GreidentColor2 rounded hover:bg-primaryBG transition duration-200 ${
                  (loading || isSubmitting) && "opacity-50"
                }`}
                disabled={loading || isSubmitting}
              >
                {loading || isSubmitting
                  ? "جاري التحميل..."
                  : "إرسال كلمة السر الجديدة"}
              </button>
            </Form>
          )}
        </Formik>
        {message && <p className="mt-4 text-center text-gray-600">{message}</p>}
      </div>
      <ToastContainer />
    </div>
  );
};

export default NewPassword;
