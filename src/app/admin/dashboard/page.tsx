import React from "react";
import Page from "@/components/custom/Page";
import KPISection from "./KPISection";
import { StatisticsSectionWrapper } from "./StatisticsSectionWrapper";
const DashboardPage: React.FC = () => {
  return (
    <Page
      backButtonHref=""
    >
      {/* KPI Section */}
      <KPISection />

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Statistics</h2>
        <StatisticsSectionWrapper />
      </div>
      

      {/* Placeholder Sections */}
      {/* <section className="mb-8 bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Resources</h2>
        <p className="text-gray-600">Recent Resources Table Placeholder</p>
      </section>

      <section className="mb-8 bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Submissions</h2>
        <p className="text-gray-600">Recent Submissions Placeholder</p>
      </section>

      <section className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Top Resources of All Time</h2>
        <p className="text-gray-600">Top Resources Placeholder</p>
      </section> */}
    </Page>
  );
};

export default DashboardPage;