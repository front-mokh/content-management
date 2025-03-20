// app/admin/submissions/[id]/page.tsx
import { getSubmissionById } from "@/lib/services";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SubmissionActions from "@/components/submission/SubmissionActions";

export default async function SubmissionDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const submission = await getSubmissionById(params.id);

  if (!submission) {
    notFound();
  }

  return (
    <div className="container py-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Détails de la soumission</h1>
        <Link href="/admin/submissions" passHref>
          <Button variant="outline">Retour</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>{submission.author}</CardTitle>
              <CardDescription>
                Soumis {formatDistanceToNow(new Date(submission.createdAt), {
                  addSuffix: true,
                  locale: fr,
                })}
              </CardDescription>
            </div>
            <div>
              {submission.status === "PENDING" && (
                <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-sm">
                  En attente
                </span>
              )}
              {submission.status === "ACCEPTED" && (
                <span className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm">
                  Acceptée
                </span>
              )}
              {submission.status === "REJECTED" && (
                <span className="px-3 py-1 rounded-full bg-red-100 text-red-800 text-sm">
                  Rejetée
                </span>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Informations personnelles</h3>
              <div className="mt-2 space-y-2">
                <p>
                  <span className="font-medium">Nom complet:</span> {submission.firstName} {submission.lastName}
                </p>
                <p>
                  <span className="font-medium">Email:</span> {submission.email}
                </p>
                {submission.phone && (
                  <p>
                    <span className="font-medium">Téléphone:</span> {submission.phone}
                  </p>
                )}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Document</h3>
              <div className="mt-2 space-y-2">
                <p>
                  <span className="font-medium">Auteur:</span> {submission.author}
                </p>
                <div>
                  <span className="font-medium">Fichier:</span>{" "}
                  
                    href={submission.filepath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Voir le document
                  </a>
                </div>
              </div>
            </div>
          </div>

          {submission.message && (
            <div>
              <h3 className="text-sm font-medium text-gray-500">Message</h3>
              <p className="mt-2 whitespace-pre-wrap">{submission.message}</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <SubmissionActions submission={submission} />
        </CardFooter>
      </Card>
    </div>
  );
}