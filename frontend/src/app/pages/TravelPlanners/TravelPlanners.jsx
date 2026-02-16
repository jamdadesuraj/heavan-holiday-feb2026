"use client";
import Breadcrumb from "@/app/components/Breadcum";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useGetAllBooksQuery } from "store/booksApi/booksApi";

const TravelPlanners = () => {
  const { data, isLoading, error } = useGetAllBooksQuery();

  // SKELETON LOADER
  if (isLoading) {
    return (
      <>
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Travel Planners", href: "/travel-planners" },
          ]}
        />

        <section className="py-10 px-4 bg-gray-100">
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center shadow-lg rounded-xl overflow-hidden bg-white animate-pulse"
              >
                <div className="w-full h-60 bg-gray-200"></div>
                <div className="p-4 w-full">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-600 py-10">Failed to load books</p>
    );
  }

  const books = data?.data || [];

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Travel Planners", href: "/travel-planners" },
        ]}
      />

      <section className="container mx-auto py-10 px-4 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {books.map((book) => (
              <Link
                href={`/travel-planner-details/${book._id}`}
                key={book._id}
                className="flex flex-col items-center text-center shadow-lg rounded-xl overflow-hidden bg-white hover:shadow-2xl transition"
              >
                <Image
                  src={book.coverImg}
                  alt={book.title}
                  width={400}
                  height={500}
                  className="object-cover"
                />
                <div className="p-4">
                  <span className="text-blue-600 font-medium hover:underline">
                    {book.title}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default TravelPlanners;
