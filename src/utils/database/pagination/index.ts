export default (collection: Array<any>, page: number, numItems: number) => {
  if (!Array.isArray(collection)) {
    throw `Expect array and got ${typeof collection}`;
  }
  const currentPage = page ? page : 1;
  const perPage = numItems ? numItems : 10;
  const offset = (page - 1) * perPage;
  const paginatedItems = collection.slice(offset, offset + perPage);

  return {
    currentPage,
    perPage,
    total: collection.length,
    totalPages: Math.ceil(collection.length / perPage),
    data: paginatedItems,
  };
};
