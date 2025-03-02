import { ModeToggle } from "./mode-toggle";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 border-b">
      <div className="text-xl font-bold">ShadCN Generic Form</div>
      <ModeToggle />
    </header>
  );
}
