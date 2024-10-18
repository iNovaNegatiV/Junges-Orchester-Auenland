import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { DonationGraphStoryblok } from "../../generated/donation_graph-component";

const DonationGraph = ({ blok }: DonationGraphStoryblok) => {
  const { ref, inView } = useInView({
    threshold: 0.6,
  });

  return (
    <div ref={ref} className={`donation-graph w-full relative`}>
      <Image
        src={blok.background_image.filename}
        alt={blok.background_image.alt}
        width={200}
        height={0}
        className={`m-auto w-2/4 bg-transparent relative z-20`}
      />
      <div
        className={`m-auto w-2/4 bg-[#DFF0D8] absolute z-10 left-0 right-0 bottom-0 `}
        style={{
          transition: "ease height 1s",
          height: inView ? "" + blok.current + "%" : "0%",
        }}
      >
        <p
          className={`h-fit absolute m-auto inset-0 !text-2xl text-center text-[#273385] font-bold`}
        >
          {inView ? `${blok.current}%` : ""}
        </p>
      </div>
      <div
        className={`h-full m-auto w-2/4 bg-[#FFE05E] absolute z-0 left-0 right-0 bottom-0`}
      ></div>
    </div>
  );
};
export default DonationGraph;
