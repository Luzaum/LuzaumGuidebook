export function includesRelatedSlug(
  slugs: readonly string[] | null | undefined,
  targetSlug: string,
): boolean {
  return Array.isArray(slugs) && slugs.includes(targetSlug);
}
