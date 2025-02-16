import React from "react";
import Link from "next/link";
import { headerLinks } from "@/constants";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

interface NavItemsProps {
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>; // Correctly typed setOpen prop
}

const NavItems: React.FC<NavItemsProps> = ({ setOpen }) => { // Destructure props
  const pathname = usePathname();

  return (
    <ul className="md:flex-between items-start flex w-full flex-col gap-3 md:flex-row">
      {headerLinks.map((link) => {
        const isActive = pathname === link.route;
        return (
          <li
            key={link.route}
            className={`${
              isActive ? "text-primary-500" : ""
            } flex-center p-medium-16 whitespace-nowrap`}
          >
            <Link
              href={link.route}
              onClick={() => {
                if (setOpen) {
                  setOpen(false); // Call setOpen if it's defined
                }
              }}
            >
              <Button
                variant="outline"
                className="hover:bg-neongreen hover:text-black"
              >
                {link.label}
              </Button>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavItems;
