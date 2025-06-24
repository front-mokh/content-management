"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Author, Resource } from "@prisma/client";
import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteAuthor } from "@/lib/services/authorService";
import { CalendarIcon, BookOpen, Pencil, Trash2 } from "lucide-react";
import { formatDistance } from "date-fns";
import { fr } from "date-fns/locale";
import { AuthorCategory } from "@/utils/authorUtils";
import CategoryTag from "@/components/custom/CategoryTag";

interface ViewAuthorPageProps {
  author: Author;
  resources: Resource[];
}

export default function ViewAuthorPage({ author, resources }: ViewAuthorPageProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteAuthor(author.id);
      toast.success("Auteur supprimé avec succès");
      router.push("/admin/authors");
      router.refresh();
    } catch (error) {
      console.error("Error deleting author:", error);
      toast.error("Erreur lors de la suppression de l'auteur");
    } finally {
      setIsDeleting(false);
    }
  };

  // Format the date for display
  const formattedCreatedAt = formatDistance(
    new Date(author.createdAt),
    new Date(),
    { addSuffix: true, locale: fr }
  );

  return (
    <div className="space-y-6">
      {/* Author Card */}
      <Card className="overflow-hidden">
        <CardHeader className="bg-muted/50">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-3">
                <CardTitle className="text-2xl font-bold">
                  {author.firstName} {author.lastName}
                </CardTitle>
                <CategoryTag category={author.category as AuthorCategory} />
              </div>
              <CardDescription className="mt-2 flex items-center gap-1">
                <CalendarIcon className="h-4 w-4" />
                Ajouté {formattedCreatedAt}
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push(`/admin/authors/${author.id}/edit`)}
              >
                <Pencil className="h-4 w-4 mr-2" />
                Modifier
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Supprimer
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Êtes-vous certain ?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Cette action est irréversible et supprimera définitivement l&apos;auteur 
                      &quot;{author.firstName} {author.lastName}&quot; ainsi que toutes ses associations 
                      avec les ressources.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      onClick={handleDelete}
                      disabled={isDeleting}
                    >
                      {isDeleting ? "Suppression..." : "Supprimer"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <div className="space-y-8">
            {/* Author Image and Details */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* Author Image */}
              <div className="flex flex-col space-y-4">
                <div className="border rounded-lg overflow-hidden shadow-sm bg-background">
                  {author.imagePath ? (
                    <div className="relative aspect-square w-full">
                      <Image
                        src={`/api${author.imagePath}`}
                        alt={`${author.firstName} ${author.lastName}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        priority
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="aspect-square w-full flex items-center justify-center bg-muted">
                      <div className="text-4xl font-bold text-muted-foreground">
                        {author.firstName[0]}{author.lastName[0]}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Author Details */}
              <div className="md:col-span-2 space-y-6">
                <div>
                  <h3 className="text-lg font-medium">Informations</h3>
                  <div className="mt-3 grid grid-cols-1 gap-3">
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">Nom complet</span>
                      <p className="mt-1">
                        {author.firstName} {author.lastName}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">Identifiant</span>
                      <p className="mt-1 text-sm font-mono bg-muted p-1 rounded">
                        {author.id}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">Catégorie</span>
                      <div className="mt-1">
                      <CategoryTag category={author.category as AuthorCategory} />
                      </div>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">Ressources</span>
                      <p className="mt-1 flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                        {resources.length} ressource{resources.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">Date de création</span>
                      <p className="mt-1">
                        {new Date(author.createdAt).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">Dernière mise à jour</span>
                      <p className="mt-1">
                        {new Date(author.updatedAt).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Biography */}
            <div>
              <h3 className="text-lg font-medium">Biographie</h3>
              <div className="mt-3 prose prose-sm max-w-none p-4 bg-muted/20 rounded-lg">
                {author.description ? (
                  <div className="whitespace-pre-wrap">{author.description}</div>
                ) : (
                  <p className="text-muted-foreground italic">
                    Aucune biographie disponible pour cet auteur.
                  </p>
                )}
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="bg-muted/30 flex justify-between p-6 border-t">
          <Button
            variant="outline"
            onClick={() => router.push("/admin/authors")}
          >
            Retour à la liste
          </Button>
       
        </CardFooter>
      </Card>
    </div>
  );
}