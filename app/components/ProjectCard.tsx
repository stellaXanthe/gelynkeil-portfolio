"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ProjectCarousel from "./ProjectCarousel";


export interface Project {
  title: string;
  type?: string;
  summary?: string;
  images?: string[];
  features?: string[];
  tech?: string[];
  liveUrl?: string;
  githubUrl?: string;
}


interface Props {
  project: Project;
}


export default function ProjectCard({ project }: Props) {

  console.log("Rendering Project:", project.title);


  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 40,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.25,
      }}
      transition={{
        duration: 0.6,
      }}
      whileHover={{
        y: -8,
      }}
      className="
        group
        overflow-hidden
        rounded-[1.75rem]
        border
        border-white/10
        bg-slate-950/70
        backdrop-blur-xl
        transition-all
        duration-500
        hover:border-[#8fe2d2]/30
        hover:shadow-2xl
        hover:shadow-[#8fe2d2]/10
      "
    >


      {/* IMAGE CAROUSEL */}
      {project.images && project.images.length > 0 ? (

        <ProjectCarousel
          images={project.images}
          title={project.title}
        />

      ) : (

        <div
          className="
            flex
            h-64
            items-center
            justify-center
            bg-black/20
            text-slate-400
          "
        >
          No preview available
        </div>

      )}



      {/* CONTENT */}
      <div className="p-6 lg:p-8">


        <div
          className="
            flex
            flex-col
            gap-5
            lg:flex-row
            lg:items-start
            lg:justify-between
          "
        >


          {/* TITLE */}
          <div>

            <h3
              className="
                text-3xl
                font-bold
                text-white
              "
            >
              {project.title}
            </h3>


            {project.type && (
              <p
                className="
                  mt-2
                  font-medium
                  text-[#8fe2d2]
                "
              >
                {project.type}
              </p>
            )}

          </div>




          {/* BUTTONS */}
          <div
            className="
              flex
              flex-wrap
              gap-3
            "
          >


            {project.liveUrl && (

              <motion.div
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.95,
                }}
              >

                <Link
                  href={project.liveUrl}
                  target="_blank"
                  className="
                    rounded-xl
                    bg-[#8fe2d2]
                    px-5
                    py-3
                    font-semibold
                    text-slate-900
                    transition
                    hover:bg-[#5fe7cf]
                  "
                >
                  🚀 Live Demo
                </Link>

              </motion.div>

            )}




            {project.githubUrl && (

              <motion.div
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.95,
                }}
              >

                <Link
                  href={project.githubUrl}
                  target="_blank"
                  className="
                    rounded-xl
                    border
                    border-white/20
                    px-5
                    py-3
                    font-semibold
                    text-white
                    transition
                    hover:border-[#8fe2d2]
                    hover:bg-white/5
                  "
                >
                  💻 GitHub
                </Link>

              </motion.div>

            )}

          </div>

        </div>





        {/* SUMMARY */}
        {project.summary && (

          <p
            className="
              mt-6
              leading-8
              text-slate-300
            "
          >
            {project.summary}
          </p>

        )}






        {/* FEATURES */}
        {project.features && project.features.length > 0 && (

          <div className="mt-8">

            <h4
              className="
                mb-4
                text-sm
                font-semibold
                uppercase
                tracking-[0.2em]
                text-[#8fe2d2]
              "
            >
              Key Features
            </h4>


            <ul className="space-y-3">

              {project.features.map((feature) => (

                <motion.li
                  key={feature}
                  initial={{
                    opacity:0,
                    x:-20,
                  }}
                  whileInView={{
                    opacity:1,
                    x:0,
                  }}
                  viewport={{
                    once:true,
                  }}
                  transition={{
                    duration:0.25,
                  }}
                  className="
                    flex
                    items-start
                    gap-3
                    text-slate-300
                  "
                >

                  <span
                    className="
                      mt-2
                      h-2
                      w-2
                      rounded-full
                      bg-[#f2b84e]
                    "
                  />

                  <span>
                    {feature}
                  </span>


                </motion.li>

              ))}

            </ul>


          </div>

        )}






        {/* TECHNOLOGY */}
        {project.tech && project.tech.length > 0 && (

          <div className="mt-8">


            <h4
              className="
                mb-4
                text-sm
                font-semibold
                uppercase
                tracking-[0.2em]
                text-[#8fe2d2]
              "
            >
              Built With
            </h4>



            <div
              className="
                flex
                flex-wrap
                gap-3
              "
            >

              {project.tech.map((tech,index)=>(

                <motion.span
                  key={tech}
                  initial={{
                    opacity:0,
                    scale:0.8,
                  }}
                  whileInView={{
                    opacity:1,
                    scale:1,
                  }}
                  viewport={{
                    once:true,
                  }}
                  transition={{
                    delay:index * 0.05,
                  }}
                  whileHover={{
                    scale:1.08,
                  }}
                  className="
                    rounded-full
                    border
                    border-white/10
                    bg-white/5
                    px-4
                    py-2
                    text-sm
                    text-slate-300
                  "
                >

                  {tech}

                </motion.span>

              ))}


            </div>


          </div>

        )}



      </div>


    </motion.article>
  );
}