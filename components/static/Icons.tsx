import Image from "next/image";

export const FacebookIcon = ({ size }: { size: number }) => (
  <Image
    alt="Facebook Icon"
    src="/assets/icons/facebook-icon.svg"
    width={size}
    height={size}
  />
);

export const InstagramIcon = ({ size }: { size: number }) => (
  <Image
    alt="Instagram Icon"
    src="/assets/icons/instagram-icon.svg"
    width={size}
    height={size}
  />
);

export const MailIcon = ({ size }: { size: number }) => (
  <Image
    alt="Mail Icon"
    src="/assets/icons/mail-icon.svg"
    width={size}
    height={size}
  />
);

export const HamburgerIcon = ({ size }: { size: number }) => (
  <Image
    alt="Hamburger Menu Icon"
    src="/assets/icons/hamburger-icon.svg"
    width={size}
    height={size}
  />
);

export const CloseIcon = ({
  size,
  customClasses = "",
}: {
  size: number;
  customClasses: string;
}) => (
  <Image
    className={customClasses}
    alt="Close Menu Icon"
    src="/assets/icons/close-icon.svg"
    width={size}
    height={size}
  />
);

export const ArrowRightIcon = ({ size }: { size: number }) => (
  <Image
    alt="Arrow Right Icon"
    src="/assets/icons/arrow-right-icon.svg"
    width={size}
    height={size}
  />
);

export const ArrowLeftIcon = ({ size }: { size: number }) => (
  <Image
    alt="Arrow Left Icon"
    src="/assets/icons/arrow-left-icon.svg"
    width={size}
    height={size}
  />
);

export const ArrowRightAnkerIcon = ({ size }: { size: number }) => (
  <Image
    alt="Arrow Right Anker Icon"
    src="/assets/icons/arrow-right-anker.svg"
    width={size}
    height={size}
  />
);

export const LoadingIcon = ({ size }: { size: number }) => (
  <Image
    alt="Loading Icon"
    src="/assets/icons/loading-icon.svg"
    width={size}
    height={size}
  />
);
