"use client";

import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

import "yet-another-react-lightbox/styles.css";

interface LightboxGalleryProps {
  images: string[];
  open: boolean;
  index: number;
  onClose: () => void;
}

export default function LightboxGallery({
  images,
  open,
  index,
  onClose,
}: LightboxGalleryProps) {
  return (
    <Lightbox
      open={open}
      close={onClose}
      index={index}
      plugins={[Zoom]}
      slides={images.map((image) => ({
        src: image,
      }))}
      controller={{
        closeOnBackdropClick: true,
      }}
      carousel={{
        finite: false,
      }}
      render={{
        buttonPrev: images.length <= 1 ? () => null : undefined,
        buttonNext: images.length <= 1 ? () => null : undefined,
      }}
    />
  );
}