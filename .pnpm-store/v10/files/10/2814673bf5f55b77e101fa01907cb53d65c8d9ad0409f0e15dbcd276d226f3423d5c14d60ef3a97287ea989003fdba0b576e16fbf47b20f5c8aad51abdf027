/**
 * Performance tracking utilities for A11y DOM extraction
 * Provides hierarchical timing with minimal overhead
 */
export interface TimingEntry {
    name: string;
    startTime: number;
    endTime?: number;
    duration?: number;
    children: TimingEntry[];
    metadata?: Record<string, any>;
}
export interface PerformanceReport {
    totalTime: number;
    breakdown: Record<string, any>;
    bottlenecks: Array<{
        operation: string;
        time: number;
        percentage: number;
        severity: 'critical' | 'high' | 'medium' | 'low';
        recommendation: string;
    }>;
    rawTimings: TimingEntry[];
}
/**
 * Performance tracker with hierarchical timing support
 */
export declare class PerformanceTracker {
    private rootEntry;
    private currentEntry;
    private timerStack;
    private timerMap;
    constructor(name?: string);
    /**
     * Start a named timer
     */
    startTimer(name: string, metadata?: Record<string, any>): void;
    /**
     * Stop a named timer and return duration
     */
    stopTimer(name: string): number;
    /**
     * Record a single point-in-time mark
     */
    mark(name: string, metadata?: Record<string, any>): void;
    /**
     * End the root timer
     */
    finish(): void;
    /**
     * Get flattened timing data
     */
    getFlatTimings(): Array<{
        name: string;
        duration: number;
        metadata?: Record<string, any>;
    }>;
    /**
     * Build hierarchical breakdown object
     */
    private buildBreakdown;
    /**
     * Detect bottlenecks based on timing data
     */
    private detectBottlenecks;
    /**
     * Generate performance report
     */
    getReport(): PerformanceReport;
    /**
     * Export as JSON
     */
    toJSON(): string;
    /**
     * Format report as human-readable string
     */
    formatReport(): string;
}
export declare function getGlobalTracker(): PerformanceTracker | null;
export declare function setGlobalTracker(tracker: PerformanceTracker | null): void;
/**
 * Convenience wrapper for timing async operations
 */
export declare function withTiming<T>(tracker: PerformanceTracker, name: string, fn: () => Promise<T>, metadata?: Record<string, any>): Promise<T>;
/**
 * Convenience wrapper for timing sync operations
 */
export declare function withTimingSync<T>(tracker: PerformanceTracker, name: string, fn: () => T, metadata?: Record<string, any>): T;
