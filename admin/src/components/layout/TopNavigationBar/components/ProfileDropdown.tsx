"use client";
import Image from "next/image";
import React, { useState } from "react";
import IconifyIcon from "@/components/wrappers/IconifyIcon";
import {
  Dropdown,
  DropdownHeader,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useGetSettingsQuery } from "@/app/redux/api/settings/settingsApi";
import ChangePasswordModal from "@/components/change-password/change-passwordModal";
import { useGetAdminQuery } from "@/app/redux/api/adminApi/authApi";
interface ToastState {
  message: string;
  type: "success" | "error";
}

const ProfileDropdown = () => {
  const { data, isLoading, error } = useGetSettingsQuery(undefined);
  const {
    data: admin,
    isLoading: adminLoading,
    error: adminError,
  } = useGetAdminQuery(undefined);
  console.log("admin", admin);
  const [showChangePassword, setShowChangePassword] = useState<boolean>(false);
  const [toast, setToast] = useState<ToastState | null>(null);
  const router = useRouter();

  const showToast = (message: string, type: "success" | "error"): void => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 1000);
  };

  if (isLoading || adminLoading) {
    return <p>loading</p>;
  }
  if (error || adminError) {
    return <p>error</p>;
  }

  const handleSignOut = (): void => {
    Cookies.remove("adminToken");
    showToast("Signed out successfully!", "success");
    router.push("/auth/login");
  };

  return (
    <>
      {/* Toast */}
      {toast && (
        <div
          className={`position-fixed top-0 start-50 translate-middle-x mt-3 px-4 py-2 rounded text-white fw-medium z-3 ${
            toast.type === "success" ? "bg-success" : "bg-danger"
          }`}
        >
          {toast.message}
        </div>
      )}

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
              <h5 className="my-0">{admin?.data?.username || ""}</h5>
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
              className="fw-semibold"
              onClick={() => setShowChangePassword(true)}
            >
              <IconifyIcon
                icon="tabler:lock"
                className="me-1 fs-17 align-middle"
              />
              <span className="align-middle">Change Password</span>
            </DropdownItem>

            <DropdownItem
              className="active fw-semibold text-danger"
              onClick={handleSignOut}
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

      {/* Change Password Modal */}
      <ChangePasswordModal
        isOpen={showChangePassword}
        onClose={() => setShowChangePassword(false)}
      />
    </>
  );
};

export default ProfileDropdown;
