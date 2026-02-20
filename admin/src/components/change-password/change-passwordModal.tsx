"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useChangePasswordMutation } from "@/app/redux/api/adminApi/authApi";

interface ToastState {
  message: string;
  type: "success" | "error";
}

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChangePasswordModal = ({ isOpen, onClose }: ChangePasswordModalProps) => {
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [toast, setToast] = useState<ToastState | null>(null);

  const [changePassword] = useChangePasswordMutation();
  const router = useRouter();

  const isFormValid: boolean = !!(
    currentPassword &&
    newPassword &&
    confirmPassword
  );

  const showToast = (message: string, type: "success" | "error"): void => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const resetForm = (): void => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleSubmit = async (): Promise<void> => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      showToast("Please fill all fields", "error");
      return;
    }
    if (newPassword.length < 6) {
      showToast("New password must be at least 6 characters", "error");
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast("Passwords do not match", "error");
      return;
    }
    if (currentPassword === newPassword) {
      showToast(
        "New password must be different from current password",
        "error",
      );
      return;
    }

    try {
      setLoading(true);
      await changePassword({
        currentPassword,
        newPassword,
        confirmPassword,
      }).unwrap();
      showToast(
        "Password changed successfully! Redirecting to login...",
        "success",
      );
      resetForm();
      setTimeout(() => {
        onClose();
        router.push("/auth/login");
      }, 2000);
    } catch (error: any) {
      const message: string =
        error?.data?.message || "Failed to change password";
      if (message.includes("incorrect")) {
        showToast("Current password is incorrect", "error");
      } else {
        showToast(message, "error");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

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

      {/* Backdrop */}
      <div
        className="modal-backdrop fade show"
        onClick={() => {
          resetForm();
          onClose();
        }}
      />

      {/* Modal */}
      <div className="modal fade show d-block" tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            {/* Header */}
            <div className="modal-header">
              <h5 className="modal-title">Change Password</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => {
                  resetForm();
                  onClose();
                }}
              />
            </div>

            {/* Body */}
            <div className="modal-body">
              <p className="text-muted mb-4">
                Enter your current password and set a new one
              </p>

              <div className="mb-3">
                <label className="form-label fw-medium">
                  Current Password <span className="text-danger">*</span>
                </label>
                <input
                  type="password"
                  placeholder="Enter current password"
                  value={currentPassword}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setCurrentPassword(e.target.value)
                  }
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-medium">
                  New Password <span className="text-danger">*</span>
                </label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setNewPassword(e.target.value)
                  }
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-medium">
                  Confirm Password <span className="text-danger">*</span>
                </label>
                <input
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setConfirmPassword(e.target.value)
                  }
                  className="form-control"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  resetForm();
                  onClose();
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary fw-semibold"
                onClick={handleSubmit}
                disabled={!isFormValid || loading}
              >
                {loading ? "Updating..." : "Change Password"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePasswordModal;
