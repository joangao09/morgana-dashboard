"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CollapseOne from "@/components/Collapses/CollapseOne";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import TableOne from "@/components/Tables/TableOne";
import CollapseTwo from "@/components/Collapses/CollapseTwo";

const TablesPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Tables - Alarm" />
      <div className="flex flex-col gap-10">
        <TableOne />
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
