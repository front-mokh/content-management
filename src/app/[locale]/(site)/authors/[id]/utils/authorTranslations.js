export const getAuthorTranslations = (dictionary) => {
    return {
      backToAuthors: dictionary.authors?.backToAuthors || "Back to Authors",
      aboutAuthor: dictionary.authors?.aboutAuthor || "About This Author",
      noDescription: dictionary.authors?.noDescription || "No description available for this author.",
      authorDetails: dictionary.authors?.authorDetails || "Author Details",
      createdOn: dictionary.authors?.createdOn || "Created on",
      updatedOn: dictionary.authors?.updatedOn || "Updated on",
      resourcesCount: dictionary.authors?.resourcesCount || "Resources Count",
      authorResources: dictionary.authors?.authorResources || "Author Resources",
      noResources: dictionary.authors?.noResources || "No resources available from this author yet.",
      readMore: dictionary.authors?.readMore || "Read More",
      joinCommunity: dictionary.authors?.joinCommunity || "Join Our Community",
      communityDescription: dictionary.authors?.communityDescription || "Be part of our growing community and contribute to our cultural heritage",
      contributeButton: dictionary.authors?.contributeButton || "Contribute Now",
      contactButton: dictionary.authors?.contactButton || "Contact Us",
      joinedOn: dictionary.authors?.joinedOn || "Joined on",
      email: dictionary.authors?.email || "Email",
      website: dictionary.authors?.website || "Website",
      location: dictionary.authors?.location || "Location",
      viewResource: dictionary.authors?.viewResource || "View Resource",
    };
  };