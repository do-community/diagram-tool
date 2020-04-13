#!/usr/bin/python3
"""
This script basically has the sole purpose of speeding up adding in nodes.
It was made for migrating stuff in this applications development, but was designed to automate stuff after that so I left it.
"""
import sys
import os


def generate_ts_file():
    contents = """// !! AUTO-GENERATED - DO NOT EDIT - USE mk_node.py TO MAKE THE NODE FILE/IMPORT IT !!

import Node from './node';

"""
    x = os.listdir("./nodes")
    files = []
    for i in x:
        files.append(i.split(".")[0])
    for filename in files:
        contents += "import " + filename + " from './nodes/" + filename + "';\n"
    contents += "\nexport default {" + ", ".join(files) + "} as {[index: string]: Node};\n"
    open("./nodes.ts", "w+").write(contents)


def main():
    if len(sys.argv) == 1:
        print("Please supply the node as an argument.")
        return
    arg = sys.argv[1]
    ts = """import * as React from "react";
import Node from "../node";

export default {
    // TODO: Add content here.
} as Node;
"""
    fp = "./nodes/"+arg+".ts"
    open(fp, "w+").write(ts)
    generate_ts_file()
    print("Node file written to " + fp + " and is now just awaiting content being added to it. :)")


if __name__ == "__main__":
    main()
