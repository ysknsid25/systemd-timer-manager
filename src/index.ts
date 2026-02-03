#!/usr/bin/env node
import { defineCommand, runMain } from "citty";

const main = defineCommand({
  meta: {
    name: "systemd-timer-manager",
    version: "1.0.0",
    description: "Manage systemd timer configuration by JSON",
  },
  args: {
    name: {
      type: "positional",
      description: "Name to greet",
      required: false,
    },
  },
  run({ args }) {
    console.log(`Hello ${args.name || "world"}!`);
  },
});

runMain(main);
