// src/app/admin/dashboard/StatisticsSectionWrapper.tsx
import { getPopularResourcesByUpvotes, getResourcesByCategory_d } from "@/lib/services/resourceService";
import StatisticsSection from "./StatisticsSection";

export async function StatisticsSectionWrapper() {
  // Fetch top 5 resources by upvotes
  const topResources = await getPopularResourcesByUpvotes(5);
  
  // Fetch resources by category
  const categories = await getResourcesByCategory_d();
  
  const categoryStats = categories.map((item) => ({
    name: item.category.label,
    value: item.count,
    id: item.category.id
  }));

  return <StatisticsSection topResources={topResources} categoryStats={categoryStats} />;
}