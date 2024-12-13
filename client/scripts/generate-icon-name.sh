#!/bin/bash

# Get directory of script
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Navigate to icons directory relative to script location
ICONS_DIR="$DIR/../source/components/icons"
OUTPUT_FILE="$DIR/../source/library/icon-name.ts"

# Create the type definition
echo "// This file is auto-generated. Do not edit manually." > "$OUTPUT_FILE"
echo -n "export type IconName = " >> "$OUTPUT_FILE"

# Get all icon file names, remove _icon.tsx and props.ts, strip extension
# and create union type
find "$ICONS_DIR" -type f -name "*.tsx" \
  | grep -v "_icon.tsx" \
  | grep -v "props.ts" \
  | xargs basename -s ".tsx" \
  | awk 'BEGIN{ORS=" | "} {print "\""$1"\""} END{printf "\n"}' \
  | sed 's/ | $/;/' >> "$OUTPUT_FILE"