"use client";
import { currentYear } from "@/context/constants";
import Image from "next/image";
import { Card, Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import TextFormInput from "@/components/form/TextFormInput";
import { useGetSettingsQuery } from "@/app/redux/api/settings/settingsApi";
import { useLoginAdminMutation } from "@/app/redux/api/adminApi/authApi";

const Login = () => {
  const { data, isLoading, error } = useGetSettingsQuery(undefined);
  const [loginAdmin, { isLoading: isLoginLoading }] = useLoginAdminMutation();
  const router = useRouter();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  if (isLoading) return <p>loading</p>;
  if (error) return <p>error</p>;

  const onSubmit = async (data: any) => {
    try {
      const res = await loginAdmin(data).unwrap();
      localStorage.setItem("adminToken", res.data.token);
      router.push("/dashboard");
    } catch (error: any) {
      console.error(error?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-bg d-flex min-vh-100 justify-content-center align-items-center">
      <Row className="g-0 justify-content-center w-100 m-xxl-5 px-xxl-4 m-3">
        <Col xl={4} lg={5} md={6}>
          <Card className="overflow-hidden text-center h-100 p-xxl-4 p-3 mb-0">
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
