import Image from "next/image";
import { useGetSettingsQuery } from "@/app/redux/api/settings/settingsApi";
const LogoBox = () => {
  const { data, isLoading, error } = useGetSettingsQuery(undefined);
  if (isLoading) {
    return <p>loading</p>;
  }
  if (error) {
    return <p>error</p>;
  }
  return (
    <a href="/" className="logo">
      <span className="logo-light">
        <span className="logo-lg">
          <Image
            width={109}
            height={32}
            src={data?.data?.companyLogo}
            alt="logo"
          />
        </span>
        <span className="logo-sm">
          <Image
            width={19}
            height={24}
            src={data?.data?.companyLogo}
            alt="small logo"
          />
        </span>
      </span>
      <span className="logo-dark">
        <span className="logo-lg">
          <Image
            width={109}
            height={22}
            src={data?.data?.companyLogo}
            alt="dark logo"
          />
        </span>
        <span className="logo-sm">
          <Image
            width={19}
            height={24}
            src={data?.data?.companyLogo}
            alt="small logo"
          />
        </span>
      </span>
    </a>
  );
};

export default LogoBox;
