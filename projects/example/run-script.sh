#!/bin/bash

# Required parameters:
# @raycast.schemaVersion 1
# @raycast.title Project UpLift
# @raycast.mode silent

# Optional parameters:
# @raycast.icon 🧑🏻‍💻

# Documentation:
# @raycast.author Slavik Nychkalo
# @raycast.authorURL https://github.com/gebeto

code "${BASH_SOURCE%/*}/code.code-workspace"
osascript "${BASH_SOURCE%/*}/iterm.applescript"

echo "Success!"