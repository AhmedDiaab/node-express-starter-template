export interface IRepository<T> {
    create(data: Omit<T, "id">): Promise<T>;
    findById(id: string): Promise<T | null>;
    update(id: string, data: Partial<T>): Promise<T | null>;
    delete(id: string): Promise<void>;
    // Extend with project-specific methods
}