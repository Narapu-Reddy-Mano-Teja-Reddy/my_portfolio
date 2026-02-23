import React, { useRef, useState } from "react";
import SectionWrapper from "../hoc/SectionWrapper";
import { motion } from "framer-motion";
import { slideIn } from "../utils/motion";
import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";
import { personalInfo, publicUrls } from "../constants";
import Modal from "./Modal";

// ─────────────────────────────────────────────────────────────────────────────
// Web3Forms — Get your FREE access key in 10 seconds:
//   1. Go to https://web3forms.com
//   2. Enter "tejanarapureddy2@gmail.com" → click "Create Access Key"
//   3. Paste the key below (check your email inbox for the key)
const WEB3FORMS_ACCESS_KEY = "YOUR_WEB3FORMS_KEY_HERE";
// Currently using Web3Forms demo key — emails may go to a test inbox.
// Replace the value above with your personal key to receive emails.
// ─────────────────────────────────────────────────────────────────────────────

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
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

  const handleSubmit = async (e) => {
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

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: form.name,
          email: form.email,
          message: form.message,
          subject: `Portfolio Contact from ${form.name}`,
          from_name: "Portfolio Contact Form",
          replyto: form.email,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setIsError(false);
        setForm({ name: "", email: "", message: "" });
        setModalContent({
          title: "Message Sent! 🎉",
          message:
            "Thank you for reaching out! I'll get back to you as soon as possible.",
          buttonText: "Close",
        });
      } else {
        throw new Error(data.message || "Submission failed");
      }
    } catch (error) {
      setIsError(true);
      console.error("Form error:", error);
      setModalContent({
        title: "Oops!",
        message:
          `Something went wrong. Please email me directly at ${personalInfo.email}`,
        buttonText: "Ok",
      });
    } finally {
      setLoading(false);
      setIsModalVisible(true);
    }
  };

  return (
    <>
      <div className="xl:mt-12 flex xl:flex-row flex-col gap-10 overflow-hidden">
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
                placeholder="What's your email address?"
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

        {/* ── 3D Canvas — hidden on mobile ── */}
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
