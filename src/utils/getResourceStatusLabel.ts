import { ResourceStatus } from "@prisma/client";

export function getResourceStatusLabel(status: ResourceStatus) {
  switch (status) {
    case "UNPUBLISHED":
      return "Non publiée";
    case "PUBLISHED":
      return "Publiée";
    default:
      return "Status inconnu";
  }
}
