import { z } from 'zod';

// Common [Unit] section directives
export const UnitSectionSchema = z.object({
  Description: z.string().optional(),
  Documentation: z.union([z.string(), z.array(z.string())]).optional(),
  After: z.union([z.string(), z.array(z.string())]).optional(),
  Before: z.union([z.string(), z.array(z.string())]).optional(),
  Requires: z.union([z.string(), z.array(z.string())]).optional(),
  Wants: z.union([z.string(), z.array(z.string())]).optional(),
  Conflicts: z.union([z.string(), z.array(z.string())]).optional(),
}).strict();

// Common [Install] section directives
export const InstallSectionSchema = z.object({
  WantedBy: z.union([z.string(), z.array(z.string())]).optional(),
  RequiredBy: z.union([z.string(), z.array(z.string())]).optional(),
  Alias: z.union([z.string(), z.array(z.string())]).optional(),
}).strict();

// [Service] section directives for systemd.service
export const ServiceSectionSchema = z.object({
  Type: z.enum(['simple', 'forking', 'oneshot', 'dbus', 'notify', 'idle', 'exec']).optional(),
  ExecStart: z.string().optional(), // Can be multiple, but simplified for now
  ExecStartPre: z.union([z.string(), z.array(z.string())]).optional(),
  ExecStartPost: z.union([z.string(), z.array(z.string())]).optional(),
  ExecStop: z.union([z.string(), z.array(z.string())]).optional(),
  ExecReload: z.union([z.string(), z.array(z.string())]).optional(),
  Restart: z.enum(['no', 'on-success', 'on-failure', 'on-abnormal', 'on-watchdog', 'on-abort', 'always']).optional(),
  RestartSec: z.string().optional(),
  User: z.string().optional(),
  Group: z.string().optional(),
  WorkingDirectory: z.string().optional(),
  Environment: z.union([z.string(), z.array(z.string())]).optional(),
  StandardOutput: z.string().optional(),
  StandardError: z.string().optional(),
}).strict();

// [Timer] section directives for systemd.timer
export const TimerSectionSchema = z.object({
  OnActiveSec: z.string().optional(),
  OnBootSec: z.string().optional(),
  OnStartupSec: z.string().optional(),
  OnUnitActiveSec: z.string().optional(),
  OnUnitInactiveSec: z.string().optional(),
  OnCalendar: z.string().optional(),
  Unit: z.string().optional(),
  Persistent: z.boolean().optional(),
  RandomizedDelaySec: z.string().optional(),
  AccuracySec: z.string().optional(),
}).strict();

// Schema for a complete Service file
export const ServiceFileSchema = z.object({
  Unit: UnitSectionSchema.optional(),
  Service: ServiceSectionSchema,
  Install: InstallSectionSchema.optional(),
});

// Schema for a complete Timer file
export const TimerFileSchema = z.object({
  Unit: UnitSectionSchema.optional(),
  Timer: TimerSectionSchema,
  Install: InstallSectionSchema.optional(),
});

// Combined schema for the JSON configuration input
export const JobConfigSchema = z.object({
  jobName: z.string(),
  service: ServiceFileSchema,
  timer: TimerFileSchema,
});

export const SystemdConfigSchema = z.array(JobConfigSchema);

export type UnitSection = z.infer<typeof UnitSectionSchema>;
export type InstallSection = z.infer<typeof InstallSectionSchema>;
export type ServiceSection = z.infer<typeof ServiceSectionSchema>;
export type TimerSection = z.infer<typeof TimerSectionSchema>;
export type ServiceFile = z.infer<typeof ServiceFileSchema>;
export type TimerFile = z.infer<typeof TimerFileSchema>;
export type JobConfig = z.infer<typeof JobConfigSchema>;
export type SystemdConfig = z.infer<typeof SystemdConfigSchema>;
