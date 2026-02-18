import React from "react";
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../utils/motion";
import { styles } from "../styles";
import { publicUrls, certifications } from "../constants";

const CertificationsPage = () => {
    return (
        <div className="bg-primary min-h-screen pt-20">
            <div className={`${styles.padding} max-w-7xl mx-auto relative z-0`}>
                <motion.div variants={textVariant()}>
                    <p className={styles.sectionSubText}>My Credentials</p>
                    <h2 className={styles.sectionHeadText}>Certifications.</h2>
                </motion.div>

                <div className="w-full flex">
                    <motion.p
                        variants={fadeIn("", "", 0.1, 1)}
                        className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
                    >
                        I have completed various certifications to enhance my skills and
                        knowledge in different domains of technology.
                    </motion.p>
                </div>

                <div className="mt-20 flex flex-wrap gap-7 justify-center">
                    {certifications.map((cert, index) => (
                        <motion.div
                            variants={fadeIn("up", "spring", index * 0.5, 0.75)}
                            className="bg-tertiary p-8 rounded-2xl sm:w-[320px] w-full flex flex-col items-center gap-6 border border-white/10 hover:border-violet-500 hover:shadow-card transition-all cursor-pointer group"
                            onClick={() => window.open(publicUrls.socialProfiles.linkedin.link + "details/certifications/", "_blank")}
                            key={`cert-${index}`}
                            whileHover={{ y: -10 }}
                        >
                            <div className="w-20 h-20 bg-white rounded-full flex justify-center items-center p-2 shadow-lg">
                                <img src={cert.image} alt={cert.name} className="w-full h-full object-contain" />
                            </div>
                            <div className="text-center">
                                <h3 className="text-white font-bold text-[20px] group-hover:text-violet-400 transition-colors">{cert.name}</h3>
                                <p className="text-secondary text-[16px] mt-2">{cert.issuer}</p>
                            </div>
                            <div className="mt-auto pt-4">
                                <span className="text-blue-400 text-sm flex items-center gap-2">Verfiy on LinkedIn ↗</span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <p className="text-secondary text-[16px] mb-8 mt-16 text-center">
                    I regularly post my latest certifications and achievements on LinkedIn. Check out my profile to see my full collection.
                </p>
                <div className="pb-20 flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={() => window.open(publicUrls.socialProfiles.linkedin.link + "details/certifications/", "_blank")}
                        className="bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold py-3 px-6 rounded-xl hover:scale-105 transition-transform duration-300 shadow-lg flex items-center justify-center gap-2"
                    >
                        <img src={publicUrls.socialProfiles.linkedin.icon} alt="LinkedIn" className="w-5 h-5 object-contain filter brightness-0 invert" />
                        View Certifications
                    </button>
                    <button
                        onClick={() => window.open("https://www.linkedin.com/in/mano-teja-reddy-/recent-activity/all/", "_blank")}
                        className="bg-transparent border border-white text-white font-bold py-3 px-6 rounded-xl hover:bg-white/10 transition-colors duration-300 flex items-center justify-center gap-2"
                    >
                        View Posts
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CertificationsPage;
