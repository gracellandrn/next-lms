interface Props {
  label: string;
  href: string;
}

export const Menu = (props: Props) => {
  return (
    <div className="px-3 py-1.5 text-[15px] rounded-lg hover:bg-indigo-500 hover:text-white active:bg-indigo-400 items-center font-semibold text-slate-700 cursor-pointer transition duration-200">
      {props.label}
    </div>
  );
};
