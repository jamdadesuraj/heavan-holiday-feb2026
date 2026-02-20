"use client";
import { currentYear } from "@/context/constants";
import Image from "next/image";
import { Card, Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Cookies from "js-cookie";
import TextFormInput from "@/components/form/TextFormInput";
import { useGetSettingsQuery } from "@/app/redux/api/settings/settingsApi";
import { useLoginAdminMutation } from "@/app/redux/api/adminApi/authApi";

interface ToastState {
  message: string;
  type: "success" | "error";
}

const Login = () => {
  const { data, isLoading, error } = useGetSettingsQuery(undefined);
  const [loginAdmin, { isLoading: isLoginLoading }] = useLoginAdminMutation();
  const [toast, setToast] = useState<ToastState | null>(null);
  const router = useRouter();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const showToast = (message: string, type: "success" | "error"): void => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 1000);
  };

  if (isLoading) return <p>loading</p>;
  if (error) return <p>error</p>;

  const onSubmit = async (data: any) => {
    try {
      const res = await loginAdmin(data).unwrap();
      Cookies.set("adminToken", res.data.token, { expires: 7 });
      showToast("Login successful! Redirecting...", "success");
      router.push("/dashboard");
    } catch (error: any) {
      const message = error?.data?.message || "Login failed";
      if (message.includes("Invalid email or password")) {
        showToast("Invalid email or password", "error");
      } else if (message.includes("not found")) {
        showToast("Admin not found", "error");
      } else {
        showToast(message, "error");
      }
    }
  };

  return (
    <div className="auth-bg d-flex min-vh-100 justify-content-center align-items-center">
      <Row className="g-0 justify-content-center w-100 m-xxl-5 px-xxl-4 m-3">
        <Col xl={4} lg={5} md={6}>
          <Card className="overflow-hidden text-center h-100 p-xxl-4 p-3 mb-0">
            {/* Toast */}
            {toast && (
              <div
                className={`position-fixed top-0 start-50 translate-middle-x mt-3 px-4 py-2 rounded text-white text-sm fw-medium z-3 ${
                  toast.type === "success" ? "bg-success" : "bg-danger"
                }`}
              >
                {toast.message}
              </div>
            )}

            <a href="/" className="auth-brand mb-4">
              <Image
                src={data?.data?.companyLogo}
                alt="dark logo"
                height={26}
                width={26}
                className="logo-dark"
              />
              <Image
                src={data?.data?.companyLogo}
                alt="logo light"
                height={26}
                width={26}
                className="logo-light"
              />
            </a>
            <h4 className="fw-semibold mb-2 fs-18">Log in to your account</h4>
            <p className="text-muted mb-4">
              Enter your email address and password to access admin panel.
            </p>
            <form
              onSubmit={handleSubmit(onSubmit)}
              action="/"
              className="text-start mb-3"
            >
              <div className="mb-3">
                <TextFormInput
                  control={control}
                  name="email"
                  placeholder="Enter your email"
                  className="bg-light bg-opacity-50 border-light py-2"
                  label="Email"
                />
              </div>
              <div className="mb-3">
                <TextFormInput
                  control={control}
                  name="password"
                  placeholder="Enter your password"
                  className="bg-light bg-opacity-50 border-light py-2"
                  label="Password"
                />
              </div>
              <div className="d-grid">
                <button
                  disabled={isLoginLoading}
                  className="btn btn-primary fw-semibold"
                  type="submit"
                >
                  {isLoginLoading ? "Logging in..." : "Login"}
                </button>
              </div>
            </form>
            <p className="mt-auto mb-0">
              {currentYear} © HeavenHoliday - By{" "}
              <span className="fw-bold text-decoration-underline text-uppercase text-reset fs-12">
                HeavenHoliday
              </span>
            </p>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
