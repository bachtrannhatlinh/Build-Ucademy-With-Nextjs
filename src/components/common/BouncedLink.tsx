import Link from "next/link";
import { IconPlus } from "../icons";

const BouncedLink = ({ url }: { url: string }) => {
  return (
    <Link
        href={url}
        className="size-16 rounded-full bg-primary flexCenter text-white fixed right-5 bottom-10 animate-bounce"
      >
        <IconPlus />
      </Link>
  );
};

export default BouncedLink;
