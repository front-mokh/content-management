"use client";

import {
  FileText,
  User,
  Mail,
  Phone,
  Download,
  AlertCircle,
  UserCheck,
  MessageSquare,
  Eye,
} from "lucide-react";
import DeleteAction from "./DeleteAction";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Submission } from "@prisma/client";
import InformationCard from "./InformationCard";
import TwoColumns from "./TwoColumns";
import { formatDate } from "@/lib/utils";
import Page from "./Page";

import ApproveSubmissionAction from "@/app/admin/submissions/ApproveSubmissionAction";
import RejectSubmissionAction from "@/app/admin/submissions/RejectSubmissionAction";
import DeleteSubmissionDialog from "@/app/admin/submissions/DeleteSubmissionDialog";

const getSubmissionStatusLabel = (status: string) => {
  switch (status) {
    case "PENDING":
      return "En attente";
    case "APPROVED":
      return "Approuvée";
    case "REJECTED":
      return "Rejetée";
    case "CONVERTED":
        return "convertis";
    default:
      return status;
  }
};

const getSubmissionStatusColor = (status: string) => {
  switch (status) {
    case "PENDING":
      return "bg-yellow-100 text-yellow-800";
    case "APPROVED":
      return "bg-green-100 text-green-800";
    case "REJECTED":
      return "bg-red-100 text-red-800";
    case "CONVERTED":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function SubmissionDetailsPage({
  submission,
}: {
  submission: Submission;
}) {
  const handlePreview = (e: React.MouseEvent, path: string) => {
    e.stopPropagation();
    window.open(path, "_blank");
  };

  const getFileExtension = (path: string) => {
    const fileName = path.split("/").pop() || "";
    return fileName.split(".").pop()?.toUpperCase() || "FILE";
  };

  return (
    <Page
      title="Détaille de soumission"
    //   title={`${submission.lastName.toUpperCase()} ${submission.firstName}`}
      backButtonHref="/admin/submissions"
      actions={
        <div className="flex gap-2">
          {submission.status === "PENDING" && (
            <>
              <RejectSubmissionAction submission={submission} />
              <ApproveSubmissionAction submission={submission} />
            </>
          )}
          <DeleteSubmissionDialog
            trigger={<DeleteAction />}
            submission={submission}
          />
        </div>
      }
    >
      <div className="flex items-center gap-3 mb-4">
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${getSubmissionStatusColor(submission.status)}`}>
          {getSubmissionStatusLabel(submission.status)}
        </div>
        <p className="text-sm text-muted-foreground">
          Soumis le {formatDate(submission.createdAt)}
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Informations</CardTitle>
          <CardDescription>
            Coordonnées et détails de la soumission
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TwoColumns>
          <InformationCard
              icon={User}
              label="Nom"
              value={submission.lastName.toUpperCase()}
            />
            <InformationCard
              icon={User}
              label="Prénom"
              value={submission.firstName}
            />
            <InformationCard
              icon={Mail}
              label="Email"
              value={submission.email}
            />
            <InformationCard
              icon={Phone}
              label="Téléphone"
              value={submission.phone || "Non renseigné"}
            />
            <InformationCard
              icon={UserCheck}
              label="Auteur"
              value={submission.author}
            />
            <InformationCard
              icon={AlertCircle}
              label="Statut"
              value={getSubmissionStatusLabel(submission.status)}
            />
          </TwoColumns>

          {submission.message && (
            <div className="mt-6">
              <div className="flex items-center mb-2">
                <MessageSquare className="h-4 w-4 mr-2 text-muted-foreground" />
                <h3 className="text-md font-medium">Message</h3>
              </div>
              <div className="p-4 bg-gray-50 rounded-md border">
                <p className="text-sm">{submission.message}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Document</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 rounded-lg p-4 border border-dashed flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center">
              <div className="h-14 w-14 rounded bg-blue-100 text-blue-700 flex flex-col items-center justify-center mr-4">
                <FileText className="h-6 w-6 mb-1" />
                <span className="text-[10px] font-bold">
                  {getFileExtension(submission.filepath)}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium">
                  {submission.filepath.split("-").pop()}
                </p>
                <p className="text-xs text-muted-foreground">
                  Soumis le {formatDate(submission.createdAt)}
                </p>
              </div>
            </div>
            <div className="flex space-x-2 mt-2 sm:mt-0">
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => handlePreview(e, submission.filepath)}
                className="flex-1 sm:flex-none"
              >
                <Eye className="h-4 w-4 mr-2" />
                Aperçu
              </Button>
              <a
                href={submission.filepath}
                target="_blank"
                download
                className="flex-1 sm:flex-none inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50"
              >
                <Download className="h-4 w-4 mr-2" />
                Télécharger
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </Page>
  );
}