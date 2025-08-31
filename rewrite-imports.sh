#!/bin/bash

# replace all @schedule-x/ with @fischly-x/
find packages -type f -name "*.ts" -exec sed -i 's/@schedule-x\//@fischly-x\//g' {} +
find packages -type f -name "*.tsx" -exec sed -i 's/@schedule-x\//@fischly-x\//g' {} +
find packages -type f -name "*.js" -exec sed -i 's/@schedule-x\//@fischly-x\//g' {} +
find packages -type f -name "*.jsx" -exec sed -i 's/@schedule-x\//@fischly-x\//g' {} +
find packages -type f -name "*.json" -exec sed -i 's/@schedule-x\//@fischly-x\//g' {} +

find development -type f -name "*.ts" -exec sed -i 's/@schedule-x\//@fischly-x\//g' {} +
find development -type f -name "*.tsx" -exec sed -i 's/@schedule-x\//@fischly-x\//g' {} +

sed -i 's/@schedule-x\//@fischly-x\//g' rollup.config.js