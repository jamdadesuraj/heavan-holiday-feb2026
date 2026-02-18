"use client";
import IconifyIcon from "@/components/wrappers/IconifyIcon";
import React from "react";
import { StatType } from "../data";
import { Card, CardBody, Col, Row } from "react-bootstrap";
import { useGetTourPackageCardsQuery } from "@/app/redux/api/tourManager/tourPackageApi";
import { useGetAllEnquiriesQuery } from "@/app/redux/api/enquiry/enquiryApi";
import { useGetAllBookingsQuery } from "@/app/redux/api/bookingsApi/bookingApi";
import { useGetTeamsQuery } from "@/app/redux/api/team/teamApi";
const StatCard = ({ count, icon, otherIcon, title }: StatType) => {
  return (
    <Card className="overflow-hidden">
      <CardBody>
        <h5
          className="text-muted fs-13 text-uppercase"
          title="Number of Orders"
        >
          {title}
        </h5>
        <div className="d-flex align-items-center gap-2 my-2 py-1">
          <div className="user-img fs-42 flex-shrink-0">
            <span className="avatar-title text-bg-primary rounded-circle fs-22">
              <IconifyIcon icon={icon} />
            </span>
          </div>
          <h3 className="mb-0 fw-bold">{count}</h3>
          <IconifyIcon
            icon={otherIcon}
            className="ms-auto display-1 position-absolute opacity-25 text-muted widget-icon"
          />
        </div>
      </CardBody>
    </Card>
  );
};

const Stat = () => {
  const {
    data: tourCardsData,
    isLoading: isTourCardsLoading,
    error: isTourCardsError,
  } = useGetTourPackageCardsQuery(undefined);
  const {
    data: enquiryData,
    isLoading: isEnquiryLoading,
    error: isEnquiryError,
  } = useGetAllEnquiriesQuery(undefined);
  const {
    data: bookingsData,
    isLoading: isBookingLoading,
    error: isBookingError,
  } = useGetAllBookingsQuery(undefined);
  const {
    data: teamData,
    isLoading: isTeamLoading,
    error: isTeamError,
  } = useGetTeamsQuery(undefined);
  if (
    isTourCardsLoading ||
    isEnquiryLoading ||
    isBookingLoading ||
    isTeamLoading
  ) {
    return <p>loading</p>;
  }
  if (isTourCardsError || isEnquiryError || isBookingError || isTeamError) {
    return <p>error</p>;
  }
  const statData: StatType[] = [
    {
      title: "Total Bookings",
      icon: "solar:ticket-bold-duotone",
      otherIcon: "solar:calendar-mark-bold-duotone",
      count: bookingsData?.data?.bookings.length || "1000",
    },
    {
      title: "Total Packages",
      icon: "solar:suitcase-bold-duotone",
      otherIcon: "solar:box-bold-duotone",
      count: tourCardsData?.data?.length || "1000",
    },
    {
      title: "Total Enquiries",
      icon: "solar:chat-round-dots-bold-duotone",
      otherIcon: "solar:letter-bold-duotone",
      count: enquiryData?.data?.length || "1000",
    },
    {
      title: "Total Team",
      icon: "solar:users-group-rounded-bold-duotone",
      otherIcon: "solar:user-id-bold-duotone",
      count: teamData?.data?.length || "1000",
    },
  ];
  return (
    <Row className="row-cols-xxl-4 row-cols-md-2 row-cols-1">
      {statData.map((item, idx) => (
        <Col key={idx}>
          <StatCard {...item} />
        </Col>
      ))}
    </Row>
  );
};

export default Stat;
