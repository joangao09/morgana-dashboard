import { BRAND } from "@/types/brand";
import Image from "next/image";
import React, { useState, useMemo } from "react";
import { Tag } from "antd";
type AlarmData = {
  id: string;
  machineName: string;
  alarmText: string;
  state: string;
  duration: string | null;
  timestamp: string;
  timestampFrom: string;
};

const headers = [
  "ID",
  "Machine Name",
  "Alarm Text",
  "Timestamp",
  "Timestamp From",
  "Duration",
  "Active",
];

const alarmData: AlarmData[] = [
  {
    id: "36489",
    machineName: "Portal Bottle",
    alarmText: "PortalBottle | W001.001 Synchronization requested",
    state: "+",
    duration: null,
    timestamp: "2024-07-22 23:24:29.153137",
    timestampFrom: "2024-07-23 02:03:51.162618",
  },
  {
    id: "36490",
    machineName: "Portal Bottle",
    alarmText:
      "PortalBottle | M001.010 There is an active DriveIn request from an external robot [LinearTrack]",
    state: "+",
    duration: null,
    timestamp: "2024-07-22 23:24:29.331655",
    timestampFrom: "2024-07-23 02:01:31.278476",
  },
  {
    id: "36491",
    machineName: "Decapper 1",
    alarmText: "Decapper1 | W001.001 Synchronization requested",
    state: "+",
    duration: null,
    timestamp: "2024-07-22 23:24:29.378975",
    timestampFrom: "2024-07-23 02:03:57.108641",
  },
  {
    id: "36501",
    machineName: "Decapper 2",
    alarmText: "Decapper2 | W001.001 Synchronization requested",
    state: "-",
    duration: "1.48444",
    timestamp: "2024-07-23 00:53:34.535943",
    timestampFrom: "2024-07-23 01:14:47.351196",
  },
  {
    id: "36489",
    machineName: "Portal Bottle",
    alarmText: "PortalBottle | W001.001 Synchronization requested",
    state: "+",
    duration: null,
    timestamp: "2024-07-22 23:24:29.153137",
    timestampFrom: "2024-07-23 02:03:51.162618",
  },
  {
    id: "100000",
    machineName: "Portal Bottle",
    alarmText:
      "PortalBottle | M001.010 There is an active DriveIn request from an external robot [LinearTrack]",
    state: "+",
    duration: null,
    timestamp: "2024-07-22 23:24:29.331655",
    timestampFrom: "2024-07-23 02:01:31.278476",
  },
  {
    id: "00002",
    machineName: "Decapper 1",
    alarmText: "Decapper1 | W001.001 Synchronization requested",
    state: "+",
    duration: null,
    timestamp: "2024-07-22 23:24:29.378975",
    timestampFrom: "2024-07-23 02:03:57.108641",
  },
  {
    id: "36501",
    machineName: "Decapper 2",
    alarmText: "Decapper2 | W001.001 Synchronization requested",
    state: "-",
    duration: "1.48444",
    timestamp: "2024-07-23 00:53:34.535943",
    timestampFrom: "2024-07-23 01:14:47.351196",
  },
];
const TableOne = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 4; // Number of rows per page

  // Pagination logic
  const totalPages = Math.ceil(alarmData.length / rowsPerPage);
  const paginatedData = alarmData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };
  return (
    <div className="rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="flex flex-col">
        <div className="grid grid-cols-5 sm:grid-cols-7">
          {/* Mapping all headers */}
          {headers.map((header, index) => (
            <div
              key={index}
              className={`px-2 pb-3.5 ${index >= 2 ? "text-center" : ""}`}
            >
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                {header}
              </h5>
            </div>
          ))}
        </div>

        {/* Table Body with scrolling */}
        <div className="max-h-150 overflow-x-auto overflow-y-auto">
          {paginatedData.map((alarm, index) => (
            <div
              className={`grid grid-cols-5 border-b border-stroke dark:border-dark-3 sm:grid-cols-7`}
              key={alarm.id || index}
            >
              <div className="flex items-center px-2 py-4">
                <p className="font-medium text-dark dark:text-white">
                  {alarm.id}
                </p>
              </div>
              <div className="flex items-center px-2 py-4">
                <p className="font-medium text-dark dark:text-white">
                  {alarm.machineName}
                </p>
              </div>
              <div className="flex items-center justify-center px-2 py-4">
                <p className="font-medium text-dark dark:text-white">
                  {alarm.alarmText}
                </p>
              </div>
              <div className="flex items-center justify-center px-2 py-4">
                <p className="font-medium text-dark dark:text-white">
                  {alarm.timestamp}
                </p>
              </div>
              <div className="flex items-center justify-center px-2 py-4">
                <p className="font-medium text-dark dark:text-white">
                  {alarm.timestampFrom}
                </p>
              </div>
              <div className="flex items-center justify-center px-2 py-4">
                <p className="font-medium text-dark dark:text-white">
                  {alarm.duration || "N/A"}
                </p>
              </div>
              <div className="flex items-center justify-center px-2 py-4">
                <Tag
                  color={alarm.state === "+" ? "green" : "red"}
                  style={{ fontSize: "14px", padding: "5px 10px" }}
                >
                  {alarm.state === "+" ? "Active" : "Processing"}
                </Tag>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="mt-4 flex items-center justify-between">
          <button
            className={`rounded-md px-4 py-2 text-sm font-medium ${
              currentPage === 1
                ? "cursor-not-allowed bg-gray-300 text-gray-500"
                : "bg-blue-500 text-white"
            }`}
            onClick={handlePrev}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <p className="text-sm font-medium">
            Page {currentPage} of {totalPages}
          </p>
          <button
            className={`rounded-md px-4 py-2 text-sm font-medium ${
              currentPage === totalPages
                ? "cursor-not-allowed bg-gray-300 text-gray-500"
                : "bg-blue-500 text-white"
            }`}
            onClick={handleNext}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableOne;
