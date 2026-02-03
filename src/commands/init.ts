import { defineCommand } from "citty";
import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { SystemdConfig } from "../schema";

export default defineCommand({
  meta: {
    name: "init",
    description: "Generate a new configuration file",
  },
  args: {
    file: {
      type: "positional",
      description: "Output file path",
      required: false,
      default: "stm.json",
    },
  },
  async run({ args }) {
    const config: SystemdConfig = [
      {
        jobName: "example-job",
        service: {
          Unit: {
            Description: "Example Service Description",
            Documentation: "",
            After: "",
            Before: "",
            Requires: "",
            Wants: "",
            Conflicts: "",
          },
          Service: {
            Type: "simple",
            ExecStart: "/usr/bin/echo 'Hello World'",
            ExecStartPre: "",
            ExecStartPost: "",
            ExecStop: "",
            ExecReload: "",
            Restart: "no",
            RestartSec: "0",
            User: "root",
            Group: "root",
            WorkingDirectory: "",
            Environment: "",
            StandardOutput: "journal",
            StandardError: "journal",
          },
          Install: {
            WantedBy: "multi-user.target",
            RequiredBy: "",
            Alias: "",
          },
        },
        timer: {
          Unit: {
            Description: "Example Timer Description",
            Documentation: "",
            After: "",
            Before: "",
            Requires: "",
            Wants: "",
            Conflicts: "",
          },
          Timer: {
            OnActiveSec: "",
            OnBootSec: "",
            OnStartupSec: "",
            OnUnitActiveSec: "",
            OnUnitInactiveSec: "",
            OnCalendar: "*-*-* 00:00:00",
            Unit: "",
            Persistent: false,
            RandomizedDelaySec: "0",
            AccuracySec: "1m",
          },
          Install: {
            WantedBy: "timers.target",
            RequiredBy: "",
            Alias: "",
          },
        },
      },
    ];

    const outputPath = resolve(process.cwd(), args.file);
    await writeFile(outputPath, JSON.stringify(config, null, 2));
    console.log(`Configuration file created at ${outputPath}`);
  },
});
