/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";
import InputField from "./InputField";
import {
  FaUser,
  FaPhone,
  FaSchool,
  FaEnvelope,
  FaLock,
  FaMapMarkerAlt,
  FaGraduationCap,
} from "react-icons/fa";
import { useTheme } from "../../ThemeProvider";
// import { State, City } from "country-state-city";
import { Field, ErrorMessage } from "formik";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

const RegisterForm = ({ values, handleChange, handleBlur, setFieldValue }) => {
  const { isDarkTheme } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  // const [states, setStates] = useState([]);
  // const [cities, setCities] = useState([]);
  // useEffect(() => {
  //   // Load Egypt's states
  //   const egyptStates = State.getStatesOfCountry("EG");
  //   // console.log(egyptStates);
  //   // console.log(values);

  //   setStates(egyptStates);
  // }, []);

  // useEffect(() => {
  //   if (values.governorate) {
  //     const selectedState = states.find(
  //       (state) => state.isoCode === values.governorate
  //     );
  //     if (selectedState) {
  //       const citiesOfState = City.getCitiesOfState(
  //         "EG",
  //         selectedState.isoCode
  //       );
  //       setCities(citiesOfState);
  //     }
  //   } else {
  //     setCities([]);
  //   }
  // }, [values.governorate, states]);
  const egyptGovernorates = {
    القاهرة: [
      "15 مايو",
      "الازبكية",
      "البساتين",
      "التبين",
      "الخليفة",
      "الدراسة",
      "الدرب الأحمر",
      "الزاوية الحمراء",
      "الزيتون",
      "الساحل",
      "السلام",
      "السيدة زينب",
      "الشرابية",
      "مدينة الشروق",
      "الظاهر",
      "العتبة",
      "القاهرة الجديدة",
      "المرج",
      "عزبة النخل",
      "المطرية",
      "المعادى",
      "المعصرة",
      "المقطم",
      "المنيل",
      "الموسكى",
      "النزهة",
      "الوايلى",
      "باب الشعرية",
      "بولاق",
      "جاردن سيتى",
      "حدائق القبة",
      "حلوان",
      "دار السلام",
      "شبرا",
      "طره",
      "عابدين",
      "العباسية",
      "عين شمس",
      "مدينة نصر",
      "مصر الجديدة",
      "مصر القديمة",
      "منشية ناصر",
      "مدينة بدر",
      "مدينة العبور",
      "وسط البلد",
      "الزمالك",
      "قصر النيل",
      "الرحاب",
      "القطامية",
      "مدينتي",
      "روض الفرج",
      "شيراتون",
      "الجمالية",
      "الحلمية",
      "النزهة الجديدة",
      "العاصمة الإدارية",
    ],
    الجيزة: [
      "أبو النمرس",
      "أبو رواش",
      "أرض اللواء",
      "أوسيم",
      "الباويطي",
      "البدرشين",
      "بين السرايات",
      "بولاق الدكرور",
      "الجيزة",
      "الدقي",
      "الشيخ زايد",
      "الصف",
      "العجوزة",
      "العياط",
      "العمرانية",
      "الفيصل",
      "القرية الذكية",
      "الكيت كات",
      "كرداسة",
      "كفر غطاطي",
      "حدائق الأهرام",
      "حدائق أكتوبر",
      "الحوامدية",
      "الحرانية",
      "السادس من أكتوبر",
      "صفط اللبن",
      "العمرانية",
      "الوراق",
      "الواحات البحرية",
      "إمبابة",
      "المنيب",
      "المهندسين",
      "الهرم",
      "منشأة البكاري",
      "منشأة القناطر",
    ],
    الإسكندرية: [
      "أبو قير",
      "الإبراهيمية",
      "الأزاريطة",
      "الأنفوشي",
      "الدخيلة",
      "السيوف",
      "العامرية",
      "اللبان",
      "المفروزة",
      "المنتزه",
      "المنشية",
      "الناصرية",
      "إمبروزو",
      "باب شرق",
      "برج العرب",
      "ستانلي",
      "سموحة",
      "سيدي بشر",
      "شدس",
      "غيط العنب",
      "فلمينج",
      "فيكتوريا",
      "كامب شيزار",
      "كرموز",
      "محطة الرمل",
      "مينا البصل",
      "العصافرة",
      "العجمي",
      "بكوس",
      "بولكلي",
      "كليوباترا",
      "جليم",
      "المعمورة",
      "المندرة",
      "محرم بك",
      "الشاطبي",
      "سيدي جابر",
      "الحضرة",
      "العطارين",
      "سيدي كرير",
      "الجمرك",
      "المكس",
    ],
    الدقهلية: [
      "المنصورة",
      "طلخا",
      "ميت غمر",
      "دكرنس",
      "أجا",
      "منية النصر",
      "السنبلاوين",
      "الكردي",
      "بني عبيد",
      "المنزلة",
      "تمي الأمديد",
      "الجمالية",
      "شربين",
      "المطرية",
      "بلقاس",
      "ميت سلسيل",
      "جمصة",
      "محلة دمنة",
      "نبروه",
    ],
    "البحر الأحمر": [
      "الغردقة",
      "رأس غارب",
      "سفاجا",
      "القصير",
      "مرسى علم",
      "الشلاتين",
      "حلايب",
      "الدهار",
    ],
    البحيرة: [
      "دمنهور",
      "كفر الدوار",
      "رشيد",
      "إدكو",
      "أبو المطامير",
      "أبو حمص",
      "الدلنجات",
      "المحمودية",
      "الرحمانية",
      "إيتاي البارود",
      "حوش عيسى",
      "شبراخيت",
      "كوم حمادة",
      "بدر",
      "وادي النطرون",
      "النوبارية الجديدة",
      "النوبارية",
    ],
    الفيوم: [
      "الفيوم",
      "الفيوم الجديدة",
      "طامية",
      "سنورس",
      "إطسا",
      "إبشواي",
      "يوسف الصديق",
      "الحادقة",
      "الجامعة",
      "السيالة",
    ],
    الغربية: [
      "طنطا",
      "المحلة الكبرى",
      "كفر الزيات",
      "زفتى",
      "السنطة",
      "قطور",
      "بسيون",
      "سمنود",
    ],
    الإسماعيلية: [
      "الإسماعيلية",
      "فايد",
      "القنطرة شرق",
      "القنطرة غرب",
      "التل الكبير",
      "أبو صوير",
      "القصاصين الجديدة",
      "نفيشة",
      "الشيخ زايد",
    ],
    المنوفية: [
      "شبين الكوم",
      "مدينة السادات",
      "منوف",
      "سرس الليان",
      "أشمون",
      "الباجور",
      "قويسنا",
      "بركة السبع",
      "تلا",
      "الشهداء",
    ],
    المنيا: [
      "المنيا",
      "المنيا الجديدة",
      "العدوة",
      "مغاغة",
      "بني مزار",
      "مطاي",
      "سمالوط",
      "المدينة الفكرية",
      "ملوي",
      "دير مواس",
      "أبو قرقاص",
      "أرض سلطان",
    ],
    القليوبية: [
      "بنها",
      "قليوب",
      "شبرا الخيمة",
      "القناطر الخيرية",
      "الخانكة",
      "كفر شكر",
      "طوخ",
      "قها",
      "العبور",
      "الخصوص",
      "شبين القناطر",
      "مسطرد",
    ],
    السويس: ["السويس", "الجناين", "عتاقة", "العين السخنة", "فيصل"],
    "بني سويف": [
      "بني سويف",
      "بني سويف الجديدة",
      "الواسطى",
      "ناصر",
      "إهناسيا",
      "ببا",
      "الفشن",
      "سمسطا",
      "الإباصيري",
      "مقبل",
    ],
    بورسعيد: [
      "بورسعيد",
      "بورفؤاد",
      "العرب",
      "حي الزهور",
      "حي الشرق",
      "حي الضواحي",
      "حي المناخ",
      "حي مبارك",
    ],
    دمياط: [
      "دمياط",
      "دمياط الجديدة",
      "رأس البر",
      "فارسكور",
      "الزرقا",
      "السرو",
      "الروضة",
      "كفر البطيخ",
      "عزبة البرج",
      "ميت أبو غالب",
      "كفر سعد",
    ],
    الشرقية: [
      "الزقازيق",
      "العاشر من رمضان",
      "منيا القمح",
      "بلبيس",
      "مشتول السوق",
      "القنايات",
      "أبو حماد",
      "القرين",
      "ههيا",
      "أبو كبير",
      "فاقوس",
      "الصالحية الجديدة",
      "الإبراهيمية",
      "ديرب نجم",
      "كفر صقر",
      "أولاد صقر",
      "الحسينية",
      "صان الحجر القبلية",
      "منشأة أبو عمر",
    ],
    "كفر الشيخ": [
      "وسط البلد كفر الشيخ",
      "دسوق",
      "فوه",
      "مطوبس",
      "برج البرلس",
      "بلطيم",
      "مصيف بلطيم",
      "الحامول",
      "بيلا",
      "الرياض",
      "سيدي سالم",
      "قلين",
      "سيدي غازي",
    ],
    "مرسى مطروح": [
      "الحمام",
      "العلمين",
      "الضبعة",
      "النجيلة",
      "سيدي براني",
      "السلوم",
      "سيوة",
      "مارينا",
      "الساحل الشمالي",
    ],
    الأقصر: [
      "الأقصر",
      "الأقصر الجديدة",
      "إسنا",
      "أرمنت",
      "القرنة",
      "الزينية",
      "البياضية",
      "الطود",
      "طيبة الجديدة",
    ],
    قنا: [
      "قنا",
      "قنا الجديدة",
      "أبو تشت",
      "نجع حمادي",
      "دشنا",
      "الوقف",
      "قفط",
      "نقادة",
      "فرشوط",
      "قوص",
    ],
    "شمال سيناء": ["العريش", "الشيخ زويد", "رفح", "بئر العبد", "الحسنة", "نخل"],
    سوهاج: [
      "سوهاج",
      "سوهاج الجديدة",
      "أخميم",
      "أخميم الجديدة",
      "البلينا",
      "المراغة",
      "المنشأة",
      "دار السلام",
      "جرجا",
      "جهينة الغربية",
      "ساقلته",
      "طما",
      "طهطا",
      "الكوثر",
    ],
    "جنوب سيناء": [
      "الطور",
      "شرم الشيخ",
      "دهب",
      "نويبع",
      "طابا",
      "سانت كاترين",
      "أبو رديس",
      "أبو زنيمة",
      "رأس سدر",
    ],
    أسيوط: [
      "أسيوط",
      "أسيوط الجديدة",
      "ديروط",
      "منفلوط",
      "القوصية",
      "أبنوب",
      "أبو تيج",
      "الغنايم",
      "ساحل سليم",
      "البداري",
      "صدفا",
    ],
    أسوان: [
      "أسوان",
      "أسوان الجديدة",
      "دراو",
      "كوم أمبو",
      "نصر النوبة",
      "كلابشة",
      "إدفو",
      "الرديسية",
      "البصيلية",
      "السباعية",
      "أبو سمبل السياحية",
    ],
    "الوادي الجديد": [
      "الخارجة",
      "باريس",
      "موط",
      "الفرافرة ",
      "بلاط ",
      "الداخلة",
    ],
  };

  return (
    <div
      className={`w-full  ${
        isDarkTheme ? "bg-gray-800" : "bg-white"
      } max-w-md mx-auto p-4 sm:p-8`}
    >
      <>
        <div className="hidden md:flex md:justify-center md:items-center">
          <div>
            <div className="h-20"></div>
            <div className="h-20"></div>
            <div className="h-20"></div>
            <div className="h-20"></div>
            <div className="h-20"></div>
            <div className="h-20"></div>
            <div className="h-20"></div>
            <div className="h-20"></div>
            <div className="h-20"></div>
            <div className="h-20"></div>
          </div>
        </div>
        <h3
          style={{ fontFamily: "Lamsa-font-Bold" }}
          className={`pt-14 ${
            isDarkTheme ? "text-secondaryBG" : "text-primaryBG"
          } text-2xl sm:text-3xl font-bold mb-5  text-center`}
        >
          أنشئ حسابك الآن
        </h3>
        <div className="">
          <InputField
            name="fullName"
            type="text"
            placeholder="الاسم بالكامل"
            icon={FaUser}
            value={values.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <ErrorMessage
            name="fullName"
            component="div"
            className="text-red-500"
          />
        </div>
        <InputField
          name="phoneNumber"
          type="text"
          placeholder="رقم الهاتف"
          icon={FaPhone}
          value={values.phoneNumber}
          onChange={(e) => {
            const value = e.target.value.replace(/[^0-9]/g, "");
            handleChange({ target: { name: "phoneNumber", value } });
          }}
          onBlur={handleBlur}
        />
        <ErrorMessage
          name="phoneNumber"
          component="div"
          className="text-red-500"
        />
        <div className="w-full">
          <InputField
            name="email"
            type="email"
            placeholder="البريد الإلكتروني"
            icon={FaEnvelope}
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <ErrorMessage name="email" component="div" className="text-red-500" />
        </div>
        <div className="w-full">
          <InputField
            name="password"
            type="password"
            placeholder="كلمة السر"
            icon={FaLock}
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <ErrorMessage
            name="password"
            component="div"
            className="text-red-500"
          />
        </div>
        <div className="relative ">
          <Field
            as="select"
            name="classGrade"
            className={`w-full my-4 px-4 py-2 pr-10 text-right rounded-md transition-all duration-300
        border shadow-[0_0_2px_rgba(168,85,247,0.6)]
        ${isFocused ? "border-secondaryBG border-2" : "border-primaryBG"}
        ${
          isDarkTheme
            ? "bg-gray-700 text-white placeholder-gray-400"
            : "bg-white text-black placeholder-gray-500"
        }
        focus:outline-none focus:ring-2 focus:ring-secondaryBG`}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          >
            <option value="">اختر الصف الدراسي</option>
            <option value="first grade">الصف الأول الثانوي</option>
            <option value="second grade">الصف الثاني الثانوي</option>
            <option value="third grade">الصف الثالث الثانوي</option>
          </Field>
          <FaGraduationCap
            style={{
              top: "34px",
              fontSize: "22px",
              marginRight: "7px",
            }}
            className={`absolute right-3 transform -translate-y-1/2 ${
              isDarkTheme ? "text-secondaryBG" : "text-primaryBG"
            }`}
          />
          <ErrorMessage
            name="classGrade"
            component="div"
            className="text-red-500"
          />
        </div>
        <div className="relative ">
          <Field
            as="select"
            name="educationType"
            className={`w-full my-4 px-4 py-2 pr-10 text-right rounded-md transition-all duration-300
        border shadow-[0_0_2px_rgba(168,85,247,0.6)]
        ${isFocused ? "border-secondaryBG border-2" : "border-primaryBG"}
        ${
          isDarkTheme
            ? "bg-gray-700 text-white placeholder-gray-400"
            : "bg-white text-black placeholder-gray-500"
        }
        focus:outline-none focus:ring-2 focus:ring-secondaryBG`}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          >
            <option value="">اختر نوع التعليم</option>
            <option value="general">عام</option>
            <option value="azhari">أزهر</option>
          </Field>
          <FaGraduationCap
            style={{
              top: "34px",
              fontSize: "22px",
              marginRight: "7px",
            }}
            className={`absolute right-3 transform -translate-y-1/2 ${
              isDarkTheme ? "text-secondaryBG" : "text-primaryBG"
            }`}
          />
          <ErrorMessage
            name="educationType"
            component="div"
            className="text-red-500"
          />
        </div>

        <div className="mb-4 relative">
          <Field
            as="select"
            name="governorate"
            value={values.governorate}
            onChange={(e) => {
              setFieldValue("governorate", e.target.value);
              setFieldValue("city", "");
            }}
            onBlur={handleBlur}
            className={`w-full px-4 py-2 pr-10 text-right rounded-md transition-all duration-300
            border shadow-[0_0_2px_rgba(168,85,247,0.6)]
            ${isFocused ? "border-secondaryBG border-2" : "border-primaryBG"}
            ${
              isDarkTheme
                ? "bg-gray-700 text-white placeholder-gray-400"
                : "bg-white text-black placeholder-gray-500"
            }
            focus:outline-none focus:ring-2 focus:ring-secondaryBG`}
            onFocus={() => setIsFocused(true)}
          >
            <option value="">اختر المحافظة</option>
            {Object.keys(egyptGovernorates).map((governorate) => (
              <option key={governorate} value={governorate}>
                {governorate}
              </option>
            ))}
          </Field>
          <FaMapMarkerAlt
            style={{
              top: "18px",
              fontSize: "22px",
              marginRight: "7px",
            }}
            className={`absolute right-3 transform -translate-y-1/2 ${
              isDarkTheme ? "text-secondaryBG" : "text-primaryBG"
            }`}
          />
          {/* <FaMapMarkerAlt
            className={`absolute right-3 top-3 ${
              isDarkTheme ? "text-secondaryBG" : "text-primaryBG"
            }`}
          /> */}
          <ErrorMessage
            name="governorate"
            component="div"
            className="text-red-500"
          />
        </div>

        {values.governorate && (
          <div className="mb-4 relative">
            <Field
              as="select"
              name="city"
              value={values.city}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-2 pr-10 text-right rounded-md transition-all duration-300
              border shadow-[0_0_2px_rgba(168,85,247,0.6)]
              ${isFocused ? "border-secondaryBG border-2" : "border-primaryBG"}
              ${
                isDarkTheme
                  ? "bg-gray-700 text-white placeholder-gray-400"
                  : "bg-white text-black placeholder-gray-500"
              }
              focus:outline-none focus:ring-2 focus:ring-secondaryBG`}
              onFocus={() => setIsFocused(true)}
            >
              <option value="">اختر المدينة</option>
              {egyptGovernorates[values.governorate].map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </Field>

            <FaMapMarkerAlt
              style={{
                top: "18px",
                fontSize: "22px",
                marginRight: "7px",
              }}
              className={`absolute right-3 transform -translate-y-1/2 ${
                isDarkTheme ? "text-secondaryBG" : "text-primaryBG"
              }`}
            />
            <ErrorMessage
              name="city"
              component="div"
              className="text-red-500"
            />
          </div>
        )}
        <InputField
          name="school"
          type="text"
          placeholder="المدرسة / المعهد"
          icon={FaSchool}
          value={values.school}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <ErrorMessage name="school" component="div" className="text-red-500" />
        <div className="relative my-4">
          <Field
            as="select"
            name="attendanceStatus"
            className={`w-full px-4 py-2 pr-10 text-right rounded-md transition-all duration-300
        border shadow-[0_0_2px_rgba(168,85,247,0.6)]
        ${isFocused ? "border-secondaryBG border-2" : "border-primaryBG"}
        ${
          isDarkTheme
            ? "bg-gray-700 text-white placeholder-gray-400"
            : "bg-white text-black placeholder-gray-500"
        }
        focus:outline-none focus:ring-2 focus:ring-secondaryBG`}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          >
            <option value="">اختر حالة الحضور</option>
            <option value="online">حضور أونلاين - على المنصة فقط</option>
            <option value="center">حضور في السنتر</option>
          </Field>
          <FaGraduationCap
            style={{
              top: "18px",
              fontSize: "22px",
              marginRight: "7px",
            }}
            className={`absolute right-3 transform -translate-y-1/2 ${
              isDarkTheme ? "text-secondaryBG" : "text-primaryBG"
            }`}
          />
          <ErrorMessage
            name="attendanceStatus"
            component="div"
            className="text-red-500"
          />
        </div>
        <h3
          style={{ fontFamily: "Lamsa-font-Bold" }}
          className={`${
            isDarkTheme ? "text-secondaryBG" : "text-primaryBG"
          } text-2xl sm:text-3xl font-bold mb-4 text-center`}
        >
          🥸...بيانات ولي الأمر
        </h3>
        <InputField
          name="guardian.name"
          type="text"
          placeholder="اسم ولي الأمر
"
          icon={FaUser}
          value={values.guardian.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <ErrorMessage
          name="guardian.name"
          component="div"
          className="text-red-500"
        />
        <InputField
          name="guardian.relation"
          type="text"
          placeholder="صلة القرابة"
          icon={FaUser}
          value={values.guardian.relation}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <ErrorMessage
          name="guardian.relation"
          component="div"
          className="text-red-500"
        />
        <InputField
          name="guardian.mobileNumber"
          type="text"
          placeholder="رقم ولي الأمر"
          icon={FaPhone}
          value={values.guardian.mobileNumber}
          onChange={(e) => {
            const value = e.target.value.replace(/[^0-9]/g, "");
            handleChange({
              target: { name: "guardian.mobileNumber", value },
            });
          }}
          onBlur={handleBlur}
        />
        <ErrorMessage
          name="guardian.mobileNumber"
          component="div"
          className="text-red-500"
        />
      </>
    </div>
  );
};

export default RegisterForm;
