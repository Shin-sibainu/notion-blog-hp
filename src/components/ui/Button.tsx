import Link from "next/link";

type ButtonProps = {
  children: React.ReactNode;
  variant: string;
};

const Button = ({ children, variant = "default" }: ButtonProps) => {
  return (
    <Link
      href={"#"}
      className="px-4 py-2 border rounded-lg bg-slate-800 text-white"
    >
      {children}
    </Link>
  );
};

export default Button;
