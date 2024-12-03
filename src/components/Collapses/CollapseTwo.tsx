import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

type Row = {
  id: string;
  breakdown: string;
  duration: string;
  date: string;
};

type GroupedData = {
  group: string;
  rows: Row[];
};

const data: GroupedData[] = [
  {
    group: "Demo_PREP",
    rows: [
      {
        id: "1",
        breakdown: "B1 Emergency stop activated",
        duration: "4m 5s",
        date: "03/08/2020 11:30",
      },
      {
        id: "2",
        breakdown: "B2 Overload triggered",
        duration: "15m",
        date: "03/08/2020 11:31",
      },
    ],
  },
];
const CollapseTwo: React.FC = () => {
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  const toggleGroup = (group: string) => {
    setOpenGroup((prev) => (prev === group ? null : group));
  };
  return (
    <div className="p-4">
      <table className="min-w-full border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Breakdown
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Group
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Duration
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Start Time
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              End Time
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((groupData) => (
            <React.Fragment key={groupData.group}>
              {/* Group Row */}
              <tr className="bg-gray-100">
                <td
                  className="border border-gray-300 px-4 py-2 text-left font-bold"
                  colSpan={5}
                >
                  <IconButton
                    aria-label="expand group"
                    size="small"
                    onClick={() => toggleGroup(groupData.group)}
                  >
                    {openGroup === groupData.group ? (
                      <KeyboardArrowUpIcon />
                    ) : (
                      <KeyboardArrowDownIcon />
                    )}
                  </IconButton>
                  {groupData.group}
                </td>
              </tr>

              {/* Sub-rows */}
              {openGroup === groupData.group &&
                groupData.rows.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">
                      {row.breakdown}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {groupData.group}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {row.duration}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {row.date}
                    </td>
                    <td className="border border-gray-300 px-4 py-2"></td>
                  </tr>
                ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CollapseTwo;
