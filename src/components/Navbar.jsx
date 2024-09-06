"use client";
import React, { useState } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Image,
  Button,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Link,
} from "@nextui-org/react";
import { VscSignOut } from "react-icons/vsc";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import {
  TbBowlSpoon,
  TbUserPlus,
  TbBuildingWarehouse,
  TbUserDollar,
  TbLayoutDashboard,
  TbTableColumn,
  TbDatabase,
  TbTrash,
} from "react-icons/tb";
import { AiOutlineProduct } from "react-icons/ai";
import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";

const pages = [
  {
    name: "Inicio",
    href: "/",
    icon: <TbLayoutDashboard />,
  },
  {
    name: "Ventas",
    links: [
      {
        name: "Nueva venta",
        href: "/new-sale",
        icon: <GiReceiveMoney />,
      },
      {
        name: "Historial de ventas",
        href: "/sales-history",
        icon: <TbTableColumn />,
      },
    ],
  },
  {
    name: "Compras",
    links: [
      {
        name: "Nueva compra",
        href: "/new-purchase",
        icon: <GiPayMoney />,
      },
      {
        name: "Historial de compras",
        href: "/purchases-history",
        icon: <TbTableColumn />,
      },
    ],
  },
  {
    name: "Registros",
    links: [
      {
        name: "Unidades de venta",
        href: "/sale-units",
        icon: <TbBowlSpoon />,
      },
      {
        name: "Productos",
        href: "/products",
        icon: <AiOutlineProduct />,
      },
      {
        name: "Clientes",
        href: "/clients",
        icon: <TbUserPlus />,
      },
      {
        name: "Almacén",
        href: "/warehouse",
        icon: <TbBuildingWarehouse />,
      },
      {
        name: "Proveedores",
        href: "/suppliers",
        icon: <TbUserDollar />,
      },
    ],
  },
  {
    name: "Inventario",
    href: "/inventory",
    icon: <TbDatabase />,
  },
  {
    name: "Desperdicios",
    href: "/waste",
    icon: <TbTrash />,
  },
];

function NavBar() {
  const router = useRouter();
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleDropdownToggle = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <Navbar maxWidth="2xl">
      <NavbarContent justify="start">
        <NavbarBrand>
          <Image src="./aproillogo.webp" alt="Aproil" height={40} />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex sm:justify-stretch"
        justify="center"
      >
        {pages.map((page) =>
          page.links ? (
            <Dropdown
              key={page.name}
              isOpen={openDropdown === page.name}
              onOpenChange={() => handleDropdownToggle(page.name)}
            >
              <DropdownTrigger>
                <Button
                  endContent={
                    openDropdown === page.name ? (
                      <FaChevronUp />
                    ) : (
                      <FaChevronDown />
                    )
                  }
                  variant="light"
                  color="foreground"
                  size="lg"
                >
                  {page.icon}
                  {page.name}
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                {page.links.map((link) => (
                  <DropdownItem key={link.name}>
                    <Link
                      href={link.href}
                      color="foreground"
                      className="flex gap-2"
                    >
                      {link.icon}
                      {link.name}
                    </Link>
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          ) : (
            <NavbarItem key={page.name}>
              <Link href={page.href} color="foreground" className="flex gap-2">
                {page.icon}
                {page.name}
              </Link>
            </NavbarItem>
          )
        )}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Button
            variant="light"
            size="md"
            color="danger"
            isIconOnly
            onClick={() => {
              signOut();
              router.push("/auth/login");
            }}
          >
            <VscSignOut size={24} />
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

export default NavBar;
