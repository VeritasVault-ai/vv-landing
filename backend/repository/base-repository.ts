import { createClient } from "@/lib/supabase/supabase"

export interface QueryOptions {
  filters?: Record<string, any>
  orderBy?: string
  orderDirection?: "asc" | "desc"
  limit?: number
  offset?: number
}

export class BaseRepository<T> {
  protected tableName: string

  constructor(tableName: string) {
    this.tableName = tableName
  }

  /**
   * Get all records with optional filtering and sorting
   */
  async getAll(options: QueryOptions = {}): Promise<T[]> {
    const supabase = createClient()

    let query = supabase.from(this.tableName).select("*")

    // Apply filters
    if (options.filters) {
      Object.entries(options.filters).forEach(([key, value]) => {
        query = query.eq(key, value)
      })
    }

    // Apply sorting
    if (options.orderBy) {
      query = query.order(options.orderBy, {
        ascending: options.orderDirection !== "desc",
      })
    }

    // Apply pagination
    if (options.limit) {
      query = query.limit(options.limit)
    }

    if (options.offset) {
      query = query.range(options.offset, options.offset + (options.limit || 10) - 1)
    }

    const { data, error } = await query

    if (error) {
      console.error(`Error fetching ${this.tableName}:`, error)
      throw new Error(`Failed to fetch ${this.tableName}: ${error.message}`)
    }

    return data as T[]
  }

  /**
   * Get a record by ID
   */
  async getById(id: string): Promise<T | null> {
    const supabase = createClient()

    const { data, error } = await supabase.from(this.tableName).select("*").eq("id", id).single()

    if (error) {
      if (error.code === "PGRST116") {
        // Record not found
        return null
      }

      console.error(`Error fetching ${this.tableName} by ID:`, error)
      throw new Error(`Failed to fetch ${this.tableName} by ID: ${error.message}`)
    }

    return data as T
  }

  /**
   * Create a new record
   */
  async create(data: Partial<T>): Promise<T> {
    const supabase = createClient()

    const { data: createdData, error } = await supabase.from(this.tableName).insert(data).select().single()

    if (error) {
      console.error(`Error creating ${this.tableName}:`, error)
      throw new Error(`Failed to create ${this.tableName}: ${error.message}`)
    }

    return createdData as T
  }

  /**
   * Update a record
   */
  async update(id: string, data: Partial<T>): Promise<T> {
    const supabase = createClient()

    const { data: updatedData, error } = await supabase.from(this.tableName).update(data).eq("id", id).select().single()

    if (error) {
      console.error(`Error updating ${this.tableName}:`, error)
      throw new Error(`Failed to update ${this.tableName}: ${error.message}`)
    }

    return updatedData as T
  }

  /**
   * Delete a record
   */
  async delete(id: string): Promise<void> {
    const supabase = createClient()

    const { error } = await supabase.from(this.tableName).delete().eq("id", id)

    if (error) {
      console.error(`Error deleting ${this.tableName}:`, error)
      throw new Error(`Failed to delete ${this.tableName}: ${error.message}`)
    }
  }

  /**
   * Upsert a record (create or update)
   */
  async upsert(data: Partial<T>): Promise<T> {
    const supabase = createClient()

    const { data: upsertedData, error } = await supabase.from(this.tableName).upsert(data).select().single()

    if (error) {
      console.error(`Error upserting ${this.tableName}:`, error)
      throw new Error(`Failed to upsert ${this.tableName}: ${error.message}`)
    }

    return upsertedData as T
  }
}
