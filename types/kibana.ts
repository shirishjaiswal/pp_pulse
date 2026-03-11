/**
 * Generic Elasticsearch Search Response
 */
export interface SearchResponse<T> {
  took: number;
  timed_out: boolean;
  _shards: {
    total: number;
    successful: number;
    skipped: number;
    failed: number;
  };
  hits: {
    total: {
      value: number;
      relation: 'eq' | 'gte';
    } | number; // Older versions of ES used a simple number
    max_score: number | null;
    hits: SearchHit<T>[];
  };
}

/**
 * Single Search Hit
 */
export interface SearchHit<T> {
  _index: string;
  _id: string;
  _score: number | null;
  _source: T; // This is your custom data type
  sort?: (string | number)[];
}