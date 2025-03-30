"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { FullResource } from "@/lib/types";

interface CategoryCount {
  name: string;
  value: number;
  id: string;
}

interface StatisticsSectionProps {
  topResources: FullResource[];
  categoryStats: CategoryCount[];
}

// Colors for the pie chart
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D", "#FFC658"];

const StatisticsSection: React.FC<StatisticsSectionProps> = ({ topResources, categoryStats }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {/* Top 5 Resources Table - Takes up 2/3 of the space */}
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Meilleures ressources</CardTitle>
          <CardDescription>Les ressources les plus aimé</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Titre</TableHead>
                <TableHead>Categorie</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Votes</TableHead>
                <TableHead className="text-right">Vues</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topResources.map((resource) => (
                <TableRow key={resource.id}>
                  <TableCell className="font-medium">{resource.title}</TableCell>
                  <TableCell>{resource.category.label}</TableCell>
                  <TableCell>{resource.type.label}</TableCell>
                  <TableCell className="text-right">{resource.upvotes.toString()}</TableCell>
                  <TableCell className="text-right">{resource.views.toString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Category Distribution Pie Chart - Takes up 1/3 of the space */}
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Distribution des ressources</CardTitle>
          <CardDescription>Ressources par catégories</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryStats}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {categoryStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} resources`, 'Count']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatisticsSection;