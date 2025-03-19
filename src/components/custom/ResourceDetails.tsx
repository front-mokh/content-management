"use client";

import {
  FileText,
  ThumbsUp,
  Eye,
  Download,
  UserCheck,
  Award,
  AlertCircle,
  Clock,
  Calendar,
  BookOpen,
  Tag,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { FullResource } from "@/lib/types";
import InformationCard from "./InformationCard";
import { getResourceStatusLabel } from "@/utils/getResourceStatusLabel";
import TwoColumns from "./TwoColumns";
import { formatDate } from "@/lib/utils";
import Page from "./Page";
import UpdateButton from "./UpdateButton";
import DeleteResourceDialog from "./DeleteResourceDialog";
import DeleteButton from "./DeleteButton";
import { useRouter } from "next/navigation";

export default function ResourceDetailsPage({
  resource,
}: {
  resource: FullResource;
}) {
  const router = useRouter();
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
      title="Détails de la ressource"
      backButtonHref="/admin/resources"
      actions={
        <div className="flex gap-2">
          <DeleteResourceDialog
            trigger={<DeleteButton label="Supprimer" />}
            resource={resource}
            onDelete={() => {
              router.push("/admin/resources");
            }}
          />
          <UpdateButton
            label="Mettre à jour"
            href={`/admin/resources/${resource.id}/edit`}
          />
        </div>
      }
    >
      <Card>
        <CardHeader>
          <CardTitle>Détails de la ressource</CardTitle>
          <CardDescription>
            Aperçu complet et informations essentielles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-xl font-semibold">{resource.title}</p>
          <p className="text-muted-foreground">{resource.description}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Classification et information</CardTitle>
          <CardDescription>
            Catégorisation, statut et attribution de la ressource
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TwoColumns>
            {/* Classification Group */}
            <InformationCard
              icon={BookOpen}
              label="Catégorie"
              value={resource.category.label}
            />
            <InformationCard
              icon={Tag}
              label="Type"
              value={resource.type.label}
            />
            <InformationCard
              icon={AlertCircle}
              label="Statut"
              value={getResourceStatusLabel(resource.status)}
            />

            {/* People Group */}
            <InformationCard
              icon={UserCheck}
              label="Responsable"
              value={
                resource.handler
                  ? resource.handler.lastName.toUpperCase() +
                    " " +
                    resource.handler.firstName
                  : "Non renseigné"
              }
            />
            <InformationCard
              icon={Award}
              label="Auteur"
              value={
                resource.author
                  ? resource.author.lastName.toUpperCase() +
                    " " +
                    resource.author.firstName
                  : "Non renseigné"
              }
            />

            {/* Dates Group */}
            <InformationCard
              icon={Clock}
              label="Date de création"
              value={formatDate(resource.createdAt)}
            />
            <InformationCard
              icon={Clock}
              label="Dernière mise à jour"
              value={formatDate(resource.updatedAt)}
            />
            {resource.status === "PUBLISHED" && (
              <InformationCard
                icon={Calendar}
                label="Date de publication"
                value={formatDate(resource.publishedAt!)}
              />
            )}
          </TwoColumns>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Statistiques d&apos;utilisation</CardTitle>
          <CardDescription>
            Mesures de popularité et d&apos;appréciation par les utilisateurs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="grow p-4 rounded-lg border">
              <div className="flex items-center h-full">
                <div className="p-2 bg-blue-100 rounded-md mr-3">
                  <Eye className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm text-blue-700 font-medium">
                    Total des vues
                  </div>
                  <div className="text-2xl font-bold">{resource.views}</div>
                </div>
              </div>
            </div>

            <div className="grow p-4 rounded-lg border">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-md mr-3">
                  <ThumbsUp className="h-8 w-8 text-green-700" />
                </div>
                <div>
                  <div className="text-sm text-green-700 font-medium">
                    Appréciations
                  </div>
                  <div className="text-2xl font-bold">{resource.upvotes}</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Fichier et téléchargement</CardTitle>
          <CardDescription>
            Options pour consulter et obtenir cette ressource
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50  rounded-lg p-4 border border-dashed flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-12 w-12 rounded bg-blue-100 text-blue-700 flex flex-col items-center justify-center mr-4">
                <FileText className="h-5 w-5" />
                <span className="text-[10px] font-bold">
                  {getFileExtension(resource.path)}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium">
                  {resource.path.split("-").pop()}
                </p>
                <p className="text-xs text-gray-500">
                  Mis à jour le {formatDate(resource.updatedAt)}
                </p>
              </div>
            </div>
            <div className="space-x-2">
              <Button
                variant={"outline"}
                onClick={(e) => handlePreview(e, resource.path)}
              >
                <Eye className="h-4 w-4 mr-1" />
                Aperçu
              </Button>
              <a
                href={resource.path}
                target="_blank"
                download
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Download className="h-4 w-4 mr-1" />
                Télécharger
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </Page>
  );
}
