/* eslint-disable react/prop-types */
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { FaPlay, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useUserDetails from "../../../hooks/UserInfo";
import { useState } from "react";
import { useTheme } from "../../ThemeProvider";
import { FaFileAlt } from "react-icons/fa";

const ParentAccordion = ({ courseDetails }) => {
  const { isDarkTheme } = useTheme();
  // console.log("courseDetails", courseDetails);

  const { purchasedCourses } = useUserDetails();
  const courseId = Array.isArray(courseDetails)
    ? courseDetails.map((course) => course._id)[0]
    : courseDetails?._id;
  const lessons = courseDetails?.lessons;
  // console.log("lessons", lessons);

  const hasPurchased = purchasedCourses?.some(
    (course) => course?.course?._id === courseId
  );
  // console.log(lessons);

  const accordionData = Array.isArray(lessons)
    ? lessons?.map((lesson) => ({
        title: lesson.lessonName,
        content: (
          <div>
            <h3 className="font-bold text-3xl text-secondaryBG my-2">
              الفيديوهات
            </h3>
            <div className="flex  justify-end">
              <div className="w-24 h-1  bg-primaryBG mb-2"></div>
              {/* <div className="w-20 h-1  bg-secondaryBG mb-2"></div> */}
            </div>
            <div className="flex  justify-end">
              {/* <div className="w-32 h-1  bg-primaryBG mb-2"></div> */}
              <div className="w-16 h-1  bg-secondaryBG mb-2"></div>
            </div>
            {lesson?.video?.length > 0 ? (
              lesson.video.map((video) => (
                <div key={video?._id} className="mb-4 flex flex-col">
                  <motion.p
                    className="font-medium mb-2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {video.title}
                  </motion.p>

                  {hasPurchased ? (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      whileHover={{
                        scale: 1.05,
                        color: "#15B7FF",
                        transition: { duration: 0.3 },
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        to={`/video-player/${video._id}`}
                        onClick={() => {
                          // Save the video URL in localStorage with its _id as the key
                          localStorage.setItem(video._id, video.url.trim());
                        }}
                        className="flex flex-col items-center underline text-secondaryBG transition-colors duration-300"
                      >
                        <FaPlay className="mb-1" />
                        <span> 👀مشاهدة الفيديو</span>
                      </Link>
                    </motion.div>
                  ) : (
                    <div className="flex flex-col items-center text-gray-500">
                      <FaLock className="mb-1" />
                      <span>اشترك لمشاهدة الفيديو</span>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p>لا توجد فيديوهات متاحة</p>
            )}

            <h3 className="font-bold text-3xl mt-5 text-secondaryBG my-2">
              الملفات
            </h3>
            <div className="flex  justify-end">
              <div className="w-24 h-1  bg-primaryBG mb-2"></div>
              {/* <div className="w-20 h-1  bg-secondaryBG mb-2"></div> */}
            </div>
            <div className="flex  justify-end">
              {/* <div className="w-32 h-1  bg-primaryBG mb-2"></div> */}
              <div className="w-16 h-1  bg-secondaryBG mb-2"></div>
            </div>
            {lesson.sheet?.length > 0 ? (
              lesson.sheet.map((sheet) => (
                <div key={sheet._id} className="mb-2 flex flex-col">
                  <p className="font-medium my-2">{sheet.title}</p>

                  {hasPurchased ? (
                    <a
                      href={sheet.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center underline text-secondaryBG transition-colors duration-300"
                      // style={{
                      //   color: "#6828CD",
                      //   textDecoration: "underline",
                      //   transition: "color 0.3s ease",
                      // }}
                      // onMouseEnter={(e) => {
                      //   e.target.style.color = "#15B7FF";
                      // }}
                      // onMouseLeave={(e) => {
                      //   e.target.style.color = "#6828CD";
                      // }}
                    >
                      <FaFileAlt className="mb-1" />
                      👀 فتح الملف
                    </a>
                  ) : (
                    <div className="flex flex-col items-center text-gray-500">
                      <FaLock className="mb-1" />
                      <span>اشترك لفتح الملفات</span>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p>لا توجد ملفات متاحة</p>
            )}
          </div>
        ),
      }))
    : [];

  return (
    <div className="container mx-auto p-4 text-right">
      <h1
        className={`mb-6 text-2xl font-bold   text-primaryBG  
           ${isDarkTheme ? " text-white" : " text-gray-700 "}`}
      >
        محتويات الكورس
      </h1>
      <div className="flex  justify-end">
        {/* <div className="w-24 h-1  bg-primaryBG mb-2"></div> */}
        <div className="w-1/2 h-1  bg-secondaryBG mb-2"></div>
      </div>
      <div className="flex  justify-end">
        <div className="w-1/4 h-1  bg-primaryBG mb-2"></div>
        {/* <div className="w-16 h-1  bg-secondaryBG mb-2"></div> */}
      </div>
      {/* {error && <p className="text-red-500">{error}</p>} */}
      {lessons?.length > 0 ? (
        <NestedAccordion items={accordionData} />
      ) : (
        <p>لا توجد دروس متاحة.</p>
      )}
    </div>
  );
};

export default ParentAccordion;

const AccordionItem = ({ title, children, isOpen, toggleAccordion }) => {
  return (
    <div className="mb-2 rounded-lg">
      <button
        className="flex w-full items-center justify-between  bg-gradient-to-r from-GreidentColor2 to-secondaryBG hover:bg-gradient-to-r hover:from-primaryBG hover:to-secondaryBG p-4 font-semibold rounded-md text-gray-100 "
        onClick={toggleAccordion}
      >
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        <span className="text-right">
          <motion.div
            className=" flex gap-10 mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 0.5,
              type: "spring",
              stiffness: 100,
              damping: 10,
            }}
          >
            <span className="text-right">{title}</span>

            <img
              src="/images/تصميم بدون عنوان (4).png"
              alt="Card image"
              className="w-10 h-8 object-cover"
            />
          </motion.div>
        </span>
      </button>
      {isOpen && <div className="text-right p-4">{children}</div>}
    </div>
  );
};

const NestedAccordion = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          isOpen={openIndex === index}
          toggleAccordion={() => toggleAccordion(index)}
        >
          {item.content}
          {item.nestedItems && <NestedAccordion items={item.nestedItems} />}
        </AccordionItem>
      ))}
    </div>
  );
};
