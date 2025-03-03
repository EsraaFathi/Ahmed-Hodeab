// import React from "react";
// import Registerform from "../../components/auth/Registerform";
// import { useTheme } from "../../ThemeProvider";

// const Register = () => {
//   const { isDarkTheme } = useTheme();

//   return (
//     <main
//       className={`min-h-screen  justify-center flex flex-col lg:flex-row ${
//         // className={`min-h-screen flex flex-col md:flex-row ${
//         isDarkTheme ? "bg-gray-900" : "bg-gray-100"
//       }`}
//     >
//       {/* Left side - Image (hidden on mobile) */}
//       {/* <div className="group rounded-lg h-[169px] w-[300px] overflow-hidden aspect-w-16 aspect-h-9"> */}

//       <div className="bg-primaryBG  pt-20 hidden  lg:block lg:w-1/2 lg:h-screen relative overflow-hidden  ">
//         {/* <div className="bg-primaryBG hidden   md:block md:w-1/2 relative overflow-hidden md:h-screen"> */}
//         <img
//           src="/images/مستني ايه_1 (1).png"
//           alt="Login"
//           className="pt-20 w-full h-full object-cover"
//         />
//       </div>

//       {/* Right side - Register Form */}
//       {/* <div
//         className={`w-full lg:w-1/2  ${
//           isDarkTheme ? "bg-gray-800" : "bg-white"
//         } min-h-screen md:h-screen   overflow-y-auto flex justify-center items-center p-4 md:p-12`}
//       >
//         <Registerform />
//       </div> */}

//       <div
//         className={`w-full lg:w-1/2 ${
//           isDarkTheme ? "bg-gray-800" : "bg-white"
//         } min-h-screen  md:h-screen  overflow-y-auto  flex justify-center items-center p-4 md:p-12 `}
//       >
//         <Registerform />
//       </div>
//     </main>
//   );
// };

// export default Register;
import React from "react";
import RegisterForm from "../../components/auth/Registerform";
import { useTheme } from "../../ThemeProvider";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import userAPI from "../../../hooks/api";

const Register = () => {
  const { isDarkTheme } = useTheme();
  const navigate = useNavigate();

  const initialValues = {
    fullName: "",
    phoneNumber: "",
    classGrade: "", // You can set this based on the grade from your data
    educationType: "",
    governorate: "", // تأكد من إضافة السطر ده
    city: "",

    school: "",
    attendanceStatus: "",
    guardian: {
      name: "",
      relation: "",
      mobileNumber: "",
    },
  };
  const phoneRegExp = /^(010|011|012|015)\d{8}$/;

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("يرجى إدخال الاسم بالكامل"),
    phoneNumber: Yup.string()
      .matches(phoneRegExp, "يجب إدخال رقم هاتف مصري صحيح")
      .required("يرجى إدخال رقم الهاتف"),
    classGrade: Yup.string().required("يرجى اختيار المرحلة"),
    educationType: Yup.string().required("يرجى اختيار نوع التعليم"),
    governorate: Yup.string().required("يرجى اختيار المحافظة"),
    city: Yup.string().required("يرجى اختيار المركز أو المدينة"),

    school: Yup.string().required("يرجى إدخال اسم المدرسة/المعهد"),
    attendanceStatus: Yup.string().required("يرجى اختيار حالة الحضور"),
    email: Yup.string()
      .email("البريد الإلكتروني غير صالح")
      .required("يرجى إدخال البريد الإلكتروني"),
    password: Yup.string()
      .min(6, "كلمة السر يجب أن تحتوي على 6 أحرف على الأقل")
      .required("يرجى إدخال كلمة السر"),
    guardian: Yup.object({
      name: Yup.string().required("يرجى إدخال اسم ولي الأمر"),
      relation: Yup.string().required("يرجى إدخال صلة القرابة"),
      mobileNumber: Yup.string().required("يجب إدخال رقم هاتف مصري صحيح"),
    }),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    // console.log("values", values);
    setSubmitting(true);
    // resetForm();
    try {
      const response = await userAPI.signup(values);
      if (response && response.success) {
        toast.success("تم تسجيل حسابك بنجاح!");
        resetForm();
        navigate("/login");
      } else {
        throw new Error(response?.message || "حدث خطأ أثناء التسجيل");
      }
    } catch (error) {
      toast.error("حدث خطأ: " + error.message);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <main
      className={`min-h-screen justify-center flex flex-col lg:flex-row ${
        isDarkTheme ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      {/* Left side - Image */}
      <div className="bg-primaryBG pt-20 hidden lg:block lg:w-1/2 lg:h-screen relative overflow-hidden">
        <img
          src="/images/مستني ايه_1 (1).png"
          alt="Login"
          className="pt-20 w-full h-full object-cover"
        />
      </div>

      {/* Right side - Register Form */}
      <div
        className={`w-full lg:w-1/2 ${
          isDarkTheme ? "bg-gray-800" : "bg-white"
        } min-h-screen md:h-screen overflow-y-auto flex justify-center items-center p-4 md:p-12`}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, handleBlur, setFieldValue }) => (
            <Form className={`${isDarkTheme ? "bg-gray-800" : "bg-white"}`}>
              <RegisterForm
                values={values}
                handleChange={handleChange}
                handleBlur={handleBlur}
                setFieldValue={setFieldValue}
              />

              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full  bg-gradient-to-r from-primaryBG to-secondaryBG text-white font-bold py-2 px-4 rounded-md hover:opacity-90 transition duration-300 transform hover:scale-105 shadow-md"
                  // disabled={isSubmitting}
                >
                  انشاء الحساب
                </button>
              </div>

              <div
                className={`mt-4 text-center ${
                  isDarkTheme ? "text-gray-300" : "text-gray-600"
                } text-sm`}
              >
                هل لديك حساب بالفعل؟{" "}
                <Link
                  to="/login"
                  className={`${
                    isDarkTheme ? "text-secondaryBG" : "text-primaryBG"
                  } hover:text-secondaryBG font-semibold transition duration-300`}
                >
                  تسجيل الدخول
                </Link>
              </div>
            </Form>
          )}
        </Formik>
        <ToastContainer />
      </div>
    </main>
  );
};

export default Register;
