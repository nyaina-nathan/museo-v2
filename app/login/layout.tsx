interface LoginLayoutProps {
  children: React.ReactNode;
}

export default function LoginLayout({ children }: LoginLayoutProps) {
  return (
    <div lang="en" className="contents">
      {children}
    </div>
  );
}
