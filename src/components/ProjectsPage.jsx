import React from "react";
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { projects } from "../constants";
import { Tilt } from "react-tilt";
import { demo } from "../assets";

const ProjectCard = ({
    index,
    name,
    description,
    tags,
    image,
    hosted_link,
}) => {
    return (
        <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
            <Tilt
                options={{ max: 45, scale: 1, speed: 450 }}
                className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full"
            >
                <div
                    className="relative w-full h-[230px] cursor-pointer"
                    onClick={() => window.open(hosted_link, "_blank")}
                >
                    <img
                        src={image}
                        alt="project-image"
                        className="w-full h-full object-cover rounded-2xl"
                    />

                    <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
                        <div
                            onClick={() => window.open(hosted_link, "_blank")}
                            className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
                        >
                            <img
                                src={demo}
                                alt="source-code"
                                className="w-1/2 h-1/2 object-contain"
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-5">
                    <h3 className="text-white font-bold text-[24px]">{name}</h3>
                    <p className="mt-2 text-secondary text-[14px]">{description}</p>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <p
                            key={`${name}-${tag.name}`}
                            className={`text-[14px] ${tag.color}`}
                        >
                            #{tag.name}
                        </p>
                    ))}
                </div>
            </Tilt>
        </motion.div>
    );
};

const ProjectsPage = () => {
    return (
        <div className="bg-primary min-h-screen pt-20">
            <div className={`${styles.padding} max-w-7xl mx-auto relative z-0`}>
                <motion.div variants={textVariant()}>
                    <p className={styles.sectionSubText}>My work</p>
                    <h2 className={styles.sectionHeadText}>All Projects.</h2>
                </motion.div>

                <div className="w-full flex">
                    <motion.p
                        variants={fadeIn("", "", 0.1, 1)}
                        className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
                    >
                        Following projects showcases my skills and experience through
                        real-world examples of my work. Each project is briefly described with
                        links to code repositories. It reflects my ability to solve complex
                        problems, work with different technologies, and manage projects
                        effectively.
                    </motion.p>
                </div>

                <div className="mt-20 flex flex-wrap gap-7">
                    {projects.map((project, index) => (
                        <ProjectCard key={`project-${index}`} index={index} {...project} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectsPage;
