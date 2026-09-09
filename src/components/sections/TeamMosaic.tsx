"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { images } from "@/data/images";
import Typewriter from "@/components/ui/Typewriter";

const MEMBERS = images.teamPhotos.map((img, i) => ({
  id: i + 1,
  name: ["Tanjung", "Juan", "Erdin", "Dimas", "Isa"][i],
  img,
}));

const SLOTS = ["featured", "secB", "secC", "smallD", "smallE"];
const ROTATE_MS = 4000;

const gridStyle = {
  position: "absolute",
  inset: 0,
  display: "grid",
  gridTemplateColumns: "2fr 1.2fr 0.9fr",
  gridTemplateRows: "repeat(4, 1fr)",
  gridTemplateAreas: `
    "featured secB smallD"
    "featured secB smallD"
    "featured secC smallE"
    "featured secC smallE"
  `,
  gap: "clamp(6px, 1.5vw, 10px)",
} as const;

function Photo({ member, isFeatured }: { member: (typeof MEMBERS)[number]; isFeatured: boolean }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "10px",
        overflow: "hidden",
        position: "relative",
        background: "linear-gradient(135deg, #F0997B 0%, #4A1B0C 100%)",
      }}
    >
      <motion.div
        key={member.img}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{ width: "100%", height: "100%", position: "relative" }}
      >
        <Image
          src={member.img}
          alt={member.name}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </motion.div>

      {isFeatured && (
        <div className="absolute top-2.5 left-2.5 sm:top-4 sm:left-4 z-10">
          <Typewriter
            key={member.name}
            text={member.name}
            className="font-body text-white text-[12px] sm:text-[13px]"
            style={{ textShadow: "0 1px 8px rgba(0,0,0,0.85), 0 1px 3px rgba(0,0,0,0.6)" }}
          />
        </div>
      )}
    </div>
  );
}

export default function TeamMosaic() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const tick = setInterval(() => {
      setOffset((o) => (o + 1) % MEMBERS.length);
    }, ROTATE_MS);
    return () => clearInterval(tick);
  }, []);

  const assignments = MEMBERS.map((m, i) => {
    const slotIndex = (i + offset) % MEMBERS.length;
    return { member: m, slot: SLOTS[slotIndex] };
  }).filter((a) => SLOTS.includes(a.slot));

  return (
    <div style={gridStyle}>
      {assignments.map(({ member, slot }) => (
        <motion.div
          key={member.id}
          layout
          layoutId={`team-photo-${member.id}`}
          transition={{ type: "tween", duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ gridArea: slot }}
        >
          <Photo member={member} isFeatured={slot === "featured"} />
        </motion.div>
      ))}
    </div>
  );
}
