export const SortData = (obj) => {
    return obj.sort((d1, d2) => new Date(d1.updatedAt).getTime() - 
    new Date(d2.updatedAt).getTime());
}