#!/usr/bin/env node
const repl = require("repl");
const path = require("path");
const fs = require("fs");
const os = require("os");
const chalk = require("chalk");
const shelljs = require("shelljs");

const configFile = path.join(os.homedir(), ".config/repl.js");
const historyFile = path.join(os.homedir(), ".config/repl.history");

let env;

if (fs.existsSync(configFile))
{
    env = require(configFile);
}



let ctx;
if (env)
{
    ctx = env(chalk)
}

const replServer = repl.start({
    prompt: "> "
});

replServer.setupHistory(historyFile, (err,result) => 0)

Object.assign(replServer.context, ctx);


replServer.defineCommand("sayhello", {
    help: "Say hello",
    action(name) {
        console.log(`Hello, ${name}!`);

        console.log(this.constructor.prototype)

        this.displayPrompt();
    }
});
replServer.defineCommand("saybye", function saybye() {
    console.log("Goodbye!");
    this.close();
});
