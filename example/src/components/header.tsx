import { Github } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 border-b">
      <div className="text-xl font-bold">ShadCN Generic Form</div>

      <div className="flex items-center gap-4">
        <a
          href="https://github.com/vikramsamak/shadcn-generic-form"
          target="_blank"
        >
          <Button variant="ghost" size="icon" className="rounded-full">
            <Github />
          </Button>
        </a>
        <ModeToggle />
      </div>
    </header>
  );
}
