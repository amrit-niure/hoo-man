export default function NavTitle({ children }: { children: React.ReactNode }) {
    return (
      <span className={`w-fit text-sm font-medium  text-muted-foreground`}>
        {children}
      </span>
    );
  }