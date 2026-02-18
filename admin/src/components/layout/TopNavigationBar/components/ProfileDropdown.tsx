"use client";
import Image from "next/image";
import React from "react";
import avatar1 from "@/assets/images/users/avatar-1.jpg";
import IconifyIcon from "@/components/wrappers/IconifyIcon";
import {
  Dropdown,
  DropdownHeader,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "react-bootstrap";
import Link from "next/link";
import { useGetSettingsQuery } from "@/app/redux/api/settings/settingsApi";
const ProfileDropdown = () => {
  const { data, isLoading, error } = useGetSettingsQuery(undefined);
  if (isLoading) {
    return <p>loading</p>;
  }
  if (error) {
    return <p>error</p>;
  }
  return (
    <div className="topbar-item nav-user">
      <Dropdown>
        <DropdownToggle
          as={"a"}
          className="topbar-link drop-arrow-none px-2"
          data-bs-toggle="dropdown"
          data-bs-offset="0,19"
          type="button"
          aria-haspopup="false"
          aria-expanded="false"
        >
          <Image
            src={data?.data?.companyLogo || ""}
            width={32}
            height={32}
            className="rounded-circle me-lg-2 d-flex"
            alt="user-image"
          />
          <span className="d-lg-flex flex-column gap-1 d-none">
            <h5 className="my-0">Dhanoo K.</h5>
            <h6 className="my-0 fw-normal">Premium</h6>
          </span>
          <IconifyIcon
            icon="tabler:chevron-down"
            className="d-none d-lg-block align-middle ms-2"
          />
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <DropdownHeader className="noti-title">
            <h6 className="text-overflow m-0">Welcome !</h6>
          </DropdownHeader>

          <DropdownItem
            as={Link}
            href="/auth/login"
            className="active fw-semibold text-danger"
          >
            <IconifyIcon
              icon="tabler:logout"
              className="me-1 fs-17 align-middle"
            />
            <span className="align-middle">Sign Out</span>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default ProfileDropdown;
