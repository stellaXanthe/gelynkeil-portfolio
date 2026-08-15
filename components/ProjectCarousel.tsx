"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { motion } from "framer-motion";

import BrowserFrame from "./BrowserFrame";
import LightboxGallery from "./Lightbox";

interface ProjectCarouselProps {
  images: string[];
  title: string;
}

export default function ProjectCarousel({
  images,
  title,
}: ProjectCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;

    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = () => {
    emblaApi?.scrollPrev();
  };

  const scrollNext = () => {
    emblaApi?.scrollNext();
  };

  const scrollTo = (index: number) => {
    emblaApi?.scrollTo(index);
  };


  if (!images || images.length === 0) {
    return null;
  }


  return (
    <>
      <BrowserFrame>
        <div className="relative">

          {/* Previous Button */}
          {images.length > 1 && (
            <button
              type="button"
              aria-label="Previous image"
              onClick={(e) => {
                e.stopPropagation();
                scrollPrev();
              }}
              className="
                absolute
                left-4
                top-1/2
                z-20
                -translate-y-1/2
                rounded-full
                bg-black/60
                p-4
                text-white
                backdrop-blur-md
                transition
                hover:scale-110
                hover:bg-[#8fe2d2]
                hover:text-black
              "
            >
              ←
            </button>
          )}


          {/* Next Button */}
          {images.length > 1 && (
            <button
              type="button"
              aria-label="Next image"
              onClick={(e) => {
                e.stopPropagation();
                scrollNext();
              }}
              className="
                absolute
                right-4
                top-1/2
                z-20
                -translate-y-1/2
                rounded-full
                bg-black/60
                p-4
                text-white
                backdrop-blur-md
                transition
                hover:scale-110
                hover:bg-[#8fe2d2]
                hover:text-black
              "
            >
              →
            </button>
          )}


          {/* Carousel */}
          <div
            ref={emblaRef}
            className="overflow-hidden"
          >
            <div className="flex">

              {images.map((image, index) => (
                <motion.div
                  key={image}
                  whileHover={{
                    scale: 1.01,
                  }}
                  transition={{
                    duration: 0.25,
                  }}
                  onClick={() => setLightboxOpen(true)}
                  className="
                    relative
                    flex-[0_0_100%]
                    cursor-pointer
                  "
                >

                  <Image
                    src={image}
                    alt={`${title} screenshot ${index + 1}`}
                    width={1600}
                    height={900}
                    priority={index === 0}
                    className="
                      aspect-video
                      w-full
                      object-cover
                      cursor-zoom-in
                      transition
                      duration-700
                      hover:scale-[1.02]
                    "
                  />


                  {/* Hover Overlay */}
                  <div
                    className="
                      absolute
                      inset-0
                      flex
                      items-center
                      justify-center
                      bg-black/0
                      opacity-0
                      transition-all
                      duration-300
                      hover:bg-black/30
                      hover:opacity-100
                    "
                  >
                    <span
                      className="
                        rounded-full
                        bg-white/90
                        px-4
                        py-2
                        text-sm
                        font-semibold
                        text-slate-900
                      "
                    >
                      Click to Enlarge
                    </span>
                  </div>

                </motion.div>
              ))}

            </div>
          </div>

        </div>
      </BrowserFrame>



      {/* Navigation Dots */}
      {images.length > 1 && (
        <div className="mt-5 flex justify-center gap-3">

          {images.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to image ${index + 1}`}
              onClick={() => scrollTo(index)}
              className={`
                h-3
                w-3
                rounded-full
                transition-all
                duration-300

                ${
                  index === selectedIndex
                    ? "scale-125 bg-[#8fe2d2] shadow-lg shadow-[#8fe2d2]/40"
                    : "bg-white/30 hover:bg-white/60"
                }
              `}
            />
          ))}

        </div>
      )}



      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="mt-6 flex flex-wrap justify-center gap-3">

          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              aria-label={`Select image ${index + 1}`}
              onClick={() => scrollTo(index)}
              className={`
                overflow-hidden
                rounded-lg
                border-2
                transition-all

                ${
                  index === selectedIndex
                    ? "scale-105 border-[#8fe2d2] ring-2 ring-[#8fe2d2]/40"
                    : "border-white/10 opacity-70 hover:opacity-100"
                }
              `}
            >

              <Image
                src={image}
                alt={`${title} thumbnail ${index + 1}`}
                width={150}
                height={90}
                className="
                  h-20
                  w-32
                  object-cover
                  transition
                  duration-300
                  hover:scale-110
                "
              />

            </button>
          ))}

        </div>
      )}



      {/* Lightbox */}
      <LightboxGallery
        images={images}
        open={lightboxOpen}
        index={selectedIndex}
        onClose={() => setLightboxOpen(false)}
      />

    </>
  );
}