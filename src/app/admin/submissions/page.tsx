// app/admin/submissions/page.tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  getAllSubmissions, 
  getPendingSubmissions, 
  getAcceptedSubmissions, 
  getRejectedSubmissions 
} from "@/lib/services";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import SubmissionsList from "@/components/custom/SubmissionsList";

export default async function SubmissionsPage() {
  const [all, pending, accepted, rejected] = await Promise.all([
    getAllSubmissions(),
    getPendingSubmissions(),
    getAcceptedSubmissions(),
    getRejectedSubmissions(),
  ]);

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestion des Soumissions</h1>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all">Toutes ({all.length})</TabsTrigger>
          <TabsTrigger value="pending">En attente ({pending.length})</TabsTrigger>
          <TabsTrigger value="accepted">Acceptées ({accepted.length})</TabsTrigger>
          <TabsTrigger value="rejected">Rejetées ({rejected.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <SubmissionsList submissions={all} />
        </TabsContent>

        <TabsContent value="pending">
          <SubmissionsList submissions={pending} />
        </TabsContent>

        <TabsContent value="accepted">
          <SubmissionsList submissions={accepted} />
        </TabsContent>

        <TabsContent value="rejected">
          <SubmissionsList submissions={rejected} />
        </TabsContent>
      </Tabs>
    </div>
  );
}