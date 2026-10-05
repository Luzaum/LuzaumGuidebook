/** Shares catalog loads across navigation and search; failures remain retryable. */
export class CatalogCache<T> {
  private entries = new Map<boolean, { promise: Promise<T>; expiresAt: number }>();

  constructor(private readonly ttlMs = 60_000) {}

  load(includeDrafts: boolean, loader: () => Promise<T>): Promise<T> {
    const current = this.entries.get(includeDrafts);
    if (current && Date.now() < current.expiresAt) return current.promise;

    const entry = { promise: undefined as unknown as Promise<T>, expiresAt: Infinity };
    entry.promise = Promise.resolve().then(loader).then((data) => {
      entry.expiresAt = Date.now() + this.ttlMs;
      return data;
    }, (error) => {
      if (this.entries.get(includeDrafts) === entry) this.entries.delete(includeDrafts);
      throw error;
    });
    this.entries.set(includeDrafts, entry);
    return entry.promise;
  }

  clear(): void {
    this.entries.clear();
  }
}
