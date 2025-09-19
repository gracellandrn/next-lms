import Link from "next/link";

interface Props {
  label: string;
  href: string;
}

export const Menu = ({ label, href }: Props) => {
  return (
    <Link
      href={href}
      className="block px-4 py-2 text-[15px] rounded-xl font-semibold text-slate-700 hover:bg-indigo-500 hover:text-white active:bg-indigo-400 transition-all duration-200 backdrop-blur-sm bg-white/20 border border-transparent hover:border-white/30"
    >
      {label}
    </Link>
  );
};
