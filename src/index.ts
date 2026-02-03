#!/usr/bin/env node
import { defineCommand, runMain } from "citty";
import init from "./commands/init";

const main = defineCommand({
    meta: {
        name: "stm",
        version: "1.0.0",
        description: "Systemd Timer Manager",
    },
    subCommands: {
        init,
    },
    run() {
        // Show help if no subcommand is provided
    },
});

runMain(main);
