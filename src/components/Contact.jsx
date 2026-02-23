import React, { useRef, useState } from "react";
import SectionWrapper from "../hoc/SectionWrapper";
import { motion } from "framer-motion";
import { slideIn } from "../utils/motion";
import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";
import emailjs from "@emailjs/browser";
import { personalInfo, publicUrls } from "../constants";
import Modal from "./Modal";

// ─── EmailJS Credentials ──────────────────────────────────────────────────────
// 1. Sign up at https://emailjs.com (free)
// 2. Add Email Service → connect tejanarapureddy2@gmail.com → copy Service ID
// 3. Create Email Template with {{from_name}}, {{from_email}}, {{message}} → copy Template ID
// 4. Account → API Keys → copy Public Key
const EMAILJS_SERVICE_ID = "service_portfolio";   // ← replace with your Service ID
const EMAILJS_TEMPLATE_ID = "template_contact";    // ← replace with your Template ID
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";     // ← replace with your Public Key
// ─────────────────────────────────────────────────────────────────────────────

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    message: "",
    buttonText: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setIsError(true);
      setModalContent({
        title: "Missing Fields",
        message: "Please fill in all fields before sending.",
        buttonText: "Ok",
      });
      setIsModalVisible(true);
      return;
    }

    setLoading(true);

    emailjs
      .send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
          to_email: "tejanarapureddy2@gmail.com",
        },
        EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        setLoading(false);
        setIsError(false);
        setForm({ name: "", email: "", message: "" });
        setModalContent({
          title: "Message Sent! 🎉",
          message:
            "Thank you for reaching out! I'll get back to you as soon as possible.",
          buttonText: "Close",
        });
        setIsModalVisible(true);
      })
      .catch((error) => {
        setLoading(false);
        setIsError(true);
        console.error("EmailJS error:", error);
        setModalContent({
          title: "Oops!",
          message:
            "Something went wrong while sending your message. Please try again or email me directly at tejanarapureddy2@gmail.com",
          buttonText: "Ok",
        });
        setIsModalVisible(true);
      });
  };

  return (
    <>
      <div className="xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden">
        {/* ── Contact Form ── */}
        <motion.div
          variants={slideIn("left", "tween", 0.2, 1)}
          className="relative flex-[0.5] bg-black-100 p-8 rounded-2xl w-full"
        >
          {/* Social icons */}
          <div className="flex items-center justify-end space-x-4 absolute top-8 right-4">
            {Object.keys(publicUrls.socialProfiles).map((socialProfile) => {
              const profile = publicUrls.socialProfiles[socialProfile];
              return (
                <div
                  key={`social_${profile.title}`}
                  onClick={() => window.open(profile.link, "_blank")}
                  className="green-pink-gradient lg:w-10 lg:h-10 h-8 w-8 rounded-full flex justify-center items-center cursor-pointer hover:scale-110"
                >
                  <img
                    src={profile.icon}
                    alt={`social_${profile.title}`}
                    className="w-4/6 h-4/6 object-contain"
                  />
                </div>
              );
            })}
          </div>

          <p className={styles.sectionSubText}>Get in touch</p>
          <h3 className={styles.sectionHeadText}>Contact.</h3>
          <p className={`${styles.sectionSubText} lowercase`}>
            {personalInfo.email}
          </p>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="mt-12 flex flex-col gap-8"
          >
            <label className="flex flex-col">
              <span className="text-white font-medium mb-4">Your Name</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="What's your good name?"
                className="bg-tertiary py-4 px-6 text-white placeholder:text-secondary rounded-lg outline-none border-none font-medium"
              />
            </label>

            <label className="flex flex-col">
              <span className="text-white font-medium mb-4">Your Email</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="What's your web address?"
                className="bg-tertiary py-4 px-6 text-white placeholder:text-secondary rounded-lg outline-none border-none font-medium"
              />
            </label>

            <label className="flex flex-col">
              <span className="text-white font-medium mb-4">Your Message</span>
              <textarea
                rows={7}
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="What do you want to say?"
                className="bg-tertiary py-4 px-6 text-white placeholder:text-secondary rounded-lg outline-none border-none font-medium"
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              className="bg-tertiary py-3 px-8 rounded-xl outline-none text-white font-bold w-fit shadow-md shadow-primary hover:bg-violet-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </motion.div>

        {/* ── 3D Canvas — hidden on mobile, shown on xl screens ── */}
        <motion.div
          variants={slideIn("right", "tween", 0.2, 1)}
          className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px] hidden md:block"
        >
          <ComputersCanvas />
        </motion.div>
      </div>

      {isModalVisible && (
        <Modal
          title={modalContent.title}
          message={modalContent.message}
          buttonText={modalContent.buttonText}
          isError={isError}
          setIsModalVisible={() => setIsModalVisible(false)}
        />
      )}
    </>
  );
};

export default SectionWrapper(Contact, "contact");
