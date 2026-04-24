import { AnchorHTMLAttributes, ReactNode } from "react";

type NextLinkMockProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
};

export default function NextLinkMock({
  href,
  children,
  ...props
}: NextLinkMockProps) {
  return (
    <a href={href} {...props}>
      {children}
    </a>
  );
}
