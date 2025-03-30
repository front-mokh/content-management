import React from "react";
import KPICard from "@/components/KPICard";
import { Book, Inbox, Clock } from "lucide-react";
import { getPublishedResources, getUnpublishedResources } from "@/lib/services";
import { getPendingSubmissions } from "@/lib/services";
const KPISection: React.FC = async  () => {
  // Mock data (replace with Prisma queries)
  const publishedResources = await getPublishedResources();
  const unpublishedResources = await getUnpublishedResources();
  const pendingSubmissions = await getPendingSubmissions();
  const totalResources = publishedResources.length+unpublishedResources.length;
  const nonpublishedRessources = unpublishedResources.length;
  const pendingSubmissionsNumber = pendingSubmissions.length;

  const kpis = [
    {
      title: "Total Resources",
      value: totalResources,
     
      icon: <Book className="w-6 h-6" />,
      hoverColor: "bg-teal-500"
    },
    {
      title: "Unpublished Resources",
      value: nonpublishedRessources,
      icon: <Inbox className="w-6 h-6" />,
      trend: "neutral",
      hoverColor: "bg-orange-500"
    },
    {
      title: "Pending Submissions",
      value: pendingSubmissionsNumber,
      icon: <Clock className="w-6 h-6" />,
      hoverColor: "bg-purple-500"
    }
  ];

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-2xl font-bold text-gray-800">
          Indicateurs de Performances
        </h4>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {kpis.map((kpi, index) => (
          <KPICard
            key={index}
            title={kpi.title}
            value={kpi.value}
            subtext={kpi.subtext}
            icon={kpi.icon}
            hoverColor={kpi.hoverColor}
          />
        ))}
      </div>
    </section>
  );
};

export default KPISection;